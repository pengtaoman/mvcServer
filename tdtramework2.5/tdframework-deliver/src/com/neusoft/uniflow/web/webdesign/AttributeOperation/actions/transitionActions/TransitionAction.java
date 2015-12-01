package com.neusoft.uniflow.web.webdesign.AttributeOperation.actions.transitionActions;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.transitionForms.TransitionForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.AttrSave;

public class TransitionAction extends Action{
	public ActionForward execute(ActionMapping mapping,
		     ActionForm form,
		     HttpServletRequest request,
		     HttpServletResponse response){
		
		String id = ((TransitionForm)form).getId();
		
		String xmlStr = ((TransitionForm)form).getXmlStr();
		
		try{

			 xmlStr = AttrSave.toString(xmlStr, (TransitionForm)form, "Transition" , id);
			}catch(Exception e){
				e.printStackTrace();
			}

			
		request.setAttribute("id", id);

		request.setAttribute("xmlStr", xmlStr);
		
		request.setAttribute("close_flag", "close");
		
		TransitionForm pform = new TransitionForm();
		request.setAttribute("TransitionForm", pform);
		return mapping.findForward("toTrans");
	    
		
	}
}
