package com.neusoft.om.action.employee;
 
import java.io.BufferedWriter;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import jxl.Workbook;
import jxl.write.Label;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
import jxl.write.WriteException;

import org.apache.commons.lang.StringUtils;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.crm.channel.outInterface.om.bo.OmQueryBO;
import com.neusoft.crm.custmgr.common.outerinterface.partymgr.bo.PartyFacadeBO;
import com.neusoft.om.bo.EmployeeManagementBO;
import com.neusoft.om.bo.OMDictionaryBOInterface;
import com.neusoft.om.bo.OrganManagementBO;
import com.neusoft.om.dao.area.AreaDAO;
import com.neusoft.om.dao.common.SwitchDAO;
import com.neusoft.om.dao.dictionary.OMDictionaryDAO;
import com.neusoft.om.dao.employee.AdjEmployeeColl;
import com.neusoft.om.dao.employee.AdjEmployeeVO;
import com.neusoft.om.dao.employee.EmployeeColl;
import com.neusoft.om.dao.employee.EmployeeDAO;
import com.neusoft.om.dao.employee.EmployeeVO;
import com.neusoft.om.dao.employeedutyrelation.EmployeeDutyRelationColl;
import com.neusoft.om.dao.employeeparamrolerelation.EmployeeParamRoleRelationColl;
import com.neusoft.om.dao.employeeparamrolerelation.EmployeeParamRoleRelationVO;
import com.neusoft.om.dao.employeeroledisplay.EmployeeRoleDisplayColl;
import com.neusoft.om.dao.employeeroledisplay.EmployeeRoleDisplayVO;
import com.neusoft.om.dao.employeeroledisplay.OwnAndAssignedRoleDispColl;
import com.neusoft.om.dao.employeerolerelation.EmployeeRoleRelationColl;
import com.neusoft.om.dao.employeerolerelation.EmployeeRoleRelationDAO;
import com.neusoft.om.dao.employeerolerelation.EmployeeRoleRelationVO;
import com.neusoft.om.dao.menu.MenuColl;
import com.neusoft.om.dao.menu.MenuDAO;
import com.neusoft.om.dao.menu.MenuVO;
import com.neusoft.om.dao.omswitch.OmSwitchDAO;
import com.neusoft.om.dao.organ.OrganDAO;
import com.neusoft.om.dao.paramrole.ParamRoleColl;
import com.neusoft.om.dao.poweradjust.PowerAdjustColl;
import com.neusoft.om.dao.poweradjust.PowerAdjustDAO;
import com.neusoft.om.dao.poweradjust.PowerAdjustVO;
import com.neusoft.om.dao.powerlog.PowerLogColl;
import com.neusoft.om.dao.powerlog.PowerLogDAO;
import com.neusoft.om.dao.powerlog.PowerLogVO;
import com.neusoft.om.dao.pwd.PwdValidDAO;
import com.neusoft.om.dao.pwd.PwdValidVO;
import com.neusoft.om.dao.role.RoleDAO;
import com.neusoft.om.dao.role.RoleVO;
import com.neusoft.om.dao.system.SystemColl;
import com.neusoft.om.dao.system.SystemDAO;
import com.neusoft.om.dao.system.SystemVO;
import com.neusoft.om.omutil.MenuTreeUtil;
import com.neusoft.om.omutil.PassWord;
import com.neusoft.tdframework.authorization.AuthorizeUtil;
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
import com.neusoft.unieap.taglib.commontree.tree.itf.ITree;
import com.neusoft.unieap.taglib.commontree.tree.itf.ITreeNode;
import com.neusoft.unieap.util.RequestUtil;

/**brief description
 * <p>Date       : 2004-12-20</p>
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
public class EmployeeMaintanceAction extends BaseAction {
	private static int DEFAULT_PAGE_SIZE=10;
	private static String SYSTEM_ID = "41";
	private static String ADD_SAVE_BUTTON_ID = "041ABB";
	private static String DELETE_BUTTON_ID = "041ABC";
	private static String RENEW_PWD_BUTTON_ID = "041ABD";
	private static String GRANT_BUTTON_ID = "041ABF";
	private static String PARAM_GRANT_BUTTON_ID = "041ABG";
	private static String POWER_ADJUST_BUTTON_ID = "041ABH";
	private static String PARAM_POWER_ADJUST_BUTTON_ID = "041ABI";
	private static String ACTION_NAME = "EmployeeMaintanceAction.do";
	public ActionForward service(
		ActionMapping mapping,
		ActionForm form,
		HttpServletRequest request,
		HttpServletResponse response)
		throws ActionException{
            RequestUtil requestUtil=new RequestUtil(request);
			String operType  = NullProcessUtil.nvlToString(requestUtil.getParameter("OperType"),"init").trim();
			//参数信息
			OMDictionaryBOInterface omdictionary = (OMDictionaryBOInterface)getBaseService().getServiceFacade("omDictionaryFacade");		
			ParamObjectCollection genderColl = omdictionary.getGenderColl();//性别
			ParamObjectCollection educateLevelColl = omdictionary.getEducateLevelColl();//教育程度
			ParamObjectCollection busDutyColl = omdictionary.getBusDutyColl();//职位
			request.setAttribute("GenderColl",genderColl);
			request.setAttribute("EducateLevelColl",educateLevelColl);
			request.setAttribute("BusDutyColl",busDutyColl);

			request.setAttribute("ActionName", ACTION_NAME);
			request.setAttribute("OperType", operType);
			//根据不同的处理调不同的方法
			if(operType.equals("init")){
                // 新增初始化                
				return addPageInit(mapping,request,response);
			}
            else if(operType.equals("search")){
                // 查找
                return doSearchEmployee(mapping,request,response);
            }
			else if(operType.equals("query")){
                // 查看详细信息
				return getEmployeeInfo(mapping,request,response);
			}
			else if(operType.equals("modifyInit")){
                //初始化修改页面
				return modifyPageInit(mapping,request,response);
			}
			else if(operType.equals("add")){	
                // 新建职员
				return doAddEmployeeInfo(mapping,request,response);
			}
			else if(operType.equals("modify")){
                //修改
				return doModifyEmployeeInfo(mapping,request,response);
			}
			else if(operType.equals("delete")){
                // 删除
				return doDeleteEmployeeInfo(mapping,request,response);
			}
            else if (operType.equals("renewpwd")){
                // 密码重置页面初始化
                return getResetPasswordInit(mapping,request,response);
            }
            else if (operType.equals("resetPassword")) {
            	// 密码重置
                return resetPassword(mapping,request,response);
            }
            else if(operType.equals("makeDutyInit")){
                // 功能角色赋权页面初始化
                return doMakeDutyInit(mapping,request,response);
            }
            else if(operType.equals("makeDuty")){
                // 功能角色赋权
                return doMakeDuty(mapping,request,response);
            }
            else if(operType.equals("makeParamDutyInit")){
                // 数据角色赋权页面初始化
                return doMakeParamDutyInit(mapping,request,response);
            }
            else if(operType.equals("makeParamDuty")){
                // 数据角色赋权
                return doMakeParamDuty(mapping,request,response);
            }
            else if("powerAdjust".equals(operType)){
            	//数据权限微调
            	return powerAdjust(mapping,request,response);
            }
            else if("cancelInch".equals(operType)){
            	//取消微调
            	return cancelInch(mapping,request,response);
            }
            else if(operType.equals("showPermission")){
                // 查看权限
                return doShowPermission(mapping,request,response);
            }
            else if (operType.equals("showParamPower")){
                // 
                return showParamPower(mapping,request,response);
            }
            else if(operType.equals("showPower")){
                // 查看权限
                return doShowPower(mapping,request,response);
            }
            else if(operType.equals("openChildPage")) {
    	    	//展开子树菜单
      	    	return openChildPage(mapping,request,response);
      	    }
            else if(operType.equals("changeOnSelect")){
                // 局部刷新，动态改变下拉列表的值
                return doChangeOnSelect(mapping,request,response);
            }
            else if(operType.equals("powerAdjustInit")){
            	return powerAdjustInit(mapping,request,response);
            }
            else if(operType.equals("doShowAuditLimitPage")){
            	return doShowAuditLimitPage(mapping, request, response);
            }
            else if(operType.equals("showAdjustPowerInit")){
            	return showAdjustPowerInit(mapping, request, response);
            }
            else if(operType.equals("doAdjustPower")){
            	return doAdjustPower(mapping,request,response);
            }else if(operType.equals("dealerEmpSearch")){
            	return getDealerEmployee(mapping, request, response);
            } else if(operType.equals("doExport")){
            	try {
					return doExport(mapping, request, response);
				} catch (Exception e) {
					e.printStackTrace();
					return null;
				}
            }else if(operType.equals("cancelInching")){
            	return cancelInching(mapping,request,response);
            }else if(operType.equals("findWorkNo")){
            	return findWorkNo(mapping, request, response);
            }else if(operType.equals("doExportEmp")){
            	return doExportEmp(mapping, form, request, response);
            }else if(operType.equals("doExportAdjPower")){
            	return doExportAdjPower(mapping, form, request, response);
            }else{
				return mapping.findForward("result");
			}
		}
	
	private ActionForward powerAdjust(ActionMapping mapping, HttpServletRequest request, HttpServletResponse response)
	{
		String employeeId = request.getParameter("employeeId");
		String message = "";
        AuthorizeVO authvo = getAuthorize(request);
        EmployeeManagementBO service =(EmployeeManagementBO)getBaseService().getServiceFacade("employeeManagementFacade");
        int areaLevel = authvo.getAreaLevel();
        if(areaLevel>2){
        	InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
            AppContext appContext = new AppContextImpl();
            appContext.setApplicationName("om");
            OmSwitchDAO switchDAO = (OmSwitchDAO) factory.getInteractionObject("omSwitchDAO", appContext);
            boolean ifGroup = switchDAO.getGroup();
            boolean ifIngroup = false;
            if(ifGroup){
            	try{
            		ifIngroup = service.ifInGroup(employeeId);
            	}catch (ServiceException e){
            		 SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeMaintanceAction--doShowPower:"+e.getMessage());
                     message = "失败!" + e.getMessage();
            	}
            	if(ifIngroup){
            		message = "four";
            		request.setAttribute("Message", message);
            		return mapping.findForward("hintpage");
            	}
            }
        }
        String path = "/../views/om/organ/dataParamRole/dataParamManage/index.jsp?employeeId="+employeeId+"&operType=powerAdjust";
        return new ActionForward(path);
	}
	
	private ActionForward cancelInch(ActionMapping mapping, HttpServletRequest request, HttpServletResponse response)
	{
		String employeeId = request.getParameter("employeeId");
		String message = "";
        AuthorizeVO authvo = getAuthorize(request);
        EmployeeManagementBO service =(EmployeeManagementBO)getBaseService().getServiceFacade("employeeManagementFacade");
        int areaLevel = authvo.getAreaLevel();
//        areaLevel = 4;
        if(areaLevel>2){
        	InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
            AppContext appContext = new AppContextImpl();
            appContext.setApplicationName("om");
            OmSwitchDAO switchDAO = (OmSwitchDAO) factory.getInteractionObject("omSwitchDAO", appContext);
            boolean ifGroup = switchDAO.getGroup();
            boolean ifIngroup = false;
            if(ifGroup){
            	try{
            		ifIngroup = service.ifInGroup(employeeId);
            	}catch (ServiceException e){
            		 SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeMaintanceAction--cancelInch:"+e.getMessage());
                     message = "失败!" + e.getMessage();
            	}
            	if(ifIngroup){
            		message = "five";
            		request.setAttribute("Message", message);
            		return mapping.findForward("hintpage");
            	}
            }
        }
        String path = "/../views/om/organ/employee/UndoPowerAdjust.jsp?employeeId="+employeeId;
        return new ActionForward(path);
	}
    /**
     * 查看权限页面跳转，选择是权限微调还是查看权限
     * @param mapping
     * @param request
     * @param response
     * @return
     */
    private ActionForward doShowPower(ActionMapping mapping, HttpServletRequest request, HttpServletResponse response)
    {
        String employeeId = request.getParameter("employeeId");
        String needCheckBox = request.getParameter("needCheckBox");
        String message = "";
        AuthorizeVO authvo = getAuthorize(request);
        EmployeeManagementBO service =(EmployeeManagementBO)getBaseService().getServiceFacade("employeeManagementFacade");
        int areaLevel = authvo.getAreaLevel();
        if(areaLevel>2){
        	InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
            AppContext appContext = new AppContextImpl();
            appContext.setApplicationName("om");
            OmSwitchDAO switchDAO = (OmSwitchDAO) factory.getInteractionObject("omSwitchDAO", appContext);
            boolean ifGroup = switchDAO.getGroup();
            boolean ifIngroup = false;
            if(ifGroup){
            	try{
            		ifIngroup = service.ifInGroup(employeeId);
            	}catch (ServiceException e){
            		 SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeMaintanceAction--doShowPower:"+e.getMessage());
                     message = "失败!" + e.getMessage();
            	}
            	if(ifIngroup){
            		message = "three";
            		request.setAttribute("Message", message);
            		return mapping.findForward("hintpage");
            	}
            }
        }
        if(needCheckBox == null || needCheckBox.trim().equals("")){
        	needCheckBox = "false";
        }
        //如果需要checkBox说明是权限微调
        if(needCheckBox.equals("true")){
        	request.setAttribute("operType","showAdjustPowerInit");
        	request.setAttribute("title","oper");
        }else{//否则说明是查看权限
        	request.setAttribute("operType","showPermission");
        	request.setAttribute("title","look");
        }
        request.setAttribute("employeeId", employeeId);
        request.setAttribute("needCheckBox",needCheckBox);
        
        return mapping.findForward("showPower");
    }
    private ActionForward showParamPower(ActionMapping mapping, HttpServletRequest request, HttpServletResponse response)
    {
        return mapping.findForward("showParamPower");
    }
    /**
     * 查看权限
     * @param mapping
     * @param request
     * @param response
     * @return
     */
    private ActionForward doShowPermission(ActionMapping mapping, HttpServletRequest request, 
    		HttpServletResponse response){   
    	String message = null;
        String employeeId = request.getParameter("employeeId");
        //String needCheckBox = request.getParameter("needCheckBox");
        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");
        MenuDAO menuDao = (MenuDAO) factory.getInteractionObject("menuDAO", appContext);
        SystemDAO sysDao = (SystemDAO)factory.getInteractionObject("systemDAO",appContext);
        MenuColl employeeMenuColl = menuDao.getFirstLevelUsableMenuColl(employeeId);
        SystemColl sysColl = sysDao.getSystemInfoByEmployeeId(employeeId);//包括一级和二级子系统
        if(employeeMenuColl.getRowCount()<=0 && sysColl.getRowCount()<=0){
        	message = "此人员暂时没有任何权限";
        }

        ITree menuTree =MenuTreeUtil.constructTree(employeeMenuColl,sysColl,false,true);
        
        request.setAttribute("menuTree", menuTree);
        request.setAttribute("needCheckBox","false");
        if(message!=null){
        	request.setAttribute("message", message);	
        }
        request.setAttribute("employeeId", employeeId);
        request.setAttribute("operType","view");
        
        return mapping.findForward("showPermission");
    }
    /**
     * 权限微调
     * @param mapping
     * @param request
     * @param response
     * @return
     */
    private ActionForward showAdjustPowerInit(ActionMapping mapping, HttpServletRequest request, HttpServletResponse response){
    	String message = null;   	
    	String employeeId = request.getParameter("employeeId");
    	
    	AuthorizeVO authVO =  getAuthorize(request);
        String adminId = authVO.getEmployeeId();
        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");
        MenuDAO menuDao = (MenuDAO) factory.getInteractionObject("menuDAO", appContext);
        SystemDAO sysDao = (SystemDAO)factory.getInteractionObject("systemDAO",appContext);
        
        MenuColl adminMenuColl = menuDao.getAssignableFirstLevelMenuColl(adminId);//当前管理员可分配的菜单集合
        MenuColl employeeMenuColl = menuDao.getUsableMenuCollByEmpId(employeeId,"true");//当前被操作职员可以看到的菜单集合
        List  menuList = menuDao.getAdjustMenuColl(employeeId);//选中的操作员已经存在的微调数据
        SystemColl sysColl = sysDao.getAdminSystemInfoByEmployeeId(adminId);//当前管理员可分配的菜单所在子系统集合，包括一级和二级子系统
        if(employeeMenuColl.getRowCount()<=0 && sysColl.getRowCount()<=0){
        	message = "您不具有为其他人赋权的权限";
        }
        if(menuList != null ){
        	for(int i=0; i < employeeMenuColl.getRowCount(); i++){
            	MenuVO vo = employeeMenuColl.getMenu(i);
            	if(menuList.contains(vo.getMenuId())){
            		vo.setMenuName(vo.getMenuName()+" *");
            	}
            }
        }
        
        ITree menuTree =MenuTreeUtil.constructTree(adminMenuColl,sysColl,employeeMenuColl,false,true);
        
        request.setAttribute("menuTree", menuTree);
        request.setAttribute("employeeId",employeeId);
        if(message!=null){
        	request.setAttribute("message", message);	
        }
        request.setAttribute("operType","grant");
        request.setAttribute("needCheckBox","true");
        
        return mapping.findForward("showPermission");
    }
    /**角色赋权——展开子节点菜单树
     * @param mapping
     * @param request
     * @param response
     * @return
     */
    private ActionForward openChildPage(ActionMapping mapping, HttpServletRequest request, HttpServletResponse response) {
    	//HttpSession session = request.getSession();
        AuthorizeVO authvo = (AuthorizeVO) request.getSession().getAttribute(GlobalParameters.SESSION_INFO);
        
        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
    	AppContext appContext = new AppContextImpl();
    	appContext.setApplicationName("om");
    	MenuDAO menuDao = (MenuDAO) factory.getInteractionObject("menuDAO",	appContext);
    	SystemDAO sysDao = (SystemDAO)factory.getInteractionObject("systemDAO",appContext);
    	MenuColl menuColl = null;
    	MenuColl adminFuncColl = null;
    	SystemColl systemColl = null;
    	ITree menuTree = null;
        boolean ifSystemId = true;
        //String employeeId = authvo.getEmployeeId();
        String employeeId = request.getParameter("employeeIdValue");  
        String checkBoxNeed = request.getParameter("ifUseBox"); 
        String opEmployeeId = authvo.getEmployeeId();
 
        String nodeId = request.getParameter("nodeId");
        String message = null;
        
        if(nodeId==null || nodeId.trim().equals("")){
        	message = "获取菜单节点时出错";
        	return mapping.findForward("openChildPage");
        }else{
        	ifSystemId = menuDao.getInfoByNodeId(nodeId);
        }
        if(employeeId == null || employeeId.equals("")){
        	message = "获取职员信息时出错";
        	return mapping.findForward("openChildPage");
        }
        
    	
    	if(checkBoxNeed.equals("false")){
    		menuColl = menuDao.getUsableMenuCollByEmpId(employeeId,nodeId,ifSystemId);
    		
    		systemColl = sysDao.getSystemCollInfo(nodeId);
        	if(systemColl==null || systemColl.getRowCount()==0){
        		systemColl = sysDao.getSystemCollByMenu(nodeId);
        		menuTree = MenuTreeUtil.constructTreeAnyLevel(menuColl,systemColl);
        		menuTree.expandAll();
        	}else{
        		menuTree = MenuTreeUtil.constructTreeAnyLevel(menuColl,systemColl);
        		menuTree.expandAll();
        	}
    	}else{
    		adminFuncColl = menuDao.getAssignableMenuCollByEmpId(opEmployeeId,nodeId);
    		List menuList = menuDao.getAdjustMenuColl(employeeId);
    		for(int i=0; i < adminFuncColl.getRowCount(); i++){
    			MenuVO vo =adminFuncColl.getMenu(i);
    			if(menuList.contains(vo.getMenuId())){
    				vo.setMenuName(vo.getMenuName()+" *");
    			}
    		}
    			
        	if(adminFuncColl.getRowCount() > 0){
        		menuColl = menuDao.getUsableMenuCollByEmpId(employeeId,nodeId,ifSystemId);
            	
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
        request.setAttribute("employeeId",employeeId);
        request.setAttribute("message",message);
        if(checkBoxNeed.equals("false")){
        	request.setAttribute("needCheckBox","false");
        }else{
        	request.setAttribute("needCheckBox","true");
        }
        request.setAttribute("showTreeControl","child");
        //session.removeAttribute("childTree");
        request.setAttribute("childTree", menuTree);

    	return mapping.findForward("openChildPage");
    }
    
    /**
     * 权限微调提交
     * @param mapping
     * @param request
     * @param response
     * @return
     */
    private ActionForward doAdjustPower(ActionMapping mapping, HttpServletRequest request, HttpServletResponse response){
    	String message = "权限微调成功";
    	
    	InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
    	AppContext appContext = new AppContextImpl();
    	appContext.setApplicationName("om");
    	MenuDAO menuDao = (MenuDAO) factory.getInteractionObject("menuDAO",	appContext);
    	SystemDAO sysDao = (SystemDAO)factory.getInteractionObject("systemDAO",appContext);
    	PowerAdjustDAO powerAdjustDao = (PowerAdjustDAO) factory.getInteractionObject("powerAdjustDAO",appContext);
    	EmployeeDAO employeeDAO = (EmployeeDAO)factory.getInteractionObject("employeeDAO", appContext);
    	PowerLogDAO powerLogDAO = (PowerLogDAO)factory.getInteractionObject("powerLogDAO", appContext);
    	OmSwitchDAO switchDAO = (OmSwitchDAO) factory.getInteractionObject("omSwitchDAO", appContext);
    	String employeeId =(String) request.getParameter("employeeId");
    	String treeName = request.getParameter("treeName");
    	//赋权修改的系统菜单
        String opNodeId = request.getParameter("nodeId");
        boolean ifSystemId = true;
        if(opNodeId==null || opNodeId.trim().equals("")){
        	message = "获取菜单节点时出错";
        	return mapping.findForward("openChildPage");
        }else{
        	ifSystemId = menuDao.getInfoByNodeId(opNodeId);
        }
        
        //得到从页面传递过来的选中菜单集合;
    	String[]  treeNodes = request.getParameterValues("checked_node_"+treeName);
    	//原菜单集合
        MenuColl oldMenuColl = menuDao.getUsableMenuCollByEmpId(employeeId,opNodeId,ifSystemId);
        //选中的菜单和子系统集合
    	MenuColl menuColl = new MenuColl();
    	SystemColl sysColl = new SystemColl();
    	
    	//过滤,得到选中的子系统和菜单集合,按照约定的规则,菜单编码与系统编码不会出现重复,暂时没有考虑出现重复的情况
    	if(treeNodes != null){
        	for(int i = 0; i < treeNodes.length; i++){
        		String nodeId = treeNodes[i];
        		SystemVO sysVO = sysDao.getSystemInfoById(nodeId);
        		if(sysVO != null && sysVO.getSystemId()!= null && sysVO.getSystemId() != ""){
        			sysColl.addSystem(sysVO);
        		}
        		MenuVO menuVO = menuDao.getMenuByMenuId(nodeId);
        		if(menuVO != null && menuVO.getMenuId() != null && menuVO.getMenuId() != ""){
        			menuColl.addMenu(menuVO);
        		}
        	}    		
    	}

    	//过滤得到新选中的菜单集合    	
    	PowerAdjustColl powerAdjColl = new PowerAdjustColl();
    	PowerAdjustColl newAddAdjColl = new PowerAdjustColl();
    	String logAddMenu = "";
    	for(int i = 0; i < menuColl.getRowCount(); i ++){
    		MenuVO menuVO = menuColl.getMenu(i);
    		if(!contain(oldMenuColl, menuVO)){//如果旧集合中不包括某菜单,则将其增加到权限微调的新增数据中
    			PowerAdjustVO powerAdjVO = new PowerAdjustVO();
    			powerAdjVO.setAdminAdjust(1);//增加权限
    			powerAdjVO.setEmployeeId(employeeId);
    			powerAdjVO.setExecAdjust(1);//增加权限
    			powerAdjVO.setMenuId(menuVO.getMenuId());
    			powerAdjVO.setSystemId(menuVO.getSystemId());
    			powerAdjColl.addPowerAdjustVO(powerAdjVO);
    			newAddAdjColl.addElement(powerAdjVO.getMenuId(), powerAdjVO);
    			logAddMenu +=menuVO.getMenuId()+"_"+menuVO.getMenuName()+";";
    		}
    	}
    	
    	//得到原菜单集合中存在，后去掉的菜单
    	PowerAdjustColl delPowerAdjColl = new PowerAdjustColl();
    	PowerAdjustColl newDelAdjColl = new PowerAdjustColl();
    	String logDelMenu = "";
    	for(int i =0; i<oldMenuColl.getRowCount(); i++){
    		MenuVO oldMenuVO = oldMenuColl.getMenu(i);
    		if(menuColl.getMenu(oldMenuVO.getMenuId()) == null){//如果原集合中的某个菜单在心菜单集合中不存在，则将原来的数据删除
    			PowerAdjustVO delPowerAdjVO = new PowerAdjustVO();
    			delPowerAdjVO.setAdminAdjust(2);//减少权限
    			delPowerAdjVO.setEmployeeId(employeeId);
    			delPowerAdjVO.setExecAdjust(2);
    			delPowerAdjVO.setMenuId(oldMenuVO.getMenuId());
    			delPowerAdjVO.setSystemId(oldMenuVO.getSystemId());
    			delPowerAdjColl.addPowerAdjustVO(delPowerAdjVO);
    			newDelAdjColl.addElement(delPowerAdjVO.getMenuId(), delPowerAdjVO);
    			logDelMenu += oldMenuVO.getMenuId()+"_"+oldMenuVO.getMenuName()+";";
    		}
    	}
    	
    	//将权限微调信息保存到权限微调表中    	
    	//首先判断微调时新增的和去掉的菜单中是否有曾经微调过的菜单,需要先将这部分数据删除,保证数据库中只保留最后一次权限微调的结果
    	PowerAdjustColl empHasAdjColl = powerAdjustDao.getPowerAdjustCollByEmpId(employeeId);
    	PowerAdjustColl overlapAdjColl = new PowerAdjustColl(); //此职员曾经微调过的菜单集合      	
    	
    	for(int i =0; i < empHasAdjColl.getRowCount(); i++){
    		PowerAdjustVO hasAdjVO = empHasAdjColl.getPowerAdjust(i);
    		for(int j = 0; j < powerAdjColl.getRowCount(); j ++){
    			PowerAdjustVO adjVO = powerAdjColl.getPowerAdjust(j);
    			if(adjVO.getMenuId().equals(hasAdjVO.getMenuId())){
    				overlapAdjColl.addPowerAdjustVO(hasAdjVO);   
    				newAddAdjColl.removeElement(hasAdjVO.getMenuId());
    			}
    		}
    		
    		for(int j =0; j < delPowerAdjColl.getRowCount(); j++){
    			PowerAdjustVO delAdjVO = delPowerAdjColl.getPowerAdjust(j);
    			if(hasAdjVO.getMenuId().equals(delAdjVO.getMenuId())){
    				overlapAdjColl.addPowerAdjustVO(hasAdjVO);
    				newDelAdjColl.removeElement(hasAdjVO.getMenuId());
    			}
    		}
    	}
    	
    	int delCode = powerAdjustDao.doDeletePowerAdjust(overlapAdjColl);
//    	int codeAdd = powerAdjustDao.doAddPowerAdjust(powerAdjColl);
//    	int codeDel = powerAdjustDao.doAddPowerAdjust(delPowerAdjColl);
    	for(int i=0;i<powerAdjColl.getRowCount(); i++){
    		PowerAdjustVO vo = powerAdjColl.getPowerAdjust(i);
    		if(newAddAdjColl.getElement(vo.getMenuId())!=null){
    			newAddAdjColl.addPowerAdjustVO(vo);
    		}    		
    	}
    	for(int i=0;i<delPowerAdjColl.getRowCount(); i++){
    		PowerAdjustVO vo = delPowerAdjColl.getPowerAdjust(i);
    		if(newDelAdjColl.getElement(vo.getMenuId())!=null){
    			newDelAdjColl.addPowerAdjustVO(vo);
    		}    
    		
    	}
    	int codeAdd = powerAdjustDao.doAddPowerAdjust(newAddAdjColl);
    	int codeDel = powerAdjustDao.doAddPowerAdjust(newDelAdjColl);
    	if(delCode == 0 || codeAdd == 0 || codeDel == 0){
    		message = "权限微调失败";
    	}
        /** 写日志 */
    	AuthorizeVO authvo = (AuthorizeVO) request.getSession().getAttribute(GlobalParameters.SESSION_INFO);
        EmployeeVO empVO = employeeDAO.getEmployeeInfoById(employeeId);
		String desc = "登录帐号为:"+authvo.getWorkNo()+"的操作员，为工号："+empVO.getEmployeeName() + "进行功能权限微调。";
		if(!logAddMenu.trim().equals("")){
			desc+= "增加权限："+logAddMenu+"，";
		}
		if(!logDelMenu.trim().equals("")){
			desc+= "减少权限："+logDelMenu;
		}	

		DBLogger logbo = (DBLogger)getDBLogger();
		HashMap logMap = getLogMap(request,POWER_ADJUST_BUTTON_ID,desc);
		try{
			logbo.doAddLogInfoByProc(logMap);
			// 记录详细微调信息日志
			int powerLog = switchDAO.getPowerLog();
			if(powerLog == 1){
				String authId = authvo.getEmployeeId();
				String areaId = authvo.getAreaId();
				PowerLogColl addLogColl = getPowerLogColl(powerAdjColl,authId,areaId,"微调-增加权限");
				powerLogDAO.doAddPowerLog(addLogColl);
				PowerLogColl delAddColl = getPowerLogColl(delPowerAdjColl,authId,areaId,"微调-减少权限");
				powerLogDAO.doAddPowerLog(delAddColl);
			}

		}catch(ServiceException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeMaintanceAction--doAddEmployeeInfo:"+e.getMessage());
		}         
    	request.setAttribute("message", message);
    	request.setAttribute("employeeId", employeeId);    	
        //request.setAttribute("ifUseBox","true");
        request.setAttribute("title","oper");
        request.setAttribute("operType","showAdjustPowerInit");
        
    	return mapping.findForward("menuTreeTab");
    }
    private PowerLogColl getPowerLogColl(PowerAdjustColl powerColl, String authId, String areaId, String note){
    	PowerLogColl coll = new PowerLogColl();
    	for(int i=0; i<powerColl.getRowCount(); i++){
    		PowerLogVO vo = new PowerLogVO();
    		vo.setAreaId(areaId);
    		vo.setEmployeeId(authId);
    		PowerAdjustVO powerVO = powerColl.getPowerAdjust(i);
    		vo.setNote(note);
    		vo.setOperType(1);
    		vo.setOperObj(powerVO.getEmployeeId());
    		vo.setPowerId(powerVO.getMenuId());
    		coll.addPowerLog(vo);
    	}
    	return coll;
    }
    /**
     * 查找职员信息
     * @param mapping
     * @param request
     * @param response
     * @return
     */
	private ActionForward doSearchEmployee(ActionMapping mapping,
            HttpServletRequest request, HttpServletResponse response)
    {
        String message = "";
        EmployeeManagementBO service =(EmployeeManagementBO)getBaseService().getServiceFacade(EmployeeManagementBO.BEAN);
        //String opt = request.getParameter("opt");
        //AuthorizeVO authvo = getAuthorize(request);
        AuthorizeVO authvo = (AuthorizeVO) request.getSession(true).getAttribute(GlobalParameters.SESSION_INFO);
        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");
        OmSwitchDAO switchDAO = (OmSwitchDAO) factory.getInteractionObject("omSwitchDAO", appContext);
        int areaLevel = authvo.getAreaLevel();
        String employeeId = authvo.getEmployeeId();
        int adminType =  authvo.getAdminType();        
        String cityCode =authvo.getCityCode(); 
        String areaId = authvo.getAreaId();
        Map filterInfo = new HashMap();
        filterInfo.put("areaLevel",String.valueOf(areaLevel));
        if(adminType==1){
        	filterInfo.put("f_adminType","f_owner is not null");
        }else if(adminType==2){
        	filterInfo.put("f_adminType","f_owner = '"+employeeId+"'");
        }else {
        	filterInfo.put("f_adminType","f_employee_id = '"+employeeId+"' ");
        }
        if(areaLevel > 2){
        	filterInfo.put("f_cityCode","f_city_code= '"+cityCode+"' ");
        	filterInfo.put("f_areaId","f_area_id like '" + areaId +"%'");
        }
        String cWorkNo = request.getParameter("workNo");
        String cEmployeeId = request.getParameter("employeeId");
        String cEmployeeName = request.getParameter("employeeName");
        String cDutyId = request.getParameter("dutyId");
        String cAdminType = request.getParameter("adminType");
        String cStatus = request.getParameter("status");
        String cRoleId = request.getParameter("roleId");
        String pwdUpdateDateBegin = request.getParameter("pwdUpdateDateBegin");
        String pwdUpdateDateEnd = request.getParameter("pwdUpdateDateEnd");
        String flagType = request.getParameter("flagType");
        String selectNodeKind = request.getParameter("selectNodeKind");
        String selectNodeId =  request.getParameter("selectNodeId");
        String queryInfo = "";
        boolean haveSerchOption = haveSearchOption(request);
        if( !haveSerchOption) {
        	if (selectNodeKind != null && !selectNodeKind.equals("") ) {
            	if(selectNodeKind.equals("area")){            		
            		filterInfo.remove("f_areaId");
            		filterInfo.put("f_areaId", "f_area_id = '" + selectNodeId.trim()+"'");
            		queryInfo = "&nodeKind=area&f_area_id="+selectNodeId;
            	}else if(selectNodeKind.equals("organ") ){
            		filterInfo.put("f_organId", "f_organ_id = '" + selectNodeId.trim()+"'");
            		queryInfo = "&nodeKind=organ&f_organ_id="+selectNodeId;
            	}            
            }
        }
        
        if (cWorkNo != null && !cWorkNo.equals("")) {
        	filterInfo.put("f_workNo", "f_work_no = '" + cWorkNo.trim().toUpperCase()+"'");
        	queryInfo += "&f_work_no="+ cWorkNo.trim().toUpperCase();
        }
        if (cEmployeeId != null && !cEmployeeId.equals("")) {
        	filterInfo.put("f_employeeId", "f_employee_id = '" + cEmployeeId.trim()+"'");
        	queryInfo += "&f_employee_id="+ cEmployeeId.trim();
        }
        if (cEmployeeName != null && !cEmployeeName.equals("")) {
        	filterInfo.put("f_employeeName", "f_employee_name = '" + cEmployeeName.trim()+"'");
        	queryInfo += "&f_employee_name="+ cEmployeeName.trim();
        }
        if (cDutyId != null && !cDutyId.equals("")) {
        	filterInfo.put("f_dutyId", "f_duty_id = " + cDutyId.trim() + " ");
        	queryInfo += "&f_duty_id="+ cDutyId.trim();
        }
        if (cAdminType != null && !cAdminType.equals("")) {
        	filterInfo.put("f_adminType", "f_admin_type = " + cAdminType.trim() + " ");
        	queryInfo += "&f_admin_type="+ cAdminType.trim();
        }
        if (cStatus != null && !cStatus.equals("")) {
        	filterInfo.put("f_status", "f_status = " + cStatus.trim() + " ");
        	queryInfo += "&f_status="+ cStatus.trim();
        }
        if ((pwdUpdateDateBegin != null && !pwdUpdateDateBegin.equals(""))
        		&& (pwdUpdateDateEnd != null && !pwdUpdateDateEnd.equals(""))) {
        	String pwdUpdateCond = "f_pwd_update BETWEEN TO_DATE ('" + 
        				pwdUpdateDateBegin + 
        				" 00:00:00', 'yyyy-MM-dd HH24:mi:ss') AND TO_DATE ('" + 
        				pwdUpdateDateEnd + 
        				"', 'yyyy-MM-dd HH24:mi:ss') ";
        	filterInfo.put("f_pwdUpdate", pwdUpdateCond);
        	queryInfo += "&pwdUpdateDateBegin="+ pwdUpdateDateBegin;
        	queryInfo += "&pwdUpdateDateEnd="+ pwdUpdateDateEnd;
        }
        if (cRoleId != null) {
        	filterInfo.put("s_role_id", cRoleId.trim());
        	queryInfo += "&s_role_id="+ cRoleId.trim();
        }
        if (flagType != null) {
        	if (flagType.equals("adminFlag")) {
        		filterInfo.put("s_flagType","f_admin_flag = 1 ");
        		queryInfo += "&f_admin_flag=1";
        	} else if (flagType.equals("usableFlag")) {
        		filterInfo.put("s_flagType","f_usable_flag = 1 ");
        		queryInfo += "&f_usable_flag=1";
        	}
        } else {
        	
        }
        EmployeeColl employeeColl = new EmployeeColl();
        try
        {
        	int totalRows = service.getEmployeeInfoRowCountFilter(filterInfo);
            int[] beginAndEnd = GridUtil.getStartEnd(request, totalRows, DEFAULT_PAGE_SIZE,1);
        	//employeeColl.addElement(service.getEmployeeInfoByWorkNoFilter(cWorkNo, employeeId, areaLevel, adminType));
            employeeColl = service.getEmployeeInfoFilter(filterInfo, beginAndEnd[0], beginAndEnd[1]);
        } catch (ServiceException e)
        {
        	SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeMaintanceAction--doSearchEmployee:"+e.getMessage());
        	message = "查询号失败!"+e.getMessage();            
        }
        request.setAttribute("Message",message);
        request.setAttribute("EmployeeList", employeeColl.getList());
        request.setAttribute("authId", employeeId);
        request.setAttribute("queryInfo", queryInfo);
        boolean ulp = switchDAO.getIfUlp();
        if(ulp){
        	request.setAttribute("ulp", "true");
        }else{
        	request.setAttribute("ulp", "false");
        }
        return mapping.findForward("employeesearchresult");
    }
    /**
	 * 初始化页面,不对职员信息进行处理,根据传入的organId,belongAreaId"信息初始化下拉框内容
	 * @param mapping
	 * @param request
	 * @param response
	 * @return
	 */
	private ActionForward addPageInit(ActionMapping mapping,
						HttpServletRequest request,
						HttpServletResponse response) {      
		String message = "";
		//从页面得到树结点的信息
		//boolean pageRight = PageCheck.ifHaveRight(request,"041AA");
		String organKind = request.getParameter("OrganKind"); //当前结点类型
		String organId = request.getParameter("OrganId"); //当前组织机构Id
		String dealerId = request.getParameter("DealerId");
		String belongArea = request.getParameter("BelongArea"); //当前组织机构的区域信息
		String comeFrom = request.getParameter("comefrom"); // 判断是否从渠道页面点击进入

		//当前操作员地市信息
		AuthorizeVO authvo = getAuthorize(request);
		OMDictionaryBOInterface omdictionary = (OMDictionaryBOInterface)getBaseService().getServiceFacade("omDictionaryFacade");
		InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");
        
		//得到当前需要的组织机构的下拉框(当前结点为参数)
        ParamObjectCollection organColl = omdictionary.getOrganCollByAreaId(belongArea);
        if (organId == null || organId.intern() == "".intern()) {
        	if (organColl != null && organColl.getRowCount() != 0) {
            	organId = organColl.getParamObjectByIndex(0).getId();       		
        	} else {
        		message = "该区域下没有组织机构，不能增加工号！";
        		request.setAttribute("Message",message);
        		return mapping.findForward("employeeAddinit");	
        	}
        }
		ParamObjectCollection incomeColl = omdictionary.getIncomeColl();
		ParamObjectCollection marriageStatusColl  = omdictionary.getMarriageStatusColl();
		ParamObjectCollection organEmployeeColl = omdictionary.getOrganEmployeeColl(organId,null);
        ParamObjectCollection dutyParamColl = omdictionary.getDutyColl(organId);
        //得到当前需要的地市下拉框信息
        ParamObjectCollection areaColl = omdictionary.getAreaCollByAreaId(belongArea);
        //获得职位列表
        ParamObjectCollection busDutyColl = omdictionary.getBusDutyColl();
        //获得用户级别列表
        ParamObjectCollection personLevelColl = omdictionary.getPersonLevelColl();        
        
        SwitchDAO switchDao = (SwitchDAO) factory.getInteractionObject("switchDAO", appContext);
        PwdValidDAO pwdDAO = (PwdValidDAO) factory.getInteractionObject("pwdValidDAO", appContext);
        OmSwitchDAO omSwitchDAO = (OmSwitchDAO)factory.getInteractionObject("omSwitchDAO", appContext);
        EmployeeDAO employeeDAO = (EmployeeDAO)factory.getInteractionObject("employeeDAO", appContext);
        AreaDAO areaDAO = (AreaDAO)factory.getInteractionObject("areaDAO", appContext);
        OMDictionaryDAO dictionaryDAO = (OMDictionaryDAO)factory.getInteractionObject("omDictionaryDAO", appContext);
        OmQueryBO dealerService =(OmQueryBO)getServiceFacade("omQueryBOInterface");
//      获得操作级别列表
        int adminOperLevel = authvo.getOperLevel();
        ParamObjectCollection operLevelColl = dictionaryDAO.getOperLevelColl(adminOperLevel);
        
        String dealerName = "";
        try{
        	if(dealerId != null && !dealerId.equals("")){
        		com.neusoft.crm.channel.outInterface.om.data.DealerVO channelVO = dealerService.doGetDealerByDealer(dealerId);
            	dealerName = channelVO.getDealer_name();
        	}
        	
        }catch(ServiceException e){
        	SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeMaintanceAction--addPageInit:"+e.getMessage());
        }
        //得到密码配置参数
        PwdValidVO pwdVO = pwdDAO.getAllPwdValidInfo();
        int pwdMinLength = pwdVO.getPwdMinLength();
        int pwdMaxLength = pwdVO.getPwdMaxLength();
        Vector empReq = employeeDAO.getEmpReqVector();
        boolean ifAutoWorkNo = omSwitchDAO.getIfAutoWorkNo();//得到是否自动生成工号配置
        boolean needCitySortName = omSwitchDAO.getIfNeedCityShortName();
        boolean needEmpName = omSwitchDAO.getIfNeedEmpName();
        String cityCode = areaDAO.getAreaById(belongArea).getCityCode();
        String autoWorkNo = "";
        if(ifAutoWorkNo){ //如果需要自动生成工号，则得到工号并放到request中
        	if(needCitySortName) {
        		autoWorkNo = employeeDAO.getCityShortName(cityCode);
        	}else{
        		autoWorkNo = employeeDAO.getAutoWorkNo();
        	}
        }        
        request.setAttribute("autoWorkNo",autoWorkNo);
        request.setAttribute("ifAutoWorkNo", ifAutoWorkNo);
        request.setAttribute("needCitySortName", needCitySortName);        
        request.setAttribute("needEmpName", needEmpName);        
        request.setAttribute("IncomeColl",incomeColl);
		request.setAttribute("MarriageStatusColl",marriageStatusColl);
		request.setAttribute("OrganEmployeeColl",organEmployeeColl);
		request.setAttribute("PersonLevelColl", personLevelColl);
		request.setAttribute("OperLevelColl", operLevelColl);
        request.setAttribute("BusDutyColl", busDutyColl);
		request.setAttribute("AreaColl", areaColl);
		request.setAttribute("OrganColl",organColl);
		request.setAttribute("DutyParamColl", dutyParamColl);
		
		request.setAttribute("Message",message);
		request.setAttribute("OrganId",organId);
		request.setAttribute("BelongArea",belongArea);
        request.setAttribute("optId", authvo.getEmployeeId());
        request.setAttribute("ownerName", authvo.getWorkNo());
        request.setAttribute("dealerId",dealerId);
        request.setAttribute("dealerName", dealerName);
        request.setAttribute("comeFrom", comeFrom);
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        request.setAttribute("nowDate", format.format(new Date()));
        
        request.setAttribute("pwdMinLength", String.valueOf(pwdMinLength));
        request.setAttribute("pwdMaxLength", String.valueOf(pwdMaxLength));
        boolean uniAuth = omSwitchDAO.getUniauth();
        if(uniAuth){
        	request.setAttribute("uniAuth", "true");
        }else{
        	request.setAttribute("uniAuth", "false");
        }
        request.setAttribute("empReq", empReq);
		return mapping.findForward("employeeAddinit");	
	
	}
	/**
	 * 根据职员Id将职员信息显示在页面
	 * @param mapping
	 * @param request
	 * @param response
	 * @return
	 */	
	private ActionForward getEmployeeInfo(ActionMapping mapping,
			HttpServletRequest request,HttpServletResponse response) {
		String employeeId = NullProcessUtil.nvlToString(request.getParameter("employeeId"),"");
		AuthorizeVO authvo = (AuthorizeVO) request.getSession().getAttribute(GlobalParameters.SESSION_INFO);
		String operId = authvo.getEmployeeId();    
		String message = "";
		EmployeeVO employeeVO = null;     //职员信息
		//职务信息 得到职员的职务信息列表
		EmployeeDutyRelationColl employeeDutyRelationColl = null;
		//职员具有的角色列表 得到职员被分配的角色信息列表：（职员角色关系列表）
		OwnAndAssignedRoleDispColl ownAndAssignedRoleDispColl = null;
		
		EmployeeManagementBO service =(EmployeeManagementBO)getBaseService().getServiceFacade(EmployeeManagementBO.BEAN); 
		
		try {
			employeeVO = service.getEmployeeByEmployeeId(employeeId);
			
			OMDictionaryBOInterface omdictionary = (OMDictionaryBOInterface)getBaseService().getServiceFacade("omDictionaryFacade");
			//收入
			ParamObjectCollection incomeColl = omdictionary.getIncomeColl();
			//婚姻状况
			ParamObjectCollection marriageStatusColl  = omdictionary.getMarriageStatusColl();
			//上级信息
			ParamObjectCollection organEmployeeColl = omdictionary.getOrganEmployeeColl(employeeVO.getOrganId(),employeeVO.getEmployeeId());
			//职务
		    ParamObjectCollection dutyParamColl = omdictionary.getDutyColl(employeeVO.getOrganId());
		    //获得职位列表
		    ParamObjectCollection busDutyColl = omdictionary.getBusDutyColl();
		    //获得用户级别列表
		    ParamObjectCollection personLevelColl = omdictionary.getPersonLevelColl();
		    
			//职务信息 得到职员的职务信息列表
			employeeDutyRelationColl = service.getEmployeeDutyRelationInfoByEmployeeId(employeeId);
		    //职员具有的角色列表 得到职员被分配的角色信息列表：（职员角色关系列表）
			ownAndAssignedRoleDispColl = service.getEmpOwnerAndAssingedRoleColl(employeeId);
		
		    request.setAttribute("EmployeeVO", employeeVO);
		    request.setAttribute("IncomeColl",incomeColl);
			request.setAttribute("MarriageStatusColl",marriageStatusColl);
			request.setAttribute("OrganEmployeeColl",organEmployeeColl);
		    request.setAttribute("DutyParamColl", dutyParamColl);
		    request.setAttribute("BusDutyColl", busDutyColl);
			request.setAttribute("PersonLevelColl", personLevelColl);
	
			
			if(employeeDutyRelationColl.getRowCount() > 0){
				request.setAttribute("EmployeeDutyRelationList",employeeDutyRelationColl.getList());
				request.setAttribute("employeeDutyRelationSize",String.valueOf(employeeDutyRelationColl.getRowCount()));
			}else{
				request.setAttribute("employeeDutyRelationSize","0");
			}
			if(ownAndAssignedRoleDispColl.getRowCount() > 0){
				request.setAttribute("EmployeeRoleList",ownAndAssignedRoleDispColl.getList());
				request.setAttribute("employeeRoleSize",String.valueOf(ownAndAssignedRoleDispColl.getRowCount()));
			}else{
				request.setAttribute("employeeRoleSize","0");
			}
		} catch (ServiceException e) {
			message = e.getMessage();	
			employeeVO = new EmployeeVO();
			SysLog.writeLogs("om",GlobalParameters.ERROR,
				"EmployeeMaintanceAction--getEmployeeByEmployeeId():"+e.getMessage());
		}
		
		InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
		AppContext appContext = new AppContextImpl();
		appContext.setApplicationName("om");
		SwitchDAO switchDao = (SwitchDAO) factory.getInteractionObject("switchDAO", appContext);
		OmQueryBO dealerService =(OmQueryBO)getServiceFacade("omQueryBOInterface");
		String owner = employeeVO.getOwner();
		String ownerName = switchDao.getEmoployeeNameById(owner);
		String dealerId = employeeVO.getDealerId();
        String dealerName = "";
        try{
        	if(dealerId != null && !dealerId.equals("")){
        		com.neusoft.crm.channel.outInterface.om.data.DealerVO channelVO = dealerService.doGetDealerByDealer(dealerId);
            	dealerName = channelVO.getDealer_name();
        	}        	
        }catch(ServiceException e){
        	SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeMaintanceAction--addPageInit:"+e.getMessage());
        }
		
		//其他信息	
		request.setAttribute("Message",message);
		request.setAttribute("ownerName",ownerName);
		request.setAttribute("dealerName",dealerName);
		request.setAttribute("operId",operId);
		
		return mapping.findForward("employeeMaintance");
	}
	/**
	 * 根据职员Id，初始化职员修改页面
	 * @param mapping
	 * @param request
	 * @param response
	 * @return
	 */	
	private ActionForward modifyPageInit(ActionMapping mapping,
					HttpServletRequest request,HttpServletResponse response) {
		String employeeId = NullProcessUtil.nvlToString(request.getParameter("employeeId"),"");
		AuthorizeVO authvo = (AuthorizeVO) request.getSession().getAttribute(GlobalParameters.SESSION_INFO);
		String operId = authvo.getEmployeeId();    
		String message = "";
		EmployeeVO employeeVO = null;     //职员信息    
		
		EmployeeManagementBO service =(EmployeeManagementBO)getBaseService().getServiceFacade(EmployeeManagementBO.BEAN); 		
		InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");
        SwitchDAO switchDao = (SwitchDAO) factory.getInteractionObject("switchDAO", appContext);
        OMDictionaryDAO dictionaryDAO = (OMDictionaryDAO)factory.getInteractionObject("omDictionaryDAO",appContext);
        OmSwitchDAO omSwitchDAO = (OmSwitchDAO)factory.getInteractionObject("omSwitchDAO", appContext);
		OmQueryBO dealerService =(OmQueryBO)getServiceFacade("omQueryBOInterface");
		
        String dealerName = "";
		try {
			employeeVO = service.getEmployeeByEmployeeId(employeeId);
			
			OMDictionaryBOInterface omdictionary = (OMDictionaryBOInterface)getBaseService().getServiceFacade("omDictionaryFacade");
			//收入
			ParamObjectCollection incomeColl = omdictionary.getIncomeColl();
			//婚姻状况
			ParamObjectCollection marriageStatusColl  = omdictionary.getMarriageStatusColl();
			//上级信息
			ParamObjectCollection organEmployeeColl = omdictionary.getOrganEmployeeColl(employeeVO.getOrganId(),employeeVO.getEmployeeId());
			//职务
	        ParamObjectCollection dutyParamColl = omdictionary.getDutyColl(employeeVO.getOrganId());
	        //获得职位列表
	        ParamObjectCollection busDutyColl = omdictionary.getBusDutyColl();
	        //获得用户级别列表
	        ParamObjectCollection personLevelColl = omdictionary.getPersonLevelColl();
//		      获得用户级别列表
			int adminOperLevel = authvo.getOperLevel();
	        ParamObjectCollection operLevelColl = dictionaryDAO.getOperLevelColl(adminOperLevel);      
	       
	        request.setAttribute("EmployeeVO", employeeVO);
	        request.setAttribute("IncomeColl",incomeColl);
			request.setAttribute("MarriageStatusColl",marriageStatusColl);
			request.setAttribute("OrganEmployeeColl",organEmployeeColl);
	        request.setAttribute("DutyParamColl", dutyParamColl);
	        request.setAttribute("BusDutyColl", busDutyColl);
			request.setAttribute("PersonLevelColl", personLevelColl);
			request.setAttribute("OperLevelColl", operLevelColl);
			
			String dealerId = employeeVO.getDealerId();
			if(dealerId != null && !dealerId.equals("")){
				com.neusoft.crm.channel.outInterface.om.data.DealerVO channelVO = dealerService.doGetDealerByDealer(dealerId);
		        dealerName = channelVO.getDealer_name();
			}
						
		} catch (ServiceException e) {
			message = e.getMessage();	
			employeeVO = new EmployeeVO();
			SysLog.writeLogs("om",GlobalParameters.ERROR,
				"EmployeeMaintanceAction--getEmployeeByEmployeeId():"+e.getMessage());
		}
		String owner = employeeVO.getOwner();
		String ownerName = switchDao.getEmoployeeNameById(owner);
		
		//其他信息	
		request.setAttribute("Message",message);
		request.setAttribute("ownerName",ownerName);
		request.setAttribute("dealerName",dealerName);
		request.setAttribute("operId",operId);
		
		int canDel = 0;
		if(needProductCheck())
		{
	        EmployeeDAO empDAO = (EmployeeDAO) factory.getInteractionObject("employeeDAO", appContext);
            canDel = empDAO.checkOrgan(employeeId,2);// 1：部门，2:职员 返回0:可以删除 1：不可以删除
		}
		request.setAttribute("canDel", String.valueOf(canDel));
        boolean ulp = omSwitchDAO.getIfUlp();
        if(ulp){
        	request.setAttribute("ulp","true");
        }else{
        	request.setAttribute("ulp","false");
        }
		return mapping.findForward("employeeModify");
	}
	/**
	 * 增加一个职员
	 * @param mapping
	 * @param request
	 * @param response
	 * @return
	 */
	private ActionForward doAddEmployeeInfo(ActionMapping mapping,
							HttpServletRequest request,
							HttpServletResponse response) {
		AuthorizeVO authvo = (AuthorizeVO) request.getSession().getAttribute(GlobalParameters.SESSION_INFO);
		String message = "增加成功!";
		String operFlag = "1"; //成功标识
		EmployeeManagementBO service =(EmployeeManagementBO)getBaseService().getServiceFacade("employeeManagementFacade");
		String comeFrom = (String)request.getParameter("comeFrom");
		
        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");
        PartyFacadeBO partyService = (PartyFacadeBO) factory.getInteractionObject("partyFacadeBO", appContext);
        OmSwitchDAO omSwitchDao = (OmSwitchDAO) factory.getInteractionObject("omSwitchDAO", appContext);
        EmployeeDAO employeeDAO = (EmployeeDAO) factory.getInteractionObject("employeeDAO", appContext);
        OmQueryBO dealerService =(OmQueryBO)getServiceFacade("omQueryBOInterface");
        OmSwitchDAO omSwitchDAO = (OmSwitchDAO)factory.getInteractionObject("omSwitchDAO", appContext);
        boolean uniauth = omSwitchDao.getUniauth();
		//准备vo
		EmployeeVO vo = new EmployeeVO();
		HashMap mapData = HttpObjectUtil.getRequestParams(request);
		HashMap map = getLogInfo(request);
		String dealerId =  NullProcessUtil.nvlToString(mapData.get("dealerId"),"");		
		vo.setAttribute(mapData);
		com.neusoft.crm.channel.outInterface.om.data.DealerVO dealerVO = new com.neusoft.crm.channel.outInterface.om.data.DealerVO();	
		boolean needDealer = omSwitchDAO.getIfNeedDealer();
		boolean haveParty = omSwitchDAO.getIfHaveParty();//判断此项目中是否用到参与人相关的表
		try{
			if(needDealer && dealerId!=null && !dealerId.trim().equals("")&& !dealerId.trim().equals("null")){
				dealerVO = dealerService.doGetDealerByDealer(dealerId);
				vo.setAreaId(dealerVO.getRegion_code());
			}else{
				vo.setDealerId("");
			}
			/**** 为渠道人员管理创建工号 提供返回新增的employeeId：成功即返回employeeId ****/
			long code = service.doAddEmployeeInfo(vo,map);
			/**** 为渠道人员管理创建工号 提供返回新增的employeeId：成功即返回employeeId ****/
			

			if(haveParty){
				/******************** 调接口增加参与人信息 *************************/
				com.neusoft.crm.custmgr.common.outerinterface.partymgr.data.PartyVO partyVO = new 
				com.neusoft.crm.custmgr.common.outerinterface.partymgr.data.PartyVO();
				partyVO.setPartyName(vo.getEmployeeName());
				partyVO.setPartyType("0"); // 0：个人
				partyVO.setStatusCd("10"); // 10:有效
				partyVO.setRoleType("12"); //员工角色
				long partyId = partyService.doInsertParty(partyVO);
				
				if (partyId != -1) {
					com.neusoft.crm.custmgr.common.outerinterface.partymgr.data.PartyContactVO partyContactVO = new
					com.neusoft.crm.custmgr.common.outerinterface.partymgr.data.PartyContactVO();
					partyContactVO.setPartyId(partyId);
					int gender = vo.getGender();
					String strGender = "2"; // 0：男 1：女 2：未知   默认为未知
					if (gender == 0) {
						strGender = "2";
					}else if (gender == 1) {
						strGender = "0";
					} else if (gender == 2) {
						strGender = "1";
					}
					partyContactVO.setContactGender(strGender);
					partyContactVO.setContactName(vo.getEmployeeName());
					partyContactVO.setOfficePhone(vo.getWorkTelephone());
					partyContactVO.setContactAddress(vo.getWorkAddress());
					partyContactVO.setHomePhone(vo.getHoneTelephone());
					partyContactVO.setOfficePhone(vo.getWorkTelephone());
					partyContactVO.setMobilePhone(vo.getMobile());
					partyContactVO.setEmail(vo.getEmail());
					partyContactVO.setFax(vo.getFax());
					partyContactVO.setPartCity(authvo.getCityCode());
					partyContactVO.setCreateDate(DateUtil.getDateDateTime());
					
					long partyContactId = partyService.doInsertPartyContact(partyContactVO);
				}
			
			/******************** 调接口增加参与人信息 *************************/
				
				// 调用参与人信息接口返回值=-1，说明调用接口新增参与人信息失败
				if (partyId != -1) {
					service.doUpdatePartyId(String.valueOf(code), String.valueOf(partyId));				
					request.setAttribute("newEmployeeId", String.valueOf(code));
					
					/** 写日志 */
					String desc = "登录帐号为:"+authvo.getWorkNo()+"的操作员增加职员，职员编号："+vo.getEmployeeId()+"；职员姓名："+vo.getEmployeeName() + "；登录帐号：" + vo.getWorkNo();
					DBLogger logbo = (DBLogger)getDBLogger();
					HashMap logMap = getLogMap(request,ADD_SAVE_BUTTON_ID,desc);
					logbo.doAddLogInfoByProc(logMap);		              
				}
			}else{
				request.setAttribute("newEmployeeId", String.valueOf(code));
				
				/** 写日志 */
				String desc = "登录帐号为:"+authvo.getWorkNo()+"的操作员增加职员，职员编号："+vo.getEmployeeId()+"；职员姓名："+vo.getEmployeeName() + "；登录帐号：" + vo.getWorkNo();
				DBLogger logbo = (DBLogger)getDBLogger();
				HashMap logMap = getLogMap(request,ADD_SAVE_BUTTON_ID,desc);
				logbo.doAddLogInfoByProc(logMap);
			}


		}catch(ServiceException e) {
			operFlag = "0";//失败
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeMaintanceAction--doAddEmployeeInfo:"+e.getMessage());
			message = "增加失败!"+ e.getMessage();
		}
		request.setAttribute("EmployeeVO", vo);
		request.setAttribute("Message",message);
		request.setAttribute("OperFlag",operFlag);
		request.setAttribute("OperType","add");		
		if (comeFrom != null && comeFrom.intern() == "channel") {
			request.setAttribute("comeFrom", "channelAddEmp");
			return mapping.findForward("employeeAddinit");
		}
		return mapping.findForward("employeeresult");
	}
	/**
	 * 修改一个职员
	 * @param mapping
	 * @param request
	 * @param response
	 * @return
	 */	
	private ActionForward doModifyEmployeeInfo(ActionMapping mapping,
						HttpServletRequest request,
						HttpServletResponse response) {
		AuthorizeVO authvo = (AuthorizeVO) request.getSession().getAttribute(GlobalParameters.SESSION_INFO);
        String operFlag = "1";//成功
		String message = "修改成功!";
		
		String oldOrganId = request.getParameter("organId");
		String dealerValue = request.getParameter("DealerIdValue");
		String dealerId = request.getParameter("dealerId");
		String oldDealerId = request.getParameter("oldDealerId");
		int oldDutyId = Integer.parseInt(request.getParameter("OldDutyId"));
		String belongsPart = "";
		
		EmployeeManagementBO service = (EmployeeManagementBO)getBaseService().getServiceFacade(EmployeeManagementBO.BEAN);
		
        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");
        OmQueryBO dealerService =(OmQueryBO)getServiceFacade("omQueryBOInterface");
        EmployeeDAO empDAO = (EmployeeDAO) factory.getInteractionObject("employeeDAO", appContext); 
        OrganDAO organDAO = (OrganDAO) factory.getInteractionObject("organDAO", appContext); 
        OmSwitchDAO omSwitchDAO = (OmSwitchDAO)factory.getInteractionObject("omSwitchDAO", appContext);
        //准备vo
		EmployeeVO vo = new EmployeeVO();
		HashMap mapData = HttpObjectUtil.getRequestParams(request);
		HashMap map = getLogInfo(request);
		vo.setAttribute(mapData);
		try{
			if(dealerValue!=null && !dealerValue.trim().equals("")){
				vo.setDealerId(dealerId);
				if(!dealerId.equals(oldDealerId)){
					belongsPart = service.getRegionCodeById(dealerId);
					vo.setOrganId(belongsPart);
				}
				//得到所属渠道实体类
				if(dealerId != null && ! dealerId.equals("")){
					com.neusoft.crm.channel.outInterface.om.data.DealerVO dealerVO = new com.neusoft.crm.channel.outInterface.om.data.DealerVO();
					dealerVO = dealerService.doGetDealerByDealer(dealerId);
					vo.setAreaId(dealerVO.getRegion_code());//如果职员归属于渠道则职员的所属区域要保存为渠道的所属区域
				}
				
			}else{
				vo.setDealerId("");
				String newAreaId = organDAO.getOrganInfoById(vo.getOrganId()).getAreaId();
				vo.setAreaId(newAreaId);
			}
			EmployeeVO oldVO = empDAO.getEmployeeInfoById(vo.getEmployeeId());
			service.doModifyEmployeeInfo(vo,oldOrganId,oldDutyId,map);
            /** 写日志 */
			String desc = "登录帐号为:"+authvo.getWorkNo()+"的操作员，修改职员信息，职员编号："+vo.getEmployeeId()+"；职员姓名:"+vo.getEmployeeName() + "；登录帐号：" + vo.getWorkNo();
			if(!dealerId.equals(oldDealerId)){
				desc = desc+";职员渠道由"+oldDealerId+"改为"+dealerId;
			}
			
			int oldStatus = oldVO.getStatus();
			int newStatus = vo.getStatus();
			if(oldStatus != newStatus){
				if(newStatus == 0){
					desc = desc + ";职员状态置为有效";
				}else{
					desc = desc + ";职员状态置为失效";
				}
			}
			DBLogger logbo = (DBLogger)getDBLogger();
			HashMap logMap = getLogMap(request,ADD_SAVE_BUTTON_ID,desc);
			logbo.doAddLogInfoByProc(logMap);	
		}catch(ServiceException e) {
			operFlag = "0";
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeMaintanceAction--doModifyEmployeeInfo:"+e.getMessage());
			message = "修改失败!"+e.getMessage();
		}
        /** 如果密码不为空, 修改密码 */
        if (!vo.getWorkPwd().equals(""))
        {
            vo.setWorkPwd(PassWord.encode(vo.getWorkPwd()));
            try
            {
                operFlag = String.valueOf(service.doUpdatePassWord(vo.getWorkNo(), vo.getWorkPwd()));
            } catch (ServiceException e)
            {
                operFlag = "0";
                SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeMaintanceAction--doModifyEmployeeInfo:"+e.getMessage());
                message = "修改密码失败!"+e.getMessage();
            }
        }
		if(operFlag.intern()== "1".intern()){
			request.setAttribute("OldOrganId",oldOrganId);//修改成功写新值,修改失败写旧值
			request.setAttribute("OldDutyId",String.valueOf(oldDutyId));//修改成功写新值,修改失败写旧值
            request.setAttribute("AreaId", String.valueOf(vo.getAreaId()));
            request.setAttribute("EmployeeId", String.valueOf(vo.getEmployeeId()));
		}else{
			request.setAttribute("OldOrganId",vo.getOrganId());//修改成功写新值,修改失败写旧值
			request.setAttribute("OldDutyId",String.valueOf(vo.getDutyId()));//修改成功写新值,修改失败写旧值
            request.setAttribute("AreaId", String.valueOf(vo.getAreaId()));
            request.setAttribute("EmployeeId", String.valueOf(vo.getEmployeeId()));
		}
		//request.setAttribute("EmployeeVO", vo);	
		request.setAttribute("Message",message);
		request.setAttribute("OperType","modify");
		request.setAttribute("OperFlag",operFlag);
		return mapping.findForward("employeeresult");	
	}
	/**
	 * 删除一个职员
	 * @param mapping
	 * @param request
	 * @param response
	 * @return
	 */
	private ActionForward doDeleteEmployeeInfo(ActionMapping mapping,
								HttpServletRequest request,
								HttpServletResponse response) {
		AuthorizeVO authvo = (AuthorizeVO) request.getSession().getAttribute(GlobalParameters.SESSION_INFO);
        String employeeId = NullProcessUtil.nvlToString(request.getParameter("employeeId"),"");
		String operFlag = "1";
		String message = "删除成功!";
		EmployeeManagementBO service =(EmployeeManagementBO)getBaseService().getServiceFacade("employeeManagementFacade");
        HashMap map = getLogInfo(request);
        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");
        EmployeeDAO empDAO = (EmployeeDAO) factory.getInteractionObject("employeeDAO", appContext);
        OmSwitchDAO switchDAO = (OmSwitchDAO) factory.getInteractionObject("omSwitchDAO", appContext);
        EmployeeVO vo = null;
	    try{
	        if(needProductCheck()){
	            int canDel = empDAO.checkOrgan(employeeId,2);// 1：部门，2:职员
	            if(canDel == 1){ //还有工作项没有处理，不能删除，也不能变为无效
	            	message = "该职员还有工作项没有处理，不能删除";
	        		request.setAttribute("Message",message);
	        		request.setAttribute("OperType","delete");
	        		request.setAttribute("OperFlag","0");
	        		return mapping.findForward("employeeresult");
	            }
	        }
		
			vo = service.getEmployeeByEmployeeId(employeeId);
			service.doDeleteEmployeeInfo(employeeId,map);
			if(switchDAO.getIfCancel()){
				empDAO.doCancelWork(employeeId);
			}
            /** 写日志 */
			 String desc = "登录帐号为:"+authvo.getWorkNo()+"的操作员，删除职员信息，职员编号："+employeeId + "；登录帐号：" + vo.getWorkNo();
			 DBLogger logbo = (DBLogger)getDBLogger();
			 HashMap logMap = getLogMap(request,DELETE_BUTTON_ID,desc);
			 logbo.doAddLogInfoByProc(logMap);
		}catch(ServiceException e) {
			operFlag = "0";
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeMaintanceAction--doDeleteEmployeeInfo:"+e.getMessage());
			message = "删除失败!" + e.getMessage();
		}
		request.setAttribute("Message",message);
		request.setAttribute("OperType","delete");
		request.setAttribute("OperFlag",operFlag);
		int canDel = 0;
		if(needProductCheck())
		{
            
            canDel = empDAO.checkOrgan(employeeId,2);// 1：部门，2:职员
		}
		request.setAttribute("canDel", String.valueOf(canDel));
		return mapping.findForward("employeeresult");	
	}
    /**
     * 密码初始化
     * @param mapping
     * @param request
     * @param response
     * @return
     */
    private ActionForward doRenewPassword(ActionMapping mapping,
                                HttpServletRequest request,
                                HttpServletResponse response) {
    	AuthorizeVO authvo = (AuthorizeVO) request.getSession().getAttribute(GlobalParameters.SESSION_INFO);
        String workNo = NullProcessUtil.nvlToString(request.getParameter("workNo"),"");
        HashMap result;
        int code = 1;
        String newPwd = "";
        String message = "密码恢复成功!";
        EmployeeManagementBO service =(EmployeeManagementBO)getBaseService().getServiceFacade("employeeManagementFacade");
        try{
            result = service.doRenewPassWord(workNo);
            code = Integer.parseInt(String.valueOf(result.get("code")));
            newPwd = String.valueOf(result.get("workPwd"));
            message += "新密码为：" + newPwd;
            //doLog(request, "密码初始化");
			String desc = "登录帐号为:"+authvo.getWorkNo()+"的操作员，为登陆账号为:"+workNo+"的职员进行了密码初始化";
			DBLogger logbo = (DBLogger)getDBLogger();
			HashMap logMap = getLogMap(request,RENEW_PWD_BUTTON_ID,desc);
			logbo.doAddLogInfoByProc(logMap);
        }catch(ServiceException e) {
            code = 0;
            SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeMaintanceAction--doRenewPassword:"+e.getMessage());
            message = "密码恢复失败!" + e.getMessage();
        }
        request.setAttribute("Message",message);
        request.setAttribute("OperType","renewPwd");
        request.setAttribute("OperFlag",String.valueOf(code));
        return mapping.findForward("employeeresult");   
    }
    
    /**
     * 初始化密码重置页面
     * @param mapping
     * @param request
     * @param response
     * @return
     */
    private ActionForward getResetPasswordInit(ActionMapping mapping,
                                HttpServletRequest request,
                                HttpServletResponse response) {
        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");
        EmployeeDAO employeeDAO = (EmployeeDAO)factory.getInteractionObject("employeeDAO", appContext);
        String workNo = NullProcessUtil.nvlToString(request.getParameter("workNo"),"");
        String message = "";
        
        EmployeeVO vo = employeeDAO.getEmployeeInfoByWorkNo(workNo);

        if (vo == null) {
        	message = "选择的工号信息已被删除";
        }
        request.setAttribute("employeeVO", vo);
		request.setAttribute("message", message);
        
		return mapping.findForward("resetPasswordInit");   
    }
    
    /**
     * 密码重置
     * @param mapping
     * @param request
     * @param response
     * @return
     */
    private ActionForward resetPassword(ActionMapping mapping,
                                HttpServletRequest request,
                                HttpServletResponse response) {
        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");
        EmployeeDAO employeeDAO = (EmployeeDAO)factory.getInteractionObject("employeeDAO", appContext);
        String workNo = request.getParameter("workNo");
        String password = request.getParameter("pwd");
        request.setAttribute("password", password);
        EmployeeVO vo = null;
        int code = 0;
        String message = "密码重置成功";
        String operType = "save";
                
        if (password == null || password.intern() == "".intern()) {
        	password = "111111"; // 未输入密码，默认为111111
        }
        
        // 加密
        password = PassWord.encode(password);
        
        try {
        	vo = employeeDAO.getEmployeeInfoByWorkNo(workNo);
        	if (vo != null) {
        		code = employeeDAO.doPasswordUpdate(workNo, password);        		
        	} else {
        		message = "该工号已被删除";
        		operType = "error";
        		vo = new EmployeeVO();
        	}
        } catch (DataAccessException e) {
        	operType = "error";
        	message = "密码重置失败：" + e.getMessage().replaceAll("\"","'").replaceAll("\n"," ");        	
        }
        
        /** 写日志 */
		AuthorizeVO authVO = AuthorizeUtil.getAuthorize(request);			 

		if(operType.equals("save")){
		 String desc = "工号【"+ workNo +"】密码重置成功,操作者登陆账号:"+authVO.getWorkNo();
		 DBLogger logbo = (DBLogger)getDBLogger();
		 String insertButtonFlag = "041ABD";
		 HashMap logMap = getLogMap(request,insertButtonFlag,desc);
		 try {
			logbo.doAddLogInfoByProc(logMap);
		} catch (ServiceException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		}

		request.setAttribute("employeeVO", vo);
        request.setAttribute("message", message);
        request.setAttribute("operType", operType);
		
		return mapping.findForward("resetPasswordInit"); 
    }
    
    /**
     * 数据角色赋权-页面初始化
     * @param mapping
     * @param request
     * @param response
     * @return
     */
    private ActionForward doMakeParamDutyInit(ActionMapping mapping,
                        HttpServletRequest request,
                        HttpServletResponse response) {
        String message = "";
        AuthorizeVO authvo = getAuthorize(request);
        String assignedEmpId = NullProcessUtil.nvlToString(request.getParameter("assignedEmpId"),"");
        String currentEmpId = authvo.getEmployeeId();
        EmployeeManagementBO service =(EmployeeManagementBO)getBaseService().getServiceFacade("employeeManagementFacade");
        ParamRoleColl employeeRoleColl = new ParamRoleColl();
        int areaLevel = authvo.getAreaLevel();
        if(areaLevel>2){
        	InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
            AppContext appContext = new AppContextImpl();
            appContext.setApplicationName("om");
            OmSwitchDAO switchDAO = (OmSwitchDAO) factory.getInteractionObject("omSwitchDAO", appContext);
            boolean ifGroup = switchDAO.getGroup();
            boolean ifIngroup = false;
            if(ifGroup){
            	try{
            		ifIngroup = service.ifInGroup(assignedEmpId);
            	}catch (ServiceException e){
            		 SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeMaintanceAction--doMakeParamDutyInit:"+e.getMessage());
                     message = "失败!" + e.getMessage();
            	}
            	if(ifIngroup){
            		message = "two";
            		request.setAttribute("Message", message);
            		return mapping.findForward("hintpage");
            	}
            }
        }
        try
        {
            employeeRoleColl = service.getParamRoleAssignDisplayColl(
                    currentEmpId, assignedEmpId);
        } catch (ServiceException e)
        {
            SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeMaintanceAction--doRenewPassword:"+e.getMessage());
            message = "失败!" + e.getMessage();
        }
        GridUtil.getStartEnd(request,employeeRoleColl.getRowCount(),employeeRoleColl.getRowCount(), 1);
        request.setAttribute("Message",message);
        request.setAttribute("employeeId", assignedEmpId);
        request.setAttribute("employeeRoleColl", employeeRoleColl.getList());
        return mapping.findForward("makeParamDutyInit");
    }
    
    /**
     * 
     * @param mapping
     * @param request
     * @param response
     * @return
     */
    private ActionForward doMakeParamDuty(ActionMapping mapping,
            HttpServletRequest request,
            HttpServletResponse response) {
        String message = "赋权成功";
        int flag = 1;
        int count = 0;
        String employeeId = request.getParameter("assignedEmpId");
        EmployeeParamRoleRelationColl employeeParamRoleRelationColl = new EmployeeParamRoleRelationColl();
        Enumeration parameterNames = request.getParameterNames();
        EmployeeManagementBO service =(EmployeeManagementBO)getBaseService().getServiceFacade("employeeManagementFacade");
        while (parameterNames.hasMoreElements()) {
            String parameterName = (String) parameterNames.nextElement();
            if (parameterName.startsWith("role_")) {
                EmployeeParamRoleRelationVO vo = new EmployeeParamRoleRelationVO();
                String roleId = StringUtils.stripStart(parameterName,
                        "role_");
                String usableFlag = NullProcessUtil.nvlToString(request.getParameter("uf_" + roleId),"0");
                String adminFlag = NullProcessUtil.nvlToString(request.getParameter("af_" + roleId),"0");
                vo.setParamRoleId(Integer.parseInt(roleId));
                vo.setAdminFlag(Integer.parseInt(adminFlag));
                vo.setUsableFlag(Integer.parseInt(usableFlag));
                vo.setEmployeeId(employeeId);
                employeeParamRoleRelationColl.addElement(vo);
                count += 1;
            }
        }
        if (count == 0) {
            // 删除所有角色
            EmployeeParamRoleRelationVO vo = new EmployeeParamRoleRelationVO();
            vo.setEmployeeId(employeeId);
            vo.setParamRoleId(-9999);
            employeeParamRoleRelationColl.addElement(vo);
        }
        AuthorizeVO authVO =  getAuthorize(request);
        String authId = authVO.getEmployeeId();
        try
        {
            flag = service.doModifyEmployeeParamRoleRelation(employeeParamRoleRelationColl, authId);
        } catch (ServiceException e)
        {
            SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeMaintanceAction--doRenewPassword:"+e.getMessage());
            message = "赋权失败!" + e.getMessage();
        }
        request.setAttribute("OperFlag",String.valueOf(flag));
        request.setAttribute("Message",message);
        request.setAttribute("OperType", "makeParamDuty");
        return mapping.findForward("employeeresult");
    }
    /**
     * 功能角色赋权-页面初始化
     * @param mapping
     * @param request
     * @param response
     * @return
     */
    private ActionForward doMakeDutyInit(ActionMapping mapping,
                        HttpServletRequest request,
                        HttpServletResponse response) {
        String message = "";
        AuthorizeVO authvo = getAuthorize(request);
        String assignedEmpId = NullProcessUtil.nvlToString(request.getParameter("assignedEmpId"),"");
        String currentEmpId = authvo.getEmployeeId();
        int areaLevel = authvo.getAreaLevel();
        EmployeeManagementBO service =(EmployeeManagementBO)getBaseService().getServiceFacade("employeeManagementFacade");
        EmployeeRoleDisplayColl employeeRoleColl = null;
        if(areaLevel>2){
        	InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
            AppContext appContext = new AppContextImpl();
            appContext.setApplicationName("om");
            OmSwitchDAO switchDAO = (OmSwitchDAO) factory.getInteractionObject("omSwitchDAO", appContext);
            boolean ifGroup = switchDAO.getGroup();
            boolean ifIngroup = false;
            if(ifGroup){
            	try{
            		ifIngroup = service.ifInGroup(assignedEmpId);
            	}catch (ServiceException e){
            		 SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeMaintanceAction--doMakeDutyInit:"+e.getMessage());
                     message = "失败!" + e.getMessage();
            	}
            	if(ifIngroup){
            		message = "one";
            		request.setAttribute("Message", message);
            		return mapping.findForward("hintpage");
            	}
            }
        }
        try
        {
            employeeRoleColl = service.getAssignDisplayColl(
                    currentEmpId, assignedEmpId);
        } catch (ServiceException e)
        {
            SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeMaintanceAction--doRenewPassword:"+e.getMessage());
            message = "失败!" + e.getMessage();
        }
        GridUtil.getStartEnd(request,employeeRoleColl.getRowCount(),employeeRoleColl.getRowCount(), 1);
        request.setAttribute("Message",message);
        request.setAttribute("employeeId", assignedEmpId);
        request.setAttribute("employeeRoleColl", employeeRoleColl.getList());
        return mapping.findForward("makeDutyInit");
    }
    /**
     * 功能角色赋权
     * @param mapping
     * @param request
     * @param response
     * @return
     */
    private ActionForward doMakeDuty(ActionMapping mapping, HttpServletRequest request, HttpServletResponse response)
    {
        String message = "赋权成功";
        int flag = 1;
        int count = 0;
        String employeeId = request.getParameter("assignedEmpId");
        EmployeeRoleRelationColl employeeRoleRelationColl = new EmployeeRoleRelationColl();
        Enumeration parameterNames = request.getParameterNames();
        EmployeeManagementBO service =(EmployeeManagementBO)getBaseService().getServiceFacade("employeeManagementFacade");
        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");
        RoleDAO roleDAO = (RoleDAO) factory.getInteractionObject("roleDAO", appContext);
        PowerLogDAO powerLogDAO = (PowerLogDAO)factory.getInteractionObject("powerLogDAO", appContext);
        EmployeeRoleRelationDAO empRoleDAO = (EmployeeRoleRelationDAO)factory.getInteractionObject("employeeRoleRelationDAO", appContext); 
        OmSwitchDAO switchDAO = (OmSwitchDAO) factory.getInteractionObject("omSwitchDAO", appContext);
        int powerLog = switchDAO.getPowerLog();
        while (parameterNames.hasMoreElements()) {
            String parameterName = (String) parameterNames.nextElement();
            if (parameterName.startsWith("role_")) {
                EmployeeRoleRelationVO vo = new EmployeeRoleRelationVO();
                String roleId = StringUtils.stripStart(parameterName,"role_");
                String usableFlag = NullProcessUtil.nvlToString(request.getParameter("uf_" + roleId),"0");
                String adminFlag = NullProcessUtil.nvlToString(request.getParameter("af_" + roleId),"0");
                vo.setRoleId(Integer.parseInt(roleId));
                vo.setAdminFlag(Integer.parseInt(adminFlag));
                vo.setUsableFlag(Integer.parseInt(usableFlag));
                vo.setEmployeeId(employeeId);                
                employeeRoleRelationColl.addElement(vo);
                count += 1;
            }
        }
        if (count == 0) {
            // 删除所有角色
            EmployeeRoleRelationVO vo = new EmployeeRoleRelationVO();
            vo.setEmployeeId(employeeId);
            vo.setRoleId(-9999);
            employeeRoleRelationColl.addElement(vo);
        }
        AuthorizeVO authVO =  getAuthorize(request);
        String authId = authVO.getEmployeeId();
        String areaId = authVO.getAreaId();
        try
        {
        	EmployeeRoleRelationColl priColl = empRoleDAO.getEmployeeRoleRelationInfoByEmployeeId(employeeId);
        	
            flag = service.doModifyRole(employeeRoleRelationColl,authId);
            /** 写日志 */
             EmployeeVO empVO = service.getEmployeeByEmployeeId(employeeId);
			 String desc = "登录帐号为:"+authVO.getWorkNo()+"的操作员，为工号："+empVO.getEmployeeName() + "进行功能赋权。赋予角色：";
			 for(int i=0; i < count; i++){
				 EmployeeRoleRelationVO vo = employeeRoleRelationColl.getEmployeeRoleRelation(i);
				 if(vo != null){
					 RoleVO roleVO = roleDAO.getRoleInfoByRoleId(vo.getRoleId());
					 desc +=roleVO.getRoleName()+",";
				 }				 
			 }
			 DBLogger logbo = (DBLogger)getDBLogger();
			 HashMap logMap = getLogMap(request,GRANT_BUTTON_ID,desc);
			 logbo.doAddLogInfoByProc(logMap);
			 /*
			  * 记录赋权的详细日志
			  * 
			  */
			 if(powerLog == 1){
				 EmployeeRoleDisplayColl assignRoleColl = service.getAssignDisplayColl( authId, employeeId);
				 PowerLogColl delLogColl = getDeleteColl(assignRoleColl,priColl, employeeRoleRelationColl,authId,areaId);			 
				 PowerLogColl powerLogColl = getPowerLogMap(request,getAddRoleColl(priColl,employeeRoleRelationColl));
				 //记录取消权限日志
				 powerLogDAO.doAddPowerLog(delLogColl);
				 //记录赋权日志
				 powerLogDAO.doAddPowerLog(powerLogColl);
			 }

        } catch (ServiceException e)
        {
            SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeMaintanceAction--doRenewPassword:"+e.getMessage());
            message = "赋权失败!" + e.getMessage();
        }
        request.setAttribute("OperFlag",String.valueOf(flag));
        request.setAttribute("Message",message);
        request.setAttribute("OperType", "makeDuty");
        return mapping.findForward("employeeresult");
    }

    private PowerLogColl getDeleteColl (EmployeeRoleDisplayColl assignRoleColl, EmployeeRoleRelationColl priColl, 
    		EmployeeRoleRelationColl addColl,String authId,String areaId){
    	PowerLogColl delColl = new PowerLogColl();
    	PowerLogColl coll = new PowerLogColl();
        for(int i=0; i < priColl.getRowCount(); i++){
        	EmployeeRoleRelationVO priVO = priColl.getEmployeeRoleRelation(i);
        	int same = 0;
        	for(int j=0; j<addColl.getRowCount();j++){
        		EmployeeRoleRelationVO addVO = addColl.getEmployeeRoleRelation(j);
        		if(priVO.getRoleId() == addVO.getRoleId()){
        			same = 1;
        		}
        	}
        	if(same == 0 ){
        		PowerLogVO vo = new PowerLogVO();
        		vo.setEmployeeId(authId);
        		vo.setAreaId(areaId);
        		vo.setOperObj(priVO.getEmployeeId());
	        	vo.setPowerId(String.valueOf(priVO.getRoleId()));
	        	vo.setNote("取消权限");
	        	vo.setOperType(0);
	        	delColl.addPowerLog(vo);
        	}
        }
        for(int i=0;i<assignRoleColl.getRowCount();i++){
        	EmployeeRoleDisplayVO  vo = assignRoleColl.getEmployeeRoleDisplay(i);
        	for(int j=0; j<delColl.getRowCount();j++){
        		PowerLogVO delVO = delColl.getPowerLogVO(j);
        		if(String.valueOf(vo.getRoleId()).equals(delVO.getPowerId())){
        			coll.addPowerLog(delVO);
        		}
        	}
        }
        return coll;
    }
    private EmployeeRoleRelationColl getAddRoleColl(EmployeeRoleRelationColl priColl,EmployeeRoleRelationColl newRelColl){
    	EmployeeRoleRelationColl coll = new EmployeeRoleRelationColl();
    	for(int i=0;i<newRelColl.getRowCount();i++){
    		boolean newRole = true;
    		for(int j=0; j<priColl.getRowCount();j++){
    			if(newRelColl.getEmployeeRoleRelation(i).getRoleId()==priColl.getEmployeeRoleRelation(j).getRoleId()){
    				newRole = false;
    			}
    		}
    		if(newRole){
    			coll.addEmployeeRoleRelation(newRelColl.getEmployeeRoleRelation(i));
    		}
    	}
    	return coll;
    }
    /**
     * 下拉列表的改变，局部刷新
     * @param mapping
     * @param request
     * @param response
     * @return
     */
    public ActionForward doChangeOnSelect(ActionMapping mapping, HttpServletRequest req, HttpServletResponse res)
    {
        RequestUtil request=new RequestUtil(req);
        StringBuffer html = new StringBuffer();
        OMDictionaryBOInterface omdictionary = (OMDictionaryBOInterface)getBaseService().getServiceFacade("omDictionaryFacade");
        String obj = request.getParameter("obj");
        if ("duty".equals(obj)){
            String organId = request.getParameter("organId");       
            ParamObjectCollection dutyParamColl = omdictionary.getDutyColl(organId);
            for(int idx=0; idx<dutyParamColl.getRowCount(); idx++)
            {   
                ParamObject vo =(ParamObject)dutyParamColl.getElement(idx);
                html.append("<option value=");
                html.append(vo.getId()); 
                html.append(">\n");
                html.append("<caption>");                    
                html.append(vo.getName());
                html.append("</caption>\n");
                html.append("</option>\n");
            }
        } else if ("emp".equals(obj)) {
            String organId = request.getParameter("organId");
            ParamObjectCollection organEmployeeColl = omdictionary.getOrganEmployeeColl(organId,null);
            for(int idx=0; idx<organEmployeeColl.getRowCount(); idx++)
            {   
                ParamObject vo =(ParamObject)organEmployeeColl.getElement(idx);
                html.append("<option value=");
                html.append(vo.getId()); 
                html.append(">\n");
                html.append("<caption>");                    
                html.append(vo.getName());
                html.append("</caption>\n");
                html.append("</option>\n");
            }
        } else if ("organ".equals(obj)) {
            String areaId = request.getParameter("areaId");
            ParamObjectCollection organColl = omdictionary.getOrganCollByAreaId(areaId);
            for(int idx=0; idx<organColl.getRowCount(); idx++)
            {   
                ParamObject vo =(ParamObject)organColl.getElement(idx);
                html.append("<option value=");
                html.append(vo.getId()); 
                html.append(">\n");
                html.append("<caption>");                    
                html.append(vo.getName());
                html.append("</caption>\n");
                html.append("</option>\n");
            }
        }
        // 将html写回页面
        try
        {
            res.getWriter().write(String.valueOf(html));
        } catch (IOException e)
        {
            SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeMaintanceAction--doChangeOnSelect:"+e.getMessage());
        }
        return null;
    }
    
	/**
	 * 操作员写操作中加入日志
	 */
	
	public HashMap getLogInfo(HttpServletRequest request){
        HashMap map = new HashMap();
		//当前操作员地市信息
		AuthorizeVO authvo = (AuthorizeVO) request.getSession().getAttribute(GlobalParameters.SESSION_INFO);
		map.put("employeeId",authvo.getEmployeeId());
		map.put("systemId","");
		map.put("menuId","");
		map.put("bottonName","");
		map.put("loginHost","");
		map.put("operDesc","");
		return map;
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
    
    private ActionForward powerAdjustInit(ActionMapping mapping, HttpServletRequest request, HttpServletResponse response){
        String employeeId = request.getParameter("employeeId");
        String needCheckBox = request.getParameter("needCheckBox");

        
        request.setAttribute("employeeId", employeeId);
        request.setAttribute("needCheckBox",needCheckBox);
    	return mapping.findForward("showPower");
    }
    
    private boolean contain(MenuColl coll, MenuVO vo){
    	boolean con = false;
    	for(int i =0; i < coll.getRowCount(); i++){
    		MenuVO menuVO = coll.getMenu(i);
    		if(menuVO.getMenuId().intern().equals(vo.getMenuId().intern())){
    			con = true;
    			
    		}
    	}
    	return con;
    	
    }
    
    private ActionForward getDealerEmployee(ActionMapping mapping,
            HttpServletRequest request, HttpServletResponse response){
        String message = "";
        EmployeeManagementBO service =(EmployeeManagementBO)getBaseService().getServiceFacade(EmployeeManagementBO.BEAN);
        String opt = request.getParameter("opt");
        AuthorizeVO authvo = getAuthorize(request);
        int areaLevel = authvo.getAreaLevel();
        String employeeId = authvo.getEmployeeId();
        int adminType =0;
        
        try {
            adminType=service.getEmployeeByEmployeeId(employeeId).getAdminType();
        } catch (ServiceException e) {
            SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeMaintanceAction--getDealerEmployee:"+e.getMessage());
        }
        if ("workNo".equals(opt)) {
            String workNo = request.getParameter("workNo");
            EmployeeColl employeeColl = new EmployeeColl();
            try
            {
                employeeColl.addElement(service.getDealerEmpByWorkNo(workNo,employeeId,areaLevel,adminType));
            } catch (ServiceException e)
            {
                SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeMaintanceAction--getDealerEmployee:"+e.getMessage());
                message = "查询工号失败!"+e.getMessage();            
            }
            request.setAttribute("Message",message);
            GridUtil.getStartEnd(request,employeeColl.getRowCount(),employeeColl.getRowCount(), 1);
            request.setAttribute("EmployeeList", employeeColl.getList());
            
        } else if ("employeeName".equals(opt)) {
            String employeeName = request.getParameter("employeeName");
            EmployeeColl employeeColl = new EmployeeColl();
            try
            {
            	employeeColl = service.getDealerEmpByName(employeeName,employeeId,areaLevel,adminType);
             } catch (ServiceException e)
            {
                SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeMaintanceAction--getDealerEmployee:"+e.getMessage());
                message = "查询职员ID失败!"+e.getMessage();            
            }
            request.setAttribute("Message",message);
            GridUtil.getStartEnd(request,employeeColl.getRowCount(),employeeColl.getRowCount(), 1);
            List empList = employeeColl.getList();
            request.setAttribute("EmployeeList", empList);            
        }
        return mapping.findForward("employeesearchresult");
    }
    /**
     * 职员的权限信息导出
     * @param mapping
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
	public ActionForward doExport(ActionMapping mapping, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		ITree menuTree = (ITree)request.getSession().getAttribute("menuTree");
		String employeeId = request.getParameter("employeeId");	

        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");
        MenuDAO menuDao = (MenuDAO) factory.getInteractionObject("menuDAO", appContext);
        SystemDAO sysDao = (SystemDAO)factory.getInteractionObject("systemDAO",appContext);
        EmployeeDAO empDAO = (EmployeeDAO)factory.getInteractionObject("employeeDAO", appContext);
        MenuColl menuColl = menuDao.getUsableMenuCollByEmpId(employeeId,"true");
        SystemColl sysColl = sysDao.getSystemInfoByEmployeeId(employeeId);//包括一级和二级子系统
        EmployeeVO empVO = empDAO.getEmployeeInfoById(employeeId);
		String employeeName = empVO.getEmployeeName();
		String workNo = empVO.getWorkNo();
		try {
			response.setContentType("application/vnd.ms-excel");
			response.setHeader("Content-Disposition", "attachment;filename=\""
					+ "employee_"+employeeName+"_Power.xls" + "\"");
			response.setHeader("Cache-Control",
					"must-revalidate, post-check=0, pre-check=0");
			response.setHeader("Pragma", "public");
			ByteArrayOutputStream wb = createJxl(employeeId,employeeName,workNo,menuTree,menuColl,sysColl);

			wb.writeTo(response.getOutputStream());
			response.getOutputStream().flush();
			response.getOutputStream().close();

		} catch (Exception e) {
			System.out.println("Error : " + e.toString());
		}
		//return mapping.findForward("exportButton");
		return null;
	}
	private ByteArrayOutputStream createJxl(String employeeId, String employeeName,String workNo,
			ITree menuTree, MenuColl menuColl, SystemColl sysColl) {

		WritableWorkbook book = null ;
		ByteArrayOutputStream fos = null;
		
		try{
			fos = new ByteArrayOutputStream();
			book = Workbook.createWorkbook(fos); 	
			
			WritableSheet sheet=book.createSheet("第一页",0); 
			sheet.addCell(new Label(0,0,"职员名称"));
			sheet.addCell(new Label(1,0,"职员编号"));
			sheet.addCell(new Label(2,0,"登录帐号"));
			sheet.addCell(new Label(3,0,"一级子系统名称"));
			sheet.addCell(new Label(4,0,"二级子系统名称"));
			sheet.addCell(new Label(5,0,"菜单名称"));
			sheet.addCell(new Label(6,0,"子菜单名称"));
			sheet.addCell(new Label(7,0,"按钮和其他控件"));
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
				sheet.addCell(new Label(0,i+1,employeeName)); 
				sheet.addCell(new Label(1,i+1,employeeId)); 
				sheet.addCell(new Label(2,i+1, workNo));
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
							position = 3; //一级子系统
						}else{
							position =4; //二级子系统
						}
					}
					if(menuVO != null && !menuVO.getMenuId().trim().equals("")){
						int menuType = menuVO.getMenuType();
						if(menuType == 1 || menuType == 10 || menuType == 6 || menuType == 7){//最小子菜单 10:首页中的frame 6:frame 7: view
							position = 6;
						}else if(menuType == 2 || menuType == 5 ){//菜单 5: window 
							position = 5;
						}else{//按钮及其他组件
							position = 7;
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
	 * 政策审批权限维护
	 * @param mapping
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward doShowAuditLimitPage(ActionMapping mapping, HttpServletRequest request,
			HttpServletResponse response) {
		String employeeId = request.getParameter("employeeId");
		String pageURL = "/channel/PolicyQueryAction.do?method=initAuditLimitPage&employeeId=" + employeeId;
    	AuthorizeVO authVO =  getAuthorize(request);
		try {
			OrganManagementBO service =(OrganManagementBO)getBaseService().getServiceFacade(OrganManagementBO.BEAN);
			String webapps = service.getAppContainer("3");
//			String webapps = "http://10.195.129.184:8080/tdframework/";
			webapps = webapps.endsWith("/") ? webapps.substring(0, webapps.length() - 1) : webapps;
			String params = "&j_username=" + authVO.getWorkNo() + "&j_password=" + PassWord.decode(authVO.getWorkPwd());
			String pageLink = webapps + pageURL + params;
			//System.out.println(pageLink);
			response.sendRedirect(pageLink);
		} catch (ServiceException e) {
            SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeMaintanceAction--doShowAuditLimitPage:"+e.getMessage());
         
		} catch (IOException e) {
            SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeMaintanceAction--doShowAuditLimitPage:"+e.getMessage());
		}
		return null;
	}
	
	public ActionForward cancelInching(ActionMapping mapping, HttpServletRequest request,
			HttpServletResponse response){
		//EmployeeManagementBO service =(EmployeeManagementBO)getBaseService().getServiceFacade("employeeManagementFacade");
		
		String employeeId = (String)request.getParameter("employeeId");
		String[] checkedValue = request.getParameterValues("checkboxs");
		String message = "";
		String flag = null;
        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");
        EmployeeDAO employeeDAO = (EmployeeDAO) factory.getInteractionObject("employeeDAO", appContext);      
        try{
        	message = employeeDAO.undoPowerAdjust(employeeId,checkedValue);
        	if(message.equals("true")){
        		message = "取消微调信息成功";
        		flag = "close";
        	}
        }catch(DataAccessException e){
        	message = "取消微调信息失败："+e.getMessage();
            SysLog.writeLogs("om",GlobalParameters.ERROR,
            	"EmployeeMaintanceAction--cancelInching:"+e.getMessage());
        }
        
        request.setAttribute("message",message);
        request.setAttribute("flag",flag);
        request.setAttribute("employeeId",employeeId);
        
        return mapping.findForward("cancelInching");
	}
	public ActionForward findWorkNo(ActionMapping mapping, HttpServletRequest request,
			HttpServletResponse response){	
		String message = "";
		List list = new ArrayList();
        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");
        EmployeeDAO employeeDAO = (EmployeeDAO) factory.getInteractionObject("employeeDAO", appContext);  
        Vector empReq = new Vector();
        try{
//        	int totalRows = employeeDAO.getTotalRowsOfEmpReq();
//            int[] beginAndEnd = GridUtil.getStartEnd(request, totalRows, DEFAULT_PAGE_SIZE,1);
//            list = employeeDAO.getEmployeeReq( beginAndEnd[0], beginAndEnd[1]);
        	empReq = employeeDAO.getEmpReqVector();
        	
        }catch(DataAccessException e){
        	message = "查找同步工号信息失败："+e.getMessage();
            SysLog.writeLogs("om",GlobalParameters.ERROR,
            	"EmployeeMaintanceAction--findWorkNo:"+e.getMessage());
        }
        
        request.setAttribute("message",message);
        request.setAttribute("empReq",empReq);
        request.setAttribute("ActionName", ACTION_NAME);
        
        return mapping.findForward("findReq");
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
	private boolean haveSearchOption(HttpServletRequest request){
		boolean have = true;
		String cWorkNo = request.getParameter("workNo");
        String cEmployeeId = request.getParameter("employeeId");
        String cEmployeeName = request.getParameter("employeeName");
        String cDutyId = request.getParameter("dutyId");
        String cAdminType = request.getParameter("adminType");
        String cStatus = request.getParameter("status");
        String cRoleId = request.getParameter("roleId");
        String pwdUpdateDateBegin = request.getParameter("pwdUpdateDateBegin");
        String pwdUpdateDateEnd = request.getParameter("pwdUpdateDateEnd");
        if( isEmpty(cWorkNo) && isEmpty(cEmployeeId)&& isEmpty(cEmployeeName)&& isEmpty(cDutyId)
        		&& isEmpty(cAdminType)&& isEmpty(cStatus)&& isEmpty(cRoleId)
        		&& isEmpty(pwdUpdateDateBegin)&& isEmpty(pwdUpdateDateEnd) ){
        	have = false;
        }
        
		return have;
	}
	private boolean isEmpty(String string){
		if(string == null){
			return true;
		}else if(string.trim().equals("")){
			return true;
		}else{
			return false;
		}
	}
	/**
	 * 导出职员列表信息
	 * @param mapping
	 * @param actionForm
	 * @param request
	 * @param response
	 * @return
	 */
	public ActionForward doExportEmp(ActionMapping mapping, ActionForm actionForm,HttpServletRequest request,
			HttpServletResponse response) {		
		
        EmployeeColl employeeColl = getExportEmpColl(request); 		
		 try {
			response.setContentType("application/vnd.ms-excel");
			response.setHeader("Content-Disposition", "attachment;filename=\""
					+ "employee.xls" + "\"");
			response.setHeader("Cache-Control",
					"must-revalidate, post-check=0, pre-check=0");
			response.setHeader("Pragma", "public");
			ByteArrayOutputStream wb = new ByteArrayOutputStream();
			
			wb = createJxl(employeeColl);
			
			
			wb.writeTo(response.getOutputStream());
			response.getOutputStream().flush();
			response.getOutputStream().close();

		} catch (Exception e) {
			System.out.println("Error : " + e.toString());
		}
		return null;
	}
	/**
	 * 导出职员微调信息
	 * @param mapping
	 * @param actionForm
	 * @param request
	 * @param response
	 * @return
	 */
	public ActionForward doExportAdjPower(ActionMapping mapping, ActionForm actionForm,HttpServletRequest request,
			HttpServletResponse response) {		
        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");        
        PowerAdjustDAO  powerAdjDAO = (PowerAdjustDAO)factory.getInteractionObject("powerAdjustDAO", appContext);
        EmployeeDAO empDAO = (EmployeeDAO)factory.getInteractionObject("employeeDAO", appContext);
        EmployeeColl employeeColl = getExportAdjEmpColl(request); 
        
    	AdjEmployeeColl adjEmployeeColl = new AdjEmployeeColl();
    	empDAO.doDeleteTempInfo();
    	empDAO.doSaveTempInfo(employeeColl);
    	adjEmployeeColl = powerAdjDAO.getPowerAdjustCollByEmpColl(); 
		 try {
				response.setContentType("text/plain");
				
				String codedfilename = URLEncoder.encode("微调信息.csv","UTF8");
				response.setHeader("Content-Disposition", "attachment;filename=\""+ codedfilename + "\"");
				response.setHeader("Cache-Control","must-revalidate, post-check=0, pre-check=0");
				response.setHeader("Pragma", "public");
			
				ByteArrayOutputStream wb = getTxtFileStream(adjEmployeeColl);
				wb.writeTo(response.getOutputStream());
				
				response.getOutputStream().flush();
				response.getOutputStream().close();
			 

		} catch (Exception e) {
			System.out.println("Error : " + e.toString());
		}    
		
		
		return null;
	}
	/**
	 * 
	 * @return
	 */
	private ByteArrayOutputStream getTxtFileStream(AdjEmployeeColl adjEmployeeColl) {
		
		ByteArrayOutputStream fos = new ByteArrayOutputStream();
		OutputStreamWriter osw = new OutputStreamWriter(fos);
		java.io.BufferedWriter bw = new BufferedWriter(osw);
		
		try {

			if(adjEmployeeColl!= null){
				bw.write("地市名称,地市编码,归属区域,归属部门,职员编号,工号,姓名,微调方式,菜单编号,菜单名称,上级菜单");
				bw.newLine();
				for (short i = 0; i < adjEmployeeColl.getRowCount(); i++) {
					AdjEmployeeVO adjEmployeeVO = adjEmployeeColl.getAdjEmployee(i);
					bw.write(adjEmployeeVO.getCityName()+","+adjEmployeeVO.getCityCode()+","+adjEmployeeVO.getAreaName()
							+","+adjEmployeeVO.getOrganName()+","+adjEmployeeVO.getEmployeeId()+","
							+ adjEmployeeVO.getWorkNo() + "," + adjEmployeeVO.getEmployeeName()+","
							+ adjEmployeeVO.getAdjustMethod() + "," + adjEmployeeVO.getMenuId()+","
							+ adjEmployeeVO.getMenuName() +","+ adjEmployeeVO.getParentMenuId());
					bw.newLine();
				}
				bw.flush();
				bw.close();
			}
			

		} catch (IOException e) {
			e.printStackTrace();
		}
		return fos;
	}
	/**
	 * 得到导出微调信息的职员集合
	 * @param request
	 * @return
	 */
	private EmployeeColl getExportAdjEmpColl(HttpServletRequest request) {		
        EmployeeManagementBO service =(EmployeeManagementBO)getBaseService().getServiceFacade(EmployeeManagementBO.BEAN);        
        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");
        AreaDAO areaDAO = (AreaDAO) factory.getInteractionObject("areaDAO", appContext);
        String dealerId = NullProcessUtil.nvlToString(request.getParameter("dealerId"),"").trim();	
		String currentAreaId = NullProcessUtil.nvlToString(request.getParameter("currentAreaId"),"").trim();
		String currentOrganId = NullProcessUtil.nvlToString(request.getParameter("currentOrganId"),"").trim();	
        AuthorizeVO authvo = (AuthorizeVO) request.getSession(true).getAttribute(GlobalParameters.SESSION_INFO);
        int areaLevel = authvo.getAreaLevel();
        String employeeId = authvo.getEmployeeId();
        int adminType =  authvo.getAdminType();   
        EmployeeColl employeeColl = new EmployeeColl();        
        Map filterInfo = getFilterInfo(request);
        try {	
        	if( !haveSearchOptionForExport(request)){
        		if(dealerId != null && !dealerId.equals("")){
        			employeeColl = service.getDealerEmployee(dealerId,areaLevel,adminType,employeeId);
        		}else{
        			employeeColl = service.getEmployeeInfoFilter(currentAreaId,currentOrganId,employeeId,areaLevel,adminType);            	
        		}            	
            }else{
            	employeeColl = service.getEmployeeInfoFilter(filterInfo);
            }     
        	Map areaMap = new HashMap();
        	areaMap = areaDAO.getAllCityColl();
        	for(int i=0; i < employeeColl.getRowCount();i++){
        		EmployeeVO vo = employeeColl.getEmployee(i);
        		String cCode = vo.getCityCode();
        		String cityName = (String)areaMap.get(cCode);
        		vo.setCityName(cityName);
        	}
		}catch (ServiceException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeMaintanceAction--doExportEmp:"+e.getMessage());				
		}
		return employeeColl;
	}
	/**
	 * 得到导出职员列表的所有职员集合
	 * @param request
	 * @return
	 */
	private EmployeeColl getExportEmpColl(HttpServletRequest request) {
        EmployeeManagementBO service =(EmployeeManagementBO)getBaseService().getServiceFacade(EmployeeManagementBO.BEAN);        
        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");
        EmployeeDAO empDao = (EmployeeDAO) factory.getInteractionObject("employeeDAO", appContext);
        AreaDAO areaDAO = (AreaDAO) factory.getInteractionObject("areaDAO", appContext);
        String dealerId = NullProcessUtil.nvlToString(request.getParameter("dealerId"),"").trim();	
		String currentAreaId = NullProcessUtil.nvlToString(request.getParameter("currentAreaId"),"").trim();
		String currentOrganId = NullProcessUtil.nvlToString(request.getParameter("currentOrganId"),"").trim();	
        AuthorizeVO authvo = (AuthorizeVO) request.getSession(true).getAttribute(GlobalParameters.SESSION_INFO);
        int areaLevel = authvo.getAreaLevel();
        String employeeId = authvo.getEmployeeId();
        int adminType =  authvo.getAdminType();   
        EmployeeColl employeeColl = new EmployeeColl();        
        Map filterInfo = getFilterInfo(request);

        try {	
        	if( !haveSearchOptionForExport(request)){
        		if(dealerId != null && !dealerId.equals("")){
        			employeeColl = service.getDealerEmployee(dealerId,areaLevel,adminType,employeeId);
        		}else{
        			employeeColl = service.getEmployeeInfoFilter(currentAreaId,currentOrganId,employeeId,areaLevel,adminType);            	
        		}            	
            }else{
            	employeeColl = service.getEmployeeInfoFilter(filterInfo);
            }     
        	Map empRoleMap = new HashMap();
        	empRoleMap = empDao.getAllEmpRole();
        	Map areaMap = new HashMap();
        	areaMap = areaDAO.getAllCityColl();
        	for(int i=0; i < employeeColl.getRowCount();i++){
        		EmployeeVO vo = employeeColl.getEmployee(i);
        		String empId = vo.getEmployeeId();
        		String cCode = vo.getCityCode();
        		String roleName = (String)empRoleMap.get(empId);
        		String cityName = (String)areaMap.get(cCode);
        		vo.setCityName(cityName);
        		if(roleName != null){
        			vo.setAllRoleInfo(roleName);        			
        		}
        	}
		}catch (ServiceException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeMaintanceAction--doExportEmp:"+e.getMessage());
				
		}
		return employeeColl;
	}
	
	/**
	 * 得到查询条件组成的过滤信息map
	 * @param request
	 * @return
	 */
	private Map getFilterInfo(HttpServletRequest request){	
		String currentAreaId = NullProcessUtil.nvlToString(request.getParameter("currentAreaId"),"").trim();
		String currentOrganId = NullProcessUtil.nvlToString(request.getParameter("currentOrganId"),"").trim();	
        AuthorizeVO authvo = (AuthorizeVO) request.getSession(true).getAttribute(GlobalParameters.SESSION_INFO);
        int areaLevel = authvo.getAreaLevel();
        String employeeId = authvo.getEmployeeId();
        int adminType =  authvo.getAdminType();        
        String cityCode =authvo.getCityCode(); 
        String areaId = authvo.getAreaId();
        
        Map filterInfo = new HashMap();
        filterInfo.put("areaLevel",String.valueOf(areaLevel));
        if(adminType==1){
        	filterInfo.put("f_adminType","f_owner is not null");
        }else if(adminType==2){
        	filterInfo.put("f_adminType","f_owner = '"+employeeId+"'");
        }else {
        	filterInfo.put("f_adminType","f_employee_id = '"+employeeId+"' ");
        }
        if(areaLevel > 2){
        	filterInfo.put("f_cityCode","f_city_code= '"+cityCode+"' ");
        	filterInfo.put("f_areaId","f_area_id like '" + areaId +"%'");
        }        
        String cWorkNo = request.getParameter("f_work_no");
        String cEmployeeId = request.getParameter("f_employee_id");
        String cEmployeeName = request.getParameter("f_employee_name");
        String cDutyId = request.getParameter("f_dutyId");
        String cAdminType = request.getParameter("f_admin_type");
        String cStatus = request.getParameter("f_status");
        String cRoleId = request.getParameter("s_role_id");
        String pwdUpdateDateBegin = request.getParameter("pwdUpdateDateBegin");
        String pwdUpdateDateEnd = request.getParameter("pwdUpdateDateEnd");
        String adminFlag = request.getParameter("f_admin_flag");
        String useableFlag = request.getParameter("f_usable_flag");        
        String selectNodeKind = request.getParameter("nodeKind");
        String selectAreaId = request.getParameter("f_area_id");
        String selectOrganId =  request.getParameter("f_organ_id");               
	
			
		if(currentAreaId.intern()=="".intern() && currentOrganId.intern()=="".intern())
			currentAreaId = authvo.getAreaId();
		
        boolean haveSerchOption = haveSearchOption(request);
        if( !haveSerchOption) {
        	if (selectNodeKind != null && !selectNodeKind.equals("") ) {
            	if(selectNodeKind.equals("area")){            		
            		filterInfo.remove("f_areaId");
            		filterInfo.put("f_areaId", "f_area_id = '" + selectAreaId.trim()+"'");
            	}else if(selectNodeKind.equals("organ") ){
            		filterInfo.put("f_organId", "f_organ_id = '" + selectOrganId.trim()+"'");
            	}            
            }
        }
        if (cWorkNo != null && !cWorkNo.equals("")) {
        	filterInfo.put("f_workNo", "f_work_no = '" + cWorkNo.trim().toUpperCase()+"'");
        }
        if (cEmployeeId != null && !cEmployeeId.equals("")) {
        	filterInfo.put("f_employeeId", "f_employee_id = '" + cEmployeeId.trim()+"'");
        }
        if (cEmployeeName != null && !cEmployeeName.equals("")) {
        	filterInfo.put("f_employeeName", "f_employee_name = '" + cEmployeeName.trim()+"'");
        }
        if (cDutyId != null && !cDutyId.equals("")) {
        	filterInfo.put("f_dutyId", "f_duty_id = " + cDutyId.trim() + " ");
        }
        if (cAdminType != null && !cAdminType.equals("")) {
        	filterInfo.put("f_adminType", "f_admin_type = " + cAdminType.trim() + " ");
        }
        if (cStatus != null && !cStatus.equals("")) {
        	filterInfo.put("f_status", "f_status = " + cStatus.trim() + " ");
        }
        if ((pwdUpdateDateBegin != null && !pwdUpdateDateBegin.equals(""))
        		&& (pwdUpdateDateEnd != null && !pwdUpdateDateEnd.equals(""))) {
        	String pwdUpdateCond = "f_pwd_update BETWEEN TO_DATE ('" + 
        				pwdUpdateDateBegin + 
        				" 00:00:00', 'yyyy-MM-dd HH24:mi:ss') AND TO_DATE ('" + 
        				pwdUpdateDateEnd + 
        				"', 'yyyy-MM-dd HH24:mi:ss') ";
        	filterInfo.put("f_pwdUpdate", pwdUpdateCond);
        }
        if (cRoleId != null) {
        	filterInfo.put("s_role_id", cRoleId.trim());
        }
        if (adminFlag != null && adminFlag.trim().equals("1")) {
        	filterInfo.put("s_flagType","f_admin_flag = 1 ");
        }else if(useableFlag != null && useableFlag.trim().equals("1")){
        	filterInfo.put("s_flagType","f_usable_flag = 1 ");
        }
        return filterInfo;
	}
	/**
	 * 导出职员列表信息
	 * @param employeeColl
	 * @return
	 */
	private ByteArrayOutputStream createJxl(EmployeeColl employeeColl) {

		WritableWorkbook book = null ;
		ByteArrayOutputStream fos = null;
		Workbook workbook = null;
		
		try{
			fos = new ByteArrayOutputStream();
			book = workbook.createWorkbook(fos); 	
			
			WritableSheet sheet=book.createSheet("第一页",0); 
			sheet.addCell(new Label(0,0,"地市名称"));
			sheet.addCell(new Label(1,0,"地市编码"));						
			sheet.addCell(new Label(2,0,"职员编号"));
			sheet.addCell(new Label(3,0,"姓名"));
			sheet.addCell(new Label(4,0,"工号"));
			sheet.addCell(new Label(5,0,"角色"));
			//sheet.addCell(new Label(6,0,"角色数"));
			//sheet.addCell(new Label(7,0,"是否存在微调"));
			sheet.addCell(new Label(6,0,"状态"));
			sheet.addCell(new Label(7,0,"归属区域"));
			sheet.addCell(new Label(8,0,"归属部门"));
			sheet.addCell(new Label(9,0,"渠道编号"));
			sheet.addCell(new Label(10,0,"渠道名称"));

			for(int i=0; i < employeeColl.getRowCount(); i++){
				EmployeeVO empVO = employeeColl.getEmployee(i);
				sheet.addCell(new Label(0,i+1,empVO.getCityName())); 
				sheet.addCell(new Label(1,i+1,empVO.getCityCode()));
				sheet.addCell(new Label(2,i+1,empVO.getEmployeeId()));
				sheet.addCell(new Label(3,i+1,empVO.getEmployeeName()));
				sheet.addCell(new Label(4,i+1,empVO.getWorkNo()));				
				sheet.addCell(new Label(5,i+1,empVO.getAllRoleInfo()));//角色				
//				sheet.addCell(new Label(6,i+1,String.valueOf(empVO.getRoleNum())));//角色数				
//				sheet.addCell(new Label(7,i+1,empVO.getAdjusetPowerDesc()));//是否存在微调
				sheet.addCell(new Label(6,i+1,empVO.getStatusInfo()));
				sheet.addCell(new Label(7,i+1,empVO.getAreaName()));
				sheet.addCell(new Label(8,i+1,empVO.getOrganName()));
				sheet.addCell(new Label(9,i+1,empVO.getDealerId()));
				sheet.addCell(new Label(10,i+1,empVO.getDealerName()));
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
	 * 导出职员微调信息
	 * @param employeeColl
	 * @return
	 */
	
	private ByteArrayOutputStream createJxlAdj(AdjEmployeeColl adjEmployeeColl) {

		WritableWorkbook book = null ;
		ByteArrayOutputStream fos = null;
		Workbook workbook = null;
		
		try{
			fos = new ByteArrayOutputStream();
			book = workbook.createWorkbook(fos); 	
			int totalRow = adjEmployeeColl.getRowCount();
			int pageNum = totalRow/10000;
			int perNum = 10000;
			if(pageNum == 1){
				perNum = totalRow;
			}
			
			for(int k=0; k < pageNum+1; k++){				
				WritableSheet sheet=book.createSheet("第"+k+1+"页",k); 
				sheet.addCell(new Label(0,k,"地市名称"));
				sheet.addCell(new Label(1,k,"地市编码"));						
				sheet.addCell(new Label(2,k,"归属区域"));
				sheet.addCell(new Label(3,k,"归属部门"));
				sheet.addCell(new Label(4,k,"职员编号"));
				sheet.addCell(new Label(5,k,"工号"));
				sheet.addCell(new Label(6,k,"姓名"));
				sheet.addCell(new Label(7,k,"微调方式"));
				sheet.addCell(new Label(8,k,"菜单编号"));
				sheet.addCell(new Label(9,k,"菜单名称"));
				sheet.addCell(new Label(10,k,"上级菜单编号"));
				int startRow = (pageNum - 1)*k*10000;
				int endRow = startRow + perNum;
				if(k == pageNum){
					endRow = totalRow;
				}
				for(int i=startRow; i < endRow; i++){
					AdjEmployeeVO adjEmployeeVO = adjEmployeeColl.getAdjEmployee(i);
					sheet.addCell(new Label(0,i+1,adjEmployeeVO.getCityName())); 
					sheet.addCell(new Label(1,i+1,adjEmployeeVO.getCityCode()));
					sheet.addCell(new Label(2,i+1,adjEmployeeVO.getAreaName() ));
					sheet.addCell(new Label(3,i+1,adjEmployeeVO.getOrganName() ));
					sheet.addCell(new Label(4,i+1,adjEmployeeVO.getEmployeeId() ));				
					sheet.addCell(new Label(5,i+1,adjEmployeeVO.getWorkNo() ));				
					sheet.addCell(new Label(6,i+1,adjEmployeeVO.getEmployeeName()));				
					sheet.addCell(new Label(7,i+1,adjEmployeeVO.getAdjustMethod()));//是否存在微调
					sheet.addCell(new Label(8,i+1,adjEmployeeVO.getMenuId()));
					sheet.addCell(new Label(9,i+1,adjEmployeeVO.getMenuName()));
					sheet.addCell(new Label(10,i+1,adjEmployeeVO.getParentMenuId()));
				}
			}
			adjEmployeeColl = null;
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
	private boolean haveSearchOptionForExport(HttpServletRequest request){
		boolean have = true;
        String cWorkNo = request.getParameter("f_work_no");
        String cEmployeeId = request.getParameter("f_employee_id");
        String cEmployeeName = request.getParameter("f_employee_name");
        String cDutyId = request.getParameter("f_dutyId");
        String cAdminType = request.getParameter("f_admin_type");
        String cStatus = request.getParameter("f_status");
        String cRoleId = request.getParameter("s_role_id");
        String pwdUpdateDateBegin = request.getParameter("pwdUpdateDateBegin");
        String pwdUpdateDateEnd = request.getParameter("pwdUpdateDateEnd");        
        if( isEmpty(cWorkNo) && isEmpty(cEmployeeId)&& isEmpty(cEmployeeName)&& isEmpty(cDutyId)
        		&& isEmpty(cAdminType)&& isEmpty(cStatus)&& isEmpty(cRoleId)
        		&& isEmpty(pwdUpdateDateBegin)&& isEmpty(pwdUpdateDateEnd) ){
        	have = false;
        }
        
		return have;
	}
	private PowerLogColl getPowerLogMap(HttpServletRequest request, EmployeeRoleRelationColl coll){
		PowerLogColl logColl = new PowerLogColl();
		AuthorizeVO authVO =  getAuthorize(request);
		String areaId = authVO.getAreaId();
		String authId = authVO.getEmployeeId();
		for(int i=0; i < coll.getRowCount();i++){
			PowerLogVO logVO = new PowerLogVO();
			EmployeeRoleRelationVO vo = coll.getEmployeeRoleRelation(i);
			logVO.setAreaId(areaId);
			logVO.setEmployeeId(authId);
			logVO.setOperType(0);
			logVO.setOperObj(vo.getEmployeeId());
			logVO.setPowerId(String.valueOf(vo.getRoleId()));
			logVO.setNote("赋予角色");
			logColl.addPowerLog(logVO);
		}
		return logColl;
	}
}
