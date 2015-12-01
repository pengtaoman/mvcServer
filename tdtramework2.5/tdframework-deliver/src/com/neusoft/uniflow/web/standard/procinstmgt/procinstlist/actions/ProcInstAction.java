package com.neusoft.uniflow.web.standard.procinstmgt.procinstlist.actions;

import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.api.NWFilter;
import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.handler.NWProcInst;
import com.neusoft.uniflow.api.handler.NWProcInstManager;
import com.neusoft.uniflow.common.NWException;
import com.neusoft.uniflow.web.AO.ProcInstAO;
import com.neusoft.uniflow.web.common.list.OpenListAction;
import com.neusoft.uniflow.web.common.list.OpenListParamBean;
import com.neusoft.uniflow.web.standard.procinstmgt.procinstlist.forms.ProcInstForm;

public class ProcInstAction extends OpenListAction {

	public void handleRequest(String userID, ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws NWException {
		ProcInstAO procInstAO = ProcInstAO.getInstance();
		ProcInstForm procinstForm = (ProcInstForm) form;
		String operation = procinstForm.getOperation();
		String procInstID = procinstForm.getSelectedItem();
		String state = request.getParameter("state");

		if (procinstForm.getState() == null
				|| procinstForm.getState().equals(""))
			procinstForm.setState(state);

		if (procinstForm == null || procInstID.equals("")) {
			return;
		} else {
			if (operation != null && operation.equals("start")) {
				procInstAO.doStart(request, procInstID);
			} else if (operation != null && operation.equals("suspend")) {
				procInstAO.doSuspend(request, procInstID);
			} else if (operation != null && operation.equals("resume")) {
				procInstAO.doResume(request, procInstID);
			} else if (operation != null && operation.equals("restart")) {
				procInstAO.doRestart(request, procInstID);
			} else if (operation != null && operation.equals("abort")) {
				procInstAO.doAbort(request, procInstID);
			} else if (operation != null && operation.equals("delete")) {
				procInstAO.doDelete(request, procInstID);
			}
		}
		procinstForm.setOperation("");
	}

	public int getItemsCount(String userID, NWSession nwsession,
			ActionMapping mapping, ActionForm form) throws NWException {
		ProcInstForm procinstForm = (ProcInstForm) form;
		String state = procinstForm.getState();
		String procInstName = procinstForm.getProcInstName();
		int count = 0;
		if (procInstName == null || procInstName.equals("")){
		if (!state.equals(""))
			count = nwsession.getCanMonitorProcInstNum(userID, Integer
					.parseInt(state));
		}
		else
		{
			NWFilter nwfilter = new NWFilter();
			nwfilter.setName(NWFilter.PROCINST);
			if (state != null && !state.equals("")) {
				nwfilter.addFilter(NWFilter.P_CURRENT_STATE, NWFilter.OP_E,
						state);
			}
			procInstName = "%" + procInstName.trim() + "%";
			nwfilter.addFilter(NWFilter.P_NAME, NWFilter.OP_LIKE,
						procInstName, NWFilter.OP_AND);
			NWProcInstManager procInstManager = nwsession.getProcInstManager();
			count = procInstManager.getCanMonitorProcInstNum(userID, nwfilter);
		}
		return count;
	}

	public Vector openList(String userID, NWSession nwsession,
			ActionMapping mapping, ActionForm form, OpenListParamBean param)
			throws NWException {
		ProcInstForm procinstForm = (ProcInstForm) form;
		String state = procinstForm.getState();
		String procInstName = procinstForm.getProcInstName();
		Vector list = null;
		if (procInstName == null || procInstName.equals("")) {
			if (!state.equals("")) {
				list = nwsession.openCanMonitorProcInstList(userID, Long
						.valueOf(state).longValue(), param.getOrderBy(), param
						.getStart(), param.getOffset(), param.isIsAscending());
			}
		} else {
			NWFilter nwfilter = new NWFilter();
			nwfilter.setName(NWFilter.PROCINST);
			if (state != null && !state.equals("")) {
				nwfilter.addFilter(NWFilter.P_CURRENT_STATE, NWFilter.OP_E,
						state);
			}
			procInstName = "%" + procInstName.trim() + "%";
			nwfilter.addFilter(NWFilter.P_NAME, NWFilter.OP_LIKE,
						procInstName, NWFilter.OP_AND);
			nwfilter.setPageInfo(param.getOrderBy(), param.isIsAscending(),
					param.getStart(), param.getOffset());
			NWProcInstManager procInstManager = nwsession.getProcInstManager();
			list = procInstManager.openCanMonitorProcInstList(userID, nwfilter, param.getOrderBy(), param
					.getStart(), param.getOffset(), param.isIsAscending());
		}
		if (list.size() > 0)
			procinstForm.setSelectedItem(((NWProcInst) list.elementAt(0))
					.getProcInstID());
		return list;
	}
}