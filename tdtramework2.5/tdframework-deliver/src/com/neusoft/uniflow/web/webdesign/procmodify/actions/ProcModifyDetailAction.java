package com.neusoft.uniflow.web.webdesign.procmodify.actions;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.api.def.NWProcDef;
import com.neusoft.uniflow.service.WorkFlowContext;
import com.neusoft.uniflow.util.Util;
import com.neusoft.uniflow.web.util.UniflowManager;
import com.neusoft.uniflow.web.webdesign.procmodify.beans.ProcModifyDetailForm;

public class ProcModifyDetailAction extends Action {

	public static final String AUTHORITY_VIEW = "view";
	public static final String AUTHORITY_DEFINE = "define";
	public static final String AUTHORITY_MANAGER = "manager";

	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		String isNewProc;
		NWProcDef tempProcdef = null;
		String authority = request.getParameter("authority");
		String procID = request.getParameter("selectedID");
		if (procID != null && !procID.equals("")) {
			tempProcdef = UniflowManager.getNWSession().getProcDef("", procID,
					0);
		}
		if (tempProcdef == null) {
			isNewProc = "true";
		} else {
			isNewProc = "false";
		}
//		String serialHandleClass = WorkFlowContext.getInstance()
//				.getConfiguration().getCommonCfg().getSerialClassInfo()
//				.getClassName();
//		String stationTypeHandleClass = WorkFlowContext.getInstance()
//				.getConfiguration().getCommonCfg().getStationTypeInfo()
//				.getClassName();
		String appHost = WorkFlowContext.getInstance().getConfiguration()
				.getAppMgrCfg().getManagerName();
		String msgReceiver = appHost;
		String procVersion = request.getParameter("selectedVersion");
		String procName = request.getParameter("name");

		if (!Util.isNullOrEmpty(authority)) {
			if (authority.equals(AUTHORITY_VIEW)) {
				request.setAttribute("operationLevel", "0");
			} else if (authority.equals(AUTHORITY_DEFINE)) {
				request.setAttribute("operationLevel", "1");
			} else if (authority.equals(AUTHORITY_MANAGER)) {
				request.setAttribute("operationLevel", "2");
			}
		}
		request.setAttribute("isNewProc", isNewProc);
		request.setAttribute("selectedVersion", procVersion);
		request.setAttribute("selectedID", procID);
		request.setAttribute("selectedName", procName);
//		request.setAttribute("serialHandleClass", serialHandleClass);
//		request.setAttribute("stationTypeHandleClass", stationTypeHandleClass);
		request.setAttribute("appHost", appHost);
		request.setAttribute("msgReceiver", msgReceiver);
		ProcModifyDetailForm PMDF = (ProcModifyDetailForm) form;
		PMDF.setProcID(procID);
		return mapping.findForward("success");
	}
}
