package com.neusoft.uniflow.web.test.actions;

import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.bizhandler.NWBizWorkItemManagerImpl;
import com.neusoft.uniflow.common.NWException;
import com.neusoft.uniflow.web.common.list.OpenListAction;
import com.neusoft.uniflow.web.common.list.OpenListParamBean;
import com.neusoft.uniflow.web.test.forms.PersonWorkListForm;


public class PersonWorkListAction extends OpenListAction {

	public void handleRequest(String userID, ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws NWException {

		PersonWorkListForm handleForm = (PersonWorkListForm) form;
		String categoryview = request.getParameter("categoryview");
		if (handleForm.getCategoryview() == null
				|| handleForm.getCategoryview().equals(""))
			handleForm.setCategoryview(categoryview);
	}

	public int getItemsCount(String userID, NWSession nwsession,
			ActionMapping mapping, ActionForm form) throws Exception {
		//PersonWorkListForm bizWorkForm = (PersonWorkListForm) form;
		//int count = 0;
		//NWBizWorkItemManager manager = nwsession
				//.getBizWorkItemManager(bizWorkForm.getCategoryview());
		//count = manager.getPersonWorkitemNum(userID, 2, "");
		return 0;
	}

	public Vector openList(String userID, NWSession nwsession,
			ActionMapping mapping, ActionForm form, OpenListParamBean param)
			throws Exception {

		PersonWorkListForm bizWorkForm = (PersonWorkListForm) form;
//		NWFilter filter = new NWFilter();
//		filter.setName(NWFilter.WORKITEM);
//		filter.addFilter(NWFilter.W_CURRENT_STATE, NWFilter.OP_E, "2");
//		Vector list = null;
//		NWBizWorkItemManager manager = nwsession
//				.getBizWorkItemManager(bizWorkForm.getCategoryview());
//		list = manager.openWorkItemList(userID, filter,
//				NWBizWorkItemManager.WORKITEMLIST_PERSON);
		Vector list = null;
		NWBizWorkItemManagerImpl manager =(NWBizWorkItemManagerImpl) nwsession.getBizWorkItemManager(bizWorkForm.getCategoryview());
		list = manager.openWorkitemsForTest("110c31:fcd8bada49:-7ff1", 2);
			
		if (list != null && list.size() > 0){
			bizWorkForm.setSelectedItem(((com.neusoft.uniflow.api.bizhandler.NWBizWorkItem) list.elementAt(0)).getWorkItemID());
		}

		return list;
	}

}
