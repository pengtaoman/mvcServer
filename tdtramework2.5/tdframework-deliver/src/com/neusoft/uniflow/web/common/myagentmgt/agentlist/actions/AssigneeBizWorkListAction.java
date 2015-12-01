package com.neusoft.uniflow.web.common.myagentmgt.agentlist.actions;

import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.util.LabelValueBean;

import com.neusoft.uniflow.api.NWFilter;
import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.common.NWException;
import com.neusoft.uniflow.web.common.list.OpenListAction;
import com.neusoft.uniflow.web.common.list.OpenListParamBean;
import com.neusoft.uniflow.web.common.myagentmgt.agentlist.forms.AssigneeBizWorkListForm;
import com.neusoft.uniflow.web.util.CommonInfoManager;
import com.neusoft.uniflow.web.util.MessageUtil;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class AssigneeBizWorkListAction extends OpenListAction {

	public void handleRequest(String userID, ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws NWException {

		AssigneeBizWorkListForm handleForm = (AssigneeBizWorkListForm) form;
		HttpSession session = request.getSession();
		NWSession nwsession = WorkflowManager.getNWSession();

		String categoryview = request.getParameter("categoryview");
		String agentid = request.getParameter("agentid");
		String state = request.getParameter("state");
		if (handleForm.getCategoryview() == null
				|| handleForm.getCategoryview().equals(""))
			handleForm.setCategoryview(categoryview);
		if (handleForm.getAgentid() == null
				|| handleForm.getAgentid().equals(""))
			handleForm.setAgentid(agentid);
		if (handleForm.getState() == null || handleForm.getState().equals(""))
			handleForm.setState(state);
		Vector cond = CommonInfoManager.getBizQueryCond(nwsession, handleForm
				.getCategoryview());
		session.setAttribute(SessionManager.BIZWICATEGORY, cond);
		session.setAttribute("cond", cond);
		Vector oper = CommonInfoManager.getQueryOper();
		session.setAttribute("oper", oper);
		Vector conOper = CommonInfoManager.getQueryConOper();
		session.setAttribute("conOper", conOper);
		Vector query = new Vector();
		String[] qus = handleForm.getFilter().split("#");
		for (int i = 1; i < qus.length; i++) {
			String qu = "#" + qus[i];
			String quLable = MessageUtil.getString("workflow.extend.workitem.list.condition",request.getSession()) + (i - 1) + ":" + qus[i];
			query.add(new LabelValueBean(quLable, qu));
		}
		session.setAttribute("querys", query);
	}

	public int getItemsCount(String userID, NWSession nwsession,
			ActionMapping mapping, ActionForm form) throws Exception {
		AssigneeBizWorkListForm bizWorkForm = (AssigneeBizWorkListForm) form;
		int count = 0;
		NWFilter filter = new NWFilter();
		filter.setName(NWFilter.WORKITEM);
		filter.addFilter(NWFilter.W_CURRENT_STATE, NWFilter.OP_E, bizWorkForm
				.getState());

		if (bizWorkForm.getFilter() != null
				&& !bizWorkForm.getFilter().equals("")) {
			filter.addFilterStr(bizWorkForm.getFilter().replace('#', ' '));
		}
		count = nwsession.getAssigneeWorkItemNum(bizWorkForm.getAgentid(),bizWorkForm.getCategoryview(),filter); // 6=运行+激活

		return count;
	}

	public Vector openList(String userID, NWSession nwsession,
			ActionMapping mapping, ActionForm form, OpenListParamBean param)
			throws Exception {

		AssigneeBizWorkListForm bizWorkForm = (AssigneeBizWorkListForm) form;
		Vector list = new Vector();
		NWFilter filter = new NWFilter();
		filter.setName(NWFilter.WORKITEM);
		filter.addFilter(NWFilter.W_CURRENT_STATE, NWFilter.OP_E, bizWorkForm
				.getState());
		if (bizWorkForm.getFilter() != null
				&& !bizWorkForm.getFilter().equals("")) {
			filter.addFilterStr(bizWorkForm.getFilter().replace('#', ' '));
		}
		filter.setPageInfo(param.getOrderBy(), param.isIsAscending(), param
				.getStart(), param.getOffset());
		list = nwsession.openAssigneeWorkItemList(bizWorkForm.getAgentid(),bizWorkForm.getCategoryview(),filter);
		if (list != null && list.size() > 0)
			bizWorkForm
					.setSelectedItem(((com.neusoft.uniflow.api.handler.NWWorkItem) list
							.elementAt(0)).getWorkItemID());

		return list;
	}
}