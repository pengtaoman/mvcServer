package com.neusoft.uniflow.web.standard.procdefmgt.creatandstart.actions;


import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.handler.NWWorkItem;
import com.neusoft.uniflow.web.standard.procdefmgt.creatandstart.forms.CreatRoleForm;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.WorkflowManager;


public class UpdateCreatRoleAction     extends Action {
  public ActionForward execute(ActionMapping mapping,
					 ActionForm form,
					 HttpServletRequest request,
					 HttpServletResponse response) throws Exception {
    HttpSession session = request.getSession();
    NWSession nwsession = WorkflowManager.getNWSession();
    String userID = (String)session.getAttribute(SessionManager.BIZ_USERID);
    CreatRoleForm creatroleForm = (CreatRoleForm) form;

    String id = creatroleForm.getSelectedID();
    String operation = creatroleForm.getOperation();
    NWWorkItem workitem = null;
    try {
	if (operation != null) {// modefied by liwei 2004.11.4
		if (operation.equals("workitem")) {
	     workitem = nwsession.getWorkItem(userID,id);
	     String roleID = creatroleForm.getRoleID();
	     workitem.assignCommitRole(roleID);
	     workitem.doComplete(false);
	   }

	}
    }
    catch (Exception e) {
	session.setAttribute(SessionManager.ERROR,
				   new UniException(e, "error.invokeinterface"));
	return mapping.findForward("error");
    }
    request.setAttribute("roleinfo", new ArrayList());
    request.setAttribute("close_flag", "close");
    return mapping.findForward("success");
  }
}
