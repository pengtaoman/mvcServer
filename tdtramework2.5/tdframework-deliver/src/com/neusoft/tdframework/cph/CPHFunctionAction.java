/*
 * Created on 2006-5-17
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
package com.neusoft.tdframework.cph;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.web.struts.TDDispatchAction;

/**
 * @author zhangjn
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class CPHFunctionAction  extends TDDispatchAction{

	/**
	 * 
	 */
	public CPHFunctionAction() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	/**
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws ActionException
	 */
	public ActionForward constructUserInfo(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws ActionException {

		
		
		ActionForward forward = mapping.findForward("commonTop"); 
		return forward;
	}
	public ActionForward constructStatusInfo(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws ActionException {
		ActionForward forward = mapping.findForward("commonTop"); 
		return forward;
	}

}
