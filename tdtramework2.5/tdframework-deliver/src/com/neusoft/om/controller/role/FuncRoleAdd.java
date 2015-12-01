/*
 * Created on 2005-2-21
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.om.controller.role;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;

import com.neusoft.om.dao.role.RoleVO;
import com.neusoft.tdframework.authorization.AuthorizeVO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.core.BaseService;
import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.web.controller.ControllerData;
import com.neusoft.tdframework.web.controller.UnValidateException;
/**
 * @author renh
 * ���ӹ��ܽ�ɫ
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
public class FuncRoleAdd extends BaseFuncRoleController{
	public FuncRoleAdd(BaseService baseService) {
		super(baseService);
	}

	public void dataValidate(HttpServletRequest request, ControllerData controllerData) throws UnValidateException {
	
	}
	public void serviceProcess(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response, ControllerData controllerData) throws ActionException, ServiceException {
		RoleVO roleVO = new RoleVO();
		int dutyId = Integer.parseInt(request.getParameter("dutyId"));
		String roleName = request.getParameter("roleName");
		AuthorizeVO authvo = (AuthorizeVO) request.getSession().getAttribute(GlobalParameters.SESSION_INFO);
		String createAreaId = authvo.getAreaId();
		roleVO.setRoleName(roleName);
		roleVO.setDutyId(dutyId);
		roleVO.setCreateAreaId(createAreaId);
		getFuncRoleBO().doAddFuncRoleInfo(roleVO);
		controllerData.setAlertMessage("���ӹ��ܽ�ɫ�ɹ�!");
	}
}
