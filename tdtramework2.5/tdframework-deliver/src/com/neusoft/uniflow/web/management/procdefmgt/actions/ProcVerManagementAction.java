package com.neusoft.uniflow.web.management.procdefmgt.actions;

import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.def.NWProcDef;
import com.neusoft.uniflow.web.common.list.OpenListAction;
import com.neusoft.uniflow.web.common.list.OpenListParamBean;
import com.neusoft.uniflow.web.management.procdefmgt.forms.ProcVerManagementForm;
import com.neusoft.uniflow.web.util.UniflowManager;

public class ProcVerManagementAction extends OpenListAction {

	NWSession session = UniflowManager.getNWSession();

	public void handleRequest(String userID, ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String selectedID = request.getParameter("selectedID");
		ProcVerManagementForm procVerManagementForm = (ProcVerManagementForm) form;
		if (selectedID == null) {
			selectedID = procVerManagementForm.getProcdefID();
		}
		procVerManagementForm.setProcdefID(selectedID);
		String operation = procVerManagementForm.getOperation();
		String procTemVersion = procVerManagementForm.getProcTemVersion();
		NWProcDef procDef = session.getProcDef("", procVerManagementForm
				.getProcdefID(), 0);
		if (operation.equals("createNewVersion") && !procTemVersion.equals("")
				&& procTemVersion != null) {
			if (!procDef.isVersionNameExists(procTemVersion)) {
				procDef.createVersion(procTemVersion);
				session.reloadProcDef(selectedID, procDef.getVersionName());
				session.reloadProcDef(selectedID, procTemVersion);
			}
		} else if (operation.equals("delVersion") && !procTemVersion.equals("")
				&& procTemVersion != null) {
			procDef.removeVersion(procTemVersion);
		} else if (operation.equals("activeVersion")) {
			procDef.setActiveVersion(procTemVersion);
			session.reloadProcDef(selectedID, procDef.getVersionName());
			session.reloadProcDef(selectedID, procTemVersion);
		}
	}

	public int getItemsCount(String userID, NWSession nwsession,
			ActionMapping mapping, ActionForm form) throws Exception {
		// TODO Auto-generated method stub
		return 0;
	}

	public Vector openList(String userID, NWSession nwsession,
			ActionMapping mapping, ActionForm form, OpenListParamBean param)
			throws Exception {
		ProcVerManagementForm procVerManagementForm = (ProcVerManagementForm) form;
		NWProcDef procDef = session.getProcDef("", procVerManagementForm
				.getProcdefID(), 0);
		Vector list = procDef.openVersionList();

		if (list != null && list.size() > 0) {
			NWProcDef tempProcDef = (NWProcDef) list.elementAt(0);
			String id = tempProcDef.getID();
			String verName = tempProcDef.getVersionName();
			procVerManagementForm.setSelectedItem(id + "&v=" + verName);
		}
		return list;
	}

}
