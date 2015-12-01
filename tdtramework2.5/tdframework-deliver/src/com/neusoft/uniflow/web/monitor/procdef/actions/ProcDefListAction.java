package com.neusoft.uniflow.web.monitor.procdef.actions;

import java.util.Vector;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.common.NWException;
import com.neusoft.uniflow.web.common.list.OpenListAction;
import com.neusoft.uniflow.web.common.list.OpenListForm;
import com.neusoft.uniflow.web.common.list.OpenListParamBean;

public class ProcDefListAction extends OpenListAction {
	public int getItemsCount(String userID, NWSession nwsession,
			ActionMapping mapping, ActionForm form) throws Exception {
		int count = 1;
		count = nwsession.getProcDefNum(0);
		return count;
	}

	public Vector openList(String userID, NWSession nwsession,
			ActionMapping mapping, ActionForm form, OpenListParamBean param)
			throws NWException {
		Vector list = nwsession.openProcDefList(userID,0, param
				.getOrderBy(), param.getStart(), param.getOffset(), param
				.isIsAscending());
		if (list != null && list.size() > 0) {

			String id = ((com.neusoft.uniflow.api.def.NWProcDef) list
					.elementAt(0)).getID();
			String verName = ((com.neusoft.uniflow.api.def.NWProcDef) list
					.elementAt(0)).getVersionName();

			((OpenListForm) form).setSelectedItem(id + "#" + verName);
		}
		return list;
	}
}