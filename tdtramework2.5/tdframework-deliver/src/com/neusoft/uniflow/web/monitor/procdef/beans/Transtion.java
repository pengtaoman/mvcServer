
package com.neusoft.uniflow.web.monitor.procdef.beans;

import java.util.Vector;

import javax.servlet.http.HttpSession;

import com.neusoft.uniflow.api.NWSession;

import com.neusoft.uniflow.api.handler.NWActInst;
import com.neusoft.uniflow.api.handler.NWWorkItem;
import com.neusoft.uniflow.util.Util;
import com.neusoft.uniflow.web.util.CommonInfoManager;


public class Transtion {
   public static Vector changeToBean(Vector workitemList,NWSession session,HttpSession httpsession){
   	Vector workitembeanList = new Vector();
   	WorkItemBean workitembean;
   	try{
	   	for (int i=0;i<workitemList.size();i++){
	   		NWWorkItem workitem = (NWWorkItem)workitemList.elementAt(i);
	   		workitembean = new WorkItemBean();
	   		workitembean.setId(workitem.getWorkItemID());
	   		workitembean.setName(workitem.getName());
	   		
	   		String actid = workitem.getActInstID();
	   		NWActInst actinst = session.getActInst(session.getUserID(),actid);
	   		String actname = actinst.getName();
	   		workitembean.setActname(actname);
	   		
	   		workitembean.setCurstate(CommonInfoManager.getStateStr(workitem.getCurState(),httpsession));
	   		
	   		workitembean.setCreatetime(CommonInfoManager.getDateStr(workitem.getStartTime()));
	   		workitembean.setCompletetime(CommonInfoManager.getDateStr(workitem.getCompleteTime()));
	   		String username = CommonInfoManager.getUserInfo(workitem.getUserID(),workitem.getEntityType());
	   		workitembean.setUsername(username);
	   		
	   		workitembeanList.add(workitembean);
	   	}
   	}catch(Exception e){
   		e.printStackTrace();
   	}
   	return workitembeanList;
   }
   
   public static Vector changeToActBean(Vector actList,NWSession session){
   	Vector actbeanList = new Vector();
   	ActBean actbean;
   	try{
	   	for (int i=0;i<actList.size();i++){
	   		NWActInst actinst = (NWActInst)actList.elementAt(i);
	   		actbean = new ActBean();
	   		actbean.setName(actinst.getName());
	   		actbean.setActInstID(actinst.getActInstID());
            actbean.setActDefID(actinst.getActDefID());
            actbean.setAppDefID(actinst.getAppDefID());
            actbean.setLimitTime(actinst.getLimitTime());
	   		actbean.setStartTime(actinst.getStartTime().toString());
	   		if(actinst.getCompleteTime() != null)
	   		actbean.setCompleteTime(actinst.getCompleteTime().toString());
	   		actbean.setProcInstID(actinst.getProcInstID());
	   		actbean.setState(actinst.getCurState());
	   		actbean.setOvertimeAction(actinst.getOvertimeAction());
	   		actbeanList.add(actbean);
	   	}
   	}catch(Exception e){
   		e.printStackTrace();
   	}
   	return actbeanList;
   }
   
}
