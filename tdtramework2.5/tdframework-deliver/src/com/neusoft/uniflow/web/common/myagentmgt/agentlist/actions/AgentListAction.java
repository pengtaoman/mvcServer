package com.neusoft.uniflow.web.common.myagentmgt.agentlist.actions;

import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;

import com.neusoft.org.NWOrg;
import com.neusoft.org.NWPerson;
import com.neusoft.uniflow.api.NWFilter;
import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.handler.NWAgent;
import com.neusoft.uniflow.api.handler.NWAgentManager;
import com.neusoft.uniflow.util.Util;
import com.neusoft.uniflow.web.common.list.OpenListAction;
import com.neusoft.uniflow.web.common.list.OpenListForm;
import com.neusoft.uniflow.web.common.list.OpenListParamBean;
import com.neusoft.uniflow.web.common.myagentmgt.agentlist.beans.AgentBean;
import com.neusoft.uniflow.web.common.myagentmgt.agentlist.forms.AgentListForm;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class AgentListAction extends OpenListAction {
	private NWOrg org;

	public void handleRequest(String userID, ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		AgentListForm handleForm = (AgentListForm) form;
		NWSession nwsession = WorkflowManager.getNWSession();
		this.org = WorkflowManager.getNWOrg();
		String agentID = handleForm.getSelectedItem();
		NWPerson person = org.getPerson((String)request.getSession().getAttribute(SessionManager.BIZ_USERID));
		String Assigner = "";
		if (person!=null)
			Assigner = person.getName();
		request.setAttribute("Assigner", Assigner);
		if (handleForm.getOperation().equals("delete")) {
			int temp = agentID.indexOf("#");
			agentID = agentID.substring(0, temp);
			NWAgentManager agentManager=nwsession.getAgentManager(userID);
			agentManager.removeAgent(agentID);
		}
	}

	public int getItemsCount(String userID, NWSession nwsession,
			ActionMapping mapping, ActionForm form) throws Exception {
		int count = 0;
		NWFilter filter = new NWFilter();
		filter.setName(NWFilter.AGENT);
		filter.addFilter(NWFilter.AGENT_AGENT_USER, NWFilter.OP_E, userID);
		filter.addFilter(NWFilter.AGENT_ORIGIN_USER, NWFilter.OP_E, userID,
				NWFilter.OP_OR);
		count = nwsession.getAgentManager(userID).getAgentNum(true,filter);
		return count;
	}

	public Vector openList(String userID, NWSession nwsession,
			ActionMapping mapping, ActionForm form, OpenListParamBean param)
			throws Exception {
		Vector list = new Vector();
		NWFilter filter = new NWFilter();
		filter.setName(NWFilter.AGENT);
		filter.addFilter(NWFilter.AGENT_AGENT_USER, NWFilter.OP_E, userID);
		filter.addFilter(NWFilter.AGENT_ORIGIN_USER, NWFilter.OP_E, userID,
				NWFilter.OP_OR);
		filter.setPageInfo(param.getOrderBy(), param.isIsAscending(), param
				.getStart(), param.getOffset());
		NWAgentManager nwagentManager=nwsession.getAgentManager(userID);
		list = nwagentManager.openAgentList(true, filter);// origin
		list = this.convertAgentToBean(list);
		if (list != null && list.size() > 0)
			((OpenListForm) form).setSelectedItem(((AgentBean) list
					.elementAt(0)).getId()
					+ "#" + ((AgentBean) list.elementAt(0)).getAssigner());
		return list;

	}

	private Vector convertAgentToBean(Vector list) throws Exception {
		Vector blist = new Vector();
		for (int i = 0; i < list.size(); i++) {
			NWAgent agent = (NWAgent) list.elementAt(i);
			AgentBean bean = new AgentBean();
			bean.setId(agent.getID());
			bean.setAssignee(agent.getAssigneeName());
			bean.setAssigner(agent.getAssignerName());
			bean.setStime(Util.format(agent.getStartTime()));
			bean.setEtime(Util.format(agent.getEndTime()));
			bean.setCreateID(agent.getCreateID());
			bean.setCreateName(agent.getCreateName());
			bean.setType(agent.getType());
			if(agent.getProcessID()!=null){
				bean.setProcessID(agent.getProcessID());
				bean.setProcessName(agent.getProcessName());
			}else{
				bean.setProcessID("");
				bean.setProcessName("");
			}
			if(agent.getCategoryID()!=null){
				bean.setCategoryID(agent.getCategoryID());
				bean.setCategoryName(agent.getCategoryName());
			}else{
				bean.setCategoryID("");
				bean.setCategoryName("");
			}
			bean.setCreateID(agent.getCreateID());
			bean.setCreateName(agent.getCreateName());
			blist.add(bean);
		}

		return blist;
	}
}
