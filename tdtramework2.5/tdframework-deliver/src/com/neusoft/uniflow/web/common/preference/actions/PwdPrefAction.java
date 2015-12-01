package com.neusoft.uniflow.web.common.preference.actions;

import java.util.ArrayList;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.org.NWOrg;
import com.neusoft.org.NWPerson;

import com.neusoft.uniflow.web.util.CustomHandler;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.WorkflowManager;
import com.neusoft.uniflow.web.common.preference.beans.PreferenceInfo;
import com.neusoft.uniflow.web.common.preference.forms.PreferenceForm;

public class PwdPrefAction extends Action {
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		HttpSession session = request.getSession();
		PreferenceInfo prefinfo = (PreferenceInfo) session
				.getAttribute(SessionManager.PREFERENCE);
		NWOrg org = WorkflowManager.getNWOrg();;
		String userID = (String) session
				.getAttribute(SessionManager.BIZ_USERID);
		// NWPerson person = org.getPersonByAccount("test");
		NWPerson person = org.getPerson(userID);

		String style = prefinfo.getStyle();
		String number = prefinfo.getNumber();
		
		PreferenceForm prefForm = (PreferenceForm) form;
		String oldpass = prefForm.getOldpass();
		String newpass = prefForm.getNewpass();
		String confpass = prefForm.getConfpass();
		boolean modifypass = prefinfo.getModifypass();

		if (oldpass.trim().equals("") && newpass.trim().equals("")
				&& confpass.trim().equals("")) {
			modifypass = false;
		} else {
			modifypass = true;
		}
		String action = prefForm.getAction();
		if (action != null) {
			if (action.equals("OK")) {
				String liststring = (String) session
						.getAttribute(SessionManager.CUSTOMATION);
				liststring = CustomHandler.setElements(
						CustomHandler.PREFERENCE_SYTLE, style, liststring);
				liststring = CustomHandler.setElements(
						CustomHandler.PREFERENCE_NUMBER, number, liststring);
				session.setAttribute(SessionManager.CUSTOMATION, liststring);
				Cookie defaultitem = new Cookie((String) session
						.getAttribute(SessionManager.BIZ_USERID), liststring);
				defaultitem.setMaxAge(60 * 60 * 24 * 30);
				response.addCookie(defaultitem);
				try {

					// Saving password
					if (modifypass) {
						person.setPassword(newpass);
						person.update();
					}
				} catch (Exception e) {
					session.setAttribute(SessionManager.ERROR,
							new UniException(e, "error.invokeinterface"));
					return mapping.findForward("error");
				}

				request.setAttribute("styleinfo", new java.util.ArrayList());
				request.setAttribute("close_flag", "close");
			} else {
				prefinfo.setNewpass(newpass);
				prefinfo.setModifypass(modifypass);
				if (action.equals("general")) {
					prefForm.setStyle(style);
					prefForm.setNumber(number);
					ArrayList styleinfo = prefinfo.getStyleinfo();
					request.setAttribute("styleinfo", styleinfo);
					return mapping.findForward("general");
				}

			}
		}
		return mapping.findForward("OK");
	}
}