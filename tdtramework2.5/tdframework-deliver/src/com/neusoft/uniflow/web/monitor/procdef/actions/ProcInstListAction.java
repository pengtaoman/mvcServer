package com.neusoft.uniflow.web.monitor.procdef.actions;

import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.common.NWException;
import com.neusoft.uniflow.web.common.list.OpenListAction;
import com.neusoft.uniflow.web.common.list.OpenListParamBean;
import com.neusoft.uniflow.web.monitor.procdef.forms.ProcInstListForm;

public class ProcInstListAction extends OpenListAction {
	public void handleRequest(String userID, ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws NWException {
    	ProcInstListForm procinstForm = (ProcInstListForm) form;
		String procdefID = request.getParameter("procdefID");
		if (procdefID != null && !procdefID.equals(""))
			procinstForm.setProcdefID(procdefID);
		String verName = request.getParameter("verName");
		if (verName != null && !verName.equals(""))
			procinstForm.setVerName(verName);
		String state = request.getParameter("procState");
		if (state != null && !state.equals("")){
			long sta = Long.valueOf(state).longValue();
			procinstForm.setProcState(sta);
		}	
	}

	public int getItemsCount(String userID, NWSession nwsession,
			ActionMapping mapping, ActionForm form) throws NWException {
		int count = 0;
		ProcInstListForm procinstForm = (ProcInstListForm) form;
		count = nwsession.getProcInstNumByProcDef(nwsession.getUserID(),procinstForm.getProcState(),
				procinstForm.getProcdefID(), procinstForm.getVerName());
		return count;
	}

	public Vector openList(String userID, NWSession nwsession,
			ActionMapping mapping, ActionForm form, OpenListParamBean param)
			throws NWException {
		ProcInstListForm procInstForm = (ProcInstListForm) form;
		Vector list = nwsession.openProcInstListByProcDef(
				nwsession.getUserID(),procInstForm.getProcState() , procInstForm.getProcdefID(),
				procInstForm.getVerName(), param.getStart(), param.getOffset(),
				param.getOrderBy(), param.isIsAscending());
		if (list != null && list.size() > 0)
			procInstForm
					.setSelectedItem(((com.neusoft.uniflow.api.handler.NWProcInst) list
							.elementAt(0)).getProcInstID());
		return list;

	}
}