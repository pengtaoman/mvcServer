package com.neusoft.uniflow.web.common.notify.actions;

import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.mgmt.NWNotifyInfo;
import com.neusoft.uniflow.api.mgmt.NWPersonInfo;
import com.neusoft.uniflow.web.common.notify.forms.NotifyForm;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class NotifyPrefAction extends Action {

	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {

		HttpSession session = request.getSession();
		NWSession nwsession = WorkflowManager.getNWSession();
		NWPersonInfo personinfo = nwsession.getPersonInfo((String) session
				.getAttribute(SessionManager.BIZ_USERID));

		NotifyForm prefForm = (NotifyForm) form;
		String action = prefForm.getAction();
		Vector notifylist = personinfo.openNotifyInfoList();
		NWNotifyInfo notifyinfo = null;

		if (action != null && !action.equals("OK")) {

			for (int i = 0; i < notifylist.size(); i++) {
				notifyinfo = (NWNotifyInfo) notifylist.elementAt(i);
				if (notifyinfo.getNotifyType() == (NWNotifyInfo.NOTIFY_EMAIL)) {
					prefForm.setIfemail(true);
					prefForm.setEmail(notifyinfo.getNotifyTarget());
				}
				if (notifyinfo.getNotifyType() == (NWNotifyInfo.NOTIFY_SHORTMSG)) {
					prefForm.setIfphone(true);
					prefForm.setPhone(notifyinfo.getNotifyTarget());
				}
				if (notifyinfo.getNotifyType() == (NWNotifyInfo.NOTIFY_ALERT)) {
					prefForm.setIfalert(true);
				}
			}
			request.setAttribute("flag", "false");
			return mapping.findForward("notify");
		}

		if (action != null && action.equals("OK")) {
			boolean ifemail = prefForm.getIfemail();
			String email = prefForm.getEmail();
			boolean ifphone = prefForm.getIfphone();
			String phone = prefForm.getPhone();
			boolean ifalert = prefForm.getIfalert();
			personinfo.removeNotifyInfo(NWNotifyInfo.NOTIFY_EMAIL);
			personinfo.removeNotifyInfo(NWNotifyInfo.NOTIFY_SHORTMSG);
			personinfo.removeNotifyInfo(NWNotifyInfo.NOTIFY_ALERT);
			if (ifemail) {

				personinfo.addNotifyInfo(NWNotifyInfo.NOTIFY_EMAIL, email);
			}
			if (ifphone) {
				personinfo.addNotifyInfo(NWNotifyInfo.NOTIFY_SHORTMSG, phone);
			}
			if (ifalert) {
				personinfo.addNotifyInfo(NWNotifyInfo.NOTIFY_ALERT, "");
			}
			try {
				personinfo.update();
				request.setAttribute("flag", "success");
			} catch (Exception e) {
				session.setAttribute(SessionManager.ERROR, new UniException(e,
						"error.invokeinterface"));
				return mapping.findForward("error");
			}
		}
		return mapping.findForward("OK");
	}
}