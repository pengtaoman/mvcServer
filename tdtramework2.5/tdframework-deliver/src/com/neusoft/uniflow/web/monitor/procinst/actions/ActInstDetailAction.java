package com.neusoft.uniflow.web.monitor.procinst.actions;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.handler.NWActInst;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class ActInstDetailAction extends Action {
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		HttpSession session = request.getSession();
		NWSession nwsession = WorkflowManager.getNWSession();

		String actinstID = request.getParameter("actinstid");
		try {
			if (actinstID != null && !actinstID.equals("none")) {
				NWActInst actinstInfo = nwsession.getActInst(nwsession
						.getUserID(), actinstID);
				request.setAttribute("actinstInfo", actinstInfo);
				int type = actinstInfo.getType();
				if (type==0)
				    return mapping.findForward("auto");
				else if(type==1){
					return mapping.findForward("manul");
				}else if (type==4){
					return mapping.findForward("event");
				}else{
					session.setAttribute(SessionManager.ERROR, new UniException("无法显示实例信息！"));
		            return mapping.findForward("error");
				}
			} else {
				session.setAttribute(SessionManager.ERROR, new UniException("未生成节点实例！"));
				return mapping.findForward("error");
			}
		} catch (Exception e) {
			session.setAttribute(SessionManager.ERROR, new UniException(e));
			// session.setAttribute(SessionManager.ERROR, new
			// UniException("取得节点实例信息失败，流程实例可能被删除！"));
			return mapping.findForward("error");
		}

	}
}