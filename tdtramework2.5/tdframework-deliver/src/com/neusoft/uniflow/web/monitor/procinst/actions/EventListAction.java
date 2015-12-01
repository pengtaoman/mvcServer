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
import com.neusoft.uniflow.api.def.NWActEvent;
import com.neusoft.uniflow.api.def.NWProcDef;
import com.neusoft.uniflow.api.def.NWRelData;
import com.neusoft.uniflow.api.handler.NWProcInst;
import com.neusoft.uniflow.api.res.NWEvent;
import com.neusoft.uniflow.web.monitor.procinst.beans.Transtion;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class EventListAction extends Action {
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		HttpSession session = request.getSession();
		NWSession nwsession = WorkflowManager.getSysNWSession();

		String actdefid = request.getParameter("actdefid");
		String procinstid = request.getParameter("procinstID");
		NWActDef actdef = null;
		try {
			actdef = nwsession.getActDef(actdefid, 0);
		} catch (Exception e) {
			session.setAttribute(SessionManager.ERROR, new UniException(e));
			//session.setAttribute(SessionManager.ERROR, new UniException(
					//"取得节点定义失败，流程定义可能被删除！"));
			return mapping.findForward("error");
		}
		Vector events = new Vector();
		NWEvent event;
		NWActEvent actEvent;
		String etype = "";
		String evalue = "";
		String key = "";
		try {
			if (actdef != null) {
				NWProcInst procinst = nwsession.getProcInst((String) session
						.getAttribute(SessionManager.BIZ_USERID), procinstid);
				actEvent = actdef.getEvent();
				if (actEvent.getEventDirection() == 0)
					etype = "发送事件";
				else if (actEvent.getEventDirection() == 1)
					etype = "接收事件";
				if (procinst != null) {
					NWProcDef procdef = procinst.getProcDef();
					NWRelData rd = null;
					if (actEvent.getEventValue() != null
							&& !actEvent.getEventValue().equals(""))
						rd = procdef.getRelData(actEvent.getEventValue());

					if (rd != null)
						evalue = rd.getName();
				} else
					evalue = actEvent.getEventValue();
				event = nwsession.getEvent(actEvent.getEventID());
				key = event.getKey();
				events = Transtion.changeToEventBean(event, actdef
						.openEventParamList(), procinst);
			}
			request.setAttribute("etype", etype);
			request.setAttribute("evalue", evalue);
			request.setAttribute("key", key);
			request.setAttribute("events", events);
			return mapping.findForward("success");
		} catch (Exception e) {
			session.setAttribute(SessionManager.ERROR, new UniException(e));
			//session.setAttribute(SessionManager.ERROR, new UniException(
					//"取得事件列表及事件键信息失败，信息可能被删除！"));
			return mapping.findForward("error");
		}
	}
}