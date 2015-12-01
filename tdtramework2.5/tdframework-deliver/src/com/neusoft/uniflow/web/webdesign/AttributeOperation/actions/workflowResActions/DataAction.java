package com.neusoft.uniflow.web.webdesign.AttributeOperation.actions.workflowResActions;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.choiceNodeForms.ChoiceNodeForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.workflowResourceForms.DataForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.AttrSave;

public class DataAction extends Action{
	public ActionForward execute(ActionMapping mapping,
		     ActionForm form,
		     HttpServletRequest request,
		     HttpServletResponse response){
		
		String id = ((DataForm)form).getId();
		String xmlStr = ((DataForm)form).getXmlStr();
		
		try{

			 xmlStr = AttrSave.toString(xmlStr, (DataForm)form, "Data" , id);
			}catch(Exception e){
				e.printStackTrace();
			}

			
		request.setAttribute("id", id);
		request.setAttribute("xmlStr", xmlStr);
		request.setAttribute("close_flag", "close");
		
		DataForm pform = new DataForm();
		request.setAttribute("DataForm", pform);
		return mapping.findForward("toData");
	    
		
	}

}
