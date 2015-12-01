package com.neusoft.uniflow.web.webdesign.util.actions;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.web.webdesign.util.beans.ToolTipUtil;

public class GetNameAction extends Action{

	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		String names = "";
		
		String ids = request.getParameter("ids");
        
		names = ToolTipUtil.getInstance().execute(ids);
		
		request.setAttribute("names", names);
		
		return mapping.findForward("forName");
	}

}
