/*
 * Created on 2004-11-24
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.uniflow.web.management.enginecap.actions;

// import java.io.PrintWriter;
import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;

import com.neusoft.org.NWOrg;
import com.neusoft.org.NWPerson;
import com.neusoft.org.NWRole;
import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.common.NWException;

import com.neusoft.uniflow.web.common.list.OpenListAction;
import com.neusoft.uniflow.web.common.list.OpenListParamBean;
import com.neusoft.uniflow.web.management.enginecap.forms.OrgStatForm;
import com.neusoft.uniflow.web.util.UniflowManager;

public class OrgStatAction extends OpenListAction {
	private NWOrg org = null;

	private HttpServletRequest request = null;

	public void handleRequest(String userID, ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws NWException {
		this.request = request;
		OrgStatForm orgForm = (OrgStatForm) form;
		org = UniflowManager.getNWOrg();

		String type = request.getParameter("type");
		String selectedItem = orgForm.getSelectedItem();

		if (selectedItem != null && !selectedItem.equals("")) {
			int last = selectedItem.indexOf('p');
			if (last >= 0) {
				type = "person";
			} else {
				type = "role";
				last = selectedItem.indexOf('r');
			}

		}
		if (type != null && type.equals("person")) {
			orgForm.setType("person");
		} else if (type != null && type.equals("role")) {
			orgForm.setType("role");
		} else {

		}
		request.setAttribute("id", selectedItem);

	}

	public int getItemsCount(String userID, NWSession nwsession,
			ActionMapping mapping, ActionForm form) throws NWException {
		int count = 0;
		OrgStatForm orgForm = (OrgStatForm) form;
		String type = orgForm.getType();
		try {
			if (type != null && type.equals("person")) {
				count = (int) (org.getPersonNum());
			} else if (type != null && type.equals("role")) {
				count = org.openRoleList().size();
			} else {
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return count;
	}

	public Vector openList(String userID, NWSession nwsession,
			ActionMapping mapping, ActionForm form, OpenListParamBean param)
			throws NWException {
		OrgStatForm orgForm = (OrgStatForm) form;
		Vector list = null;
		String selectedID = orgForm.getSelectedItem();
		String type = orgForm.getType();
		if (type != null && type.equals("person")) {
			try {
				list = org.openPersonList();
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else if (type != null && type.equals("role")) {
			try {
				list = org.openRoleList();
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else {
		}
		if (list != null && list.size() > 0 && selectedID.equals("")) {
			if (type != null && type.equals("person")) {
				NWPerson user = (NWPerson) list.elementAt(0);
				((OrgStatForm) form).setSelectedItem(user.getID()
						+ String.valueOf('p'));
			}
			if (type != null && type.equals("role")) {
				NWRole role = (NWRole) list.elementAt(0);
				((OrgStatForm) form).setSelectedItem(role.getID()
						+ String.valueOf('r'));
			}
			request.setAttribute("id", ((OrgStatForm) form).getSelectedItem());
		}
		return list;
	}

}
