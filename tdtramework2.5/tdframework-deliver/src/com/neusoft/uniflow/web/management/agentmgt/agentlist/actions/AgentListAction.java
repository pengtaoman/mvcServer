package com.neusoft.uniflow.web.management.agentmgt.agentlist.actions;

import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.api.NWFilter;
import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.handler.NWAgent;
import com.neusoft.uniflow.api.handler.NWAgentManager;
import com.neusoft.uniflow.util.Util;
import com.neusoft.uniflow.web.common.list.OpenListAction;
import com.neusoft.uniflow.web.common.list.OpenListForm;
import com.neusoft.uniflow.web.common.list.OpenListParamBean;
import com.neusoft.uniflow.web.management.agentmgt.agentlist.beans.AgentBean;
import com.neusoft.uniflow.web.management.agentmgt.agentlist.forms.AgentListForm;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class AgentListAction extends OpenListAction {

	public void handleRequest(String userID, ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		AgentListForm handleForm = (AgentListForm) form;
		NWSession nwsession = WorkflowManager.getNWSession();
		NWAgentManager nwagentManager=nwsession.getAgentManager(userID);
		String agentID = handleForm.getSelectedItem();
		if (handleForm.getOperation().equals("delete"))
			nwagentManager.removeAgent(agentID);

	}

	public int getItemsCount(String userID, NWSession nwsession,
			ActionMapping mapping, ActionForm form) throws Exception {
		int count = 0;
		count = nwsession.getAgentManager(userID).getAgentNum(true, new NWFilter());
		return count;
	}

	public Vector openList(String userID, NWSession nwsession,
			ActionMapping mapping, ActionForm form, OpenListParamBean param)
			throws Exception {
		Vector list = new Vector();
		NWFilter filter = new NWFilter();
		filter.setPageInfo(param.getOrderBy(), param.isIsAscending(), param
				.getStart()-1, param.getOffset());
		NWAgentManager nwagentManager=nwsession.getAgentManager(userID);
		list = nwagentManager.openAgentList(true,filter);
		list = this.convertAgentToBean(list);

		if (list != null && list.size() > 0)
			((OpenListForm) form).setSelectedItem(((AgentBean) list
					.elementAt(0)).getId());
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
