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

import com.neusoft.org.NWOrg;
import com.neusoft.org.NWPerson;
import com.neusoft.org.NWRole;
import com.neusoft.org.NWUnit;
import com.neusoft.uniflow.web.management.organization.beans.Translation;
import com.neusoft.uniflow.web.management.organization.forms.RoleForm;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class EditroleAction extends Action
{
	public ActionForward execute(ActionMapping mapping,
					     ActionForm form,
					     HttpServletRequest request,
					     HttpServletResponse response) throws
	    Exception
	{
		HttpSession session = request.getSession();
		RoleForm roleForm = (RoleForm) form;
		NWOrg org = WorkflowManager.getNWOrg();
		NWPerson person = null;
		NWRole role = null;
		Vector persons = org.openPersonList(1,Integer.MAX_VALUE-1,NWPerson.PSN_ACCOUNT); //for more person than the interger what to do ????
		
		Vector members = new Vector();
		Vector rolemember = new Vector();
        //modefied by liwei 
		ArrayList personinfo = new ArrayList();
		ArrayList roleinfo = new ArrayList();
		ArrayList unitinfo = new ArrayList();
		
		String operation = roleForm.getOperation();
		try {
			if (operation == null || operation.trim().equals("")) {
				operation = (String) request.getParameter("_operation");
				roleForm.setOperation(operation);

				String ID = (String) request.getParameter("selectedID");
				roleForm.setID(ID);
				
               //modefied by liwei 				
				if(operation != null && operation.equals("add")){
					NWRole parent = org.getRole(ID);
					if(parent!=null){
						roleForm.setParent(parent.getName());
						if(parent.getSuperUnit()!=null){
							roleForm.setNeedSelUnit(false);
							unitinfo.add(new org.apache.struts.util.LabelValueBean("",""));
						}else{
							roleForm.setNeedSelUnit(true);
							Vector unitlist = org.openUnitList();			
							NWUnit unit;
							unitinfo.add(new org.apache.struts.util.LabelValueBean("",""));
							for(int i = 0;i<unitlist.size();i++){
								unit = (NWUnit)unitlist.elementAt(i);
								if(unit.getLeaderRole()==null){
									String account = unit.getName();
									unitinfo.add(new org.apache.struts.util.LabelValueBean(account,account));
								}

							}

						}
						
					}else{
						roleForm.setParent("");
						roleForm.setNeedSelUnit(true);
						Vector unitlist = org.openUnitList();			
						NWUnit unit;
						unitinfo.add(new org.apache.struts.util.LabelValueBean("",""));
						for(int i = 0;i<unitlist.size();i++){
							unit = (NWUnit)unitlist.elementAt(i);
							if(unit.getLeaderRole()==null){
								String account = unit.getName();
								unitinfo.add(new org.apache.struts.util.LabelValueBean(account,account));
							}

						}						
					}
					
				}
				if (operation != null && operation.equals("modify")) {
					role = org.getRole(ID);
					members = role.openMemberList();
					roleForm.setDescription(role.getDescription());
					roleForm.setName(role.getName());
					NWRole parent = role.getParentRole();
									
					if(parent!=null){
						roleForm.setParent(parent.getName());

					}else{
						roleForm.setParent("");										
					}
					if(role.getSuperUnit()!=null){
						roleForm.setNeedSelUnit(false);
						unitinfo.add(new org.apache.struts.util.LabelValueBean("",""));
					}else{
						roleForm.setNeedSelUnit(true);
						Vector unitlist = org.openUnitList();			
						NWUnit unit;
						unitinfo.add(new org.apache.struts.util.LabelValueBean("",""));
						for(int i = 0;i<unitlist.size();i++){
							unit = (NWUnit)unitlist.elementAt(i);
							if(unit.getLeaderRole()==null){
								String account = unit.getName();
								unitinfo.add(new org.apache.struts.util.LabelValueBean(account,account));
							}

						}							
					}					
				}

				for (int i = 0; i < members.size(); i++) {
					person = (NWPerson) members.elementAt(i);
					String account = person.getAccount();
					rolemember.add(account);
					roleinfo.add(new org.apache.struts.util.
							 LabelValueBean(account+" ("+ person.getName()+")",
					    account));
				}
			}
			else {
				String page_operation = roleForm.getPage_operation();
				if (page_operation == null ||
				    (page_operation.trim().equals(""))) {
				}
				else {
					rolemember = Translation.strToVector(roleForm.
					    getRolemember(), ":");
					if (page_operation.equals("addmumber")) {
						String[] select_person = roleForm.
						    getPersoninfo();
						for (int i = 0; i < select_person.length; i++) {
							if (!rolemember.contains(select_person[i])) {
								rolemember.add(select_person[i]);
							}
						}
					}

					if (page_operation.equals("deletemumber")) {
						String[] select_mumber = roleForm.
						    getSelectmember();
						for (int i = 0; i < select_mumber.length; i++) {
							if (rolemember.contains(select_mumber[
							    i])) {
								rolemember.remove(select_mumber[
								    i]);
							}
						}
					}
					for (int i = 0; i < rolemember.size(); i++) {
						roleinfo.add(new org.apache.struts.util.
								 LabelValueBean( (String)
						    rolemember.elementAt(i),
						    (String) rolemember.elementAt(i)));

					}
				}
			}
			for (int i = 0; i < persons.size(); i++) {
				person = (NWPerson) persons.elementAt(i);
				String account = person.getAccount();
				personinfo.add(new org.apache.struts.util.
						   LabelValueBean(account+" ("+ person.getName()+")",
				    account));
				   
			}

		}
		catch (Exception e) {
			session.setAttribute(SessionManager.ERROR,
						   new UniException(e,
			    "error.invokeinterface"));
			return mapping.findForward("error");
		}

		String memberstring = Translation.vectorToStr(rolemember, ":");
		roleForm.setRolemember(memberstring);
		request.setAttribute("personinfo", personinfo);
		request.setAttribute("roleinfo", roleinfo);
		request.setAttribute("unitinfo",unitinfo);
		if ("request".equals(mapping.getScope()))
			request.setAttribute(mapping.getAttribute(), roleForm);
		else
			session.setAttribute(mapping.getAttribute(), roleForm);
		return mapping.findForward("success");
	}
}