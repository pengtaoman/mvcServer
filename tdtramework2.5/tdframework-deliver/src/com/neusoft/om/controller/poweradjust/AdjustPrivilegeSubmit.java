/*
 * Created on 2005-2-19
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.om.controller.poweradjust;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;

import com.neusoft.tdframework.core.BaseService;
import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.web.controller.ControllerData;
import com.neusoft.tdframework.web.controller.UnValidateException;

/**
 * @author renh
 *
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
public class AdjustPrivilegeSubmit extends BasePowerAdjustController{
	
	/**
	 * @param baseService
	 */
	public AdjustPrivilegeSubmit(BaseService baseService) {
		super(baseService);
	}

	/* (non-Javadoc)
	 * @see com.neusoft.tdframework.web.controller.BaseController#dataValidate(javax.servlet.http.HttpServletRequest, com.neusoft.tdframework.web.controller.ControllerData)
	 */
	public void dataValidate(HttpServletRequest request, ControllerData controllerData) throws UnValidateException {
		
	}
	/**
	 * 调用EmployeeManagementBO中封装的微调接口
	 */
	public void serviceProcess(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response, ControllerData controllerData) throws ActionException, ServiceException {
		String selectedMenuList = request.getParameter("selectedMenuList");
		String employeeId = request.getParameter("employeeId"); 
		getEmployeeManagementBO().doPowerAdjust(employeeId,selectedMenuList);
		controllerData.setAlertMessage("修改成功!");
	}

}
