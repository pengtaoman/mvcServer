/*
 * Copyright 2006 The Neusoft Software Foundation.
 * 
 */
package com.neusoft.uniflow.web.AO;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Vector;

import javax.servlet.http.HttpServletRequest;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.NWSessionImpl;
import com.neusoft.uniflow.api.def.NWActDef;
import com.neusoft.uniflow.api.def.NWProcDef;
import com.neusoft.uniflow.api.handler.InstUtil;
import com.neusoft.uniflow.api.handler.NWActInst;
import com.neusoft.uniflow.api.handler.NWActInstManager;
import com.neusoft.uniflow.api.handler.NWProcInst;
import com.neusoft.uniflow.api.handler.NWProcInstImpl;
import com.neusoft.uniflow.api.handler.NWRelDataInst;
import com.neusoft.uniflow.api.handler.NWWorkItem;
import com.neusoft.uniflow.appmgr.AppMessage;
import com.neusoft.uniflow.common.NWException;
import com.neusoft.uniflow.common.NWResultSet;
import com.neusoft.uniflow.common.StorageException;
import com.neusoft.uniflow.persistence.IPersistence;
import com.neusoft.uniflow.persistence.PersisterFactory;
import com.neusoft.uniflow.service.WorkFlowContext;
import com.neusoft.uniflow.util.Util;
import com.neusoft.uniflow.web.util.SessionManager;

/**
 * 节点实例对象相关方法
 * 
 * @author shangzf
 * @version $Revision: 1.1 $ $Date: 2007/11/29 03:37:01 $
 * 
 */
public class ActInstAO {

	public final static int ROLLBACK_CAN = 0;// 可以回退

	public final static int ROLLBACK_CANNOT_BRANCH_FINISHED = 1;// 分支已经处理完

	public final static int ROLLBACK_CANNOT_SOME_BRANCH_NOTAT_FIRST = 2;// 当前节点不在第一个手动节点上

	public final static int ROLLBACK_CANNOT_ASYN_SUBPROC = 3;// 异步子流程不能回退

	public final static int ROLLBACK_CANNOT_OTHER_REASON = 99;// 其他不能回退的原因

	private NWSession nwSession = AOManager.getNWSession();

	private static ActInstAO instance = null;

	private ActInstAO() {

	}

	public static ActInstAO getInstance() {
		if (instance == null)
			instance = new ActInstAO();
		return instance;
	}

	/**
	 * 根据节点实例标识获取节点实例对象
	 * 
	 * @param request
	 *            Http请求对象
	 * @param actInstID
	 *            节点实例标识
	 * @return 节点实例对象或者null
	 * @throws AOException,NWException
	 */
	public NWActInst getActInst(HttpServletRequest request, String actInstID)
			throws AOException, NWException {

		if (actInstID == null || actInstID.equals("")) {
			throw new AOException(90300);
		}
		String userID = null;
		if (request == null) {
			userID = "";
		} else {
			userID = (String) request.getSession().getAttribute(
					SessionManager.BIZ_USERID);
		}

		NWActInst actInst = nwSession.getActInst(userID, actInstID);

		return actInst;
	}

	public Vector openCanRollBackActInstList(HttpServletRequest request,
			String actInstId) throws NWException {

		String userId = (String) request.getSession().getAttribute(
				SessionManager.BIZ_USERID);
		NWActInst actInst = nwSession.getActInst(userId, actInstId);
		return actInst.openRollbackableActList();
	}

	


	

	/*
	 * 判断节点是否可以回退 (1)先判断当前节点是否在并发分支内 （2）并发分支是否可回退，分支内的子流程、并发体是否可回退
	 * （3）当前节点如果在子流程中，当前子流程节点是否可回退
	 * 主要接口：当前节点实例所在分支可回退、流程实例可回退、并发体可回退、节点实例可回退四个接口互相递归调用
	 */
	public int isCanRollback(HttpServletRequest request, String actInstId)
			throws NWException {
		String userId = null;
		if (request == null) {
			userId = "";
		} else {
			userId = (String) request.getSession().getAttribute(
					SessionManager.BIZ_USERID);
		}
		NWActInst actInst = nwSession.getActInst(userId, actInstId);
		NWProcInst tempprocInst = actInst.getProcInst();
		Vector actInsts = tempprocInst.openActInstList(-1);
		Map actsMap = new HashMap();
		int size = actInsts.size();
		for (int i = 0; i < size; i++) {
			NWActInst tempActInst = (NWActInst) actInsts.elementAt(i);
			actsMap.put(tempActInst.getActInstID(), tempActInst);
		}
		if (actInst != null) {
			int tempResult = ROLLBACK_CAN;
			NWActInst prevActInst = this.getPrevActInst(tempprocInst, actInst,
					actsMap);
			if (prevActInst != null
					&& prevActInst.getType() == NWActDef.ACT_TYPE_PARALLEL_BRANCH_BEGIN) {
				NWActInst branchActInst = (NWActInst) actsMap.get(prevActInst
						.getParentActInstID());
				Vector brotherBranchActInsts = this
						.openBrotherBranchActInstList(actsMap, branchActInst);
				for (int i = 0; i < brotherBranchActInsts.size(); i++) {
					NWActInst tempbranchActInst = (NWActInst) brotherBranchActInsts
							.elementAt(i);
					tempResult = isBranchCanRollBack(actsMap,
							tempbranchActInst, request);
					if (ROLLBACK_CAN != tempResult) {
						break;
					}
				}
				if (tempResult == ROLLBACK_CAN) {// 如果当前并发可以回退，则判断当前并发节点是否在子流程
					NWActInst parallelActInst = (NWActInst) actsMap
							.get(branchActInst.getParentActInstID());
					NWActInst tempActInst = this.getPrevActInst(tempprocInst,
							parallelActInst, actsMap);
					if (tempActInst != null
							&& tempActInst.getType() == NWActDef.ACT_TYPE_START) {// 如果前一节点是开始节点，说明在第一个节点
						NWProcInst procInst = parallelActInst.getProcInst();
						if (procInst != null
								&& procInst.getType() == NWProcInst.PROC_TYPE_SYNCH_SUB) {// 如果当前流程是同步子流程节点，则判断一下并发节点是不是子流程的第一个节点
							String superActInstId = procInst
									.getSuperActInstID();// 取得父节点的id
							if (superActInstId != null
									&& !superActInstId.equals("")) {
								return isCanRollback(request, superActInstId);
							}
						}
					} else if (tempActInst != null
							&& tempActInst.getType() == NWActDef.ACT_TYPE_PARALLEL_BRANCH_BEGIN) {// 并发嵌套
						return this.isCanRollback(request, parallelActInst
								.getActInstID());
					} else {
						// return ROLLBACK_CANNOT_OTHER_REASON;
					}
				}
				return tempResult;
			} else {
				if (prevActInst != null
						&& prevActInst.getType() == NWActDef.ACT_TYPE_START) {
					NWProcInst procInst = prevActInst.getProcInst();
					if (procInst != null
							&& procInst.getType() == NWProcInst.PROC_TYPE_SYNCH_SUB) {
						String superActInstId = procInst.getSuperActInstID();
						if (superActInstId != null
								&& !superActInstId.equals("")) {
							return isCanRollback(request, superActInstId);
						}
					} else {
						return ROLLBACK_CANNOT_OTHER_REASON;
					}
				}
				return ROLLBACK_CAN;
			}

		}
		return ROLLBACK_CANNOT_OTHER_REASON;
	}

	public int isBranchCanRollBack(Map actsMap, NWActInst branchActInst,
			HttpServletRequest request) throws NWException {
		if (branchActInst.getCurState() == NWActInst.STATE_COMPLETE) {
			return ROLLBACK_CANNOT_BRANCH_FINISHED;// 分支已经走完，不可以回退
		} else {
			NWActInst actInst = this.getFirstActInstInBranch(branchActInst,
					actsMap);
			if (actInst != null) {
				if (actInst.getCurState() == NWActInst.STATE_COMPLETE
						|| actInst.getCurState() == NWActInst.STATE_TERMINATE) {
					return ROLLBACK_CANNOT_SOME_BRANCH_NOTAT_FIRST;// 不在第一个节点上
				} else if (actInst.getType() == NWActDef.ACT_TYPE_PARALLEL_UNIT) {// 如果是并发节点
					return this.isParallelUnitActInstCanRollBack(actsMap,
							actInst, request);
				} else if (actInst.getType() == NWActDef.ACT_TYPE_SYNCHSUBPROC) {// 如果是子流程节点
					NWProcInst subProcInst = actInst.getSubProcInst();
					if (subProcInst != null) {
						return this.isProcInstCanRollBack(subProcInst, request);
					}
				} else if (actInst.getType() == NWActDef.ACT_TYPE_ASYNCHSUBPROC) {
					return ROLLBACK_CANNOT_ASYN_SUBPROC;// 异步子流程不可以回退
				}
			}
			return ROLLBACK_CAN;
		}
	}

	// 判断当前子流程实例是否可回退
	public int isProcInstCanRollBack(NWProcInst procInst,
			HttpServletRequest request) throws NWException {
		// 判断是否存在激活态的节点，如果有不可回退
		Vector activeActInstList = procInst.openActInstList(4);
		if (activeActInstList.size() > 0)
			return this.ROLLBACK_CANNOT_OTHER_REASON;

		// 获取运行态的节点，判断这些节点是否可回退
		Vector runActInstList = procInst.openActInstList(2);
		for (int i = 0; i < runActInstList.size(); i++) {
			NWActInst actInst = (NWActInst) runActInstList.get(i);
			boolean isManual = actInst.getType() == NWActDef.ACT_TYPE_MANUAL;
			if (isManual) {
				int result = this
						.isCanRollback(request, actInst.getActInstID());
				if (result != this.ROLLBACK_CAN)
					return result;

			}

		}

		return ROLLBACK_CAN;
	}

	/*
	 * 判断并发节点是否可以回退
	 */
	public int isParallelUnitActInstCanRollBack(Map actsMap,
			NWActInst parallelUnitActInst, HttpServletRequest request)
			throws NWException {
		Vector branchList = this.openBranchActInstInParallel(actsMap,
				parallelUnitActInst);
		int result = ROLLBACK_CAN;
		for (int i = 0; i < branchList.size(); i++) {
			NWActInst branchActInst = (NWActInst) branchList.elementAt(i);
			result = isBranchCanRollBack(actsMap, branchActInst, request);
			if (ROLLBACK_CAN != result) {
				return result;
			}
		}
		return result;
	}

	/**
	 * 取得并发分支中的第一个节点
	 * 
	 * @param branchActInst
	 * @param actMap
	 * @return
	 */
	public NWActInst getFirstActInstInBranch(NWActInst branchActInst, Map actMap) {
		Vector actInstsInBranch = this.openActInstListInBranch(actMap,
				branchActInst.getActInstID());
		int size = actInstsInBranch.size();
		NWActInst branchBeginActInst = null;
		Vector branchBeginActInstList = new Vector();
		NWActInst firstActInst = null;
		boolean falg = false;
		for (int i = 0; i < size; i++) {
			branchBeginActInst = (NWActInst) actInstsInBranch.elementAt(i);
			if (branchBeginActInst.getType() == NWActDef.ACT_TYPE_PARALLEL_BRANCH_BEGIN) {
				branchBeginActInstList.add(branchBeginActInst);
				falg = true;
				continue;
			}
		}
		if (falg) {
			branchBeginActInst = getLastActInst(branchBeginActInstList);
		}
		Vector firstActInstList = new Vector();

		if (branchBeginActInst != null && falg) {
			firstActInstList = findNextActInst(actInstsInBranch,
					branchBeginActInst);
		}
		firstActInst = this.getLastActInst(firstActInstList);
		return firstActInst;
	}

	public Vector findNextActInst(Vector actInsts, NWActInst curActInst) {
		int size = actInsts.size();
		NWActInst tempActInst = null;
		Vector resultActInst = new Vector();
		for (int i = 0; i < size; i++) {
			tempActInst = (NWActInst) actInsts.elementAt(i);
			if (tempActInst.getOrderPreActInstId().equals(
					curActInst.getActInstID())) {
				if (tempActInst.getType() == NWActDef.ACT_TYPE_CHOICE) {
					resultActInst
							.addAll(findNextActInst(actInsts, tempActInst));
				} else if (tempActInst.getType() == NWActDef.ACT_TYPE_AUTO) {
					resultActInst
							.addAll(findNextActInst(actInsts, tempActInst));
				} else {
					resultActInst.add(tempActInst);
					continue;
				}
			}
		}
		return resultActInst;
	}

	/*
	 * 取得并发中的所有分支节点
	 */
	public Vector openBrotherBranchActInstList(Map actMap,
			NWActInst branchActInst) {
		Iterator iterator = actMap.keySet().iterator();
		Vector v = new Vector();
		while (iterator.hasNext()) {
			NWActInst actInst = (NWActInst) actMap.get(iterator.next());
			if (actInst != null
					&& actInst.getParentActInstID().equals(
							branchActInst.getParentActInstID())
					&& actInst.getType() == NWActDef.ACT_TYPE_PARALLEL_BRANCH
					&& !actInst.getActInstID().equals(
							branchActInst.getActInstID())) {
				v.add(actInst);
			}
		}

		return v;
	}

	private NWActInst getPrevActInst(NWProcInst procInst, NWActInst actInst,
			Map actsMap) throws NWException {
		// Vector tempActs=new Vector();
		if (actInst != null) {
			NWActInst tempAct = null;
			// 取当前节点的前一个节点实例。
			tempAct = (NWActInst) actsMap.get(actInst.getOrderPreActInstId());
			while (tempAct != null) {
				int acttype = tempAct.getType();
				if (acttype == NWActDef.ACT_TYPE_MANUAL) {// 手动节点加到可回退列表中
					return tempAct;
				} else if (acttype == NWActDef.ACT_TYPE_SYNCHSUBPROC) {// 此方法内部对同步子流程节点做特殊处理
				} else if (acttype == NWActDef.ACT_TYPE_ASYNCHSUBPROC) {// 如果前一节点是异步子流程节点结束
					break;
				} else if (acttype == NWActDef.ACT_TYPE_PARALLEL_UNIT) {// 如果前一节点是并发节点则结束
					return tempAct;
				} else if (acttype == NWActDef.ACT_TYPE_PARALLEL_BRANCH_BEGIN) {
					return tempAct;
				} else if (acttype == NWActDef.ACT_TYPE_CHOICE) {
				} else if (acttype == NWActDef.ACT_TYPE_AUTO) {
				} else if (acttype == NWActDef.ACT_TYPE_START) {
					return tempAct;
				}
				tempAct = (NWActInst) actsMap.get(tempAct
						.getOrderPreActInstId());
			}
		}
		return null;
	}


	/*
	 * 取得并发节点的所有并发分支
	 */
	public Vector openBranchActInstInParallel(Map actMap,
			NWActInst parallelUnitActInst) {
		Iterator iterator = actMap.keySet().iterator();
		Vector v = new Vector();
		while (iterator.hasNext()) {
			NWActInst actInst = (NWActInst) actMap.get(iterator.next());
			if (actInst != null
					&& actInst.getParentActInstID().equals(
							parallelUnitActInst.getActInstID())
					&& actInst.getType() == NWActDef.ACT_TYPE_PARALLEL_BRANCH) {
				v.add(actInst);
			}
		}

		return v;
	}

	public Vector openActInstListInBranch(Map actMap, String branchActInstId) {
		Vector v = new Vector();
		Iterator iterator = actMap.keySet().iterator();
		while (iterator.hasNext()) {
			NWActInst actInst = (NWActInst) actMap.get(iterator.next());
			if (actInst != null
					&& actInst.getParentActInstID().equals(branchActInstId)) {
				v.add(actInst);
			}
		}
		return v;
	}



	
	private NWActInst getLastActInst(Vector actInstList) {
		int curActSize = actInstList.size();
		NWActInst resultAct = null;
		if (curActSize != 0) {
			resultAct = (NWActInst) actInstList.elementAt(0);
			for (int i = 1; i < curActSize; i++) {
				NWActInst tempAct = (NWActInst) actInstList.elementAt(i);
				if (tempAct.getStartTime().after(resultAct.getStartTime())) {
					resultAct = tempAct;
					tempAct = null;
					continue;
				}
			}
		}
		return resultAct;
	}


	/**
	 * 根据当前节点实例标识与目的节点实例标识，执行实例回退
	 * 
	 * @param request
	 *            Http请求对象
	 * @param actCurInstID
	 *            当前节点实例标识
	 * @param actRollInstID
	 *            节点实例标识
	 * @throws NWException
	 */
	public void doRollBack(HttpServletRequest request, String actCurInstID,
			String actRollInstID) throws NWException {

		String userID = (String) request.getSession().getAttribute(
				SessionManager.BIZ_USERID);

		NWActInstManager actInstManager = nwSession.getActInstManager();

		actInstManager.doRollBack(actCurInstID, userID, actRollInstID);
	}

	public static String parseMessage(int errorCode) {
		String message = "";
		switch (errorCode) {
		case ROLLBACK_CAN:
			message = "可以回退";
			break;
		case ROLLBACK_CANNOT_SOME_BRANCH_NOTAT_FIRST:
			message = "其他并发分支中的工作已经被处理，不能回退！";
			break;
		case ROLLBACK_CANNOT_BRANCH_FINISHED:
			message = "其他并发分支中有已经处理结束的，不能回退！";
			break;
		case ROLLBACK_CANNOT_ASYN_SUBPROC:
			message = "异步子流程不能回退";
			break;
		case ROLLBACK_CANNOT_OTHER_REASON:
			message = "不可以回退";
			break;
		default:
			break;
		}
		return message;
	}

	public Vector queryActInstList(Timestamp timestamp, String procInstId)
			throws Exception {
		Vector vector = new Vector();
		NWSessionImpl sessionImpl = (NWSessionImpl) nwSession;
		IPersistence persistence =WorkFlowContext.getInstance().getPersistence();
		String sql = "select a.activity_ins_id from rt_actinst a, rt_processinstance p where a.proc_instance_id = p.proc_instance_id and a.create_time >= ? and (p.proc_instance_id = ? or p.parent_procinc_id = ?)";
		NWResultSet resultSet = persistence.executeQuery(sql, new Object[] {
				timestamp, procInstId, procInstId });

		String activityInstId;
		while (resultSet.next()) {
			activityInstId = resultSet.getString("activity_ins_id");
			vector.add(sessionImpl.getActInst("", activityInstId));
		}
		return vector;
	}

	/**
	 * 根据当前节点查找后续的节点实例
	 * 
	 * @param curActInst
	 * @return
	 */
	public Vector findNextActInst4FindWorkItem(NWActInst curActInst)
			throws Exception {
		Vector actInsts = null;
		Map actMap = null;
		if (actInsts == null) {
			actInsts = new Vector();
			actMap = new HashMap();
		}
		// if (actInsts.isEmpty())
		// {
		// if (curActInst != null)
		// {
		try {
			actInsts = queryActInstList(new Timestamp(curActInst.getStartTime()
					.getTime()), curActInst.getProcInstID());// 查询curActInst节点创建之后的节点实例集合
		} catch (Exception e) {
			// e.printStackTrace();
		}
		// }
		// }
		int size = actInsts.size();
		for (int i = 0; i < size; i++) {
			NWActInst tempActInst = (NWActInst) actInsts.get(i);
			actMap.put(tempActInst.getActInstID(), tempActInst);
		}
		NWActInst tempActInst = null;
		Vector resultActInst = new Vector();

		for (int i = 0; i < size; i++) {
			tempActInst = (NWActInst) actInsts.get(i);
			if (tempActInst.getActInstID().equals(curActInst.getActInstID())) {
				continue;
			}

			if (tempActInst.getPreActInstID().equals(curActInst.getActInstID())) {
				if (tempActInst.getType() == NWActDef.ACT_TYPE_CHOICE) {// 如果是选择节点查找下一节点
					resultActInst.addAll(findNextActInst4FindWorkItem(actMap,
							actInsts, tempActInst));
					// break;
				} else if (tempActInst.getType() == NWActDef.ACT_TYPE_PARALLEL_UNIT) {
					resultActInst
							.addAll(findNextActInstInParallel4FindWorkItem(
									actMap, actInsts, tempActInst));
					// break;
				} else if (tempActInst.getType() == NWActDef.ACT_TYPE_SYNCHSUBPROC) {
					resultActInst
							.addAll(findNextActInstInSubProcInst4FindWorkItem(tempActInst));
					// break;
				} else if (tempActInst.getType() == NWActDef.ACT_TYPE_PARALLEL_BRANCH_END) {
					String parentActInstId = tempActInst.getParentActInstID();
					NWActInst actInst = nwSession.getActInst("",
							parentActInstId);// 并发分支节点
					parentActInstId = actInst.getParentActInstID();
					actInst = nwSession.getActInst("", parentActInstId);// 并发节点
					resultActInst.addAll(findNextActInst4FindWorkItem(actInst));
					// break;
				} else if (tempActInst.getType() == NWActDef.ACT_TYPE_END) {
					NWProcInstImpl procInst = (NWProcInstImpl) nwSession
							.getProcInst("", tempActInst.getProcInstID());
					String subProcActInstId = procInst.getSuperActInstID();
					if (subProcActInstId != null
							&& !subProcActInstId.equals("")) {
						NWActInst actInst = nwSession.getActInst("",
								subProcActInstId);// 并发分支节点所在的并发节点
						resultActInst
								.addAll(findNextActInst4FindWorkItem(actInst));
					}
				} else {
					resultActInst.add(tempActInst);
					// break;
				}
			}
		}
		return resultActInst;
	}

	public Vector findNextActInst4FindWorkItem(Map actMap, Vector actInsts,
			NWActInst curActInst) {
		int size = actInsts.size();
		NWActInst tempActInst = null;
		Vector resultActInst = new Vector();
		for (int i = 0; i < size; i++) {
			tempActInst = (NWActInst) actInsts.get(i);
			if (tempActInst.getPreActInstID().equals(curActInst.getActInstID())) {
				if (tempActInst.getType() == NWActDef.ACT_TYPE_CHOICE) {// 如果是选择节点查找下一节点
					resultActInst.addAll(findNextActInst4FindWorkItem(actMap,
							actInsts, tempActInst));
					// break;
				} else if (tempActInst.getType() == NWActDef.ACT_TYPE_PARALLEL_UNIT) {
					resultActInst
							.addAll(findNextActInstInParallel4FindWorkItem(
									actMap, actInsts, tempActInst));
					// break;
				} else if (tempActInst.getType() == NWActDef.ACT_TYPE_SYNCHSUBPROC) {
					resultActInst
							.addAll(findNextActInstInSubProcInst4FindWorkItem(tempActInst));
					// break;
				} else {
					resultActInst.add(tempActInst);
					// break;
				}
			}
		}
		return resultActInst;
	}

	public Vector findNextActInstInParallel4FindWorkItem(Map actMap,
			Vector actInsts, NWActInst parallelUnitActInst) {
		Vector branchList = this.openBranchActInstInParallel(actMap,
				parallelUnitActInst);
		Vector results = new Vector();
		for (int i = 0; i < branchList.size(); i++) {
			NWActInst branchActInst = (NWActInst) branchList.elementAt(i);
			NWActInst actInst = this.getFirstActInstInBranch(branchActInst,
					actMap);
			if (actInst.getType() == NWActDef.ACT_TYPE_PARALLEL_UNIT) {
				results.addAll(findNextActInstInParallel4FindWorkItem(actMap,
						actInsts, actInst));
			} else if (actInst.getType() == NWActDef.ACT_TYPE_SYNCHSUBPROC) {
				results
						.addAll(findNextActInstInSubProcInst4FindWorkItem(actInst));
			} else if (actInst.getType() == NWActDef.ACT_TYPE_CHOICE) {
				results.addAll(findNextActInst4FindWorkItem(actMap, actInsts,
						actInst));
			} else {
				results.add(actInst);
			}
		}
		return results;
	}

	/*
	 * 获取子流程中的第一个节点
	 */

	public Vector findNextActInstInSubProcInst4FindWorkItem(
			NWActInst subProcActInst) {
		// Vector acts = null;
		Map actsMap = new HashMap();
		try {
			Vector acts = queryActInstList(new Timestamp(subProcActInst
					.getStartTime().getTime()), subProcActInst
					.getSubProcInstId());
			for (int i = 0; i < acts.size(); i++) {
				NWActInst tempActInst = (NWActInst) acts.elementAt(i);
				actsMap.put(tempActInst.getActInstID(), tempActInst);
			}
			NWActInst startActInst = getSubProcInstStartActInst(acts);
			return findNextActInst4FindWorkItem(actsMap, acts, startActInst);
		} catch (Exception e) {
			// e.printStackTrace();
		}
		return null;
	}

	/**
	 * 获取子流程的开始节点
	 * 
	 * @param actInsts
	 * @return
	 */
	public NWActInst getSubProcInstStartActInst(Vector actInsts) {
		NWActInst tempActInst = null;
		Vector startActInst = new Vector();
		for (int i = 0; i < actInsts.size(); i++) {
			tempActInst = (NWActInst) actInsts.elementAt(i);
			if (tempActInst.getType() == NWActDef.ACT_TYPE_START) {
				startActInst.add(tempActInst);
			}
		}
		tempActInst = this.getLastActInst(startActInst);
		return tempActInst;
	}

	/**
	 * 判断当前消息创建时间之前的消息已经完成 对于同一组的消息，他们是在同一个线程中执行，所以不能等待，需排除
	 * 
	 * @param instID
	 *            节点实例ID
	 * @return 0 前面还存在未完成的消息 1 前面的消息都已处理完毕 2 前面存在异常的消息
	 * @throws NWException
	 */
	public int isFormerMessageCompleted(String instID, String messageID)
			throws Exception {
		if (instID == null || instID.equals(""))
			throw new IllegalArgumentException("the input instID is null!");
		int isCompleted = 1;
		IPersistence persistence = WorkFlowContext.getInstance().getPersistence();
		AppMessage message = getMessage(messageID);
		StringBuffer sql = new StringBuffer();
		sql
				.append(
						"select app.message_id,app.state,app.group_id from rt_actinst act,rt_appmsgqueue app where act.activity_ins_id=app.parameter ")
				.append(" and act.proc_instance_id in('")
				.append(getProcInstStr(instID))
				.append(
						"' )and app.buildtime<(select buildtime from rt_appmsgqueue where message_id=?)")
				.append(" order by app.buildtime asc");
		NWResultSet rs = persistence.executeQuery(sql.toString(),
				new Object[] { messageID });
		if (rs.next()) {
			String group = rs.getString(3);
			if (group.equals(message.getGroupId()))
				return isCompleted;
			int state = rs.getInt(2);
			if (state == 2)
				isCompleted = 2;
			else
				isCompleted = 0;
		}
		return isCompleted;

	}

	/**
	 * 此处只考虑一层子流程嵌套的问题 根据当前节点实例或者所在的流程实例ID及其同步子流程ID
	 * 
	 * @param instID
	 * @return procID1,procID2,procID3
	 * @throws NWException
	 */
	private String getProcInstStr(String instID) throws NWException {
		NWSessionImpl session = (NWSessionImpl) nwSession;
		NWActInst actInst = session.getActInst("", instID);
		NWProcInst procInst = actInst.getProcInst();
		String parentProcInstID = procInst.getProcInstID();
		// 如果是异步子流程，则返回本身以及其嵌套的
		if (procInst.getType() == NWProcInst.PROC_TYPE_ASYNCH_SUB)
			return procInst.getProcInstID();
		else if (procInst.getType() == NWProcInst.PROC_TYPE_SYNCH_SUB)
			parentProcInstID = procInst.getSuperProcInstID();
		String resultStr = getsubProcInst(parentProcInstID);
		return resultStr;
	}

	/**
	 * 返回当前流程实例中所有的子流程实例ID，包括当前父流程实例的的ID，
	 * 
	 * @param parentProcInst
	 * @return “procID1,procID2,procID3”
	 * @throws StorageException
	 */
	private String getsubProcInst(String parentID) throws StorageException {
		StringBuffer returnStr = new StringBuffer(parentID);
		IPersistence persistence = WorkFlowContext.getInstance().getPersistence();
		String selSqp = "select proc.proc_instance_id from rt_processinstance proc where proc.parent_procinc_id='"
				+ parentID + "'";
		NWResultSet rs = persistence.executeQuery(selSqp.toString());
		while (rs.next()) {
			String procId = rs.getString(1);
			returnStr.append("','").append(procId);
		}
		return returnStr.toString();
	}

	/**
	 * 根据参数以及事件类型获得消息对象
	 * 
	 * @param parameter
	 * @param eventID
	 * @return
	 * @throws StorageException
	 */
	public AppMessage getMessage(String messageID) throws NWException {
		IPersistence persistence = WorkFlowContext.getInstance().getPersistence();
		String selectSql = "select app.group_id,app.event_id,app.parameter from rt_appmsgqueue app where app.message_id=?";
		NWResultSet events = persistence.executeQuery(selectSql,
				new Object[] { messageID });
		if (events.next()) {
			AppMessage message = new AppMessage();
			message.setId(messageID);
			message.setGroupId(events.getString(1));
			message.setEventID(events.getInt(2));
			message.setInstID(events.getString(3));
			return message;
		} else
			throw new NWException("can not get the message messageID:"
					+ messageID);

	}

	/**
	 * 根据数据库类型返回查询语句
	 * 经过测试在oracle环境下，udolink通过getobject方法无法正确解析timestamp类型的字段，同时又不能直接调用connection进行查询
	 * 
	 * @return
	 */
	private String getSqlByDbType() {
		IPersistence persistence = WorkFlowContext.getInstance().getPersistence();
		String selectSql;
		int dbType = persistence.getDbType();
		if (dbType == PersisterFactory.DBTYPE_ORACLE)
			selectSql = "select app.message_id,app.group_id,to_date(to_char(buildtime,'yyyy-mm-dd hh24:mi:ss'),'yyyy-mm-dd hh24:mi:ss') from rt_appmsgqueue app where app.event_source=? and app.event_id=?";
		else
			selectSql = "select app.message_id,app.group_id,app.buildtime from rt_appmsgqueue app where app.event_source=? and app.event_id=?";
		return selectSql;
	}

	/**
	 * 获取子流程节点挂接的子流程的开始节点定义。
	 */
	public NWActDef parseSubProcAct(NWActDef actDef) throws NWException {
		if (actDef.getType() != NWActDef.ACT_TYPE_SYNCHSUBPROC
				&& actDef.getType() != NWActDef.ACT_TYPE_ASYNCHSUBPROC) {
			return null;
		}
		NWProcDef procDef = nwSession.getProcDef("", actDef.getSubprocID(), 0);
		NWActDef startActDef = nwSession.getActDef(procDef.getStartActID(), 0);
		return startActDef;
	}

	public List parseParallelUnit(NWActDef actDef) throws NWException {
		if (actDef.getType() != NWActDef.ACT_TYPE_PARALLEL_UNIT) {
			return null;
		}
		List branchStartActDefs = new ArrayList();
		NWProcDef procDef = nwSession.getProcDef("", actDef.getProcDefID(), 0);
		Vector branchDefs = actDef.openParallelBranchList();
		for (int i = 0; i < branchDefs.size(); i++) {
			NWActDef branchDef = (NWActDef) branchDefs.get(i);
			NWActDef branchStartActDef = procDef.getBranchStartNode(branchDef
					.getID());
			branchStartActDefs.add(branchStartActDef);
		}
		return branchStartActDefs;
	}

	public void rollBack(NWWorkItem workitem) throws NWException {
		NWActInst actInst = workitem.getActInst();
		NWActDef actDef = actInst.getActDef();
		NWProcInst procinst = workitem.getProcInst();
		NWRelDataInst relData = procinst.getRelData("$isRollBackProcess");
		boolean isRollBackProcess = false;
		if (relData != null) {
			isRollBackProcess = Boolean.getBoolean(relData.getValue());
		}
		if (isRollBackProcess) {
			Vector preActs = procinst.getProcDef().openPrevActList(
					actDef.getID());
			List completedActs = new ArrayList();
			for (int i = 0; i < preActs.size(); i++) {
				NWActDef act = (NWActDef) preActs.get(i);
				completedActs.addAll(nwSession.getActInstManager()
						.openActInstListByActDefID("", 16, act.getID()));
			}
			NWActDef targetActDef = getTargetActDef(completedActs);
			workitem.assignDirectAct(targetActDef.getID());
			workitem.doComplete(false);
		} else {
			NWActDef subProcActDef = getSubProcActBefore(actInst);
			if (subProcActDef != null) {
				if (!subProcActDef.getProcDefID().equals(
						actInst.getProcInst().getProcDefID())) {
					procinst.doAbort();
				} else {

				}
				NWProcDef subProcDef = nwSession.getProcDef("admin",
						subProcActDef.getSubprocID(), 0);
				rollBackIntoSubproc(subProcDef);
			} else {
				workitem.doRollBack();
			}
		}
	}

	/**
	 * 根据子流程节点实例ID返回所有该处产生的所有子流程实例
	 * 
	 * @param SubprocActInstId
	 *            子流程节点实例ID
	 * @return
	 * @throws NWException
	 */
	public List openAllSubprocInstList(String SubprocActInstId)
			throws NWException {
		NWActInst actInst = nwSession.getActInst("", SubprocActInstId);
		NWProcInst procInst = actInst.getProcInst();
		List actInstList = procInst.openActInstList(-1);
		String actDefId = actInst.getActDefID();
		List subprocInstList = new ArrayList();
		for (int i = 0; i < actInstList.size(); i++) {
			NWActInst subprocActInst = (NWActInst) actInstList.get(i);
			if (actDefId.equals(subprocActInst.getActDefID())) {
				subprocInstList.add(subprocActInst.getSubProcInst());
			}
		}
		return subprocInstList;
	}

	private NWActDef getTargetActDef(List completedActs) throws NWException {
		NWActDef targetActDef = null;
		if (completedActs.size() == 1) {
			NWActInst tempActInst = (NWActInst) completedActs.get(0);
			targetActDef = tempActInst.getActDef();
		} else {
			NWActInst targetActInst = null;
			for (int i = 0; i < completedActs.size() - 1; i++) {
				NWActInst tempA = (NWActInst) completedActs.get(i);
				NWActInst tempB = (NWActInst) completedActs.get(i + 1);
				targetActInst = tempA;
				if (tempA.getCompleteTime().after(tempB.getCompleteTime())) {
					if (tempA.getCompleteTime().after(
							targetActInst.getCompleteTime())) {
						targetActInst = tempA;
					}
				} else {
					if (tempB.getCompleteTime().after(
							targetActInst.getCompleteTime())) {
						targetActInst = tempB;
					}
				}
			}
			targetActDef = targetActInst.getActDef();
		}
		return targetActDef;
	}

	private void rollBackIntoSubproc(NWProcDef subProcDef) throws NWException {
		NWProcInst newSubprocInst = subProcDef.createProcessInst();
		NWActDef lastActDef = getLastActDef(subProcDef);
		Vector relDatas = new Vector(2);
		NWRelDataInst relData = nwSession.newRelDataInst();
		relData.setInstanceID(newSubprocInst.getProcInstID());
		relData.setName("$NextAct");
		relData.setValue("#" + subProcDef.getStartActID() + ">"
				+ lastActDef.getID() + "#");
		relData.setMergeType(0);
		relDatas.add(relData);
		NWRelDataInst relData1 = nwSession.newRelDataInst();
		relData1.setInstanceID(newSubprocInst.getProcInstID());
		relData1.setName("$isRollBackProcess");
		relData1.setValue("true");
		relData1.setMergeType(0);
		relDatas.add(relData1);
		newSubprocInst.saveRelDataList(relDatas);
		newSubprocInst.doStart();
	}

	private NWActDef getLastActDef(NWProcDef procDef) throws NWException {
		NWActDef lastActDef = null;
		Vector allActs = procDef.openActivityList();
		for (int i = 0; i < allActs.size(); i++) {
			NWActDef act = (NWActDef) allActs.get(i);
			if (act.getType() == NWActDef.ACT_TYPE_END) {
				Vector preActList = procDef.openPrevActList(act.getID());
				lastActDef = (NWActDef) preActList.get(0);
				break;
			}
		}
		return lastActDef;
	}

	private NWActDef getSubProcActBefore(NWActInst actInst) throws NWException {
		NWActInst preActInst = nwSession.getActInst("", actInst
				.getOrderPreActInstId());
		switch (preActInst.getType()) {
		case NWActDef.ACT_TYPE_SYNCHSUBPROC:
			return preActInst.getActDef();
		case NWActDef.ACT_TYPE_START:
			String parentActInstId = preActInst.getProcInst()
					.getSuperActInstID();
			if (parentActInstId != null && !"".equals(parentActInstId)) {
				NWActInst parentActInst = nwSession.getActInst("",
						parentActInstId);
				return getSubProcActBefore(parentActInst);
			}
		default:
			return null;
		}
	}

	public void returnToStart(NWWorkItem workitem) throws NWException {
		NWProcInst procinst = workitem.getProcInst();
		NWActDef actDef = getFirstActDef(procinst.getProcDef());
		if (workitem.getActDef().getID().equals(actDef.getID())) {
			returnToParentStart(workitem);
		} else {
			workitem.assignDirectAct(actDef.getID());
			workitem.doComplete(false);
		}
	}

	private NWActDef getFirstActDef(NWProcDef procDef) throws StorageException,
			NWException {
		NWActDef targetActDef = null;
		NWActDef startActDef = nwSession.getActDef(procDef.getStartActID(), 0);
		targetActDef = (NWActDef) startActDef.openNextActList().get(0);
		return targetActDef;
	}

	private void returnToParentStart(NWWorkItem workitem) throws NWException {
		String parentProcId = workitem.getProcInst().getSuperProcInstID();
		if (parentProcId != null && !"".equals(parentProcId)) {
			NWProcInst parentProcinst = nwSession.getProcInst("", parentProcId);
			NWActDef actDef = getFirstActDef(parentProcinst.getProcDef());
			Vector actInsts = nwSession.getActInstManager()
					.openActInstListByActDefID("", 16, actDef.getID());
			if (actInsts.size() != 0) {
				NWActInst targetActinst = (NWActInst) actInsts.get(0);
				workitem.getActInst().doRollBack(targetActinst.getActInstID());
			} else {
				// TODO 回退导致第一个接口人节点没有流转过场景暂不考虑
			}
		}
	}

	/**
	 * 
	 * <p>
	 * Discription:[查询初始态的节点实例]
	 * </p>
	 * 
	 * @param personID
	 * @return
	 * @throws NWException
	 * @author:[创建者中文名字]
	 * @update:[日期YYYY-MM-DD] [更改人姓名][变更描述]
	 */
	public Vector openInitiatedNodes(String personID) throws NWException {
		NWActInstManager actInstManager = nwSession.getActInstManager();
		return actInstManager.openActInstByState(personID, 1);
	}
	
	/**
	 * 
	 * <p>
	 * Discription:[查询初始态的节点实例]
	 * </p>
	 * 
	 * @param personID
	 * @return
	 * @throws NWException
	 * @author:[创建者中文名字]
	 * @update:[日期YYYY-MM-DD] [更改人姓名][变更描述]
	 */
	public Vector openInitiatedNodes(String personID,int offset, int count) throws NWException {
		NWActInstManager actInstManager = nwSession.getActInstManager();
		return actInstManager.openActInstByState(personID, 1,offset,count);
	}


	/**
	 * 返回节点实例所属最近的动态分支实例，如果当前节点不在动态分支内，则返回null。
	 * 
	 * @param actInst
	 *            当前节点实例
	 * @return
	 * @throws NWException
	 */
	public NWActInst getDynamicBranchInst(NWActInst actInst) throws NWException {
		String parentActInstId = actInst.getParentActInstID();
		String procInstId = actInst.getProcInstID();
		if (procInstId.equals(parentActInstId)) {// 当前节点实例上层是所属流程实例
			NWProcInst procInst = nwSession.getProcInst("", procInstId);
			String superActInstId = procInst.getSuperActInstID();
			if (Util.isNullOrEmpty(superActInstId)) {// 所属流程实例为父流程
				return null;
			}
			NWActInst superActInst = nwSession.getActInst("", superActInstId);
			return getDynamicBranchInst(superActInst);
		} else {
			NWActInst parentActInst = nwSession.getActInst("", parentActInstId);
			if (parentActInst.getType() == NWActDef.ACT_TYPE_PARALLEL_BRANCH) {// 父节点为分支实例
				if (parentActInst.isMultiBranch()) {
					return parentActInst;
				} else {
					NWActInst parallelActInst = nwSession.getActInst("",
							parentActInst.getParentActInstID());
					return getDynamicBranchInst(parallelActInst);
				}
			}
		}
		return null;
	}

	/**
	 * 返回回退操作的目标节点实例标识。
	 * 
	 * @param currentActInst
	 *            当前节点实例
	 * @return
	 * @throws NWException
	 */
	public String getRollBackTargetActInstId(NWActInst currentActInst)
			throws NWException {
		String targetActInstId = "";
		NWProcInst currentProcinst = currentActInst.getProcInst();
		NWRelDataInst relData = currentProcinst
				.getRelData("$isRollBackProcess");
		Boolean isRollBackProcess = new Boolean(false);
		if (relData != null) {
			isRollBackProcess = Boolean.valueOf(relData.getValue());
		}
		if (isRollBackProcess.booleanValue()) {
			NWActInst targetActInst = getTargetActInst(currentActInst);
			if (targetActInst == null) {
				List actInstList = nwSession.getActInstManager()
						.openActInstListByActDefID("", 16,
								currentActInst.getActDefID());
				NWActInst actInst = getFirstCompletedActInst(actInstList);
				NWActInst rollBackActInst = nwSession.getActInst("", actInst
						.getFirstCanRollbackActID());
				targetActInstId = rollBackActInst.getActInstID();
			} else {
				targetActInstId = targetActInst.getActInstID();
			}
		} else {
			targetActInstId = currentActInst.getFirstCanRollbackActID();
		}
		return targetActInstId;
	}

	private NWActInst getTargetActInst(NWActInst currentActInst)
			throws NWException {
		Vector preActs = currentActInst.getProcInst().getProcDef()
				.openPrevActList(currentActInst.getActDefID());
		List completedActs = new ArrayList();
		for (int i = 0; i < preActs.size(); i++) {
			NWActDef act = (NWActDef) preActs.get(i);
			completedActs.addAll(nwSession.getActInstManager()
					.openActInstListByActDefID("", 16, act.getID()));
		}
		completedActs = filterCompletedActs(completedActs, currentActInst);
		NWActInst targetActInst = null;
		if (completedActs.size() == 1) {
			NWActInst tempActInst = (NWActInst) completedActs.get(0);
			targetActInst = tempActInst;
		} else {
			for (int i = 0; i < completedActs.size() - 1; i++) {
				NWActInst tempA = (NWActInst) completedActs.get(i);
				NWActInst tempB = (NWActInst) completedActs.get(i + 1);
				targetActInst = tempA;
				if (tempA.getCompleteTime().after(tempB.getCompleteTime())) {
					if (tempA.getCompleteTime().after(
							targetActInst.getCompleteTime())) {
						targetActInst = tempA;
					}
				} else {
					if (tempB.getCompleteTime().after(
							targetActInst.getCompleteTime())) {
						targetActInst = tempB;
					}
				}
			}
		}
		return targetActInst;
	}

	private List filterCompletedActs(List completedActs,
			NWActInst currentActInst) throws NWException {
		List result = new ArrayList();
		for (int i = 0; i < completedActs.size(); i++) {
			NWActInst completedAct = (NWActInst) completedActs.get(i);
			if (completedAct.getType() == NWActDef.ACT_TYPE_MANUAL && InstUtil.isInSameRootProcInst(currentActInst, completedAct))
				result.add(completedAct);
		}
		return result;
	}

	private NWActInst getFirstCompletedActInst(List actInstList) {
		NWActInst result = (NWActInst) actInstList.get(0);
		for (int i = 0; i < actInstList.size(); i++) {
			NWActInst temp = (NWActInst) actInstList.get(i);
			if (temp.getCompleteTime().before(result.getCompleteTime())) {
				result = temp;
			}
		}
		return result;
	}
}