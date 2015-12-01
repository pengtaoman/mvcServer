package com.neusoft.uniflow.web.webdesign.AttributeOperation.actions.manualNodeActions;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.api.def.NWActDef;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.manualNodeForms.ManualNodeForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.AttrSave;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.AttributeFormToModelElement;

public class ManualNodeAction extends Action{
	public ActionForward execute(ActionMapping mapping,
		     ActionForm form,
		     HttpServletRequest request,
		     HttpServletResponse response){
		    String action = ((ManualNodeForm)form).getAction();	
		    if("submit".equals(action)){
			String id = ((ManualNodeForm)form).getId();
			
			String xmlStr = ((ManualNodeForm)form).getXmlStr();
			String name = ((ManualNodeForm)form).getParticipantsName();
			
			//根据xmlStr的内容，判断节点信息是流程中的节点，还是流程模板树中的节点
			
			try{
				if(xmlStr.indexOf(AttrSave.ACTTEMPLETS_IDENTIFICATION) >=0 )
				{
					//节点模板中的节点,如何构建ManualNode的xml
					xmlStr = AttributeFormToModelElement.getManualNode(xmlStr, (ManualNodeForm)form).toString();
					request.setAttribute("templateNodeType", "manualType");		
				}
				else
				{
				  //流程模板中的节点
				  xmlStr = AttrSave.toString(xmlStr, (ManualNodeForm)form, Integer.toString(NWActDef.ACT_TYPE_MANUAL) , id);
				}
				}catch(Exception e){
					e.printStackTrace();
				}
			request.setAttribute("id", id);
            
			request.setAttribute("xmlStr", xmlStr);
			
			request.setAttribute("name", name);
			
			request.setAttribute("close_flag", "close");
			
			ManualNodeForm mnform = new ManualNodeForm();
			request.setAttribute("ManualNodeForm", mnform);
			
			return mapping.findForward("toManual");
		    }
		    return mapping.findForward("error");
		}
		
	}
	

          

