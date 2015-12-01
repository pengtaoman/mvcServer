package com.neusoft.uniflow.web.common.notify.actions;

import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.org.NWPerson;
import com.neusoft.org.NWRole;
import com.neusoft.uniflow.api.def.NWActDef;
import com.neusoft.uniflow.api.def.NWParticipantEntity;
import com.neusoft.uniflow.api.handler.NWRelDataInst;
import com.neusoft.uniflow.api.handler.NWWorkItem;
import com.neusoft.uniflow.util.Util;
import com.neusoft.uniflow.web.common.notify.forms.NotifyInfoForm;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class NotifyInfoAction extends Action {

	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		NotifyInfoForm notifyForm = (NotifyInfoForm) form;
		String wid = request.getParameter("workitemID");
		String action=request.getParameter("action");
		if (wid != null && !wid.equals(""))
			notifyForm.setWid(wid);
		String userid = WorkflowManager.getNWSession().getUserID();
		NWWorkItem wi = null;
		if (notifyForm.getWid() != null) {
			wi = WorkflowManager.getNWSession().getWorkItem(userid,
					notifyForm.getWid());
			Vector nextacts = wi.getActInst().openNextActList();
			String actNames = "";
			String actUsers = "";
			for (int i = 0; i < nextacts.size(); i++) {
				NWActDef actdef = (NWActDef) nextacts.elementAt(i);
				actNames = actNames + actdef.getName() + ";";
				String user=getUserInfo(wi, actdef.openParticipantList());
				if(!Util.isNullOrEmpty(user))
					actUsers = actUsers+ user+";";
			}
			notifyForm.setNextact(actNames);
			notifyForm.setNextuser(actUsers);
			if (notifyForm.getAction().equals("OK")) {
				NWRelDataInst rd = WorkflowManager.getNWSession().newRelDataInst();
				rd.setName("$msg");
				String isMail=Boolean.toString(notifyForm.isIfmail());
				String isMessage=Boolean.toString(notifyForm.isIfmessage());
				String isOther=Boolean.toString(notifyForm.isIfother());
				StringBuffer msgStr=new StringBuffer();
				msgStr.append(isMail).append("#").append(isMessage).append("#").append(isOther)
				.append("#").append(notifyForm.getSubject()).append("#").append(notifyForm.getContent());
				rd.setValue(msgStr.toString());
				
				if (notifyForm.isIfmail() || notifyForm.isIfmessage()
						|| notifyForm.isIfother())
				{
					request.setAttribute("flag", "success");
					wi.saveRelData(rd);
				}
				else
					request.setAttribute("flag", "nosetting");

			}
			else if(action!=null&&action.equalsIgnoreCase("open"))
			{
				NWRelDataInst rd =wi.getRelData("$msg");
				if(rd!=null&&(!Util.isNullOrEmpty(rd.getValue())))
				{
					String value=rd.getValue();
					String[] msgs=value.split("#");
					boolean isMail=Boolean.valueOf(msgs[0]).booleanValue();
					boolean isMessage=Boolean.valueOf(msgs[1]).booleanValue();
					boolean isOther=Boolean.valueOf(msgs[2]).booleanValue();
					if(msgs.length>3)
						notifyForm.setSubject(msgs[3]);
					if(msgs.length>4)
						notifyForm.setContent(msgs[3]);
					notifyForm.setIfmail(isMail);
					notifyForm.setIfmessage(isMessage);
					notifyForm.setIfother(isOther);
					
					
					
				}
				
			}
				
		}

		return mapping.findForward("success");
	}

	private String getUserInfo(NWWorkItem wi, Vector participantList)
			throws Exception {
		String user = "";
		for (int i = 0; i < participantList.size(); i++) {
			NWParticipantEntity par = (NWParticipantEntity) participantList
					.elementAt(i);
			if (par.getEntityType() == 0) {
				NWPerson ps = WorkflowManager.getNWOrg().getPerson(
						par.getEntityID());
				if (ps != null)
					user = user + ps.getAccount() + ",";
			} else if (par.getEntityType() == 1) {
				NWRole ps = WorkflowManager.getNWOrg().getRole(
						par.getEntityID());
				if (ps != null)
					user = user + ps.getName() + ",";
			} else if (par.getEntityType() == 2) {
				user = user
						+ WorkflowManager.getNWOrg().getPerson(
								wi.getProcInst().getCreater()).getAccount()
						+ ",";
			}
		}
		if (user.indexOf(",") > 0)
			return user.substring(0, user.length() - 1);
		else
			return "";
	}
}