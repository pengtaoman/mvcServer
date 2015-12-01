package com.neusoft.uniflow.web.webdesign.AttributeOperation.actions.branchEndNodeActions;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.api.def.NWActDef;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.branchEndNodeForms.BranchEndNodeForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.AttrSave;

public class BranchEndNodeAction extends Action{
	public ActionForward execute(ActionMapping mapping,
		     ActionForm form,
		     HttpServletRequest request,
		     HttpServletResponse response){
		
		String id = ((BranchEndNodeForm)form).getId();
		String xmlStr = ((BranchEndNodeForm)form).getXmlStr();
		
		try{

			 xmlStr = AttrSave.toString(xmlStr, (BranchEndNodeForm)form, Integer.toString(NWActDef.ACT_TYPE_PARALLEL_BRANCH_END) , id);
			}catch(Exception e){
				e.printStackTrace();
			}

		request.setAttribute("id", id);
		request.setAttribute("xmlStr", xmlStr);
		request.setAttribute("close_flag", "close");
		BranchEndNodeForm pform = new BranchEndNodeForm();
		request.setAttribute("BranchEndNodeForm", pform);
	
		return mapping.findForward("toBranchEnd");
	    
		
	}
}
