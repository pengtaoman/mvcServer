package com.neusoft.om.action.area;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.om.bo.AreaBO;
import com.neusoft.om.dao.area.AreaColl;
import com.neusoft.om.dao.area.AreaDAO;
import com.neusoft.om.dao.area.AreaVO;
import com.neusoft.om.dao.dictionary.OMDictionaryDAO;
import com.neusoft.om.dao.omswitch.OmSwitchDAO;
import com.neusoft.tdframework.authorization.AuthorizeVO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.common.util.GridUtil;
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
import com.neusoft.unieap.config.SystemConfig;
import com.neusoft.unieap.util.RequestUtil;

/**brief description
 * <p>Date       : 2004-11-01</p>
 * <p>Module     : om</p>
 * <p>Description: 行政区域维护</p>
 * <p>Remark     : </p>
 * @author renh
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> 修改历史</p>
 * <p>  序号		日期		修改人			修改原因</p>
 * <p>   1                                       </p>
 */

public class AreaAction extends BaseAction {
	
	static int DEFAULT_PAGE_SIZE=10;
	private static String SYSTEM_ID = "41";
	private static String ADD_BUTTON_ID = "041AEA";
	private static String DELETE_BUTTON_ID = "041AEC";
	private static String MODIFY_BUTTON_ID = "041AEB";
	
	public ActionForward service(
		ActionMapping mapping,
		ActionForm form,
		HttpServletRequest request,
		HttpServletResponse response)
		throws ActionException{			
			String oprType  = NullProcessUtil.nvlToString(request.getParameter("OperType"),"init");	
			request.setAttribute("OperType",oprType);			
			if(oprType.equals("init")){
				return init(mapping,request,response);
			}	
			else if(oprType.equals("initQueryPage")){
				return initQueryPage(mapping,request,response);
			}
			else if(oprType.equals("query")){
				return getAreaInfo(mapping,request,response);
			}
			else if(oprType.equals("queryDetail")){
				return queryDetail(mapping, request, response);
			}
			else if(oprType.equals("add")){	
				return addAreaInfo(mapping,request,response);
			}
			else if(oprType.equals("modify")){
				return modifyAreaInfo(mapping,request,response);
			}
			else if(oprType.equals("delete")){
				return deleteAreaInfo(mapping,request,response);
			}
			else{
				return mapping.findForward("result");
			}
		}
	
	public ActionForward init(ActionMapping mapping,
			HttpServletRequest request,
			HttpServletResponse response){
		AuthorizeVO authVO = getAuthorize(request);
		String authAreaId = authVO.getAreaId();
		int authAreaLevel = authVO.getAreaLevel();
		String flag = "false";
		if(authAreaLevel < 3){
			flag = "true";
			authAreaId = "";
		}
		
        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om"); 
        OMDictionaryDAO dictionaryDAO = (OMDictionaryDAO) factory.getInteractionObject("omDictionaryDAO",appContext);
        
        ParamObjectCollection areaColl = null;
        try {
        	areaColl = dictionaryDAO.getAreaColl(authAreaId,authAreaLevel);		
		} catch (Exception e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"AreaAction--init:"+e.getMessage());		
		}
		ParamObjectCollection countryColl = new ParamObjectCollection();
        request.setAttribute("opAreaId", authAreaId);
        request.setAttribute("AreaColl", areaColl);
        request.setAttribute("countryColl", countryColl);
        request.setAttribute("flag", flag);
       
		return mapping.findForward("init");
	}
	
	public ActionForward initQueryPage(ActionMapping mapping,
			HttpServletRequest request,
			HttpServletResponse response){
		AuthorizeVO authVO = getAuthorize(request);
		String authAreaId = request.getParameter("areaIdValue");
		String selectParentAreaId = request.getParameter("parentAreaId");
		String selectParentAreaName = request.getParameter("parentAreaName");
		int authAreaLevel = authVO.getAreaLevel();
		if(authAreaId==null || authAreaLevel>3){
			authAreaId = authVO.getAreaId();
		}
		
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");
        AreaBO service =(AreaBO)getBaseService().getServiceFacade("areaFacade");
        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        OmSwitchDAO switchDAO = (OmSwitchDAO) factory.getInteractionObject("omSwitchDAO",appContext);
        Vector vec = new Vector();
        int maxLevel = switchDAO.getMaxAreaLevel();//得到最低级区域级别
        try {	
        	vec = service.getAllAreaInfo(authAreaId,maxLevel-1);//取最低级上一级的区域级别
		} catch (ServiceException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"AreaAction--initQueryPage:"+e.getMessage());		
		}
 
        request.setAttribute("authAreaId", authAreaId);
        request.setAttribute("authId",authVO.getEmployeeId());
        request.setAttribute("areaTree", vec);
        request.setAttribute("authAreaLevel",String.valueOf(authAreaLevel));
        request.setAttribute("parentAreaId", selectParentAreaId);
        request.setAttribute("parentAreaName", selectParentAreaName);
        
		return mapping.findForward("initQueryPage");
	}
	/**
	 * 得到所有地市信息初始化页面
	 * @param mapping
	 * @param request
	 * @param response
	 * @return
	 */
	public ActionForward getAreaAllInfo(ActionMapping mapping,
			HttpServletRequest request,
			HttpServletResponse response){
		AreaColl coll = new AreaColl();
		AreaBO service =(AreaBO)getBaseService().getServiceFacade("areaFacade");
		String message = "";
		try {
			coll = service.getAreaAllInfo();		
		} catch (ServiceException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"AreaAction--getAreaAllInfo:"+e.getMessage());
			message = e.getMessage();			
		}
		if(message!=""){
			request.setAttribute("Message",message);
		} 
		request.setAttribute("area",coll);
		return mapping.findForward("result");					
		}
	
	public ActionForward getCountryColl(ActionMapping mapping,
			HttpServletRequest request,
			HttpServletResponse response){
		RequestUtil requestUtil = new RequestUtil(request);
		System.out.println("asdaas");
		String areaId = NullProcessUtil.nvlToString(requestUtil.getParameter("areaId"), "");
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");
        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AreaDAO areaDAO = (AreaDAO) factory.getInteractionObject("areaDAO",appContext);
		AreaColl countyColl = areaDAO.getCountryColl(areaId);
		StringBuffer result = new StringBuffer();
        for (int i = 0; i < countyColl.getRowCount(); i++) {
            AreaVO vo = (AreaVO) countyColl.getArea(i);
            result.append("\t<option value='" + vo.getAreaId() + "'>" + vo.getAreaName() + "</option>\n");
        }
        try{
        	response.setContentType(SystemConfig.CONTENT_TYPE);
        	response.getWriter().write(result.toString());
        }catch(Exception e){
        	SysLog.writeLogs("om", GlobalParameters.ERROR,
					"AreaDAOImpl--getCountryColl()-2:"+ e.getMessage());
        }
		return null;
	}
	/**
	 * 查询行政区域
	 * @param mapping
	 * @param request
	 * @param response
	 * @return
	 */
	private ActionForward getAreaInfo(ActionMapping mapping,
				HttpServletRequest request,HttpServletResponse response) {
		Map queryMap = new HashMap();
		
		String message = (String)request.getAttribute("message");
		String newAreaId = NullProcessUtil.nvlToString(request.getParameter("newAreaId"),"");
		queryMap.put("newAreaId",newAreaId);
		
		if(newAreaId.trim().equals("")){
			String areaName = NullProcessUtil.nvlToString(request.getParameter("areaName"),"");
			String parentAreaId = NullProcessUtil.nvlToString(request.getParameter("parentArea"),"");
			String activeDate = NullProcessUtil.nvlToString(request.getParameter("activeDate"),"");
			String inactiveDate = NullProcessUtil.nvlToString(request.getParameter("inactiveDate"),"");
			String areaId = NullProcessUtil.nvlToString(request.getParameter("areaId"),"");
			
			queryMap.put("parentAreaId",parentAreaId);
			queryMap.put("areaName",areaName);
			queryMap.put("activeDate",activeDate);
			queryMap.put("inactiveDate",inactiveDate);
			queryMap.put("areaId", areaId);
		}
		
		
        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");
        AreaDAO areaDAO = (AreaDAO) factory.getInteractionObject("areaDAO", appContext);
		
        List records=null;
		int totalRows = GridUtil.getTotalRowsFromRequest(request);
		
		try {
			if(totalRows < 0){
				totalRows = areaDAO.getAreaRowCount(queryMap);
			}
			
			int[] startAndEnd = GridUtil.getStartEnd(request,totalRows,DEFAULT_PAGE_SIZE);
			queryMap.put("startRow",String.valueOf(startAndEnd[0]));
			queryMap.put("endRow",String.valueOf(startAndEnd[1]));
			
			AreaColl areaColl = areaDAO.getAreaCollInfo(queryMap);
			records  = areaColl.getList();
			areaColl = null;
		} catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"AreaAction--getAreaInfo:"+e.getMessage());
			message = e.getMessage();			
		}
		
		request.setAttribute("areaList", records);
		request.setAttribute("message",message);
		//保留查询条件
//		request.setAttribute("areaName",areaName);
//		request.setAttribute("parentAreaId", parentAreaId);
//		request.setAttribute("activeDate", activeDate);
//		request.setAttribute("inactiveDate", inactiveDate);
		
		return mapping.findForward("queryresult");	
		
	}
	private ActionForward queryDetail(ActionMapping mapping,
			HttpServletRequest request,
			HttpServletResponse response){
		AuthorizeVO authVO = getAuthorize(request);
		
		String parentAreaId = (String)request.getParameter("parentArea");
		String parentAreaName = "";//(String)request.getParameter("parentAreaName");
		
		String mode = (String)request.getParameter("mode");
		String message = "";
		
        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");
        
        AreaDAO areaDAO = (AreaDAO) factory.getInteractionObject("areaDAO", appContext);
 
        ParamObjectCollection areaLevelColl = null;
        AreaVO  areaVO = new AreaVO();
        
        try {
//        	if(parentAreaName!=null && !parentAreaName.trim().equals("")){
//        		byte[] tempByte = parentAreaName.getBytes("ISO8859_1");
//            	parentAreaName  = new String(tempByte, "GB2312");
//        	}
        	if(parentAreaId!=null && !parentAreaId.trim().equals("")){
            	parentAreaName  = areaDAO.getAreaNameByAreaId(parentAreaId);
        	}
        	
        	if(!mode.trim().equals("add")){
        		areaVO = areaDAO.getAreaById(parentAreaId);
        		areaLevelColl = areaDAO.getAreaLevelById(parentAreaId);
        	}else{
        		areaLevelColl = areaDAO.getAreaLevelByParent(parentAreaId);
        	}
		} catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"AreaAction--queryDetail():"+e.getMessage());
			message = e.getMessage().replaceAll("\"","'").replaceAll("\n"," ").replaceAll("("," ").replaceAll(")"," ");			
		} catch (Exception e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"AreaAction--queryDetail():"+e.getMessage());
			message = e.getMessage().replaceAll("\"","'").replaceAll("\n"," ").replaceAll("("," ").replaceAll(")"," ");			
		} 
        
		if(!message.trim().equals("")){
			request.setAttribute("message",message);
		}
        request.setAttribute("authAreaId", authVO.getAreaId());
        request.setAttribute("authId",authVO.getEmployeeId());
        request.setAttribute("parentAreaId",parentAreaId);
        request.setAttribute("parentAreaName",parentAreaName);
        request.setAttribute("areaLevelColl", areaLevelColl);
        if(!mode.trim().equals("add")){
        	request.setAttribute("areaVO",areaVO);
        }else{
        	SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
            request.setAttribute("nowDate", format.format(new Date()));
        }
        request.setAttribute("mode",mode);
        
		return mapping.findForward("showDetail");	
	}
	/**
	 * 增加行政区域
	 * @param mapping
	 * @param request
	 * @param response
	 * @return
	 */
	private ActionForward addAreaInfo(ActionMapping mapping,
				HttpServletRequest request,HttpServletResponse response) { 
		
        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");
        AreaDAO areaDAO = (AreaDAO) factory.getInteractionObject("areaDAO", appContext);
        String hiddenPareaName = NullProcessUtil.nvlToString(request.getParameter("hiddenPareaName"),"");
		String parentAreaId = NullProcessUtil.nvlToString(request.getParameter("parentAreaId"),"");
		String areaLevel = NullProcessUtil.nvlToString(request.getParameter("areaLevel"),"");
		int level = Integer.parseInt(areaLevel);
		String areaName = NullProcessUtil.nvlToString(request.getParameter("areaName"),"");
		String postalCode = NullProcessUtil.nvlToString(request.getParameter("postalCode"),"");
		//String areaCode = NullProcessUtil.nvlToString(request.getParameter("areaCode"),"");
		String activeDate = NullProcessUtil.nvlToString(request.getParameter("activeDate"),"");
		String inactiveDate = NullProcessUtil.nvlToString(request.getParameter("inactiveDate"),"");
		
		String message = "增加区域信息成功!";
		String areaId = "";
		AreaVO vo = new AreaVO();
		AreaVO parentArea = new AreaVO();
		try {
			parentArea = areaDAO.getAreaById(parentAreaId);
			String areaCode = parentArea.getAreaCode();
			vo.setAreaName(areaName);
			vo.setParentAreaId(parentAreaId);
			vo.setAreaLevel(level);
			vo.setPostalCode(postalCode);
			vo.setAreaCode(areaCode);
			vo.setActiveDate(activeDate);
			vo.setInactiveDate(inactiveDate);
			
			areaId = areaDAO.addAreaInfo(vo);
			if(areaId.equals("false")){
				message = "新增区域信息失败";
			}else{
				AuthorizeVO authVO = getAuthorize(request);
				/** 写日志 */
				String desc = "操作员："+authVO.getWorkNo()+" | "+authVO.getEmployeeName()+"，在 "+parentAreaId+" 下新增区域："+areaName;
				DBLogger logbo = (DBLogger)getDBLogger();
				HashMap logMap = getLogMap(request,ADD_BUTTON_ID,desc);
				logbo.doAddLogInfoByProc(logMap);
			}
		} catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"AreaAction--addAreaInfo_1:"+e.getMessage());
			message = "增加失败:"+e.getMessage();
		}catch (Exception e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"AreaAction--addAreaInfo_1:"+e.getMessage());
			message = "增加失败:"+e.getMessage();
		}

		request.setAttribute("message",message);
		request.setAttribute("flag","close");
		request.setAttribute("newAreaId",areaId);
		request.setAttribute("parentAreaId", parentAreaId);
		request.setAttribute("parentAreaName",hiddenPareaName);
		return mapping.findForward("showDetail");
	}
	/**
	 * 修改行政区域
	 * @param mapping
	 * @param request
	 * @param response
	 * @return
	 */
	private ActionForward modifyAreaInfo(ActionMapping mapping,
				HttpServletRequest request,
				HttpServletResponse response) {
		//获取业务逻辑的实现类
		AreaBO service =(AreaBO)getBaseService().getServiceFacade("areaFacade");	
		
		String areaId = NullProcessUtil.nvlToString(request.getParameter("areaId"),"");
		String areaName = NullProcessUtil.nvlToString(request.getParameter("areaName"),"");
		String postalCode = NullProcessUtil.nvlToString(request.getParameter("postalCode"),"");
		String areaCode = NullProcessUtil.nvlToString(request.getParameter("areaCode"),"");
		String parentAreaId = NullProcessUtil.nvlToString(request.getParameter("parentAreaId"),"");
		String parentAreaName = NullProcessUtil.nvlToString(request.getParameter("hiddenPareaName"),"");
		//String areaLevel = NullProcessUtil.nvlToString(request.getParameter("areaLevel"),"");
		//int level = Integer.parseInt(areaLevel);
		String activeDate = NullProcessUtil.nvlToString(request.getParameter("activeDate"),"");
		String inactiveDate = NullProcessUtil.nvlToString(request.getParameter("inactiveDate"),"");
		//String cityCode = NullProcessUtil.nvlToString(request.getParameter("cityCode"),"");
		
		
		AreaVO vo = new AreaVO();
		vo.setAreaId(areaId);
		vo.setAreaName(areaName);
		//vo.setParentAreaId(parentAreaId);
		//vo.setCityCode(cityCode);
		//vo.setAreaLevel(level);
		vo.setPostalCode(postalCode);
		vo.setAreaCode(areaCode);
		vo.setActiveDate(activeDate);
		vo.setInactiveDate(inactiveDate);
		
		String message = "";
		
		try {
			message = service.modifyAreaInfo(vo);
			if(message.equals("true")){
				message = "区域信息修改成功";
				
				AuthorizeVO authVO = getAuthorize(request);
				/** 写日志 */
				String desc = "操作员："+authVO.getWorkNo()+" | "+authVO.getEmployeeName()+"，修改了 "+areaId+" | "+areaName+" 的区域信息：";
				DBLogger logbo = (DBLogger)getDBLogger();
				HashMap logMap = getLogMap(request,MODIFY_BUTTON_ID,desc);
				logbo.doAddLogInfoByProc(logMap);
			}
		} catch (ServiceException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"AreaAction--modifyAreaInfo_1:"+e.getMessage());
			message = "修改失败，异常信息："+e.getMessage();
		}
		
		request.setAttribute("message",message);	
		request.setAttribute("operFlag", "modify");
		request.setAttribute("flag","close");
		request.setAttribute("newAreaId",areaId);
		request.setAttribute("parentAreaId",parentAreaId);
		request.setAttribute("parentAreaName", parentAreaName);
		return mapping.findForward("showDetail");
	}
	
	/**
	 * 删除行政区域
	 * @param mapping
	 * @param request
	 * @param response
	 * @return
	 */
	private ActionForward deleteAreaInfo(ActionMapping mapping,
					HttpServletRequest request,
					HttpServletResponse response) {
        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");
        AreaDAO areaDAO = (AreaDAO) factory.getInteractionObject("areaDAO", appContext);
		String areaId = NullProcessUtil.nvlToString(request.getParameter("areaId"),"");
		String priAreaId = NullProcessUtil.nvlToString(request.getParameter("priAreaId"),"");
		String message = "区域信息删除成功!";
		AreaVO areaVO = new AreaVO();
		String parentAreaId = "";
		String parentAreaName = "";
		try {
			areaVO = areaDAO.getAreaById(areaId);
			parentAreaId = areaVO.getParentAreaId();
			parentAreaName = areaVO.getParentAreaName();
			int code = areaDAO.doDeleteAreaInfo(areaId);
			if(code < 0){
				if(code == -100)
					message = "此区域存在下级节点，不能进行删除操作";
				else
					message = "区域信息删除失败";
			}else{
				AuthorizeVO authVO = getAuthorize(request);
				/** 写日志 */
				String desc = "操作员："+authVO.getWorkNo()+" | "+authVO.getEmployeeName()+"，删除了 "+areaId+" 的区域信息";
				DBLogger logbo = (DBLogger)getDBLogger();
				HashMap logMap = getLogMap(request,DELETE_BUTTON_ID,desc);
				logbo.doAddLogInfoByProc(logMap);
			}
		} catch (DataAccessException e) {
			SysLog.writeLogs("om","error","AreaAction--deleteAreaInfo_1:"+e.getMessage());
			message = "删除失败，异常信息："+e.getMessage();
		} catch (ServiceException e) {
			SysLog.writeLogs("om","error","AreaAction--deleteAreaInfo_1:"+e.getMessage());
			message = "删除失败，异常信息："+e.getMessage();
		}
		
		request.setAttribute("message",message);
		request.setAttribute("operFlag","delete");
		request.setAttribute("parentAreaId", parentAreaId);
		request.setAttribute("parentAreaName", parentAreaName);
		request.setAttribute("priAreaId", priAreaId);	
		
		return mapping.findForward("hiddenresult");
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
    
    
    
	

}
		