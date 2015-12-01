package com.neusoft.uniflow.web.monitor.procinst.actions;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.mgmt.NWRunTimeApplication;
import com.neusoft.uniflow.api.mgmt.NWRunTimeApplicationHandler;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class ApplicationDetailAction extends Action {
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		HttpSession session = request.getSession();
		NWSession nwsession = WorkflowManager.getNWSession();

		String actID = request.getParameter("actinstid");
		try {
			NWRunTimeApplicationHandler handler = nwsession
					.getRunTimeApplicationHandler();
			NWRunTimeApplication appInfo = null;
			appInfo = handler.getApplication(actID);
			if (appInfo==null){
				session.setAttribute(SessionManager.ERROR, new UniException("取得应用程序信息失败，流程实例可能被删除！"));
				return mapping.findForward("error");
			}
			request.setAttribute("appInfo", appInfo);
			return mapping.findForward("success");
		} catch (Exception e) {
			//e.printStackTrace();
			//session.setAttribute(SessionManager.ERROR, new UniException(e));
			session.setAttribute(SessionManager.ERROR, new UniException("取得应用程序信息失败，流程实例可能被删除！"));
			return mapping.findForward("error");
		}

	}
}