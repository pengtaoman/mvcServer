package com.neusoft.uniflow.web.management.agentmgt.create.actions;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.org.NWPerson;
import com.neusoft.org.NWRole;
import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.handler.NWAgent;
import com.neusoft.uniflow.api.handler.NWAgentManager;
import com.neusoft.uniflow.common.NWException;
import com.neusoft.uniflow.util.Util;
import com.neusoft.uniflow.web.management.agentmgt.create.forms.ModifyAgentForm;
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
		String userId = (String) session
				.getAttribute(SessionManager.BIZ_USERID);
		String username = WorkflowManager.getNWOrg().getPerson(userId)
				.getName();
		String agentID = request.getParameter("agentid");
		if (handleForm.getId().equals("") || handleForm.getId() == null)
			handleForm.setId(agentID);
		NWAgentManager agentManager = nwsession.getAgentManager(userId);
		NWAgent agent = agentManager.getAgent(handleForm.getId());
		if (agent != null) {
			if (handleForm.getOperation().equals("ok")) {// 提交修改代理人
				int assigneetype = handleForm.getAssigneType();// 代理人
				int assignertype = handleForm.getAssignerType();// 被代理人
				String assigneeName = handleForm.getAssignee();
				/* 设置代理人 */
				if (assigneetype == 0) {// 代理人为人员
					agent.setAssignee(WorkflowManager.getNWOrg().getPerson(
							handleForm.getAssigneeId()).getID());
					agent.setAssigneeName(handleForm.getAssignee());
					agent.setAssigneeType(0);
				} else if (assigneetype == 1) {// 代理人为角色
					agent.setAssignee(WorkflowManager.getNWOrg().getRole(
							handleForm.getAssigneeId()).getID());
					agent.setAssigneeName(assigneeName);
					agent.setAssigneeType(1);
				} else {
				}

				/* 设置被代理人* */
				if (assignertype == 1) {
					agent.setAssigner(WorkflowManager.getNWOrg().getRole(
							handleForm.getAssignerId()).getID());
					agent.setAssignerName(handleForm.getAssigner());
					agent.setAssignerType(1);
				} else if (assignertype == 0) {
					agent.setAssigner(WorkflowManager.getNWOrg().getPerson(
							handleForm.getAssignerId()).getID());
					agent.setAssignerName(handleForm.getAssigner());
					agent.setAssignerType(0);
				} else {

				}
				Date startTime = Util.parse(handleForm.getStartTime());
				agent.setStartTime(startTime);
				Date endTime = Util.parse(handleForm.getEndTime());
				agent.setEndTime(endTime);
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
				agent.setCreateID(userId);
				agent.setCreateName(username);
				try {
					agent.validate();
					agent.update();
				} catch (NWException e) {
					session.setAttribute(SessionManager.ERROR,
							new UniException(e));
					return mapping.findForward("error");
				}
				request.setAttribute("close_flag", "close");
			} else {// 显示修改页面
				int assigneetype = agent.getAssigneeType();
				int assignertype = agent.getAssignerType();
				if (assigneetype == 0) {// 显示代理人
					NWPerson person1 = WorkflowManager.getNWOrg().getPerson(
							agent.getAssignee());
					if (person1 != null) {
						handleForm.setAssignee(person1.getName());
						handleForm.setAssigneType(assigneetype);
						handleForm.setAssigneeId(person1.getID());
					} else {
						handleForm.setAssignee("");
					}
				} else {
					NWRole role1 = WorkflowManager.getNWOrg().getRole(
							agent.getAssignee());
					if (role1 != null) {
						handleForm.setAssignee(role1.getName());
						handleForm.setAssigneType(assigneetype);
						handleForm.setAssigneeId(role1.getID());
					} else {
						handleForm.setAssignee("");
					}
				}
				if (assignertype == 0) {// 显示被代理人
					NWPerson person = WorkflowManager.getNWOrg().getPerson(
							agent.getAssigner());
					if (person != null) {
						handleForm.setAssigner(person.getName());
						handleForm.setAssignerType(assignertype);
						handleForm.setAssignerId(person.getID());
					} else {
						handleForm.setAssigner("");
					}
				} else if (assignertype == 1) {
					NWRole role = WorkflowManager.getNWOrg().getRole(
							agent.getAssigner());
					if (role != null) {
						handleForm.setAssigner(role.getName());
						handleForm.setAssignerType(assignertype);
						handleForm.setAssignerId(role.getID());
					} else {
						handleForm.setAssigner("");
					}
				}
				handleForm.setStartTime(Util.format(agent.getStartTime()));
				handleForm.setEndTime(Util.format(agent.getEndTime()));
				handleForm.setStartTime_show(Util.format(agent.getStartTime()));
				handleForm.setEndTime_show(Util.format(agent.getEndTime()));
				int agentType = agent.getType();
				if (agentType == 0) {
					handleForm.setCateResName("全部");
					handleForm.setAgentType(0);
				} else if (agentType == 1) {
					handleForm.setCateResName(agent.getCategoryName());
					handleForm.setCateResID(agent.getCategoryID());
					handleForm.setAgentType(1);
				} else if (agentType == 2) {
					handleForm.setCateResName(agent.getProcessName());
					handleForm.setCateResID(agent.getProcessID());
					handleForm.setAgentType(2);
				}
			}// end else
		}
		return mapping.findForward("success");

	}

}