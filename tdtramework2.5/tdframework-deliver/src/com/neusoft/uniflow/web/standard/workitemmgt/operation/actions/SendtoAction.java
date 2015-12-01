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

import com.neusoft.org.NWOrg;
import com.neusoft.uniflow.api.def.NWActDef;
import com.neusoft.uniflow.api.handler.NWParticipantDetail;
import com.neusoft.uniflow.api.handler.NWWorkItem;
import com.neusoft.uniflow.common.NWException;
import com.neusoft.uniflow.web.AO.WorkItemAO;
import com.neusoft.uniflow.web.standard.workitemmgt.operation.forms.SendtoForm;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class SendtoAction extends Action {
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) // throws
	// Exception
	{
		WorkItemAO workItemAO = WorkItemAO.getInstance();
		HttpSession session = request.getSession();
		SendtoForm sendtoForm = (SendtoForm) form;
		String action = sendtoForm.getAction();
		String workItemID = sendtoForm.getWorkItemID();
		if (action != null && action.equals("")) { // 列出
			// 取得可send节点
			Vector sendtoList = null;
			try {
				NWOrg org = WorkflowManager.getNWOrg();

				NWWorkItem workitem = workItemAO.getWorkItem(request,
						workItemID);
				String directtoID = workitem.getAppointedDirectAct();
				sendtoForm.setSendto(new String[] { directtoID });
				sendtoList = workitem.getActInst().openDirectSendActList();
				Vector copyToPartList = new Vector(2, 2);
				Vector sendToPartList = new Vector(2, 2);

				// 取得指定得普送抄送列表、初始化屏幕元素。
				Vector ptcps = workitem.openAppointedActPtcpList(directtoID);
				NWParticipantDetail pd;
				for (int i = 0; i < ptcps.size(); i++) {
					pd = (NWParticipantDetail) ptcps.elementAt(i);
					if (pd.getActionType() == 0) { // 抄送
						if (pd.getEntityType() == NWParticipantDetail.PTCPTENTITY_TYPE_PERSON)
							copyToPartList.add(new LabelValueBean(org
									.getPerson(pd.getEntityID()).getName(),
									pd.getEntityType() + pd.getEntityID()));
						else
							copyToPartList.add(new LabelValueBean(org.getRole(
									pd.getEntityID()).getName(), pd
									.getEntityType()
									+ pd.getEntityID()));
					} else {
						if (pd.getEntityType() == NWParticipantDetail.PTCPTENTITY_TYPE_PERSON) {
							sendToPartList.add(new LabelValueBean(org
									.getPerson(pd.getEntityID()).getName(),
									pd.getEntityType() + pd.getEntityID()));
						} else
							sendToPartList.add(new LabelValueBean(org.getRole(
									pd.getEntityID()).getName(), pd
									.getEntityType()
									+ pd.getEntityID()));
					}
				}
				request.setAttribute("sendToPartList", sendToPartList);
				request.setAttribute("copyToPartList", copyToPartList);
			} catch (Exception e) {
				session.setAttribute(SessionManager.ERROR, new UniException(e,
						"error.invokeinterface"));
				return mapping.findForward("error");
			}
			NWActDef actDef;
			for (int i = 0; i < sendtoList.size(); i++) {
				actDef = (NWActDef) sendtoList.elementAt(i);
				sendtoList.setElementAt(new LabelValueBean(actDef.getName(),
						actDef.getID()), i);
			}
			request.setAttribute("sendtoList", sendtoList);
		} else { // OK click
			// 取得send节点ID
			String sendToID = sendtoForm.getSendto()[0];
			String sendtoPartis[] = sendtoForm.getSendToParts();
			String copytoPartis[] = sendtoForm.getCopyToParts();
			try {
				NWWorkItem workItem = workItemAO.getWorkItem(request,
						workItemID);
				workItemAO.assignNextActParticipant(workItem, sendToID,
						sendtoPartis, copytoPartis);
			} catch (NWException e) {
				long msgID = e.getMsgID();
				if (msgID == 22017)
					session.setAttribute(SessionManager.ERROR,
							new UniException(e,
									"error.todolist.worklist.assignparti"));
				else
					session.setAttribute(SessionManager.ERROR,
							new UniException(e,
									"error.todolist.worklist.sendto"));
				return mapping.findForward("error");
			}
			sendtoForm.setAction("ok");
			request.setAttribute("sendtoList", new Vector());
			request.setAttribute("sendToPartList", new Vector());
			request.setAttribute("copyToPartList", new Vector());
		}

		if ("request".equals(mapping.getScope()))
			request.setAttribute(mapping.getAttribute(), sendtoForm);
		else
			session.setAttribute(mapping.getAttribute(), sendtoForm);

		return mapping.findForward("success");
	}
}