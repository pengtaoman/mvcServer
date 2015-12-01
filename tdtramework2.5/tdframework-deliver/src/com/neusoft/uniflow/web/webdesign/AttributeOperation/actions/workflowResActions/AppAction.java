package com.neusoft.uniflow.web.webdesign.AttributeOperation.actions.workflowResActions;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.autoNodeForms.AutoNodeForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.workflowResourceForms.AppForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.workflowResourceForms.DataForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.AttrSave;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.AttributeFormToModelElement;

public class AppAction extends Action{
	public ActionForward execute(ActionMapping mapping,
		     ActionForm form,
		     HttpServletRequest request,
		     HttpServletResponse response){
		
		String id = ((AppForm)form).getId();
		String xmlStr = ((AppForm)form).getXmlStr();	
		try{
			if(xmlStr.indexOf("GlobalApplications") >=0 )
			{
				xmlStr = AttributeFormToModelElement.getApplication(xmlStr, (AppForm)form).toString();
				request.setAttribute("templateNodeType", "appTreeNode");		
			}
			else
			{
			 xmlStr = AttrSave.toString(xmlStr, (AppForm)form, "Application" , id);
			}
			}catch(Exception e){
				e.printStackTrace();
			}

		request.setAttribute("id", id);
		request.setAttribute("xmlStr", xmlStr);
		request.setAttribute("close_flag", "close");	
		AppForm pform = new AppForm();
		request.setAttribute("AppForm", pform);
		return mapping.findForward("toApp");
	    
		
	}
}
