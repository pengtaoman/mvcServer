package com.neusoft.uniflow.web.common.apptree.actions;

import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.web.common.apptree.beans.ApplicationTree;
import com.neusoft.uniflow.web.common.apptree.forms.OneApplicationSelForm;

public class OneApplicationSelAction extends Action {
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		HttpSession session = request.getSession();
		OneApplicationSelForm appform = (OneApplicationSelForm) form;
		String activityID = request.getParameter("activityid");
		String type = request.getParameter("actiontype");
		// appform�в���������Ϊ��������չʱʹ�ã����Բ���appform�м�¼����
		if (appform.getActivityid() == null
				|| appform.getActivityid().equals(""))
			appform.setActivityid(activityID);
		if (appform.getActiontype() == null
				|| appform.getActiontype().equals(""))
			appform.setActiontype(type);
		if (appform.getActivityid() != null && !appform.getActivityid().equals("")
				&& appform.getActiontype()!= null && !appform.getActiontype().equals("")) {
			ApplicationTree appTree = (ApplicationTree) session
					.getAttribute(appform.getActivityid()+appform.getActiontype());
			if (appTree == null) {
				ApplicationTree newappTree = new ApplicationTree(appform
						.getActivityid());
				session.setAttribute(appform.getActivityid()+appform.getActiontype(), newappTree);
			} else {
				if (!appform.getExpand().equals("")
						&& appform.getOperation().equals("expand")) {
					appTree.expandNode(appform.getExpand());
				}
				if (!appform.getChoseid().equals("")
						&& appform.getOperation().equals("choose")) {
					Vector usedActList = appTree.getUsedActList();
					if (usedActList.contains(appform.getChoseid())) {
						usedActList.remove(appform.getChoseid());
					} else {
						usedActList.add(appform.getChoseid());
					}
				}
			}
		} else {
			return mapping.findForward("blank");
		}
		return mapping.findForward("success");
	}

}