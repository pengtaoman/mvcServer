package com.neusoft.uniflow.web.webdesign.AttributeOperation.actions.choiceNodeActions;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.api.def.NWActDef;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.choiceNodeForms.ChoiceNodeForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.AttrSave;

public class ChoiceNodeAction extends Action{
	public ActionForward execute(ActionMapping mapping,
		     ActionForm form,
		     HttpServletRequest request,
		     HttpServletResponse response){
		
		String id = ((ChoiceNodeForm)form).getId();
		String xmlStr = ((ChoiceNodeForm)form).getXmlStr();
		
		try{

			 xmlStr = AttrSave.toString(xmlStr, (ChoiceNodeForm)form, Integer.toString(NWActDef.ACT_TYPE_CHOICE) , id);
			}catch(Exception e){
				e.printStackTrace();
			}

		request.setAttribute("id", id);
		request.setAttribute("xmlStr", xmlStr);
		request.setAttribute("close_flag", "close");
		ChoiceNodeForm pform = new ChoiceNodeForm();
		request.setAttribute("ChoiceNodeForm", pform);
		return mapping.findForward("toChoice");
	    
		
	}
}
