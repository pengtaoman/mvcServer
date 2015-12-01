package com.neusoft.uniflow.web.standard.workitemmgt.operation.actions;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.web.AO.WorkItemAO;
import com.neusoft.uniflow.web.standard.workitemmgt.operation.forms.OpenWorkitemForm;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;

public class TaskHandlerAction extends Action {
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) {
		WorkItemAO workItemAO = WorkItemAO.getInstance();
		HttpSession session = request.getSession();
		OpenWorkitemForm openForm = (OpenWorkitemForm) form;
		String operation = openForm.getOperation();

		String workItemID = "";
		if (operation == null || operation.trim().equals("")) {
			workItemID = request.getParameter("workitemID");
			openForm.setWorkItemID(workItemID);
			try {
				openForm.setAppType(workItemAO.getWorkItem(request,workItemID).getAppType());
			} catch (Exception e) {
				session.setAttribute(SessionManager.ERROR, new UniException(e,"error.todolist.worklist.open.getworkitem"));
				//e.printStackTrace();
				return mapping.findForward("error");
			}
		} else {
			try {
				workItemID = openForm.getWorkItemID();
			} catch (Exception e) {
				//e.printStackTrace();
				session.setAttribute(SessionManager.ERROR, new UniException(e,"error.todolist.worklist.open.getworkitem"));
				return mapping.findForward("error");
			}
			if (operation.trim().equals("cancel")) {
				try {
					workItemAO.doClose(request,workItemID);
				} catch (Exception e) {
					session.setAttribute(SessionManager.ERROR,new UniException(e,"error.todolist.workitem.close"));
					return mapping.findForward("error");
				}
			}
			if (operation.trim().equals("complete")) {
				try {
					workItemAO.doComplete(request,workItemID);
				} catch (Exception e) {
					session.setAttribute(SessionManager.ERROR,new UniException(e,"error.todolist.workitem.complete"));
					return mapping.findForward("error");
				}
			}
			request.setAttribute("close_flag", "close");
		}

		return mapping.findForward("success");
	}
}