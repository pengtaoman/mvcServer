package com.neusoft.uniflow.web.standard.workitemmgt.operation.actions;

import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.util.LabelValueBean;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.def.NWActDef;
import com.neusoft.uniflow.api.handler.NWWorkItem;
import com.neusoft.uniflow.common.NWException;
import com.neusoft.uniflow.web.standard.workitemmgt.operation.forms.NexttoForm;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class NexttoAction extends Action {
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)// throws
																		// Exception
	{
		HttpSession session = request.getSession();
		NWSession nwsession = WorkflowManager.getNWSession();
		String userID = (String) session
				.getAttribute(SessionManager.BIZ_USERID);
		NexttoForm nexttoForm = (NexttoForm) form;
		String action = nexttoForm.getAction();
		String workItemID = nexttoForm.getWorkitemID();

		if (action != null && action.equals("")) {// 列出
			// 取得可next节点
			Vector nexttoList = null;
			try {
				NWWorkItem workitem = nwsession.getWorkItem(userID, workItemID);
				Vector alreadyNexttoList = workitem.openAppointedNextActList();
				String nexttoArray[] = new String[alreadyNexttoList.size()];
				for (int i = 0; i < alreadyNexttoList.size(); i++) {
					nexttoArray[i] = (String) alreadyNexttoList.elementAt(i);
				}
				nexttoForm.setNextto(nexttoArray);
				nexttoList = workitem.getProcInst().getProcDef().openFollowingActList((workitem.getActDef().getID()));
			} catch (NWException e) {
				session.setAttribute(SessionManager.ERROR, new UniException(e,
						"error.invokeinterface"));
				return mapping.findForward("error");
			}
			NWActDef actDef;
			for (int i = 0; i < nexttoList.size(); i++) {
				actDef = (NWActDef) nexttoList.elementAt(i);
				nexttoList.setElementAt(new LabelValueBean(actDef.getName(),
						actDef.getID()), i);
			}
			request.setAttribute("nexttoList", nexttoList);
		} else {// OK click
			// 取得next节点ID数组
			String nextToIDs[] = nexttoForm.getNextto();
			Vector nexttos = new Vector(nextToIDs.length);
			for (int i = 0; i < nextToIDs.length; i++) {
				nexttos.add(nextToIDs[i]);
			}
			try {
				NWWorkItem workitem = nwsession.getWorkItem(userID, workItemID);
				workitem.assignNextAct(nexttos);
			} catch (NWException e) {
				session.setAttribute(SessionManager.ERROR, new UniException(e,
						"error.todolist.worklist.nextto"));
				return mapping.findForward("error");
			}
			nexttoForm.setAction("ok");
			request.setAttribute("nexttoList", new Vector(1));
		}

		if ("request".equals(mapping.getScope()))
			request.setAttribute(mapping.getAttribute(), nexttoForm);
		else
			session.setAttribute(mapping.getAttribute(), nexttoForm);
		return mapping.findForward("success");
	}

}