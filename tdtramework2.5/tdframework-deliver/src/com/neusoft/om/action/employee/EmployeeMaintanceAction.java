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
 * <p> �޸���ʷ</p>
 * <p>  ���		����		�޸���			�޸�ԭ��</p>
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
			//������Ϣ
			OMDictionaryBOInterface omdictionary = (OMDictionaryBOInterface)getBaseService().getServiceFacade("omDictionaryFacade");		
			ParamObjectCollection genderColl = omdictionary.getGenderColl();//�Ա�
			ParamObjectCollection educateLevelColl = omdictionary.getEducateLevelColl();//�����̶�
			ParamObjectCollection busDutyColl = omdictionary.getBusDutyColl();//ְλ
			request.setAttribute("GenderColl",genderColl);
			request.setAttribute("EducateLevelColl",educateLevelColl);
			request.setAttribute("BusDutyColl",busDutyColl);

			request.setAttribute("ActionName", ACTION_NAME);
			request.setAttribute("OperType", operType);
			//���ݲ�ͬ�Ĵ������ͬ�ķ���
			if(operType.equals("init")){
                // ������ʼ��                
				return addPageInit(mapping,request,response);
			}
            else if(operType.equals("search")){
                // ����
                return doSearchEmployee(mapping,request,response);
            }
			else if(operType.equals("query")){
                // �鿴��ϸ��Ϣ
				return getEmployeeInfo(mapping,request,response);
			}
			else if(operType.equals("modifyInit")){
                //��ʼ���޸�ҳ��
				return modifyPageInit(mapping,request,response);
			}
			else if(operType.equals("add")){	
                // �½�ְԱ
				return doAddEmployeeInfo(mapping,request,response);
			}
			else if(operType.equals("modify")){
                //�޸�
				return doModifyEmployeeInfo(mapping,request,response);
			}
			else if(operType.equals("delete")){
                // ɾ��
				return doDeleteEmployeeInfo(mapping,request,response);
			}
            else if (operType.equals("renewpwd")){
                // ��������ҳ���ʼ��
                return getResetPasswordInit(mapping,request,response);
            }
            else if (operType.equals("resetPassword")) {
            	// ��������
                return resetPassword(mapping,request,response);
            }
            else if(operType.equals("makeDutyInit")){
                // ���ܽ�ɫ��Ȩҳ���ʼ��
                return doMakeDutyInit(mapping,request,response);
            }
            else if(operType.equals("makeDuty")){
                // ���ܽ�ɫ��Ȩ
                return doMakeDuty(mapping,request,response);
            }
            else if(operType.equals("makeParamDutyInit")){
                // ���ݽ�ɫ��Ȩҳ���ʼ��
                return doMakeParamDutyInit(mapping,request,response);
            }
            else if(operType.equals("makeParamDuty")){
                // ���ݽ�ɫ��Ȩ
                return doMakeParamDuty(mapping,request,response);
            }
            else if("powerAdjust".equals(operType)){
            	//����Ȩ��΢��
            	return powerAdjust(mapping,request,response);
            }
            else if("cancelInch".equals(operType)){
            	//ȡ��΢��
            	return cancelInch(mapping,request,response);
            }
            else if(operType.equals("showPermission")){
                // �鿴Ȩ��
                return doShowPermission(mapping,request,response);
            }
            else if (operType.equals("showParamPower")){
                // 
                return showParamPower(mapping,request,response);
            }
            else if(operType.equals("showPower")){
                // �鿴Ȩ��
                return doShowPower(mapping,request,response);
            }
            else if(operType.equals("openChildPage")) {
    	    	//չ�������˵�
      	    	return openChildPage(mapping,request,response);
      	    }
            else if(operType.equals("changeOnSelect")){
                // �ֲ�ˢ�£���̬�ı������б��ֵ
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
                     message = "ʧ��!" + e.getMessage();
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
                     message = "ʧ��!" + e.getMessage();
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
     * �鿴Ȩ��ҳ����ת��ѡ����Ȩ��΢�����ǲ鿴Ȩ��
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
                     message = "ʧ��!" + e.getMessage();
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
        //�����ҪcheckBox˵����Ȩ��΢��
        if(needCheckBox.equals("true")){
        	request.setAttribute("operType","showAdjustPowerInit");
        	request.setAttribute("title","oper");
        }else{//����˵���ǲ鿴Ȩ��
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
     * �鿴Ȩ��
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
        SystemColl sysColl = sysDao.getSystemInfoByEmployeeId(employeeId);//����һ���Ͷ�����ϵͳ
        if(employeeMenuColl.getRowCount()<=0 && sysColl.getRowCount()<=0){
        	message = "����Ա��ʱû���κ�Ȩ��";
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
     * Ȩ��΢��
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
        
        MenuColl adminMenuColl = menuDao.getAssignableFirstLevelMenuColl(adminId);//��ǰ����Ա�ɷ���Ĳ˵�����
        MenuColl employeeMenuColl = menuDao.getUsableMenuCollByEmpId(employeeId,"true");//��ǰ������ְԱ���Կ����Ĳ˵�����
        List  menuList = menuDao.getAdjustMenuColl(employeeId);//ѡ�еĲ���Ա�Ѿ����ڵ�΢������
        SystemColl sysColl = sysDao.getAdminSystemInfoByEmployeeId(adminId);//��ǰ����Ա�ɷ���Ĳ˵�������ϵͳ���ϣ�����һ���Ͷ�����ϵͳ
        if(employeeMenuColl.getRowCount()<=0 && sysColl.getRowCount()<=0){
        	message = "��������Ϊ�����˸�Ȩ��Ȩ��";
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
    /**��ɫ��Ȩ����չ���ӽڵ�˵���
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
        	message = "��ȡ�˵��ڵ�ʱ����";
        	return mapping.findForward("openChildPage");
        }else{
        	ifSystemId = menuDao.getInfoByNodeId(nodeId);
        }
        if(employeeId == null || employeeId.equals("")){
        	message = "��ȡְԱ��Ϣʱ����";
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
     * Ȩ��΢���ύ
     * @param mapping
     * @param request
     * @param response
     * @return
     */
    private ActionForward doAdjustPower(ActionMapping mapping, HttpServletRequest request, HttpServletResponse response){
    	String message = "Ȩ��΢���ɹ�";
    	
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
    	//��Ȩ�޸ĵ�ϵͳ�˵�
        String opNodeId = request.getParameter("nodeId");
        boolean ifSystemId = true;
        if(opNodeId==null || opNodeId.trim().equals("")){
        	message = "��ȡ�˵��ڵ�ʱ����";
        	return mapping.findForward("openChildPage");
        }else{
        	ifSystemId = menuDao.getInfoByNodeId(opNodeId);
        }
        
        //�õ���ҳ�洫�ݹ�����ѡ�в˵�����;
    	String[]  treeNodes = request.getParameterValues("checked_node_"+treeName);
    	//ԭ�˵�����
        MenuColl oldMenuColl = menuDao.getUsableMenuCollByEmpId(employeeId,opNodeId,ifSystemId);
        //ѡ�еĲ˵�����ϵͳ����
    	MenuColl menuColl = new MenuColl();
    	SystemColl sysColl = new SystemColl();
    	
    	//����,�õ�ѡ�е���ϵͳ�Ͳ˵�����,����Լ���Ĺ���,�˵�������ϵͳ���벻������ظ�,��ʱû�п��ǳ����ظ������
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

    	//���˵õ���ѡ�еĲ˵�����    	
    	PowerAdjustColl powerAdjColl = new PowerAdjustColl();
    	PowerAdjustColl newAddAdjColl = new PowerAdjustColl();
    	String logAddMenu = "";
    	for(int i = 0; i < menuColl.getRowCount(); i ++){
    		MenuVO menuVO = menuColl.getMenu(i);
    		if(!contain(oldMenuColl, menuVO)){//����ɼ����в�����ĳ�˵�,�������ӵ�Ȩ��΢��������������
    			PowerAdjustVO powerAdjVO = new PowerAdjustVO();
    			powerAdjVO.setAdminAdjust(1);//����Ȩ��
    			powerAdjVO.setEmployeeId(employeeId);
    			powerAdjVO.setExecAdjust(1);//����Ȩ��
    			powerAdjVO.setMenuId(menuVO.getMenuId());
    			powerAdjVO.setSystemId(menuVO.getSystemId());
    			powerAdjColl.addPowerAdjustVO(powerAdjVO);
    			newAddAdjColl.addElement(powerAdjVO.getMenuId(), powerAdjVO);
    			logAddMenu +=menuVO.getMenuId()+"_"+menuVO.getMenuName()+";";
    		}
    	}
    	
    	//�õ�ԭ�˵������д��ڣ���ȥ���Ĳ˵�
    	PowerAdjustColl delPowerAdjColl = new PowerAdjustColl();
    	PowerAdjustColl newDelAdjColl = new PowerAdjustColl();
    	String logDelMenu = "";
    	for(int i =0; i<oldMenuColl.getRowCount(); i++){
    		MenuVO oldMenuVO = oldMenuColl.getMenu(i);
    		if(menuColl.getMenu(oldMenuVO.getMenuId()) == null){//���ԭ�����е�ĳ���˵����Ĳ˵������в����ڣ���ԭ��������ɾ��
    			PowerAdjustVO delPowerAdjVO = new PowerAdjustVO();
    			delPowerAdjVO.setAdminAdjust(2);//����Ȩ��
    			delPowerAdjVO.setEmployeeId(employeeId);
    			delPowerAdjVO.setExecAdjust(2);
    			delPowerAdjVO.setMenuId(oldMenuVO.getMenuId());
    			delPowerAdjVO.setSystemId(oldMenuVO.getSystemId());
    			delPowerAdjColl.addPowerAdjustVO(delPowerAdjVO);
    			newDelAdjColl.addElement(delPowerAdjVO.getMenuId(), delPowerAdjVO);
    			logDelMenu += oldMenuVO.getMenuId()+"_"+oldMenuVO.getMenuName()+";";
    		}
    	}
    	
    	//��Ȩ��΢����Ϣ���浽Ȩ��΢������    	
    	//�����ж�΢��ʱ�����ĺ�ȥ���Ĳ˵����Ƿ�������΢�����Ĳ˵�,��Ҫ�Ƚ��ⲿ������ɾ��,��֤���ݿ���ֻ�������һ��Ȩ��΢���Ľ��
    	PowerAdjustColl empHasAdjColl = powerAdjustDao.getPowerAdjustCollByEmpId(employeeId);
    	PowerAdjustColl overlapAdjColl = new PowerAdjustColl(); //��ְԱ����΢�����Ĳ˵�����      	
    	
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
    		message = "Ȩ��΢��ʧ��";
    	}
        /** д��־ */
    	AuthorizeVO authvo = (AuthorizeVO) request.getSession().getAttribute(GlobalParameters.SESSION_INFO);
        EmployeeVO empVO = employeeDAO.getEmployeeInfoById(employeeId);
		String desc = "��¼�ʺ�Ϊ:"+authvo.getWorkNo()+"�Ĳ���Ա��Ϊ���ţ�"+empVO.getEmployeeName() + "���й���Ȩ��΢����";
		if(!logAddMenu.trim().equals("")){
			desc+= "����Ȩ�ޣ�"+logAddMenu+"��";
		}
		if(!logDelMenu.trim().equals("")){
			desc+= "����Ȩ�ޣ�"+logDelMenu;
		}	

		DBLogger logbo = (DBLogger)getDBLogger();
		HashMap logMap = getLogMap(request,POWER_ADJUST_BUTTON_ID,desc);
		try{
			logbo.doAddLogInfoByProc(logMap);
			// ��¼��ϸ΢����Ϣ��־
			int powerLog = switchDAO.getPowerLog();
			if(powerLog == 1){
				String authId = authvo.getEmployeeId();
				String areaId = authvo.getAreaId();
				PowerLogColl addLogColl = getPowerLogColl(powerAdjColl,authId,areaId,"΢��-����Ȩ��");
				powerLogDAO.doAddPowerLog(addLogColl);
				PowerLogColl delAddColl = getPowerLogColl(delPowerAdjColl,authId,areaId,"΢��-����Ȩ��");
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
     * ����ְԱ��Ϣ
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
        	message = "��ѯ��ʧ��!"+e.getMessage();            
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
	 * ��ʼ��ҳ��,����ְԱ��Ϣ���д���,���ݴ����organId,belongAreaId"��Ϣ��ʼ������������
	 * @param mapping
	 * @param request
	 * @param response
	 * @return
	 */
	private ActionForward addPageInit(ActionMapping mapping,
						HttpServletRequest request,
						HttpServletResponse response) {      
		String message = "";
		//��ҳ��õ���������Ϣ
		//boolean pageRight = PageCheck.ifHaveRight(request,"041AA");
		String organKind = request.getParameter("OrganKind"); //��ǰ�������
		String organId = request.getParameter("OrganId"); //��ǰ��֯����Id
		String dealerId = request.getParameter("DealerId");
		String belongArea = request.getParameter("BelongArea"); //��ǰ��֯������������Ϣ
		String comeFrom = request.getParameter("comefrom"); // �ж��Ƿ������ҳ��������

		//��ǰ����Ա������Ϣ
		AuthorizeVO authvo = getAuthorize(request);
		OMDictionaryBOInterface omdictionary = (OMDictionaryBOInterface)getBaseService().getServiceFacade("omDictionaryFacade");
		InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");
        
		//�õ���ǰ��Ҫ����֯������������(��ǰ���Ϊ����)
        ParamObjectCollection organColl = omdictionary.getOrganCollByAreaId(belongArea);
        if (organId == null || organId.intern() == "".intern()) {
        	if (organColl != null && organColl.getRowCount() != 0) {
            	organId = organColl.getParamObjectByIndex(0).getId();       		
        	} else {
        		message = "��������û����֯�������������ӹ��ţ�";
        		request.setAttribute("Message",message);
        		return mapping.findForward("employeeAddinit");	
        	}
        }
		ParamObjectCollection incomeColl = omdictionary.getIncomeColl();
		ParamObjectCollection marriageStatusColl  = omdictionary.getMarriageStatusColl();
		ParamObjectCollection organEmployeeColl = omdictionary.getOrganEmployeeColl(organId,null);
        ParamObjectCollection dutyParamColl = omdictionary.getDutyColl(organId);
        //�õ���ǰ��Ҫ�ĵ�����������Ϣ
        ParamObjectCollection areaColl = omdictionary.getAreaCollByAreaId(belongArea);
        //���ְλ�б�
        ParamObjectCollection busDutyColl = omdictionary.getBusDutyColl();
        //����û������б�
        ParamObjectCollection personLevelColl = omdictionary.getPersonLevelColl();        
        
        SwitchDAO switchDao = (SwitchDAO) factory.getInteractionObject("switchDAO", appContext);
        PwdValidDAO pwdDAO = (PwdValidDAO) factory.getInteractionObject("pwdValidDAO", appContext);
        OmSwitchDAO omSwitchDAO = (OmSwitchDAO)factory.getInteractionObject("omSwitchDAO", appContext);
        EmployeeDAO employeeDAO = (EmployeeDAO)factory.getInteractionObject("employeeDAO", appContext);
        AreaDAO areaDAO = (AreaDAO)factory.getInteractionObject("areaDAO", appContext);
        OMDictionaryDAO dictionaryDAO = (OMDictionaryDAO)factory.getInteractionObject("omDictionaryDAO", appContext);
        OmQueryBO dealerService =(OmQueryBO)getServiceFacade("omQueryBOInterface");
//      ��ò��������б�
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
        //�õ��������ò���
        PwdValidVO pwdVO = pwdDAO.getAllPwdValidInfo();
        int pwdMinLength = pwdVO.getPwdMinLength();
        int pwdMaxLength = pwdVO.getPwdMaxLength();
        Vector empReq = employeeDAO.getEmpReqVector();
        boolean ifAutoWorkNo = omSwitchDAO.getIfAutoWorkNo();//�õ��Ƿ��Զ����ɹ�������
        boolean needCitySortName = omSwitchDAO.getIfNeedCityShortName();
        boolean needEmpName = omSwitchDAO.getIfNeedEmpName();
        String cityCode = areaDAO.getAreaById(belongArea).getCityCode();
        String autoWorkNo = "";
        if(ifAutoWorkNo){ //�����Ҫ�Զ����ɹ��ţ���õ����Ų��ŵ�request��
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
	 * ����ְԱId��ְԱ��Ϣ��ʾ��ҳ��
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
		EmployeeVO employeeVO = null;     //ְԱ��Ϣ
		//ְ����Ϣ �õ�ְԱ��ְ����Ϣ�б�
		EmployeeDutyRelationColl employeeDutyRelationColl = null;
		//ְԱ���еĽ�ɫ�б� �õ�ְԱ������Ľ�ɫ��Ϣ�б���ְԱ��ɫ��ϵ�б�
		OwnAndAssignedRoleDispColl ownAndAssignedRoleDispColl = null;
		
		EmployeeManagementBO service =(EmployeeManagementBO)getBaseService().getServiceFacade(EmployeeManagementBO.BEAN); 
		
		try {
			employeeVO = service.getEmployeeByEmployeeId(employeeId);
			
			OMDictionaryBOInterface omdictionary = (OMDictionaryBOInterface)getBaseService().getServiceFacade("omDictionaryFacade");
			//����
			ParamObjectCollection incomeColl = omdictionary.getIncomeColl();
			//����״��
			ParamObjectCollection marriageStatusColl  = omdictionary.getMarriageStatusColl();
			//�ϼ���Ϣ
			ParamObjectCollection organEmployeeColl = omdictionary.getOrganEmployeeColl(employeeVO.getOrganId(),employeeVO.getEmployeeId());
			//ְ��
		    ParamObjectCollection dutyParamColl = omdictionary.getDutyColl(employeeVO.getOrganId());
		    //���ְλ�б�
		    ParamObjectCollection busDutyColl = omdictionary.getBusDutyColl();
		    //����û������б�
		    ParamObjectCollection personLevelColl = omdictionary.getPersonLevelColl();
		    
			//ְ����Ϣ �õ�ְԱ��ְ����Ϣ�б�
			employeeDutyRelationColl = service.getEmployeeDutyRelationInfoByEmployeeId(employeeId);
		    //ְԱ���еĽ�ɫ�б� �õ�ְԱ������Ľ�ɫ��Ϣ�б���ְԱ��ɫ��ϵ�б�
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
		
		//������Ϣ	
		request.setAttribute("Message",message);
		request.setAttribute("ownerName",ownerName);
		request.setAttribute("dealerName",dealerName);
		request.setAttribute("operId",operId);
		
		return mapping.findForward("employeeMaintance");
	}
	/**
	 * ����ְԱId����ʼ��ְԱ�޸�ҳ��
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
		EmployeeVO employeeVO = null;     //ְԱ��Ϣ    
		
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
			//����
			ParamObjectCollection incomeColl = omdictionary.getIncomeColl();
			//����״��
			ParamObjectCollection marriageStatusColl  = omdictionary.getMarriageStatusColl();
			//�ϼ���Ϣ
			ParamObjectCollection organEmployeeColl = omdictionary.getOrganEmployeeColl(employeeVO.getOrganId(),employeeVO.getEmployeeId());
			//ְ��
	        ParamObjectCollection dutyParamColl = omdictionary.getDutyColl(employeeVO.getOrganId());
	        //���ְλ�б�
	        ParamObjectCollection busDutyColl = omdictionary.getBusDutyColl();
	        //����û������б�
	        ParamObjectCollection personLevelColl = omdictionary.getPersonLevelColl();
//		      ����û������б�
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
		
		//������Ϣ	
		request.setAttribute("Message",message);
		request.setAttribute("ownerName",ownerName);
		request.setAttribute("dealerName",dealerName);
		request.setAttribute("operId",operId);
		
		int canDel = 0;
		if(needProductCheck())
		{
	        EmployeeDAO empDAO = (EmployeeDAO) factory.getInteractionObject("employeeDAO", appContext);
            canDel = empDAO.checkOrgan(employeeId,2);// 1�����ţ�2:ְԱ ����0:����ɾ�� 1��������ɾ��
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
	 * ����һ��ְԱ
	 * @param mapping
	 * @param request
	 * @param response
	 * @return
	 */
	private ActionForward doAddEmployeeInfo(ActionMapping mapping,
							HttpServletRequest request,
							HttpServletResponse response) {
		AuthorizeVO authvo = (AuthorizeVO) request.getSession().getAttribute(GlobalParameters.SESSION_INFO);
		String message = "���ӳɹ�!";
		String operFlag = "1"; //�ɹ���ʶ
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
		//׼��vo
		EmployeeVO vo = new EmployeeVO();
		HashMap mapData = HttpObjectUtil.getRequestParams(request);
		HashMap map = getLogInfo(request);
		String dealerId =  NullProcessUtil.nvlToString(mapData.get("dealerId"),"");		
		vo.setAttribute(mapData);
		com.neusoft.crm.channel.outInterface.om.data.DealerVO dealerVO = new com.neusoft.crm.channel.outInterface.om.data.DealerVO();	
		boolean needDealer = omSwitchDAO.getIfNeedDealer();
		boolean haveParty = omSwitchDAO.getIfHaveParty();//�жϴ���Ŀ���Ƿ��õ���������صı�
		try{
			if(needDealer && dealerId!=null && !dealerId.trim().equals("")&& !dealerId.trim().equals("null")){
				dealerVO = dealerService.doGetDealerByDealer(dealerId);
				vo.setAreaId(dealerVO.getRegion_code());
			}else{
				vo.setDealerId("");
			}
			/**** Ϊ������Ա���������� �ṩ����������employeeId���ɹ�������employeeId ****/
			long code = service.doAddEmployeeInfo(vo,map);
			/**** Ϊ������Ա���������� �ṩ����������employeeId���ɹ�������employeeId ****/
			

			if(haveParty){
				/******************** ���ӿ����Ӳ�������Ϣ *************************/
				com.neusoft.crm.custmgr.common.outerinterface.partymgr.data.PartyVO partyVO = new 
				com.neusoft.crm.custmgr.common.outerinterface.partymgr.data.PartyVO();
				partyVO.setPartyName(vo.getEmployeeName());
				partyVO.setPartyType("0"); // 0������
				partyVO.setStatusCd("10"); // 10:��Ч
				partyVO.setRoleType("12"); //Ա����ɫ
				long partyId = partyService.doInsertParty(partyVO);
				
				if (partyId != -1) {
					com.neusoft.crm.custmgr.common.outerinterface.partymgr.data.PartyContactVO partyContactVO = new
					com.neusoft.crm.custmgr.common.outerinterface.partymgr.data.PartyContactVO();
					partyContactVO.setPartyId(partyId);
					int gender = vo.getGender();
					String strGender = "2"; // 0���� 1��Ů 2��δ֪   Ĭ��Ϊδ֪
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
			
			/******************** ���ӿ����Ӳ�������Ϣ *************************/
				
				// ���ò�������Ϣ�ӿڷ���ֵ=-1��˵�����ýӿ�������������Ϣʧ��
				if (partyId != -1) {
					service.doUpdatePartyId(String.valueOf(code), String.valueOf(partyId));				
					request.setAttribute("newEmployeeId", String.valueOf(code));
					
					/** д��־ */
					String desc = "��¼�ʺ�Ϊ:"+authvo.getWorkNo()+"�Ĳ���Ա����ְԱ��ְԱ��ţ�"+vo.getEmployeeId()+"��ְԱ������"+vo.getEmployeeName() + "����¼�ʺţ�" + vo.getWorkNo();
					DBLogger logbo = (DBLogger)getDBLogger();
					HashMap logMap = getLogMap(request,ADD_SAVE_BUTTON_ID,desc);
					logbo.doAddLogInfoByProc(logMap);		              
				}
			}else{
				request.setAttribute("newEmployeeId", String.valueOf(code));
				
				/** д��־ */
				String desc = "��¼�ʺ�Ϊ:"+authvo.getWorkNo()+"�Ĳ���Ա����ְԱ��ְԱ��ţ�"+vo.getEmployeeId()+"��ְԱ������"+vo.getEmployeeName() + "����¼�ʺţ�" + vo.getWorkNo();
				DBLogger logbo = (DBLogger)getDBLogger();
				HashMap logMap = getLogMap(request,ADD_SAVE_BUTTON_ID,desc);
				logbo.doAddLogInfoByProc(logMap);
			}


		}catch(ServiceException e) {
			operFlag = "0";//ʧ��
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeMaintanceAction--doAddEmployeeInfo:"+e.getMessage());
			message = "����ʧ��!"+ e.getMessage();
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
	 * �޸�һ��ְԱ
	 * @param mapping
	 * @param request
	 * @param response
	 * @return
	 */	
	private ActionForward doModifyEmployeeInfo(ActionMapping mapping,
						HttpServletRequest request,
						HttpServletResponse response) {
		AuthorizeVO authvo = (AuthorizeVO) request.getSession().getAttribute(GlobalParameters.SESSION_INFO);
        String operFlag = "1";//�ɹ�
		String message = "�޸ĳɹ�!";
		
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
        //׼��vo
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
				//�õ���������ʵ����
				if(dealerId != null && ! dealerId.equals("")){
					com.neusoft.crm.channel.outInterface.om.data.DealerVO dealerVO = new com.neusoft.crm.channel.outInterface.om.data.DealerVO();
					dealerVO = dealerService.doGetDealerByDealer(dealerId);
					vo.setAreaId(dealerVO.getRegion_code());//���ְԱ������������ְԱ����������Ҫ����Ϊ��������������
				}
				
			}else{
				vo.setDealerId("");
				String newAreaId = organDAO.getOrganInfoById(vo.getOrganId()).getAreaId();
				vo.setAreaId(newAreaId);
			}
			EmployeeVO oldVO = empDAO.getEmployeeInfoById(vo.getEmployeeId());
			service.doModifyEmployeeInfo(vo,oldOrganId,oldDutyId,map);
            /** д��־ */
			String desc = "��¼�ʺ�Ϊ:"+authvo.getWorkNo()+"�Ĳ���Ա���޸�ְԱ��Ϣ��ְԱ��ţ�"+vo.getEmployeeId()+"��ְԱ����:"+vo.getEmployeeName() + "����¼�ʺţ�" + vo.getWorkNo();
			if(!dealerId.equals(oldDealerId)){
				desc = desc+";ְԱ������"+oldDealerId+"��Ϊ"+dealerId;
			}
			
			int oldStatus = oldVO.getStatus();
			int newStatus = vo.getStatus();
			if(oldStatus != newStatus){
				if(newStatus == 0){
					desc = desc + ";ְԱ״̬��Ϊ��Ч";
				}else{
					desc = desc + ";ְԱ״̬��ΪʧЧ";
				}
			}
			DBLogger logbo = (DBLogger)getDBLogger();
			HashMap logMap = getLogMap(request,ADD_SAVE_BUTTON_ID,desc);
			logbo.doAddLogInfoByProc(logMap);	
		}catch(ServiceException e) {
			operFlag = "0";
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeMaintanceAction--doModifyEmployeeInfo:"+e.getMessage());
			message = "�޸�ʧ��!"+e.getMessage();
		}
        /** ������벻Ϊ��, �޸����� */
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
                message = "�޸�����ʧ��!"+e.getMessage();
            }
        }
		if(operFlag.intern()== "1".intern()){
			request.setAttribute("OldOrganId",oldOrganId);//�޸ĳɹ�д��ֵ,�޸�ʧ��д��ֵ
			request.setAttribute("OldDutyId",String.valueOf(oldDutyId));//�޸ĳɹ�д��ֵ,�޸�ʧ��д��ֵ
            request.setAttribute("AreaId", String.valueOf(vo.getAreaId()));
            request.setAttribute("EmployeeId", String.valueOf(vo.getEmployeeId()));
		}else{
			request.setAttribute("OldOrganId",vo.getOrganId());//�޸ĳɹ�д��ֵ,�޸�ʧ��д��ֵ
			request.setAttribute("OldDutyId",String.valueOf(vo.getDutyId()));//�޸ĳɹ�д��ֵ,�޸�ʧ��д��ֵ
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
	 * ɾ��һ��ְԱ
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
		String message = "ɾ���ɹ�!";
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
	            int canDel = empDAO.checkOrgan(employeeId,2);// 1�����ţ�2:ְԱ
	            if(canDel == 1){ //���й�����û�д�������ɾ����Ҳ���ܱ�Ϊ��Ч
	            	message = "��ְԱ���й�����û�д�������ɾ��";
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
            /** д��־ */
			 String desc = "��¼�ʺ�Ϊ:"+authvo.getWorkNo()+"�Ĳ���Ա��ɾ��ְԱ��Ϣ��ְԱ��ţ�"+employeeId + "����¼�ʺţ�" + vo.getWorkNo();
			 DBLogger logbo = (DBLogger)getDBLogger();
			 HashMap logMap = getLogMap(request,DELETE_BUTTON_ID,desc);
			 logbo.doAddLogInfoByProc(logMap);
		}catch(ServiceException e) {
			operFlag = "0";
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeMaintanceAction--doDeleteEmployeeInfo:"+e.getMessage());
			message = "ɾ��ʧ��!" + e.getMessage();
		}
		request.setAttribute("Message",message);
		request.setAttribute("OperType","delete");
		request.setAttribute("OperFlag",operFlag);
		int canDel = 0;
		if(needProductCheck())
		{
            
            canDel = empDAO.checkOrgan(employeeId,2);// 1�����ţ�2:ְԱ
		}
		request.setAttribute("canDel", String.valueOf(canDel));
		return mapping.findForward("employeeresult");	
	}
    /**
     * �����ʼ��
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
        String message = "����ָ��ɹ�!";
        EmployeeManagementBO service =(EmployeeManagementBO)getBaseService().getServiceFacade("employeeManagementFacade");
        try{
            result = service.doRenewPassWord(workNo);
            code = Integer.parseInt(String.valueOf(result.get("code")));
            newPwd = String.valueOf(result.get("workPwd"));
            message += "������Ϊ��" + newPwd;
            //doLog(request, "�����ʼ��");
			String desc = "��¼�ʺ�Ϊ:"+authvo.getWorkNo()+"�Ĳ���Ա��Ϊ��½�˺�Ϊ:"+workNo+"��ְԱ�����������ʼ��";
			DBLogger logbo = (DBLogger)getDBLogger();
			HashMap logMap = getLogMap(request,RENEW_PWD_BUTTON_ID,desc);
			logbo.doAddLogInfoByProc(logMap);
        }catch(ServiceException e) {
            code = 0;
            SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeMaintanceAction--doRenewPassword:"+e.getMessage());
            message = "����ָ�ʧ��!" + e.getMessage();
        }
        request.setAttribute("Message",message);
        request.setAttribute("OperType","renewPwd");
        request.setAttribute("OperFlag",String.valueOf(code));
        return mapping.findForward("employeeresult");   
    }
    
    /**
     * ��ʼ����������ҳ��
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
        	message = "ѡ��Ĺ�����Ϣ�ѱ�ɾ��";
        }
        request.setAttribute("employeeVO", vo);
		request.setAttribute("message", message);
        
		return mapping.findForward("resetPasswordInit");   
    }
    
    /**
     * ��������
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
        String message = "�������óɹ�";
        String operType = "save";
                
        if (password == null || password.intern() == "".intern()) {
        	password = "111111"; // δ�������룬Ĭ��Ϊ111111
        }
        
        // ����
        password = PassWord.encode(password);
        
        try {
        	vo = employeeDAO.getEmployeeInfoByWorkNo(workNo);
        	if (vo != null) {
        		code = employeeDAO.doPasswordUpdate(workNo, password);        		
        	} else {
        		message = "�ù����ѱ�ɾ��";
        		operType = "error";
        		vo = new EmployeeVO();
        	}
        } catch (DataAccessException e) {
        	operType = "error";
        	message = "��������ʧ�ܣ�" + e.getMessage().replaceAll("\"","'").replaceAll("\n"," ");        	
        }
        
        /** д��־ */
		AuthorizeVO authVO = AuthorizeUtil.getAuthorize(request);			 

		if(operType.equals("save")){
		 String desc = "���š�"+ workNo +"���������óɹ�,�����ߵ�½�˺�:"+authVO.getWorkNo();
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
     * ���ݽ�ɫ��Ȩ-ҳ���ʼ��
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
                     message = "ʧ��!" + e.getMessage();
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
            message = "ʧ��!" + e.getMessage();
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
        String message = "��Ȩ�ɹ�";
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
            // ɾ�����н�ɫ
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
            message = "��Ȩʧ��!" + e.getMessage();
        }
        request.setAttribute("OperFlag",String.valueOf(flag));
        request.setAttribute("Message",message);
        request.setAttribute("OperType", "makeParamDuty");
        return mapping.findForward("employeeresult");
    }
    /**
     * ���ܽ�ɫ��Ȩ-ҳ���ʼ��
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
                     message = "ʧ��!" + e.getMessage();
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
            message = "ʧ��!" + e.getMessage();
        }
        GridUtil.getStartEnd(request,employeeRoleColl.getRowCount(),employeeRoleColl.getRowCount(), 1);
        request.setAttribute("Message",message);
        request.setAttribute("employeeId", assignedEmpId);
        request.setAttribute("employeeRoleColl", employeeRoleColl.getList());
        return mapping.findForward("makeDutyInit");
    }
    /**
     * ���ܽ�ɫ��Ȩ
     * @param mapping
     * @param request
     * @param response
     * @return
     */
    private ActionForward doMakeDuty(ActionMapping mapping, HttpServletRequest request, HttpServletResponse response)
    {
        String message = "��Ȩ�ɹ�";
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
            // ɾ�����н�ɫ
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
            /** д��־ */
             EmployeeVO empVO = service.getEmployeeByEmployeeId(employeeId);
			 String desc = "��¼�ʺ�Ϊ:"+authVO.getWorkNo()+"�Ĳ���Ա��Ϊ���ţ�"+empVO.getEmployeeName() + "���й��ܸ�Ȩ�������ɫ��";
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
			  * ��¼��Ȩ����ϸ��־
			  * 
			  */
			 if(powerLog == 1){
				 EmployeeRoleDisplayColl assignRoleColl = service.getAssignDisplayColl( authId, employeeId);
				 PowerLogColl delLogColl = getDeleteColl(assignRoleColl,priColl, employeeRoleRelationColl,authId,areaId);			 
				 PowerLogColl powerLogColl = getPowerLogMap(request,getAddRoleColl(priColl,employeeRoleRelationColl));
				 //��¼ȡ��Ȩ����־
				 powerLogDAO.doAddPowerLog(delLogColl);
				 //��¼��Ȩ��־
				 powerLogDAO.doAddPowerLog(powerLogColl);
			 }

        } catch (ServiceException e)
        {
            SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeMaintanceAction--doRenewPassword:"+e.getMessage());
            message = "��Ȩʧ��!" + e.getMessage();
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
	        	vo.setNote("ȡ��Ȩ��");
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
     * �����б�ĸı䣬�ֲ�ˢ��
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
        // ��htmlд��ҳ��
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
	 * ����Աд�����м�����־
	 */
	
	public HashMap getLogInfo(HttpServletRequest request){
        HashMap map = new HashMap();
		//��ǰ����Ա������Ϣ
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
                message = "��ѯ����ʧ��!"+e.getMessage();            
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
                message = "��ѯְԱIDʧ��!"+e.getMessage();            
            }
            request.setAttribute("Message",message);
            GridUtil.getStartEnd(request,employeeColl.getRowCount(),employeeColl.getRowCount(), 1);
            List empList = employeeColl.getList();
            request.setAttribute("EmployeeList", empList);            
        }
        return mapping.findForward("employeesearchresult");
    }
    /**
     * ְԱ��Ȩ����Ϣ����
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
        SystemColl sysColl = sysDao.getSystemInfoByEmployeeId(employeeId);//����һ���Ͷ�����ϵͳ
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
			
			WritableSheet sheet=book.createSheet("��һҳ",0); 
			sheet.addCell(new Label(0,0,"ְԱ����"));
			sheet.addCell(new Label(1,0,"ְԱ���"));
			sheet.addCell(new Label(2,0,"��¼�ʺ�"));
			sheet.addCell(new Label(3,0,"һ����ϵͳ����"));
			sheet.addCell(new Label(4,0,"������ϵͳ����"));
			sheet.addCell(new Label(5,0,"�˵�����"));
			sheet.addCell(new Label(6,0,"�Ӳ˵�����"));
			sheet.addCell(new Label(7,0,"��ť�������ؼ�"));
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
							position = 3; //һ����ϵͳ
						}else{
							position =4; //������ϵͳ
						}
					}
					if(menuVO != null && !menuVO.getMenuId().trim().equals("")){
						int menuType = menuVO.getMenuType();
						if(menuType == 1 || menuType == 10 || menuType == 6 || menuType == 7){//��С�Ӳ˵� 10:��ҳ�е�frame 6:frame 7: view
							position = 6;
						}else if(menuType == 2 || menuType == 5 ){//�˵� 5: window 
							position = 5;
						}else{//��ť���������
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
	 * ��������Ȩ��ά��
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
        		message = "ȡ��΢����Ϣ�ɹ�";
        		flag = "close";
        	}
        }catch(DataAccessException e){
        	message = "ȡ��΢����Ϣʧ�ܣ�"+e.getMessage();
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
        	message = "����ͬ��������Ϣʧ�ܣ�"+e.getMessage();
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
	 * ����ְԱ�б���Ϣ
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
	 * ����ְԱ΢����Ϣ
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
				
				String codedfilename = URLEncoder.encode("΢����Ϣ.csv","UTF8");
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
				bw.write("��������,���б���,��������,��������,ְԱ���,����,����,΢����ʽ,�˵����,�˵�����,�ϼ��˵�");
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
	 * �õ�����΢����Ϣ��ְԱ����
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
	 * �õ�����ְԱ�б������ְԱ����
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
	 * �õ���ѯ������ɵĹ�����Ϣmap
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
	 * ����ְԱ�б���Ϣ
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
			
			WritableSheet sheet=book.createSheet("��һҳ",0); 
			sheet.addCell(new Label(0,0,"��������"));
			sheet.addCell(new Label(1,0,"���б���"));						
			sheet.addCell(new Label(2,0,"ְԱ���"));
			sheet.addCell(new Label(3,0,"����"));
			sheet.addCell(new Label(4,0,"����"));
			sheet.addCell(new Label(5,0,"��ɫ"));
			//sheet.addCell(new Label(6,0,"��ɫ��"));
			//sheet.addCell(new Label(7,0,"�Ƿ����΢��"));
			sheet.addCell(new Label(6,0,"״̬"));
			sheet.addCell(new Label(7,0,"��������"));
			sheet.addCell(new Label(8,0,"��������"));
			sheet.addCell(new Label(9,0,"�������"));
			sheet.addCell(new Label(10,0,"��������"));

			for(int i=0; i < employeeColl.getRowCount(); i++){
				EmployeeVO empVO = employeeColl.getEmployee(i);
				sheet.addCell(new Label(0,i+1,empVO.getCityName())); 
				sheet.addCell(new Label(1,i+1,empVO.getCityCode()));
				sheet.addCell(new Label(2,i+1,empVO.getEmployeeId()));
				sheet.addCell(new Label(3,i+1,empVO.getEmployeeName()));
				sheet.addCell(new Label(4,i+1,empVO.getWorkNo()));				
				sheet.addCell(new Label(5,i+1,empVO.getAllRoleInfo()));//��ɫ				
//				sheet.addCell(new Label(6,i+1,String.valueOf(empVO.getRoleNum())));//��ɫ��				
//				sheet.addCell(new Label(7,i+1,empVO.getAdjusetPowerDesc()));//�Ƿ����΢��
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
	 * ����ְԱ΢����Ϣ
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
				WritableSheet sheet=book.createSheet("��"+k+1+"ҳ",k); 
				sheet.addCell(new Label(0,k,"��������"));
				sheet.addCell(new Label(1,k,"���б���"));						
				sheet.addCell(new Label(2,k,"��������"));
				sheet.addCell(new Label(3,k,"��������"));
				sheet.addCell(new Label(4,k,"ְԱ���"));
				sheet.addCell(new Label(5,k,"����"));
				sheet.addCell(new Label(6,k,"����"));
				sheet.addCell(new Label(7,k,"΢����ʽ"));
				sheet.addCell(new Label(8,k,"�˵����"));
				sheet.addCell(new Label(9,k,"�˵�����"));
				sheet.addCell(new Label(10,k,"�ϼ��˵����"));
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
					sheet.addCell(new Label(7,i+1,adjEmployeeVO.getAdjustMethod()));//�Ƿ����΢��
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
			logVO.setNote("�����ɫ");
			logColl.addPowerLog(logVO);
		}
		return logColl;
	}
}
