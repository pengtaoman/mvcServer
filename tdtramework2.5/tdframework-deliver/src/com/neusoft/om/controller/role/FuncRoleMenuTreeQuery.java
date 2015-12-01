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

import com.neusoft.om.dao.menu.MenuColl;
import com.neusoft.om.omutil.OMRequestParameter;
import com.neusoft.tdframework.core.BaseService;
import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.web.controller.ControllerData;
import com.neusoft.tdframework.web.controller.UnValidateException;

/**
 * @author renh
 * 查询功能角色对应的菜单树
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
public class FuncRoleMenuTreeQuery extends BaseFuncRoleController{

	public FuncRoleMenuTreeQuery(BaseService baseService) {
		super(baseService);
	}
	
	public void dataValidate(HttpServletRequest request, ControllerData controllerData) throws UnValidateException {
		
	}
	public void serviceProcess(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response, ControllerData controllerData) throws ActionException, ServiceException {
		int dutyId = Integer.parseInt(request.getParameter("dutyId"));	
		int roleId = Integer.parseInt(request.getParameter("roleId"));
		MenuColl menuColl = getFuncRoleBO().getAllMenuInfoByDutyIdRoleId(dutyId,roleId);
		request.setAttribute(OMRequestParameter.MENU_TREE,menuColl);
	}
}
