package com.neusoft.uniflow.web.authorization.purview.actions;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import com.neusoft.org.NWOrg;

import com.neusoft.uniflow.web.common.trees.beans.OrgTree;

import com.neusoft.uniflow.web.util.SessionManager;


import com.neusoft.uniflow.web.util.WorkflowManager;

public class PurViewAction extends Action {
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) {
		HttpSession session = request.getSession();

		NWOrg org = WorkflowManager.getNWOrg();
		OrgTree tree = (OrgTree) session.getAttribute(SessionManager.ORGTREE);
		if (tree == null)
			tree = new OrgTree(org);
		session.setAttribute(SessionManager.ORGTREE, tree);


		return mapping.findForward("success");
	}

}