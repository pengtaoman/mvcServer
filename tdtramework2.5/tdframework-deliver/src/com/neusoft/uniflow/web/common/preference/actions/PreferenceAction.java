package com.neusoft.uniflow.web.common.preference.actions;


import java.io.File;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.handler.NWAgent;
import com.neusoft.uniflow.api.mgmt.NWPersonInfo;
import com.neusoft.uniflow.web.common.preference.beans.PreferenceInfo;
import com.neusoft.uniflow.web.common.preference.forms.PreferenceForm;
import com.neusoft.uniflow.web.util.CustomHandler;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class PreferenceAction extends Action
{
	public ActionForward execute(ActionMapping mapping,
										  ActionForm form,
										  HttpServletRequest request,
										  HttpServletResponse response) throws Exception
	{

		HttpSession session = request.getSession();
		NWSession nwsession = WorkflowManager.getNWSession();
		PreferenceForm preferenceForm = (PreferenceForm) form;

		String liststring = (String) session.getAttribute(SessionManager.
			CUSTOMATION);
		String style = CustomHandler.getElements(CustomHandler.PREFERENCE_SYTLE,
															  liststring);
		String number = CustomHandler.getElements(CustomHandler.PREFERENCE_NUMBER,
																liststring);
		preferenceForm.setStyle(style);
		preferenceForm.setNumber(number);
        String dirname = session.getServletContext().getRealPath(request.getServletPath());
        dirname = dirname.substring(0,dirname.lastIndexOf(File.separator));
		dirname = dirname + File.separator+"unieap/pages/workflow"+File.separator+"stylesheet";
		File f1 = new File(dirname);
		ArrayList styleinfo = new ArrayList();
		if (f1.isDirectory()) {
			String[] s = f1.list();
			for (int i = 0; i < s.length; i++) {
				if (s[i].equals("style1")) {
		            String lable="海洋之蓝";	
					styleinfo.add(new org.apache.struts.util.LabelValueBean(lable,s[i]));
				}
			}
		}
//saving preference info
		PreferenceInfo prefinfo = new PreferenceInfo();
		NWPersonInfo personinfo = nwsession.getPersonInfo( (String) session.
			getAttribute(SessionManager.BIZ_USERID));
		prefinfo.setPersoninfo(personinfo);
		Vector notifyinfo = personinfo.openNotifyInfoList();

		Vector agentinfo = nwsession.openAgentList(0,
				(String) session.getAttribute(SessionManager.BIZ_USERID));
		NWAgent agent = null;
		for (int i = 0; i < agentinfo.size(); i++) {
			agent = (NWAgent) agentinfo.elementAt(i);
		}
		SimpleDateFormat dateformat = new SimpleDateFormat(PreferenceInfo.
			DATEFORMAT);
		String startTime = "";
		String endTime = "";

		if (agent != null) {
			prefinfo.setAgent(agent);
			prefinfo.setHasAgent(true);
			prefinfo.setSetAgent(true);
			prefinfo.setAgentID(agent.getAssignee());

			startTime = dateformat.format(agent.getStartTime());
			endTime = dateformat.format(agent.getEndTime());
		}
		else {
			startTime = dateformat.format(new Date());
			endTime = dateformat.format(new Date());
		}
		prefinfo.setStartTime(startTime);
		prefinfo.setEndTime(endTime);

		prefinfo.setStyle(style);
		prefinfo.setNumber(number);
		prefinfo.setNotifyinfo(notifyinfo);
		prefinfo.setStyleinfo(styleinfo);
		session.setAttribute(SessionManager.PREFERENCE, prefinfo);

		request.setAttribute("styleinfo", styleinfo);
		return mapping.findForward("success");
	}
}