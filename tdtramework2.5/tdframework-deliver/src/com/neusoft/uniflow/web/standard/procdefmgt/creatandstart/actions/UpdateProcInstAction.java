package com.neusoft.uniflow.web.standard.procdefmgt.creatandstart.actions;

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

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.def.NWProcDef;
import com.neusoft.uniflow.api.handler.NWProcInst;
import com.neusoft.uniflow.api.handler.NWRelDataInst;
import com.neusoft.uniflow.web.standard.procdefmgt.creatandstart.beans.RDBean;
import com.neusoft.uniflow.web.standard.procdefmgt.creatandstart.forms.CreateProcInstForm;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class UpdateProcInstAction extends Action {
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		CreateProcInstForm procInstForm = (CreateProcInstForm) form;
		HttpSession session = request.getSession();
		NWSession nwsession = WorkflowManager.getNWSession();
		String procInstName = procInstForm.getProcInstName();

		procInstForm.setProcInstName(procInstName);
		String tmp[] = procInstForm.getProcDefID().split("#");
		boolean needCreatorRole = procInstForm.getNeedCreatorRole();
		String roleID = procInstForm.getRoleID();
		Vector rdlist = procInstForm.getRdlist();

		ArrayList roleinfo = new ArrayList();
		roleinfo.add(new LabelValueBean("------------", " "));
		request.setAttribute("roleinfo", roleinfo);

		String procdefID = tmp[0];
		String procdefVer = tmp[1];// new
									// String(tmp[1].getBytes("iso-8859-1"));
		String userID = (String)session.getAttribute(SessionManager.BIZ_USERID);
		NWProcInst procinst = null;
		NWProcDef procdef = null;

		String operation = request.getParameter("operation");
		procdef = nwsession.getProcDef(userID, procdefID, procdefVer, 0);
		try {
			if (operation != null && operation.equalsIgnoreCase("initiate")) {
				if (needCreatorRole) {
					procinst = procdef.createProcessInst(0, procInstName,roleID);
				} else {
					procinst = procdef.createProcessInst(procInstName);
				}
				for (int i = 0; i < rdlist.size(); i++) {
					RDBean rd = (RDBean) rdlist.elementAt(i);
					String rdname = rd.getName();
					String value = rd.getRd_value();
					NWRelDataInst reldata = procinst.getRelData(rdname);
					reldata.setValue(value);
					procinst.saveRelData(reldata);
				}
				request.setAttribute("close_flag", "close");
				request.setAttribute("fail", "false");
			} else if (operation != null && operation.equalsIgnoreCase("start")) {
				if (needCreatorRole) {
					procinst = procdef.createProcessInst(0, procInstName,roleID);
				} else {
					procinst = procdef.createProcessInst(procInstName);
				}
				for (int i = 0; i < rdlist.size(); i++) {
					RDBean rd = (RDBean) rdlist.elementAt(i);
					String rdname = rd.getName();
					String value = rd.getRd_value();
					NWRelDataInst reldata = procinst.getRelData(rdname);
					reldata.setValue(value);
					procinst.saveRelData(reldata);
				}
				try {
					procinst.doStart();
					request.setAttribute("close_flag", "close");
					request.setAttribute("fail", "false");
				} catch (Exception e) {
					e.printStackTrace();
					session.setAttribute(SessionManager.ERROR,
							new UniException(e));
					return mapping.findForward("error");

				}

			}

		} catch (Exception e) {
			e.printStackTrace();
			session.setAttribute(SessionManager.ERROR, new UniException(e));
			return mapping.findForward("error");
		}
		return mapping.findForward("success");
	}
}
