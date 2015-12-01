package com.neusoft.uniflow.web.monitor.procinst.actions;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.def.NWActDef;
import com.neusoft.uniflow.api.def.NWTimerEntity;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class ActDefDetailAction extends Action {
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		HttpSession session = request.getSession();
		NWSession nwsession = WorkflowManager.getSysNWSession();
		String actdefid = request.getParameter("actdefid");
		try {
			NWActDef actdefInfo = nwsession.getActDef(actdefid, 0);
			NWTimerEntity nwTimer=actdefInfo.getTimer();
			if(nwTimer != null){
			actdefInfo.setLimitTime(nwTimer.getLimitTime());
			actdefInfo.setOvertimeAction(nwTimer.getLimitAction());
			}
			request.setAttribute("actdefInfo", actdefInfo);
			int type = actdefInfo.getType();
			if (type==0)
			    return mapping.findForward("auto");
			else if(type==1){
				return mapping.findForward("manul");
			}else if (type==4){
				return mapping.findForward("event");
			}else if(type==2 || type==3){
				return mapping.findForward("subproc");
			}else{
				session.setAttribute(SessionManager.ERROR, new UniException("无法显示定义信息！"));
	            return mapping.findForward("error");
			}
		} catch (Exception e) {
			session.setAttribute(SessionManager.ERROR, new UniException(e));
            return mapping.findForward("error");
		}

	}
}