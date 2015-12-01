/*
 * Copyright 2006 The Neusoft Software Foundation.
 * 
 */
package com.neusoft.uniflow.web.AO;

import java.util.Iterator;
import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.def.NWActDef;
import com.neusoft.uniflow.api.def.NWParticipantEntity;
import com.neusoft.uniflow.api.def.NWProcDef;
import com.neusoft.uniflow.api.handler.NWProcInst;
import com.neusoft.uniflow.common.NWException;
import com.neusoft.uniflow.engine.def.ProcessDef;
import com.neusoft.uniflow.engine.def.SubProcActDef;
import com.neusoft.uniflow.engine.def.SubProcessDef;
import com.neusoft.uniflow.web.util.PredictWorkItemInfo;
import com.neusoft.uniflow.web.util.PredictWorkItemInfoLists;
import com.neusoft.uniflow.web.util.SessionManager;

/**
 * 流程模板相关方法
 * 
 * @author shangzf 
 * @version $Revision: 1.1 $ $Date: 2007/11/29 03:37:01 $
 *  
 */

public class ProcDefAO  {

    private NWSession nwSession = AOManager.getNWSession();
    public static int PROCDEF_NODUP = 0;
    private static ProcDefAO instance = null;
   
    private ProcDefAO(){
 	   
    }
    public static ProcDefAO getInstance() {
		if (instance == null)
			instance = new ProcDefAO();
		return instance;
    } 
   
    /**
     * 获取登陆系统用户可以创建流程的模板列表
     * 
     * @param request HTTP请求对象
     * @return 所有模板列表集合 集合中的对象为NWProcDef
     * @throws NWException
     */
    public Vector getCanCreateProcDefList(HttpServletRequest request) throws NWException {
       	
    	String userID = (String)request.getSession().getAttribute(SessionManager.BIZ_USERID);
        
       	Vector procDefIDList = nwSession.openCanCreateProcDefIDList(userID);

        return procDefIDList;
    }

    /**
     * 获取所有的流程定义模板列表
     * 
     * @param request HTTP请求对象
     * @return 所有模板定义列表  集合中的对象为NWProcDef
     * @throws NWException
     */
    public Vector getAllProcDefList(HttpServletRequest request) throws NWException {

       	String userID = (String)request.getSession().getAttribute(SessionManager.BIZ_USERID);
       	
        Vector procDefIDList = nwSession.openProcDefList(userID,PROCDEF_NODUP);

        return procDefIDList;

    }

    /**
     * 根据流程定义标识取得流程定义对象
     * 
     * @param request HTTP请求对象 
     * @param procDefID 流程定义标识
     * @return NWProcDef 流程定义对象
     * @throws NWException
     */
    public NWProcDef getProcDefByID(HttpServletRequest request, String procDefID) throws NWException {
        	
    	String userID = (String)request.getSession().getAttribute(SessionManager.BIZ_USERID);
        
    	NWProcDef nwProcDef = nwSession.getProcDef(userID,procDefID,PROCDEF_NODUP);
        
    	return nwProcDef;
    }
    /**
     * 根据流程定义标识及版本名取得流程定义对象
     * 
     * @param request HTTP请求对象 
     * @param procDefID 流程定义标识
     * @return NWProcDef 流程定义对象
     * @throws NWException
     */
    public NWProcDef getProcDefByID(HttpServletRequest request, String procDefID, String verName) throws NWException {
        	
    	String userID = (String)request.getSession().getAttribute(SessionManager.BIZ_USERID);
        
    	NWProcDef nwProcDef = nwSession.getProcDef(userID,procDefID,verName,PROCDEF_NODUP);
        
    	return nwProcDef;
    }

    /**
     * 根据流程的业务类型属性获取属于此业务类型的流程数量
     * @author yuanbz
     * @param category 流程的业务类型属性
     * @return 流程模板的个数
     * @throws NWException
     */
    public int getProcDefNum(String category) throws NWException {
        int result = nwSession.getProcDefNum(PROCDEF_NODUP, category);
        return result;
    }
    /**
     * 取得服务器上所有获得版本的流程数量
     * @param category 流程的业务类型属性
     * @return 流程模板的个数
     * @throws NWException
     */
    public int getProcDefNum() throws NWException {
        int result = nwSession.getProcDefNum(PROCDEF_NODUP);
        return result;
    }
    /**
     * 取得服务器上发布的从第几条开始的某一业务类型的若干条活动版本的流程定义
     * 
     * @author yuanbz
     * @param request HTTP请求对象
     * @param orderBy 排序字段
     * @param start 从第几条开始
     * @param count 一共取几条
     * @param category 流程的业务类型属性,当传入null或者""串时,则返回所有类型的业务类型
     * @param isAscending 升序还是降序
     * @return 流程定义对象集合 集合中的对象为NWProcDef
     * @throws NWException
     */

    public Vector getProcDefList(HttpServletRequest request, String orderBy, int start,int count, String category, boolean isAscending)
            throws NWException {
    	
    	String userID = (String)request.getSession().getAttribute(SessionManager.BIZ_USERID);
    	
    	Vector procDefList = null;
    	if(category!=null&&!category.equals("")){
	    	procDefList = nwSession.openProcDefList(userID, PROCDEF_NODUP, orderBy,
	                            start, count, category, isAscending);
    	}else{
	    	procDefList = nwSession.openProcDefList(userID, PROCDEF_NODUP, orderBy,
	                start, count, isAscending);
    	}
         return procDefList;
    }
    /**
     * 根据流程模板标识创建流程实例，并且可以为流程实例指定新的实例名称
     * 
     * @param request HTTP请求对象
     * @param procDefID 流程定义标识
     * @param procInstName 为新创建的流程实例指定一个新的名称名称,如果实例名为“空”则继承模板名称
     * @return 流程实例标识
     * @throws AOException,NWException
     */

    public NWProcInst createProcInst(HttpServletRequest request,String procDefID,String procInstName) throws AOException,NWException{
    	 NWProcInst procinst = null;
   		 HttpSession session = request.getSession();
    	 String userID  = (String)session.getAttribute(SessionManager.BIZ_USERID);	
    	 if(procDefID==null||procDefID.equals("")){
    		 throw new AOException(90001,procDefID);
    	 }
    	 NWProcDef procDef = nwSession.getProcDef(userID,procDefID,0);
    	 if(procDef==null){
    		 throw new AOException(90000,procDefID);
    	 }
    	 if(procInstName==null||procInstName.equals("")){
    		 procinst = procDef.createProcessInst();    		 
    	 }else{
    		 procinst = procDef.createProcessInst(procInstName);    		 
    	 }
    	 return procinst; 
    }
    /**
     * 根据流程模板标识创建并启动流程实例，并且可以为流程实例指定新的实例名称
     * 
     * @param request HTTP请求对象
     * @param procDefID 流程定义标识
     * @param procInstName 为新创建的流程实例指定一个新的名称名称,如果实例名为“空”则继承模板名称
     * @return 流程实例标识
     * @throws AOException,NWException
     */

//    public NWProcInst createAndStartProcInst(HttpServletRequest request,String procDefID,String procInstName) throws AOException,NWException{
//    	 NWProcInst procinst = null;
//   		 HttpSession session = request.getSession();
//    	 String userID  = (String)session.getAttribute(SessionManager.BIZ_USERID);	
//    	 if(procDefID==null||procDefID.equals("")){
//    		 throw new AOException(90001,procDefID);
//    	 }
//    	 NWProcDef procDef = nwSession.getProcDef(userID,procDefID,0);
//    	 if(procDef==null){
//    		 throw new AOException(90000,procDefID);
//    	 }
//    	 if(procInstName==null||procInstName.equals("")){
//    		 procinst = procDef.createAndStartProcInst();
//    	 }else{
//    		 procinst = procDef.createAndStartProcInst(procInstName);
//    	 }
//    	 return procinst; 
//    }
    
    
    /**
     * 根据流程模板标识创建流程实例，并且可以为流程实例指定新的实例名称，当流程的第一个可办理节点（手段节点）的参与者是实例创建者的上级时需要指定创建实例的人员所属于的角色ID
     * 
     * @param request HTTP请求对象
     * @param procDefID 流程定义标识
     * @param procInstName 为新创建的流程实例指定一个新的名称名称,如果实例名为“空”则继承模板名称
     * @param roleID 创建流程实例者的角色ID
     * @return 流程实例标识
     * @throws AOException
     */

    public NWProcInst createProcInst(HttpServletRequest request,String procDefID,String procInstName,String roleID) throws AOException,NWException{
    	 NWProcInst procinst = null;
   		 HttpSession session = request.getSession();
    	 String userID  = (String)session.getAttribute(SessionManager.BIZ_USERID);	
    	 if(procDefID==null||procDefID.equals("")){
    		 throw new AOException(90001);
    	 }
    	 NWProcDef procDef = nwSession.getProcDef(userID,procDefID,0);
    	 if(procDef==null){
    		 throw new AOException(90000,procDefID);
    	 }
    	 if(procInstName==null||procInstName.equals("")){
    		 procinst = procDef.createProcessInst(0,procDef.getName(),roleID);
    	 }else{
    		 procinst = procDef.createProcessInst(0,procInstName,roleID);
    	 }
    	 return procinst; 
    }
    
    /**
     * 通过流程定义ID预测首次生成的手动节点集合
     * 
     * @param procDefID 流程模板标识
     * @return 手动节点定义信息集合
     * @throws Exception
     */
   
    public PredictWorkItemInfoLists openRightAfterWorkItemList(String procDefID) throws Exception{
		Vector manualActDefs = new Vector();
		PredictWorkItemInfoLists predictWorkItemInfoLists = new PredictWorkItemInfoLists();
		Vector items = new Vector(5);
		int manualNum = 0;
		try{
			ProcessDef procDef = (ProcessDef)nwSession.getProcDef("", procDefID, 0);
			NWActDef startActDef = nwSession.getActDef(procDef.getStartActID(), 0);
			NWActDef parentActDef = null;
			Vector ret = procDef.openRightNextActDefList(startActDef.getID(), new Vector(), null);
			for(int i=0; i<ret.size(); i++){
				NWActDef actDef = (NWActDef)ret.elementAt(i);
				manualNum = convertActDefsToSimple(procDef, parentActDef, actDef, manualActDefs);
			}
			if(manualNum == -1)
				predictWorkItemInfoLists.getErrors().add(new Integer(1));
			else if(manualNum == 0)
				predictWorkItemInfoLists.getErrors().add(new Integer(2));
			else{
				Iterator it = manualActDefs.iterator();
		    	while(it.hasNext()){
		    		NWActDef actDef = (NWActDef)it.next();
		    		PredictWorkItemInfo predictWorkItemInfo = new PredictWorkItemInfo();
		    		Vector participants = actDef.openParticipantList();
		    		for(int i = 0; i < participants.size(); i++){
		    			NWParticipantEntity participant = (NWParticipantEntity) participants.elementAt(i);
		    			if(participant.getEntityType() != 0 && participant.getEntityType() != 1)
		    				continue;
		    			predictWorkItemInfo.setName(actDef.getName());
		    			predictWorkItemInfo.setUserID(participant.getEntityID());
		    			predictWorkItemInfo.setUserType(participant.getEntityType());    			
		    			predictWorkItemInfo.setActionType(participant.getActionType());
		    			predictWorkItemInfo.setCategory(actDef.getCategory());
		    			predictWorkItemInfo.setWiType(actDef.getType());
		    			items.add(predictWorkItemInfo);
		    			}
		    		}
		    	if(items.size() == 0)
		    		predictWorkItemInfoLists.getErrors().add(new Integer(3));
				}
			}
//	    catch (EngineException e){
//	    	predictWorkItemInfoLists.getErrors().add(new String(e.getMessage()));
//	    	}
//	    catch (NWException e){
//	    	predictWorkItemInfoLists.getErrors().add(new String(e.getMessage()));
//	    	}
	    catch (Exception e){
	    	predictWorkItemInfoLists.getErrors().add(new String(e.getMessage()));
	    	items.clear();
    	}
		predictWorkItemInfoLists.setPredictWorkItemInfoLists(items);
		return predictWorkItemInfoLists;
  }
	
	private int convertActDefsToSimple(NWProcDef procDef, NWActDef parentActDef, NWActDef actDef, Vector ret) throws NWException {
		int manualNum = 0;
			switch(actDef.getType()){
				case NWActDef.ACT_TYPE_AUTO:
					Vector autoNextActDefs = procDef.openPreparedNextActDefs(actDef, new Vector(), null);
					for(int i=0; i<autoNextActDefs.size(); i++){
						NWActDef autoNextActDef = (NWActDef)autoNextActDefs.elementAt(i);
						manualNum += convertActDefsToSimple(procDef, parentActDef, autoNextActDef, ret);
					}
					break;
				case NWActDef.ACT_TYPE_MANUAL:
					ret.add(actDef);
					manualNum++;
					break;
				case NWActDef.ACT_TYPE_SYNCHSUBPROC:
					SubProcActDef synchSubProcActDef = (SubProcActDef)actDef;
					SubProcessDef synchSubProcessDef = synchSubProcActDef.getSubProcDef();
					NWProcDef synchSubProcDef = nwSession.getProcDef("", synchSubProcessDef.getProcDefID(), 0);
					NWActDef subStartActDef = nwSession.getActDef(synchSubProcDef.getStartActID(), 0);
					Vector subStartNextActDefs = synchSubProcDef.openPreparedNextActDefs(subStartActDef, new Vector(), null);
					for(int i=0; i<subStartNextActDefs.size(); i++){
						NWActDef subStartNextActDef = (NWActDef)subStartNextActDefs.elementAt(i);
						manualNum += convertActDefsToSimple(synchSubProcDef, synchSubProcActDef, subStartNextActDef, ret);
					}
					break;
				case NWActDef.ACT_TYPE_ASYNCHSUBPROC:
					Vector asynchSubProcActNextActDefs = procDef.openPreparedNextActDefs(actDef, new Vector(), null);
					for(int i=0; i<asynchSubProcActNextActDefs.size(); i++){
						NWActDef asynchSubProcActNextActDef = (NWActDef)asynchSubProcActNextActDefs.elementAt(i);
						manualNum += convertActDefsToSimple(procDef, parentActDef, asynchSubProcActNextActDef, ret);
					}
					break;	
				case NWActDef.ACT_TYPE_PARALLEL_UNIT:
					manualNum = convertParallelUnit(procDef, parentActDef, actDef, ret);
					break;
				case NWActDef.ACT_TYPE_PARALLEL_BRANCH_END:
					break;
				case NWActDef.ACT_TYPE_END:
					if(parentActDef != null){
						NWProcDef parentProcDef = nwSession.getProcDef("", parentActDef.getProcDefID(), 0);
						Vector parentActNextActDefs = parentProcDef.openPreparedNextActDefs(parentActDef, new Vector(), null);
						for(int i=0; i<parentActNextActDefs.size(); i++){
							NWActDef parentActNextActDef = (NWActDef)parentActNextActDefs.elementAt(i);
							manualNum += convertActDefsToSimple(parentProcDef, parentActDef, parentActNextActDef, ret);
						}	
					}
					else
						manualNum = -1;
					break;
				default:
					break;
			}
			return manualNum;
	}
	
	private int convertParallelUnit(NWProcDef procDef,  NWActDef parentActDef, NWActDef actDef, Vector ret) throws NWException {
		int manualNum = 0;
		NWActDef parallelStartNode = procDef.getParallelStartNode(actDef.getID());
		Vector branchDefs = procDef.openPreparedNextActDefs(parallelStartNode, new Vector(), null);
		for(int i=0; i<branchDefs.size(); i++){
			NWActDef branchDef = (NWActDef)branchDefs.elementAt(i);
			NWActDef branchStartNode = procDef.getBranchStartNode(branchDef.getID());
			Vector branchStartNextActDefs = procDef.openPreparedNextActDefs(branchStartNode, new Vector(), null);
			for(int j=0; j<branchStartNextActDefs.size(); j++){
				NWActDef branchStartNextActDef = (NWActDef)branchStartNextActDefs.elementAt(j);
				manualNum += convertActDefsToSimple(procDef, parentActDef, branchStartNextActDef, ret);
			}
		}
		if(manualNum == 0){
			Vector parallelUnitNextActDefs = procDef.openPreparedNextActDefs(actDef, new Vector(), null);
			for(int i=0; i<parallelUnitNextActDefs.size(); i++){
				NWActDef parallelUnitNextActDef = (NWActDef)parallelUnitNextActDefs.elementAt(i);
				manualNum += convertActDefsToSimple(procDef, parentActDef, parallelUnitNextActDef, ret);
			}
		}
		return manualNum;
	}
	
}