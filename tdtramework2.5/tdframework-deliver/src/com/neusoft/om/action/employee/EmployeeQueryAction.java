package com.neusoft.om.action.employee;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.crm.channel.outInterface.om.bo.OmQueryBO;
import com.neusoft.om.bo.EmployeeManagementBO;
import com.neusoft.om.bo.OrganManagementBO;
import com.neusoft.om.common.commonBO.OmCommon;
import com.neusoft.om.dao.area.AreaDAO;
import com.neusoft.om.dao.area.AreaVO;
import com.neusoft.om.dao.dealer.DealerColl;
import com.neusoft.om.dao.dealer.DealerDAO;
import com.neusoft.om.dao.dealer.DealerStructureColl;
import com.neusoft.om.dao.dealer.DealerStructureVO;
import com.neusoft.om.dao.dealer.DealerTypeColl;
import com.neusoft.om.dao.dealer.DealerVO;
import com.neusoft.om.dao.employee.EmployeeColl;
import com.neusoft.om.dao.employee.EmployeeDAO;
import com.neusoft.om.dao.omswitch.OmSwitchDAO;
import com.neusoft.om.dao.organ.OrganColl;
import com.neusoft.om.dao.organdisplay.OrganDisplayColl;
import com.neusoft.om.omutil.DealerConverse;
import com.neusoft.om.omutil.DealerTree;
import com.neusoft.om.omutil.OmOrganUtilDAO;
import com.neusoft.tdframework.authorization.AuthorizeVO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.common.data.ObjectCollection;
import com.neusoft.tdframework.common.data.ParamObject;
import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.common.util.GridUtil;
import com.neusoft.tdframework.common.util.NullProcessUtil;
import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.tdframework.web.struts.BaseAction;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;
import com.neusoft.unieap.taglib.commontree.tree.impl.Tree;
import com.neusoft.unieap.taglib.commontree.tree.impl.TreeNode;
import com.neusoft.unieap.taglib.commontree.tree.itf.ITree;
import com.neusoft.unieap.taglib.commontree.tree.itf.ITreeNode;

/**brief description
 * <p>Date       : 2004-12-01</p>
 * <p>Module     : om</p>
 * <p>Description: employee maintenance</p>
 * <p>Remark     : </p>
 * @author ren.hui@neusoft.com
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> 修改历史</p>
 * <p>  序号		日期		修改人			修改原因</p>
 * <p>   1                                       </p>
 */

public class EmployeeQueryAction extends BaseAction {
	static int DEFAULT_PAGE_SIZE = 10;
	private static String ACTION_NAME = "EmployeeQueryAction.do";
	
	public ActionForward service(
		ActionMapping mapping,
		ActionForm form,
		HttpServletRequest request,
		HttpServletResponse response)
		throws ActionException{
			String operType  = NullProcessUtil.nvlToString(request.getParameter("OperType"),"organDisplay").trim();

			request.setAttribute("ActionName", ACTION_NAME);
			request.setAttribute("OperType", operType);
			if (operType.intern() == "initQueryPage".intern()){
				return initQueryPage(mapping, request, response);
			} else if(operType.intern()=="organDisplay".intern()){
				return organDisplay(mapping, request, response);						
			}else if(operType.intern()=="employeeList".intern()){
			    return employeeList(mapping, request, response);
			}else if(operType.intern()=="treeDisplay".intern()){
			    return treeDisplay(mapping, request, response);
				//return getOrganColl(mapping, request, response);
			}else if(operType.intern()=="dealerEmpList".intern()){	
				return dealerEmpList(mapping, request, response);
			}else if(operType.intern()=="deliverEmp".intern()){//将某管理员对操作员的管理权限转给其他人-- 得到可转移管理员的列表
				return deliverEmp(mapping, request, response);
			}else if(operType.intern() == "doDeliver".intern()){
				return doDeliver(mapping,request, response);
			}else if(operType.intern() == "getCityColl".intern()){
				return getCityColl(mapping,request, response);
			}else if(operType.intern()=="getOrganColl".intern()){
				return getOrganColl(mapping,request, response);
			}
			else{
				return mapping.findForward("organlistresult");
			}	
		}
	private ActionForward organDisplay(ActionMapping mapping,
			HttpServletRequest request,
			HttpServletResponse response){
		OrganManagementBO organservice =(OrganManagementBO)getBaseService().getServiceFacade(OrganManagementBO.BEAN);
        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");
        OmSwitchDAO switchDAO = (OmSwitchDAO) factory.getInteractionObject("omSwitchDAO", appContext);
        AreaDAO areaDAO = (AreaDAO) factory.getInteractionObject("areaDAO", appContext);
        String organDim = switchDAO.getOrganDim();
		String operType  = NullProcessUtil.nvlToString(request.getParameter("OperType"),"organDisplay").trim();
		AuthorizeVO authvo = getAuthorize(request);
		String message = "";
		OrganDisplayColl organDisplayColl = new OrganDisplayColl();	
		//从session中得到操作员区域信息
		AuthorizeVO vo = getAuthorize(request);
		String areaId = vo.getAreaId();
		try{			
			organDisplayColl = organservice.getOrganDisplayInfo(areaId,4);            
            
		}catch (ServiceException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeQueryAction--getOrganDisplayInfo:"+e.getMessage());
			message = e.getMessage();		
		}
		request.setAttribute("OperType",operType);
		request.setAttribute("Message",message);
		request.setAttribute("OrganDisplayColl",organDisplayColl);
        request.setAttribute("authId", authvo.getEmployeeId());
        request.setAttribute("adminType", String.valueOf(authvo.getAdminType()));
        if(organDim != null && organDim.trim().toUpperCase().equals("ORGAN")){
			return mapping.findForward("organdisplay");
			
		}else{
			return mapping.findForward("organdisplayresult");
		}
	}
	
	private ActionForward employeeList(ActionMapping mapping,
			HttpServletRequest request,
			HttpServletResponse response){
		
		//从session中获取当前操作员的信息
		AuthorizeVO authvo = getAuthorize(request);
	    int areaLevel = authvo.getAreaLevel();         //操作员级别
        String employeeId = authvo.getEmployeeId();    //操作员员工号
        int adminType = authvo.getAdminType();         //操作类型
        
		EmployeeManagementBO service =(EmployeeManagementBO)getBaseService().getServiceFacade(EmployeeManagementBO.BEAN);
        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");
        OmSwitchDAO switchDAO = (OmSwitchDAO) factory.getInteractionObject("omSwitchDAO", appContext);
		//HttpSession session = request.getSession(true);
		//从树中可以获取到的参数，currentAreaId：区域编号；currentOrganId：部门编号；belongArea：所属区域。
		String currentAreaId = NullProcessUtil.nvlToString(request.getParameter("AreaId"),"").trim();
		String currentOrganId = NullProcessUtil.nvlToString(request.getParameter("OrganId"),"").trim();
		//String belongArea = NullProcessUtil.nvlToString(request.getParameter("BelongArea"),"").trim();
		
		if(currentAreaId.intern()=="".intern() && currentOrganId.intern()=="".intern())
			currentAreaId = authvo.getAreaId();
		
		String operType  = NullProcessUtil.nvlToString(request.getParameter("OperType"),"organDisplay").trim();
		
        //从页面获取结果集总行数
        int totalRows = GridUtil.getTotalRowsFromRequest(request);
        
        EmployeeColl employeeColl = new EmployeeColl();
        String message = "";
        String queryInfo = "";
        try {		    
        	queryInfo +="&currentAreaId=" + currentAreaId;
        	queryInfo +="&currentOrganId=" + currentOrganId;
       	    
        	totalRows=service.getEmployeeRowCount(currentAreaId,currentOrganId,employeeId,areaLevel,adminType);
        	
        	int[] startEnd = GridUtil.getStartEnd(request, totalRows, DEFAULT_PAGE_SIZE, 1);
        	
        	if(totalRows>0){
        		employeeColl = service.getEmployeeInfoFilter(currentAreaId,currentOrganId,employeeId,areaLevel,adminType,startEnd[0],startEnd[1]);
        	}else{
        		employeeColl = new EmployeeColl();
        	}
		}catch (ServiceException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeQueryAction--getEmployeeInfo:"+e.getMessage());
			message = e.getMessage();		
		}    	
		boolean ulp = switchDAO.getIfUlp();
		if(ulp){
			request.setAttribute("ulp", "true");
		}else{
			request.setAttribute("ulp", "false");
		}
		request.setAttribute("ifShowTree",currentAreaId);
		request.setAttribute("OperType",operType);
		request.setAttribute("totalRows",new Integer(totalRows));
		request.setAttribute("Message",message);
		request.setAttribute("EmployeeList", employeeColl.getList());
        request.setAttribute("authId", authvo.getEmployeeId());
        request.setAttribute("adminType", String.valueOf(authvo.getAdminType()));
        request.setAttribute("queryInfo", queryInfo);
		return mapping.findForward("employeelistresult");
	}
	private ActionForward treeDisplay(ActionMapping mapping,
			HttpServletRequest request,
			HttpServletResponse response){
		String message = "";
		AuthorizeVO authvo = getAuthorize(request);
		String currentOrganId = NullProcessUtil.nvlToString(request.getParameter("OrganId"),"").trim();
		String dealerName = NullProcessUtil.nvlToString(request.getParameter("DealerName"),"").trim();
		String ifOpenWin = NullProcessUtil.nvlToString(request.getParameter("ifOpenWin"),"").trim();
        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");
        DealerDAO dealerDAO = (DealerDAO) factory.getInteractionObject("dealerDAO", appContext);
        OmSwitchDAO switchDAO = (OmSwitchDAO) factory.getInteractionObject("omSwitchDAO", appContext);
        OmQueryBO service =(OmQueryBO)getServiceFacade("omQueryBOInterface");
        String user = switchDAO.getUser();
        ITree dealerTree = new Tree();
        int dealerCount = 0;
        if(user.trim().equalsIgnoreCase("dianxin")){
        	DealerColl dealerColl = new DealerColl();
        	DealerTypeColl typeColl = new DealerTypeColl();
        	try{       	
        	 com.neusoft.crm.channel.outInterface.om.data.DealerColl channelColl = 
        		 service.doGetDealerByBelongs(Integer.parseInt(currentOrganId)); 
        	 dealerColl = DealerConverse.conversetoOmDealer(channelColl);
//        	dealerDAO.getDealerCollByOrganIdDealerName(currentOrganId,dealerName);  
        	 dealerColl = DealerConverse.filterByName(dealerColl,dealerName);
        	 com.neusoft.crm.channel.outInterface.om.data.DealerTypeColl channelTypeColl = service.doGetDealerTypeColl();//dealerDAO.getAllDealerType();
        	 typeColl = DealerConverse.concerseTypeColl(channelTypeColl);
        	 dealerTree = DealerTree.constructTree(currentOrganId,dealerColl,typeColl);
     	     dealerCount = dealerColl.getRowCount();
        	}catch (Exception e) {
        		SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeQueryAction--getEmployeeInfo:"+e.getMessage());
				message = "取得归属渠道信息出错：" + e.getMessage().replaceAll("\"","'").replaceAll("\n"," ");
			}        	 
        	 
        	 
        }else if(user.trim().equalsIgnoreCase("liantong")){
            DealerStructureColl structColl = dealerDAO.getDealerStructureColl();    		
        	ObjectCollection treeNodeColl = new ObjectCollection();
        	ObjectCollection structNodeColl = new ObjectCollection();
            ITreeNode root = new TreeNode(currentOrganId, "渠道树", currentOrganId);//根节点,组织机构
            dealerTree.expand(currentOrganId);
            dealerTree.setRoot(root);
            //得到类别节点
            
            
            for(int i=0; i < structColl.getRowCount(); i++){
            	DealerStructureVO structureVO = structColl.getDealerStructure(i);
            	ITreeNode parentNode = dealerTree.findNode(structureVO.getParentStructId());
            	ITreeNode structNode = getStructNode(structureVO);
            	if(parentNode == null){
            		root.addChild(structNode);
            	}else{
            		String structId = structureVO.getStructId();
            		DealerColl dealerColl = dealerDAO.getDealerCollByStruct(structId, currentOrganId,dealerName);
            		if(dealerColl != null){
            			for(int j = 0 ; j < dealerColl.getRowCount(); j++){
            				DealerVO vo = dealerColl.getDealer(j);        				
            				ITreeNode dealerNode = getDealerNode(vo);
            				structNode.addChild(dealerNode);
            				dealerCount ++;
            			}
            		}
            		parentNode.addChild(structNode);
            	}
            } 
        }
       
 	    
	    dealerTree.expandAll();
	    String nullTree = "true";
	    if(dealerCount != 0){
	    	nullTree = "false";
	    }else{
	    	if(ifOpenWin.equals("true")){
		    	message = "没有可用的渠道信息";
		    	request.setAttribute("message", message);
		    }
	    }
	    HttpSession session = request.getSession();
	    session.setAttribute("dealerTree", dealerTree);
	    session.setAttribute("nullTree", nullTree);
	    request.setAttribute("nullTree", nullTree);
	    request.setAttribute("ifOpenWin", ifOpenWin);
        request.setAttribute("authId", authvo.getEmployeeId());
        request.setAttribute("adminType", String.valueOf(authvo.getAdminType()));
        request.setAttribute("currentOrganId",currentOrganId);
	    return mapping.findForward("openDealerTreePage");
	}


	private ActionForward dealerEmpList(ActionMapping mapping,
			HttpServletRequest request,
			HttpServletResponse response){
		AuthorizeVO authvo = getAuthorize(request);
		EmployeeManagementBO service =(EmployeeManagementBO)getBaseService().getServiceFacade(EmployeeManagementBO.BEAN);
		String operType  = NullProcessUtil.nvlToString(request.getParameter("OperType"),"organDisplay").trim();
		EmployeeColl employeeColl = new EmployeeColl();
		String message = "";
		String dealerId = NullProcessUtil.nvlToString(request.getParameter("DealerId"),"").trim();
	    int areaLevel = authvo.getAreaLevel();
        String employeeId = authvo.getEmployeeId();
        int adminType = authvo.getAdminType();		
        int totalRows = GridUtil.getTotalRowsFromRequest(request);
        String queryInfo = "&dealerId="+dealerId;
        try {
        	totalRows = service.getDealerEmployeeRowCount(dealerId,areaLevel,adminType,employeeId);
    		int[] beginAndEnd = GridUtil.getStartEnd(request, totalRows, DEFAULT_PAGE_SIZE, 1);
            adminType=service.getEmployeeByEmployeeId(employeeId).getAdminType();
            employeeColl = service.getDealerEmployee(dealerId,areaLevel,adminType,employeeId,beginAndEnd[0],beginAndEnd[1]);
		}catch (ServiceException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,
					"EmployeeQueryAction--getEmployeeInfo: dealerEmpList"+e.getMessage());
			message = e.getMessage();		
		}
		request.setAttribute("OperType",operType);
		request.setAttribute("Message",message);
		request.setAttribute("EmployeeList", employeeColl.getList());
        request.setAttribute("authId", authvo.getEmployeeId());
        request.setAttribute("adminType", String.valueOf(authvo.getAdminType()));
        request.setAttribute("queryInfo",queryInfo);
		return mapping.findForward("employeelistresult");
	}
	private ActionForward deliverEmp(ActionMapping mapping,
			HttpServletRequest request,
			HttpServletResponse response){
		EmployeeManagementBO service =(EmployeeManagementBO)getBaseService().getServiceFacade(EmployeeManagementBO.BEAN);
		String message = "";
		//得到相应的参数
		String operType  = NullProcessUtil.nvlToString(request.getParameter("OperType"),"organDisplay").trim();
		String currentAreaId = NullProcessUtil.nvlToString(request.getParameter("AreaId"),"").trim();
		AuthorizeVO authvo = getAuthorize(request);
        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");
        EmployeeDAO employeeDAO = (EmployeeDAO) factory.getInteractionObject("employeeDAO", appContext);
		String empId = NullProcessUtil.nvlToString(request.getParameter("employeeId"),"");
	    String employeeId = authvo.getEmployeeId();
	    EmployeeColl employeeColl = new EmployeeColl();
        int adminType =0;		        
        try {
            adminType=service.getEmployeeByEmployeeId(employeeId).getAdminType();
        } catch (ServiceException e) {
            SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeQueryAction--deliverEmployeeList:"+e.getMessage());
        }			
		try{				    
		    employeeColl = employeeDAO.getDeliverEmployee(currentAreaId, empId, adminType);					
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeQueryAction--deliverEmployeeList:"+e.getMessage());
			message = e.getMessage();		
		}
		GridUtil.getStartEnd(request,employeeColl.getRowCount(),employeeColl.getRowCount());
		request.setAttribute("OperType",operType);
		request.setAttribute("Message",message);
		request.setAttribute("EmployeeList", employeeColl.getList());
		request.setAttribute("fromId",empId);
        request.setAttribute("authId", authvo.getEmployeeId());
        request.setAttribute("adminType", String.valueOf(authvo.getAdminType()));
		return mapping.findForward("deliverEmployeeList");
	}
		private ActionForward doDeliver(ActionMapping mapping,
				HttpServletRequest request,
				HttpServletResponse response){
	        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
	        AppContext appContext = new AppContextImpl();
	        appContext.setApplicationName("om");
	        EmployeeDAO employeeDAO = (EmployeeDAO) factory.getInteractionObject("employeeDAO", appContext);
			String fromId = request.getParameter("fromId");
			String toId = request.getParameter("toId");
			int code = 1;
			String message = "转交成功";
			try{				    
				code = employeeDAO.doDeliverEmployee(fromId, toId);			
			}catch (DataAccessException e) {					
				SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeQueryAction--doExport:"+e.getMessage());
				message = "转交失败："+e.getMessage();
			}
			request.setAttribute("Message", message);
			return mapping.findForward("employeeresult");
		}
		
		/**
		 * 初始化查询页面
		 * @param mapping
		 * @param request
		 * @param response
		 * @return
		 */
		private ActionForward initQueryPage(ActionMapping mapping,
			HttpServletRequest request, HttpServletResponse response) {
			OmCommon bo =(OmCommon)getBaseService().getServiceFacade(OmCommon.BEAN);
			AuthorizeVO authvo = getAuthorize(request);
			//String adminType = String.valueOf(authvo.getAdminType());
			String areaLevel = String.valueOf(authvo.getAreaLevel());
			String employeeId = authvo.getEmployeeId();
			ParamObjectCollection roleColl;
			ParamObjectCollection dutyColl;
			InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
	        AppContext appContext = new AppContextImpl();
	        appContext.setApplicationName("om");
	        OmSwitchDAO omSwitchDAO = (OmSwitchDAO)factory.getInteractionObject("omSwitchDAO", appContext);
			try {
				roleColl = bo.getRoleColl(areaLevel, employeeId);
				boolean uniAuth = omSwitchDAO.getUniauth();
		        if(uniAuth){
		        	request.setAttribute("uniAuth", "true");
		        }else{
		        	request.setAttribute("uniAuth", "false");
		        }
			} catch (ServiceException e) { 
				SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeQueryAction--initQueryPage-1:"+e.getMessage());
				roleColl = new ParamObjectCollection();
			}
			try {
				dutyColl = bo.getDutyColl();
			} catch (ServiceException e) {
				SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeQueryAction--initQueryPage-2:"+e.getMessage());
				dutyColl = new ParamObjectCollection();
			}
			request.setAttribute("dutyColl", dutyColl);
			request.setAttribute("roleColl", roleColl);
			return mapping.findForward("initquerypage");
		}
		
		
	    private   ITreeNode getStructNode(DealerStructureVO vo){
	    	String id = vo.getStructId();
	    	String name = String.valueOf(vo.getStructName());
	    	return new TreeNode(id, name, id);    	
	    }
	    private   ITreeNode getDealerNode(DealerVO vo){
	    	String id = vo.getDealerId();
	    	String name = String.valueOf(vo.getDealerName());
	    	return new TreeNode(id, name, id);    	
	    }
	    
	    private ActionForward getCityColl(ActionMapping mapping,
				HttpServletRequest request, HttpServletResponse response) {
			AuthorizeVO authVO =  getAuthorize(request);
			int areaLevel = authVO.getAreaLevel();
			String employeeId = authVO.getEmployeeId();
			ParamObjectCollection cityColl = new ParamObjectCollection(); 
	        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
	        AppContext appContext = new AppContextImpl();
	        appContext.setApplicationName("om");
	        AreaDAO areaDAO = (AreaDAO) factory.getInteractionObject("areaDAO", appContext);
			if(areaLevel <= 3){
		        cityColl = areaDAO.getAreaCollByEmp(employeeId);			        
			}else{
				ParamObject obj = new ParamObject();
				String authAreaId = authVO.getAreaId();
				String authAreaName = authVO.getAreaName();
				obj.setId(authAreaId);
				obj.setName(authAreaName);
				cityColl.addParamObject(obj);
			}
			request.setAttribute("cityColl", cityColl);
			return mapping.findForward("showCityColl");
		
	    }
	    private ActionForward getOrganColl(ActionMapping mapping,
				HttpServletRequest request, HttpServletResponse response){
	    	String message = "";
	    	OrganManagementBO organservice =(OrganManagementBO)getBaseService().getServiceFacade(OrganManagementBO.BEAN);
	    	AuthorizeVO vo = getAuthorize(request);
	        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
	        AppContext appContext = new AppContextImpl();
	        appContext.setApplicationName("om");
	        AreaDAO areaDAO = (AreaDAO) factory.getInteractionObject("areaDAO", appContext);
	        OmSwitchDAO switchDAO = (OmSwitchDAO) factory.getInteractionObject("omSwitchDAO", appContext);
	        OmOrganUtilDAO organUtilDAO = (OmOrganUtilDAO) factory.getInteractionObject("organUtilDAO", appContext);
	        String organDim = switchDAO.getOrganDim();
			OrganDisplayColl organDisplayColl = null;
			OrganColl organColl = new OrganColl();
			String changArea = (String)request.getParameter("changArea");
			try{
	//			如果组织机构不受区域限制，则组织机构树中不显示区域节点。且所显示组织机构需受到当前登录工号的管理员类型属性决定
				if(organDim != null && organDim.trim().toUpperCase().equals("ORGAN")){
					int adminType = vo.getAdminType();
					int areaLevel = vo.getAreaLevel();
					AreaVO areaVO = areaDAO.getAreaById(changArea);							
					String cityCode = areaVO.getCityCode();
					if(areaLevel >= 3){
						organColl = organservice.getOrganByAuthId(vo.getEmployeeId(), adminType);
					}else{
						organColl = organUtilDAO.getAllCityOrgan(cityCode);
					}							
				}else{
					organDisplayColl = organservice.getOrganDisplayInfo(changArea,4);						
					request.setAttribute("openFlag","areaTree");
				}		
		        boolean ulp = switchDAO.getIfUlp();
		        if(ulp){
		        	request.setAttribute("ulp","true");
		        }else{
		        	request.setAttribute("ulp","false");
		        }
				
			}catch (ServiceException e) { 
				SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDisplayAction--getOrganDisplayInfo:"+e.getMessage());
				message = e.getMessage();		
			}
			//request.setAttribute("OperType",operType);
			request.setAttribute("Message",message);
			request.setAttribute("OrganDisplayColl",organDisplayColl);
			request.setAttribute("organColl", organColl);
			request.setAttribute("adminType", String.valueOf(vo.getAdminType()));
			if(organDim != null && organDim.trim().toUpperCase().equals("ORGAN")){
				return mapping.findForward("organdisplay");
			}else{
				return mapping.findForward("organdisplayresult");
			}	
	    } 

	}				
			