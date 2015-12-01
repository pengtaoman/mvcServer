package com.neusoft.uniflow.web.webdesign.AttributeOperation.actions.endNodeActions;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.api.def.NWActDef;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.endNodeForms.EndNodeForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.transitionForms.TransitionForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.AttrSave;

public class EndNodeAction extends Action{
	public ActionForward execute(ActionMapping mapping,
		     ActionForm form,
		     HttpServletRequest request,
		     HttpServletResponse response){
		
		String id = ((EndNodeForm)form).getId();
		
		String xmlStr = ((EndNodeForm)form).getXmlStr();
	
		
		try{

			 xmlStr = AttrSave.toString(xmlStr, (EndNodeForm)form, Integer.toString(NWActDef.ACT_TYPE_END) , id);
			}catch(Exception e){
				e.printStackTrace();
			}

			
		request.setAttribute("id", id);

		request.setAttribute("xmlStr", xmlStr);
		
		request.setAttribute("close_flag", "close");
		
		EndNodeForm pform = new EndNodeForm();
		request.setAttribute("EndNodeForm", pform);
		return mapping.findForward("toEnd");
	    
		
	}
}
