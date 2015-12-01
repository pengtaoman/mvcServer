/*
 * �������� 2006-6-30
 *
 * TODO Ҫ���Ĵ����ɵ��ļ���ģ�壬��ת��
 * ���� �� ��ѡ�� �� Java �� ������ʽ �� ����ģ��
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
 * ���� �� ��ѡ�� �� Java �� ������ʽ �� ����ģ��
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
    		//ҳ������Ĳ���
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

/**��ʼ����ɫ�б�
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
	    RoleDAO dao = (RoleDAO) factory.getInteractionObject("roleDAO",appContext);//�õ�DAO
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
			message = "��ʼ����ɫ�б�ʧ��!";
			request.setAttribute("Message", message);
			return actionMapping.findForward("initRoleList");
	    }   
		//��װ���ݵ�request��������ʾ
	    //List roleList = roleColl.getList();
	    GridUtil.getStartEnd(request,roleColl.getRowCount(),roleColl.getRowCount());
	    if(roleList.isEmpty())
	    {
	        message="��û���κοɹ��鿴�Ľ�ɫ��Ϣ��"; 
	    }
		request.setAttribute("roleList",roleList);
		request.setAttribute("totalRows",new Integer(totalRows));
	    return actionMapping.findForward("initRoleList");
		
	}

/**���ӽ�ɫ��Ϣ
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
  
    FuncRoleBO  service =(FuncRoleBO)getServiceFacade("funcRoleFacade");//�õ�BO
    
    int aflag=0;//��� ���ڱ���ִ�н��
    
    try {
        aflag=service.doAddFuncRoleInfo(vo);
        if(aflag==0)
        {
            message="��ӽ�ɫʧ��"; 
        }else if(aflag == 2){
        	message = "��ɫ�����ظ������ܱ���";
        }
        else
        {
            message="��ӽ�ɫ�ɹ�"; 
            /** д��־ */
			 String desc = "���ӽ�ɫ��"+vo.getRoleId()+":"+vo.getRoleName();
			 DBLogger logbo = (DBLogger)getDBLogger();
			 HashMap logMap = getLogMap(request,ADD_BUTTON_ID,desc);
			 try{
				 logbo.doAddLogInfoByProc(logMap);
			 }catch(ServiceException e){
			        SysLog.writeLogs("om",GlobalParameters.ERROR,"RoleManageAction--doAddRoleInfo:"+e.getMessage());
					message = "��¼���ӽ�ɫ��־ʧ��!";	
			 }
        }
    } catch (ServiceException e) {
        SysLog.writeLogs("om",GlobalParameters.ERROR,"RoleManageAction--doAddRoleInfo:"+e.getMessage());
		message = "��ӽ�ɫʧ��!";			
    }
	
    request.setAttribute("Message", message);
    return getInitInfo(mapping,form,request,response);
}

/**�޸Ľ�ɫ��Ϣ
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

    RoleDAO dao = (RoleDAO) factory.getInteractionObject("roleDAO",appContext);//�õ�DAO
    
    int mflag=0;//��� ���ڱ���ִ�н��
    
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
            message="�޸Ľ�ɫʧ��"; 
        }else if(mflag == 2){
        	message = "��ɫ�����ظ������ܱ���";
        }else
        {
            message="�޸Ľ�ɫ�ɹ�"; 
            /** д��־ */
			 String desc = "�޸Ľ�ɫ��"+roleId+":"+roleName;
			 DBLogger logbo = (DBLogger)getDBLogger();
			 HashMap logMap = getLogMap(request,MODIFY_BUTTON_ID,desc);
			 try {
				logbo.doAddLogInfoByProc(logMap);
			} catch (ServiceException e) {
		        SysLog.writeLogs("om",GlobalParameters.ERROR,"RoleManageAction--doModifyInfo:"+e.getMessage());
				message = "�����޸Ľ�ɫ��־ʧ��!";	
			}	
        }
    } catch (DataAccessException e) {
        SysLog.writeLogs("om",GlobalParameters.ERROR,"RoleManageAction--doModifyInfo:"+e.getMessage());
		message = "�޸Ľ�ɫʧ��!";			
    }	
    request.setAttribute("Message", message);
    request.setAttribute("roleId", roleId);    
    return getInitInfo(mapping,form,request,response);
}

/**ɾ����ɫ��Ϣ
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
    RoleDAO dao = (RoleDAO) factory.getInteractionObject("roleDAO",appContext);//�õ�DAO
    SwitchDAO switchDAO = (SwitchDAO)factory.getInteractionObject("switchDAO",appContext);
    int rId = 0;
    if(roleId != null && !roleId.trim().equals("")){
    	rId = Integer.parseInt(roleId);
    }
    String roleName = switchDAO.getRoleNameByRoleId(rId);
    int dflag=0;//��� ���ڱ���ִ�н��
    try {
        dflag=dao.doDelRole(Integer.parseInt(roleId));
        if(dflag==0)
        {
            message="ɾ����ɫʧ��"; 
        }
        else if(dflag==1)
        {
            message="ɾ����ɫ�ɹ�"; 
            /** д��־ */

			String desc = "ɾ����ɫ��"+roleId+":"+roleName;
			DBLogger logbo = (DBLogger)getDBLogger();
			HashMap logMap = getLogMap(request,DELETE_BUTTON_ID,desc);
			 try {
				logbo.doAddLogInfoByProc(logMap);
			} catch (ServiceException e) {
		        SysLog.writeLogs("om",GlobalParameters.ERROR,"RoleManageAction--doDeleteRoleInfo:"+e.getMessage());
				message = "����ɾ����ɫ��־ʧ��!";	
			}	
        }
        else
        {
            message="�˽�ɫ����ʹ����Ա���ܱ�ɾ��"; 
        }
    } catch (DataAccessException e) {
        SysLog.writeLogs("om",GlobalParameters.ERROR,"RoleManageAction--doDeleteRoleInfo:"+e.getMessage());
		message = "ɾ����ɫʧ��!";			
    }
	
    request.setAttribute("Message", message);
    return getInitInfo(mapping,form,request,response);
}
   
    /**��ѯ��ɫ
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
    
        RoleDAO dao = (RoleDAO) factory.getInteractionObject("roleDAO",appContext);//�õ�DAO
      
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
    		message = "���ҽ�ɫʧ��!";
    		request.setAttribute("Message", message);
    		return mapping.findForward("initRoleList");
    		
        }   
        
        List roleList = roleColl.getList();
        GridUtil.getStartEnd(request,roleColl.getRowCount(),roleColl.getRowCount());
        if(roleList.isEmpty())
        {
            message="û����Ҫ���ҵĽ�ɫ��"; 
        }
    	request.setAttribute("roleList",roleList);
    	request.setAttribute("Message", message);
        return mapping.findForward("initRoleList");
    }
    
public ActionForward insertMenus(ActionMapping mapping, ActionForm actionForm,HttpServletRequest request, HttpServletResponse response) {
    	//����˵���session��Ϣ
    	HttpSession session = request.getSession();
        session.removeAttribute("menuTree");
        
    	FuncRoleBO bo =(FuncRoleBO)getServiceFacade(FuncRoleBO.BEAN);
        String message = "��Ȩ�ɹ�";
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
    /**�鿴��ɫȨ��
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
        // SystemColl sysColl = sysDao.getSystemCollByRole(roleId);//����һ���Ͷ�����ϵͳ
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
    
    /**��ɫ��Ȩ
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
    /**��ɫ��Ȩ����չ���ӽڵ�˵���
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
        	message = "��ȡ�˵��ڵ�ʱ����";
        	return mapping.findForward("openChildPage");
        }
        if(roleId == null || roleId.equals("")){
        	message = "��ȡ��ɫ��Ϣʱ����";
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
     * ���ܽ�ɫ��Ȩ,�ύ
     * @param mapping
     * @param request
     * @param response
     * @return
     */
    public ActionForward doGrantRole(ActionMapping mapping, ActionForm actionForm,HttpServletRequest request, HttpServletResponse response) {
    	int delCode = 1;
        int addCode = 1;
        String message = "��Ȩ�ɹ�";
    	InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
    	AppContext appContext = new AppContextImpl();
    	appContext.setApplicationName("om");
    	MenuDAO menuDao = (MenuDAO) factory.getInteractionObject("menuDAO",	appContext);
    	SystemDAO sysDao = (SystemDAO)factory.getInteractionObject("systemDAO",appContext);
    	FuncRoleDAO funcRoleDao = (FuncRoleDAO)factory.getInteractionObject("funcRoleDAO",appContext);
    	//�õ�ҳ��ͨ����ѡ�нڵ�����
    	String[] treeNodes = request.getParameterValues(ITreeNode.checknode+"childTree");
    	SystemColl allSystem = sysDao.getAllSystemInfo();
    	MenuColl allMenu =  menuDao.getAllMenuInfo();
    	
        String sRoleId = request.getParameter("roleId");
        //��Ȩ�޸ĵ�ϵͳ�˵�
        String opNodeId = request.getParameter("nodeId");
        
        int roleId = 0;
        if(sRoleId != null && !sRoleId.trim().equals("") && !sRoleId.equals("null")){
        	roleId = Integer.valueOf(sRoleId).intValue();
        }
        //ԭ�˵�����
        MenuColl oldMenuColl = menuDao.getMenuCollByRoleId(roleId,opNodeId);
        //ѡ�еĲ˵�����ϵͳ����
    	MenuColl menuColl = new MenuColl();
    	SystemColl sysColl = new SystemColl();
    	//����,�õ�ѡ�е���ϵͳ�Ͳ˵�����,����Լ���Ĺ���,�˵�������ϵͳ���벻������ظ�,��ʱû�п��ǳ����ظ������
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
    	
    	//���˵õ���ѡ�еĲ˵�����    	
    	FuncRoleColl funcRoleColl = new FuncRoleColl();    	
    	for(int i = 0; i < menuColl.getRowCount(); i ++){
    		MenuVO menuVO = menuColl.getMenu(i);
    		if(oldMenuColl.getMenu(menuVO.getMenuId())==null){//����ɼ����в�����ĳ�˵�,�������ӵ���ɫ�˵���ϵ����
    			FuncRoleVO funcRoleVo = new FuncRoleVO();
    			funcRoleVo.setAdminStatus(1);
    			funcRoleVo.setExecStatus(1);
    			funcRoleVo.setMenuId(menuVO.getMenuId());
    			funcRoleVo.setRoleId(roleId);
    			funcRoleColl.addFuncRole(funcRoleVo);
    		}
    	}
    	//�õ�ԭ�˵������д��ڣ���ȥ���Ĳ˵�
    	FuncRoleColl delFunRoleColl = new FuncRoleColl();
    	for(int i =0; i<oldMenuColl.getRowCount(); i++){
    		MenuVO oldMenuVO = oldMenuColl.getMenu(i);
    		if(menuColl.getMenu(oldMenuVO.getMenuId()) == null){//���ԭ�����е�ĳ���˵����Ĳ˵������в����ڣ���ԭ��������ɾ��
    			FuncRoleVO delFuncRoleVO = new FuncRoleVO();
    		    delFuncRoleVO.setMenuId(oldMenuVO.getMenuId());
    		    delFuncRoleVO.setRoleId(roleId);
    		    delFunRoleColl.addFuncRole(delFuncRoleVO);
    		}
    	}
    	//��ɾ��
    	if(delFunRoleColl != null && delFunRoleColl.getRowCount() != 0){
    		delCode = funcRoleDao.doDeleteFuncRole(delFunRoleColl);
    	}    	
    	//������
    	if(funcRoleColl != null && funcRoleColl.getRowCount() != 0){
    		addCode = funcRoleDao.doAddFuncRole(funcRoleColl);
    	}    	
    	if(delCode == 0 || addCode == 0){
    		message = "��Ȩʧ��";
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
    		MenuVO menuVO = menuColl.getMenu(i); //�˵�id
    		String menuSysId = menuVO.getSystemId(); //�˵���Ӧ����ϵͳId
    		SystemVO parentSysVO = sysDao.getSystemInfoById(menuSysId);//��ϵͳ
    		String parentSysId = parentSysVO.getParentSystemId();//��ϵͳ��Ӧ���ϼ���ϵͳ
    		if(menuSysId != null && menuSysId.equals(sysId)){ //����������ϵͳ�ǲ˵���Ӧ����ϵͳ���򷵻�true
    			have = true;
    		}else if(parentSysId != null && parentSysId.equals(sysId)){//����������ϵͳ�ǲ˵���Ӧ��һ����ϵͳ������true
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
            message="�ݲ������κ�Ӧ��"; 
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
    	String message = "��Ȩ�ɹ�";
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
            message = "��Ȩʧ��!" + e.getMessage();
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
     * ������ɫ��Ȩ����Ϣ
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
			
			WritableSheet sheet=book.createSheet("��һҳ",0); 
			if(typeControl.equals("roleId")){
				sheet.addCell(new Label(0,0,"��ɫ����"));
				sheet.addCell(new Label(1,0,"��ɫ���"));
			}else{
				sheet.addCell(new Label(0,0,"ְԱ�ʺ�"));
				sheet.addCell(new Label(1,0,"ְԱ���"));
			}
			
			sheet.addCell(new Label(2,0,"һ����ϵͳ����"));
			sheet.addCell(new Label(3,0,"������ϵͳ����"));
			sheet.addCell(new Label(4,0,"�˵�����"));
			sheet.addCell(new Label(5,0,"�Ӳ˵�����"));
			sheet.addCell(new Label(6,0,"��ť�������ؼ�"));
			List allLeaves = new ArrayList();
			for(int i=0; i < menuColl.getRowCount(); i++){
				MenuVO menuVO = menuColl.getMenu(i);
				String menuId = menuVO.getMenuId();
				ITreeNode treeNode = menuTree.findNode(menuId);
				if(treeNode!= null && treeNode.getChildCount() == 0){ //Ҷ�ӽڵ�
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
							position = 2; //һ����ϵͳ
						}else{
							position =3; //������ϵͳ
						}
					}
					if(menuVO != null && !menuVO.getMenuId().trim().equals("")){
						int menuType = menuVO.getMenuType();
						if(menuType == 1 || menuType == 10 || menuType == 6 || menuType == 7){//��С�Ӳ˵� 10:��ҳ�е�frame 6:frame 7: view
							position = 5;
						}else if(menuType == 2 || menuType == 5 ){//�˵� 5: window 
							position = 4;
						}else{//��ť���������
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
     * ��¼��־������Ϣ
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
