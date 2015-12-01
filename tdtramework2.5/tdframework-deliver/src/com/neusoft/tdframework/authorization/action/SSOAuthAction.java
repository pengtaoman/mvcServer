package com.neusoft.tdframework.authorization.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.acegisecurity.context.ContextHolder;
import net.sf.acegisecurity.context.security.SecureContextImpl;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.tdframework.portal.config.TDConfigHelper;
import com.neusoft.tdframework.web.struts.TDDispatchAction;

public class SSOAuthAction extends TDDispatchAction {
	public ActionForward defaultMethod(
			ActionMapping mapping,
			ActionForm form,
			HttpServletRequest request,
			HttpServletResponse response)
			throws Exception {
			
			
			return mapping.findForward(TDConfigHelper.getFaceName());
		}

}
