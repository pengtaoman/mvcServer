/*
 * Copyright 2006 The Neusoft Software Foundation.
 * 
 */
package com.neusoft.uniflow.web.AO;

import java.util.Date;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.handler.NWAgent;
import com.neusoft.uniflow.common.NWException;

/**
 * 工作流代理相关方法
 *  
 * @author shangzf 
 * @version $Revision: 1.1 $ $Date: 2007/11/29 03:37:01 $
 *
 */
public class AgentAO {
	
	private NWSession nwSession = AOManager.getNWSession();
    
	private static AgentAO instance = null;
    
	private AgentAO(){
   	   
    }
    
	public static AgentAO getInstance() {
		if (instance == null)
			instance = new AgentAO();
		return instance;
    } 
    public void createAgent(String assigner,String assignee,Date startDate,Date endDate) throws AOException,NWException{
        if(assigner==null||assigner.equals("")){
        	throw new AOException(90500); 
        }
        if(assignee==null||assignee.equals("")){
        	throw new AOException(90501); 
        }
        if(startDate==null||endDate==null){
        	throw new AOException(90502);
        }
    	NWAgent agent = nwSession.createAgent();
    	agent.setAssigner(assigner);
    	agent.setAssignee(assignee);
		agent.setStartTime(startDate);
		agent.setEndTime(endDate);
		agent.validate();
		agent.update();
    }
}
