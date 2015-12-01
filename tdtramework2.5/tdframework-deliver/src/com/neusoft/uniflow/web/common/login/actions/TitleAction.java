package com.neusoft.uniflow.web.common.login.actions;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.web.util.CommonInfoManager;
import com.neusoft.uniflow.web.util.SessionManager;

public class TitleAction extends Action {

	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {

        String current_user = CommonInfoManager.getUserInfo((String)request.getSession().getAttribute(SessionManager.USER),request.getSession());
        String agent_info = CommonInfoManager.getAgentInfo((String)request.getSession().getAttribute(SessionManager.USER),request.getSession());
        request.setAttribute("current_user", current_user);
        request.setAttribute("agent_info", agent_info);
		return mapping.findForward("success");
	}
}