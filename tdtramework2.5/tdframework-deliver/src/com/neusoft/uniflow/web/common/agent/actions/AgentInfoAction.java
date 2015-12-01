package com.neusoft.uniflow.web.common.agent.actions;

import java.util.Date;
import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.api.handler.NWAgent;
import com.neusoft.uniflow.util.Util;
import com.neusoft.uniflow.web.common.agent.forms.AgentInfoForm;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.UniflowManager;

public class AgentInfoAction extends Action {

	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {

		HttpSession session = request.getSession();
		AgentInfoForm agentForm = (AgentInfoForm) form;
		String account = "";
		account = request.getParameter("account");

		String userID;
		Vector agentList = new Vector();
		Vector agentList0 = new Vector();
		try {
			userID = UniflowManager.getNWOrg().getPersonByAccount(account)
					.getID();
			// 作为指派人取得代理列表,显示最新的代理信息
			agentList = UniflowManager.getNWSession().openAgentList(0, userID);
			if (agentList != null && agentList.size() > 0) {
				String assigner = "";
				for (int i = 0; i < agentList.size(); i++) {
					NWAgent agent = (NWAgent) agentList.elementAt(i);
					Date currentDate = new Date();
					if (agent.getStartTime().before(currentDate)
							&& agent.getEndTime().after(currentDate)) {
						String AssigneeInfo = UniflowManager.getNWOrg()
								.getPerson(agent.getAssignee()).getName();
						String AssignerInfo = UniflowManager.getNWOrg()
								.getPerson(agent.getAssigner()).getName();
						assigner = assigner  + "-" + AssignerInfo;

						agentForm.setAssignee(AssigneeInfo);
						agentForm.setAssigner(AssignerInfo);
						agentForm.setStartDate(Util.format(agent.getStartTime()));
						agentForm.setEndDate(Util.format(agent.getEndTime()));

					}
				}
			}
			// 作为代理人取得代理列表,显示最新的代理信息
			agentList0 = UniflowManager.getNWSession().openAgentList(1, userID);
			if (agentList0 != null && agentList0.size() > 0) {
				for (int i = 0; i < agentList0.size(); i++) {
					NWAgent agent = (NWAgent) agentList0.elementAt(i);
					Date currentDate = new Date();
					if (agent.getStartTime().before(currentDate)
							&& agent.getEndTime().after(currentDate)) {
						String AssigneeInfo = UniflowManager.getNWOrg()
								.getPerson(agent.getAssignee()).getName();
						String AssignerInfo = UniflowManager.getNWOrg()
								.getPerson(agent.getAssigner()).getName();

						agentForm.setAssignee(AssigneeInfo);
						agentForm.setAssigner(AssignerInfo);
						agentForm.setStartDate(Util.format(agent.getStartTime()));
						agentForm.setEndDate(Util.format(agent.getEndTime()));
					}
				}
			}
		} catch (Exception e) {
			session.setAttribute(SessionManager.ERROR, new UniException(e));
            return mapping.findForward("error");
		}
		return mapping.findForward("success");
	}

}