package com.neusoft.uniflow.web.common.login.actions;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.web.common.trees.beans.NWListTree;
import com.neusoft.uniflow.web.util.CommonInfoManager;


public class ListTreeAction extends Action {

	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {

        NWListTree listtree = CommonInfoManager.getNWListTree(request.getSession());
        request.setAttribute("listtree", listtree);
		return mapping.findForward("success");
	}
}