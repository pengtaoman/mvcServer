package com.neusoft.om.action.menu;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.om.dao.common.SwitchDAO;
import com.neusoft.om.dao.dictionary.OMDictionaryDAO;
import com.neusoft.om.dao.menu.MenuColl;
import com.neusoft.om.dao.menu.MenuDAO;
import com.neusoft.om.dao.menu.MenuVO;
import com.neusoft.om.dao.system.SystemColl;
import com.neusoft.om.dao.system.SystemDAO;
import com.neusoft.om.dao.system.SystemVO;
import com.neusoft.tdframework.authorization.AuthorizeVO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.common.data.ParamObject;
import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.web.struts.TDDispatchAction;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;
import com.neusoft.unieap.config.SystemConfig;
import com.neusoft.unieap.util.RequestUtil;

/*******************************************************************************
 * 程序名 : MenuAction.java 
 * 日期 : 2008-6-16
 * 作者 : zhaof@neusoft.com 
 * 模块 : 描述 :权限维护
 * 备注 :
 * 
 * ------------------------------------------------------------
 * 修改历史 序号 日期 修改人
 * 修改原因 1 2
 ******************************************************************************/
public class MenuAction extends TDDispatchAction{
	public ActionForward query(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {
		int DEFAULT_PAGE_SIZE = 10;
		String message = (String)request.getAttribute("message");
		String menuId = request.getParameter("menuId");
		String menuName = request.getParameter("menuName");
		String menuType = request.getParameter("menuType");
		if(menuId == null || menuId.trim().equals("")){
			menuId = (String)request.getAttribute("menuId");
		}
		if(menuName == null || menuName.trim().equals("")){
			menuName = (String)request.getAttribute("menuName");
		}
		if(menuType == null || menuType.trim().equals("") ){
			menuType = (String)request.getAttribute("menuType");
		}
		int totalRows = getTotalRowsFromRequest(request);
		int menuRows = 0;
		int sysRows = 0;
		InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");
        MenuDAO menuDAO = (MenuDAO) factory.getInteractionObject("menuDAO", appContext);
        MenuColl menuColl = new MenuColl();
        SystemColl sysColl = new SystemColl();     
        if(totalRows <=0 ){
        	if(menuType != null && !menuType.trim().equals("")){
        		if( menuType.equals("-1")){//不区分
	           		menuRows = menuDAO.getTotalRows(menuId, menuName, menuType);
                	sysRows = menuDAO.getTotalRows(menuId, menuName);
                }else if(menuType.trim().equals("99")){//子系统
                	sysRows = menuDAO.getTotalRows(menuId, menuName);
                }else {//菜单
               	 menuRows = menuDAO.getTotalRows(menuId, menuName, menuType);
                }
           }
      	 	totalRows = menuRows + sysRows;
        }
        
   	 	int[] getStartEnd = getStartEnd(request, totalRows, DEFAULT_PAGE_SIZE);
        if(menuType != null && !menuType.trim().equals("")){
       	if( menuType.equals("-1")){//不区分
        	menuColl = menuDAO.getMenuColl(menuId, menuName, menuType,getStartEnd[0],getStartEnd[1]);
        	sysColl = menuDAO.getSystemColl(menuId, menuName,getStartEnd[0],getStartEnd[1]);
        }else if(menuType.trim().equals("99")){//子系统
        	sysColl = menuDAO.getSystemColl(menuId, menuName,getStartEnd[0],getStartEnd[1]);
        }else {//菜单
       	 menuColl = menuDAO.getMenuColl(menuId, menuName, menuType,getStartEnd[0],getStartEnd[1]);
        }
       	 MenuColl sysMenuColl = transSys2Menu(sysColl);
       	 menuColl = unionMenuColl(menuColl, sysMenuColl);
       }        
        request.setAttribute("totalRows", new Integer(totalRows));
        request.setAttribute("menuColl", menuColl.getList());
        request.setAttribute("message",message);
		return actionMapping.findForward("queryResult");
	}
	
	public ActionForward getDetail(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {
		String menuId = request.getParameter("menuId");
		String menuType = request.getParameter("menuType");
		String oper = request.getParameter("oper");
		InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");
        MenuDAO menuDAO = (MenuDAO) factory.getInteractionObject("menuDAO", appContext);
        SystemDAO sysDAO = (SystemDAO) factory.getInteractionObject("systemDAO", appContext);
        OMDictionaryDAO dicDAO = (OMDictionaryDAO)factory.getInteractionObject("omDictionaryDAO", appContext); 
        SwitchDAO switchDAO = (SwitchDAO)factory.getInteractionObject("switchDAO", appContext);
    	SystemVO sysVO = sysDAO.getSystemInfoById(menuId);
    	MenuVO vo = menuDAO.getMenuById(menuId);
    	ParamObjectCollection containerColl = new ParamObjectCollection();
    	ParamObjectCollection systemTypeColl = getSystemTypeColl();    	
    	containerColl = dicDAO.getContainerColl();
    	ParamObjectCollection systemColl = getSystemColl(sysDAO);
    	String systemId = vo.getSystemId();
    	ParamObjectCollection parentMenuColl = getParemtMenuColl(menuDAO,systemId);
    	String menuOperatorName = "";
    	if(vo != null && vo.getOperator()!= null){
    		menuOperatorName = switchDAO.getEmoployeeNameById(vo.getOperator());
    		vo.setOperatorName(menuOperatorName);
    	}
    	String sysOperatorName = "";
    	if(sysVO != null && sysVO.getOperator()!= null){
    		sysOperatorName = switchDAO.getEmoployeeNameById(sysVO.getOperator());
    		sysVO.setOperatorName(sysOperatorName);
    	}
        request.setAttribute("menuVO", vo);
        request.setAttribute("systemVO", sysVO);
        request.setAttribute("menuType", menuType);
        request.setAttribute("containerColl",containerColl);
        request.setAttribute("systemTypeColl",systemTypeColl);
        request.setAttribute("systemColl",systemColl);
        request.setAttribute("oper",oper);
        request.setAttribute("parentMenuColl", parentMenuColl);
        ParamObjectCollection parentSystemColl = getParentSystemColl(sysDAO);
        request.setAttribute("parentSystemColl",parentSystemColl);
		return actionMapping.findForward("detailPage");
	}
	
	public ActionForward addInit(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {
		String type = request.getParameter("type");
		InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");
        OMDictionaryDAO dicDAO = (OMDictionaryDAO)factory.getInteractionObject("omDictionaryDAO", appContext);
        SystemDAO sysDAO = (SystemDAO)factory.getInteractionObject("systemDAO", appContext);
    	ParamObjectCollection containerColl = new ParamObjectCollection();
    	containerColl = dicDAO.getContainerColl();
    	if(type!= null && type.equals("system")){
    		request.setAttribute("menuType", "99");
    	}else{
    		request.setAttribute("menuType","menu");
    	}
    	ParamObjectCollection systemTypeColl = getSystemTypeColl();
    	ParamObjectCollection parentSystemColl = getParentSystemColl(sysDAO);
    	ParamObjectCollection systemColl = getSystemColl(sysDAO);
    	ParamObjectCollection parentMenuColl = new ParamObjectCollection();
    	request.setAttribute("parentSystemColl",parentSystemColl);
    	request.setAttribute("systemColl",systemColl);
    	request.setAttribute("parentMenuColl",parentMenuColl);
        request.setAttribute("containerColl",containerColl);
        request.setAttribute("systemTypeColl",systemTypeColl);
        request.setAttribute("oper","add");
		return actionMapping.findForward("detailPage");
	}
	public ActionForward doSave(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {
		int code = 0;
		String message = "保存权限信息成功";
		String oper = request.getParameter("oper");
		String menuType = (String)request.getParameter("menuType");
		InteractionObjectFactory factory = InteractionObjectFactory.getInstance();        
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");        
        MenuDAO menuDAO = (MenuDAO) factory.getInteractionObject("menuDAO", appContext);
        SystemDAO sysDAO = (SystemDAO) factory.getInteractionObject("systemDAO", appContext);
        AuthorizeVO authVO = getAuthorize(request);
        String operator = authVO.getEmployeeId();
		if(menuType != null && menuType.trim().equals("99") ){
			String sysId = request.getParameter("systemId");
			String sysName = request.getParameter("sysName");
			String systemType = request.getParameter("systemType");
			String detailDesc = request.getParameter("detailDesc");
			String parentSystemId = request.getParameter("parentSystemId");
			String order = request.getParameter("order");
			String disabledDate = request.getParameter("disabledDate");	
			SystemVO sysVO = new SystemVO();
			sysVO.setSystemId(sysId);
			sysVO.setSystemName(sysName);
			sysVO.setSystemType(systemType);
			sysVO.setDetailDesc(detailDesc);
			sysVO.setDisabledDate(disabledDate);
			sysVO.setParentSystemId(parentSystemId);
			sysVO.setOperator(operator);
			if(order != null && !order.trim().equals("")){
				sysVO.setOrder(Integer.parseInt(order));
			}	
			try{
				if(oper.equals("add")){
					code = sysDAO.doAddSystemInfo(sysVO);
				}else if(oper.equals("modify")){
					code = sysDAO.doModifySystemInfo(sysVO);
				}
			}catch(DataAccessException e){
				message = "保存子系统信息失败！"+e.getMessage();
			}
			if(code >= 0){
				request.setAttribute("menuId", sysId);
				request.setAttribute("menuType",menuType);
			}
		}else if(menuType != null){
			String menuId = request.getParameter("menuId");
			String menuName = request.getParameter("menuName");
			String systemId = request.getParameter("systemId");
			String pageLink = request.getParameter("pageLink");
			String parentMenuId = request.getParameter("parentMenuId");
			String inuse = request.getParameter("inuse");
			String menuDesc = request.getParameter("menuDesc");	
			String disabledDate = request.getParameter("disabledDate");
			String log = request.getParameter("log");
			String container = request.getParameter("container");
			String layer = request.getParameter("layer");
			MenuVO vo = new MenuVO();
			vo.setMenuId(menuId);
			vo.setMenuName(menuName);
			vo.setSystemId(systemId);
			vo.setPageLink(pageLink);
			vo.setMenuType(Integer.parseInt(menuType));
			vo.setParentMenuId(parentMenuId);
			vo.setInuse(Integer.parseInt(inuse));
			vo.setMenuDesc(menuDesc);
			vo.setDisabledDate(disabledDate);
			vo.setLog(Integer.parseInt(log));
			vo.setOperator(operator);
			if(layer!=null && !layer.trim().equals("")){
				vo.setLayer(Integer.parseInt(layer));
			}else{
				vo.setLayer(0);
			}
			
			if(container != null && !container.trim().equals("")){
				vo.setContainer(Integer.parseInt(container));
			}
			
			try{
				if(oper.equals("add")){
					code = menuDAO.doAddMenuInfo(vo);
				}else if(oper.equals("modify")){
					code = menuDAO.doModifyMenuInfo(vo);
				}					
			}catch(DataAccessException e){
				message="保存菜单及组件信息失败"+e.getMessage();
			}
			if(code >= 0){
				request.setAttribute("menuId", menuId);
				request.setAttribute("menuType",menuType);
			}
		}
		
    	ParamObjectCollection containerColl = new ParamObjectCollection();
    	request.setAttribute("message",message);
        request.setAttribute("containerColl",containerColl);
       // request.setAttribute("oper","saveResult");
		return query(actionMapping,actionForm,request,response);	
	}
	
	public ActionForward doDelete(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {
		int code = 0;
		String message = "删除权限信息成功";
		String delMenuType = request.getParameter("delMenuType");
		InteractionObjectFactory factory = InteractionObjectFactory.getInstance();        
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");        
        MenuDAO menuDAO = (MenuDAO) factory.getInteractionObject("menuDAO", appContext);
        SystemDAO sysDAO = (SystemDAO) factory.getInteractionObject("systemDAO", appContext);
        String id = request.getParameter("delMenuId"); 
        try{
            if(delMenuType != null && delMenuType.trim().equals("99")){
    			code = sysDAO.doDeleteSystemInfo(id);
    		}else if(delMenuType != null){
    			code = menuDAO.doDeleteMenu(id);
    		}
        }catch(DataAccessException e){
        	message = "删除权限信息失败:"+e.getMessage();
        }
        //保存查询条件
        String menuId = request.getParameter("menuId");
        String menuName = request.getParameter("menuName");
        String menuType = request.getParameter("menuType");
        request.setAttribute("message", message);
        request.setAttribute("menuType", menuType);
        request.setAttribute("menuId", menuId);
        request.setAttribute("menuName", menuName);
		return query(actionMapping, actionForm, request, response);
	}
	/*
	 * 将systemColl转换为menuColl显示
	 */
	private MenuColl transSys2Menu (SystemColl sysColl){
		MenuColl menuColl = new MenuColl();
		if(sysColl != null && sysColl.getRowCount() > 0)
		{
			for(int i=0; i<sysColl.getRowCount(); i++){
				SystemVO sysVO = sysColl.getSystem(i);
				MenuVO menuVO = new MenuVO();
				menuVO.setMenuId(sysVO.getSystemId());
				menuVO.setMenuName(sysVO.getSystemName());
				menuVO.setMenuDesc(sysVO.getDetailDesc());
				menuVO.setMenuType(99);
				menuVO.setMenuTypeName("子系统");
				menuVO.setOrder(sysVO.getOrder());
				menuVO.setParentMenuId(sysVO.getParentSystemId());
				menuVO.setDisabledDate(sysVO.getDisabledDate());
				menuColl.addMenu(menuVO);
			}			
		}
		return menuColl;
	}
	/*
	 * 将两个menuColl连接到一起
	 */
	private MenuColl unionMenuColl(MenuColl preColl, MenuColl nextColl){
		MenuColl coll = new MenuColl();
		if(preColl != null && preColl.getRowCount() > 0 ){
			coll = preColl;
		}
		if( nextColl != null && nextColl.getRowCount() > 0){
			for(int i=0; i < nextColl.getRowCount(); i++){
				coll.addMenu(nextColl.getMenu(i));
			}
		}
		return coll;
	}
	private ParamObjectCollection getSystemTypeColl(){
		ParamObjectCollection coll = new ParamObjectCollection();
		ParamObject obj= new ParamObject();
		obj.setId("1");
		obj.setName("在框架中显示");
		coll.addParamObject(obj);
		ParamObject obj2= new ParamObject();
		obj2.setId("0");
		obj2.setName("cs结构");
		coll.addParamObject(obj2);
		ParamObject obj3= new ParamObject();
		obj3.setId("2");
		obj3.setName("工作流参与");
		coll.addParamObject(obj3);
		return coll;
	}
	
	private ParamObjectCollection getParentSystemColl(SystemDAO dao){
		ParamObjectCollection coll = new ParamObjectCollection();
		SystemColl sysColl = dao.getParentSystem();
		if(sysColl != null && sysColl.getRowCount() > 0){
			for(int i=0; i < sysColl.getRowCount(); i++){
				SystemVO sysVO = sysColl.getSystem(i);
				ParamObject obj = new ParamObject();
				obj.setId(sysVO.getSystemId());
				obj.setName(sysVO.getSystemName());
				coll.addParamObject(obj);
			}
		}
		return coll;
	}
	private ParamObjectCollection getSystemColl(SystemDAO dao){
		ParamObjectCollection coll = new ParamObjectCollection();
		SystemColl sysColl = dao.getAllSystemInfo();
		for(int i=0;i < sysColl.getRowCount(); i++){
			SystemVO vo = sysColl.getSystem(i);
			ParamObject obj = new ParamObject();
			obj.setId(vo.getSystemId());
			obj.setName(vo.getSystemName());
			coll.addParamObject(obj);
		}
		return coll;
	}
	private ParamObjectCollection getParentMenuColl(MenuDAO dao,String systemId){
		ParamObjectCollection coll = new ParamObjectCollection();
		MenuColl menuColl = dao.getParentMenuColl(systemId);
		if(menuColl != null && menuColl.getRowCount() > 0){
			for(int i=0; i < menuColl.getRowCount(); i++){
				MenuVO vo = menuColl.getMenu(i);
				ParamObject obj = new ParamObject();
				obj.setId(vo.getMenuId());
				obj.setName(vo.getMenuName());
				coll.addParamObject(obj);
			}			
		}
		return coll;
	}
	public ActionForward getMenuColl(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response)throws IOException{
		RequestUtil requestUtile = new RequestUtil(request);
		InteractionObjectFactory factory = InteractionObjectFactory.getInstance();        
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");        
        MenuDAO menuDAO = (MenuDAO) factory.getInteractionObject("menuDAO", appContext);
		String systemId = requestUtile.getParameter("systemId");
		String result = "<SELECT id='parentMenuId'  style='width:85%'>";
		result+="<option value=''>请选择</option>";
		ParamObjectCollection menuColl = getParentMenuColl(menuDAO,systemId);
		if(menuColl != null){
			for(int i=0; i < menuColl.getRowCount(); i++){
				String menuId = menuColl.getParamObjectByIndex(i).getId();
				String menuName = menuColl.getParamObjectByIndex(i).getName();
				result +="<option value='" +menuId+"'>"+menuName+"</option>";
			}
		}
		result+="</SELECT>";
		response.setContentType(SystemConfig.CONTENT_TYPE);
		response.getWriter().write(result);
		return null;		
	}
	
	public ParamObjectCollection getParemtMenuColl(MenuDAO menuDAO, String systemId){
		ParamObjectCollection parentMenuColl = new ParamObjectCollection();
		MenuColl menuColl = menuDAO.getParentMenuColl(systemId);
		if(menuColl != null && menuColl.getRowCount() > 0){
			for(int i=0; i < menuColl.getRowCount(); i++){
				MenuVO vo = menuColl.getMenu(i);
				ParamObject obj = new ParamObject();
				obj.setId(vo.getMenuId());
				obj.setName(vo.getMenuName());
				parentMenuColl.addParamObject(obj);
			}
		}
		return parentMenuColl;
	}
	/**
	 * 获取认证信息
	 * @param request
	 * @return
	 */
	protected AuthorizeVO getAuthorize(HttpServletRequest request) {
		return (AuthorizeVO)request.getSession().getAttribute(GlobalParameters.SESSION_INFO);
	}
}
