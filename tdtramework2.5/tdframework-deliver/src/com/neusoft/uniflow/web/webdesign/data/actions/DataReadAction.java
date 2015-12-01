package com.neusoft.uniflow.web.webdesign.data.actions;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.api.def.NWProcDef;
import com.neusoft.uniflow.api.def.ProcessContentDocumentBuilder;
import com.neusoft.uniflow.web.toollistener.ServerIO.ServerIO;
import com.neusoft.uniflow.web.util.UniflowManager;
import com.neusoft.uniflow.web.webdesign.data.beans.DataReadForm;
import com.neusoft.workflow.model.ProcessContentDocument;

public class DataReadAction extends Action {
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		String id = (String) request.getParameter("selectedID");
		String version = (String) request.getParameter("selectedVersion");
		boolean isCreateNewProcess = Boolean.valueOf(
				(String) request.getParameter("isCreateNewProcess"))
				.booleanValue();
		ServerIO serverIO = UniflowManager.getServerIO();
		ProcessContentDocument EPDoc;
		if (!isCreateNewProcess) {
			if (version != null && !version.equals("null")
					&& !version.equals(""))
				EPDoc = serverIO.readProcFromServer(id, version);
			else
				EPDoc = serverIO.readProcFromServer(id);
		}else{
			NWProcDef oldProcdef = null;
			if (version != null && !version.equals("null")
					&& !version.equals("")){
				oldProcdef = UniflowManager.getNWSession().getProcDef("", id, version, 0);
			}else{
				oldProcdef = UniflowManager.getNWSession().getProcDef("", id, 0);
			}
			EPDoc = ProcessContentDocumentBuilder.buildNewProcessFromOldProcess(oldProcdef);
		}
		DataReadForm DOF = (DataReadForm) form;
		DOF.setEPDoc(EPDoc);
		return mapping.findForward("success");
	}

}
