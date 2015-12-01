package com.neusoft.uniflow.web.management.organization.actions;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.beanutils.PropertyUtils;
import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.org.NWOrg;
import com.neusoft.org.NWPerson;
import com.neusoft.uniflow.web.management.organization.forms.PersonForm;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class EdituserAction
    extends Action {
  public ActionForward execute(ActionMapping mapping,
					 ActionForm form,
					 HttpServletRequest request,
					 HttpServletResponse response) throws Exception {
    HttpSession session = request.getSession();
    PersonForm personForm = (PersonForm) form;
    NWOrg org = WorkflowManager.getNWOrg();
    NWPerson person = null;

    String action = personForm.getOperation();
    String ID = (String) request.getParameter("selectedID");

    try {
	if (action != null && action.equals("modify")) {
	  personForm.setSelectedItem(ID);
	  person = org.getPerson(ID);
	  PropertyUtils.copyProperties(personForm, person);
	  personForm.setConfpass(person.getPassword());
	}

    }
    catch (Exception e) {
	session.setAttribute(SessionManager.ERROR,
				   new UniException(e, "error.invokeinterface"));
	return mapping.findForward("error");
    }
    return mapping.findForward("success");
  }
}