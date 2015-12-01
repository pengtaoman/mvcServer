package com.neusoft.uniflow.web.monitor.procdef.actions;

import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.api.NWFilter;
import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.mgmt.NWRunTimeApplication;
import com.neusoft.uniflow.api.mgmt.NWRunTimeApplicationHandler;
import com.neusoft.uniflow.common.NWException;
import com.neusoft.uniflow.web.common.list.OpenListAction;
import com.neusoft.uniflow.web.common.list.OpenListForm;
import com.neusoft.uniflow.web.common.list.OpenListParamBean;
import com.neusoft.uniflow.web.monitor.procdef.forms.ApplicationListForm;
import com.neusoft.uniflow.web.util.CommonInfoManager;

public class ApplicationListAction extends OpenListAction {

	public void handleRequest(String userID, ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws NWException {
		ApplicationListForm applistForm = (ApplicationListForm) form;
		String actDefID = request.getParameter("actDefID");
		String state = request.getParameter("state");
		request.setAttribute("selectinfo", CommonInfoManager.getAPPSelectInfo(request.getSession()));
		if (actDefID != null)
			applistForm.setActDefID(actDefID);
		if (state != null)
			applistForm.setState(state);

	}

	public int getItemsCount(String userID, NWSession nwsession,
			ActionMapping mapping, ActionForm form) throws NWException {
		int count = 0;
		ApplicationListForm applistForm = (ApplicationListForm) form;
		// String selecttype = applistForm.getSelecttype();
		NWRunTimeApplicationHandler handler = nwsession
				.getRunTimeApplicationHandler();
		NWFilter filter = new NWFilter();
		filter.setName(NWFilter.ACTINST);
		
		if (!applistForm.getActDefID().equals("")
				&& !applistForm.getState().equals("-1")) {
			filter.addFilter(NWFilter.A_ACTIVITY_TMP_ID, NWFilter.OP_E,
					applistForm.getActDefID());
			filter.addFilter("state", NWFilter.OP_E,
					applistForm.getState(), NWFilter.OP_AND);
		}
		if (!applistForm.getActDefID().equals("")
				&& applistForm.getState().equals("-1")) {
			filter.addFilter(NWFilter.A_ACTIVITY_TMP_ID, NWFilter.OP_E,
					applistForm.getActDefID());
		}

		count = handler.getApplicationNum(nwsession.getUserAccount(), filter);
		return count;
	}

	public Vector openList(String userID, NWSession nwsession,
			ActionMapping mapping, ActionForm form, OpenListParamBean param)
			throws Exception {
		Vector list = new Vector();
		ApplicationListForm applistForm = (ApplicationListForm) form;

		NWRunTimeApplicationHandler handler = nwsession.getRunTimeApplicationHandler();
		NWFilter filter = new NWFilter();
		filter.setName(NWFilter.ACTINST);
		if (!applistForm.getActDefID().equals("")
				&& !applistForm.getState().equals("-1")) {
			filter.addFilter(NWFilter.A_ACTIVITY_TMP_ID, NWFilter.OP_E,
					applistForm.getActDefID());
			filter.addFilter("state", NWFilter.OP_E,
					applistForm.getState(), NWFilter.OP_AND);
		}
		if (!applistForm.getActDefID().equals("")
				&& applistForm.getState().equals("-1")) {
			filter.addFilter(NWFilter.A_ACTIVITY_TMP_ID, NWFilter.OP_E,
					applistForm.getActDefID());
		}
		filter.setPageInfo(param.getOrderBy(), param.isIsAscending(), param
				.getStart(), param.getOffset());
		list = handler.openApplicationList(nwsession.getUserAccount(), filter);

		if (list != null && list.size() > 0) {
			NWRunTimeApplication autoact = (NWRunTimeApplication) list
					.elementAt(0);
			((OpenListForm) form).setSelectedItem(autoact.getActInstID());

		}
		return list;
	}
}
