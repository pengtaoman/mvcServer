package com.neusoft.uniflow.web.monitor.procinst.actions;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.handler.NWProcInst;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class ProcInstDetailAction extends Action {
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		HttpSession session = request.getSession();
		NWSession nwsession = WorkflowManager.getNWSession();

		String procid = request.getParameter("procinstID");
		try {
			NWProcInst procInfo = nwsession.getProcInst(nwsession.getUserID(),
					procid);

			request.setAttribute("procInfo", procInfo);
			return mapping.findForward("success");
		} catch (Exception e) {
			session.setAttribute(SessionManager.ERROR, new UniException(e));
			//session.setAttribute(SessionManager.ERROR, new UniException(
					//"取得流程实例信息失败，流程实例可能被删除！"));
			return mapping.findForward("error");
		}
	}
}