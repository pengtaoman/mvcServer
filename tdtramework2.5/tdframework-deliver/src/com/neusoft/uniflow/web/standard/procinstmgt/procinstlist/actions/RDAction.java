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
import java.util.ArrayList;
import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.api.handler.NWProcInst;
import com.neusoft.uniflow.api.handler.NWRelDataInst;
import com.neusoft.uniflow.web.AO.ProcInstAO;
import com.neusoft.uniflow.web.standard.procinstmgt.procinstlist.beans.RDBean;
import com.neusoft.uniflow.web.standard.procinstmgt.procinstlist.forms.RDForm;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;

public class RDAction extends Action {
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		ProcInstAO procInstAO = ProcInstAO.getInstance();
		HttpSession session = request.getSession();

		RDForm rdForm = (RDForm) form;
		RDBean rdBean = null;

		/* procInstID 为所操作的流程实例 */
		String procInstID = request.getParameter("selectedID");
		String operation = request.getParameter("operation");

		NWProcInst procinst = null;
		boolean hasRD = false;
		boolean needCreatorRole = false;
		ArrayList roleinfo = new ArrayList();

		try {
			// handler procinst RD
			if ((operation != null)
					&& (operation.equals("procinst") || operation
							.equals("procmonitor"))) {
				procinst = procInstAO.getProcInst(request, procInstID);
				Vector reldatas = procinst.openRelDataList();
				int j = 0;
				for (int i = 0; i < reldatas.size(); i++) {
					NWRelDataInst reldata = (NWRelDataInst) reldatas
							.elementAt(i);
					int rd_type = reldata.getType();
					// only char or number type.others is not validate .
					// what about custom type ?
					if (rd_type == 1 || rd_type == 0) {
						rdBean = new RDBean();
						rdBean.setName(reldata.getName());
						rdBean.setType(reldata.getType());
						rdBean.setRd_value(reldata.getValue());
						rdForm.setRdIndexed(j, rdBean);
						hasRD = true;
						j++;
					}

				}
			}
		} catch (Exception e) {
			session.setAttribute(SessionManager.ERROR, new UniException(e,
					"error.invokeinterface"));
			return mapping.findForward("error");
		}
		rdForm.setSelectedID(procInstID);
		rdForm.setOperation(operation);
		rdForm.setHasRD(hasRD);
		rdForm.setNeedCreatorRole(needCreatorRole);
		request.setAttribute("roleinfo", roleinfo);
		if ("request".equals(mapping.getScope()))
			request.setAttribute(mapping.getAttribute(), rdForm);
		else
			session.setAttribute(mapping.getAttribute(), rdForm);

		return mapping.findForward("success");
	}
}