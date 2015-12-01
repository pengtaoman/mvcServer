package com.neusoft.uniflow.web.authorization.purview.actions;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.def.NWActDef;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class ActDefDetailAction extends Action {
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		HttpSession session = request.getSession();
		NWSession nwsession = WorkflowManager.getSysNWSession();

		String actdefid = request.getParameter("actdefid");
		try {
			NWActDef actdefInfo = nwsession.getActDef(actdefid, 0);
			request.setAttribute("actdefInfo", actdefInfo);
			return mapping.findForward("success");
		} catch (Exception e) {
			session.setAttribute(SessionManager.ERROR, new UniException(e));
			//session.setAttribute(SessionManager.ERROR, new UniException("取得定义信息失败，流程定义可能被删除！"));
            return mapping.findForward("error");
		}

	}
}