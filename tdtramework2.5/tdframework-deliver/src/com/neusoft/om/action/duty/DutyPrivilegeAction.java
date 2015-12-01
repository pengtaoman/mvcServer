/*
 * Created on 2005-2-18
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.om.action.duty;

import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.om.controller.duty.DutyPrivilegeGet;
import com.neusoft.om.controller.duty.DutyPrivilegeSubmit;
import com.neusoft.om.controller.duty.DutyTreeQuery;
import com.neusoft.tdframework.web.controller.BaseController;
import com.neusoft.tdframework.web.controller.BaseTestController;
import com.neusoft.tdframework.web.controller.ControllerData;
import com.neusoft.tdframework.web.struts.BaseControllerAction;

/**
 * @author chenzt
 *
 * 职责范围维护的Action
 */
public class DutyPrivilegeAction extends BaseControllerAction{
	private static final String DUTY_QUERY = "dutyQuery";
	private static final String MENU_QUERY = "menuQuery";
	private static final String PRIVILEGE_SUBMIT = "privilegeSubmit";
	
	/* (non-Javadoc)
	 * 
	 * 直接按照操作方式返回相应的页面
	 * 
	 * @see com.neusoft.tdframework.web.struts.BaseControllerAction#getActionForward(org.apache.struts.action.ActionMapping, java.lang.String, com.neusoft.tdframework.web.controller.ControllerData)
	 *  Add notes by liudong: The controllerData object as parameter is never used.
	 */
	protected ActionForward getActionForward(ActionMapping mapping, String operType, ControllerData controllerData) {
		if(operType.trim().intern()==PRIVILEGE_SUBMIT.intern()) 
			return mapping.findForward(MENU_QUERY);
		else
			return mapping.findForward(operType);
	}

	/* (non-Javadoc)
	 * @see com.neusoft.tdframework.web.struts.BaseControllerAction#initController()
	 */
	protected void initController() {
		addController(DUTY_QUERY,new DutyTreeQuery(getBaseService()));
		addController(MENU_QUERY,new DutyPrivilegeGet(getBaseService()));
		addController(PRIVILEGE_SUBMIT,new DutyPrivilegeSubmit(getBaseService()));
		addController(PRIVILEGE_SUBMIT,new DutyPrivilegeGet(getBaseService()));
	}

}
