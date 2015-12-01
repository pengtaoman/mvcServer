package com.neusoft.uniflow.web.monitor.procdef.actions;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.handler.NWWorkItem;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class WorkItemDetailAction extends Action {
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		HttpSession session = request.getSession();
		NWSession nwsession = WorkflowManager.getNWSession();

		String workItemID = request.getParameter("workItemID");
		try {
			NWWorkItem workItem = nwsession.getWorkItem(nwsession.getUserID(),
					workItemID);
			if (workItem == null) {
				session.setAttribute(SessionManager.ERROR, new UniException(
						"取得工作项信息失败！"));
				return mapping.findForward("error");
			}
			request.setAttribute("workItemInfo", workItem);
			return mapping.findForward("success");
		} catch (Exception e) {
			session.setAttribute(SessionManager.ERROR, new UniException(e));
			return mapping.findForward("error");
		}
	}
}