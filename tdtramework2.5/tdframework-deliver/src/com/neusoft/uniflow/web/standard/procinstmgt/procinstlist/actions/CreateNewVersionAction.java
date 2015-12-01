package com.neusoft.uniflow.web.standard.procinstmgt.procinstlist.actions;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.def.NWProcDef;
import com.neusoft.uniflow.api.handler.NWProcInst;
import com.neusoft.uniflow.common.NWException;
import com.neusoft.uniflow.web.AO.ProcInstAO;
import com.neusoft.uniflow.web.standard.procinstmgt.procinstlist.forms.CreateNewVersionForm;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class CreateNewVersionAction extends Action {
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) {
		HttpSession session = request.getSession();
		String procInstId = request.getParameter("procInstID");
		String operation = request.getParameter("operation");
		CreateNewVersionForm newversionform = (CreateNewVersionForm) form;
		String userId = (String) session.getAttribute(SessionManager.BIZ_USERID);
		NWSession nwsession = WorkflowManager.getNWSession();
		if (procInstId != null) {
			newversionform.setProinstId(procInstId);
			newversionform.setOperation(operation);
		}

		if (operation.equals("createnewversion")) {
			try {
				nwsession.getProcInst(userId, procInstId);
				newversionform.setProinstName("");
			} catch (NWException e) {
				session.setAttribute(SessionManager.ERROR, new UniException(e,"error.invokeinterface"));
				return mapping.findForward("error");
			}
		} else if (operation.equals("subnewversion")) {
			try {
				NWProcInst procinst = nwsession.getProcInst(userId, procInstId);
				NWProcDef procdef = procinst.getProcDef();
				boolean isExist = procdef.isVersionNameExists(newversionform.getProinstName());
				if (isExist) {
					session.setAttribute(SessionManager.ERROR,
							"process version is already exist");
					return mapping.findForward("error");
				} else {
					ProcInstAO procInstAO = ProcInstAO.getInstance();
					procInstAO.createNewVersion(procinst, newversionform.getProinstName());
					request.setAttribute("close_falg", "close");
					request.setAttribute("success", "success");
				}
			} catch (Exception e) {
				session.setAttribute(SessionManager.ERROR, new UniException(e,
						"error.invokeinterface"));
				return mapping.findForward("error");
			}
		} else if (operation.equals("checkname")) {
			try {
				NWProcInst procinst = nwsession.getProcInst(userId, procInstId);
				NWProcDef procdef = procinst.getProcDef();
				boolean isExist = procdef.isVersionNameExists(newversionform.getProinstName());
				request.setAttribute("close_falg", "notclose");
				if (isExist) {
					request.setAttribute("isExist", "exist");
				} else {
					request.setAttribute("isExist", "notexist");
				}
			} catch (NWException e) {
				session.setAttribute(SessionManager.ERROR, new UniException(e,
						"error.invokeinterface"));
				return mapping.findForward("error");
			}
		}
		return mapping.findForward("success");
	}
}
