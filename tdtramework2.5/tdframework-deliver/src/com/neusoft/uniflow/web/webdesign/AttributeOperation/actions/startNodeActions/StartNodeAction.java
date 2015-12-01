package com.neusoft.uniflow.web.webdesign.AttributeOperation.actions.startNodeActions;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.api.def.NWActDef;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.startNodeForms.StartNodeForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.AttrSave;

public class StartNodeAction extends Action {
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) {

		String id = ((StartNodeForm) form).getId();
		String xmlStr = ((StartNodeForm) form).getXmlStr();

		try {

			xmlStr = AttrSave.toString(xmlStr, (StartNodeForm) form, Integer
					.toString(NWActDef.ACT_TYPE_START), id);
		} catch (Exception e) {
			e.printStackTrace();
		}

		request.setAttribute("id", id);
		request.setAttribute("xmlStr", xmlStr);
		request.setAttribute("close_flag", "close");
		StartNodeForm pform = new StartNodeForm();
		request.setAttribute("StartNodeForm", pform);
		return mapping.findForward("toStart");

	}
}
