package com.neusoft.uniflow.web.webdesign.AttributeOperation.actions.subprocNodeActions;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.api.def.NWActDef;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.autoNodeForms.AutoNodeForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.subProcNodeForms.SubProcNodeForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.AttrSave;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.AttributeFormToModelElement;

public class SubprocNodeAction extends Action{
	public ActionForward execute(ActionMapping mapping,
		     ActionForm form,
		     HttpServletRequest request,
		     HttpServletResponse response){
		
		String id = ((SubProcNodeForm)form).getId();
		String xmlStr = ((SubProcNodeForm)form).getXmlStr();
		
		try{
			if(xmlStr.indexOf(AttrSave.ACTTEMPLETS_IDENTIFICATION) >=0 )
			{
				//节点模板中的节点,如何构建ManualNode的xml
				xmlStr = AttributeFormToModelElement.getSubProcNode(xmlStr, (SubProcNodeForm)form).toString();
				request.setAttribute("templateNodeType", "subProcType");		
			}
			else
			{
			 xmlStr = AttrSave.toString(xmlStr, (SubProcNodeForm)form, Integer.toString(NWActDef.ACT_TYPE_SYNCHSUBPROC) , id);
			}
			}catch(Exception e){
				System.out.println(e.toString());
				
			}
		request.setAttribute("id", id);
		request.setAttribute("xmlStr", xmlStr);
		request.setAttribute("parentData", "["+"\""+" "+"\""+","+"\""+" "+"\""+"]");
		request.setAttribute("close_flag", "close");
		request.setAttribute("JsonData", "["+" "+"]");
		SubProcNodeForm pform = new SubProcNodeForm();
		request.setAttribute("SubProcNodeForm", pform);
		return mapping.findForward("toSubproc");
	    
		
	}
}
