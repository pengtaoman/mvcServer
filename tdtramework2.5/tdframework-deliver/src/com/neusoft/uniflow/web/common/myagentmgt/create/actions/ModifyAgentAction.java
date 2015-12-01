package com.neusoft.uniflow.web.common.myagentmgt.create.actions;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.handler.NWAgent;
import com.neusoft.uniflow.api.handler.NWAgentManager;
import com.neusoft.uniflow.common.NWException;
import com.neusoft.uniflow.util.Util;
import com.neusoft.uniflow.web.common.myagentmgt.create.forms.ModifyAgentForm;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class ModifyAgentAction extends Action {
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		ModifyAgentForm handleForm = (ModifyAgentForm) form;
		HttpSession session = request.getSession();
		NWSession nwsession = WorkflowManager.getNWSession();
		String agentID = request.getParameter("agentid");
		if (handleForm.getId().equals("") || handleForm.getId() == null) {
			handleForm.setId(agentID);
		}
		String userId = (String) session
				.getAttribute(SessionManager.BIZ_USERID);
		String userAccount = (String) session.getAttribute(SessionManager.USER);
		String userName = WorkflowManager.getNWOrg().getPerson(userId)
				.getName();
		NWAgentManager agentManager = nwsession.getAgentManager(userId);
		NWAgent agent = agentManager.getAgent(handleForm.getId());
		// System.out.println(agentID)
		if (agent != null) {
			if (handleForm.getOperation().equals("ok")) {
				int assigneetype = handleForm.getAssigneType();
				if (assigneetype == 0) {
					agent.setAssignee(WorkflowManager.getNWOrg().getPerson(
							handleForm.getAssigneeId()).getID());
					agent.setAssigneeName(handleForm.getAssignee());
					agent.setAssigneeType(0);
				} else if (assigneetype == 1) {
					agent.setAssignee(handleForm.getAssigneeId());
					agent.setAssigneeName(handleForm.getAssignee());
					agent.setAssigneeType(1);
				} else {

				}
				agent.setAssigner(userId);
				agent.setAssignerName(userName);
				agent.setAssignerType(0);
				Date startTime = Util.parse(handleForm.getStartTime());
				agent.setStartTime(startTime);
				Date endTime = Util.parse(handleForm.getEndTime());
				agent.setEndTime(endTime);
				agent.setCreateID(userId);
				agent.setCreateName(userName);
				String cateResName = handleForm.getCateResName();
				String cateResID = handleForm.getCateResID();
				if (handleForm.getAgentType() == 2) {
					agent.setType(2);
					agent.setProcessID(cateResID);
					agent.setProcessName(cateResName);
					agent.setCategoryID("");
					agent.setCategoryName("");
				} else if (handleForm.getAgentType() == 1) {
					agent.setType(1);
					agent.setCategoryID(cateResID);
					agent.setCategoryName(cateResName);
					agent.setProcessID("");
					agent.setProcessName("");
				}
				try {
					agent.validate();
					agent.update();
				} catch (NWException e) {
					session.setAttribute(SessionManager.ERROR,
							new UniException(e));
					return mapping.findForward("error");
				}
				request.setAttribute("close_flag", "close");
			} else {
				int assigneeType = agent.getAssigneeType();
				handleForm.setAssignee(agent.getAssigneeName());
				handleForm.setAssigneeId(agent.getAssignee());
				handleForm.setAssigneType(assigneeType);

				handleForm.setStartTime(Util.format(agent.getStartTime()));
				handleForm.setEndTime(Util.format(agent.getEndTime()));
				handleForm.setStartTime_show(Util.format(agent.getStartTime()));
				handleForm.setEndTime_show(Util.format(agent.getEndTime()));
				int type = agent.getType();
				if (type == 0) {
					handleForm.setCateResName("全部");
					handleForm.setAgentType(0);
				} else if (type == 1) {
					handleForm.setCateResName(agent.getCategoryName());
					handleForm.setCateResID(agent.getCategoryID());
					handleForm.setAgentType(1);
				} else if (type == 2) {
					handleForm.setCateResName(agent.getProcessName());
					handleForm.setCateResID(agent.getProcessID());
					handleForm.setAgentType(2);
				}

			}// end else
		}
		return mapping.findForward("success");

	}

}