package com.neusoft.om.action.mac;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.crm.channel.outInterface.om.dao.OmQueryDAOImpl;
import com.neusoft.om.dao.common.SwitchDAO;
import com.neusoft.om.dao.mac.MacsPermittedDAO;
import com.neusoft.om.dao.mac.MacsPermittedVO;
import com.neusoft.om.dao.mac.ParameterDAO;
import com.neusoft.om.dao.organdisplay.OrganDisplayColl;
import com.neusoft.om.dao.organdisplay.OrganDisplayDAO;
import com.neusoft.om.dao.organdisplay.OrganDisplayVO;
import com.neusoft.tdframework.authorization.AuthorizeVO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.common.util.NullProcessUtil;
import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.tdframework.web.struts.TDDispatchAction;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;
import com.neusoft.unieap.config.SystemConfig;
import com.neusoft.unieap.util.RequestUtil;
/*******************************************************************************
 * 程序名 :MAC地址配置action
 * 日期 : 2008-3-10
 * 作者 : zhaof@neusoft.com 
 * 模块 : 框架-权限系统
 * 描述 : OM_MACS_PERMITTED_T 表的维护 
 * 备注 :
 * 
 * ------------------------------------------------------------
 * 修改历史 序号 日期 修改人
 * 修改原因 1 2
 ******************************************************************************/
public class MacsPermittedAction extends TDDispatchAction {
	
    public ActionForward queryInit(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {
    	String city = NullProcessUtil.nvlToString((String) request.getParameter("city"), "");
    	String hallId = NullProcessUtil.nvlToString((String) request.getParameter("hallId"), "");
    	SwitchDAO switchDAO = getSwitchDAO(request);    	
    	ParameterDAO parameterDAO= getParameterDAO(request);	
    	String cityName = switchDAO.getAreaNameByAreaId(city);    	
    	OmQueryDAOImpl omQueryDAOImpl = getDealerDAO(request);    
    	com.neusoft.crm.channel.outInterface.om.data.DealerVO channelVO = omQueryDAOImpl.doGetDealerByDealer(hallId);
        String hallName = channelVO.getDealer_name();
    	ParamObjectCollection cityColl = new ParamObjectCollection();
		//从session中得到操作员区域信息
		AuthorizeVO authorizeVO = (AuthorizeVO)request.getSession().getAttribute(GlobalParameters.SESSION_INFO);
		String areaId = authorizeVO.getAreaId();
    	try{
    		cityColl = parameterDAO.getDealerArea(areaId);
    	}catch(DataAccessException e){
    		SysLog.writeExceptionLogs("MacsPermittedAction", GlobalParameters.ERROR, "MacsPermittedAction--query()--1:", e);
    		request.setAttribute("cityColl",new ParamObjectCollection()); 
            throw new ActionException(e);
    	}
    	
        request.setAttribute("cityName", cityName);
        request.setAttribute("hallName", hallName);
        request.setAttribute("city", city);
        request.setAttribute("hallId", hallId);
        request.setAttribute("cityColl",cityColl);
        return actionMapping.findForward("queryInit");
    }
    //初始化方法
    public ActionForward query(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {
    	int totalRows = getTotalRowsFromRequest(request);
   	
    	String contactName = NullProcessUtil.nvlToString((String) request.getParameter("contactName"), "");
    	String macAddress = NullProcessUtil.nvlToString((String) request.getParameter("macAddress"), "");
    	String hallId = NullProcessUtil.nvlToString((String) request.getParameter("hall"), "");
    	String city = NullProcessUtil.nvlToString((String) request.getParameter("city"), "");
    	Map map = new HashMap();
    	map.put("contactName", contactName);
    	map.put("address", macAddress);
    	map.put("hallId", hallId);
    	map.put("city", city);
    	if(contactName == null || contactName.trim().equals("")){
    		contactName = (String)request.getAttribute("contactName");
    	}
    	if(macAddress == null || macAddress.trim().equals("")){
    		macAddress = (String)request.getAttribute("macAddress");
    	}
    	if(hallId == null || hallId.trim().equals("")){
    		hallId = (String)request.getAttribute("hallId");
    	}
    	if(city == null || city.trim().equals("")){
    		city = (String)request.getAttribute("city");
    	}
    	MacsPermittedDAO macsPermittedDAO = getMacsPermittedDAO(request);
    	SwitchDAO switchDAO = getSwitchDAO(request);
    	OmQueryDAOImpl omQueryDAOImpl = getDealerDAO(request);
        List macsList = null;
        int DEFAULT_PAGE_SIZE = 10;        
        try {
            if (totalRows <= 0) {
                totalRows = macsPermittedDAO.getRowCount(map);
            }
            int[] getStartEnd = getStartEnd(request, totalRows, DEFAULT_PAGE_SIZE);
            if (totalRows > 0) {
            	macsList = macsPermittedDAO.getMacsPermittedList(map, getStartEnd[0], getStartEnd[1]);
            }
            if(macsList != null ){
            	for( int i=0; i< macsList.size(); i++){
            		MacsPermittedVO vo = (MacsPermittedVO) macsList.get(i);
            		String dealerId = vo.getHallId();            		
                	com.neusoft.crm.channel.outInterface.om.data.DealerVO channelVO = omQueryDAOImpl.doGetDealerByDealer(dealerId);
                    String hallName = channelVO.getDealer_name();
            		String dealerName = channelVO.getDealer_name();//switchDAO.getDealerNameById(dealerId);
            		String cityId = vo.getCity();
            		String cityName = switchDAO.getAreaNameByAreaId(cityId);
            		vo.setHallName(dealerName);
            		vo.setCityName(cityName);
            	}
            } 
        } catch (DataAccessException e) {
            SysLog.writeExceptionLogs("MacsPermittedAction", GlobalParameters.ERROR, "MacsPermittedAction--query()--1:", e);
            throw new ActionException(e);
        }       
        request.setAttribute("macsList", macsList);
        return actionMapping.findForward("list");
    }
    
    public ActionForward modiInit(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {
    	String address = NullProcessUtil.nvlToString((String) request.getParameter("address"), "");
    	String city = NullProcessUtil.nvlToString((String) request.getParameter("city"), "");
    	String hallId = NullProcessUtil.nvlToString((String) request.getParameter("hallId"), "");
    	MacsPermittedDAO macsPermittedDAO = getMacsPermittedDAO(request);
    	SwitchDAO switchDAO = getSwitchDAO(request);    	    	
    	OmQueryDAOImpl omQueryDAOImpl = getDealerDAO(request);
    	MacsPermittedVO macPermittedVO = new  MacsPermittedVO();   
        String cityName = "";
        String oper = "";
        try {
        	macPermittedVO = macsPermittedDAO.getMacsPermittedVO(address);
            if(macPermittedVO == null){
            	macPermittedVO = new MacsPermittedVO();
            	macPermittedVO.setCity(city);
            	macPermittedVO.setHallId(hallId);
            	com.neusoft.crm.channel.outInterface.om.data.DealerVO channelVO = omQueryDAOImpl.doGetDealerByDealer(hallId);
                String hallName = channelVO.getDealer_name();
            	macPermittedVO.setHallName(hallName);
            	cityName = switchDAO.getAreaNameByAreaId(city);
            	oper = "add";
            }else{
            	String dealerId = macPermittedVO.getHallId();
            	com.neusoft.crm.channel.outInterface.om.data.DealerVO channelVO = omQueryDAOImpl.doGetDealerByDealer(dealerId);
                String dealerName = channelVO.getDealer_name();
            	macPermittedVO.setHallName(dealerName);
            	cityName = switchDAO.getAreaNameByAreaId(macPermittedVO.getCity());
            	oper= "modify";
            }
            
            request.setAttribute("cityName", cityName);
        } catch (DataAccessException e) {
            SysLog.writeExceptionLogs("MacsPermittedAction", GlobalParameters.ERROR, "MacsPermittedAction--modiInit()--1:", e);
            throw new ActionException(e);
        }

        request.setAttribute("macPermittedVO", macPermittedVO);
        request.setAttribute("oper", oper);
    	return actionMapping.findForward("modify");
    }
    
    public ActionForward doModify(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {
    	String contactName = request.getParameter("contactName");
    	String macAddress = request.getParameter("macAddress");
    	String hallId = request.getParameter("hallId");
    	String city = request.getParameter("city");
    	String town = request.getParameter("town");
    	String phoneNumber = request.getParameter("phoneNumber");
    	String priAddress = request.getParameter("priAddress");
    	String oper = request.getParameter("oper");
    	MacsPermittedVO vo = new MacsPermittedVO();
    	vo.setContactName(contactName);
    	vo.setMacAddress(macAddress);
    	vo.setHallId(hallId);
    	vo.setCity(city);
    	vo.setTown(town);
    	vo.setPhoneNumber(phoneNumber);
    	MacsPermittedDAO macsPermittedDAO = getMacsPermittedDAO(request);
    	String message = "保存成功";
    	try{
    		if(oper != null && oper.equals("modify")){
    			macsPermittedDAO.doModifyMacsPermitted(vo, priAddress);
    		}else if(oper != null && oper.equals("add")){
    			MacsPermittedVO priVO = macsPermittedDAO.getMacsPermittedVO(macAddress);
    			if(priVO != null){ //数据库中已经存在此网段的纪录，则不允许插入
    				message = "保存失败，已经存在该mac地址";
    			}else{
    				macsPermittedDAO.doAddMacsPermitted(vo);
    			}
    			
    		}else{
    			message = "保存失败,操作类型不详";
    		}
    		
    	}catch(DataAccessException e){
    		 message = "保存失败--"+e.getMessage();
    		 SysLog.writeExceptionLogs("MacsPermittedAction", GlobalParameters.ERROR, "MacsPermittedAction--doModify()--1:", e);
             throw new ActionException(e);
    	}
    	request.setAttribute("message", message);
    	request.setAttribute("ipSegmentAddress", macAddress);
    	return this.query(actionMapping ,actionForm,request,response);
    }
    public ActionForward doDelete(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {
    	String address = NullProcessUtil.nvlToString((String) request.getParameter("address"), "");    	//指定删除的记录
    	String contactName = NullProcessUtil.nvlToString((String) request.getParameter("contactName"), "");//查询条件
    	String macAddress = NullProcessUtil.nvlToString((String) request.getParameter("macAddress"), "");//查询条件
    	String hallId = NullProcessUtil.nvlToString((String) request.getParameter("hallId"), "");//查询条件
    	String city = NullProcessUtil.nvlToString((String) request.getParameter("city"), "");//查询条件
    	MacsPermittedDAO macsPermittedDAO = getMacsPermittedDAO(request);
    	String message = "删除成功";
    	try{
    		macsPermittedDAO.doDeleteMacsPermitted(address);
    	}catch(DataAccessException e){
   		 message = "删除失败--"+e.getMessage();
		 SysLog.writeExceptionLogs("MacsPermittedAction", GlobalParameters.ERROR, "MacsPermittedAction--doDelete()--1:", e);
         throw new ActionException(e);
    	}
    	request.setAttribute("message", message);
    	request.setAttribute("contactName", contactName);
    	request.setAttribute("macAddress", macAddress);
    	request.setAttribute("hallId", hallId);
    	request.setAttribute("city", city);
    	return this.query(actionMapping ,actionForm,request,response);
    }
    /*
     * 
     */
    public ActionForward showDealerTree(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {    	
		String area_id  = request.getParameter("areaId");
		String message = "";
		//从session中得到操作员区域信息
		AuthorizeVO authorizeVO = (AuthorizeVO)request.getSession().getAttribute(GlobalParameters.SESSION_INFO);
		String areaId = authorizeVO.getAreaId();
		areaId = "018";
		OrganDisplayColl organDisplayColl = null;
        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");
        OrganDisplayDAO organDisplayDAO = (OrganDisplayDAO) factory.getInteractionObject("organDisplayDAO", appContext);
        SwitchDAO switchDAO = (SwitchDAO)factory.getInteractionObject("switchDAO", appContext);
        String startLevel = switchDAO.getAreaLevelById(areaId);
        int level = Integer.parseInt(startLevel);
		try{
			if(area_id!=null && !area_id.trim().equals("")){
				organDisplayColl = getOrganDisplayInfo(area_id,5,level,organDisplayDAO);
				request.setAttribute("openFlag","countryTree");
			}else{
				organDisplayColl = getOrganDisplayInfo(areaId,5,level,organDisplayDAO);
				request.setAttribute("openFlag","areaTree");
			}					
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"MacsPermittedAction--showDealerTree:"+e.getMessage());
			message = e.getMessage();		
		}
		request.setAttribute("message",message);
		request.setAttribute("OrganDisplayColl",organDisplayColl);
    	return actionMapping.findForward("tree");
    }
    private MacsPermittedDAO getMacsPermittedDAO(HttpServletRequest request){    	
        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");
        MacsPermittedDAO macsPermittedDAO = (MacsPermittedDAO) factory.getInteractionObject("macsPermittedDAO", appContext);
        return macsPermittedDAO;
    }
    private SwitchDAO getSwitchDAO(HttpServletRequest request){    	
        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");
        SwitchDAO switchDAO = (SwitchDAO) factory.getInteractionObject("switchDAO", appContext);
        return switchDAO;
    }
    private ParameterDAO getParameterDAO(HttpServletRequest request){    	
        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");
        ParameterDAO parameterDAO = (ParameterDAO) factory.getInteractionObject("parameterDAO", appContext);
        return parameterDAO;
    }
    private OmQueryDAOImpl getDealerDAO(HttpServletRequest request){    	
        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");
        OmQueryDAOImpl omQueryDAOInterface = (OmQueryDAOImpl) factory.getInteractionObject("omQueryDAOInterface", appContext);
        return omQueryDAOInterface;
    }
	private OrganDisplayColl getOrganDisplayInfo(String areaId,int areaLevel, int startLevel,OrganDisplayDAO organDisplayDAO)  {
		OrganDisplayColl coll = new OrganDisplayColl();
		OrganDisplayColl areaColl = null;
		OrganDisplayColl organColl = null;
		OrganDisplayColl dealerColl = null;

		//获得区域
		try{
			areaColl = organDisplayDAO.getMarketAreaColl(areaId, areaLevel);
			if(areaColl != null && areaColl.getRowCount()!=0){
				areaColl = orderColl(areaColl, startLevel);
			}			
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"MacsPermittedAction--getOrganDisplayInfo :"+e.getMessage());
		}
		//根据区域结果集获得组织机构,同时得到该组织机构的渠道,并添加到最终结果集合中
		
		for(int i=0;i< areaColl.getRowCount();i++){
			coll.addOrganDisplay(areaColl.getOrganDisplay(i));
			try{
				String id = areaColl.getOrganDisplay(i).getOrganId();
				int level = areaColl.getOrganDisplay(i).getOrganLevel();
				organColl = organDisplayDAO.getMarketColl(id,level);
			
				for(int j=0;j<organColl.getRowCount();j++){
					coll.addOrganDisplay(organColl.getOrganDisplay(j));
					String organId = organColl.getOrganDisplay(j).getOrganId();
					int organLevel = organColl.getOrganDisplay(j).getOrganLevel();
					dealerColl = organDisplayDAO.getDealerColl(organId, organLevel);
					for(int k=0; k < dealerColl.getRowCount(); k++){
						coll.addOrganDisplay(dealerColl.getOrganDisplay(k));
					}
				}
			}catch (DataAccessException e) {
				SysLog.writeLogs("om",GlobalParameters.ERROR,"MacsPermittedAction--getOrganDisplayInfo :"+e.getMessage());
			}
		}

		return coll;
	}
	

	private OrganDisplayColl orderColl(OrganDisplayColl coll, int baseLevel) {
		OrganDisplayColl organColl = new OrganDisplayColl();
		int level = 0;
		for( int i= 0; i < coll.getRowCount() ; i++){
			OrganDisplayVO vo = coll.getOrganDisplay(i);
			int queryLevel = vo.getOrganLevel();	
			level = queryLevel - baseLevel +1;
			vo.setOrganLevel(level);
			String parentOrganId = vo.getParentOrganId();
			if(organColl.ExistOrganId(parentOrganId)){
				int parentIndex = getParentOrganIndex(organColl,vo);
				organColl.addElement(parentIndex+1, vo);
			}else{
				organColl.addOrganDisplay(vo);
			}			
		}
		return organColl;
	}
	private int getParentOrganIndex(OrganDisplayColl  coll, OrganDisplayVO vo){
		int index = -1;
		for(int i=0; i < coll.getRowCount(); i ++){
			OrganDisplayVO parentVO = coll.getOrganDisplay(i);
			if(parentVO.getOrganId().equals(vo.getParentOrganId())){
				index = i;
				break;
			}
		}
		return index;
	}
	
	public ActionForward getOrganColl(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response)throws IOException{
		RequestUtil requestUtile = new RequestUtil(request);
		String city = requestUtile.getParameter("cityId");
		String result = "<SELECT id='organ' onchange='getHallColl()' style='width:85%'>";
		result+="<option value=''>请选择</option>";
		ParameterDAO parameterDAO = getParameterDAO(request);
		ParamObjectCollection organColl = parameterDAO.getDealerOrgan(city);
		if(organColl != null){
			for(int i=0; i < organColl.getRowCount(); i++){
				String organId = organColl.getParamObjectByIndex(i).getId();
				String organName = organColl.getParamObjectByIndex(i).getName();
				result +="<option value='" +organId+"'>"+organName+"</option>";
			}
		}
		result+="</SELECT>";
		response.setContentType(SystemConfig.CONTENT_TYPE);
		response.getWriter().write(result);
		return null;		
	}
	
	public ActionForward getHallColl(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response)throws IOException{
		RequestUtil requestUtile = new RequestUtil(request);
		String organId = requestUtile.getParameter("organId");
		String result = "<SELECT id='hall' name='hall' style='width:85%'>";
		ParameterDAO parameterDAO = getParameterDAO(request);
		ParamObjectCollection hallColl = parameterDAO.getDealer(organId);
		if(hallColl != null){
			for(int i=0; i < hallColl.getRowCount(); i++){
				String dealerId = hallColl.getParamObjectByIndex(i).getId();
				String dealerName = hallColl.getParamObjectByIndex(i).getName();
				result +="<option value='" +dealerId+"'>"+dealerName+"</option>";
			}
		}
		result+="</SELECT>";
		response.setContentType(SystemConfig.CONTENT_TYPE);
		response.getWriter().write(result);
		return null;		
	}
	
	
}
