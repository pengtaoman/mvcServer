package com.neusoft.uniflow.web.standard.procdefmgt.procdeflist.actions;

import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.api.NWFilter;
import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.def.NWProcDef;
import com.neusoft.uniflow.api.def.NWProcDefManager;
import com.neusoft.uniflow.web.common.list.OpenListAction;
import com.neusoft.uniflow.web.common.list.OpenListParamBean;
import com.neusoft.uniflow.web.standard.procdefmgt.procdeflist.forms.ProcDefListForm;

public class ProcDefListAction extends OpenListAction {
	public int getItemsCount(String userID, NWSession nwsession,
			ActionMapping mapping, ActionForm form) throws Exception {
		ProcDefListForm procdefListform = (ProcDefListForm) form;
		int count = 1;
		String procdefName = procdefListform.getProcdefName();
		
		if (procdefName == null || procdefName.equals("")){
			count = nwsession.getCanCreateProcDefNum(userID);
			}
			else
			{
				NWFilter nwfilter = new NWFilter();
				nwfilter.setName(NWFilter.PROCDEF);

				if (procdefName != null && !procdefName.equals("")) {
					procdefName = "%" + procdefName.trim() + "%";
					nwfilter.addFilter("PROC_NAME", NWFilter.OP_LIKE,
							procdefName, NWFilter.OP_AND);
				NWProcDefManager procDefManager = nwsession.getProcDefManager();	
				count = procDefManager.getCanCreateProcDefNum(userID,nwfilter);
				}
		
			}
		return count;
		
	}

	public void handleRequest(String userID, ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {

	}

	public Vector openList(String userID, NWSession nwsession,
			ActionMapping mapping, ActionForm form, OpenListParamBean param)
			throws Exception {
		ProcDefListForm procdefListform = (ProcDefListForm) form;
		String procdefName = procdefListform.getProcdefName();
		String procdefBuilder = procdefListform.getProcdefBuilder();
		String procdefBuilderTime = procdefListform.getProcdefBuilderTime();
		NWFilter nwfilter = new NWFilter();
		Vector list =null;
		nwfilter.setName(NWFilter.PROCDEF);
		if (procdefName != null && !procdefName.equals("")) {
			procdefName = "%" + procdefName.trim() + "%";
			nwfilter.addFilter("PROC_NAME", NWFilter.OP_LIKE, procdefName,
					NWFilter.OP_AND);
			NWProcDefManager procDefManager = nwsession.getProcDefManager();	
			list = procDefManager.openCanCreateProcDefList(userID,nwfilter, param
					.getOrderBy(), param.getStart(), param.getOffset(), param
					.isIsAscending());
		}else{
			 list = nwsession.openCanCreateProcDefList(userID, param
					.getOrderBy(), param.getStart(), param.getOffset(), param
					.isIsAscending());
		}
		if (procdefBuilder != null && !procdefBuilder.equals("")) {
			nwfilter.addFilter(NWFilter.P_BUILDER, NWFilter.OP_E,
					procdefBuilder, NWFilter.OP_AND);
		}
		if (procdefBuilderTime != null && !procdefBuilderTime.equals("")) {
		}
		
		if (list != null && list.size() > 0) {
			NWProcDef procDef = (NWProcDef) list.elementAt(0);
			String id = procDef.getID();
			String verName = procDef.getVersionName();
			procdefListform.setSelectedItem(id + "&v=" + verName);
		}
		return list;
	}
}