package com.neusoft.uniflow.web.test.actions;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.def.NWProcDef;
import com.neusoft.uniflow.api.handler.NWProcInst;
import com.neusoft.uniflow.persistence.IPersistence;
import com.neusoft.uniflow.service.WorkFlowContext;
import com.neusoft.uniflow.web.test.forms.StartProcForm;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class StartProcAction extends Action {
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		HttpSession session = request.getSession();
		NWSession nwsession = WorkflowManager.getNWSession();
		StartProcForm spform = (StartProcForm) form;
		if (spform.getOperation().equals("OK")) {
			String procdefID = "2e8eb610:11a94063c6d:-65db";
			String version = "V1";
			NWProcDef procdef = null;
			NWProcInst procinst = null;
			procdef = nwsession.getProcDef("110c31:fcd8bada49:-7ff1", procdefID, version, 0);
			try {
				procinst = procdef.createProcessInst(spform.getTsbj()+" -申请流程");
				doBizOperation(nwsession, procinst.getProcInstID(), spform);
				try {
					procinst.doStart();
					request.setAttribute("close_flag", "close");
					request.setAttribute("fail", "startProcessTrue");
				} catch (Exception e) {
					e.printStackTrace();
					session.setAttribute(SessionManager.ERROR,
							new UniException(e));
					return mapping.findForward("error");
				}
			} catch (Exception e) {
				e.printStackTrace();
				session.setAttribute(SessionManager.ERROR, new UniException(e));
				return mapping.findForward("error");
			}
		}
		return mapping.findForward("success");

	}
	private void doBizOperation(NWSession nwsession, String procinstID,StartProcForm spform) throws Exception{
		IPersistence ip = WorkFlowContext.getInstance().getPersistence();
		StringBuffer bsql = new StringBuffer();
		bsql.append("INSERT INTO bizdata(link,biz01,biz02,biz03,biz04) values('");
		bsql.append(procinstID);
		bsql.append("','").append(spform.getTsbj()).append("','-','-','-')");
		ip.executeUpdate(bsql.toString());	
	}

}