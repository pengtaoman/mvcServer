package com.neusoft.uniflow.web.monitor.procdef.actions;

import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.handler.NWProcInst;
import com.neusoft.uniflow.common.NWException;
import com.neusoft.uniflow.web.common.list.OpenListAction;
import com.neusoft.uniflow.web.common.list.OpenListParamBean;
import com.neusoft.uniflow.web.monitor.procdef.beans.ActBean;
import com.neusoft.uniflow.web.monitor.procdef.beans.Transtion;
import com.neusoft.uniflow.web.monitor.procdef.forms.CurActDetailForm;

public class CurActDetailAction extends OpenListAction {
	public void handleRequest(String userID, ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws NWException {
		CurActDetailForm curactForm = (CurActDetailForm) form;
		String procID = request.getParameter("procID");
		if (procID!=null&&!procID.equals(""))
		   curactForm.setProcID(procID);
	}

	public int getItemsCount(String userID, NWSession nwsession,
			ActionMapping mapping, ActionForm form) throws NWException {
		int count = 0;
		CurActDetailForm curactForm = (CurActDetailForm) form;
		String procID = curactForm.getProcID();
		NWProcInst procinst = nwsession.getProcInst(nwsession.getUserID(),procID);
		count = procinst.openActInstList(6L).size();
		return count;
	}

	public Vector openList(String userID, NWSession nwsession,
			ActionMapping mapping, ActionForm form, OpenListParamBean param)
			throws NWException {
		CurActDetailForm curactForm = (CurActDetailForm) form;
		String procID = curactForm.getProcID();
		NWProcInst procinst = nwsession.getProcInst(nwsession.getUserID(),procID);
		Vector list = new Vector();
		if (procinst != null)
			list = Transtion.changeToActBean(procinst.openActInstList(6L),
					nwsession);
		if (list != null && list.size() > 0)
			curactForm.setSelectedItem(((ActBean) list.elementAt(0))
					.getActInstID());
		return list;

	}
}