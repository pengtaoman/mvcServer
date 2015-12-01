package com.neusoft.uniflow.web.util;

import java.util.Hashtable;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.neusoft.org.NWOrg;
import com.neusoft.org.NWPerson;
import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.NWSessionImpl;
import com.neusoft.uniflow.api.util.StringUtil;
import com.neusoft.uniflow.common.NWException;
//import com.neusoft.uniflow.util.Util;
import com.neusoft.uniflow.web.util.UniflowManager;

public class WorkflowManager {

	private static String WORKFLOW_PATH = null;
	private static String WORKFLOW_CONFIG_PATH = null;
	private static String WORKFLOW_STYLE_PATH = null;

	private static NWSession sysNWSession = null;

	public static NWSession getNWSession() {
		return UniflowManager.getNWSession();
	}

	public static NWSession getSysNWSession() {
		if (sysNWSession == null) {
			sysNWSession = (NWSession) (UniflowManager.getNWSession()).clone();
			try {
				sysNWSession.login(StringUtil.PRODUCTKEY + "-"
						+ NWSessionImpl.PNAME, "");
			} catch (NWException e) {
				e.printStackTrace();
			}
		}
		return sysNWSession;
	}

	public static NWOrg getNWOrg() {
		return UniflowManager.getNWOrg();
	}

	public static String getWorkflowPath() {
		return WORKFLOW_PATH;
	}
	
	public static String getWorkflowConfigPath() {
		return WORKFLOW_CONFIG_PATH;
	}
	
	public static String getWorkflowStylePath() {
		return WORKFLOW_STYLE_PATH;
	}

	public static void initUniflow(String personID, String personAccout,
			HttpServletRequest request, HttpServletResponse response) {
		HttpSession session = request.getSession();
		session.getServletContext().setAttribute("uni_nwsession",UniflowManager.getNWSession());
		WORKFLOW_PATH = request.getContextPath() + "/unieap/pages/workflow";
		WORKFLOW_STYLE_PATH = request.getContextPath() + "/unieap/pages/workflow/stylesheet";
		session.setAttribute(SessionManager.BIZ_USERID, personID);
		session.setAttribute(SessionManager.USER, personAccout);
		ServletContext ctx = session.getServletContext();
	
		String liststring = (String) ctx.getAttribute(CustomHandler.CUSTOM_DEFAULT)+ CustomHandler.COOKIE_DEFAULT;
		
		session.setAttribute(SessionManager.CUSTOMATION, liststring);
		System.out.println("INFO >> initCustom CUSTOMATION successful ......" + liststring);
		//System.out.println(Util.format(new Date())+" [UniEAP Workflow] webclient applicaiton initialize successfully...");
	}

	public static boolean isBizUser(NWPerson person, HttpServletRequest request)
			throws Exception {
		NWOrg org = getNWOrg();
		if (person != null)
			if (org.validatePassword(person.getAccount(), person.getPassword())) {
				return true;
			}
		return false;
	}

	public static void initCustom(ServletContext ctx, String filePath) {
		WORKFLOW_CONFIG_PATH = filePath;
		ParseXML parse = new ParseXML();
		try {
			parse.parse(filePath + "/custom.xml");
		} catch (Exception e) {
			e.printStackTrace();
		}
		Hashtable props = parse.getProps();
		String DEFAULT = parse.getDefault();
		ctx.setAttribute("CUSTOM_PROPS", props);
		ctx.setAttribute("CUSTOM_DEFAULT", DEFAULT);
		//System.out.println("INFO >> initCustom Successful ......");
	}
}