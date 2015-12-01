package com.neusoft.uniflow.web.authorization.purview.actions;

import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.web.authorization.purview.beans.VersionTree;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class VersionTreeAction extends Action {
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		HttpSession session = request.getSession();
		NWSession nwsession = WorkflowManager.getNWSession();

		String objID = request.getParameter("id");
		String type = request.getParameter("type");
		int tp = 1;
		if (type!=null && !type.equals(""))
		   tp = Integer.valueOf(type).intValue();
		try { 
			Vector objs = null;
			if (tp==3){
				objs = new Vector();
			}else{
				if (objID==null || objID.equals("")){
					session.setAttribute(SessionManager.ERROR, new UniException("传入的角色ID为空！"));
					return mapping.findForward("error");
			    }
			    objs = nwsession.openActDefList(tp, objID, null);
			}
            VersionTree verTree = new VersionTree(objs);
			request.setAttribute("verTree", verTree);
			return mapping.findForward("success");
		} catch (Exception e) {
			session.setAttribute(SessionManager.ERROR, new UniException("取得授权树信息失败！"));
			return mapping.findForward("error");
		}

	}
}