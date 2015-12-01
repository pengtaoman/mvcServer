package com.neusoft.uniflow.web.standard.procdefmgt.creatandstart.actions;

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
import com.neusoft.uniflow.web.standard.procdefmgt.creatandstart.forms.CreatRoleForm;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class CreatRoleAction
    extends Action {
  public ActionForward execute(ActionMapping mapping,
					 ActionForm form,
					 HttpServletRequest request,
					 HttpServletResponse response) throws Exception {
    HttpSession session = request.getSession();
//    NWSession nwsession = (NWSession) session.getAttribute(SessionManager.
//	  NWSESSION);
    CreatRoleForm creatroleForm = (CreatRoleForm) form;
    ArrayList roleinfo = new ArrayList();

    String id = request.getParameter("selectedID");
    String operation = request.getParameter("operation");
     try {
	if (operation != null) {
		if (operation.equals("workitem")) {//modefied by liwei 2004.11.4
	    NWOrg org = WorkflowManager.getNWOrg();
	    NWPerson person = org.getPerson((String)session.getAttribute(SessionManager.BIZ_USERID));
	    Vector roles = person.openBelongRoleList();
	    for (int i = 0; i < roles.size(); i++) {
		NWRole role = (NWRole) roles.elementAt(i);
		if(role.getParentRole()!=null)
		roleinfo.add(new LabelValueBean(role.getName(), role.getID()));
	    }
	  } 
	}

    }
    catch (Exception e) {
	session.setAttribute(SessionManager.ERROR,
				   new UniException(e, "error.invokeinterface"));
	return mapping.findForward("error");
    }
    creatroleForm.setSelectedID(id);
    creatroleForm.setOperation(operation);
    request.setAttribute("roleinfo", roleinfo);
    return mapping.findForward("success");
  }
}