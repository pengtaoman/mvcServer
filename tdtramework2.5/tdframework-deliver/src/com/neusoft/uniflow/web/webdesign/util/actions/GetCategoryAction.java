package com.neusoft.uniflow.web.webdesign.util.actions;

import java.util.Collection;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.category.ICategoryEntry;
import com.neusoft.uniflow.web.util.UniflowManager;

public class GetCategoryAction extends Action {

	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		String procDefId = request.getParameter("procDefId");
		String isExist="false";
		ICategoryEntry categoryEntry=UniflowManager.getNWSession().getCategoryEntry();
		Collection categorys=categoryEntry.getResource(procDefId).getCategories();
		if(categorys.size()>0)
			isExist="true";
		else
			isExist="false";
		response.setHeader("Pragma","No-cache");
		response.setHeader("Cache-Control","no-cache");
		response.setDateHeader("Expires", 0); 
		response.getWriter().print(isExist);
		response.getWriter().close();
		return null;
	}
}
