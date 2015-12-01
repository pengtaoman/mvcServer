/*
 * Created on 2004-12-16
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.uniflow.web.standard.workitemmgt.operation.actions;

import java.util.ArrayList;
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
import com.neusoft.org.NWPerson;
import com.neusoft.org.NWRole;
import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.def.NWActDef;
import com.neusoft.uniflow.api.def.NWParticipantEntity;
import com.neusoft.uniflow.api.handler.NWParticipantDetail;
import com.neusoft.uniflow.api.handler.NWWorkItem;
import com.neusoft.uniflow.web.standard.workitemmgt.operation.forms.UpdatePartiActionForm;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class UpdatePartiAction extends Action {
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) {
		HttpSession session = request.getSession();
		NWSession nwsession = WorkflowManager.getNWSession();
		String workitemid = (String) request.getParameter("workitemid");
		String actid = (String) request.getParameter("activityid");
		String userID = (String)session.getAttribute(SessionManager.BIZ_USERID);
		Vector NextActParticipant = (Vector) session.getAttribute(actid);
		UpdatePartiActionForm updateNextActForm = (UpdatePartiActionForm) form;
		String action = updateNextActForm.getAction();
		
		if (updateNextActForm.getActivityid().equals(""))
			updateNextActForm.setActivityid(actid);

		if (action != null && action.equals("")) { // 列出
			try {
				NWWorkItem workitem = nwsession.getWorkItem(userID,workitemid);
				NWActDef actdef = workitem.getProcDef().getActivity(updateNextActForm.getActivityid());
				Vector partiList = actdef.openParticipantList();
				Vector new_partList = new Vector();
				if (NextActParticipant!=null){
					new_partList = NextActParticipant;
				}else{
					new_partList = workitem.openAppointedActPtcpList(updateNextActForm.getActivityid());
				}
				NWOrg org = WorkflowManager.getNWOrg();				
				NWParticipantEntity pd;
				ArrayList partiInfo = new ArrayList();
				for (int i = 0; i < partiList.size(); i++) {
					pd = (NWParticipantEntity) partiList.elementAt(i);
					if (pd.getEntityType() == NWParticipantEntity.PTCPTENTITY_TYPE_PERSON) {
						NWPerson psn = org.getPerson(pd.getEntityID());
						if (psn != null) {
							partiInfo.add(new LabelValueBean(psn.getName(), pd
									.getEntityType()
									+ "#" + pd.getEntityID()));
						} else {
							partiInfo
									.add(new LabelValueBean(pd.getEntityID(),
											pd.getEntityType() + "#"
													+ pd.getEntityID()));
						}

					} else if (pd.getEntityType() == NWParticipantEntity.PTCPTENTITY_TYPE_ROLE) {
						
						NWRole role = org.getRole(pd.getEntityID());
						if (role != null) {
							partiInfo.add(new LabelValueBean(role.getName(), pd
									.getEntityType()
									+ "#" + pd.getEntityID()));
						} else {
							partiInfo
									.add(new LabelValueBean(pd.getEntityID(),
											pd.getEntityType() + "#"
													+ pd.getEntityID()));
						}

					}
				}
				ArrayList partiInfo_new = new ArrayList();
				for (int i = 0; i < new_partList.size(); i++) {
					pd = (NWParticipantEntity) new_partList.elementAt(i);
					if (pd.getEntityType() == NWParticipantEntity.PTCPTENTITY_TYPE_PERSON) {
						NWPerson psn = org.getPerson(pd.getEntityID());
						if (psn != null) {
							partiInfo_new
									.add(new LabelValueBean(psn.getName(), pd
											.getEntityType()
											+ "#" + pd.getEntityID()));
						} else {
							partiInfo_new.add(new LabelValueBean(pd
									.getEntityID(), pd.getEntityType() + "#"
									+ pd.getEntityID()));
						}

					} else if (pd.getEntityType() == NWParticipantEntity.PTCPTENTITY_TYPE_ROLE) {
						NWRole role = org.getRole(pd.getEntityID());
						if (role != null) {
							partiInfo_new.add(new LabelValueBean(
									role.getName(), pd.getEntityType() + "#"
											+ pd.getEntityID()));
						} else {
							partiInfo_new.add(new LabelValueBean(pd
									.getEntityID(), pd.getEntityType() + "#"
									+ pd.getEntityID()));
						}

					}
				}
				request.setAttribute("partiInfo", partiInfo);
				request.setAttribute("partiInfo_new", partiInfo_new);

			} catch (Exception e) {
				session.setAttribute(SessionManager.ERROR, new UniException(e,
						"error.invokeinterface"));
				return mapping.findForward("error");
			}
		} else {
			String[] newParti = updateNextActForm.getParti_new();
			Vector partiList = new Vector();
			String parti;
			NWParticipantDetail partient = null;
			partiList.removeAllElements();
			for (int i = 0; i < newParti.length; i++) {
				parti = newParti[i];
				partient = nwsession.newParticipantDetail();
				String[] typeID = parti.split("#");
				partient.setEntityType(Integer.parseInt(typeID[0]));
				partient.setEntityID(typeID[1]);
				partiList.add(partient);
			}
			session.setAttribute(updateNextActForm.getActivityid(), partiList);
			updateNextActForm.setAction("ok");
			request.setAttribute("partiInfo", new ArrayList(1));
			request.setAttribute("partiInfo_new", new ArrayList(1));
		}

		if ("request".equals(mapping.getScope()))
			request.setAttribute(mapping.getAttribute(), updateNextActForm);
		else
			session.setAttribute(mapping.getAttribute(), updateNextActForm);

		return mapping.findForward("success");
	}
}
