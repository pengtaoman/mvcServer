/*
 * Copyright 2006 The Neusoft Software Foundation.
 * 
 */
package com.neusoft.uniflow.web.AO;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Vector;

import javax.servlet.http.HttpServletRequest;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.bizhandler.NWBizMetaDataManager;
import com.neusoft.uniflow.api.def.NWActDef;
import com.neusoft.uniflow.api.def.NWProcDef;
import com.neusoft.uniflow.api.handler.NWActInst;
import com.neusoft.uniflow.api.handler.NWProcInst;
import com.neusoft.uniflow.api.handler.NWProcInstManager;
import com.neusoft.uniflow.api.handler.NWRelDataInst;
import com.neusoft.uniflow.common.NWException;
import com.neusoft.uniflow.engine.def.ActivityDef;
import com.neusoft.uniflow.engine.def.MemoryDefinitionManager;
import com.neusoft.uniflow.engine.def.ProcessDef;
import com.neusoft.uniflow.engine.def.SubProcActDef;
import com.neusoft.uniflow.engine.def.SubProcessDef;
import com.neusoft.uniflow.engine.def.WorkItemInfo;
import com.neusoft.uniflow.engine.exception.EngineException;
import com.neusoft.uniflow.engine.operator.Operator;
import com.neusoft.uniflow.util.Util;
import com.neusoft.uniflow.web.util.ParseOperatorFromActDef;
import com.neusoft.uniflow.web.util.PredictWorkItemInfo;
import com.neusoft.uniflow.web.util.PredictWorkItemInfoLists;
import com.neusoft.uniflow.web.util.SessionManager;

/**
 * 流程实例相关方法
 * 
 * @author shangzf 
 * @version $Revision: 1.1 $ $Date: 2007/11/01 06:24:03 $
 *  
 */

public class ProcInstAO  {

   private NWSession nwSession = AOManager.getNWSession();    
   private static ProcInstAO instance = null;   

   private ProcInstAO(){
	   
   }
   public static ProcInstAO getInstance() {
		if (instance == null)
			instance = new ProcInstAO();
		return instance;
   } 
   /**
    * 表单接口调用，数据连接初始化方法
    * @param dsID        表单系统数据源id     例如：SYS_FM  
    * @param dsName      表单系统数据源名称    例如：SYS_FM 
    * @param userName    用户名              例如：unieap
    * @param password    密码               例如：unieap
    * @param dbUrl       数据连接url         例如：jdbc:oracle:thin:@localhost:1521:unieap
    * @param driverName  驱动名称            例如：oracle.jdbc.driver.OracleDriver
    * @throws IOException
    */
   
   /**
    * 对指定的流程实例新建流程版本
    * @param procinst 流程实例对象
    * @param verName 新版本名称
    * @exception 
    */
   public Map createNewVersion(NWProcInst procinst,String verName)throws Exception{
		Map map = procinst.createNewVersion(null);
//		Iterator it=(map.keySet()).iterator(); 
//		String oldActId; 
//		FormPrivilegeManager formManager = FormPrivilegeManager.getInstance();
//		while (it.hasNext()){ 
//			oldActId =(String)it.next(); 
//			String newActId = (String)map.get(oldActId);
//			formManager.copyFormPrivilege(oldActId, newActId);
//		} 
		return map;
   }
   
    /**
     * 根据流程实例标识获取流程实例对象
     * @param request Http请求对象
     * @param procInstID 流程实例标识
     * @return 流程实例对象或者null
     * @throws AOException,NWException
     */
   public NWProcInst getProcInst(HttpServletRequest request,String procInstID) throws AOException,NWException{

	    if(procInstID==null||procInstID.equals("")){
        	throw new AOException(90200);
        }     	
    	String userID = (String)request.getSession().getAttribute(SessionManager.BIZ_USERID);	    	
    	NWProcInst procInst = nwSession.getProcInst(userID,procInstID);
    	return procInst; 
    }
   /**
    * 保存字符串类型相关变量,如果根据变量名称未查询到变量对象，则根据变量名创建一新变量并保存变量值
    * 
    * @param procInst 流程实例对象
    * @param relDataName 相关变量名称
    * @param relDataValue 相关变量值（字符串类型）
    * @throws AOException,NWException
    */

    public void saveStrRD(NWProcInst procInst,String relDataName,String relDataValue) throws AOException,NWException {
		if(procInst==null){
			throw new AOException(90201);
		}
    	NWRelDataInst nwRD= procInst.getRelData(relDataName);
		
		if(nwRD==null){
			nwRD = nwSession.newRelDataInst();
			nwRD.setName(relDataName);
			nwRD.setType(1);
		}
		nwRD.setValue(relDataValue);
		
		procInst.saveRelData(nwRD);
    }
    /**
     * 保存数字类型相关变量,如果根据变量名称未查询到变量对象，则根据变量名创建一新变量并保存变量值
    * @param procInst 流程实例对象
    * @param relDataName 相关变量名称
    * @param relDataValue 相关变量值（数字类型）
     * @throws AOException,NWException
     */
    public void saveIntRD(NWProcInst procInst,String relDataName,int relDataValue) throws AOException,NWException {
    	if(procInst==null){
			throw new AOException(90201);
		}
    	NWRelDataInst nwRD=  procInst.getRelData(relDataName);
		
    	if(nwRD==null){
			nwRD = nwSession.newRelDataInst();
			nwRD.setName(relDataName);
			nwRD.setType(0);
		}
		
    	nwRD.setValue(String.valueOf(relDataValue));
		
    	procInst.saveRelData(nwRD);
    }
    /**
     * 启动流程实例
     * 
     * @param request Http请求对象
     * @param procInstID 流程实例标识
     * @throws NWException
     */

    public void doStart(HttpServletRequest request,String procInstID) throws NWException{
   		
    	String userID = (String)request.getSession().getAttribute(SessionManager.BIZ_USERID);	
    	
    	NWProcInstManager procInstManager = nwSession.getProcInstManager();
		
    	procInstManager.doStart(procInstID,userID);
    }
    /**
     * 挂起流程实例，流程实例由运行转变为挂起态
     * 
     * @param request Http请求对象
     * @param procInstID 流程实例标识
     * @throws NWException
     */
    public void doSuspend(HttpServletRequest request,String procInstID) throws NWException{
   		
    	String userID = (String)request.getSession().getAttribute(SessionManager.BIZ_USERID);	
    	
    	NWProcInstManager procInstManager = nwSession.getProcInstManager();
		
    	procInstManager.doSuspend(procInstID,userID);
    }
    /**
     * 恢复流程实例，流程由挂起态转变为运行态
     * 
     * @param request Http请求对象
     * @param procInstID 流程实例标识
     * @throws NWException
     */
    public void doResume(HttpServletRequest request,String procInstID) throws NWException{
   		
    	String userID = (String)request.getSession().getAttribute(SessionManager.BIZ_USERID);	
    	
    	NWProcInstManager procInstManager = nwSession.getProcInstManager();
		
    	procInstManager.doResume(procInstID,userID);
    }
    /**
     * 重启动流程实例
     * 
     * @param request Http请求对象
     * @param procInstID 流程实例标识
     * @throws NWException
     */
    public void doRestart(HttpServletRequest request,String procInstID) throws NWException{
   		
    	String userID = (String)request.getSession().getAttribute(SessionManager.BIZ_USERID);	
    	
    	NWProcInstManager procInstManager = nwSession.getProcInstManager();
		
    	procInstManager.doRestart(procInstID,userID);
    }
    /**
     * 终止流程实例
     * 
     * @param request Http请求对象
     * @param procInstID 流程实例标识
     * @throws NWException
     */
    public void doAbort(HttpServletRequest request,String procInstID) throws NWException{
   		
    	String userID = (String)request.getSession().getAttribute(SessionManager.BIZ_USERID);	
    	
    	NWProcInstManager procInstManager = nwSession.getProcInstManager();
		
    	procInstManager.doAbort(procInstID,userID);
    }
    /**
     * 删除流程实例
     * 
     * @param request Http请求对象
     * @param procInstID 流程实例标识
     * @throws NWException
     */
    public void doDelete(HttpServletRequest request,String procInstID) throws NWException{
   		
    	String userID = (String)request.getSession().getAttribute(SessionManager.BIZ_USERID);	
    	
    	NWProcInstManager procInstManager = nwSession.getProcInstManager();
		
    	procInstManager.doDelete(procInstID,userID);
    }
    /**
     * 由视图名称为参数获取对应业务视图中包含的业务字段名（columnName）与字段对应的显示名（displayName）
     * 
     * @param bizViewName 对应SYS_CATEGORY表中的category值
     * @return 视图中对应的列名与显示名 对应SYS_BIZDATA表中的name和colname
     * @throws AOException
     */
    public Vector getNameAndColumnByCategory(String bizViewName) throws AOException,NWException {
       
    	Vector namecolNameVec = null;
    	
    	if(bizViewName==null || bizViewName.equals("")){
        	throw new AOException(90101);//视图名称为空，无法调用接口查询业务视图
        }
        
    	NWBizMetaDataManager metaManager = nwSession.getBizMetaDataManager();
    	    	
    	namecolNameVec = metaManager.openBizMetaDataListByCategory(bizViewName);
        
    	return namecolNameVec;
    }
    
    /**
     * 预测流程启动后直接后继手动节点定义信息集合
     * 
     * @param procInstID 流程实例标识
     * @return 手动节点定义信息集合
     * @throws Exception
     */
    public PredictWorkItemInfoLists openFirstRightAfterWorkItemList(String procInstID) throws EngineException, NWException, Exception{
    	NWActInst startActInst = null;
    	NWProcInst procinst = nwSession.getProcInst("", procInstID);
    	Vector varibles = procinst.openRelDataList();
    	Vector completedActs = procinst.openActInstList(16);//获得完成态的节点实例，从中找到开始节点实例
    	for(int i = 0 ; i < completedActs.size(); i++){
    		NWActInst actInst = (NWActInst) completedActs.elementAt(i);
    		if(actInst.getType() == NWActDef.ACT_TYPE_START){
    			startActInst = actInst;
    			break;
    		}
    	}
    	return openRightAfterWorkItemList(startActInst, varibles);
    }
    
    /**
     * 预测当前节点的后继手动节点定义信息集合
     * 
     * @param actInstID 当前节点实例标识
     * @return 手动节点定义信息集合
     * @throws Exception
     */
    public PredictWorkItemInfoLists openRightAfterWorkItemList(String actInstID) throws EngineException, NWException, Exception{
    	NWActInst actInst = nwSession.getActInst("", actInstID);
    	Vector varibles = actInst.openRelDataList();
    	return openRightAfterWorkItemList(actInst, varibles);
    }
    /**
     * 
     * @param actInst
     * @param varibles
     * @return
     * @throws EngineException
     * @throws NWException
     * @throws Exception
     */
	private PredictWorkItemInfoLists openRightAfterWorkItemList(NWActInst actInst, Vector varibles) throws EngineException, NWException, Exception{
		Vector manualActDefs = new Vector();
		PredictWorkItemInfoLists predictWorkItemInfoLists = new PredictWorkItemInfoLists();
		Vector items = new Vector(5);
		int manualNum = 0;
		try{
			NWProcInst procInst = actInst.getProcInst();
			NWProcDef procDef = procInst.getProcDef();
			NWActDef parentActDef = null;
			NWActInst parentActInst = null;
			//当前流程为子流程实例时
			if(procInst.getSuperActInstID() != null && !procInst.getSuperActInstID().equals("")){
				parentActInst = nwSession.getActInst("", procInst.getSuperActInstID());
				parentActDef = parentActInst.getActDef();	
			}		
			String procInstID = procInst.getProcInstID();
			Vector ret = procInst.openRightAfterActDefList(actInst.getActInstID());
			boolean unitInside = true;
			for(int i=0; i<ret.size(); i++){
				NWActDef actDef = (NWActDef)ret.elementAt(i);
				manualNum += convertActDefsToSimple(procDef, parentActDef, procInstID, varibles, actDef, manualActDefs, unitInside);
			}
			if(manualNum == -1)
				predictWorkItemInfoLists.getErrors().add(new Integer(1).toString());//当前节点到结束节点之间没有手动节点
			else if(manualNum == 0)
				predictWorkItemInfoLists.getErrors().add(new Integer(2).toString());//当前节点后传输线条件都不满足
			else{
				Iterator it = manualActDefs.iterator();
		    	while(it.hasNext()){
		    		NWActDef actDef = (NWActDef)it.next();
		    		PredictWorkItemInfo predictWorkItemInfo = new PredictWorkItemInfo();
		    		Vector operators = ParseOperatorFromActDef.getOperators(procInstID, actDef.getID());
		    		MemoryDefinitionManager memoryDefinitionManager = MemoryDefinitionManager.getInstance();
		    		ProcessDef procDefForApp = (ProcessDef) nwSession.getProcDef("", actDef.getProcDefID(), 0);
		    		WorkItemInfo workItemInfo = memoryDefinitionManager.getWorkItemInfo(procDefForApp, (ActivityDef)actDef);
		    		for(int i = 0; i < operators.size(); i++){
		    			Operator operator = (Operator) operators.elementAt(i);
		    			predictWorkItemInfo.setName(actDef.getName());
		    			predictWorkItemInfo.setUserID(operator.getID());
		    			predictWorkItemInfo.setUserType(operator.getType());    			
		    			predictWorkItemInfo.setWorkItemInfo(workItemInfo);
		    			predictWorkItemInfo.setActionType(operator.getActionType());
		    			predictWorkItemInfo.setCategory(actDef.getCategory());
		    			predictWorkItemInfo.setWiType(actDef.getType());
		    			if(operator.getDepartID() != null && !operator.getDepartID().equals(""))
		    				predictWorkItemInfo.setDepartID(operator.getDepartID());
		    			else{
		    				String depart_id = ParseOperatorFromActDef.getActExtPropertyValue(procInst,actDef, "depart_id");
		    				predictWorkItemInfo.setDepartID(depart_id);
		    				}
		    			items.add(predictWorkItemInfo);
		    			}
		    		}
				}
			}
//	    catch (EngineException e){
//	    	predictWorkItemInfoLists.getErrors().add(new String(e.getMessage()));
//	    	}
//	    catch (NWException e){
//	    	predictWorkItemInfoLists.getErrors().add(new String(e.getMessage()));
//	    	}
	    catch (Exception e){
	    	items.clear();
	    	predictWorkItemInfoLists.getErrors().add(new String(e.getMessage()));
    	}
		predictWorkItemInfoLists.setPredictWorkItemInfoLists(items);
		return predictWorkItemInfoLists;
  }
	
	private int convertActDefsToSimple(NWProcDef procDef, NWActDef parentActDef, String procInstID, Vector varibles, NWActDef actDef, Vector ret, boolean unitInside) throws EngineException, NWException {
		int manualNum = 0;
			switch(actDef.getType()){
				case NWActDef.ACT_TYPE_AUTO:
					Vector autoNextActDefs = procDef.openPreparedNextActDefs(actDef, varibles, procInstID);	
					for(int i=0; i<autoNextActDefs.size(); i++){
						NWActDef autoNextActDef = (NWActDef)autoNextActDefs.elementAt(i);
						manualNum += convertActDefsToSimple(procDef, parentActDef, procInstID, varibles, autoNextActDef, ret, unitInside);
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
					Vector subStartNextActDefs = synchSubProcDef.openPreparedNextActDefs(subStartActDef, varibles, procInstID);
					for(int i=0; i<subStartNextActDefs.size(); i++){
						NWActDef subStartNextActDef = (NWActDef)subStartNextActDefs.elementAt(i);
						manualNum += convertActDefsToSimple(synchSubProcDef, synchSubProcActDef, procInstID, varibles, subStartNextActDef, ret, unitInside);
					}
					break;
				case NWActDef.ACT_TYPE_ASYNCHSUBPROC:
					Vector asynchSubProcActNextActDefs = procDef.openPreparedNextActDefs(actDef, varibles, procInstID);	
					for(int i=0; i<asynchSubProcActNextActDefs.size(); i++){
						NWActDef asynchSubProcActNextActDef = (NWActDef)asynchSubProcActNextActDefs.elementAt(i);
						manualNum += convertActDefsToSimple(procDef, parentActDef, procInstID, varibles, asynchSubProcActNextActDef, ret, unitInside);
					}
					break;	
				case NWActDef.ACT_TYPE_PARALLEL_UNIT:
					manualNum = convertParallelUnit(procDef, parentActDef, procInstID, varibles, actDef, ret, unitInside);
					break;
				case NWActDef.ACT_TYPE_PARALLEL_BRANCH_END:
					if(unitInside){
						NWActDef branch = nwSession.getActDef(actDef.getParentActDefID(), 0);
						NWActDef parallelUnit = nwSession.getActDef(branch.getParentActDefID(), 0);
						Vector parallelUnitNextActDefs = procDef.openPreparedNextActDefs(parallelUnit, varibles, procInstID);	
							for(int i=0; i<parallelUnitNextActDefs.size(); i++){
								NWActDef parallelUnitNextActDef = (NWActDef)parallelUnitNextActDefs.elementAt(i);
								manualNum += convertActDefsToSimple(procDef, parentActDef, procInstID, varibles, parallelUnitNextActDef, ret, unitInside);
							}
					}
					break;
				case NWActDef.ACT_TYPE_END:
					if(parentActDef != null){
						NWProcDef parentProcDef = nwSession.getProcDef("", parentActDef.getProcDefID(), 0);
						Vector parentActNextActDefs = parentProcDef.openPreparedNextActDefs(parentActDef, varibles, procInstID);
						for(int i=0; i<parentActNextActDefs.size(); i++){
							NWActDef parentActNextActDef = (NWActDef)parentActNextActDefs.elementAt(i);
							manualNum += convertActDefsToSimple(parentProcDef, parentActDef, procInstID, varibles, parentActNextActDef, ret, unitInside);
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
	
	private int convertParallelUnit(NWProcDef procDef,  NWActDef parentActDef, String procInstID, Vector varibles, NWActDef actDef, Vector ret, boolean unitInside) throws NWException {
		unitInside = false;
		int manualNum = 0;
		NWActDef parallelStartNode = procDef.getParallelStartNode(actDef.getID());
		Vector branchDefs = procDef.openPreparedNextActDefs(parallelStartNode, varibles, procInstID);
		for(int i=0; i<branchDefs.size(); i++){
			NWActDef branchDef = (NWActDef)branchDefs.elementAt(i);
			NWActDef branchStartNode = procDef.getBranchStartNode(branchDef.getID());
			Vector branchStartNextActDefs = procDef.openPreparedNextActDefs(branchStartNode, varibles, procInstID);
			for(int j=0; j<branchStartNextActDefs.size(); j++){
				NWActDef branchStartNextActDef = (NWActDef)branchStartNextActDefs.elementAt(j);
				manualNum += convertActDefsToSimple(procDef, parentActDef, procInstID, varibles, branchStartNextActDef, ret, unitInside);
			}
		}
		if(manualNum == 0){
			unitInside = true;
			Vector parallelUnitNextActDefs = procDef.openPreparedNextActDefs(actDef, varibles, procInstID);
			for(int i=0; i<parallelUnitNextActDefs.size(); i++){
				NWActDef parallelUnitNextActDef = (NWActDef)parallelUnitNextActDefs.elementAt(i);
				manualNum += convertActDefsToSimple(procDef, parentActDef, procInstID, varibles, parallelUnitNextActDef, ret, unitInside);
			}
		}
		return manualNum;
	}
	
	/**
	 * 按照顺序返回流程节点列表
	 * 约束：
	 * 1：对于子流程节点以及并发体节点，直接返回不包含其内部子节点
	 * 2：采用“深度优先”规则进行遍历
	 * @param processID 流程模板
	 * @return NWActDef 列表
	 * @throws Exception
	 */
	public List openActivityList(String processID,String processVersion) throws Exception{
		NWProcDef procDef;
		if(Util.isNullOrEmpty(processVersion))
			procDef=nwSession.getProcDef("", processID, 0);
		else
			procDef=nwSession.getProcDef("", processID, processVersion, 0);
		String startID=procDef.getStartActID();
		NWActDef startAct=nwSession.getActDef(startID, 0);
		Map actMap=new HashMap();
		actMap.put(startID, startAct);
		List actList=new ArrayList();
		actList.add(startAct);
		List nextAllActs=openAllNextActs(actMap,startID,procDef);
		actList.addAll(nextAllActs);
		return actList;
	}
	
	/**
	 * 按照拓扑顺序返回当前节点的所有后续节点定义
	 * @param currentActID  当前节点定义
	 * @return NWActDef 列表
	 * @throws Exception
	 */
	public List openNextAllActs(String currentActID)throws Exception{
		NWActDef currentAct=nwSession.getActDef(currentActID, 0);
		String procDefID=currentAct.getProcDefID();
		String procVersion=currentAct.getProcVersionName();
		NWProcDef procDef=nwSession.getProcDef("", procDefID, procVersion, 0);
		Map actMap=new HashMap();
		actMap.put(currentActID, currentAct);
		List actList=new ArrayList();
		actList.add(currentAct);
		List nextAllActs=openAllNextActs(actMap,currentActID,procDef);
		actList.addAll(nextAllActs);
		return actList;
	}
	/**
	 * 
	 * 采用深度优先规则获得所有后续节点
	 * @param actMap 当前已经放入到列表中的节点
	 * @param currentActID  当前节点定义
	 * @param procDef 流程定义
	 * @return
	 * @throws Exception
	 * 递归退出：
	 * （1）通过比较actMap中的值，判断是否出现了环状结构，出现则退出递归；
	 * （2）遇到结束节点退出
	 */
	private List openAllNextActs(Map actMap,String currentActID,NWProcDef procDef)throws Exception{
		List sequenceList=new ArrayList();
		Vector nextActs=procDef.openNextActList(currentActID);
		for(int i=0;i<nextActs.size();i++){
			NWActDef nextAct=(NWActDef)nextActs.get(i);
			Object act=actMap.get(nextAct.getID());
			if(act!=null)
				continue;
			//节点不存在列表中
			actMap.put(nextAct.getID(), nextAct);
			sequenceList.add(nextAct);
			List nextAllList=openAllNextActs(actMap,nextAct.getID(),procDef);
			if(nextAllList.size()>0)
				sequenceList.addAll(nextAllList);
		}
		return sequenceList;
	}
	/**
	   * 获取流程实例运转到actIDList环节的流程实例集合
	   * @param actIDList 节点定义ID列表
	   * @return 流程实例集合
	   */
	  public List openProcInstListAtCurrentAct(List actIDList,String psnID,String orderby, int offset, int count, boolean isAscending)throws NWException{
		  NWProcInstManager procInstManager=nwSession.getProcInstManager();
		  return procInstManager.openProcInstListAtCurrentAct(actIDList, psnID, orderby, offset, count, isAscending);
	  }
	
}