package com.neusoft.uniflow.web.webdesign.AttributeOperation.actions.branchBeginNodeActions;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.api.def.NWActDef;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.branchBeginNodeForms.BranchBeginNodeForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.AttrSave;

public class BranchBeginNodeAction extends Action {
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) {

		String id = ((BranchBeginNodeForm) form).getId();

		String xmlStr = ((BranchBeginNodeForm) form).getXmlStr();

		try {

			xmlStr = AttrSave.toString(xmlStr, (BranchBeginNodeForm) form,
					Integer.toString(NWActDef.ACT_TYPE_PARALLEL_BRANCH_BEGIN),
					id);
		} catch (Exception e) {
			e.printStackTrace();
		}

		request.setAttribute("id", id);

		request.setAttribute("xmlStr", xmlStr);

		request.setAttribute("close_flag", "close");

		BranchBeginNodeForm pform = new BranchBeginNodeForm();
		request.setAttribute("BranchBeginNodeForm", pform);

		return mapping.findForward("toBranchBegin");

	}
}
