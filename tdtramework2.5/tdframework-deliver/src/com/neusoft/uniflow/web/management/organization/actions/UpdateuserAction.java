package com.neusoft.uniflow.web.management.organization.actions;


import java.util.Vector;

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
import com.neusoft.uniflow.util.Util;
import com.neusoft.uniflow.web.management.organization.forms.PersonForm;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class UpdateuserAction
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
    String id = personForm.getSelectedItem();
    String account = personForm.getAccount();

//    判断account是否重复
    Vector persons = org.openPersonList();
    boolean flag = false;
    for (int i = 0; i < persons.size(); i++) {
	person = (NWPerson) persons.elementAt(i);
	if (person.getAccount().equals(account) && !person.getID().equals(id)) {
	  flag = true;
	  break;
	}
    }
    if (flag) {
	  session.setAttribute(SessionManager.ERROR, new UniException("errors.organization.user.account.exist"));
	  return mapping.findForward("error");
    }
    try {
	if (action != null && action.equals("modify")) {
	  person = org.getPerson(id);
	  PropertyUtils.copyProperties(person, personForm);
	}
	else if (action.equals("add")) {
	  id = Util.generateGUID();
	  person = org.createPerson(id);
	  personForm.setSelectedItem(person.getID());
	  PropertyUtils.copyProperties(person, personForm);
	}
	person.update();
    }
    catch (Exception e) {
	    session.setAttribute(SessionManager.ERROR,new UniException(e, "error.invokeinterface"));
	    return mapping.findForward("error");
    }
    request.setAttribute("close_flag", "close");
    return mapping.findForward("success");
  }
}