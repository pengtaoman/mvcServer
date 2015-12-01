package com.neusoft.uniflow.web.management.procdefmgt.actions;

import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.web.common.list.OpenListAction;
import com.neusoft.uniflow.web.common.list.OpenListForm;
import com.neusoft.uniflow.web.common.list.OpenListParamBean;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class ProcDefListAction extends OpenListAction {
	public int getItemsCount(String userID, NWSession nwsession,
			ActionMapping mapping, ActionForm form) throws Exception {
		int count = 1;
		count = nwsession.getCanCreateProcDefNum(userID);

		return count;
	}

	public void handleRequest(String userID, ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		NWSession nwsession = WorkflowManager.getNWSession();
		String operation = request.getParameter("op");
		String procdefId = request.getParameter("selectedId");
		String procdefVersion = request.getParameter("v");
		if (procdefVersion != null && !procdefVersion.equals("")) {
			procdefVersion = new String(procdefVersion.getBytes("iso-8859-1"));
			if (procdefVersion.indexOf("?") != -1) {
				procdefVersion = request.getParameter("v");
			}
		}
		if(operation==null||operation.equals("")){
			return;
		}else if(operation.equals("delete")){
			
			if (procdefId != null && !procdefId.equals("")) {
				nwsession.removeProcDef(userID, procdefId, procdefVersion, 0);
			} else {
				return;
			}
			
		}
	}

	public Vector openList(String userID, NWSession nwsession,
			ActionMapping mapping, ActionForm form, OpenListParamBean param)
			throws Exception {
		Vector list = nwsession.openCanCreateProcDefList(userID, param
				.getOrderBy(), param.getStart(), param.getOffset(), param
				.isIsAscending());
		if (list != null && list.size() > 0) {

			String id = ((com.neusoft.uniflow.api.def.NWProcDef) list
					.elementAt(0)).getID();
			String verName = ((com.neusoft.uniflow.api.def.NWProcDef) list
					.elementAt(0)).getVersionName();

			((OpenListForm) form).setSelectedItem(id + "&v=" + verName);

		}
		return list;
	}
}