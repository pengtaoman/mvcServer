/*
 * 创建日期 2006-6-30
 *
 * TODO 要更改此生成的文件的模板，请转至
 * 窗口 － 首选项 － Java － 代码样式 － 代码模板
 */
package com.neusoft.om.action.funcrole;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import jxl.Workbook;
import jxl.write.Label;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
import jxl.write.WriteException;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.om.bo.FuncRoleBO;
import com.neusoft.om.dao.app.AppColl;
import com.neusoft.om.dao.app.AppDAO;
import com.neusoft.om.dao.app.AppRoleRelColl;
import com.neusoft.om.dao.app.AppRoleRelVO;
import com.neusoft.om.dao.common.SwitchDAO;
import com.neusoft.om.dao.funcrole.FuncRoleColl;
import com.neusoft.om.dao.funcrole.FuncRoleDAO;
import com.neusoft.om.dao.funcrole.FuncRoleVO;
import com.neusoft.om.dao.menu.MenuColl;
import com.neusoft.om.dao.menu.MenuDAO;
import com.neusoft.om.dao.menu.MenuVO;
import com.neusoft.om.dao.paramrole.ParamRoleColl;
import com.neusoft.om.dao.role.RoleColl;
import com.neusoft.om.dao.role.RoleDAO;
import com.neusoft.om.dao.role.RoleVO;
import com.neusoft.om.dao.system.SystemColl;
import com.neusoft.om.dao.system.SystemDAO;
import com.neusoft.om.dao.system.SystemVO;
import com.neusoft.om.omutil.MenuTreeUtil;
import com.neusoft.tdframework.authorization.AuthorizeVO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.common.util.GridUtil;
import com.neusoft.tdframework.common.util.NullProcessUtil;
import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.DBLogger;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.tdframework.web.struts.TDDispatchAction;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;
import com.neusoft.unieap.taglib.commontree.tree.itf.ITree;
import com.neusoft.unieap.taglib.commontree.tree.itf.ITreeNode;
import com.neusoft.unieap.util.RequestUtil;

/**
 * @author Administrator
 *
 * 窗口 － 首选项 － Java － 代码样式 － 代码模板
 */
public class RoleManageAction extends TDDispatchAction {
	private static String SYSTEM_ID = "41";
	private static String ADD_BUTTON_ID = "041ACA";
	private static String MODIFY_BUTTON_ID = "041ACB";
	private static String DELETE_BUTTON_ID = "041ACC";
	 
/*
  public ActionForward service(
    		ActionMapping mapping,
    		ActionForm form,
    		HttpServletRequest request,
    		HttpServletResponse response)
    		throws ActionException{
    		//页面请求的操作
    		String operType = NullProcessUtil.nvlToString(request.getParameter("OperType"),"init").trim();
            RequestUtil rq = new RequestUtil(request);
            //String oType = rq.getParameter("OperType");
            if(operType!= null && !operType.equals("")&& operType.equals("insertMenus")){
                //return insertMenus(mapping, request,response);
            	return doGrantRole(mapping, request, response);
            }else if(operType.equals("init")){
    			return getInitInfo(mapping,form,request,response);
    		}
    	    else if(operType.equals("addRoleInfo")) {
    	   
    	        return doAddRoleInfo(mapping,form,request,response);
    	    }
    	    else if(operType.equals("modifyRoleInfo")) {
    	    	   
    	    	return doModifyRoleInfo(mapping,form,request,response);
    	    }
    	    else if(operType.equals("deleteRoleInfo")) {
 	    	   
 	    	return doDeleteRoleInfo(mapping,form,request,response);
 	       }
    	    else if(operType.equals("viewRole")) {
   	    	   
   	    	return viewRoleOM(mapping,request,response);
   	       }
    	    else if(operType.equals("grantRole")) {
  	    	   
  	    	return grantRoleOM(mapping,request,response);
  	       }
    	    else if(operType.equals("openChildPage")) {
   	    	   
      	    	return openChildPage(mapping,request,response);
      	   }
    	    else if(operType.equals("queryRole")) {
   	    	   
   	    	return queryRole(mapping,request,response);
   	       }   	    
    	    else if(operType.equals("refreshTree")){
    	    	return grantRoleOM(mapping,request,response);
    	    }
    	    else if(operType.equals("grantAppRole")){
    	    	return grantAppRole(mapping,request,response);
    	    }
    	    else if(operType.equals("doGrantAppRole")){
    	    	return doGrantAppRole(mapping, request, response);
    	    }else if(operType.equals("doExport")){
    	    	try {
					return doExport(mapping, request, response);
				} catch (Exception e) {
					e.printStackTrace();
					return null;
				}
    	    }
    	    else
    	        return null;
    	}
  */

/**初始化角色列表
 * @param mapping
 * @param request
 * @param response
 * @return
 */
	public ActionForward getInitInfo(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {
	    AuthorizeVO authvo = (AuthorizeVO) request.getSession().getAttribute(GlobalParameters.SESSION_INFO);
	    int DEFAULT_PAGE_SIZE = 50;
	    String employeeId = authvo.getEmployeeId();
	    RoleColl roleColl=null; 
	    String message="";		
	    InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
	    AppContext appContext = new AppContextImpl();
	    appContext.setApplicationName("om");
	    RoleDAO dao = (RoleDAO) factory.getInteractionObject("roleDAO",appContext);//得到DAO
	    List roleList = new ArrayList();
	    int totalRows = 0;
	    try {
	        roleColl=dao.getFuncRoleInfoByAdminEmpID(employeeId);
	    	RoleColl createRoleColl = dao.getCreateRoleColl(employeeId);
	    	for(int i = 0; i < createRoleColl.getRowCount(); i++){
	    		RoleVO vo = createRoleColl.getRole(i);
	    		if(!roleColl.isExists(vo.getRoleId())){
	    			vo.setF_if_creater(1);
	    			vo.setF_admin_flag(0);
	    			vo.setF_usable_flag(0);
	    			roleColl.addRole(vo);
	    		}
	    	}
	    	totalRows = roleColl.getRowCount();
	    	getStartEnd(request,totalRows,DEFAULT_PAGE_SIZE,1);
	    	if (totalRows > 0) {
	    		roleList = roleColl.getList();
	        }
	    } catch (DataAccessException e) {
	       
	    	SysLog.writeLogs("om",GlobalParameters.ERROR,"RoleManageAction--getInitInfo:"+e.getMessage());
			message = "初始化角色列表失败!";
			request.setAttribute("Message", message);
			return actionMapping.findForward("initRoleList");
	    }   
		//封装数据到request中用于显示
	    //List roleList = roleColl.getList();
	    GridUtil.getStartEnd(request,roleColl.getRowCount(),roleColl.getRowCount());
	    if(roleList.isEmpty())
	    {
	        message="你没有任何可供查看的角色信息！"; 
	    }
		request.setAttribute("roleList",roleList);
		request.setAttribute("totalRows",new Integer(totalRows));
	    return actionMapping.findForward("initRoleList");
		
	}

/**增加角色信息
 * @param mapping
 * @param request
 * @param response
 * @return
 */
public ActionForward doAddRoleInfo(ActionMapping mapping, ActionForm form,HttpServletRequest request, HttpServletResponse response) 
	throws ActionException{

    AuthorizeVO authvo = (AuthorizeVO) request.getSession().getAttribute(GlobalParameters.SESSION_INFO);
    String employeeId = authvo.getEmployeeId();
    String roleName=request.getParameter("roleName");
    String roleDesc = request.getParameter("roleDesc");
    if(roleName != null){
    	roleName = roleName.trim();
    }
    if(roleDesc != null){
    	roleDesc = roleDesc.trim();
    }
    String message="";
    
    RoleVO vo=new RoleVO();
    vo.setCreater(employeeId);
    vo.setRoleName(roleName);
    vo.setDesc(roleDesc);
  
    FuncRoleBO  service =(FuncRoleBO)getServiceFacade("funcRoleFacade");//得到BO
    
    int aflag=0;//标记 用于保存执行结果
    
    try {
        aflag=service.doAddFuncRoleInfo(vo);
        if(aflag==0)
        {
            message="添加角色失败"; 
        }else if(aflag == 2){
        	message = "角色名称重复，不能保存";
        }
        else
        {
            message="添加角色成功"; 
            /** 写日志 */
			 String desc = "增加角色："+vo.getRoleId()+":"+vo.getRoleName();
			 DBLogger logbo = (DBLogger)getDBLogger();
			 HashMap logMap = getLogMap(request,ADD_BUTTON_ID,desc);
			 try{
				 logbo.doAddLogInfoByProc(logMap);
			 }catch(ServiceException e){
			        SysLog.writeLogs("om",GlobalParameters.ERROR,"RoleManageAction--doAddRoleInfo:"+e.getMessage());
					message = "记录增加角色日志失败!";	
			 }
        }
    } catch (ServiceException e) {
        SysLog.writeLogs("om",GlobalParameters.ERROR,"RoleManageAction--doAddRoleInfo:"+e.getMessage());
		message = "添加角色失败!";			
    }
	
    request.setAttribute("Message", message);
    return getInitInfo(mapping,form,request,response);
}

/**修改角色信息
 * @param mapping
 * @param request
 * @param response
 * @return
 */
public ActionForward doModifyRoleInfo(ActionMapping mapping,ActionForm form, HttpServletRequest request, HttpServletResponse response) 
	throws ActionException{
    
    
    String roleId=request.getParameter("roleId");
    String roleName=request.getParameter("roleName");
    String roleDesc = request.getParameter("roleDesc");
    String priRoleName = request.getParameter("priRoleName");
    String message="";
    
    InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
    AppContext appContext = new AppContextImpl();
    appContext.setApplicationName("om");

    RoleDAO dao = (RoleDAO) factory.getInteractionObject("roleDAO",appContext);//得到DAO
    
    int mflag=0;//标记 用于保存执行结果
    
    try {
    	if(priRoleName != null && !priRoleName.trim().equals(roleName)){
    		boolean repeat = dao.repeateName(roleName);
    		if(repeat){
    			mflag = 2;
    		}else{
        		mflag=dao.doModifyInfo(Integer.parseInt(roleId), roleName, roleDesc);
        	}
    	}else{
    		mflag=dao.doModifyInfo(Integer.parseInt(roleId), roleName, roleDesc);
    	}
        
        if(mflag==0)
        {
            message="修改角色失败"; 
        }else if(mflag == 2){
        	message = "角色名称重复，不能保存";
        }else
        {
            message="修改角色成功"; 
            /** 写日志 */
			 String desc = "修改角色："+roleId+":"+roleName;
			 DBLogger logbo = (DBLogger)getDBLogger();
			 HashMap logMap = getLogMap(request,MODIFY_BUTTON_ID,desc);
			 try {
				logbo.doAddLogInfoByProc(logMap);
			} catch (ServiceException e) {
		        SysLog.writeLogs("om",GlobalParameters.ERROR,"RoleManageAction--doModifyInfo:"+e.getMessage());
				message = "增加修改角色日志失败!";	
			}	
        }
    } catch (DataAccessException e) {
        SysLog.writeLogs("om",GlobalParameters.ERROR,"RoleManageAction--doModifyInfo:"+e.getMessage());
		message = "修改角色失败!";			
    }	
    request.setAttribute("Message", message);
    request.setAttribute("roleId", roleId);    
    return getInitInfo(mapping,form,request,response);
}

/**删除角色信息
 * @param mapping
 * @param request
 * @param response
 * @return
 */
public ActionForward doDeleteRoleInfo(ActionMapping mapping, ActionForm form,HttpServletRequest request, HttpServletResponse response) 
	throws ActionException{
    String roleId=request.getParameter("roleId");
    String message="";
    InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
    AppContext appContext = new AppContextImpl();
    appContext.setApplicationName("om");
    RoleDAO dao = (RoleDAO) factory.getInteractionObject("roleDAO",appContext);//得到DAO
    SwitchDAO switchDAO = (SwitchDAO)factory.getInteractionObject("switchDAO",appContext);
    int rId = 0;
    if(roleId != null && !roleId.trim().equals("")){
    	rId = Integer.parseInt(roleId);
    }
    String roleName = switchDAO.getRoleNameByRoleId(rId);
    int dflag=0;//标记 用于保存执行结果
    try {
        dflag=dao.doDelRole(Integer.parseInt(roleId));
        if(dflag==0)
        {
            message="删除角色失败"; 
        }
        else if(dflag==1)
        {
            message="删除角色成功"; 
            /** 写日志 */

			String desc = "删除角色："+roleId+":"+roleName;
			DBLogger logbo = (DBLogger)getDBLogger();
			HashMap logMap = getLogMap(request,DELETE_BUTTON_ID,desc);
			 try {
				logbo.doAddLogInfoByProc(logMap);
			} catch (ServiceException e) {
		        SysLog.writeLogs("om",GlobalParameters.ERROR,"RoleManageAction--doDeleteRoleInfo:"+e.getMessage());
				message = "增加删除角色日志失败!";	
			}	
        }
        else
        {
            message="此角色已有使用人员不能被删除"; 
        }
    } catch (DataAccessException e) {
        SysLog.writeLogs("om",GlobalParameters.ERROR,"RoleManageAction--doDeleteRoleInfo:"+e.getMessage());
		message = "删除角色失败!";			
    }
	
    request.setAttribute("Message", message);
    return getInitInfo(mapping,form,request,response);
}
   
    /**查询角色
     * @param mapping
     * @param request
     * @param response
     * @return
     */
public ActionForward queryRole(ActionMapping mapping, ActionForm actionForm,HttpServletRequest request, HttpServletResponse response) {
        AuthorizeVO authvo = (AuthorizeVO) request.getSession().getAttribute(GlobalParameters.SESSION_INFO);
        String employeeId = authvo.getEmployeeId();
        String rolename=request.getParameter("qrolename");
        String roleId = request.getParameter("qroleid");
        String roleDesc = request.getParameter("qroledesc");
        String message="";
        RoleColl roleColl=null; 
        
        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");
    
        RoleDAO dao = (RoleDAO) factory.getInteractionObject("roleDAO",appContext);//得到DAO
      
        try {
        	roleColl=dao.seachRoleName(rolename,employeeId,roleId, roleDesc);
          	RoleColl createRoleColl = dao.getCreateRoleColl(rolename,employeeId,roleId,roleDesc);
        	for(int i = 0; i < createRoleColl.getRowCount(); i++){
        		RoleVO vo = createRoleColl.getRole(i);        		
        		if(!roleColl.isExists(vo.getRoleId())){
        			vo.setF_if_creater(1);
        			vo.setF_usable_flag(0);
        			roleColl.addRole(vo);
        		}
        	}              
        } catch (DataAccessException e) {
           
        	SysLog.writeLogs("om",GlobalParameters.ERROR,"RoleManageAction--queryRole:"+e.getMessage());
    		message = "查找角色失败!";
    		request.setAttribute("Message", message);
    		return mapping.findForward("initRoleList");
    		
        }   
        
        List roleList = roleColl.getList();
        GridUtil.getStartEnd(request,roleColl.getRowCount(),roleColl.getRowCount());
        if(roleList.isEmpty())
        {
            message="没有您要查找的角色！"; 
        }
    	request.setAttribute("roleList",roleList);
    	request.setAttribute("Message", message);
        return mapping.findForward("initRoleList");
    }
    
public ActionForward insertMenus(ActionMapping mapping, ActionForm actionForm,HttpServletRequest request, HttpServletResponse response) {
    	//清除菜单树session信息
    	HttpSession session = request.getSession();
        session.removeAttribute("menuTree");
        
    	FuncRoleBO bo =(FuncRoleBO)getServiceFacade(FuncRoleBO.BEAN);
        String message = "赋权成功";
        RequestUtil rq = new RequestUtil(request);
        String[] newMenus = request.getParameterValues(ITreeNode.checknode+"childTree");
        String roleId = rq.getParameter("roleId");
        String systemId = rq.getParameter("nodeId");
        int iRoleId = Integer.parseInt(roleId);        
        try {
			bo.modifyRolePower(newMenus,iRoleId,systemId);
		} catch (ServiceException e1) {
			message = e1.getMessage();
			SysLog.writeLogs("om",GlobalParameters.ERROR,"RoleManageAction--insertMenus:"+e1.getMessage());
		}

        request.setAttribute("message", message);
        request.setAttribute("roleId", roleId);
        request.setAttribute("operType", "grantRole");
        return  mapping.findForward("roleTreeTab");
    }
    /**查看角色权限
     * @param mapping
     * @param request
     * @param response
     * @return
     */
    public ActionForward viewRoleOM(ActionMapping mapping, ActionForm actionForm,HttpServletRequest request, HttpServletResponse response) {
    	//String message="";
    	String roleIdString=request.getParameter("roleId");

    	int roleId = 0;
    	if(roleIdString != null && !roleIdString.trim().equals("")){
    		roleId = Integer.valueOf(roleIdString).intValue();
    	}
        //String employeeId = request.getParameter("employeeId");
        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");
        SystemDAO sysDao = (SystemDAO)factory.getInteractionObject("systemDAO",appContext);
        //MenuColl menuColl = menuDao.getFirstLevelMenuColl(roleId);
        // SystemColl sysColl = sysDao.getSystemCollByRole(roleId);//包括一级和二级子系统
        SystemColl sysColl = sysDao.getFirstLevelSysCollByRole(roleId);
        MenuColl menuColl = new MenuColl();
        ITree menuTree =MenuTreeUtil.constructTree(menuColl,sysColl,false,true);

        ITreeNode root = menuTree.getRoot();
        int childCount = root.getChildCount();
        HttpSession session = request.getSession();

        session.removeAttribute("menuTree");
        session.setAttribute("menuTree", menuTree);
        request.setAttribute("roleId",roleIdString);
        request.setAttribute("operType","viewTree");
        request.setAttribute("childAccount", String.valueOf(childCount));
        request.setAttribute("needCheckBox","false");
    	return mapping.findForward("viewroleom");
    }
    
    /**角色赋权
     * @param mapping
     * @param request
     * @param response
     * @return
     */
    public ActionForward grantRoleOM(ActionMapping mapping, ActionForm actionForm,HttpServletRequest request, HttpServletResponse response) {
        AuthorizeVO authvo = (AuthorizeVO) request.getSession().getAttribute(GlobalParameters.SESSION_INFO);
        String employeeId = authvo.getEmployeeId();
        String roleId=request.getParameter("roleId");        
        if(roleId == null || roleId.equals("")){
            roleId = (String)request.getAttribute("roleId");
        }
        String message=(String)request.getAttribute("message");
    	InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
    	AppContext appContext = new AppContextImpl();
    	appContext.setApplicationName("om");
    	MenuDAO dao = (MenuDAO) factory.getInteractionObject("menuDAO",	appContext);
    	SystemDAO sysDao = (SystemDAO)factory.getInteractionObject("systemDAO",appContext);
    	SystemColl systemColl = new SystemColl();
    	MenuColl menuColl = new MenuColl();
    	systemColl = sysDao.getFirstLevelSystemCollByEmpId(employeeId);
    	SystemColl selectSystemColl = new SystemColl();
    	//adminFuncColl = dao.getAssignableFirstLevelMenuColl(employeeId);
    	if(roleId!= null && !roleId.trim().equals("") && !roleId.equals("null")){
    		menuColl = dao.getMenuCollByRoleId(Integer.parseInt(roleId));
    		selectSystemColl = sysDao.getSystemCollByRole(Integer.parseInt(roleId));
    	}
    	
    	//systemColl = sysDao.getAssignableSystemCollByEmpId(employeeId);    	
    	//String menuIds = getMenuIds(menuColl);
    	//selectSystemColl = dao.getSystemCollByMenu(menuIds);    		
    	ITree menuTree = MenuTreeUtil.constructFirstLevelTree(systemColl,selectSystemColl);    	
    	//HttpSession session = request.getSession();
    	//ITree menuTree =MenuTreeUtil.constructTree(adminFuncColl,systemColl,menuColl,false,true);
    	
    	request.setAttribute("operType","grant");
        request.setAttribute("roleId",roleId);
        request.setAttribute("employeeId",employeeId);
        request.setAttribute("message",message);
        request.setAttribute("needCheckBox","true");
        
        request.setAttribute("menuTree", menuTree);
        
    	return mapping.findForward("viewroleom");
    }
    /**角色赋权——展开子节点菜单树
     * @param mapping
     * @param request
     * @param response
     * @return
     */
    public ActionForward openChildPage(ActionMapping mapping, ActionForm actionForm,HttpServletRequest request, HttpServletResponse response) {
    	//HttpSession session = request.getSession();
        AuthorizeVO authvo = (AuthorizeVO) request.getSession().getAttribute(GlobalParameters.SESSION_INFO);
        String employeeId = authvo.getEmployeeId();
        String roleId = request.getParameter("roleIdValue");  
        String checkBoxNeed = request.getParameter("ifUseBox"); 
        String nodeId = request.getParameter("nodeId");
        String message = null;
        
        if(nodeId==null || nodeId.trim().equals("")){
        	message = "获取菜单节点时出错";
        	return mapping.findForward("openChildPage");
        }
        if(roleId == null || roleId.equals("")){
        	message = "获取角色信息时出错";
        	return mapping.findForward("openChildPage");
        }
        
    	InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
    	AppContext appContext = new AppContextImpl();
    	appContext.setApplicationName("om");
    	MenuDAO dao = (MenuDAO) factory.getInteractionObject("menuDAO",	appContext);
    	SystemDAO sysDao = (SystemDAO)factory.getInteractionObject("systemDAO",appContext);
    	MenuColl menuColl = null;
    	MenuColl adminFuncColl = null;
    	SystemColl systemColl = null;
    	ITree menuTree = null;
    	
    	if(checkBoxNeed != null){
    		//menuColl = dao.getMenuCollByRoleId(Integer.parseInt(roleId),nodeId);
    		menuColl = dao.getMenuCollByRoleAndSys(Integer.parseInt(roleId),nodeId);
    		//systemColl = sysDao.getSystemCollInfo(nodeId);
    		// systemColl = sysDao.getChildSystemCollInfo(nodeId);
    		String menuIds = getMenuIds(menuColl);
    		systemColl = dao.getSystemCollByMenu(menuIds);
        	if(systemColl==null || systemColl.getRowCount()==0){
        		systemColl = sysDao.getSystemCollByMenu(nodeId);
        	}
        	menuTree = MenuTreeUtil.constructTree(menuColl,systemColl);
        	menuTree.expandAll();
    	}else{
    		adminFuncColl = dao.getAssignableMenuCollByEmpId(employeeId,nodeId);
    		
        	if(adminFuncColl.getRowCount() > 0){
        		menuColl = dao.getMenuCollByRoleId(Integer.parseInt(roleId),nodeId);
            	
            	systemColl = sysDao.getSystemCollInfo(nodeId);
            	if(systemColl==null || systemColl.getRowCount()==0){
            		systemColl = sysDao.getSystemCollByMenu(nodeId);
            	}
            	menuTree = MenuTreeUtil.constructTreeAnyLevel(adminFuncColl,systemColl,menuColl);
            	menuTree.expandAll();
        	}else{
        		return null;
        	}
    	}
    	
    	
    	request.setAttribute("operType","grant");
    	request.setAttribute("nodeId",nodeId);
        request.setAttribute("roleId",roleId);
        request.setAttribute("message",message);
        if(checkBoxNeed != null){
        	request.setAttribute("needCheckBox","false");
        }else{
        	request.setAttribute("needCheckBox","true");
        }
        request.setAttribute("showTreeControl","child");
        
        request.setAttribute("childTree", menuTree);

    	return mapping.findForward("openChildPage");
    }
    /**
     * 功能角色赋权,提交
     * @param mapping
     * @param request
     * @param response
     * @return
     */
    public ActionForward doGrantRole(ActionMapping mapping, ActionForm actionForm,HttpServletRequest request, HttpServletResponse response) {
    	int delCode = 1;
        int addCode = 1;
        String message = "赋权成功";
    	InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
    	AppContext appContext = new AppContextImpl();
    	appContext.setApplicationName("om");
    	MenuDAO menuDao = (MenuDAO) factory.getInteractionObject("menuDAO",	appContext);
    	SystemDAO sysDao = (SystemDAO)factory.getInteractionObject("systemDAO",appContext);
    	FuncRoleDAO funcRoleDao = (FuncRoleDAO)factory.getInteractionObject("funcRoleDAO",appContext);
    	//得到页面通用树选中节点数组
    	String[] treeNodes = request.getParameterValues(ITreeNode.checknode+"childTree");
    	SystemColl allSystem = sysDao.getAllSystemInfo();
    	MenuColl allMenu =  menuDao.getAllMenuInfo();
    	
        String sRoleId = request.getParameter("roleId");
        //赋权修改的系统菜单
        String opNodeId = request.getParameter("nodeId");
        
        int roleId = 0;
        if(sRoleId != null && !sRoleId.trim().equals("") && !sRoleId.equals("null")){
        	roleId = Integer.valueOf(sRoleId).intValue();
        }
        //原菜单集合
        MenuColl oldMenuColl = menuDao.getMenuCollByRoleId(roleId,opNodeId);
        //选中的菜单和子系统集合
    	MenuColl menuColl = new MenuColl();
    	SystemColl sysColl = new SystemColl();
    	//过滤,得到选中的子系统和菜单集合,按照约定的规则,菜单编码与系统编码不会出现重复,暂时没有考虑出现重复的情况
    	if(treeNodes != null){
        	for(int i = 0; i < treeNodes.length; i++){
        		String nodeId = treeNodes[i];
        		SystemVO sysVO = getSystemById(allSystem, nodeId);
        		if(sysVO != null && sysVO.getSystemId()!= null && sysVO.getSystemId() != ""){
        			sysColl.addSystem(sysVO);
        		}
        		MenuVO menuVO = getMenuById(allMenu, nodeId);
        		if(menuVO != null && menuVO.getMenuId() != null && menuVO.getMenuId() != ""){
        			menuColl.addMenu(menuVO);
        		}
        	}
    	}
    	
    	//过滤得到新选中的菜单集合    	
    	FuncRoleColl funcRoleColl = new FuncRoleColl();    	
    	for(int i = 0; i < menuColl.getRowCount(); i ++){
    		MenuVO menuVO = menuColl.getMenu(i);
    		if(oldMenuColl.getMenu(menuVO.getMenuId())==null){//如果旧集合中不包括某菜单,则将其增加到角色菜单关系表中
    			FuncRoleVO funcRoleVo = new FuncRoleVO();
    			funcRoleVo.setAdminStatus(1);
    			funcRoleVo.setExecStatus(1);
    			funcRoleVo.setMenuId(menuVO.getMenuId());
    			funcRoleVo.setRoleId(roleId);
    			funcRoleColl.addFuncRole(funcRoleVo);
    		}
    	}
    	//得到原菜单集合中存在，后去掉的菜单
    	FuncRoleColl delFunRoleColl = new FuncRoleColl();
    	for(int i =0; i<oldMenuColl.getRowCount(); i++){
    		MenuVO oldMenuVO = oldMenuColl.getMenu(i);
    		if(menuColl.getMenu(oldMenuVO.getMenuId()) == null){//如果原集合中的某个菜单在心菜单集合中不存在，则将原来的数据删除
    			FuncRoleVO delFuncRoleVO = new FuncRoleVO();
    		    delFuncRoleVO.setMenuId(oldMenuVO.getMenuId());
    		    delFuncRoleVO.setRoleId(roleId);
    		    delFunRoleColl.addFuncRole(delFuncRoleVO);
    		}
    	}
    	//先删除
    	if(delFunRoleColl != null && delFunRoleColl.getRowCount() != 0){
    		delCode = funcRoleDao.doDeleteFuncRole(delFunRoleColl);
    	}    	
    	//再增加
    	if(funcRoleColl != null && funcRoleColl.getRowCount() != 0){
    		addCode = funcRoleDao.doAddFuncRole(funcRoleColl);
    	}    	
    	if(delCode == 0 || addCode == 0){
    		message = "赋权失败";
    	}
    	
    	request.setAttribute("operType","grantRole");
    	request.setAttribute("roleId", sRoleId);
    	request.setAttribute("message",message);
   
    	return mapping.findForward("roleTreeTab");
    }
    
    private boolean haveChild(SystemVO sysVO, MenuColl menuColl){
    	InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
    	AppContext appContext = new AppContextImpl();
    	appContext.setApplicationName("om");
    	SystemDAO sysDao = (SystemDAO)factory.getInteractionObject("systemDAO",appContext);
    	boolean have = false;
    	String sysId = sysVO.getSystemId();
    	for(int i = 0 ; i < menuColl.getRowCount(); i ++){
    		MenuVO menuVO = menuColl.getMenu(i); //菜单id
    		String menuSysId = menuVO.getSystemId(); //菜单对应的子系统Id
    		SystemVO parentSysVO = sysDao.getSystemInfoById(menuSysId);//子系统
    		String parentSysId = parentSysVO.getParentSystemId();//子系统对应的上级子系统
    		if(menuSysId != null && menuSysId.equals(sysId)){ //如果传入的子系统是菜单对应的子系统，则返回true
    			have = true;
    		}else if(parentSysId != null && parentSysId.equals(sysId)){//如果传入的子系统是菜单对应的一级子系统，返回true
    			have = true;
    		}
    	}
    	return have;
    }
    
    public ActionForward grantAppRole(ActionMapping mapping, ActionForm actionForm,HttpServletRequest request, HttpServletResponse response){
    	String message = "";
    	String roleIdString = (String)request.getParameter("roleId");
    	int roleId = -1;
    	if(roleIdString != null && !roleIdString.trim().equals("")){
    		roleId = Integer.parseInt(roleIdString);
    	}
    	InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
    	AppContext appContext = new AppContextImpl();
    	appContext.setApplicationName("om");
    	AppDAO appDao = (AppDAO)factory.getInteractionObject("appDAO",appContext);
    	AppColl appColl = appDao.getAllApp();
        List appList = appColl.getList();
        AppRoleRelColl appRoleRelColl = appDao.getAppRoleRelCollByRoleId(roleId);
        List appRoleList = appRoleRelColl.getList();
        GridUtil.getStartEnd(request,appColl.getRowCount(),appColl.getRowCount());
        if(appList.isEmpty())
        {
            message="暂不存在任何应用"; 
        }
        request.setAttribute("appList",appList);
        request.setAttribute("message",message);
        request.setAttribute("appRoleList",appRoleList);
        request.setAttribute("roleId",roleIdString);
    	return mapping.findForward("appList");
    }
    
    public ActionForward doGrantAppRole(ActionMapping mapping, ActionForm actionForm,HttpServletRequest request, HttpServletResponse response){
    	HttpSession session = request.getSession();
    	String Param_role_id = (String)session.getAttribute("Param_role_id");
    	String account = (String)session.getAttribute("Account");
    	AuthorizeVO vo = (AuthorizeVO)request.getSession().getAttribute(GlobalParameters.SESSION_INFO);
    	ParamRoleColl co = vo.getParamRoleColl();
    	InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
    	AppContext appContext = new AppContextImpl();
    	appContext.setApplicationName("om");
    	AppDAO appDao = (AppDAO)factory.getInteractionObject("appDAO",appContext);
    	List appList = null;
    	List appRoleList = null;
    	String message = "赋权成功";
        int flag = 1;
        String rRoleId = request.getParameter("roleId");
        AppRoleRelColl appRoleRelColl = new AppRoleRelColl();
        String appIds = request.getParameter("checkedIds");
        String[] appIdArry = null;
        if(appIds != null && !appIds.trim().equals(""))
    	{
        	appIdArry = appIds.split(",");    	
	        for(int i=0; i < appIdArry.length; i++){
	        	String appId = appIdArry[i];
	        	AppRoleRelVO appRoleRelVO = new AppRoleRelVO();
	        	appRoleRelVO.setAppId(Integer.parseInt(appId));
	        	appRoleRelVO.setRoleId(Integer.parseInt(rRoleId));
	        	appRoleRelColl.addAppRoleRelVO(appRoleRelVO);
	        }
    	}
        try
        {        	
            flag = appDao.doModifyAppRoleRel(appRoleRelColl,rRoleId);
            AppRoleRelColl arrColl = appDao.getAppRoleRelCollByRoleId(Integer.parseInt(rRoleId));
            AppColl appColl = appDao.getAllApp();
            appList = appColl.getList();
            appRoleList = arrColl.getList();
            GridUtil.getStartEnd(request,appColl.getRowCount(),appColl.getRowCount());
        } catch (DataAccessException e)
        {
            SysLog.writeLogs("om",GlobalParameters.ERROR,"RoleManageAction--doGrantAppRole:"+e.getMessage());
            message = "赋权失败!" + e.getMessage();
        }
        
        request.setAttribute("appList",appList);
        request.setAttribute("message",message);
        request.setAttribute("appRoleList",appRoleList);
        request.setAttribute("roleId",rRoleId);
    	return mapping.findForward("appList");
    }
    
    private SystemVO getSystemById(SystemColl sysColl, String sysId){
    	for(int i = 0; i < sysColl.getRowCount(); i++){
    		SystemVO sysVO = sysColl.getSystem(i);
    		if(sysVO.getSystemId().trim().equals(sysId)){
    			return sysVO;
    		}    		
    	}
    	return null;
    }
    
    private MenuVO getMenuById(MenuColl menuColl, String menuId){
    	for(int i=0; i < menuColl.getRowCount(); i++){
    		MenuVO vo = menuColl.getMenu(i);
    		if(vo.getMenuId().trim().equals(menuId)){
    			return vo;
    		}
    	}
    	return null;
    }
    
    /**
     * 导出角色的权限信息
     * @param actionMapping
     * @param actionForm
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
	public ActionForward doExport(ActionMapping mapping, ActionForm actionForm,HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		ITree menuTree = null;
		String roleIds = request.getParameter("roleId");
		String employeeId = request.getParameter("employeeId");
		int roleId = 0;
		
        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");
        MenuDAO menuDao = (MenuDAO) factory.getInteractionObject("menuDAO", appContext);
        SystemDAO sysDao = (SystemDAO)factory.getInteractionObject("systemDAO",appContext);
        SwitchDAO switchDAO = (SwitchDAO)factory.getInteractionObject("switchDAO", appContext);
        MenuColl menuColl = null;
        SystemColl sysColl = null;
        if(roleIds != null && !roleIds.trim().equals("") && !roleIds.equals("null")){
			roleId = Integer.parseInt(roleIds);
			menuColl = menuDao.getMenuCollByRoleId(roleId);
	        sysColl = sysDao.getSystemCollByRole(roleId);
		}else if(employeeId!=null){
			menuColl = menuDao.getUsableMenuCollByEmpId(employeeId,"true");
	        sysColl = sysDao.getSystemInfoByEmployeeId(employeeId);
		}
        
        
    	menuTree = MenuTreeUtil.constructTree(menuColl,sysColl);
    	//menuTree.expandAll();
        
		String roleName = switchDAO.getRoleNameByRoleId(roleId);
		if(employeeId!=null && !employeeId.trim().equals("")){
			roleName = switchDAO.getEmoployeeNameById(employeeId);
		}
		try {
			response.setContentType("application/vnd.ms-excel");
			response.setHeader("Content-Disposition", "attachment;filename=\""
					+ "rolefunc.xls" + "\"");
			response.setHeader("Cache-Control",
					"must-revalidate, post-check=0, pre-check=0");
			response.setHeader("Pragma", "public");
			ByteArrayOutputStream wb = new ByteArrayOutputStream();
			
			if(employeeId!=null && !employeeId.trim().equals("")){
				wb = createJxl(employeeId,roleName,menuTree,menuColl,sysColl,"employeeId");
			}else{
				wb = createJxl(roleIds,roleName,menuTree,menuColl,sysColl,"roleId");
			}
			
			wb.writeTo(response.getOutputStream());
			response.getOutputStream().flush();
			response.getOutputStream().close();

		} catch (Exception e) {
			System.out.println("Error : " + e.toString());
		}
		//return mapping.findForward("exportButton");
		return null;
	}
	private ByteArrayOutputStream createJxl(String roleId, String roleName,
			ITree menuTree, MenuColl menuColl, SystemColl sysColl,String typeControl) {

		WritableWorkbook book = null ;
		ByteArrayOutputStream fos = null;
		Workbook workbook = null;
		
		try{
			fos = new ByteArrayOutputStream();
			book = workbook.createWorkbook(fos); 	
			
			WritableSheet sheet=book.createSheet("第一页",0); 
			if(typeControl.equals("roleId")){
				sheet.addCell(new Label(0,0,"角色名称"));
				sheet.addCell(new Label(1,0,"角色编号"));
			}else{
				sheet.addCell(new Label(0,0,"职员帐号"));
				sheet.addCell(new Label(1,0,"职员编号"));
			}
			
			sheet.addCell(new Label(2,0,"一级子系统名称"));
			sheet.addCell(new Label(3,0,"二级子系统名称"));
			sheet.addCell(new Label(4,0,"菜单名称"));
			sheet.addCell(new Label(5,0,"子菜单名称"));
			sheet.addCell(new Label(6,0,"按钮和其他控件"));
			List allLeaves = new ArrayList();
			for(int i=0; i < menuColl.getRowCount(); i++){
				MenuVO menuVO = menuColl.getMenu(i);
				String menuId = menuVO.getMenuId();
				ITreeNode treeNode = menuTree.findNode(menuId);
				if(treeNode!= null && treeNode.getChildCount() == 0){ //叶子节点
					allLeaves.add(treeNode);
				}
			}
			for(int i=0; i < allLeaves.size(); i++){
				sheet.addCell(new Label(0,i+1,roleName)); 
				sheet.addCell(new Label(1,i+1,roleId)); 
				ITreeNode node = (ITreeNode)allLeaves.get(i);
				int parentLayer = node.getAncestorCount();
				int layer = parentLayer+1;					
				while(layer > 1){
					int position = layer;
					String nodeId = node.getId();
					SystemVO sysVO = sysColl.getSystemById(nodeId,sysColl);
					MenuVO menuVO = menuColl.getMenu(nodeId);
					if( sysVO != null && !sysVO.getSystemId().trim().equals("")){
						String parentId = sysVO.getParentSystemId();
						if(parentId == null || parentId.trim().equals("")){
							position = 2; //一级子系统
						}else{
							position =3; //二级子系统
						}
					}
					if(menuVO != null && !menuVO.getMenuId().trim().equals("")){
						int menuType = menuVO.getMenuType();
						if(menuType == 1 || menuType == 10 || menuType == 6 || menuType == 7){//最小子菜单 10:首页中的frame 6:frame 7: view
							position = 5;
						}else if(menuType == 2 || menuType == 5 ){//菜单 5: window 
							position = 4;
						}else{//按钮及其他组件
							position = 6;
						}
					}
					sheet.addCell(new Label(position,i+1,node.getName()));
					node = menuTree.findNode(node.getParent().getId());
					layer --;
				}
			}
			book.write();
			book.close();
		}
		catch(IOException ioe)
		{
			ioe.printStackTrace();
		}
		catch(WriteException we)
		{
			we.printStackTrace();			
		}
		catch(Exception e)
		{
			e.printStackTrace();			
		}
		
		return fos;
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
    
    private String getMenuIds(MenuColl menuColl){
    	StringBuffer  idsBuf = new StringBuffer();
    	idsBuf.append("('000'");
    	for(int i=0; i < menuColl.getRowCount(); i++){
    		String id = menuColl.getMenu(i).getMenuId();
    		idsBuf.append(",'");
    		idsBuf.append(id);
    		idsBuf.append("'");
    	}
    	idsBuf.append(")");
    	return idsBuf.toString();
    }
}
