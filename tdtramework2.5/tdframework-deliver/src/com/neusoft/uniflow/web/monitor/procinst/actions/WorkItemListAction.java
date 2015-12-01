package com.neusoft.uniflow.web.monitor.procinst.actions;

import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.def.NWActDef;
import com.neusoft.uniflow.api.handler.NWActInst;
import com.neusoft.uniflow.common.NWException;
import com.neusoft.uniflow.engine.inst.ProcessInstance;
import com.neusoft.uniflow.web.monitor.procinst.beans.Transtion;
import com.neusoft.uniflow.web.util.ParseOperatorFromActDef;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class WorkItemListAction extends Action {
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		HttpSession session = request.getSession();
		NWSession nwsession = WorkflowManager.getNWSession();

		String htID = request.getParameter("actinstid");
		String actdefID = request.getParameter("actdefID");
		String procinstID = request.getParameter("procinstID");
		NWActInst actinst = null;
		NWActDef actdef = null;
		Vector wis = new Vector();

		try {
			if (htID != null && !htID.equals("none")) {
				actinst = nwsession.getActInst(nwsession.getUserID(), htID);
				wis = actinst.openWorkItemList(-1);
				wis = Transtion.changeToBean(wis, nwsession, session);
			} else if (actdefID != null)// 如果点击的是还没有运行的节点，那么获取该节点的办理人ID
			{

				Vector participants = Transtion.changeActDefToWorkitemBean(actdefID, procinstID, session);
				for (int i = 0; i < participants.size(); i++) {
					wis.add(participants.get(i));
				}
			}
			request.setAttribute("wis", wis);
			return mapping.findForward("success");
		} catch (Exception e) {
			session.setAttribute(SessionManager.ERROR, new UniException(e));
			// session.setAttribute(SessionManager.ERROR, new UniException(
			// "取得工作项列表信息失败！"));
			return mapping.findForward("error");
		}
	}


}