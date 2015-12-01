// Decompiled by Jad v1.5.8e2. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://kpdus.tripod.com/jad.html
// Decompiler options: packimports(3) fieldsfirst ansi space 
// Source File Name:   ErrorAction.java

package com.neusoft.tdframework.demo.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.tdframework.common.util.DateUtil;
import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.web.struts.TDDispatchAction;

public class ErrorAction extends TDDispatchAction {

	public ErrorAction() {
	}

	public ActionForward init(ActionMapping actionMapping,
			ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws ActionException {
		String datetime = DateUtil.getDate();
		request.setAttribute("ErrorMessage", datetime);
		return actionMapping.findForward("init");
	}

	public ActionForward query(ActionMapping actionMapping,
			ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws ActionException {
		// String message = "";
		// String error_code = NullProcessUtil.nvlToString(request.getParameter("error_code"), "");
		/*
		 * int code = Integer.parseInt(error_code); ErrorVO errorVO = new
		 * ErrorVO(); //ErrorBO bo = (ErrorBO)getServiceFacade("errorFacade",
		 * actionMapping); try { errorVO = ErrorUtil.getErrorInfoByCode(code); }
		 * catch (ServiceException e) { SysLog.writeLogs("om", "ERROR",
		 * "ErrorAction--query:" + e.getMessage()); message = e.getMessage(); }
		 * request.setAttribute("errorVO", errorVO);
		 */
		return actionMapping.findForward("init");
	}
}