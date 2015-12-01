package com.neusoft.uniflow.web.common.myagentmgt.agentlist.actions;

import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.api.NWFilter;
import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.web.common.list.OpenListAction;
import com.neusoft.uniflow.web.common.list.OpenListParamBean;
import com.neusoft.uniflow.web.common.myagentmgt.agentlist.forms.AssigneeWorkListForm;

public class AssigneeWorkListAction extends OpenListAction {
	public void handleRequest(String userID, ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		AssigneeWorkListForm handleForm = (AssigneeWorkListForm) form;

		String state = request.getParameter("state");
		String agentid = request.getParameter("agentid");
		if (handleForm.getState().equals(""))
			handleForm.setState(state);
		if (handleForm.getAgentid() == null
				|| handleForm.getAgentid().equals(""))
			handleForm.setAgentid(agentid);

		handleForm.setOperation("");
	}

	public ActionForward findForward(ActionMapping mapping, ActionForm form) {
		return mapping.findForward("success");
	}

	public int getItemsCount(String userID, NWSession nwsession,
			ActionMapping mapping, ActionForm form) throws Exception {
		int count = 0;
		AssigneeWorkListForm handleForm = (AssigneeWorkListForm) form;
		NWFilter filter = new NWFilter();
		filter.setName(NWFilter.WORKITEM);
		filter.addFilter(NWFilter.W_CURRENT_STATE, NWFilter.OP_E, handleForm
				.getState());
		count = nwsession.getAssigneeWorkItemNum(handleForm.getAgentid(),filter); // 6=运行+激活

		return count;
	}

	public Vector openList(String userID, NWSession nwsession,
			ActionMapping mapping, ActionForm form, OpenListParamBean param)
			throws Exception {
		AssigneeWorkListForm handleForm = (AssigneeWorkListForm) form;
		Vector list = new Vector();
		NWFilter filter = new NWFilter();
		filter.setName(NWFilter.WORKITEM);
		filter.addFilter(NWFilter.W_CURRENT_STATE, NWFilter.OP_E, handleForm
				.getState());

		filter.setPageInfo(param.getOrderBy(), param.isIsAscending(), param
				.getStart(), param.getOffset());
		list = nwsession.openAssigneeWorkItemList(handleForm.getAgentid(),filter);
		if (list != null && list.size() > 0)
			handleForm
					.setSelectedItem(((com.neusoft.uniflow.api.handler.NWWorkItem) list
							.elementAt(0)).getWorkItemID());

		return list;
	}
}