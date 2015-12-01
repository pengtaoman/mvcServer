/*
 * Copyright 2006 The Neusoft Software Foundation.
 * 
 */

package com.neusoft.uniflow.web.AO;

import java.util.ArrayList;
import java.util.List;
import java.util.Vector;

import javax.servlet.http.HttpServletRequest;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.def.NWActDef;
import com.neusoft.uniflow.api.def.NWProcDef;
import com.neusoft.uniflow.api.def.NWTransition;
import com.neusoft.uniflow.api.handler.NWRelDataInst;
import com.neusoft.uniflow.common.NWException;
import com.neusoft.uniflow.engine.variable.Variable;
import com.neusoft.uniflow.util.ParseUtil;

/**
 * 节点定义对象相关方法
 *  
 * @author shangzf
 * @version $Revision: 1.1 $ $Date: 2007/11/29 03:37:01 $
 * @
 */

public class ActDefAO {
	
	private NWSession nwSession = AOManager.getNWSession();
	
	private static ActDefAO instance = null;
    
	private ActDefAO(){
    	
    }
    
	public static ActDefAO getInstance() {
		if (instance == null)
			instance = new ActDefAO();
		return instance;
    } 
	/**
     * 根据节点定义标识获取节点定义对象
     * @param request Http请求对象
     * @param actDefID 节点定义标识
     * @return 节点定义对象或者null
     * @throws NWException
     */
    public NWActDef getActDef(HttpServletRequest request,String actDefID) throws AOException,NWException{
    	
    	if(actDefID==null||actDefID.equals("")){
    		throw new AOException(90400);
    	}
 	
    	NWActDef actDef = nwSession.getActDef(actDefID,0);

		return actDef;
    }
    
    /**
     * 返回某一节点定义满足条件的后续节点定义列表
     * @param currentActDef
     * @param relDataInstList 传输线中变量集合，集合中为NWRelDataInst对象，需要设置name、value、type
     * @return
     * @throws NWException
     */
    public List openRightNextActDefList(String currentActDefId ,List relDataInstList) throws NWException {
    	Vector variables = new Vector();
    	for (int i=0; i<relDataInstList.size(); i++) {
    		NWRelDataInst relDataInst = (NWRelDataInst) relDataInstList.get(i);
    		if (relDataInst instanceof Variable) {
    			variables.add(relDataInst);
    		} else {
    			Variable variable = new Variable();
        		variable.setName(relDataInst.getName());
        		variable.setValue(relDataInst.getValue());
        		variable.setType(relDataInst.getType());
        		variables.add(variable);
    		}
    	}
    	
    	List rightNextActList = new ArrayList();
    	
    	NWActDef currentActDef = nwSession.getActDef(currentActDefId, 0);
    	NWProcDef procDef = nwSession.getProcDef("", currentActDef.getProcDefID(), currentActDef.getProcVersionName(), 0);
    	Vector transitionList = procDef.openTransitionList();
    	
    	for (int i=0; i<transitionList.size(); i++) {
    		NWTransition transition = (NWTransition)transitionList.get(i);
    		if (transition.getPrevActID().equals(currentActDef.getID()) 
    				&& ("".equals(transition.getCondition()) 
    						|| ParseUtil.parseCondition(transition.getCondition(), variables, ""))) {
    			NWActDef nextActDef = nwSession.getActDef(transition.getNextActID(), 0);
    			rightNextActList.add(nextActDef);
    		}
    	}
    	return rightNextActList;
    }

}