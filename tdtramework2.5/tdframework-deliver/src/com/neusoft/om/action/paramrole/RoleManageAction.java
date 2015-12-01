package com.neusoft.om.action.paramrole;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.om.bo.ParamRoleBO;
import com.neusoft.om.dao.omswitch.OmSwitchDAO;
import com.neusoft.om.dao.paramrole.ParamRoleColl;
import com.neusoft.om.dao.paramrole.ParamRoleDAO;
import com.neusoft.om.dao.paramrole.ParamRoleVO;
import com.neusoft.tdframework.authorization.AuthorizeVO;
import com.neusoft.tdframework.common.GlobalParameters;
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

/*******************************************************************************
 * ������ : RoleManageAction.java 
 * ���� : 2006-7-12
 * ���� : wangwei@neusoft.com 
 * ģ�� : ���� :
 * ��ע :
 * 
 * ------------------------------------------------------------
 * �޸���ʷ ��� ���� �޸���
 * �޸�ԭ�� 1 2
 ******************************************************************************/
public class RoleManageAction extends BaseAction{
	private static String SYSTEM_ID = "41";
	private static String ADD_BUTTON_ID = "041ADX";
	private static String MODIFY_BUTTON_ID = "041ADY";
	private static String DELETE_BUTTON_ID = "041ADZ";
	
    public ActionForward service(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws ActionException
    {
        String operType  = NullProcessUtil.nvlToString(request.getParameter("OperType"), "init").trim();
        if (operType.equals("init")) {
            /** ��ʼ��ҳ�棬������н�ɫ�б� */
            return getParamRoleList(mapping, request, response);
        }
        else if (operType.equals("add")) {
            /** ����һ���½�ɫ */
            return doAddParamRole(mapping, request, response);
        }
        else if (operType.equals("delete")) {
            /** ɾ��һ����ɫ */
            return doDeleteParamRole(mapping, request, response);
        }
        else if (operType.equals("modify")) {
            /** �޸�һ����ɫ */
            return doModifyParamRole(mapping, request, response);
        }
        else if (operType.equals("search")) {
            /** ���� */
            return doSearchParamRole(mapping, request, response);
        }
        else if (operType.equals("initManagePage")) {
            /** ��ʼ����ѯҳ�� */
            return initManagePage(mapping, request, response);
        }
        return null;
    }
    /**
     * ��ʼ����ѯҳ��
     * @param mapping
     * @param request
     * @param response
     * @return
     */
    private ActionForward initManagePage(ActionMapping mapping,
            HttpServletRequest request, HttpServletResponse response){
    	
        return mapping.findForward("initManagePage");
    }
    /**
     * ���Ӳ�����ɫ
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     */
    private ActionForward doAddParamRole(ActionMapping mapping,
            HttpServletRequest request, HttpServletResponse response){
        String message="";
        String roleName = request.getParameter("roleName");
        AuthorizeVO authvo = getAuthorize(request);
        String employeeId = authvo.getEmployeeId();
        ParamRoleBO service = (ParamRoleBO) getBaseService().getServiceFacade(ParamRoleBO.BEAN);
        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");
        ParamRoleDAO paramroleDAO = (ParamRoleDAO) factory.getInteractionObject("paramroleDAO", appContext);
        ParamRoleVO vo = new ParamRoleVO();
        vo.setRoleName(roleName);
        vo.setCreater(employeeId);
        
        try{
        	boolean repeatName = paramroleDAO.haveRepeatName(roleName);
        	if( repeatName ){
        		message = "����������ɫ�����������ӡ�";
        	}else{
                int flag = service.doAddParamRole(vo);
                
                if(flag > 0){
                	message = "������ݽ�ɫ��Ϣ�ɹ�";
                	
                	/** д��־ ***/
    	   			String desc = "�������ݽ�ɫ��"+roleName;
    	   			DBLogger logbo = (DBLogger)getDBLogger();
    	   			HashMap logMap = getLogMap(request,ADD_BUTTON_ID,desc);
    	   			try{
    	   				logbo.doAddLogInfoByProc(logMap);
    	   			}catch(ServiceException e){
    	   			    SysLog.writeLogs("om",GlobalParameters.ERROR,
    	   			    	"RoleManageAction--doAddParamRole():"+e.getMessage());
    	   			    message = "��¼�������ݽ�ɫ��־ʧ��!";	
    	   			}
                }else{
                	message = "������ݽ�ɫ��Ϣʧ��";
                }
        	}
        } catch (ServiceException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,
            	"RoleManageAction--doAddParamRole():"+e.getMessage());
        }
        
        request.setAttribute("OperFlag", "add");
        request.setAttribute("OperMessage", message);
        
        return getParamRoleList(mapping, request, response);
    }

    /**
     * �޸Ĳ�����ɫ
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     */
    private ActionForward doModifyParamRole(ActionMapping mapping,
            HttpServletRequest request, HttpServletResponse response){
        String message = "";
        String roleName = request.getParameter("roleName");
        String roleId = request.getParameter("roleId");
        ParamRoleBO service = (ParamRoleBO) getBaseService().getServiceFacade(ParamRoleBO.BEAN);
        ParamRoleVO vo = new ParamRoleVO();
        vo.setRoleName(roleName);
        vo.setRoleId(Integer.parseInt(roleId));
        
        try{
            int flag = service.doModifyParamRole(vo);
            
            if(flag > 0){
            	message = "�޸����ݽ�ɫ��Ϣ�ɹ�";
            	
            	/** д��־ ***/
	   			String desc = "�޸Ľ�ɫ��"+roleId+"����ɫ���Ʊ��Ϊ��"+roleName;
	   			DBLogger logbo = (DBLogger)getDBLogger();
	   			HashMap logMap = getLogMap(request,MODIFY_BUTTON_ID,desc);
	   			try{
	   				logbo.doAddLogInfoByProc(logMap);
	   			}catch (ServiceException e) {
	   		        SysLog.writeLogs("om",GlobalParameters.ERROR,
	   		        	"RoleManageAction--doModifyParamRole():"+e.getMessage());	
	   			}
            }else{
            	message = "�޸����ݽ�ɫ��Ϣʧ��";
            }
        }catch (ServiceException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,
            	"RoleManageAction--doModifyParamRole():"+e.getMessage());
        }
        
        request.setAttribute("OperFlag", "modify");
        request.setAttribute("OperMessage", message);
        
        return getParamRoleList(mapping, request, response);
    }
    /**
     * ɾ��������ɫ
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     */
    private ActionForward doDeleteParamRole(ActionMapping mapping,
            HttpServletRequest request, HttpServletResponse response){
        String message = "";
        String roleId = request.getParameter("roleId");
        int id = Integer.parseInt(roleId);
        ParamRoleBO service = (ParamRoleBO) getBaseService().getServiceFacade(ParamRoleBO.BEAN);
       
        try{
        	message = service.doDeleteParamRole(id);
        	
        	if(message.equals("true")){
        		message = "ɾ�����ݽ�ɫ�ɹ�";
        		
        		/** д��־ ***/
    			String desc = "ɾ�����ݽ�ɫ��"+roleId;
    			DBLogger logbo = (DBLogger)getDBLogger();
    			HashMap logMap = getLogMap(request,DELETE_BUTTON_ID,desc);
    			try{
    				logbo.doAddLogInfoByProc(logMap);
    			}catch(ServiceException e) {
    		        SysLog.writeLogs("om",GlobalParameters.ERROR,
    		        	"RoleManageAction--doDeleteParamRole():"+e.getMessage());
    				message = "����ɾ�����ݽ�ɫ��־ʧ��!";	
    			}
        	}
        } catch (ServiceException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,
            	"RoleManageAction--doModifyParamRole:"+e.getMessage());
        }

        request.setAttribute("OperFlag", "delete");
        request.setAttribute("OperMessage", message);
        
        return getParamRoleList(mapping, request, response);
    }

    /**
     * ���Ҳ�����ɫ
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     */
    private ActionForward doSearchParamRole(ActionMapping mapping,
            HttpServletRequest request, HttpServletResponse response){
        String queryName = request.getParameter("paramRoleName");
        AuthorizeVO authvo = getAuthorize(request);
        String employeeId = authvo.getEmployeeId();
        ParamRoleBO service = (ParamRoleBO) getBaseService().getServiceFacade(ParamRoleBO.BEAN);
        ParamRoleColl paramRoleColl;
        
        try{
            paramRoleColl = service.getParamRoleInfoByParamRoleName(queryName, employeeId);
            GridUtil.getStartEnd(request,paramRoleColl.getRowCount(),paramRoleColl.getRowCount());
        } catch (ServiceException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,
            	"RoleManageAction--doSearchParamRole:"+e.getMessage());
            paramRoleColl = new ParamRoleColl();
        }

        request.setAttribute("ParamRoleColl", paramRoleColl.getList());
        
        return mapping.findForward("paramRoleSearch");
    }

    /**
     * ��ò�����ɫ�б�
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     */
    private ActionForward getParamRoleList(ActionMapping mapping,
            HttpServletRequest request, HttpServletResponse response){

        AuthorizeVO authvo = getAuthorize(request);
        String employeeId = authvo.getEmployeeId();

        ParamRoleColl paramRoleColl;
        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");

        ParamRoleDAO dao = (ParamRoleDAO) factory.getInteractionObject("paramroleDAO",appContext);//�õ�DAO
        try{
            paramRoleColl = dao.getParamRoleInfoByEmployeeId(employeeId);
            ParamRoleColl createRoleColl = dao.getCreateParamRoleColl(employeeId);
        	for(int i = 0; i < createRoleColl.getRowCount(); i++){
        		ParamRoleVO vo = createRoleColl.getParamRole(i);
        		if(!paramRoleColl.isExists(vo.getRoleId())){
        			vo.setIfCreater(1);
        			vo.setAdminFlag(0);
        			vo.setUsableFlag(0);
        			paramRoleColl.addParamRole(vo);
        		}
        	}
        } catch (DataAccessException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,
            	"RoleManageAction--getParamRoleList:"+e.getMessage());
            paramRoleColl = new ParamRoleColl();
        }
        
        GridUtil.getStartEnd(request,paramRoleColl.getRowCount(),paramRoleColl.getRowCount());
        request.setAttribute("ParamRoleColl", paramRoleColl.getList());
        
        return mapping.findForward("paramRoleList");
    }
    /**
     * ��¼��־������Ϣ
     * @param request
     * @param buttonId
     * @param desc
     * @return
     */
    private HashMap getLogMap(HttpServletRequest request,String buttonId,
    		String desc){
    	AuthorizeVO authvo = (AuthorizeVO) request.getSession().getAttribute(GlobalParameters.SESSION_INFO);
    	String loginHost = request.getRemoteHost();
    	String workNo =  authvo.getWorkNo();
    	String employeeId = authvo.getEmployeeId();
    	
    	HashMap logMap = new HashMap();
    	
    	logMap.put("systemId", SYSTEM_ID);
    	logMap.put("buttonId", buttonId);
    	logMap.put("employeeId", employeeId);
    	logMap.put("workNo", workNo);
    	logMap.put("loginHost", loginHost);
    	logMap.put("operDesc", desc);   
    	
    	return logMap;
    }
}
