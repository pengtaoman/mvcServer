package com.neusoft.uniflow.web.webdesign.AttributeOperation.actions.autoNodeActions;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.api.def.NWActDef;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.autoNodeForms.AutoNodeForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.manualNodeForms.ManualNodeForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.AttrSave;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.AttributeFormToModelElement;

public class AutoNodeAction extends Action {
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) {

		String id = ((AutoNodeForm) form).getId();

		String xmlStr = ((AutoNodeForm) form).getXmlStr();

		try {
			if(xmlStr.indexOf(AttrSave.ACTTEMPLETS_IDENTIFICATION) >=0 )
			{
				//节点模板中的节点,如何构建ManualNode的xml
				xmlStr = AttributeFormToModelElement.getAutoNode(xmlStr, (AutoNodeForm)form).toString();
				request.setAttribute("templateNodeType", "autoType");		
			}
			else
			{
				xmlStr = AttrSave.toString(xmlStr, (AutoNodeForm) form, Integer
					.toString(NWActDef.ACT_TYPE_AUTO), id);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		request.setAttribute("id", id);

		request.setAttribute("xmlStr", xmlStr);

		request.setAttribute("close_flag", "close");

		AutoNodeForm pform = new AutoNodeForm();
		request.setAttribute("AutoNodeForm", pform);

		return mapping.findForward("toAuto");

	}
}
