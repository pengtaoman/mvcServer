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
import com.neusoft.uniflow.util.Util;
import com.neusoft.uniflow.web.common.trees.beans.OrgNode;
import com.neusoft.uniflow.web.common.trees.beans.OrgTree;
import com.neusoft.uniflow.web.management.organization.forms.RoleForm;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class UpdateroleAction extends Action {
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		HttpSession session = request.getSession();
		RoleForm roleForm = (RoleForm) form;
		NWOrg org = WorkflowManager.getNWOrg();
		NWRole role = null;
		NWPerson person = null;
		Vector rolemember = new Vector();

		String operation = roleForm.getOperation();
		String name = roleForm.getName();
		String description = roleForm.getDescription();
		String id = roleForm.getID();
		String ownUnitName = roleForm.getOwnerUnit();

		String[] select = roleForm.getSelectmember();
		for (int i = 0; i < select.length; i++) {
			rolemember.add(select[i]);
		}
		try {
			if (operation != null && operation.equalsIgnoreCase("add")) {
				Vector roles = org.openRoleList();
				boolean flag = false;
				for (int i = 0; i < roles.size(); i++) {
					role = (NWRole) roles.elementAt(i);
					if (role.getName().equals(name) && role.getID().equals(id)) {
						flag = true;
						break;
					}
				}

				if (flag) {
					session.setAttribute(SessionManager.ERROR,
							new UniException(
									"errors.organization.role.name.invalid"));
					return mapping.findForward("error");
				}
				String newId = Util.generateGUID();
				role = org.createRole(newId);

			} else if (operation != null
					&& operation.equalsIgnoreCase("modify")) {
				role = org.getRole(id);
				role.removeAllMembers();

			}

			role.setName(name);
			role.setDescription(description);
			String pstr = roleForm.getParent();
			if (pstr != null && !pstr.equalsIgnoreCase("")) {
				NWRole parent = role.getParentRole();
				parent.addChildRole(role);
			}
			if (roleForm.getOwnerUnit() != null
					&& !roleForm.getOwnerUnit().equalsIgnoreCase("")) {
				if (ownUnitName != null && (!ownUnitName.equalsIgnoreCase(""))) {
					NWUnit unit = org.getUnitByName(ownUnitName);
					unit.addLeaderRole(role);
				}
			}
			for (int i = 0; i < rolemember.size(); i++) {
				String account = (String) rolemember.elementAt(i);
				person = org.getPersonByAccount(account);
				role.addMember(person);
			}
			role.update();

			if (operation.equals("add")) {
				NWRole parentRole = org.getRole(id);
				OrgTree tree = (OrgTree) session
						.getAttribute(SessionManager.ORGTREE);
				if (parentRole != null) {
					parentRole.addChildRole(role);
				}
				tree.getTreeNode(id).addChild(new OrgNode(role));
			}
			if (operation.equals("modify")) {
				OrgTree tree = (OrgTree) session
						.getAttribute(SessionManager.ORGTREE);
				tree.getTreeNode(id).setName(name);
			}

		} catch (Exception e) {
			session.setAttribute(SessionManager.ERROR, new UniException(e));
			return mapping.findForward("error");
		}

		request.setAttribute("close_flag", "close");
		ArrayList personinfo = new ArrayList();
		ArrayList roleinfo = new ArrayList();

		request.setAttribute("personinfo", personinfo);
		request.setAttribute("roleinfo", roleinfo);
		if ("request".equals(mapping.getScope()))
			request.setAttribute(mapping.getAttribute(), roleForm);
		else
			session.setAttribute(mapping.getAttribute(), roleForm);

		return mapping.findForward("success");
	}
}