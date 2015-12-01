package com.neusoft.uniflow.web.monitor.procdef.actions;

import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.handler.NWWorkItemManager;
import com.neusoft.uniflow.common.NWException;
import com.neusoft.uniflow.web.common.list.OpenListAction;
import com.neusoft.uniflow.web.common.list.OpenListParamBean;
import com.neusoft.uniflow.web.monitor.procdef.beans.Transtion;
import com.neusoft.uniflow.web.monitor.procdef.beans.WorkItemBean;
import com.neusoft.uniflow.web.monitor.procdef.forms.WorkItemListForm;
import com.neusoft.uniflow.web.util.CommonInfoManager;

public class WorkItemListAction extends OpenListAction {
	HttpServletRequest request;
	public void handleRequest(String userID, ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws NWException {
		WorkItemListForm workitemForm = (WorkItemListForm) form;
		this.request=request;
		String actDefID = request.getParameter("actDefID");
		if (actDefID != null && !actDefID.equals(""))
			workitemForm.setActDefID(actDefID);
		String state = request.getParameter("state");
		request.setAttribute("selectinfo", CommonInfoManager.getSelectInfo(request.getSession()));
		if (state != null && !state.equals("")) {
			if (state.equals("6"))
				workitemForm.setState(6L);
			if (state.equals("16"))
				workitemForm.setState(16L);
			if (state.equals("6"))
				workitemForm.setState(6L);
			if (state.equals("-1"))
				workitemForm.setState(-1);
		}
	}

	public int getItemsCount(String userID, NWSession nwsession,
			ActionMapping mapping, ActionForm form) throws NWException {
		WorkItemListForm workitemForm = (WorkItemListForm) form;
		int count = 0;
		NWWorkItemManager workitemManager = nwsession.getWorkItemManager();
		try {
			count = workitemManager.getWorkitemNumByActDefID(workitemForm
					.getState(), workitemForm.getActDefID());
		} catch (Exception e) {
			throw new NWException(e, NWException.WI_GET_ERR);
			// e.printStackTrace();
		}
		return count;
	}

	public Vector openList(String userID, NWSession nwsession,
			ActionMapping mapping, ActionForm form, OpenListParamBean param)
			throws NWException {
		WorkItemListForm workitemForm = (WorkItemListForm) form;
		NWWorkItemManager workitemManager = nwsession.getWorkItemManager();
		Vector list = new Vector();
		try {
			Vector list0 = workitemManager.openWorkitemListByActDefID(
					workitemForm.getState(), workitemForm.getActDefID(), param
							.getOrderBy(), param.getStart(), param.getOffset(),
					param.isIsAscending());
			list = Transtion.changeToBean(list0, nwsession,this.request.getSession());
		} catch (Exception e) {
			throw new NWException(e, NWException.WI_GET_ERR);
		}
		if (list != null && list.size() > 0)
			workitemForm.setSelectedItem(((WorkItemBean) list.elementAt(0))
					.getId());
		return list;
	}
}