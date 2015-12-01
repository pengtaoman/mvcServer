package com.neusoft.tdframework.demo.action;

//TreeDataAction
import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.tdframework.demo.bo.common.DrivenTreeBo;
import com.neusoft.tdframework.web.struts.TDDispatchAction;

public class RequestInnerTreeData extends TDDispatchAction {
	
	public RequestInnerTreeData() {
		super();
	}

	/**
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws java.lang.Exception
	 */
	public ActionForward drivenTree(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws java.lang.Exception {
		String requestid = request.getParameter("requestid");
		request.setAttribute("requestid", createDrivenData(requestid, mapping));
		return mapping.findForward("driven");
	}

	private Vector createDrivenData(String requestid, ActionMapping mapping) {
		Vector vec = new Vector();
		DrivenTreeBo bo = (DrivenTreeBo) getServiceFacade("drivenTreeBo", mapping);
		vec = bo.getOrgsByAreaId(requestid);
		return vec;
	}

}
