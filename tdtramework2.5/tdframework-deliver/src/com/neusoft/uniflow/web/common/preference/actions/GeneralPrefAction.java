package com.neusoft.uniflow.web.common.preference.actions;


import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.org.NWOrg;
import com.neusoft.org.NWPerson;
import com.neusoft.uniflow.web.common.preference.beans.PreferenceInfo;
import com.neusoft.uniflow.web.common.preference.forms.PreferenceForm;
import com.neusoft.uniflow.web.util.CustomHandler;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class GeneralPrefAction
    extends Action {
  public ActionForward execute(ActionMapping mapping,
					 ActionForm form,
					 HttpServletRequest request,
					 HttpServletResponse response) throws Exception {
    HttpSession session = request.getSession();
    PreferenceInfo prefinfo = (PreferenceInfo) session.getAttribute(
	  SessionManager.PREFERENCE);
    NWOrg org = WorkflowManager.getNWOrg();
    String userID = (String)session.getAttribute(SessionManager.BIZ_USERID);
    // NWPerson person = org.getPersonByAccount("test");
    NWPerson person = org.getPerson(userID);

    boolean modifypass = prefinfo.getModifypass();
    String newpass = prefinfo.getNewpass();

    PreferenceForm prefForm = (PreferenceForm) form;
    String style = prefForm.getStyle();
    String action = prefForm.getAction();
    String number = prefForm.getNumber().trim();
    if (action != null) {
	if (action.equals("OK")) {
	  //saving style and number
	  String liststring = (String) session.getAttribute(SessionManager.
		CUSTOMATION);
	  liststring = CustomHandler.setElements(CustomHandler.PREFERENCE_SYTLE,style, liststring);
	  liststring = CustomHandler.setElements(CustomHandler.PREFERENCE_NUMBER,number, liststring);
	  session.setAttribute(SessionManager.CUSTOMATION, liststring);
	  Cookie defaultitem = new Cookie((String)session.getAttribute(SessionManager.BIZ_USERID), liststring);
	  defaultitem.setMaxAge(60 * 60 * 24 * 30);
	  response.addCookie(defaultitem);
	  try {
	    
	    //Saving password
	    if (modifypass) {
		person.setPassword(newpass);
		person.update();
	    }

	    
	  }
	  catch (Exception e) {
	    session.setAttribute(SessionManager.ERROR, new UniException(e, "error.invokeinterface"));
	    return mapping.findForward("error");
	  }

	  request.setAttribute("styleinfo", new java.util.ArrayList());
	  request.setAttribute("close_flag", "close");
	}
	else {
	  prefinfo.setStyle(style);
	  prefinfo.setNumber(number);

	   

	  if (action.equals("password")) {
	    request.setAttribute("password",person.getPassword());
	    if (modifypass) {
		String oldpass = person.getPassword();
		prefForm.setOldpass(oldpass);
		prefForm.setNewpass(newpass);
		prefForm.setConfpass(newpass);
	    }
	    return mapping.findForward("password");
	  }
	}
    }
    return mapping.findForward("OK");
  }
  

}