package com.neusoft.om.action.funcrole;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.om.bo.DynamicListBO;
import com.neusoft.om.bo.FuncRoleBO;
import com.neusoft.om.bo.MenuFuncManagementBO;
import com.neusoft.om.dao.role.RoleColl;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.common.util.NullProcessUtil;
import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.tdframework.web.struts.BaseAction;
/**
 * @author renh
 * ɾ����ɫ
 */
public class FuncRoleDeleteAction extends BaseAction {
	public ActionForward service(
		ActionMapping mapping,
		ActionForm form,
		HttpServletRequest request,
		HttpServletResponse response)
		throws ActionException{
			String operType  = NullProcessUtil.nvlToString(request.getParameter("OperType"),"init").trim();
			String message = "";
			String operFlag = "1";
			FuncRoleBO service =(FuncRoleBO)getBaseService().getServiceFacade(FuncRoleBO.BEAN);
			DynamicListBO serviceList = (DynamicListBO)getBaseService().getServiceFacade(DynamicListBO.BEAN);
			MenuFuncManagementBO serviceMenu =(MenuFuncManagementBO)getBaseService().getServiceFacade(MenuFuncManagementBO.BEAN);
			if(operType.intern()=="init".intern()){
				//�õ����еĹ��ܽ�ɫ��Ϣ,�������������б�
				RoleColl roleColl = null;
				try{
					roleColl = serviceList.getFuncRoleList();
				}catch (ServiceException e) {
					operFlag = "0";
					SysLog.writeLogs("om",GlobalParameters.ERROR,"FuncRoleDeleteAction--getFuncRoleList-1:"+e.getMessage());
					message = "�޷��õ����ܽ�ɫ�б���Ϣ!"+e.getMessage();			
				}
				request.setAttribute("RoleColl",roleColl);
				request.setAttribute("Message",message);
				request.setAttribute("OperFlag","operFlag");
				request.setAttribute("OperType","init");
				return mapping.findForward("initresult");
		
			}else{//delete
				int roleId = Integer.parseInt(request.getParameter("RoleId"));
				message ="ɾ����ɫ�ɹ�!";
				try{
					service.doDeleteFuncRoleInfo(roleId);
				}catch (ServiceException e) {
					operFlag = "0";
					SysLog.writeLogs("om",GlobalParameters.ERROR,"FuncRoleDeleteAction--doAddFuncRoleInfo-2:"+e.getMessage());
					message = "ɾ����ɫʧ��!"+e.getMessage();			
				}	
				request.setAttribute("Message",message);
				request.setAttribute("OperFlag","operFlag");
				request.setAttribute("OperType","modify");
				return mapping.findForward("deleteresult");
			}
	}
}
