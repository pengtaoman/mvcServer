package com.neusoft.uniflow.web.monitor.procinst.actions;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;


public class DetailAction extends Action
{
	public ActionForward execute(ActionMapping mapping,
					     ActionForm form,
					     HttpServletRequest request,
					     HttpServletResponse response)

	{
		HttpSession session = request.getSession();
		if ("request".equals(mapping.getScope()))
			request.setAttribute(mapping.getAttribute(), form);
		else
			session.setAttribute(mapping.getAttribute(), form);

		return mapping.findForward("success");
	}
}