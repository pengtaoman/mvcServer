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
import com.neusoft.uniflow.web.common.trees.beans.OrgTree;
import com.neusoft.uniflow.web.management.organization.forms.RoleTreeForm;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class RolelistAction extends Action {
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) {
		HttpSession session = request.getSession();
		RoleTreeForm roleForm = (RoleTreeForm) form;
		NWOrg org = WorkflowManager.getNWOrg();
		String ID = roleForm.getSelectedRole();
		String operation = roleForm.getOperation();

		try { // modefied byliwei
			NWRole selectedrole = org.getRole(ID);
			Vector personlist = null;
			NWUnit unitowner = null;

			if (selectedrole != null && !operation.equals("delete")) {
				personlist = selectedrole.openMemberList();
				unitowner = selectedrole.getSuperUnit();
				if (personlist != null && personlist.size() > 0) {
					NWPerson person = null;
					ArrayList personinfo = new ArrayList();
					for (int i = 0; i < personlist.size(); i++) {
						person = (NWPerson) personlist.elementAt(i);
						String account = person.getAccount();
						personinfo.add(new org.apache.struts.util.LabelValueBean(account + "(" + person.getName() + ")",account));
					}

					roleForm.setHasPerson(true);
					request.setAttribute("personinfo", personinfo);
				} else {
					roleForm.setHasPerson(false);
				}
				if (unitowner != null) {
					roleForm.setOwnOneUnit(true);
					roleForm.setOwnerUnit(unitowner.getName());
				} else {
					roleForm.setOwnOneUnit(false);
				}
			} else {
				roleForm.setHasPerson(false);
				roleForm.setOwnOneUnit(false);
			}
		} catch (Exception e) {
			session.setAttribute(SessionManager.ERROR, new UniException(e));
			return mapping.findForward("error");
		}

		// 从Session中取得Tree，不存在表示第一次访问Tree，构造RoleTree
		// 并在处理后放入Session
		OrgTree tree = (OrgTree) session.getAttribute(SessionManager.ORGTREE);
		if (tree == null ||tree!=null&&(tree.getOpenfalg().equals("openall")||tree.getOpenfalg().equals("openunit"))&&tree.getTreeType()!=1){			
			tree = new OrgTree(org,1);
		}
			

		if (roleForm.isExpand())// 如果页面传来操作是展开，展开该Node
			try {
				tree.expandNode(ID);
			} catch (Exception e) {
				session.setAttribute(SessionManager.ERROR, new UniException(e,
						"error.organization.role.tree.error"));
				return mapping.findForward("error");
			}
		// if(roleForm.isSelect())
		// 如果页面传来的操作是选中，表示tree中的OpenNodeID
		// 即使页面传来展开，也显示该Node
		{
			tree.setOpenNodeID(roleForm.getSelectedRole());
		}

		// 是否删除操作
		if (operation != null && operation.equals("delete")) {
			try {
				// org.removeRole(ID);
				// modefied by liwei for delete the role when delelting all its
				// children role and children's childen's role ;
				deleteChildrenRole(org, ID);
				org.removeRole(ID);
				// 删除某角色后，org处理比较复杂，为简化置tree为null，根据规则重新构件OrgTree对象
				// tree.removeNode(ID);
				tree = new OrgTree(org,1);
				roleForm.setSelectedRole(com.neusoft.uniflow.web.common.trees.beans.OrgTree.ORGROLEROOT_ID);
			} catch (Exception e) {
				session.setAttribute(SessionManager.ERROR, new UniException(e,
						"error.invokeinterface"));
				return mapping.findForward("error");
			}

		}
		if (ID == null || ID.equals("")
				|| (operation != null && operation.equals("delete"))) {
			roleForm.setSelectedRole(OrgTree.ORGROLEROOT_ID);
		} else {
			NWRole role = null;
			try {
				role = org.getRole(ID);
			} catch (Exception e) {
				session.setAttribute(SessionManager.ERROR, new UniException(e,
						"error.organization.role.tree.error"));
				return mapping.findForward("error");
			}
			if (role != null) {
				roleForm.setSelectedRoleName(role.getName());
				roleForm.setSelectedRoleDesc(role.getDescription());
			}
		}

		session.setAttribute(SessionManager.ORGTREE, tree);
		if ("request".equals(mapping.getScope()))
			request.setAttribute(mapping.getAttribute(), roleForm);
		else
			session.setAttribute(mapping.getAttribute(), roleForm);

		return mapping.findForward("success");
	}

	private void deleteChildrenRole(NWOrg org, String id) {
		Vector children = new Vector();
		try {
			NWRole role = org.getRole(id);
			Vector rolelist = org.openRoleList();
			for (int i = 0; i < rolelist.size(); i++) {
				NWRole tmp = (NWRole) rolelist.elementAt(i);
				if (role.getID().equals(tmp.getID())) {
					continue;
				}
				NWRole parentrole = tmp.getParentRole();
				if (parentrole != null) {
					String roleid = parentrole.getID();
					String roleidsrc = role.getID();
					if (roleid.equalsIgnoreCase(roleidsrc)) {
						children.add(tmp);
					}
				} else {
					continue;
				}
			}
			for (int i = 0; i < children.size(); i++) {
				NWRole temp = (NWRole) children.elementAt(i);
				deleteChildrenRole(org, temp.getID());
			}
			org.removeRole(id);
			return;
		} catch (Exception e) {
		}
	}
}