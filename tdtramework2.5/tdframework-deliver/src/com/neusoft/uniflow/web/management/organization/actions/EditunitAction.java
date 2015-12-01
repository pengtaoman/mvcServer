package com.neusoft.uniflow.web.management.organization.actions;

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
import com.neusoft.org.NWRole;
import com.neusoft.org.NWUnit;
import com.neusoft.uniflow.web.management.organization.forms.OrgunitForm;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class EditunitAction
    extends Action {
  public ActionForward execute(ActionMapping mapping,
					 ActionForm form,
					 HttpServletRequest request,
					 HttpServletResponse response) throws Exception {
    HttpSession session = request.getSession();
    OrgunitForm unitForm = (OrgunitForm) form;
    NWOrg org = WorkflowManager.getNWOrg();
    NWUnit unit = null;
    ArrayList roleinfo = new ArrayList();

    String action = unitForm.getAction();
    String ID = unitForm.getSelectedItem();
    unitForm.setAction(action);

    try {
	if (action != null && action.equals("modify")) {
	  unitForm.setSelectedItem(ID);
	  unit = org.getUnit(ID);
	  unitForm.setName(unit.getName());
	  unitForm.setDescription(unit.getDescription());
	  if (unit.getLeaderRole() != null) {
	    unitForm.setLeadername(unit.getLeaderRole().getName());
	  }
	}
	/*getting the orphan role infomation*/
	//modefied by liwei ;
	Vector roles = org.openRoleList();//openOrphanRoleList();
	//     System.out.println(roles.size());
	NWRole role = null;
	roleinfo.add(new LabelValueBean("",""));
	for (int i = 0; i < roles.size(); i++) {
	  role = (NWRole) roles.elementAt(i);
	  //if(role.getSuperUnit()==null){
		roleinfo.add(new LabelValueBean(role.getName(), role.getID()));
	  //}
	 
	}
    }
    catch (Exception e) {
	session.setAttribute(SessionManager.ERROR,
				   new UniException(e, "error.invokeinterface"));
	return mapping.findForward("error");
    }
    request.setAttribute("roleinfo", roleinfo);
    return mapping.findForward("success");
  }
}