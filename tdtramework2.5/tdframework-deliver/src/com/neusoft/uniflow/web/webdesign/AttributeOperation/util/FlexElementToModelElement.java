package com.neusoft.uniflow.web.webdesign.AttributeOperation.util;

import com.neusoft.workflow.ActTempletEngineEvent;
import com.neusoft.workflow.ActTempletParticipant;
import com.neusoft.workflow.AutoActTemplet;
import com.neusoft.workflow.ManualActTemplet;
import com.neusoft.workflow.SubProcActTemplet;
import com.neusoft.workflow.SubprocVarMap;
import com.neusoft.workflow.TimeOut;
import com.neusoft.workflow.model.Action;
import com.neusoft.workflow.model.AlertAction;
import com.neusoft.workflow.model.Application;
import com.neusoft.workflow.model.ApplicationBean;
import com.neusoft.workflow.model.AutoNode;
import com.neusoft.workflow.model.EngineEvent;
import com.neusoft.workflow.model.EngineEvents;
import com.neusoft.workflow.model.Expiration;
import com.neusoft.workflow.model.ManualNode;
import com.neusoft.workflow.model.Participant;
import com.neusoft.workflow.model.Participants;
import com.neusoft.workflow.model.SubProc;
import com.neusoft.workflow.model.SubprocNode;
import com.neusoft.workflow.model.VariableMap;
import com.neusoft.workflow.model.VariableMaps;

public class FlexElementToModelElement {
	
	public static ManualNode getManualNodeFromTemplet(ManualActTemplet manualActTemplet)
	{
		ManualNode manualNode = ManualNode.Factory.newInstance();
		manualNode.setApplication(manualActTemplet.getApplication());
		manualNode.setID(manualActTemplet.getId());
		manualNode.setName(manualActTemplet.getName());
		manualNode.setDescription(manualActTemplet.getDesc());	
		//办理方式		
		manualNode.setOperationLevel(com.neusoft.workflow.model.OperationLevelType.Enum.forString(Integer.toString(manualActTemplet.getOperatorLevel())));	
		//工作项办理方式的单选按钮没进行设置
		manualNode.setAssignRule(com.neusoft.workflow.model.AssignRuleType.Enum.forString(Integer.toString(manualActTemplet.getOperatorAction())));
		
		ActTempletParticipant[] actTempletParticipantArray =  manualActTemplet.getParticipants().getParticipantArray();
		if(actTempletParticipantArray != null && actTempletParticipantArray.length > 0)
		{
			Participants participants = Participants.Factory.newInstance();
			for(int j = 0; j < actTempletParticipantArray.length;j++)
			{
				Participant participant = participants.addNewParticipant();
				participant.setAuthorityType(new Integer(actTempletParticipantArray[j].getAuthorityType()).toString());
				participant.setType(com.neusoft.workflow.model.ParticipantType.Enum.forString(Integer.toString(actTempletParticipantArray[j].getType())));
				participant.setValue(actTempletParticipantArray[j].getValue());	
			}
			manualNode.setParticipants(participants);
		}
		//生存期包括两部分1、超时部分 2、催办部分		
	    TimeOut timeOut = manualActTemplet.getTimeOut();
	    if(timeOut != null)
	    {
		    Expiration expiration = Expiration.Factory.newInstance();
		    String limitTime = timeOut.getLimitTime();    
		    if(null != limitTime && !"".equals(limitTime))
		    {
		    	if(limitTime.indexOf("#") == 0)
		    	{
		    		//超时设置是变量,变量的显示还没解决
		    		expiration.addNewVariable().setCondition(limitTime);
		    	}
		    	else
		    	{
		    		//超时是简单
		    		expiration.addNewDuration().setCondition(limitTime);
		    	}
		    }
		    //设置超时的处理方式
		    Action limitTimeAction =  expiration.addNewAction();
		    limitTimeAction.setType(timeOut.getTimeOutAction());
		    limitTimeAction.setApplication(timeOut.getTimeOutApplication()); 
		   
		    //催办的相关设置
		    String warnTime = timeOut.getWarnTime();   
		    if(null != warnTime && !"".equals(warnTime))
		    {
		    	if(warnTime.indexOf("#") == 0)
		    	{
		    		//超时设置是变量
		    		expiration.addNewAlertVariable().setCondition(warnTime);
		    	}
		    	else
		    	{
		    		//超时是简单
		    		expiration.addNewAlertDuration().setCondition(warnTime);
		    	}
		    }
		    AlertAction warnTimeAction =  expiration.addNewAlertAction();
		    warnTimeAction.setType(timeOut.getWarnAction());
		    warnTimeAction.setApplication(timeOut.getWarnApplication()); 
		    warnTimeAction.setInterval(Integer.toString(timeOut.getWarnInterval()));  
		    manualNode.setExpiration(expiration);
	    }
		//事件
	    if(manualActTemplet.getEngineEvents() != null)
	    {
			ActTempletEngineEvent[] actTempletEngineEventArray = manualActTemplet.getEngineEvents().getEngineEventArray();
			if(actTempletEngineEventArray != null && actTempletEngineEventArray.length >0)
			{
				EngineEvents engineEvents = EngineEvents.Factory.newInstance();
				for(int i = 0; i < actTempletEngineEventArray.length;i++)
				{
					EngineEvent engiEvent = engineEvents.addNewEngineEvent();
					engiEvent.setAction(actTempletEngineEventArray[i].getEventAction());
					engiEvent.setType(actTempletEngineEventArray[i].getEventId());
				}
				manualNode.setEngineEvents(engineEvents);
			}
	    }
		manualNode.setMsgReceiver(manualActTemplet.getEventReceiver());
		manualNode.setCategory(manualActTemplet.getCategory());
		return manualNode;
	}
	
	public static AutoNode getAutoNodeFromTemplet(AutoActTemplet autoActTemplet)
	{
		AutoNode autoNode = AutoNode.Factory.newInstance();
		autoNode.setApplication(autoActTemplet.getApplication());
		//自动节点程序对应的参数
		//autoNode.setApplicationParams(autoActTemplet)
		
		autoNode.setID(autoActTemplet.getId());
		autoNode.setName(autoActTemplet.getName());
		autoNode.setDescription(autoActTemplet.getDesc());	
		//生存期包括两部分1、超时部分 2、催办部分	
	    TimeOut timeOut = autoActTemplet.getTimeOut();
	    if(timeOut != null)
	    {
		    Expiration expiration = Expiration.Factory.newInstance();
		    String limitTime = timeOut.getLimitTime();    
		    if(null != limitTime && !"".equals(limitTime))
		    {
		    	if(limitTime.indexOf("#") == 0)
		    	{
		    		expiration.addNewVariable().setCondition(limitTime);
		    	}
		    	else
		    	{
		    		//超时是简单
		    		expiration.addNewDuration().setCondition(limitTime);
		    	}
		    }
		    //设置超时的处理方式
		    Action limitTimeAction =  expiration.addNewAction();
		    limitTimeAction.setType(timeOut.getTimeOutAction());
		    limitTimeAction.setApplication(timeOut.getTimeOutApplication());    
		    //催办的相关设置
		    String warnTime = timeOut.getWarnTime();   
		    if(null != warnTime && !"".equals(warnTime))
		    {
		    	if(warnTime.indexOf("#") == 0)
		    	{
		    		//超时设置是变量
		    		expiration.addNewAlertVariable().setCondition(warnTime);
		    	}
		    	else
		    	{
		    		//超时是简单
		    		expiration.addNewAlertDuration().setCondition(warnTime);
		    	}
		    }
		    AlertAction warnTimeAction =  expiration.addNewAlertAction();
		    warnTimeAction.setType(timeOut.getWarnAction());
		    warnTimeAction.setApplication(timeOut.getWarnApplication()); 
		    warnTimeAction.setInterval(Integer.toString(timeOut.getWarnInterval()));  
		    autoNode.setExpiration(expiration);
	    }
		//事件	
	    if(autoActTemplet.getEngineEvents() != null)
	    {
			ActTempletEngineEvent[] actTempletEngineEventArray = autoActTemplet.getEngineEvents().getEngineEventArray();
			if(actTempletEngineEventArray != null && actTempletEngineEventArray.length >0)
			{
				EngineEvents engineEvents = EngineEvents.Factory.newInstance();
				for(int i = 0; i < actTempletEngineEventArray.length;i++)
				{
					EngineEvent engiEvent = engineEvents.addNewEngineEvent();	
					engiEvent.setAction(actTempletEngineEventArray[i].getEventAction());
					engiEvent.setType(actTempletEngineEventArray[i].getEventId());
				}
				autoNode.setEngineEvents(engineEvents);
			}
	    }
		autoNode.setMsgReceiver(autoActTemplet.getEventReceiver());
		autoNode.setCategory(autoActTemplet.getCategory());
		return autoNode;
	}
	
	public static SubprocNode getSubProcNodeFromTemplet(SubProcActTemplet subProcActTemplet)
	{
		SubprocNode subprocNode = SubprocNode.Factory.newInstance();
		subprocNode.setID(subProcActTemplet.getId());
		subprocNode.setName(subProcActTemplet.getName());
		subprocNode.setDescription(subProcActTemplet.getDesc());	
		//生存期包括两部分1、超时部分 2、催办部分	
	    TimeOut timeOut = subProcActTemplet.getTimeOut();
	    if(timeOut != null)
	    {
		    Expiration expiration = Expiration.Factory.newInstance();
		    String limitTime = timeOut.getLimitTime();    
		    if(null != limitTime && !"".equals(limitTime))
		    {
		    	if(limitTime.indexOf("#") == 0)
		    	{
		    		//超时设置是变量,变量的显示还没解决
		    		expiration.addNewVariable().setCondition(limitTime);
		    	}
		    	else
		    	{
		    		//超时是简单
		    		expiration.addNewDuration().setCondition(limitTime);
		    	}
		    }
		    //设置超时的处理方式
		    Action limitTimeAction =  expiration.addNewAction();
		    limitTimeAction.setType(timeOut.getTimeOutAction());
		    limitTimeAction.setApplication(timeOut.getTimeOutApplication()); 
		   
		    //催办的相关设置
		    String warnTime = timeOut.getWarnTime();   
		    if(null != warnTime && !"".equals(warnTime))
		    {
		    	if(warnTime.indexOf("#") == 0)
		    	{
		    		//超时设置是变量
		    		expiration.addNewAlertVariable().setCondition(warnTime);
		    	}
		    	else
		    	{
		    		//超时是简单
		    		expiration.addNewAlertDuration().setCondition(warnTime);
		    	}
		    }
		    AlertAction warnTimeAction =  expiration.addNewAlertAction();
		    warnTimeAction.setType(timeOut.getWarnAction());
		    warnTimeAction.setApplication(timeOut.getWarnApplication()); 
		    warnTimeAction.setInterval(Integer.toString(timeOut.getWarnInterval()));  
		    subprocNode.setExpiration(expiration);
	    }   
	    if(null != subProcActTemplet.getSubProcId() && !"".endsWith(subProcActTemplet.getSubProcId()))
	    {
	    	//设置子流程节点对应的流程
	      SubProc subProc = SubProc.Factory.newInstance();
	      subProc.setProcessID(subProcActTemplet.getSubProcId());
	      subProc.setProcessName(subProcActTemplet.getSubProcName());
	      subProc.setVersionName(subProcActTemplet.getSubProcVersion());
	      subProc.setServerName(subProcActTemplet.getSubProcServerName());
	      subprocNode.setSubProc(subProc);
	    }
	    //设置调用类型
	    subprocNode.setInvokeMode(com.neusoft.workflow.model.InvokeModeType.Enum.forString(Integer.toString(subProcActTemplet.getInvokeType())));
	    //设置耦合类型
	    subprocNode.setSubProcCoupleType(com.neusoft.workflow.model.CoupleType.Enum.forString(Integer.toString(subProcActTemplet.getCoupleType())));
	    if(subProcActTemplet.getVarMaps() != null && subProcActTemplet.getVarMaps().sizeOfSubProcVarMapArray() > 0 )
	    {
	    	//设置子流程的相关变量	
	    	int size = subProcActTemplet.getVarMaps().sizeOfSubProcVarMapArray();
	    	VariableMaps variableMaps = VariableMaps.Factory.newInstance();
	    	for(int i = 0; i < size;i++)
	    	{
	    		 SubprocVarMap subprocVarMap =  subProcActTemplet.getVarMaps().getSubProcVarMapArray(i);
	    		 VariableMap variableMap =variableMaps.addNewVariableMap();
	    		 variableMap.setParentVariable(subprocVarMap.getParentProcVar());
	    		 variableMap.setSupprocVariable(subprocVarMap.getSubProcVar());
	    		 variableMap.setMapType(subprocVarMap.getType());	 
	    	} 	
	    	subprocNode.setSubProcParams(variableMaps);
	    }
		subprocNode.setMsgReceiver(subProcActTemplet.getEventReceiver());
		subprocNode.setCategory(subProcActTemplet.getCategory());
		return subprocNode;
	}
	
	public static Application getApplication(ApplicationBean applicationBean)
	{
		Application application =null;
		if(applicationBean != null)
		{
			application =Application.Factory.newInstance();	
			application.setId(applicationBean.getId());
			application.setName(applicationBean.getName());
			application.setDescription(applicationBean.getDescription());
			application.setLocation(applicationBean.getLocation());
			if(applicationBean.getAppType() != null)
			{
				application.setAppType(com.neusoft.workflow.model.ApplicationType.Enum.forString(applicationBean.getAppType().toString()));
			}
			if(applicationBean.getSynchMode() != null)
			{
				application.setSynchMode(com.neusoft.workflow.model.InvokeModeType.Enum.forString(applicationBean.getSynchMode().toString()));
			}
			if(applicationBean.getAppHost() !=null && !"".equals(applicationBean.getAppHost())){
				application.setAppHost(applicationBean.getAppHost());
			}else{
				application.setAppHost("appmanager");
			}
			application.setAppURL(applicationBean.getAppURL());
			application.setBuilder(applicationBean.getBuilder());
			application.setBuildTime(applicationBean.getBuildTime());
			application.setAppFile(applicationBean.getAppFile());
		}
		return application;
	}
	
	
	
	
	
	

}
