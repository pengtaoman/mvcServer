package com.neusoft.om.action.organ;

import java.io.IOException;
import java.util.HashMap;
import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.common.PassWord;
import com.neusoft.crm.custmgr.common.outerinterface.partymgr.bo.PartyFacadeBO;
import com.neusoft.om.bo.DutyEmployeeRelationMaintanceBO;
import com.neusoft.om.bo.DynamicListBO;
import com.neusoft.om.bo.EmployeeManagementBO;
import com.neusoft.om.bo.OMDictionaryBOInterface;
import com.neusoft.om.bo.OrganManagementBO;
import com.neusoft.om.dao.area.AreaColl;
import com.neusoft.om.dao.area.AreaDAO;
import com.neusoft.om.dao.area.AreaVO;
import com.neusoft.om.dao.common.SwitchDAO;
import com.neusoft.om.dao.employee.EmployeeDAO;
import com.neusoft.om.dao.employee.EmployeeVO;
import com.neusoft.om.dao.employeedutyrelation.EmployeeDutyRelationVO;
import com.neusoft.om.dao.omswitch.OmSwitchDAO;
import com.neusoft.om.dao.organ.OrganColl;
import com.neusoft.om.dao.organ.OrganDAO;
import com.neusoft.om.dao.organ.OrganVO;
import com.neusoft.om.dao.organemployeedisplay.OrganEmployeeDisplayColl;
import com.neusoft.om.dao.organemployeedisplay.OrganEmployeeDisplayVO;
import com.neusoft.om.dao.organkind.OrganKindColl;
import com.neusoft.tdframework.authorization.AuthorizeVO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.common.data.ParamObject;
import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.common.util.DateUtil;
import com.neusoft.tdframework.common.util.GridUtil;
import com.neusoft.tdframework.common.util.HttpObjectUtil;
import com.neusoft.tdframework.common.util.NullProcessUtil;
import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.DBLogger;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.tdframework.web.struts.BaseAction;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;
import com.neusoft.unieap.taglib.innertree.TreeData;
/**
 * @author renh
 *
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
public class OrganMaintanceAction extends BaseAction {
	private static String SYSTEM_ID = "41";
	private static String ADD_BUTTON_ID = "041AAA";
	private static String MODIFY_BUTTON_ID = "041AAB";
	private static String DELETE_BUTTON_ID = "041AAC";
	private static String ADD_DUTY_BUTTON_ID = "041AAD";
	private static String DELETE_DUTY_BUTTON_ID = "041AAE";
	public ActionForward service(
		ActionMapping mapping,
		ActionForm form,
		HttpServletRequest request,
		HttpServletResponse response)
		throws ActionException{
		//页面请求的操作;
		String operType = NullProcessUtil.nvlToString(request.getParameter("OperType"),"query").trim();
		if(operType.equals("init")){
			return getInitInfo(mapping,request,response);		
		}
		if(operType.equals("initDutyInfo")){
			return getInitDutyInfo(mapping,request,response);
		}
		else if(operType.equals("query")){
			return getQueryInfo(mapping,request,response);
		}
		else if(operType.equals("queryDealers")){
			return getQueryDealers(mapping,request,response);
		}	
		else if(operType.equals("add")){	
			return doAddOrganInfo(mapping,request,response);
		}
		else if(operType.equals("addinit")){
			return getAddInitInfo(mapping,request,response);
		}
		else if(operType.equals("modifyinit")){
			return doModifyOrganInfo(mapping,request,response);
		}
		else if(operType.equals("modify")){
			return doModifyOrganInfo(mapping,request,response);
		}
		else if(operType.equals("delete")){
			return doDeleteOrganInfo(mapping,request,response);
		}
		else if(operType.equals("deleteDutyRelationInfo")){
			return doDeleteEmployeeDutyRelationInfo(mapping,request,response);
		}
		else if(operType.equals("modifyEmployeeDutyInfo")){
			return doModifyEmployeeDutyInfo(mapping,request,response);
		}else if(operType.equals("showArea")){
			return showArea(mapping,request,response);
		}
		else{
			return mapping.findForward("result");
		}
	}

	/**
	 * 查询
	 * @param mapping
	 * @param request
	 * @param response
	 * @return
	 */
	private ActionForward getQueryInfo(ActionMapping mapping, HttpServletRequest request, HttpServletResponse response) {
		String message = "查询成功!";
		String operFlag = "1";
		OrganManagementBO service =(OrganManagementBO)getBaseService().getServiceFacade(OrganManagementBO.BEAN);
		DynamicListBO serviceList =(DynamicListBO)getBaseService().getServiceFacade(DynamicListBO.BEAN);
		InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");
        OrganDAO organDao = (OrganDAO) factory.getInteractionObject("organDAO", appContext);
        OmSwitchDAO switchDAO = (OmSwitchDAO) factory.getInteractionObject("omSwitchDAO", appContext);
        AreaDAO areaDAO = (AreaDAO) factory.getInteractionObject("areaDAO", appContext);
        String organDim = switchDAO.getOrganDim();
		// add begin MQ
		OMDictionaryBOInterface omdictionary = (OMDictionaryBOInterface)getBaseService().getServiceFacade("omDictionaryFacade");				
		ParamObjectCollection organKindColl9 = omdictionary.getOrganKindColl();
		// ParamObjectCollection organKindColl9=null;
		request.setAttribute("organcoll", organKindColl9);
		// add end
		AuthorizeVO authVO = getAuthorize(request);
		String organId = request.getParameter("OrganId").trim();
		String belongArea = request.getParameter("BelongArea").trim();
		//组织机构信息
		OrganVO organVO = null;
		try {
			organVO = service.getOrganInfoByOrganId(organId);
			
		} catch (ServiceException e) {
			operFlag = "0";
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganMaintanceAction--getOrganInfoByOrganId:"+e.getMessage());
			message = "获得组织机构信息失败!";			
		}
		//地市列表信息
		AreaColl areaColl = null;
		String areaId = organVO.getAreaId();
		String areaName = areaDAO.getAreaNameByAreaId(areaId);
		try{
			if(organDim!= null && organDim.trim().equals("organ")){
				areaColl = organDao.getChildAreaCollByOrganId(organId);
					
			}else{
				areaColl = serviceList.getAreaListByOrgan(organId);
			}
		}catch (ServiceException e) {
			operFlag = "0";
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganMaintanceAction--getOrganInfoByOrganId:"+e.getMessage());
			message = "获得地市信息失败!";			
		}
		//得到当前组织机构的下拉框
		OrganColl organColl = null;
		OrganColl dutyParentColl = new OrganColl();
		try{
			organColl = serviceList.getOrganListByOragn(organId);
			dutyParentColl = organDao.getOrganCollByAreaId(belongArea,null);
		}catch (ServiceException e) {
			operFlag = "0";
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeMaintanceAction--getEmployeeByEmployeeId:"+e.getMessage());
			message = "获得组织机构下拉框失败!";			
		}
		//得到组织机构类型下拉框
		OrganKindColl organKindColl = null;
		try{
			organKindColl = serviceList.getOrganKindList();
		}catch (ServiceException e) {
			operFlag = "0";
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeMaintanceAction--getEmployeeByEmployeeId:"+e.getMessage());
			message = "获得组织机构类型下拉框失败!";			
		}
		
		request.setAttribute("OrganVO",organVO);
		request.setAttribute("AreaColl",areaColl);
		request.setAttribute("OrganColl",getOrganColl(organColl));
		request.setAttribute("OrganKind",organKindColl);
		request.setAttribute("DutyParent", getOrganColl(dutyParentColl));
		request.setAttribute("Message",message);
		request.setAttribute("OperType","query");
		request.setAttribute("areaName",areaName);
		request.setAttribute("areaId", belongArea);
		request.setAttribute("PareaColl",getAreaColl(areaColl));
		request.setAttribute("StatusColl", getStatusColl());
		request.setAttribute("InnerDutyColl",getInnerDutyColl());	
		request.setAttribute("organDim", organDim);
		
		
		return mapping.findForward("queryresult");
	}
	
	private ActionForward getQueryDealers(ActionMapping mapping, HttpServletRequest request, HttpServletResponse response) {
		
		AuthorizeVO authVO = getAuthorize(request);
		
		String longin = "j_username="+authVO.getWorkNo()+"&j_password="+PassWord.decode(authVO.getWorkPwd())+"";
		String dealerList = "channel/baseInfoAction.do?"+longin+"&method=queryList&flag=1&marketId=";
		dealerList += request.getParameter("marketId");
		String webapps = "";//"http://172.20.24.11:8080";
		OrganManagementBO service =(OrganManagementBO)getBaseService().getServiceFacade(OrganManagementBO.BEAN);

		try {
			webapps += service.getAppContainer("3");
			
//			webapps = "http://10.195.129.91:7878/tdframework/";
			//System.out.println("webapps:"+webapps+dealerList);
			response.sendRedirect(webapps+dealerList);
			
			//request.getRequestDispatcher(webapps+dealerList).forward(request,response);
		}catch (ServiceException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganMaintanceAction--getQueryDealers:"+e.getMessage());
		}  catch (IOException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganMaintanceAction--getQueryDealers:"+e.getMessage());
			e.printStackTrace();
		}
		return mapping.findForward("");		
	}
	
	/**增加时初始化页面*/
	private ActionForward getAddInitInfo(ActionMapping mapping, HttpServletRequest request, HttpServletResponse response) {
		String message = "";
		String operFlag ="1";
		String kind = request.getParameter("OrganKind");
		String id = request.getParameter("OrganId");
		String areaId = request.getParameter("belongAreaId");
		//OrganManagementBO service =(OrganManagementBO)getBaseService().getServiceFacade(OrganManagementBO.BEAN);
		DynamicListBO serviceList =(DynamicListBO)getBaseService().getServiceFacade(DynamicListBO.BEAN);
        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");
        OrganDAO organDao = (OrganDAO) factory.getInteractionObject("organDAO", appContext);
        OmSwitchDAO switchDAO = (OmSwitchDAO) factory.getInteractionObject("omSwitchDAO", appContext);
        AreaDAO areaDAO = (AreaDAO) factory.getInteractionObject("areaDAO", appContext);
        String organDim = switchDAO.getOrganDim();
        Vector vec = new Vector();
		//String organId = request.getParameter("OrganId").trim();
		//地市列表信息
		AreaColl areaColl = null;
		String areaName = areaDAO.getAreaNameByAreaId(areaId);
		try{
			if(kind!=null && kind.equals("area")){
				areaColl = serviceList.getAreaList(id);
			}else if(kind!=null && kind.equals("organ")){
				if(organDim!= null && organDim.trim().equals("organ")){
					areaColl = organDao.getChildAreaCollByOrganId(id);
				}else{
					areaColl = serviceList.getAreaListByOrgan(id);
				}	
			}
		}catch (ServiceException e) {
			operFlag = "0";
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganMaintanceAction--getAddInitInfo:"+e.getMessage());
			message = "获得地市信息失败!";			
		}
		//组织机构列表信息
		OrganColl organColl = new OrganColl();
		OrganColl dutyParentColl = new OrganColl();
		try{
			
			if(kind!=null && kind.equals("area")){
				organColl = new OrganColl();
			}else if(kind!=null && kind.equals("organ")){
				organColl = serviceList.getOrganInfoByOragn(id);
				dutyParentColl = organDao.getOrganCollByAreaId(areaId,"");
			}
		}catch (Exception e){
			operFlag = "0";
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeMaintanceAction--getAddInitInfo:"+e.getMessage());
			message = "获得组织机构下拉框失败!";	
		}
		//得到组织机构类型下来列表数据
		OrganKindColl organKindColl =null;
		try{
			//organKindColl = serviceList.getOrganKindColl(kind,id);
			organKindColl = organDao.getOrganKindColl();
		}catch (DataAccessException e) {
			operFlag = "0";
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeMaintanceAction--getAddInitInfo:"+e.getMessage());
			message = "获得组织机构类型下拉框失败!";			
		}
		request.setAttribute("AreaColl",areaColl);
		request.setAttribute("OrganColl",getOrganColl(organColl));
		request.setAttribute("OrganKindColl",organKindColl);
		request.setAttribute("Message",message);
		request.setAttribute("OperType","addinit");
		request.setAttribute("OperFlag",operFlag);
		request.setAttribute("DutyParent", getOrganColl(dutyParentColl));
		request.setAttribute("InnerDutyColl",getInnerDutyColl());
		request.setAttribute("PareaColl",getAreaColl(areaColl));
		request.setAttribute("StatusColl", getStatusColl());
		request.setAttribute("organDim", organDim);
		request.setAttribute("areaName", areaName);
		request.setAttribute("areaId", areaId);
		request.setAttribute("parentOrganId", id);;
		return mapping.findForward("addinit");
	}
	private ActionForward showArea(ActionMapping mapping, HttpServletRequest request, HttpServletResponse response){
        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");
        OrganDAO organDAO = (OrganDAO) factory.getInteractionObject("organDAO", appContext);
        AreaDAO areaDAO = (AreaDAO) factory.getInteractionObject("areaDAO", appContext);
        String organId = request.getParameter("organId");
        AuthorizeVO authVO = getAuthorize(request);
        AreaColl areaColl = new AreaColl(); //organDAO.getChildAreaCollByOrganId(organId);
        //OrganVO organVO = organDAO.getOrganInfoById(organId);
		String parentOrganId = request.getParameter("parentOrganId");			
		if(parentOrganId != null && !parentOrganId.equals("")){//如果当前部门存在上级组织机构，则区域集合由上级组织机构归属的区域决定
			int authAreaLevel = authVO.getAreaLevel();
			OrganVO parentVO = organDAO.getOrganInfoById(parentOrganId);
			String parentAreaId = parentVO.getAreaId();
			int parentOrganLevel = areaDAO.getAreaById(parentAreaId).getAreaLevel();
			
			if(authAreaLevel < parentOrganLevel){//如果上级组织机构的区域级别在当前管理员的管理范围内，才返回上级部门归属区域确定的区域集合
				areaColl = organDAO.getChildAreaCollByOrganId(parentOrganId);
			}
		}else{
			areaColl = organDAO.getChildAreaCollByOrganId(organId);
		}
        request.setAttribute("areaColl", areaColl);
		return mapping.findForward("showArea");
	}
	private ParamObjectCollection getInnerDutyColl(){
		ParamObjectCollection coll = new ParamObjectCollection();
		ParamObject vo1 = new ParamObject();
		vo1.setId("1");
		vo1.setName("是");
		ParamObject vo2 = new ParamObject();
		vo2.setId("0");
		vo2.setName("否");
		coll.addParamObject(vo1);
		coll.addParamObject(vo2);
		return coll;		
	}
	private ParamObjectCollection getAreaColl(AreaColl coll){
		ParamObjectCollection pColl = new ParamObjectCollection();		
		for(int i=0; i < coll.getRowCount(); i++){
			AreaVO areaVO = coll.getArea(i);
			ParamObject vo = new ParamObject();
			vo.setId(areaVO.getAreaId());
			vo.setName(areaVO.getAreaName());
			pColl.addParamObject(vo);
		}
		return pColl;
	}
	
	private ParamObjectCollection getStatusColl(){
		ParamObjectCollection coll = new ParamObjectCollection();
		ParamObject vo1 = new ParamObject();
		vo1.setId("2");
		vo1.setName("正式");
		ParamObject vo2 = new ParamObject();
		vo2.setId("1");
		vo2.setName("报批");
		ParamObject vo3 = new ParamObject();
		vo3.setId("4");
		vo3.setName("废弃");
		coll.addParamObject(vo1);
		coll.addParamObject(vo2);
		coll.addParamObject(vo3);
		return coll;
	}
	private ParamObjectCollection getOrganColl(OrganColl coll){
		ParamObjectCollection pColl = new ParamObjectCollection();		
		for(int i=0; i < coll.getRowCount(); i++){
			OrganVO organVO = coll.getOrgan(i);
			ParamObject vo = new ParamObject();
			vo.setId(organVO.getOrganId());
			vo.setName(organVO.getOrganName());
			pColl.addParamObject(vo);
		}
		return pColl;
	}
	
	/**
	 * 删除
	 * @param mapping
	 * @param request
	 * @param response
	 * @return
	 */
	private ActionForward doDeleteOrganInfo(ActionMapping mapping, HttpServletRequest request, HttpServletResponse response) {
		String message="删除成功!";
		String operFlag = "1";
		OrganManagementBO service =(OrganManagementBO)getBaseService().getServiceFacade("organManagementFacade");
		String organId = request.getParameter("OrganId");
	    InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
	    AppContext appContext = new AppContextImpl();
	    appContext.setApplicationName("om");
	    SwitchDAO switchDAO = (SwitchDAO)factory.getInteractionObject("switchDAO",appContext);
	    OrganDAO organDAO = (OrganDAO)factory.getInteractionObject("organDAO",appContext);
	    String organName = switchDAO.getOrganNameByOrganId(organId);
	    String operAreaId = "";
		try{ 
	        if(needProductCheck()){
	            EmployeeDAO empDAO = (EmployeeDAO) factory.getInteractionObject("employeeDAO", appContext);
	            int canDel = empDAO.checkOrgan(organId,1);// 1：部门，2:职员
	            if(canDel == 1){ //还有工作项没有处理，不能删除，也不能变为无效
	            	message = "该部门还有工作项没有处理，不能删除";
	        		request.setAttribute("Message",message);
	        		request.setAttribute("OperType","delete");
	        		request.setAttribute("OperFlag","0");
	        		return mapping.findForward("deleteresult");
	            }
	        }
	        operAreaId = organDAO.getOrganInfoById(organId).getAreaId();
			service.doDeleteOrganInfo(organId);
			
			
            /** 写日志 */
			 String desc = "删除组织机构："+organId+":"+organName;
			 DBLogger logbo = (DBLogger)getDBLogger();
			 HashMap logMap = getLogMap(request,DELETE_BUTTON_ID,desc);
			 try{
				 logbo.doAddLogInfoByProc(logMap);
			 }catch(ServiceException e){
					operFlag = "0";
					SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganMaintanceAction--doDeleteOrganInfo:"+e.getMessage());
					message = "记录删除组织机构日志信息失败!"+e.getMessage();	
			 }			 	
		} catch (ServiceException e) {
			operFlag = "0";
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganMaintanceAction--doDeleteOrganInfo:"+e.getMessage());
			message = "删除失败!"+e.getMessage();			
		}
		request.setAttribute("Message",message);
		request.setAttribute("OperType","delete");
		request.setAttribute("OperFlag",operFlag);
		request.setAttribute("operAreaId", operAreaId);
		return mapping.findForward("deleteresult");
	}

	/**
	 * 修改
	 * @param mapping
	 * @param request
	 * @param response
	 * @return
	 */
	private ActionForward doModifyOrganInfo(ActionMapping mapping, HttpServletRequest request, HttpServletResponse response) {
		String message ="修改成功!";
		String operFlag = "1";
		OrganManagementBO service =(OrganManagementBO)getBaseService().getServiceFacade("organManagementFacade");
	    InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
	    AppContext appContext = new AppContextImpl();
	    appContext.setApplicationName("om");
	    OmSwitchDAO switchDAO = (OmSwitchDAO) factory.getInteractionObject("omSwitchDAO", appContext);	   
	    String organDim = switchDAO.getOrganDim();
		OrganVO vo = new OrganVO();
		HashMap mapData = HttpObjectUtil.getRequestParams(request);
		String priOrganName = request.getParameter("priOrganName");
		vo.setAttribute(mapData);
	    vo.setOrganStatus(1);//默认增加的组织机构都是正常使用的
		try{
			int code = service.doModifyOrganInfo(vo,null,priOrganName);
			if(code == 2){
				message = "在相同区域下组织机构不能重名";
			}else{
	            /** 写日志 */
				 String desc = "修改组织机构："+vo.getOrganId()+":"+vo.getOrganName();
				 DBLogger logbo = (DBLogger)getDBLogger();
				 HashMap logMap = getLogMap(request,MODIFY_BUTTON_ID,desc);
				 try{
					 logbo.doAddLogInfoByProc(logMap);
				 }catch(ServiceException e){
						operFlag = "0";
						SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganMaintanceAction--doModifyOrganInfo:"+e.getMessage());
						message = "记录修改组织机构日志信息失败!"+e.getMessage();	
				 }
			}			
		}catch (ServiceException e) {
			operFlag = "0";
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganMaintanceAction--doModifyOrganInfo():"+e.getMessage());
			message = "修改失败!"+e.getMessage();		
		}
		request.setAttribute("Message",message);
		request.setAttribute("OperType","modify");
		request.setAttribute("OperFlag",operFlag);
		request.setAttribute("operAreaId", vo.getAreaId());
		request.setAttribute("organDim", organDim.toLowerCase());
		return mapping.findForward("modifyresult");
	}
	
	/**
	 * 增加
	 * @param mapping
	 * @param request
	 * @param response
	 * @return
	 */
	private ActionForward doAddOrganInfo(ActionMapping mapping, HttpServletRequest request, HttpServletResponse response) {
		String operFlag = "1";//成功
		String message = "增加成功!";
		
		String organKind = request.getParameter("CurrentSelectKind");
		String dutyParentId = request.getParameter("dutyParent")==null?"":request.getParameter("dutyParent");
		InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");
		OrganManagementBO service =(OrganManagementBO)getBaseService().getServiceFacade("organManagementFacade");
		PartyFacadeBO partyService = (PartyFacadeBO) factory.getInteractionObject("partyFacadeBO", appContext);
		OrganVO vo = new OrganVO();
		HashMap mapData = HttpObjectUtil.getRequestParams(request);
		String parentOrganId =(String)mapData.get("parentOrganId");
		vo.setAttribute(mapData);
		vo.setParentOrganId(parentOrganId);
		vo.setOrganStatus(1); //默认增加的组织机构都是正常使用的
		//设置机构职能归属
		vo.setDutyParent(dutyParentId);
		//如果是在行政区域上增加组织机构,则重新设置父结点
		if("area".intern()==organKind.intern()){
			vo.setParentOrganId("");	
		}
		try{
			/******************** 调接口增加参与人信息 *************************/
			
			com.neusoft.crm.custmgr.common.outerinterface.partymgr.data.PartyVO partyVO = new 
				com.neusoft.crm.custmgr.common.outerinterface.partymgr.data.PartyVO();
			partyVO.setPartyName(vo.getOrganName());
			partyVO.setPartyType("1"); // 组织
			partyVO.setStatusCd("10"); // 10:有效
			long partyId = partyService.doInsertParty(partyVO);
			/******************** 调接口增加参与人信息 *************************/
			
			int code = service.doAddOrganInfo(vo,null,partyId);

			if(code == 2){
				message = "在相同区域下组织机构不能重名";
			}else{
	            /** 写日志 */
				 String desc = "增加组织机构："+vo.getOrganId()+":"+vo.getOrganName();
				 DBLogger logbo = (DBLogger)getDBLogger();
				 HashMap logMap = getLogMap(request,ADD_BUTTON_ID,desc);
				 try{
					 logbo.doAddLogInfoByProc(logMap);
				 }catch(ServiceException e){
						operFlag = "0";
						SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganMaintanceAction--doAddOrganInfo:"+e.getMessage());
						message = "记录增加组织机构日志信息失败!"+e.getMessage();	
				 }
			}
		}catch (ServiceException e) {
			operFlag = "0";
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganMaintanceAction--doAddOrganInfo():"+e.getMessage());
			message = "增加失败"+e.getMessage();	
		}
		request.setAttribute("Message",message);
		request.setAttribute("OperType","add");
		request.setAttribute("OperFlag",operFlag);
		request.setAttribute("operAreaId", vo.getAreaId());
		return mapping.findForward("addresult");
	}

	/** 初始化
	 * @param mapping
	 * @param request
	 * @param response
	 * @return
	 */
	private ActionForward getInitInfo(ActionMapping mapping, HttpServletRequest request, HttpServletResponse response) {
		String message = "";
		String organId = request.getParameter("OrganId").trim();
		String organKind = request.getParameter("OrganKind").trim();
		String belongArea = request.getParameter("BelongArea").trim();
		request.setAttribute("OrganId",organId);
		request.setAttribute("OrganKind",organKind);
		request.setAttribute("BelongArea",belongArea);
		request.setAttribute("OperType","init");	
		request.setAttribute("Message",message);
		return mapping.findForward("header");
	}

	
	/** 初始化机构职员列表
	 * @param mapping
	 * @param request
	 * @param response
	 * @return
	 */
	private ActionForward getInitDutyInfo(ActionMapping mapping, HttpServletRequest request, HttpServletResponse response) {
		AuthorizeVO authVO = getAuthorize(request);
		int adminType = authVO.getAdminType();
		String authAdminType = String.valueOf(adminType);
		String authAreaId =authVO.getAreaId();
		String authEmployeeId = authVO.getEmployeeId();
		String organId = request.getParameter("OrganId");
		if(organId==null||organId.equals(""))
		{
		   organId=(String)request.getParameter("organId");    		
		}		
		OrganEmployeeDisplayColl employeeColl=null;
		ParamObjectCollection dutyColl=null;
		ParamObjectCollection dutyTypeColl=getDutyTypeColl();		
		EmployeeManagementBO service=(EmployeeManagementBO)getBaseService().getServiceFacade("employeeManagementFacade");//得到BO
		OMDictionaryBOInterface omDicttionaryBO = (OMDictionaryBOInterface)getBaseService().getServiceFacade("omDictionaryFacade");//得到数据字典BO
		InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");
        SwitchDAO switchDao = (SwitchDAO) factory.getInteractionObject("switchDAO", appContext);
        try {
		    employeeColl=service.getAllOrganEmployeeInfo(organId);//调用方法得到机构职员Coll
		    dutyColl=omDicttionaryBO.getDutyColl(organId);//调用方法得到机构职务Coll
		    for(int i=0; i < employeeColl.getRowCount(); i++){
		    	if(authAdminType.equals("2")){//只有普通管理员才需要判断是否可以操作某职员
		    		OrganEmployeeDisplayVO empVO = employeeColl.getOrganEmployeeDisplay(i);
		    		String empAreaId = empVO.getAreaId();
		    		String owner = empVO.getOwner();
		    		boolean areaRight = switchDao.includeArea(authAreaId, empAreaId);
		    		if(areaRight && authEmployeeId.equals(owner)){
		    			empVO.setModifiable(1);//可以操作
		    		}else{
		    			empVO.setModifiable(0);//不可以操作
		    		}
		    	}
		    	//begin add by jialixin 2007-01-20
		    	else{
		    		OrganEmployeeDisplayVO empVO = employeeColl.getOrganEmployeeDisplay(i);
		    		empVO.setModifiable(1);//可以操作
		    	}
		    	//end add by jialixin 2007-01-20
		    }
        } catch (ServiceException e) {
            SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganMaintanceAction--getInitDutyInfo():"+e.getMessage());
            String message = "";
            message = "初始化机构职务列表失败"+e.getMessage();
			request.setAttribute("Message",message);
        }
		
        //封装数据到request中用于显示
        GridUtil.getStartEnd(request,employeeColl.getRowCount(),employeeColl.getRowCount());
		request.setAttribute("employeeList",employeeColl.getList());
		request.setAttribute("dutyColl", dutyColl);
		request.setAttribute("dutyTypeColl", dutyTypeColl);
		request.setAttribute("organId", organId);
		request.setAttribute("authAdminType", authAdminType);
		return mapping.findForward("employeelist");
	}
	/** 增加任职信息
	 * @param mapping
	 * @param request
	 * @param response
	 * @return
	 */
	private ActionForward doModifyEmployeeDutyInfo(ActionMapping mapping, HttpServletRequest request, HttpServletResponse response) {
		String message = "";
		//获取用户输入
		String choose = request.getParameter("choose");
		String organId = request.getParameter("organId").trim();
		String dutyId = request.getParameter("duty");
		String employee=request.getParameter("employee").trim();
		String dutyType=request.getParameter("dutyType");
		AuthorizeVO authVO = getAuthorize(request);
		String authAreaId = authVO.getAreaId();
		int authAdminType = authVO.getAdminType();//职员类型 普通操作员 0，特权管理员 1，普通管理员 2
		String authEmpId = authVO.getEmployeeId();
		EmployeeVO employeeVO = null;		
		EmployeeManagementBO employeeManagementBO=(EmployeeManagementBO)getBaseService().getServiceFacade("employeeManagementFacade");//得到BO
	    if(choose.equals("1")){
	    	try {
			    employeeVO=employeeManagementBO.getEmployeeByEmployeeId(employee);//调用方法验证职员是否存在			        
	        } catch (ServiceException e) {
	            SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganMaintanceAction--doModifyEmployeeDutyInf():"+e.getMessage());
				message = "增加任职信息失败"+e.getMessage();	
	        }
	    }
	    if(choose.equals("0")){
	    	try {
			    employeeVO=employeeManagementBO.getEmployeeInfoByWorkNo(employee);//调用方法验证职员是否存在	 
	        } catch (ServiceException e) {
	            SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganMaintanceAction--doModifyEmployeeDutyInf():"+e.getMessage());
				message = "增加任职信息失败"+e.getMessage();	
	        }
	    }
		
        if(employeeVO==null)//若不存在 则提示用户，刷新页面
        {
            message="增加失败!此职员不存在";
            request.setAttribute("organId",organId);
    		request.setAttribute("Message",message);
    		return getInitDutyInfo(mapping,request,response);
        }
        else//若职员存在
        {
        	String employeeId = employeeVO.getEmployeeId();
            String empAreaId = employeeVO.getAreaId();
            String empOwner = employeeVO.getOwner();
            InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
            AppContext appContext = new AppContextImpl();
            appContext.setApplicationName("om");
            SwitchDAO switchDao = (SwitchDAO) factory.getInteractionObject("switchDAO", appContext);
            OrganDAO organDAO = (OrganDAO) factory.getInteractionObject("organDAO", appContext);
            String organName = switchDao.getOrganNameByOrganId(organId);
            String employeeName = switchDao.getEmoployeeNameById(employeeId);
            String dutyName = switchDao.getDutyNameByDutyId(dutyId);
            OrganVO organVO = organDAO.getOrganInfoById(organId);
            String areaId = organVO.getAreaId();
            boolean areaRight = switchDao.includeArea(authAreaId, empAreaId);
            if(authAdminType == 0){//普通操作员，不可以进行职员调整，直接返回
            	message = "您是普通操作员，无权进行此操作！";
            	request.setAttribute("organId",organId);
        		request.setAttribute("Message",message);
            	return getInitDutyInfo(mapping,request,response);
            }else if(authAdminType == 2){//普通管理员
            	if(!areaRight || empOwner == null || !empOwner.equals(authEmpId)){//被调整职员不在管辖范围内,或者创建者不是当前操作员
            		message = "您无权调整该职员";
                    request.setAttribute("organId",organId);
            		request.setAttribute("Message",message);
                	return getInitDutyInfo(mapping,request,response);
            	}
            }else if(authAdminType == 1 ){//特权管理员
            	if(!areaRight){
            		message = "您无权调整该职员";
                    request.setAttribute("organId",organId);
            		request.setAttribute("Message",message);
                	return getInitDutyInfo(mapping,request,response);
            	}
            }        

        	DutyEmployeeRelationMaintanceBO dutyEmployeeRelationMaintanceBO =
        		(DutyEmployeeRelationMaintanceBO)getBaseService().getServiceFacade("dutyEmployeeRelationManagementFacade");
            int aflag=0;//标记 用于保存返回值           
            boolean haveInOrgan = dutyEmployeeRelationMaintanceBO.haveInOrgan(employeeId,organId);
            if (dutyType.equals("1")) { // 判断增加 主要职务(0)/兼职（1）
				HashMap dataMap = new HashMap();
				if (choose.equals("0")) {
					dataMap.put("workNo", employee);
				}
				if (choose.equals("1")) {
					dataMap.put("employeeId", employee);
				}
				dataMap.put("dutyId", dutyId);
				dataMap.put("organId", organId);
				try {
					aflag = dutyEmployeeRelationMaintanceBO.doAddPartTimeEmployeeInfo(dataMap);
					if (aflag == 0) {
						message = "增加任职信息失败！";
					} else {
						message = "增加任职信息成功！";
			            /** 写日志 */
						 String desc = "组织机构:"+organId+":"+organName+"增加职务为"+dutyName+"的兼职人员:"+employeeId+":"+employeeName;
						 DBLogger logbo = (DBLogger)getDBLogger();
						 HashMap logMap = getLogMap(request,ADD_DUTY_BUTTON_ID,desc);
						 try{
							 logbo.doAddLogInfoByProc(logMap);
						 }catch(ServiceException e){
								SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganMaintanceAction--doModifyEmployeeDutyInf:"+e.getMessage());
								message = "记录增加兼职人员信息日志失败!"+e.getMessage();	
						 }
					}
				} catch (ServiceException e) {
					SysLog.writeLogs("om", GlobalParameters.ERROR,
							"OrganMaintanceAction--doModifyEmployeeDutyInf():" + e.getMessage());
					message = "增加任职信息失败" + e.getMessage();
				}
			}else{//主要职务
                employeeVO.setDutyId(Integer.parseInt(dutyId));
                employeeVO.setOrganId(organId);
                employeeVO.setAreaId(areaId);
                try {
                    aflag=employeeManagementBO.doModifyEmployeeInfo(employeeVO,haveInOrgan);
                    if(aflag==0)
        		    {
        		        message="增加任职信息失败！"; 
        		    }else{
        		        message="增加任职信息成功！"; 
			            /** 写日志 */
						 String desc = "组织机构:"+organId+":"+organName+"增加职务为"+dutyName+"的主要职务人员:"+employeeId+":"+employeeName;
						 DBLogger logbo = (DBLogger)getDBLogger();
						 HashMap logMap = getLogMap(request,ADD_DUTY_BUTTON_ID,desc);
						 try{
							 logbo.doAddLogInfoByProc(logMap);
						 }catch(ServiceException e){
								SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganMaintanceAction--doModifyEmployeeDutyInf:"+e.getMessage());
								message = "记录增加主要职务人员信息日志失败!"+e.getMessage();	
						 }
        		    }
                } catch (ServiceException e) {
                    SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganMaintanceAction--doModifyEmployeeDutyInf():"+e.getMessage());
        			message = "增加任职信息失败"+e.getMessage();	
                }            
            }            
            request.setAttribute("organId",organId);
    		request.setAttribute("Message",message);
    		return getInitDutyInfo(mapping,request,response);
        }
        
       
	}
	
	/** 删除兼职信息
	 * @param mapping
	 * @param request
	 * @param response
	 * @return
	 */
	private ActionForward doDeleteEmployeeDutyRelationInfo(ActionMapping mapping, HttpServletRequest request, HttpServletResponse response) {
		String message = "";
		//获取要删除的兼职信息
		String choose = request.getParameter("choose");
		String organId = request.getParameter("organId").trim();
		String dutyId = request.getParameter("dutyId").trim();
		String employeeId=request.getParameter("employeeId").trim();
		
		EmployeeDutyRelationVO empDutyVO = new EmployeeDutyRelationVO();
		empDutyVO.setDutyId(Integer.parseInt(dutyId));
		empDutyVO.setEmployeeId(employeeId);
		empDutyVO.setOrganId(organId);
		
        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");
        SwitchDAO switchDao = (SwitchDAO) factory.getInteractionObject("switchDAO", appContext);
		String organName = switchDao.getOrganNameByOrganId(organId);
		String employeeName =switchDao.getEmoployeeNameById(employeeId);
        
		DutyEmployeeRelationMaintanceBO service=(DutyEmployeeRelationMaintanceBO)getBaseService().getServiceFacade("dutyEmployeeRelationManagementFacade");//得到BO
		 
	    int dflag=0; //标记 用于保存返回值
		try {
		  
		    dflag=service.doDeleteEmployeeDutyRelationInfo(empDutyVO);
		    if(dflag==0)
		    {
		        message="删除兼职信息失败！"; 
		    }
		    else
		    {
		        message="删除兼职信息成功！"; 
	            /** 写日志 */
				 String desc = "组织机构:"+organId+":"+organName+"删除兼职人员:"+employeeId+":"+employeeName;
				 DBLogger logbo = (DBLogger)getDBLogger();
				 HashMap logMap = getLogMap(request,DELETE_DUTY_BUTTON_ID,desc);
				 try{
					 logbo.doAddLogInfoByProc(logMap);
				 }catch(ServiceException e){
						SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganMaintanceAction--doDeleteEmployeeDutyRelationInfo:"+e.getMessage());
						message = "记录删除兼职人员信息日志失败!"+e.getMessage();	
				 }
		    }
        } catch (ServiceException e) {
            SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganMaintanceAction--doDeleteEmployeeDutyRelationInfo():"+e.getMessage());
			message = "删除兼职信息失败"+e.getMessage();	
        }
		
        request.setAttribute("organId",organId);
		request.setAttribute("Message",message);
		return getInitDutyInfo(mapping,request,response);
	}

	/** 初始化任职类型
	 * 
	 * @return ParamObjectCollection
	 */
	private ParamObjectCollection getDutyTypeColl()
	{
	    ParamObjectCollection coll= new ParamObjectCollection();
	    
	    ParamObject main = new ParamObject();
	    main.setId("0");
	    main.setName("主要职务");
	    coll.addParamObject(main);
	    
	    ParamObject less = new ParamObject();
	    less.setId("1");
	    less.setName("兼职");
	    
	    coll.addParamObject(less);
	
	    return coll;
	}
    /**
     * 记录日志所需信息
     * @param request
     * @param buttonId
     * @param desc
     * @return
     */
    private HashMap getLogMap(HttpServletRequest request,String buttonId,String desc){
    	HashMap logMap = new HashMap();
    	AuthorizeVO authvo = (AuthorizeVO) request.getSession().getAttribute(GlobalParameters.SESSION_INFO);
    	String loginHost = request.getRemoteHost();
    	String workNo =  authvo.getWorkNo();
    	String employeeId = authvo.getEmployeeId();
    	logMap.put("systemId", SYSTEM_ID);
    	logMap.put("buttonId", buttonId);
    	logMap.put("employeeId", employeeId);
    	logMap.put("workNo", workNo);
    	logMap.put("loginHost", loginHost);
    	logMap.put("operDesc", desc);    	
    	return logMap;
    }
    
	private boolean needProductCheck(){
        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");
        OmSwitchDAO omSwitchDAO = (OmSwitchDAO) factory.getInteractionObject("omSwitchDAO", appContext);
        boolean need = false;
        try{
        	need  = omSwitchDAO.getIfNeedProductCheck();
        }catch(DataAccessException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,
                	"EmployeeMaintanceAction--needProductCheck:"+e.getMessage());
        }
        return need;
	}
}
