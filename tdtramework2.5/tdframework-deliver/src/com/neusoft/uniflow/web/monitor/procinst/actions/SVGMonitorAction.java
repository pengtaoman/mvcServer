package com.neusoft.uniflow.web.monitor.procinst.actions;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.def.NWActDef;
import com.neusoft.uniflow.api.def.NWProcDef;
import com.neusoft.uniflow.api.handler.NWActInst;
import com.neusoft.uniflow.api.handler.NWProcInst;
import com.neusoft.uniflow.common.NWException;
import com.neusoft.uniflow.common.StorageException;
import com.neusoft.uniflow.util.BeanComparator;
import com.neusoft.uniflow.web.monitor.procinst.beans.DynamicBranchInfo;
import com.neusoft.uniflow.web.monitor.procinst.beans.SVGTranstion;
import com.neusoft.uniflow.web.monitor.procinst.beans.SVGTranstionManager;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.TranslateUtil;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class SVGMonitorAction extends Action {
	
	private static Map VisibleNodeList = new HashMap();
	
	static
	{
		VisibleNodeList.put(new Integer(NWActDef.ACT_TYPE_AUTO), "");
		VisibleNodeList.put(new Integer(NWActDef.ACT_TYPE_MANUAL), "");
		VisibleNodeList.put(new Integer(NWActDef.ACT_TYPE_SYNCHSUBPROC), "");
		VisibleNodeList.put(new Integer(NWActDef.ACT_TYPE_ASYNCHSUBPROC), "");
		VisibleNodeList.put(new Integer(NWActDef.ACT_TYPE_MANUAL_COMPENSATION), "");
		VisibleNodeList.put(new Integer(NWActDef.ACT_TYPE_AUTO_COMPENSATION), "");
		//VisibleNodeList.put(new Integer(NWActDef.ACT_TYPE_END), "");
		VisibleNodeList.put(new Integer(NWActDef.ACT_TYPE_PARALLEL_UNIT), "");
	}
	
	public static String tab = System.getProperty("line.separator");

	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		
		
		boolean isNewVersion = true;
		
		try {
			//流程监控前的输出信息
			String operation = request.getParameter("operation");
			if(operation==null)
				operation="";
			HttpSession httpsession=request.getSession();
			NWSession session = WorkflowManager.getSysNWSession();
			String userID = (String) httpsession
			.getAttribute(SessionManager.BIZ_USERID);
			String procinstid = request.getParameter("procInstID");
			httpsession.setAttribute("oplevel",request.getParameter("oplevel"));//传递给svgfactory,作用有待验证，现可以去掉
			NWProcInst procinst = session.getProcInst(userID, procinstid);
			Date currentTime = new Date();
			System.out.println(currentTime.toString()+">>Log >> 您正在监控的流程：版本ID- ["+procinst.getProcDefID()+"] 版本名称- ["+ procinst.getProcTempVersionName()+"]");
			NWProcDef process = procinst.getProcDef();
			if (process==null){
				httpsession.setAttribute(SessionManager.ERROR, new UniException("无法取得被监控的流程定义！"));
				return mapping.findForward("error");
			}
			
			
			//根据操作向引擎发起针对流程实例的请求
				if (operation.equals("suspend")) {
					procinst.doSuspend();
					request.getSession().setAttribute("curstate", "3");
				} else if (operation.equals("resume")) {
					procinst.doResume();
					request.getSession().setAttribute("curstate", "1");
				} 
				else if (operation.equals("abort")){
					procinst.doAbort();
					request.getSession().setAttribute("curstate", "4");
				}
				else if (operation.equals("restart"))
					procinst.doRestart();
			
			
			//先初始化新版本监控时的参数数据，并放入到request中
			this.processNewVersion(request, procinst);
			//如果是旧版本，还需要设置一些其他参数，并放入到request中（同时也需要新版本中的一些参数）
			if (!isNewVersion){
				this.processOldVersion(httpsession, procinst.getProcDef().openActivityList());
			}
			request.setAttribute("branchInfoList", getDynamicBranchInfo(procinst));
			//根据版本的不同选择的不同的展现页面
			if (!isNewVersion)
				return mapping.findForward("oldversion");
			else
				return mapping.findForward("newversion");
		} catch (Exception e) {
			request.getSession().setAttribute(SessionManager.ERROR, new UniException(e));
			e.printStackTrace();
			return mapping.findForward("error");
		}
	}
	
	private List getDynamicBranchInfo(NWProcInst procInst) throws NWException {
		List infoList = new ArrayList();
		Vector actInsts = procInst.openActInstList(-1);
		List dynamicBranchList = new ArrayList();
		Iterator it = actInsts.iterator();
		while (it.hasNext()) {
			NWActInst actInst = (NWActInst)it.next();
			if (actInst.isMultiBranch()) {
				dynamicBranchList.add(actInst);
			}
		}
		Iterator branchIt = dynamicBranchList.iterator();
		NWProcDef procDef = procInst.getProcDef();
		Vector actDefs = procDef.openActivityList();
		while (branchIt.hasNext()) {
			NWActInst branchInst = (NWActInst)branchIt.next();
			DynamicBranchInfo info = new DynamicBranchInfo();
			info.setBranchDefId(branchInst.getActDefID());
			info.setBranchInstId(branchInst.getActInstID());
			info.setBranchInstTitle(branchInst.getName()+"("+branchInst.getBusinessKey()+")");
			StringBuffer infoDetail = new StringBuffer(512);
			String branchDefId = branchInst.getActDefID();
			infoDetail.append(getAllChildInstInfo(branchDefId, branchInst.getActInstID(), actInsts, actDefs));
			if (infoDetail.length() > 1)
				infoDetail.deleteCharAt(infoDetail.length()-1);
			info.setInfo(infoDetail.toString());
			info.setOtherInfo(branchInst.getParentActInstID());
			infoList.add(info);
		}
		return infoList;
	}
	
	private String getAllChildInstInfo(String branchActDefId ,String branchActInstId ,Vector actInsts ,Vector actDefs) {
		StringBuffer infoDetail = new StringBuffer(512);
		for (int i=0; i<actDefs.size(); i++) {
			NWActDef childDef = (NWActDef)actDefs.get(i);
			if (childDef.getParentActDefID().equals(branchActDefId) && 
					childDef.getType() != NWActDef.ACT_TYPE_PARALLEL_BRANCH_BEGIN &&
					childDef.getType() != NWActDef.ACT_TYPE_PARALLEL_BRANCH_END
					) {
				Map actInstMap = new HashMap();
				if (branchActInstId != null) {
					for (int j=0; j<actInsts.size(); j++) {
						NWActInst childActInst = (NWActInst)actInsts.get(j);
						if (childActInst.getParentActInstID().equals(branchActInstId) &&
								childActInst.getActDefID().equals(childDef.getID())) {
							if (actInstMap.get(childDef.getID()) != null) {
								NWActInst tmpActInst = (NWActInst)actInstMap.get(childDef.getID());
								if (tmpActInst.getStartTime().before(childActInst.getStartTime())) {
									actInstMap.put(childDef.getID(), childActInst);
								}
							} else {
								actInstMap.put(childDef.getID() ,childActInst);
							}
						}
					}
					if (actInstMap.get(childDef.getID()) != null) {
						NWActInst childActInst = (NWActInst)actInstMap.get(childDef.getID());
						infoDetail.append(childActInst.getActDefID()).append(",")
						  .append(childActInst.getActInstID()).append(",")
						  .append(childActInst.getCurState());
						if (childActInst.getType()==NWActDef.ACT_TYPE_ASYNCHSUBPROC||childActInst.getType()==NWActDef.ACT_TYPE_SYNCHSUBPROC) {
							infoDetail.append(",").append(childActInst.getSubProcInstId());
						} else {
							infoDetail.append(",").append("");
						}
					} 
				} 
				NWActInst childInst = (NWActInst)actInstMap.get(childDef.getID());
				if (childInst == null) {
					infoDetail.append(childDef.getID()).append(",")
					  .append("").append(",")
					  .append("").append(",")
					  .append("");
				}
				infoDetail.append(",").append(childDef.getType()).append(";");
				if (childDef.getType() == NWActDef.ACT_TYPE_PARALLEL_UNIT) {
					for (int j=0; j<actDefs.size(); j++) {
						NWActDef tmpDef = (NWActDef)actDefs.get(j);
						if (tmpDef.getType() == NWActDef.ACT_TYPE_PARALLEL_BRANCH && 
								tmpDef.getParentActDefID().equals(childDef.getID())) {
							String childBranchActInstId = null;
							if (childInst != null) {
								for (int k=0; k<actInsts.size(); k++) {
									NWActInst tmpInst = (NWActInst)actInsts.get(k);
									if (tmpInst.getActDefID().equals(tmpDef.getID()) && 
											tmpInst.getParentActInstID().equals(childInst.getActInstID())) {
										infoDetail.append(tmpDef.getID()).append(",")
												  .append(tmpInst.getActInstID()).append(",")
												  .append(tmpInst.getCurState()).append(",")
												  .append(tmpDef.getFormatName()+"("+tmpInst.getBusinessKey()+")");
										childBranchActInstId = tmpInst.getActInstID();
										break;
									}
								}
							}
							if (childBranchActInstId == null) {
								infoDetail.append(tmpDef.getID()).append(",")
										  .append("").append(",")
								          .append("").append(",")
								          .append(tmpDef.getFormatName());
							}
							infoDetail.append(",").append(tmpDef.getType());
							if (childInst != null) {
								infoDetail.append(",").append(childInst.getActInstID()).append(";");
							} else {
								infoDetail.append(",").append("").append(";");
							}
							infoDetail.append(getAllChildInstInfo(tmpDef.getID(), childBranchActInstId, actInsts, actDefs));
						}
					}
				}
			}
		}
		return infoDetail.toString();
	}
	
	//为新版本准备request需要的参数,也就是为procmonitor jsp页面准备数据，同时初始化svg中的数据
	private void processNewVersion(HttpServletRequest request,NWProcInst procinst)
	{
		try{
			String processid = procinst.getProcDefID();
			String version = procinst.getProcTempVersionName();
			String procinstid=procinst.getProcInstID();
			String oplevel=request.getParameter("oplevel");
			String curstate = String.valueOf(procinst.getCurState());
			NWSession session = WorkflowManager.getSysNWSession();
			
			SVGTranstionManager tranManager=SVGTranstionManager.getInstance();
			SVGTranstion tran=(SVGTranstion)tranManager.getTranstion(procinstid);
			if(tran==null){
				 tran = new SVGTranstion(procinst);//初始化新版工具对象
				 tranManager.put(procinstid, tran);
			 }
			request.setAttribute("maxX", String.valueOf(tran.getMaxX()));//jsp中设置svg的最大宽度
			request.setAttribute("maxY", String.valueOf(tran.getMaxY()));//jsp中设置svg的最大高度
			request.setAttribute("curstate", curstate);//jsp中获取流程实例的状态
			request.setAttribute("oplevel", oplevel);//jsp中获取操作
			request.setAttribute("procdefid", processid);//jsp中设置流程定义的id
			request.setAttribute("version", version);//流程定义版本
			request.setAttribute("procTitle", procinst.getName());//流程实例名称
			//计算流程实例的的流转轨迹，并把结果放入到request中
			this.prepareRunLine(request, procinst, session);
			
		}
		catch(Exception ex)
		{
			ex.printStackTrace();
		}
		
	}
	//为流程实例计算流转轨迹，并放入到request中
	private void prepareRunLine(HttpServletRequest request,NWProcInst procinst,NWSession session)
	{
		try{
		Hashtable process_path = new Hashtable();
		Hashtable procinst_path = new Hashtable();
		Hashtable path_lenght = new Hashtable();
		Vector actinsts = null;
		Vector complete_actinsts = null;
		String userID = (String) request.getSession().getAttribute(SessionManager.BIZ_USERID);
		
		String line = "";
		String instLine = "";
		StringBuffer curStr = new StringBuffer();
		String tep = "";
		procinst = session.getProcInst(userID, procinst.getProcInstID());
		actinsts = procinst.openActInstList(-1);
		
		//计算流程实例现在已经创建的节点id
		for (int i = 0; i < actinsts.size(); i++) {
			NWActInst actinst = (NWActInst) actinsts.elementAt(i);
			if (actinst.getCurState() != 0 && actinst.getCurState() != 4&& actinst.getType() < 5) {
				tep = actinst.getActInstID();
					curStr.append(tep).append(",");
			} 
			else if (actinst.getType() == 9 && actinst.getCurState() == 4) {
				tep = actinst.getActInstID();
				curStr.append(tep).append(",");
			}
		}
		if(curStr.length()>0) curStr.deleteCharAt(curStr.length()-1);
		
		
		//初始化流转轨迹
		complete_actinsts = procinst.openActInstList(16);
		int lenght = 0;
		//计算已完成节点的个数
		for (int i = 0; i < complete_actinsts.size(); i++) {
			NWActInst actinst = (NWActInst) complete_actinsts.elementAt(i);
			if (actinst.getCompleteTimeString()!=null&&!actinst.getCompleteTimeString().equals("")){
				if (actinst.getType()!=15 &&!(actinst.getType()>18 && actinst.getType()<=21)&&actinst.getParentActInstID().equals(procinst.getProcInstID())){
					if (!path_lenght.containsKey(actinst.getCompleteTimeString())){
							path_lenght.put(actinst.getCompleteTimeString(), "");
							lenght = lenght + 1;
					}
				}
			}
		}
		String[] act_ctime_str1 = new String[lenght];
		int k = 0;
		//初始化定义流转数组
		for (int i = 0; i < complete_actinsts.size(); i++) {
			NWActInst actinst = (NWActInst) complete_actinsts.elementAt(i);
			if (actinst.getCompleteTimeString()!=null&&!actinst.getCompleteTimeString().equals("")){							
				if (actinst.getType()!=15 &&!(actinst.getType()>18 && actinst.getType()<=21)&&actinst.getParentActInstID().equals(procinst.getProcInstID())){
					if (process_path.containsKey(actinst.getCompleteTimeString())){
						String value = (String)process_path.get(actinst.getCompleteTimeString());
						value = value + "," + actinst.getActDefID();
						process_path.put(actinst.getCompleteTimeString(), value);
					}else{
						act_ctime_str1[k] = actinst.getCompleteTimeString();
						process_path.put(act_ctime_str1[k], actinst.getActDefID());
						k = k + 1;
					}
				}
			}
		}
		k = 0;
		//初始化实例流转数组
		for (int i = 0; i < complete_actinsts.size(); i++) {
			NWActInst actinst = (NWActInst) complete_actinsts.elementAt(i);
			if (actinst.getCompleteTimeString()!=null&&!actinst.getCompleteTimeString().equals("")){
				if (actinst.getType()!=15 &&!(actinst.getType()>18 && actinst.getType()<=21)&&actinst.getParentActInstID().equals(procinst.getProcInstID())){
					if (procinst_path.containsKey(actinst.getCompleteTimeString())){
						String value = (String)procinst_path.get(actinst.getCompleteTimeString());
						value = value + "," + actinst.getActInstID();
						procinst_path.put(actinst.getCompleteTimeString(), value);
					}else{
						procinst_path.put(actinst.getCompleteTimeString(), actinst.getActInstID());
						k = k + 1;
					}
				}
			}
		}
		java.util.Arrays.sort(act_ctime_str1);//按完成时间排序
		line = this.getRealProcessPath(process_path,act_ctime_str1, session);
		instLine = getRealProcInstPath(procinst,session); 
		
		request.setAttribute("line", line);
		request.setAttribute("instline", instLine);
		request.setAttribute("curStr", this.getDefIDStr(session,curStr.toString(), userID));
		}
		catch(Exception ex)
		{
			ex.printStackTrace();
		}
	}
	//如果是旧版本，则通过此方法进行展现前的初始化()
	private void processOldVersion(HttpSession httpsession,Vector activities)
	{
		
		
		Hashtable activityXY = new Hashtable();
		
		int actNum = activities.size();
		int[] activitiesX = new int[actNum];
		int[]  activitiesY = new int[actNum];
		int maxX = 0;
		int maxY = 0;
		for (int i = 0; i < activities.size(); i++) {
			NWActDef actdef = (NWActDef) activities.elementAt(i);
			String actPosition = actdef.getPosition();
			String pos[] = actPosition.split(",");
			activitiesX[i] = Integer.valueOf(pos[0]).intValue();
			activitiesY[i] = Integer.valueOf(pos[1]).intValue();
		}
		
		activitiesX = TranslateUtil.translateSVGpoint(activitiesX);
		activitiesY = TranslateUtil.translateSVGpoint(activitiesY);
		maxX = TranslateUtil.getSVGpointMaxXY(activitiesX) + 200;
		if (maxX < 600) maxX = 600;
		maxY = TranslateUtil.getSVGpointMaxXY(activitiesY) + 100;
		activityXY = TranslateUtil.translateSVGActivity(activities);
		httpsession.setAttribute("maxX", String.valueOf(maxX));
		httpsession.setAttribute("maxY", String.valueOf(maxY));
		httpsession.setAttribute("activitiesX", activitiesX);
		httpsession.setAttribute("activitiesY", activitiesY);
		httpsession.setAttribute("activitiesXY", activityXY);
	}
	
	
	private String getDefIDStr(NWSession session, String temp, String userID)
			throws NWException {
		StringBuffer deftemp = new StringBuffer();
		NWActInst act = null;
		if (temp!=null&&(!temp.equals("")))
		{
			String[] temps = temp.split(",");
			for (int i = 0; i < temps.length; i++) {
				act = session.getActInst(userID, temps[i]);
				deftemp.append(act.getActDefID()).append(",");
			}
			if(deftemp.length()>0) deftemp.deleteCharAt(deftemp.length()-1);
		}
		return deftemp.toString();
	}
	
	private String getRealProcessPath(Hashtable process_path,String[] dates,NWSession session) throws Exception{//轨迹回放时使用
		String realpath = "";
		for (int i = dates.length-1;i>=0;i--){
			String value = (String) process_path.get(dates[i]);
			if (realpath.length()>0)
			    realpath = realpath + "#" + value;
			else
				realpath = value;
			
		}
		return realpath;	
	}

	
	private boolean isNodeVisible(String procInstId,NWActInst actInst)
	{
		boolean result = false;
		int type = actInst.getType();
		boolean parentIsProc= actInst.getParentActInstID().equals(procInstId);
		boolean isVisible=VisibleNodeList.get(new Integer(type))!=null;
		if( isVisible&&parentIsProc)
			result=true;
		return result;
	}
	
	private String getRealProcInstPath(NWProcInst procinst,NWSession session)
	{
		StringBuffer sb = new StringBuffer();
		try {
			//获得完成态的节点实例并按照完成时间排序
			List nodeList=getSortActListByProperty(procinst,16,"completeTime");
			//获得运行、激活 挂起的节点实例并按照开始时间排序
			List runNodeList=getSortActListByProperty(procinst,14,"startTime");
			nodeList.addAll(runNodeList);
			
			int len = nodeList.size();
			for(int i=0;i<len;i++)
			{
				NWActInst nwActInst = (NWActInst)nodeList.get(i);
				sb.append(nwActInst.getActInstID()).append("#");
			}
			if(sb.length()>0) sb.deleteCharAt(sb.length()-1);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return sb.toString();
	}
	
	private List getSortActListByProperty(NWProcInst procinst,int state,String property) throws StorageException{
		
		BeanComparator beanComparator = new BeanComparator("startTime");
		Vector actinsts = procinst.openActInstList(state);
		List nodeList = new ArrayList();
		int len = actinsts.size();
		String procInstId = procinst.getProcInstID();
		for(int i=0;i<len;i++)
		{
			NWActInst nwActInst = (NWActInst)actinsts.get(i);
			if(isNodeVisible(procInstId,nwActInst))
			{
				nodeList.add(nwActInst);
			}
		}
		
		Collections.sort(nodeList, beanComparator);
		return nodeList;
	}
	
}