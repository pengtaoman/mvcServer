package com.neusoft.uniflow.web.standard.workitemmgt.operation.actions;

import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.handler.NWADHocStep;
import com.neusoft.uniflow.api.handler.NWWorkItem;
import com.neusoft.uniflow.web.standard.workitemmgt.operation.forms.AdhocForm;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.WorkflowManager;


public class AdhocAction extends Action
{
	public ActionForward execute(ActionMapping mapping, ActionForm form,
					     HttpServletRequest request,
					     HttpServletResponse response)
	{
		AdhocForm adhocForm = (AdhocForm) form;
		HttpSession session = request.getSession();
		NWSession nwsession = WorkflowManager.getNWSession();
		String userID = (String) session.getAttribute(SessionManager.
		    BIZ_USERID);
		String workItemID = adhocForm.getWorkItemID();
		String action = adhocForm.getAction();
		try {
			if (action != null && action.equals("")) { //打开ad-hoc页面
					adhocForm.setEditable(true);
					request.setAttribute("steplist", new Vector());
				adhocForm.setAction(AdhocForm.ACTION_UPDATE);
			}
			else if (action != null && action.equals(AdhocForm.ACTION_UPDATE)) { //update
				Vector stepList = new Vector(15);
				NWWorkItem workitem = nwsession.getWorkItem(userID,
				    workItemID);
				NWADHocStep preStep = null;
					String[] steps = adhocForm.getSteps();
					String step = "";
					NWADHocStep ifStep = null;
					for (int i = 0; i < steps.length; i++) {
						step = steps[i];
						ifStep = workitem.createADHocStep(preStep);
						ifStep.setParticipantType(Integer.parseInt(
						    step.substring(0, 1)));
						ifStep.setParticipantID(step.substring(1));
						preStep = ifStep;
						stepList.add(ifStep);
					}
					workitem.saveADHoc(stepList);
					workitem.startADHoc();

				adhocForm.setAction(AdhocForm.ACTION_UPDATE_OK);
				request.setAttribute("steplist", new Vector());
			}
		}
		catch (Exception e) {
			session.setAttribute(SessionManager.ERROR, new UniException(e));
			return mapping.findForward("error");
		}

		if ("request".equals(mapping.getScope()))
			request.setAttribute(mapping.getAttribute(), adhocForm);
		else
			session.setAttribute(mapping.getAttribute(), adhocForm);

		return mapping.findForward("success");
	}
}