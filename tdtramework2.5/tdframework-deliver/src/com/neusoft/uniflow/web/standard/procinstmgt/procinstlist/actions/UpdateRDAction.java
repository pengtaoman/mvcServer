package com.neusoft.uniflow.web.standard.procinstmgt.procinstlist.actions;

/**
 * <p>Title: uniflow 3.5 web client</p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) 2003</p>
 * <p>Company: neusoft</p>
 * @author wangwb
 * @version 1.0
 * modefied by liwei 
 */
import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.api.handler.NWProcInst;
import com.neusoft.uniflow.web.AO.ProcInstAO;
import com.neusoft.uniflow.web.standard.procinstmgt.procinstlist.beans.RDBean;
import com.neusoft.uniflow.web.standard.procinstmgt.procinstlist.forms.RDForm;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;

public class UpdateRDAction extends Action {
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		ProcInstAO procInstAO = ProcInstAO.getInstance();
		HttpSession session = request.getSession();

		RDForm rdForm = (RDForm) form;

		String procInstID = rdForm.getSelectedID();
		String operation = rdForm.getOperation();
		NWProcInst procinst = null;
		Vector rdlist = rdForm.getRdlist();
		try {
			if (operation != null) {
				if (operation.equals("procinst")
						|| operation.equals("procmonitor")) {
					procinst = procInstAO.getProcInst(request, procInstID);
				}
				for (int i = 0; i < rdlist.size(); i++) {
					RDBean rd = (RDBean) rdlist.elementAt(i);
					procInstAO.saveStrRD(procinst, rd.getName(), rd.getRd_value());
				}
			}
		} catch (Exception e) {
			session.setAttribute(SessionManager.ERROR, new UniException(e,
					"error.invokeinterface"));
			return mapping.findForward("error");
		}
		return mapping.findForward("success");
	}
}