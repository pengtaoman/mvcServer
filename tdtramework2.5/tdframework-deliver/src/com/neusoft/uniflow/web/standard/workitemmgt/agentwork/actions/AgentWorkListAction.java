package com.neusoft.uniflow.web.standard.workitemmgt.agentwork.actions;

import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.handler.NWWorkItem;
import com.neusoft.uniflow.api.handler.NWWorkItemManager;
import com.neusoft.uniflow.web.common.list.OpenListAction;
import com.neusoft.uniflow.web.common.list.OpenListParamBean;
import com.neusoft.uniflow.web.standard.workitemmgt.agentwork.forms.AgentWorkListForm;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class AgentWorkListAction extends OpenListAction {
	private static int WORKITEMTYPE = 3;

	public void handleRequest(String userID, ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		AgentWorkListForm handleForm = (AgentWorkListForm) form;
		String action = handleForm.getOperation();
		String workItemID = handleForm.getSelectedItem();
		NWSession nwsession = WorkflowManager.getNWSession();
		String state = request.getParameter("state");
		if (handleForm.getState().equals(""))
			handleForm.setState(state);
		
		if (workItemID == null || workItemID.equals(""))
			return;
		if (action != null && action.equals("complete")) {
			NWWorkItemManager workitemManager = nwsession.getWorkItemManager();
			workitemManager.doComplete(workItemID, userID, false);
		}else if (action != null && action.equals("withdraw")) {
			NWWorkItem workItem = nwsession.getWorkItem(userID, workItemID);
			if (workItem.isCanWithDraw()){
				workItem.doWithDraw();
			}else{
				request.setAttribute("withdraw", "withdraw");
			}
		}
		handleForm.setOperation("");
	}

	public ActionForward findForward(ActionMapping mapping, ActionForm form) {
		return mapping.findForward("success");
	}

	public int getItemsCount(String userID, NWSession nwsession,
			ActionMapping mapping, ActionForm form) throws Exception {
		AgentWorkListForm handleForm = (AgentWorkListForm) form;
		String state = handleForm.getState();
		int count = 0;
		if (!state.equals(""))
			count = nwsession.getWorkItemNum(userID, WORKITEMTYPE, Long
					.valueOf(state).longValue());
		return count;
	}

	public Vector openList(String userID, NWSession nwsession,
			ActionMapping mapping, ActionForm form, OpenListParamBean param)
			throws Exception {
		AgentWorkListForm handleForm = (AgentWorkListForm) form;
		String state = handleForm.getState();
		Vector list = new Vector();
		if (!state.equals(""))
			list = nwsession.openWorkItemList(userID, WORKITEMTYPE, Long
					.valueOf(state).longValue(), param.getOrderBy(), param
					.getStart(), param.getOffset(), param.isIsAscending());
		if (list != null && list.size() > 0)
			handleForm
					.setSelectedItem(((com.neusoft.uniflow.api.handler.NWWorkItem) list
							.elementAt(0)).getWorkItemID());

		return list;
	}
}