/*
 * Copyright 2006 The Neusoft Software Foundation.
 * 
 */

package com.neusoft.uniflow.web.AO;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Vector;

import javax.servlet.http.HttpServletRequest;

import com.neusoft.uniflow.api.NWFilter;
import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.bizhandler.NWBizMetaDataManager;
import com.neusoft.uniflow.api.bizhandler.NWBizWorkItemImpl;
import com.neusoft.uniflow.api.bizhandler.NWBizWorkItemManager;
import com.neusoft.uniflow.api.data.WorkItemPopulate;
import com.neusoft.uniflow.api.def.NWActDef;
import com.neusoft.uniflow.api.handler.NWActInst;
import com.neusoft.uniflow.api.handler.NWBranchActInst;
import com.neusoft.uniflow.api.handler.NWParallelUnitActInst;
import com.neusoft.uniflow.api.handler.NWParticipantDetail;
import com.neusoft.uniflow.api.handler.NWProcInst;
import com.neusoft.uniflow.api.handler.NWRelDataInst;
import com.neusoft.uniflow.api.handler.NWWorkItem;
import com.neusoft.uniflow.api.handler.NWWorkItemManager;
import com.neusoft.uniflow.api.res.NWApplication;
import com.neusoft.uniflow.common.IExceptionConstants;
import com.neusoft.uniflow.common.NWException;
import com.neusoft.uniflow.common.NWResultSet;
import com.neusoft.uniflow.common.StorageException;
import com.neusoft.uniflow.engine.factory.WorkflowObjectFactory;
import com.neusoft.uniflow.engine.inst.WorkItemInstance;
import com.neusoft.uniflow.service.WorkFlowContext;
import com.neusoft.uniflow.util.Util;
import com.neusoft.uniflow.web.util.SessionManager;

/**
 * 工作项相关方法
 * 
 * @author shangzf
 * @version $Revision: 1.1 $ $Date: 2007/11/29 03:37:01 $
 * 
 */

public class WorkItemAO {

	private NWSession nwSession = AOManager.getNWSession();
	/**
	 * 通过此构造方法初始化工作流入口类
	 * 
	 */
	private static WorkItemAO instance = null;

	private WorkItemAO() {

	}

	public static WorkItemAO getInstance() {
		if (instance == null)
			instance = new WorkItemAO();
		return instance;
	}

	/**
	 * 获取个人某种状态下的业务工作项数量,工作项的状态包括激活态、运行态、挂起态、完成态，此方法的状态参数可以取四种状态的任意组合，例如
	 * 
	 * @param request
	 *            Http请求对象
	 * @param bizViewName
	 *            业务视图的别名，通过业务视图别名来查询视图获取数据
	 * @param state
	 *            工作项状态 <ui>
	 *            <li>2 运行态
	 *            <li>4 激活态
	 *            <li>6 (运行态+激活态)等 </ui>
	 * @return 工作项数量
	 * @throws AOException
	 *             当参数为空、不正确或数据库操作错误时抛出异常
	 */
	public int getBizAllWorkitemNum(HttpServletRequest request,
			String bizViewName, int state) throws AOException, Exception {
		int number;
		if (bizViewName == null || bizViewName.equals("")) {
			throw new AOException(90100);
		}
		String userID = (String) request.getSession().getAttribute(
				SessionManager.BIZ_USERID);

		NWBizWorkItemManager manager = nwSession
				.getBizWorkItemManager(bizViewName);

		number = manager.getAllWorkitemNum(userID, state, "");// 参数3为业务类型,空表示查询所有业务类型

		return number;
	}

	/**
	 * 打开个人的全部业务工作项列表
	 * 
	 * @author
	 * @param bizViewName
	 *            分类
	 * @param personID
	 *            人员标识
	 * @param state
	 *            工作项状态
	 * @param orderby
	 *            排序字段，可以为空
	 * @param startLocation
	 *            起始位置
	 * @param offset
	 *            页大小,大于0的数
	 * @param isAscending
	 *            升降序 <ui>
	 *            <li>true 升序
	 *            <li>false 降序 </ui>
	 * @param isFenDuan
	 *            是否分段
	 *            <li>true 分页方式查询
	 *            <li>false 不分页返回所有值
	 * @return
	 * @throws Exception
	 */
	public Vector openBizAllWorkitems(HttpServletRequest request,
			String bizViewName, int state, String orderby, int startLocation,
			int offset, boolean isAscending, boolean isFenDuan)
			throws AOException, Exception {
		Vector workItemList = null;
		if (bizViewName == null || bizViewName.equals("")) {
			throw new AOException(90100);// 视图名称为空，无法调用接口查询业务视图
		}

		String userID = (String) request.getSession().getAttribute(
				SessionManager.BIZ_USERID);

		NWBizWorkItemManager manager = nwSession
				.getBizWorkItemManager(bizViewName);

		workItemList = manager.openAllWorkitems(userID, state, orderby,
				startLocation, offset, bizViewName, isAscending, isFenDuan);
		return workItemList;
	}

	/**
	 * 获取业务工作项数量
	 * 
	 * @param request
	 *            HTTP请求对象
	 * @param bizViewName
	 *            业务视图名
	 * @param type
	 *            工作项类型，按参与者类型分只有个人工作项和角色工作项 <ui>
	 *            <li>1 个人工作项
	 *            <li>2 角色工作项
	 *            <li>3 代理工作项
	 *            <li>4 超时工作项
	 *            <li>5 所有工作项(个人、角色、代理） </ui>
	 * @param filter
	 *            过滤条件组装器
	 * @return 业务工作项数量
	 * @throws AOException
	 */
	public int getBizAllWorkitemNumByFilter(HttpServletRequest request,
			String bizViewName, int type, NWFilter filter) throws AOException,
			Exception {
		int number = 0;
		if (bizViewName == null || bizViewName.equals("")) {
			throw new AOException(90100);// 视图名称为空，无法调用接口查询业务视图
		}
		String userID = (String) request.getSession().getAttribute(
				SessionManager.BIZ_USERID);

		NWBizWorkItemManager manager = nwSession
				.getBizWorkItemManager(bizViewName);

		number = manager.getWorkItemNum(userID, filter, type);

		return number;
	}

	/**
	 * 获取业务工作项对象列表
	 * 
	 * @param request
	 *            HTTP请求对象
	 * @param bizViewName
	 *            业务视图名
	 * @param type
	 *            工作项类型，按参与者类型分只有个人工作项和角色工作项 <ui>
	 *            <li>1 个人工作项
	 *            <li>2 角色工作项
	 *            <li>3 代理工作项
	 *            <li>4 超时工作项
	 *            <li>5 所有工作项(个人、角色、代理） </ui>
	 * @param filter
	 *            过滤条件组装器
	 * @return 符合条件的业务工作项对象集合 集合中的对象为NWBizWorkItem
	 * @throws AOException
	 */
	public Vector openBizAllWorkitemsByFilter(HttpServletRequest request,
			String bizViewName, int type, NWFilter filter) throws AOException,
			NWException {

		Vector workItemList = null;

		if (bizViewName == null || bizViewName.equals("")) {
			throw new AOException(90100);// 视图名称为空，无法调用接口查询业务视图
		}

		String userID = (String) request.getSession().getAttribute(
				SessionManager.BIZ_USERID);

		NWBizWorkItemManager manager = nwSession
				.getBizWorkItemManager(bizViewName);

		workItemList = manager.openWorkItemList(userID, filter, type);

		return workItemList;
	}

	/**
	 * 由视图名称为参数获取对应业务视图中包含的业务字段名（columnName）与字段对应的显示名（displayName）
	 * 
	 * @param bizViewName
	 *            对应SYS_CATEGORY表中的category值
	 * @return 视图中对应的列名与显示名 对应SYS_BIZDATA表中的name和colname
	 * @throws AOException
	 */
	public Vector getNameAndColumnByCategory(String bizViewName)
			throws AOException, NWException {

		Vector namecolNameVec = null;

		if (bizViewName == null || bizViewName.equals("")) {
			throw new AOException(90101);// 视图名称为空，无法调用接口查询业务视图
		}

		NWBizMetaDataManager metaManager = nwSession.getBizMetaDataManager();

		namecolNameVec = metaManager.openBizMetaDataListByCategory(bizViewName);

		return namecolNameVec;
	}

	/**
	 * 保存字符串类型相关变量,如果根据变量名称未查询到变量对象，则根据变量名创建一新变量并保存变量值
	 * 
	 * @param workItem
	 *            工作项对象
	 * @param relDataName
	 *            相关变量名称
	 * @param realData
	 *            相关数据值
	 * @throws NWException
	 */
	public void saveStrRD(NWWorkItem workItem, String relDataName,
			String relDataValue) throws NWException {
		NWRelDataInst nwRD = workItem.getRelData(relDataName);

		if (nwRD == null) {
			nwRD = nwSession.newRelDataInst();
			nwRD.setName(relDataName);
			nwRD.setType(1);
		}

		nwRD.setValue(relDataValue);

		workItem.saveRelData(nwRD);
	}

	/**
	 * 保存数字类型相关变量,如果根据变量名称未查询到变量对象，则根据变量名创建一新变量并保存变量值
	 * 
	 * @param workItem
	 *            工作项对象
	 * @param relDataName
	 *            相关变量名称
	 * @param realData
	 *            相关数据值
	 * @throws NWException
	 */
	public void saveIntRD(NWWorkItem workItem, String relDataName,
			int relDataValue) throws NWException {
		NWRelDataInst nwRD = workItem.getRelData(relDataName);

		if (nwRD == null) {
			nwRD = nwSession.newRelDataInst();
			nwRD.setName(relDataName);
			nwRD.setType(0);
		}

		nwRD.setValue(String.valueOf(relDataValue));

		workItem.saveRelData(nwRD);
	}

	/**
	 * 保存相关变量列表,如果一次保存的相关变量较多推荐调用此方法
	 * 
	 * @param workItem
	 *            工作项对象
	 * @param relDataName[]
	 *            相关变量名称数组
	 * @param realDataValues[]
	 *            相关数据值数组
	 * @throws NWException
	 */

	public void saveRelDataList(NWWorkItem workItem, String[] relDataNames,
			String[] relDataValues) throws AOException, NWException {
		if (relDataNames.length != relDataValues.length) {
			throw new AOException(90102);
		}
		Vector relDataList = new Vector(relDataNames.length);
		for (int i = 0; i < relDataNames.length; i++) {
			NWRelDataInst nwRD = workItem.getRelData(relDataNames[i]);
			if (nwRD == null) {
				nwRD = nwSession.newRelDataInst();
				nwRD.setName(relDataValues[i]);
				nwRD.setType(1);
			}
			relDataList.add(nwRD);
		}
		workItem.saveRelDataList(relDataList);
	}

	/**
	 * 根据工作项标识获取当前登陆人的工作项对象
	 * 
	 * @param request
	 *            HTTP请求对象
	 * @param workItemID
	 *            工作项标识
	 * @param NWWorkItem
	 *            工作项对象
	 * @throws NWException
	 */

	public NWWorkItem getWorkItem(HttpServletRequest request, String workItemID)
			throws NWException {

		NWWorkItem workItem = null;

		String userID = (String) request.getSession().getAttribute(
				SessionManager.BIZ_USERID);

		workItem = nwSession.getWorkItem(userID, workItemID);

		return workItem;
	}

	/**
	 * 如果定义流程时手动节点绑定的应用程序类型为表单，其返回值为调用表单所需的URL参数串，其值已经包含调用表单所需的所有参数<br>
	 * 格式为：/formlistener?fid=<u>formid</u>&uid=<u>userID</u>&pv=<u>actDefID</u>&workitem_id=<u>workitemID</u>&procInstID=<u>procinstID</u><br>
	 * 如果定义流程时手动节点绑定的应用程序类型为URL串，其返回值为调用html静态页面或jsp等动态页面所需的URL参数串<br>
	 * 格式有两种:<br>
	 * <li> 如果绑定节点时的应用程序串中不包含url参数，例如"/example/app.jsp",返回结果是<br>
	 * /example/app.jsp?workItemID=<u>workItemID</u>&procInstID=<u>procInstID</u><br>
	 * <li>如果绑定节点时的应用程序串中已经包含url参数，例如"/example/app.jsp?bizCode=100",返回结果是<br>
	 * /example/app.jsp?bizCode=100&wid=<u>workitemID</u>&procInstID=<u>procInstID</u><br>
	 * 
	 * @param request
	 *            HTTP请求对象
	 * @param workItem
	 *            工作项对象
	 * @return 应用程序URL串
	 * @throws NWException
	 *             当通过工作项对象获取所属的节点定义对象时失败会抛出NWException异常信息
	 */
	public String getRealAppURL(HttpServletRequest request, NWWorkItem workItem)
			throws NWException {
		String appURL = workItem.getAppURL();
		if (appURL == null || appURL.equals("")) {
			return "";
		}
		StringBuffer retAppUrl = new StringBuffer();
		String appType = workItem.getAppType();
		if (appType.equalsIgnoreCase("url")) {
			char joinChar;
			if (appURL.indexOf("?") == -1) {
				joinChar = '?';
			} else {
				joinChar = '&';
			}
			retAppUrl.append(appURL).append(joinChar).append("workItemID=");
			retAppUrl.append(workItem.getWorkItemID()).append("&procInstID=")
					.append(workItem.getProcInstID()).append("&appType=")
					.append(appType);
		} else {
			if (appType.equalsIgnoreCase("wform")) {
				int entType = workItem.getEntityType();
				String uid = "";
				if (entType == 0 || entType == 1) {
					uid = workItem.getEntityID();
				} else {
					uid = String.valueOf(entType);
				}
				// System.out.println("workItem.getWorkItemID():"+workItem.getWorkItemID());
				retAppUrl.append("/formlistener?fid=").append(appURL);
				retAppUrl.append("&pv=").append(workItem.getActDef().getID())
						.append("&workitem_id=").append(
								workItem.getWorkItemID())
						.append("&procInstID=")
						.append(workItem.getProcInstID()).append("&uid=")
						.append(uid);
			}
			if (appType.equalsIgnoreCase(NWApplication.APP_TYPE_PAGEFLOW)) {
				retAppUrl.append(workItem.getAppURL());
			}

		}
		return retAppUrl.toString();
	}

	/**
	 * 根据工作项对象获取从当前节点可回退到的节点实例列表
	 * 
	 * @param request
	 *            HTTP请求对象
	 * @param workItem
	 *            工作项对象
	 * @param 节点实例集合
	 *            集合中对象为NWActInst
	 * @throws NWException
	 */

	public Vector openRollbackableActList(HttpServletRequest request,
			NWWorkItem workItem) throws NWException {

		Vector canRollBackList = null;

		NWActInst actInst = workItem.getActInst();

		canRollBackList = actInst.openRollbackableActList();

		return canRollBackList;
	}

	/**
	 * 代表工作的工作项处理，若实现业务中的工作代办可设置isCommission参数为”true“
	 * 若实现实际业务中的工作重指派可设置isCommission参数为”false“
	 * 
	 * @param request
	 *            HTTP请求对象
	 * @param workItem
	 *            工作项对象
	 * @param persons
	 *            人员ID数组
	 * @param isCommission
	 *            是否为工作代办 ”true“既为工作代办，”false“为重指派
	 * @param 节点实例集合
	 *            集合中对象为NWActInst
	 * @throws NWException
	 */

	public void doCommissionOrReassign(HttpServletRequest request,
			NWWorkItem workItem, String[] persons, boolean isCommission)
			throws NWException {
		Vector assignToList = new Vector(persons.length);
		if (persons.length == 0) {
			return;
		}
		for (int i = 0; i < persons.length; i++) {
			assignToList.add(persons[i]);
		}

		String userID = (String) request.getSession().getAttribute(
				SessionManager.BIZ_USERID);

		NWWorkItemManager wiManager = nwSession.getWorkItemManager();

		if (!isCommission) {
			wiManager.doCommission(workItem.getWorkItemID(), userID,
					assignToList);
		} else {
			wiManager
					.doReassign(workItem.getWorkItemID(), userID, assignToList);
		}
	}

	/**
	 * 打开工作项：&nbsp;
	 * 在程序中如果已经获得了工作项对象，则推荐调用此方法激活工作项，而不推荐调用doOpen(request,workItemID)
	 * 
	 * @param workItem
	 *            工作项对象
	 * @throws NWException
	 *             当引擎服务器连接不上或者工作项对象的状态已经变成“完成”等非运行和激活态的情况下会抛出异常
	 */
	public void doOpen(NWWorkItem workItem) throws NWException {
		workItem.doOpen();
	}

	/**
	 * 关闭工作项：&nbsp;
	 * 在程序中如果已经获得了工作项对象，则推荐调用此方法关闭工作项，而不推荐调用doClose(request,workItemID)
	 * 
	 * @param workItem
	 *            工作项对象
	 * @throws NWException
	 *             当引擎服务器连接不上或者工作项对象的状态为非激活态的情况下会抛出异常
	 */
	public void doClose(NWWorkItem workItem) throws NWException {
		workItem.doClose();
	}

	/**
	 * 提交工作项&nbsp;
	 * 在程序中如果已经获得了工作项对象，则推荐调用此方法提交工作项，而不推荐调用doComplete(request,workItemID)
	 * 
	 * @param workItem
	 *            工作项对象
	 * @throws NWException
	 *             当引擎服务器连接不上或者工作项对象的状态为挂起、完成、终止态的情况下会抛出异常
	 */
	public void doComplete(NWWorkItem workItem) throws NWException {
		workItem.doComplete(false);
	}

	/**
	 * 根据工作项标识激活工作项，如果在调用工作项的doOpen方法之前已经获得工作项对象，建议调用以工作项对象激活工作项的方法doOpen(workItem)
	 * 
	 * @param request
	 *            HTTP请求对象
	 * @param workItemID
	 *            工作项标识
	 * @throws NWException
	 * @see doOpen(workItem)
	 */
	public void doOpen(HttpServletRequest request, String workItemID)
			throws NWException {

		String userID = (String) request.getSession().getAttribute(
				SessionManager.BIZ_USERID);

		NWWorkItemManager wiManager = nwSession.getWorkItemManager();

		wiManager.doOpen(workItemID, userID);
	}

	/**
	 * 根据工作项标识关闭激活态的工作项，如果在调用工作项的doClose方法之前已经获得工作项对象，建议调用以工作项对象关闭激活态的工作项的方法doClose(workItem)
	 * 
	 * @param request
	 *            HTTP请求对象
	 * @param workItemID
	 *            工作项标识
	 * @throws NWException
	 * @see doClose(workItem)
	 */
	public void doClose(HttpServletRequest request, String workItemID)
			throws NWException {

		String userID = (String) request.getSession().getAttribute(
				SessionManager.BIZ_USERID);

		NWWorkItemManager wiManager = nwSession.getWorkItemManager();

		wiManager.doClose(workItemID, userID);
	}

	/**
	 * 根据工作项标识提交工作项，如果在调用工作项的doComplete方法之前已经获得工作项对象，建议调用以工作项对象提交工作项的方法doComplete(workItem)
	 * 
	 * @param request
	 *            HTTP请求对象
	 * @param workItemID
	 *            工作项标识
	 * @throws NWException
	 * @see doComplete(workItem)
	 */

	public void doComplete(HttpServletRequest request, String workItemID)
			throws NWException {

		String userID = (String) request.getSession().getAttribute(
				SessionManager.BIZ_USERID);

		NWWorkItemManager wiManager = nwSession.getWorkItemManager();

		wiManager.doComplete(workItemID, userID, false);
	}

	/**
	 * 根据工作项标识提交ADHOC工作项，如果在调用工作项的doComplete方法之前已经获得工作项对象，建议调用以工作项对象提交工作项的方法doComplete(workItem)
	 * 
	 * @param request
	 *            HTTP请求对象
	 * @param workItemID
	 *            工作项标识
	 * @throws NWException
	 * @see doClose(workItem)
	 */

	public void doCompleteADHOC(HttpServletRequest request, String workItemID,
			boolean commitParentWorkItem) throws NWException {

		String userID = (String) request.getSession().getAttribute(
				SessionManager.BIZ_USERID);

		NWWorkItemManager wiManager = nwSession.getWorkItemManager();

		if (commitParentWorkItem)
			wiManager.doComplete(workItemID, userID, false);
		else
			wiManager.doComplete(workItemID, userID, false);
	}

	/**
	 * 重新指定下一步节点的参与者，根据节点的操作级别属性决定节点的提交的方式<br>
	 * 如果定义模板时节点的操作级别为”节点“，无论是主送还是抄送产生的工作项提交时节点同样会被提交<br>
	 * 如果定义模板时节点的操作级别为”工作项“，如果是主送则当工作项提交时会提交节点，但抄送产生的工作项提交时节点不会被提交<br>
	 * 
	 * @param workitem
	 *            工作项对象
	 * @param sendToID
	 *            下一步的节点定义标识
	 * @param sendToPartis
	 *            下一步主送的参与者数组，其每一个数据的格式为”参与者类型,参与者标识“，参与者类型为”0“代表人员，”1“代表角色，参与者标识既是人员标识或角色标识<br>
	 * @param copyToPartis
	 *            下一步抄送的参与者数组，其每一个数据的格式为”参与者类型,参与者标识“，参与者类型为”0“代表人员，”1“代表角色，参与者标识既是人员标识或角色标识
	 * @throws NWException
	 * @see doClose(workItem)
	 */
	public void assignNextActParticipant(NWWorkItem workItem, String sendToID,
			String[] sendToPartis, String[] copyToPartis) throws NWException {

		Vector partiDetailList = new Vector(5, 5);

		NWParticipantDetail partiDetail;

		String parti = null;

		if (sendToPartis != null) {
			for (int i = 0; i < sendToPartis.length; i++) {
				parti = sendToPartis[i];
				partiDetail = nwSession.newParticipantDetail();
				partiDetail.setEntityType(Integer
						.valueOf(parti.substring(0, 1)).intValue());
				partiDetail.setEntityID(parti.substring(1));
				partiDetail.setActionType(1);
				partiDetailList.add(partiDetail);
			}
		}
		if (copyToPartis != null) {
			for (int i = 0; i < copyToPartis.length; i++) {
				parti = copyToPartis[i];
				partiDetail = nwSession.newParticipantDetail();
				partiDetail.setEntityType(Integer
						.valueOf(parti.substring(0, 1)).intValue());
				partiDetail.setEntityID(parti.substring(1));
				partiDetail.setActionType(0);
				partiDetailList.add(partiDetail);
			}
		}
		workItem.assignNextActParticipant(partiDetailList, sendToID);
		workItem.assignDirectAct(sendToID);
	}

	/**
	 * 提交并发分支中的工作项，如果当前分支结束，直接终止其它分支
	 * 
	 * @param workItem
	 *            工作项对象
	 * @throws NWException
	 *             当引擎服务器连接不上或者工作项对象的状态为挂起、完成、终止态的情况下会抛出异常
	 */
	public void doInBranchWorkItemComplete(NWWorkItem workItem)
			throws NWException {
		workItem.doComplete(false);
		NWActInst actInst = workItem.getActInst();
		String parentActInstID = actInst.getParentActInstID();
		if (!parentActInstID.equals(workItem.getProcInstID()))
			this.doBranchesAbort(parentActInstID);
	}

	private void doBranchesAbort(String branchID) throws NWException {
		NWActInst parentActInst = nwSession.getActInst("", branchID);
		if (parentActInst != null
				&& parentActInst.getType() == NWActDef.ACT_TYPE_PARALLEL_BRANCH
				&& parentActInst.getCurState() == 4) {
			String id = parentActInst.getParentActInstID();
			NWActInst parentAct = nwSession.getActInst("", id);
			if (parentAct.getType() == NWActDef.ACT_TYPE_PARALLEL_UNIT) {
				NWParallelUnitActInst unitActInst = (NWParallelUnitActInst) parentAct;
				Vector branches = unitActInst.openAllBranchInstList(-1);
				for (int i = 0; i < branches.size(); i++) {
					NWBranchActInst branch = (NWBranchActInst) branches
							.elementAt(i);
					System.out.println("分支状态：" + branch.getName() + " "
							+ branch.getCurState());
					if (branch.getCurState() != NWActInst.STATE_COMPLETE
							&& branch.getCurState() != NWActInst.STATE_TERMINATE) {
						branch.forceComplete();
					}
				}
				if (!unitActInst.getParentActInstID().equals(
						unitActInst.getProcInstID()))
					this.doBranchesAbort(unitActInst.getParentActInstID());
			}
		}
	}

	/**
	 * 根据目标节点定义ID和当前工作项查找到目标节点实例。
	 * 
	 * @param workitem
	 *            当前办理工作项
	 * @param targetActDefId
	 *            返回目标节点定义ID
	 * @return 目标节点实例
	 * @throws NWException
	 */
	public NWActInst findTargetActInst(NWWorkItem workitem,
			String targetActDefId) throws NWException {
		NWActInst actInst = workitem.getActInst();
		if (actInst != null) {
			NWProcInst procInst = actInst.getProcInst();
			List targetActInstList = findActInstByActdefId(procInst,
					targetActDefId);
			// NWProcInst rootSubprocInst =
			// findRootSubprocInstByCurrentProcInst(procInst);
			// List actInstList = rootSubprocInst.openActInstList(48);
			// List targetActInstList = new ArrayList();
			// for (int i = 0; i < actInstList.size(); i++) {
			// NWActInst tempActInst = (NWActInst) actInstList.get(i);
			// if (tempActInst.getActDefID().equals(targetActDefId)) {
			// targetActInstList.add(tempActInst);
			// }
			// }

			if (targetActInstList.size() > 1) {
				// 按照时间排序，取最近一次实例
				NWActInst lastActInst = (NWActInst) targetActInstList.get(0);
				for (int i = 1; i < targetActInstList.size(); i++) {
					NWActInst tempActInst = (NWActInst) targetActInstList
							.get(i);
					if (tempActInst.getCompleteTime().after(
							lastActInst.getCompleteTime())) {
						lastActInst = tempActInst;
					}
				}
				return lastActInst;
			} else if (targetActInstList.size() == 1) {
				return (NWActInst) targetActInstList.get(0);
			}
		}
		return null;
	}

	private List findActInstByActdefId(NWProcInst curProcInst,
			String targetActDefId) throws NWException {
		List actInstList = curProcInst.openActInstList(48);
		List targetActInstList = new ArrayList();
		for (int i = 0; i < actInstList.size(); i++) {
			NWActInst tempActInst = (NWActInst) actInstList.get(i);
			if (tempActInst.getActDefID().equals(targetActDefId)) {
				targetActInstList.add(tempActInst);
			}
		}
		if (targetActInstList.size() > 0)
			return targetActInstList;
		else {
			String superProcInstid = curProcInst.getSuperProcInstID();
			if (Util.isNullOrEmpty(superProcInstid)
					|| superProcInstid.equals(curProcInst.getProcInstID())) {
				return null;
			} else {
				NWProcInst superProcInst = nwSession.getProcInst("",
						superProcInstid);
				return findActInstByActdefId(superProcInst, targetActDefId);
			}
		}

	}

	/**
	 * for 电信pms，根据流程实例查找所属大阶段流程实例
	 * 
	 * @param procInst
	 * @return
	 * @throws NWException
	 */
	private NWProcInst findRootSubprocInstByCurrentProcInst(NWProcInst procInst)
			throws NWException {
		if (procInst != null) {
			String superProcInstId = procInst.getSuperProcInstID();
			if (Util.isNullOrEmpty(superProcInstId)
					|| superProcInstId.equals(procInst.getProcInstID())) {
				return procInst;
			}
			NWProcInst superProcInst = nwSession.getProcInst("",
					superProcInstId);
			return findRootSubprocInstByCurrentProcInst(superProcInst);
		}
		return null;
	}

	public List openPreWorkItemList(NWWorkItem workitem) throws NWException {
		List preWorkItemList = null;
		try {
			if (workitem.getFlowDirection() < 1) {
				List preActInstList = workitem.getActInst()
						.openPreManualActInstList();
				preWorkItemList = openCompletedWorkItems((NWActInst) preActInstList
						.get(0));
			} else {
				preWorkItemList = openPreWorkItemList(workitem.getActInst());
			}
		} catch (NWException e) {
			if (e.getMsgID() == IExceptionConstants.CANROLLBACKACT_NOT_FOUNT) {
				preWorkItemList = new ArrayList();
			} else {
				throw e;
			}
		}
		return preWorkItemList;
	}

	public List openPreWorkItemList(NWActInst actInst) throws NWException {
		List preWorkItemList = new ArrayList();
		String preActInstId = actInst.getPreActInstID();
		NWActInst preActInst = nwSession.getActInst("", preActInstId);
		if (preActInst.getType() == NWActDef.ACT_TYPE_MANUAL) {
			preWorkItemList.addAll(openCompletedWorkItems(preActInst));
		} else if (preActInst.getType() == NWActDef.ACT_TYPE_START) {
			String subProcActInstId = preActInst.getProcInst()
					.getSuperActInstID();
			if (subProcActInstId.equals("")) {
				return new ArrayList();
			}
			NWActInst subProcActInst = nwSession.getActInst("",
					subProcActInstId);
			preWorkItemList.addAll(openPreWorkItemList(subProcActInst));
		} else if (preActInst.getType() == NWActDef.ACT_TYPE_SYNCHSUBPROC) {
			NWProcInst subProcInst = preActInst.getSubProcInst();
			List completedActInsts = subProcInst.openActInstList(16);
			NWActInst startActInst = null;
			for (int i = 0; i < completedActInsts.size(); i++) {
				startActInst = (NWActInst) completedActInsts.get(i);
				if (startActInst.getType() == NWActDef.ACT_TYPE_START) {
					break;
				}
			}
			for (int i = 0; i < completedActInsts.size(); i++) {
				NWActInst temp = (NWActInst) completedActInsts.get(i);
				if (temp.getType() == NWActDef.ACT_TYPE_MANUAL) {
					temp.getPreActInstID().equals(startActInst.getActInstID());
					preWorkItemList.addAll(openCompletedWorkItems(temp));
					break;
				}
			}
		}
		return preWorkItemList;
	}

	public List openCompletedWorkItems(NWActInst preActInst) throws NWException {
		List completedWorkItemList = new ArrayList();
		Vector completedWorkItems = nwSession.getWorkItemManager()
				.openWorkitemListByActDefID(16, preActInst.getActDefID());
		for (int i = 0; i < completedWorkItems.size(); i++) {
			NWWorkItem temp = (NWWorkItem) completedWorkItems.get(i);
			if (temp.getActInstID().equals(preActInst.getActInstID())) {
				completedWorkItemList.add(temp);
			}
		}
		if (completedWorkItemList.size() == 0) {
			return openPreWorkItemList(preActInst);
		}
		return completedWorkItemList;
	}

	/**
	 * 取得业务工作项对象集合
	 * @param filter 过滤条件
	 * @param category 业务分类
	 * @return 业务工作项对象集合
	 */
	public List openWorkItemList(NWFilter filter, String category) throws NWException {
		NWBizMetaDataManager bmdm = nwSession.getBizMetaDataManager();
		HashMap nameAndColumn = bmdm.openBizNameAndColNameListByCategory(category);
		String viewName = bmdm.getBizViewNameByCategory(category);
		String SELECT_SQL = WorkItemPopulate.selectWIView(nameAndColumn, viewName);
		StringBuffer sql = new StringBuffer(SELECT_SQL);
		if (!filter.getResultString().trim().equals("")) {
			sql.append(" WHERE ");
			sql.append(filter.getResultString());
		}
		NWResultSet rs = WorkFlowContext.getInstance().getPersistence()
				.executeQuery(sql.toString());
		NWBizWorkItemImpl workitem;
		List workItemList = new ArrayList();
		while (rs.next()) {
			workitem = new NWBizWorkItemImpl("");
			initWorkItemInstance(workitem, rs);
			workitem.addBizData(nameAndColumn, rs);
			workItemList.add(workitem);
		}
		return workItemList;
	}

	private void initWorkItemInstance(NWBizWorkItemImpl workitem, NWResultSet rs)
			throws StorageException {
		workitem.wiID = rs.getString(1);
		workitem.procInstID = rs.getString(2);
		workitem.actInstID = rs.getString(3);
		workitem.superWorkItemID = rs.getString(4);
		workitem.wiName = rs.getString(5);
		workitem.curState = rs.getInt(6);
		workitem.completeTime = rs.getDate(7);
		workitem.startTime = rs.getDate(8);
		workitem.setLimitTime(rs.getInt(9));
		workitem.appName = rs.getString(10);
		workitem.setAppType(rs.getString(11));
		workitem.appURL = rs.getString(12);
		workitem.category = rs.getString(13);
		workitem.actionType = rs.getInt(14);
		workitem.userName = rs.getString(15);
		workitem.userID = rs.getString(16);
		workitem.wiType = rs.getInt(17);
		workitem.operationLevel = rs.getInt(18);
		workitem.userEntityType = rs.getInt(19);
		workitem.userEntityName = rs.getString(20);
		workitem.userEntityID = rs.getString(21);
		workitem.setR_data_id(rs.getString(22));
		workitem.userType = rs.getInt(23);// participant_type
		workitem.timeState = rs.getInt(24);// overdued
		workitem.wiHandling = rs.getInt(25);
		workitem.priority = rs.getInt(26);
		workitem.needCommitRole = rs.getInt(27) == 1 ? true : false;
		workitem.description = rs.getString(28);
		workitem.extProp = rs.getString(29);
		workitem.flowDirection = rs.getInt(30);
		workitem.setOriginalID(rs.getString(31));
		workitem.setOriginalName(rs.getString(32));
		workitem.setOriginalType(rs.getInt(33));
		workitem.setIsSubstituted(rs.getInt(34) == 1 ? true : false);
		workitem.setActorID(rs.getString(35));
		workitem.setActorName(rs.getString(36));
		workitem.setActorType(rs.getInt(37));
		workitem.clientAppType = rs.getString(38);
		workitem.setBusinessKey(rs.getString(39));
		workitem.setDepartID(rs.getString(40));
	}

}