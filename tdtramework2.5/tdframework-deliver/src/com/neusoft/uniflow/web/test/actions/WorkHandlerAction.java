package com.neusoft.uniflow.web.test.actions;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.handler.NWWorkItem;
import com.neusoft.uniflow.web.test.forms.WorkHandlerForm;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class WorkHandlerAction extends Action {
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		HttpSession session = request.getSession();
		NWSession nwsession = WorkflowManager.getNWSession();
		WorkHandlerForm spform = (WorkHandlerForm) form;
		String id = request.getParameter("wid");
		if (spform.getWid().equals("") && spform.getWid() != null)
			spform.setWid(id);
		NWWorkItem wi = nwsession.getWorkItem("", spform.getWid());
		if (spform.getOperation().equals("OK")) {
			if (!spform.getIsRollback().equals("rollback")) {
				try{
					wi.doComplete(false);
				}catch(Exception e){
					e.printStackTrace();
				}
				request.setAttribute("close_flag", "close");
				request.setAttribute("fail", "workItemCompleteTrue");
			} else {
				try {
					wi.doRollBack();
					request.setAttribute("close_flag", "close");
					request.setAttribute("fail", "workItemCompleteTrue");
				} catch (Exception e) {
					session.setAttribute(SessionManager.ERROR,
							new UniException(e));
					return mapping.findForward("error");
				}
			}
		} else {

		}
		return mapping.findForward("success");

	}

}
