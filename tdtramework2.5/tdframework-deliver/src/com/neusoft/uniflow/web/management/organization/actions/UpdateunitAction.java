package com.neusoft.uniflow.web.management.organization.actions;


import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.beanutils.PropertyUtils;
import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.org.NWOrg;
import com.neusoft.org.NWRole;
import com.neusoft.org.NWUnit;
import com.neusoft.uniflow.util.Util;
import com.neusoft.uniflow.web.management.organization.forms.OrgunitForm;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class UpdateunitAction
    extends Action {
  public ActionForward execute(ActionMapping mapping,
					 ActionForm form,
					 HttpServletRequest request,
					 HttpServletResponse response) throws Exception {
    HttpSession session = request.getSession();
    OrgunitForm unitForm = (OrgunitForm) form;
    NWOrg org = WorkflowManager.getNWOrg();
    NWUnit unit = null;

    String action = unitForm.getAction();
    String selectedID = unitForm.getSelectedItem();
    String leaderID = unitForm.getLeaderID();

    try {
	    String unitName = unitForm.getName();
	    NWUnit searchUnit = org.getUnitByName(unitName);
	if (action != null && action.equals("modify")) {
	  unit = org.getUnit(selectedID);
	  if(searchUnit!=null&&!(searchUnit.getID().equals(selectedID)))
		  throw new UniException("errors.organization.unit.nameexist");
	  PropertyUtils.copyProperties(unit, unitForm);
	}
	else if (action.equals("add")) {
		if(searchUnit!=null)
			throw new UniException("errors.organization.unit.nameexist");
	  if (leaderID != null && !leaderID.equals("")) {
	    selectedID = Util.generateGUID();
	    unit = org.createUnit(selectedID);
	    unitForm.setSelectedItem(unit.getID());
	    PropertyUtils.copyProperties(unit, unitForm);
	    NWRole role = org.getRole(leaderID);
	    unit.addLeaderRole(role);
	  }
	  else if(leaderID.equals("")){
		selectedID = Util.generateGUID();
		unit = org.createUnit(selectedID);
		unitForm.setSelectedItem(unit.getID());
		PropertyUtils.copyProperties(unit, unitForm);		
	  }
	  else {
	    session.setAttribute(SessionManager.ERROR,
					 new UniException("errors.organization.unit.leaderrole.required"));
	    return mapping.findForward("error");
	  }
	}
	unit.update();
    }
    catch(UniException e)
    {
	    session.setAttribute(SessionManager.ERROR,e);
	    return mapping.findForward("error");
    }
    catch (Exception e) {
	session.setAttribute(SessionManager.ERROR,
				   new UniException(e, "error.invokeinterface"));
	return mapping.findForward("error");
    }
    ArrayList roleinfo = new ArrayList();
    request.setAttribute("roleinfo", roleinfo);
    request.setAttribute("close_flag", "close");
    return mapping.findForward("success");
  }
}