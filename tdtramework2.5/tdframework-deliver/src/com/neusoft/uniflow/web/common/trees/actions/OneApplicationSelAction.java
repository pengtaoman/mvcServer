package com.neusoft.uniflow.web.common.trees.actions;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.web.common.trees.beans.ApplicationListTree;




public class OneApplicationSelAction extends Action {
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {

		String activityID = request.getParameter("activityid");
		ApplicationListTree listtree = new ApplicationListTree(activityID);
        request.setAttribute("listtree", listtree);
		
		 return mapping.findForward("success");

	}

}
