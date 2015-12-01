package com.neusoft.uniflow.web.util;

import java.util.Vector;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.def.NWActDef;
import com.neusoft.uniflow.api.def.NWProcDef;
import com.neusoft.uniflow.api.handler.NWProcInst;
import com.neusoft.uniflow.api.handler.NWWorkItem;
import com.neusoft.uniflow.api.handler.NWWorkItemManager;

public class WorkflowHandler {
	//传入参数pid：流程实例标识
	//功能描述：完成运行到中途的流程实例（区别于终止）
	//        激活态、挂起态流程实例不允许中途完成
	public static void doCompleteRunProcinst(String pid) throws Exception{
		NWSession nwsession = WorkflowManager.getNWSession();
		NWProcInst procinst = nwsession.getProcInst("", pid);//取得标识为pid的流程实例
		Vector rWorkitemList = procinst.openWorkItemList(2);//取得正在执行的工作项列表
		if (rWorkitemList==null) throw new Exception("当前流程"+procinst.getName()+"不允许被中途完成！");//没有运行的工作项，无法中途完成
		NWWorkItem workitem = (NWWorkItem) rWorkitemList.elementAt(0);//取得一个工作项，进行特送设置
		//取得流程中的结束节点标识
		String EndActID = "";
		NWProcDef process = procinst.getProcDef();
		Vector actdeflist = process.openActivityList();
		for (int i=0;i<actdeflist.size();i++){
			NWActDef actdef = (NWActDef)actdeflist.elementAt(i);
			if (actdef.getType()==9)//取得最后一个结束节点的标识
				EndActID=actdef.getID();
		}
		//注意-基于新版本的写法-旧版本需要找一种其它方式来判断是否为并发内的工作
		if (!workitem.getActDef().getParentActDefID().equals(process.getID()))//有工作在并发内，无法特送至流程结束
			throw new Exception("当前工作处于并发分支中，不允许被中途完成！");
		//特送设置
		workitem.assignDirectAct(EndActID);//特送至结束节点
		//依次完成当前工作项
		for (int k=0;k<rWorkitemList.size();k++){
			NWWorkItem wi= (NWWorkItem) rWorkitemList.elementAt(k);
			wi.doComplete(false);
		}
	}
	//取得指定已办理节点的参与人ID列表
	public static Vector getCompleteActivityPartipantsUserIDs(String activityID) throws Exception{
		Vector psnIDs = new Vector();
		NWSession nwsession = WorkflowManager.getNWSession();
		NWWorkItemManager workitemManager = nwsession.getWorkItemManager();
		Vector wis = workitemManager.openWorkitemListByActDefID(16,activityID);
		for (int i=0;i<wis.size();i++){
			NWWorkItem wi = (NWWorkItem) wis.elementAt(i);
			String psnID = wi.getUserID();
			if (!psnIDs.contains(psnID)){
				psnIDs.add(psnID);
			}
		}
		return psnIDs;
	}

}
