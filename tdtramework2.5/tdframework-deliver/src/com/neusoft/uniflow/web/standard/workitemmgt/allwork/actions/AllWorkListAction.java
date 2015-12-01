package com.neusoft.uniflow.web.standard.workitemmgt.allwork.actions;

import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.handler.NWWorkItem;
import com.neusoft.uniflow.api.handler.NWWorkItemManager;
import com.neusoft.uniflow.common.NWException;
import com.neusoft.uniflow.web.AO.WorkItemAO;
import com.neusoft.uniflow.web.common.list.OpenListAction;
import com.neusoft.uniflow.web.common.list.OpenListParamBean;
import com.neusoft.uniflow.web.standard.workitemmgt.allwork.forms.AllWorkListForm;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class AllWorkListAction extends OpenListAction {
	private static int WORKITEMTYPE = 5;
	public void handleRequest(String userID, ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		AllWorkListForm handleForm = (AllWorkListForm) form;
		String action = handleForm.getOperation();
		String workItemID = handleForm.getSelectedItem();
		NWSession nwsession = WorkflowManager.getNWSession();		
		
		String state = request.getParameter("state");
		if (handleForm.getState() == null || handleForm.getState().equals(""))
			handleForm.setState(state);
		
		if (workItemID == null || workItemID.equals(""))
			return;
		if (action != null && action.equals("complete")) {
			//NWWorkItemManager workitemManager = nwsession.getWorkItemManager();
			//workitemManager.doComplete(workItemID, userID, false);
			NWWorkItem workItem = nwsession.getWorkItem(userID, workItemID);
			try{
				WorkItemAO.getInstance().doComplete(workItem);
			}catch(Exception e){
				System.out.println("-------------------------------------------------");
				e.printStackTrace();
			}
		} else if (action != null && action.equals("take")) {
			NWWorkItem workItem = nwsession.getWorkItem(userID, workItemID);
			workItem.take();
		}else if (action != null && action.equals("withdraw")) {
			NWWorkItem workItem = nwsession.getWorkItem(userID, workItemID);
			if (workItem.isCanWithDraw()){
				workItem.doWithDraw();
			}else{
				request.setAttribute("withdraw", "withdraw");
			}
		}else if(action!=null && action.equals("rollback")){
			NWWorkItem workItem=nwsession.getWorkItem(userID, workItemID);
			try{
				workItem.doRollBack();
				request.setAttribute("rollback", "true");
			}catch(NWException ne){
				request.setAttribute("rollback", "false");
			}
		}
		handleForm.setOperation("");
	}

	public ActionForward findForward(ActionMapping mapping, ActionForm form) {
		return mapping.findForward("success");
	}

	public int getItemsCount(String userID, NWSession nwsession,
			ActionMapping mapping, ActionForm form) throws Exception {
		AllWorkListForm handleForm = (AllWorkListForm) form;
		String state = handleForm.getState();
		int count = 0;
		count = nwsession.getWorkItemNum(userID, WORKITEMTYPE, Long.valueOf(state).longValue());
		return count;
	}

	public Vector openList(String userID, NWSession nwsession,
			ActionMapping mapping, ActionForm form, OpenListParamBean param)
			throws Exception {
		AllWorkListForm handleForm = (AllWorkListForm) form;
		String state = handleForm.getState();
		Vector list = new Vector();
		list = nwsession.openWorkItemList(userID, WORKITEMTYPE, Long
					.valueOf(state).longValue(), param.getOrderBy(), param
					.getStart(), param.getOffset(), param.isIsAscending());
		if (list != null && list.size() > 0)
			handleForm
					.setSelectedItem(((com.neusoft.uniflow.api.handler.NWWorkItem) list
							.elementAt(0)).getWorkItemID());

		return list;
	}
}