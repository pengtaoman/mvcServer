/*
 * Created on 2005-2-19
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.om.controller.duty;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;

import com.neusoft.om.dao.duty.OrganKindDutyColl;
import com.neusoft.om.omutil.OMRequestParameter;
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
public class DutyPrivilegeSubmit extends BaseDutyController{
	
	/**
	 * @param baseService
	 */
	public DutyPrivilegeSubmit(BaseService baseService) {
		super(baseService);
	}

	/* (non-Javadoc)
	 * @see com.neusoft.tdframework.web.controller.BaseController#dataValidate(javax.servlet.http.HttpServletRequest, com.neusoft.tdframework.web.controller.ControllerData)
	 */
	public void dataValidate(HttpServletRequest request, ControllerData controllerData) throws UnValidateException {
		
	}
	/**
	 * 调用DutyBO中封装的修改职责范围接口doModifyDutyPower
	 */
	public void serviceProcess(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response, ControllerData controllerData) throws ActionException, ServiceException {
		String delMenuList = request.getParameter("delMenuList");
		String selectedMenuList = request.getParameter("selectedMenuList");
		int dutyId = Integer.parseInt(request.getParameter("dutyId")); 
		getDutyBO().doModifyDutyPower(dutyId,delMenuList,selectedMenuList);
		controllerData.setAlertMessage("修改成功!");
	}

}
