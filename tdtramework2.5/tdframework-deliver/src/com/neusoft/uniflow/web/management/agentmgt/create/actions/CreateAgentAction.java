package com.neusoft.uniflow.web.management.agentmgt.create.actions;

import java.util.Date;
import java.util.Hashtable;
import java.util.Vector;

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
import com.neusoft.uniflow.web.management.agentmgt.create.forms.CreateAgentForm;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.UniflowManager;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class CreateAgentAction extends Action {
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		CreateAgentForm handleForm = (CreateAgentForm) form;

		HttpSession session = request.getSession();
		String userId = (String) session
				.getAttribute(SessionManager.BIZ_USERID);
		NWSession nwsession = WorkflowManager.getNWSession();

		if (handleForm.getOperation().equals("ok")) {
			String agentType = handleForm.getAgenttype();// 取出代理类型
			if (agentType.equals("0")) {
				NWAgentManager agentmanager = nwsession.getAgentManager(userId);
				NWAgent agent = agentmanager.createAgent();
				int assignetype = handleForm.getAssigneType();// 代理人
				String assigneeId = handleForm.getAssigneeId();
				if (assignetype == 0) {
					if (!assigneeId.equals(""))
						agent.setAssignee(UniflowManager.getNWOrg().getPerson(
								assigneeId).getID());
					agent.setAssigneeName(handleForm.getAssignee());
					agent.setAssigneeType(0);
				} else if (assignetype == 1) {
					agent.setAssignee(UniflowManager.getNWOrg().getRole(
							assigneeId).getID());
					agent.setAssigneeName(handleForm.getAssignee());
					agent.setAssigneeType(1);
				}// end 代理人
				int assignertype = handleForm.getAssignerType();// 被代理人
				String assignerId = handleForm.getAssignerId();
				if (assignertype == 0) {
					agent.setAssigner(UniflowManager.getNWOrg().getPerson(
							assignerId).getID());
					agent.setAssignerName(handleForm.getAssigner());
					agent.setAssignerType(0);
				} else if (assignertype == 1) {
					agent.setAssigner(UniflowManager.getNWOrg().getRole(
							assignerId).getID());
					agent.setAssignerName(handleForm.getAssigner());
					agent.setAssignerType(1);
				}// end 被代理人
				Date startTime = Util.parse(handleForm.getStartTime());
				agent.setStartTime(startTime);
				Date endTime = Util.parse(handleForm.getEndTime());
				agent.setEndTime(endTime);
				agent.setCreateID(userId);
				agent.setCreateName(UniflowManager.getNWOrg().getPerson(userId)
						.getName());
				agent.setType(0);
				agent.setCategoryID("");
				agent.setCategoryName("");
				agent.setProcessID("");
				agent.setProcessName("");
				try {
					agent.validate();
					agent.update();
				} catch (NWException e) {
					session.setAttribute(SessionManager.ERROR,
							new UniException(e));
					return mapping.findForward("error");
				}
			} else if (agentType.equals("1")) {
				Vector selected = new Vector();
				Hashtable ht = new Hashtable();
				String categories = handleForm.getCategories();
				if (categories != null && !categories.equals("")) {
					categories = categories.substring(0,
							categories.length() - 1);

					String[] categoryInfo = categories.split(";");
					for (int i = 0; i < categoryInfo.length; i++) {
						String[] category = categoryInfo[i].split(",");
						String categoryId = category[1].split("#")[0];
						selected.add(category[1]);
						String categoryName = category[0].split("]")[1];
						ht.put(categoryId, categoryName);
					}
					for (int i = 0; i < selected.size(); i++) {
						String item = (String) selected.elementAt(i);
						String[] temp = item.split("#");
						String type = temp[1];
						String id = temp[0];
						NWAgentManager agentmanager = nwsession
								.getAgentManager(userId);
						NWAgent agent = agentmanager.createAgent();
						int assignetype = handleForm.getAssigneType();// 代理人
						String assigneeId = handleForm.getAssigneeId();
						if (assignetype == 0) {
							if (!assigneeId.equals(""))
								agent.setAssignee(UniflowManager.getNWOrg()
										.getPerson(assigneeId).getID());
							agent.setAssigneeName(handleForm.getAssignee());
							agent.setAssigneeType(0);
						} else if (assignetype == 1) {
							agent.setAssignee(UniflowManager.getNWOrg()
									.getRole(assigneeId).getID());
							agent.setAssigneeName(handleForm.getAssignee());
							agent.setAssigneeType(1);
						}// end 代理人
						int assignertype = handleForm.getAssignerType();// 被代理人
						String assignerId = handleForm.getAssignerId();
						if (assignertype == 0) {
							agent.setAssigner(UniflowManager.getNWOrg()
									.getPerson(assignerId).getID());
							agent.setAssignerName(handleForm.getAssigner());
							agent.setAssignerType(0);
						} else if (assignertype == 1) {
							agent.setAssigner(UniflowManager.getNWOrg()
									.getRole(assignerId).getID());
							agent.setAssignerName(handleForm.getAssigner());
							agent.setAssignerType(1);
						}// end 被代理人
						Date startTime = Util.parse(handleForm.getStartTime());
						agent.setStartTime(startTime);
						Date endTime = Util.parse(handleForm.getEndTime());
						agent.setEndTime(endTime);
						agent.setCreateID(userId);
						agent.setCreateName(UniflowManager.getNWOrg()
								.getPerson(userId).getName());

						if (type.equals("2")) {
							agent.setType(2);
							agent.setProcessID(id);
							agent.setProcessName((String) ht.get(id));
							agent.setCategoryID("");
							agent.setCategoryName("");
						} else if (type.equals("1")) {
							agent.setType(1);
							agent.setCategoryID(id);
							agent.setCategoryName((String) ht.get(id));
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
					}
				}
			}
			request.setAttribute("close_flag", "close");
		} else {
			handleForm.setAgenttype("0");
		}
		return mapping.findForward("success");

	}

}
