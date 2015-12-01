package com.neusoft.uniflow.web.webdesign.AttributeOperation.actions.parallelActions;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.api.def.NWActDef;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.AttrSave;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.parallelForms.ParallelForm;

public class ParallelAction extends Action{
	public ActionForward execute(ActionMapping mapping,
		     ActionForm form,
		     HttpServletRequest request,
		     HttpServletResponse response){
		
	
		
			String id = ((ParallelForm)form).getId();
			
			String xmlStr = ((ParallelForm)form).getXmlStr();
			
			try{
				 xmlStr = AttrSave.toString(xmlStr, (ParallelForm)form, Integer.toString(NWActDef.ACT_TYPE_PARALLEL_UNIT) , id);
				}catch(Exception e){
					e.printStackTrace();
				}
			request.setAttribute("id", id);
            
			request.setAttribute("xmlStr", xmlStr);
			
			request.setAttribute("close_flag", "close");
			
			ParallelForm mnform = new ParallelForm();
			request.setAttribute("ParallelForm", mnform);
			
			return mapping.findForward("toParallel");
		    
	
		}
		
	}
	

          

