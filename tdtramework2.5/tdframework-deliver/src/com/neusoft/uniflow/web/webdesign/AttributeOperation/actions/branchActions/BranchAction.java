package com.neusoft.uniflow.web.webdesign.AttributeOperation.actions.branchActions;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.api.def.NWActDef;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.AttrSave;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.branchForms.BranchForm;

public class BranchAction extends Action{
	public ActionForward execute(ActionMapping mapping,
		     ActionForm form,
		     HttpServletRequest request,
		     HttpServletResponse response){
		
		
		
			String id = ((BranchForm)form).getId();
			
			String xmlStr = ((BranchForm)form).getXmlStr();
			
			try{
				 xmlStr = AttrSave.toString(xmlStr, (BranchForm)form, Integer.toString(NWActDef.ACT_TYPE_PARALLEL_BRANCH) , id);
				}catch(Exception e){
					e.printStackTrace();
				}
			request.setAttribute("id", id);
            
			request.setAttribute("xmlStr", xmlStr);
			
			request.setAttribute("close_flag", "close");
			
			BranchForm mnform = new BranchForm();
			request.setAttribute("BranchForm", mnform);
			
			return mapping.findForward("toBranch");
		    
	
		}
		
	}
	

          

