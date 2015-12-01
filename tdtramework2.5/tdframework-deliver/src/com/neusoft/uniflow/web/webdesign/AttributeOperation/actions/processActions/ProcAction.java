package com.neusoft.uniflow.web.webdesign.AttributeOperation.actions.processActions;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.procForms.ProcForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.AttrSave;

public class ProcAction extends Action {
	public ActionForward execute(ActionMapping mapping,
		     ActionForm form,
		     HttpServletRequest request,
		     HttpServletResponse response){
		
		String id = ((ProcForm)form).getId();
		String xmlStr = ((ProcForm)form).getXmlStr();
		
		try{

			 xmlStr = AttrSave.toString(xmlStr, (ProcForm)form, "Process" , id);
			}catch(Exception e){
				e.printStackTrace();
			}
        
		request.setAttribute("id", id);

		request.setAttribute("xmlStr", xmlStr);
		
		request.setAttribute("close_flag", "close");
		ProcForm pform = new ProcForm();
		request.setAttribute("ProcForm", pform);
		return mapping.findForward("toProc");
	    
	   
	
		
	}
}
