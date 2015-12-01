/*
 * Created on 2005-2-20
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.om.action.funcrole;

import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.om.controller.duty.DutyTreeQuery;
import com.neusoft.om.controller.role.FuncRoleAdd;
import com.neusoft.om.controller.role.FuncRoleDelete;
import com.neusoft.om.controller.role.FuncRoleListQuery;
import com.neusoft.om.controller.role.FuncRoleMenuTreeQuery;
import com.neusoft.om.controller.role.FuncRoleModify;
import com.neusoft.om.controller.role.FuncRolePrivilegeSubmit;
import com.neusoft.tdframework.web.controller.BaseTestController;
import com.neusoft.tdframework.web.controller.ControllerData;
import com.neusoft.tdframework.web.struts.BaseControllerAction;

/**
 * @author chenzt
 *
 * 实现角色管理的Action
 */
public class FuncRoleAdmin extends BaseControllerAction{
	
	private static final String DUTY_QUERY="dutyQuery";
	private static final String ROLE_LIST_QUERY="roleListQuery";
	private static final String MENU_QUERY="menuQuery";
	private static final String ROLE_ADD="roleAdd";
	private static final String ROLE_MODIFY="roleModify";
	private static final String ROLE_DELETE="roleDelete";
	private static final String PRIVILEGE_SUBMIT="privilegeSubmit";
	
	/* 
	 * 总共有如下三个forword配置：
	 * dutyQuery,roleListQuery,menuQuery
	 * 
	 * @see com.neusoft.tdframework.web.struts.BaseControllerAction#getActionForward(org.apache.struts.action.ActionMapping, java.lang.String, com.neusoft.tdframework.web.controller.ControllerData)
	 */
	protected ActionForward getActionForward(ActionMapping mapping, String operType, ControllerData controllerData) { 
		if(operType.intern()==ROLE_ADD.intern() ||
			operType.intern()==ROLE_MODIFY.intern() ||
			operType.intern()==ROLE_DELETE.intern()
		) return mapping.findForward(ROLE_LIST_QUERY);
		
		if(operType.intern()==PRIVILEGE_SUBMIT.intern())
			return mapping.findForward(MENU_QUERY);
		
		return mapping.findForward(operType);
	}

	/* (non-Javadoc)
	 * @see com.neusoft.tdframework.web.struts.BaseControllerAction#initController()
	 */
	protected void initController() {
		addController(DUTY_QUERY,new DutyTreeQuery(getBaseService()));
		addController(ROLE_LIST_QUERY,new FuncRoleListQuery(getBaseService()));
		addController(MENU_QUERY,new FuncRoleMenuTreeQuery(getBaseService()));
		addController(ROLE_ADD,new FuncRoleAdd(getBaseService()));
		addController(ROLE_ADD,new FuncRoleListQuery(getBaseService()));
		addController(ROLE_MODIFY,new FuncRoleModify(getBaseService()));
		addController(ROLE_MODIFY,new FuncRoleListQuery(getBaseService()));
		addController(ROLE_DELETE,new FuncRoleDelete(getBaseService()));
		addController(ROLE_DELETE,new FuncRoleListQuery(getBaseService()));
		addController(PRIVILEGE_SUBMIT,new FuncRolePrivilegeSubmit(getBaseService()));
		addController(PRIVILEGE_SUBMIT,new FuncRoleMenuTreeQuery(getBaseService()));
	}

}
