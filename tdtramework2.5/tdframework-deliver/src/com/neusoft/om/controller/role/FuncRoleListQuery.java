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

import com.neusoft.om.dao.role.RoleColl;
import com.neusoft.om.omutil.OMRequestParameter;
import com.neusoft.tdframework.core.BaseService;
import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.web.controller.ControllerData;
import com.neusoft.tdframework.web.controller.UnValidateException;
/**
 * @author renh
 * ��ȡְ��Ĺ��ܽ�ɫ�б�
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
public class FuncRoleListQuery extends BaseFuncRoleController{
	public FuncRoleListQuery(BaseService baseService) {
		super(baseService);
	}
	/**
	 * ����У��
	 */
	public void dataValidate(HttpServletRequest request, ControllerData controllerData) throws UnValidateException {
	
	}
	/**
	 * �õ����ܽ�ɫ�б�
	 */
	public void serviceProcess(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response, ControllerData controllerData) throws ActionException, ServiceException {
		int dutyId = Integer.parseInt(request.getParameter("dutyId"));	
		RoleColl roleColl = getFuncRoleBO().getAllFuncRoleByDutyId(dutyId);
		request.setAttribute(OMRequestParameter.ROLE_LIST,roleColl);
	}
}
