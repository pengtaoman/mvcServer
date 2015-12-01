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
import com.neusoft.tdframework.core.BaseService;
import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.web.controller.ControllerData;
import com.neusoft.tdframework.web.controller.UnValidateException;
/**
 * @author renh
 * 功能角色调整
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
public class FuncRolePrivilegeSubmit extends BaseFuncRoleController{
	public FuncRolePrivilegeSubmit(BaseService baseService) {
		super(baseService);
	}

	public void dataValidate(HttpServletRequest request, ControllerData controllerData) throws UnValidateException {
	
	}
	public void serviceProcess(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response, ControllerData controllerData) throws ActionException, ServiceException {
		int roleId = Integer.parseInt(request.getParameter("roleId"));
		String selectedMenuList = request.getParameter("selectedMenuList");
		getFuncRoleBO().doAdjustPrivilegeFuncRoleInfo(roleId,selectedMenuList);
		controllerData.setAlertMessage("修改成功!");
	}
}
