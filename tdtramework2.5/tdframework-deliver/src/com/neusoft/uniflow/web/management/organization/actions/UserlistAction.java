package com.neusoft.uniflow.web.management.organization.actions;

import java.util.Enumeration;
import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.beanutils.PropertyUtils;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;

import com.neusoft.org.NWOrg;
import com.neusoft.org.NWPerson;
import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.web.management.organization.forms.PersonForm;

import com.neusoft.uniflow.web.common.list.OpenListParamBean;
import com.neusoft.uniflow.web.common.list.OpenListAction;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class UserlistAction extends OpenListAction {
	HttpServletRequest request = null;

	public void handleRequest(String userID, ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		PersonForm personForm = (PersonForm) form;
		NWOrg org = WorkflowManager.getNWOrg();
		this.request = request;

		String ID = personForm.getSelectedItem();
		String action = personForm.getOperation();
		/* deleting the selected person */
		if (action != null && action.equals("delete")) {
			org.removePerson(ID);

		}
	}

	public int getItemsCount(String userID, NWSession nwsession,
			ActionMapping mapping, ActionForm form) throws Exception {
		NWOrg org = WorkflowManager.getNWOrg();
		int count = 0;
		count = (int) org.getPersonNum();

		return count;
	}

	public Vector openList(String userID, NWSession nwsession,
			ActionMapping mapping, ActionForm form, OpenListParamBean param)
			throws Exception {

		PersonForm personForm = (PersonForm) form;
		NWOrg org = WorkflowManager.getNWOrg();

		Vector list = null;
		list = org.openPersonList(param.getStart(), param.getOffset(),
				NWPerson.PSN_ACCOUNT);
		String selectedID = personForm.getSelectedItem();
		String action = personForm.getOperation();
		NWPerson personinfo = null;
        
		if (selectedID == null || selectedID.equals("")
				|| (action != null && action.equals("delete"))) {
			if (!list.isEmpty()) {
				selectedID = (String) (((NWPerson) list.elementAt(0)).getID());
				((PersonForm) form).setSelectedItem(selectedID);
				personinfo = (NWPerson) list.elementAt(0);
			}
		} else {
			int flag=1;
			for (Enumeration enumeration = list.elements(); enumeration.hasMoreElements();) {
				personinfo = (NWPerson) enumeration.nextElement();
				if (personinfo.getID().equals(selectedID))
					{flag=0;
					break;}
				
			}
			if(flag==1){
            ((PersonForm) form).setSelectedItem((String) (((NWPerson) list.elementAt(0)).getID()));
            personinfo = (NWPerson) list.elementAt(0);}
		}
		if (personinfo != null) {
			PropertyUtils.copyProperties(personForm, personinfo);
			
		}

		return list;
	}
}