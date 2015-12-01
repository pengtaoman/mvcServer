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
import com.neusoft.uniflow.api.def.NWProcDef;
import com.neusoft.uniflow.api.handler.NWActInst;
import com.neusoft.uniflow.api.handler.NWProcInst;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class RelDateDetailAction extends Action {
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {

		HttpSession session = request.getSession();
		NWSession nwsession = WorkflowManager.getNWSession();

		String id = request.getParameter("id");
		String type = request.getParameter("type");
		String ver = request.getParameter("ver");
		Vector rds = new Vector();
		try {
			if (!id.equals("none")) {
				if (type.equals("pi")) {
					NWProcInst procinst = nwsession.getProcInst("", id);
					rds = procinst.openRelDataList();
					request.setAttribute("rds", rds);
					return mapping.findForward("procinst");
				}else if(type.equals("pd")){
					NWProcDef procdef = nwsession.getProcDef("",id, ver, 0);
					rds = procdef.openRelDataList();
					request.setAttribute("rds", rds);
					return mapping.findForward("procdef");
				}else{
					if(type.equals("supai"))
					id = nwsession.getProcInst("", id).getSuperActInstID();
					NWActInst actinst = nwsession.getActInst("", id);
					int atype = actinst.getType();
					rds = actinst.openRelDataList();
					request.setAttribute("rds", rds);
					if (atype==0)
						return mapping.findForward("auto");
					else if (atype==1)
				    	return mapping.findForward("manul");
					else if (atype==4)
						return mapping.findForward("event");
					else if (atype==2 || atype==3)
						return mapping.findForward("event");
					else{
						session.setAttribute(SessionManager.ERROR, new UniException("未产生对应实例相关数据信息！"));
						return mapping.findForward("error");
					}
						
				}
			} else {
				session.setAttribute(SessionManager.ERROR, new UniException("未产生对应实例相关数据信息！"));
				return mapping.findForward("error");
			}
		} catch (Exception e) {
			session.setAttribute(SessionManager.ERROR, new UniException(e));
			// session.setAttribute(SessionManager.ERROR, new UniException(
			// "取得相关数据信息失败，相关数据可能被删除！"));
			return mapping.findForward("error");
		}
	}
}