package com.neusoft.uniflow.web.management.organization.actions;

import java.util.ArrayList;
import java.util.Enumeration;
import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.beanutils.PropertyUtils;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;

import com.neusoft.org.NWOrg;
import com.neusoft.org.NWRole;
import com.neusoft.org.NWUnit;
import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.web.management.organization.forms.OrgunitForm;

import com.neusoft.uniflow.web.common.list.OpenListParamBean;
import com.neusoft.uniflow.web.common.list.OpenListAction;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class OrgunitlistAction extends OpenListAction {
	HttpServletRequest request = null;

	public void handleRequest(String userID, ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		this.request = request;
		OrgunitForm unitForm = (OrgunitForm) form;
		NWOrg org = WorkflowManager.getNWOrg();

		String ID = unitForm.getSelectedItem();
		String action = unitForm.getAction();

		/* Delete the unit */
		if (action != null && action.equals("delete")) {
			org.removeUnit(ID);
		}

	}

	public int getItemsCount(String userID, NWSession nwsession,
			ActionMapping mapping, ActionForm form) throws Exception {
		int count = -1;
		return count;
	}

	public Vector openList(String userID, NWSession nwsession,
			ActionMapping mapping, ActionForm form, OpenListParamBean param)
			throws Exception {
		OrgunitForm unitForm = (OrgunitForm) form;
		NWOrg org = WorkflowManager.getNWOrg();
		NWUnit unit = null;
		Vector units = new Vector();

		String ID = unitForm.getSelectedItem();
		String action = unitForm.getAction();

		/* getting the unit information */
		units = org.openUnitList();
		if (ID == null || ID.equals("")
				|| (action != null && action.equals("delete"))) {
			if (!units.isEmpty()) {
				ID = (String) (((NWUnit) units.elementAt(0)).getID());
				unitForm.setSelectedItem(ID);
				unit = (NWUnit) units.elementAt(0);
			}
		} else {
			for (Enumeration enumeration = units.elements(); enumeration
					.hasMoreElements();) {
				unit = (NWUnit) enumeration.nextElement();
				if (unit.getID().equals(ID))
					break;
			}
		}
		if (unit != null) {
			PropertyUtils.copyProperties(unitForm, unit);
			if (unit.getLeaderRole() != null) {
				unitForm.setLeadername(unit.getLeaderRole().getName());
			}
			/** ************************************** */
			ArrayList roleinfo = new ArrayList();
			Vector rolelist = org.openRoleList();
			for (int i = 0; i < rolelist.size(); i++) {
				NWRole role = (NWRole) rolelist.elementAt(i);
				// System.out.print(role.getName()+"--");
				NWUnit unit1 = role.getSuperUnit();
				// System.out.print(unit.getName()+"--");
				// System.out.println(org.getUnit(ID).getName());
				if (unit1 != null && (unit1.getID().equalsIgnoreCase(ID))) {
					String name = role.getName();
					roleinfo.add(new org.apache.struts.util.LabelValueBean(
							name, name));
				}
			}
			if (roleinfo.size() > 0) {
				unitForm.setHasrole(true);
			} else {
				unitForm.setHasrole(false);
			}
			request.setAttribute("roleinfo", roleinfo);
			/** ************************************** */

		}

		return units;
	}

}
