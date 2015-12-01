package com.neusoft.uniflow.web.management.applicationmgt.actions;

import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.mgmt.NWRunTimeApplication;
import com.neusoft.uniflow.api.mgmt.NWRunTimeApplicationHandler;
import com.neusoft.uniflow.common.NWException;
import com.neusoft.uniflow.web.common.list.OpenListAction;
import com.neusoft.uniflow.web.common.list.OpenListForm;
import com.neusoft.uniflow.web.common.list.OpenListParamBean;
import com.neusoft.uniflow.web.management.applicationmgt.forms.AppMgrForm;
import com.neusoft.uniflow.web.util.CommonInfoManager;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class AppMgrAction extends OpenListAction {

	public void handleRequest(String userID, ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		NWSession nwsession = WorkflowManager.getNWSession();
		AppMgrForm applistForm = (AppMgrForm) form;
		String selectItem = applistForm.getSelectedItem();
		String operation = applistForm.getOperation();
		// 取得下拉列表控制信息
		request.setAttribute("selectinfo", CommonInfoManager.getApplicationSelectInfo(request.getSession()));
        
		//System.out.println(selectItem);
		try{
			if (selectItem != null && !selectItem.equals("") && operation != null
					&& operation.equalsIgnoreCase("redispachmsg")) {
				int temp = selectItem.indexOf("#");
				String actID = selectItem.substring(0, temp);
				String msgtype = selectItem.substring(temp + 3);
				doRedispachMsg(actID, nwsession, msgtype);
			} else if (selectItem != null && !selectItem.equals("")
					&& operation != null
					&& operation.equalsIgnoreCase("ignorepass")) {
				int temp = selectItem.indexOf("#");
				String actID = selectItem.substring(0, temp);
				//System.out.println(actID);
				String msgtype = selectItem.substring(temp + 3);
				doIgnorePass(actID, nwsession, msgtype);
			} 
		}catch(Exception e){
			e.printStackTrace();
		}
	}

	private void doIgnorePass(String selectItem, NWSession nwsession,
			String msgtype) throws Exception {

		NWRunTimeApplicationHandler handler = nwsession
				.getRunTimeApplicationHandler();
		handler.doError(selectItem, false, nwsession.getUserID(), msgtype);
	}

	private void doRedispachMsg(String selectItem, NWSession nwsession,
			String msgtype) throws Exception {

		NWRunTimeApplicationHandler handler = nwsession
				.getRunTimeApplicationHandler();
		handler.doError(selectItem, true, nwsession.getUserID(), msgtype);

	}

	public int getItemsCount(String userID, NWSession nwsession,
			ActionMapping mapping, ActionForm form) throws NWException {
		int count = 0;
		AppMgrForm applistForm = (AppMgrForm) form;
		String selecttype = applistForm.getSelecttype();
		try{
			NWRunTimeApplicationHandler handler = nwsession
			.getRunTimeApplicationHandler();
			if (selecttype.equals("error")) {
				count = handler.getErrApplicationNum(nwsession.getUserAccount());
			}
			if (selecttype.equals("complete")) {
				count = handler.getCompleteApplicationNum(nwsession
						.getUserAccount());
			}
			if (selecttype.equals("run")) {
				count = handler.getRunApplicationNum(nwsession.getUserAccount());
			}
			if (selecttype.equals("all")) {
				count = handler.getAllApplicationNum(nwsession.getUserAccount());
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return count;
	}

	public Vector openList(String userID, NWSession nwsession,
			ActionMapping mapping, ActionForm form, OpenListParamBean param)
			throws NWException {
		Vector list = new Vector();
		AppMgrForm applistForm = (AppMgrForm) form;
		String selecttype = applistForm.getSelecttype();
		try {
			NWRunTimeApplicationHandler handler = nwsession
			.getRunTimeApplicationHandler();
			if (selecttype.equals("error"))
				list = handler.openErrApplicationList(nwsession
						.getUserAccount(), param.getOrderBy(),
						param.getStart(), param.getOffset(), param
								.isIsAscending());
			if (selecttype.equals("complete"))
				list = handler.openCompleteApplicationList(nwsession
						.getUserAccount(), param.getOrderBy(),
						param.getStart(), param.getOffset(), param
								.isIsAscending());

			if (selecttype.equals("run"))
				list = handler.openRunApplicationList(nwsession
						.getUserAccount(), param.getOrderBy(),
						param.getStart(), param.getOffset(), param
								.isIsAscending());
			if (selecttype.equals("all"))
				list = handler.openAllApplicationList(nwsession
						.getUserAccount(), param.getOrderBy(),
						param.getStart(), param.getOffset(), param
								.isIsAscending());
		} catch (Exception e) {
			// e.printStackTrace();
		}
		if (list != null && list.size() > 0) {
			NWRunTimeApplication autoact = (NWRunTimeApplication) list
					.elementAt(0);
			((OpenListForm) form).setSelectedItem(autoact.getActInstID() + "#"
					+ String.valueOf(autoact.getActState()) + "#"
					+ autoact.getAppHost());

		}
		return list;
	}



}