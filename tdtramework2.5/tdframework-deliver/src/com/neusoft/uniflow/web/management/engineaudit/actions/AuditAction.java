package com.neusoft.uniflow.web.management.engineaudit.actions;

/**
 * @author TianJun
 */

import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;

import com.neusoft.org.NWOrg;
import com.neusoft.uniflow.api.NWFilter;
import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.stat.NWAuditMessage;
import com.neusoft.uniflow.api.stat.NWStatMgr;
import com.neusoft.uniflow.common.NWException;
import com.neusoft.uniflow.util.Util;
import com.neusoft.uniflow.web.common.list.OpenListParamBean;
import com.neusoft.uniflow.web.common.list.OpenListAction;
import com.neusoft.uniflow.web.management.engineaudit.forms.AuditForm;
import com.neusoft.uniflow.web.util.CommonInfoManager;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class AuditAction extends OpenListAction {
	public void handleRequest(String userID, ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws NWException {

		Vector orglist = new Vector();
		NWOrg org = WorkflowManager.getNWOrg();
		try {
			orglist = org.openPersonList();

		} catch (Exception e) {
			System.out.println("Cannot find person list!");
		}
		request.setAttribute("orglist", orglist);
	}

	public int getItemsCount(String userID, NWSession nwsession,
			ActionMapping mapping, ActionForm form) throws NWException {
		int count = 0;
		NWStatMgr mgr = nwsession.newStatMgrInstance();
		AuditForm auditForm = (AuditForm) form;
		NWFilter filter = new NWFilter();
		NWOrg org = WorkflowManager.getNWOrg();
		// 按照时间查询，确定开始时间
		if (auditForm.isSflag() == true) {
			filter.addFilter(NWFilter.Log_eventTime, NWFilter.OP_GE, Util
					.format(CommonInfoManager.str2StartDate(auditForm
							.getStartTime())), NWFilter.OP_AND);
		}
		// 确定结束时间
		if (auditForm.isEflag() == true) {
			filter.addFilter(NWFilter.Log_eventTime, NWFilter.OP_LE, Util
					.format(CommonInfoManager.str2EndDate(auditForm
							.getEndTime())), NWFilter.OP_AND);

		}
		String personID = "";
		if (!auditForm.getPersonID().equals("")) {
			if (auditForm.getPersonID().equals("All")) {
				personID = "All";
			} else {
				try {
					personID = (org.getPersonByAccount(auditForm.getPersonID()))
							.getID();
				} catch (Exception e) {
					System.out.println("Cannot find the person!");
				}
			}
		}
		if (personID.equals("All")) {
			count = mgr.auditAllUserMesNum(filter);
		} else {
			count = mgr.auditUserMesNum(personID, filter);
		}
		return count;
	}

	public Vector openList(String userID, NWSession nwsession,
			ActionMapping mapping, ActionForm form, OpenListParamBean param)
			throws NWException {
		AuditForm auditForm = (AuditForm) form;
		Vector list = new Vector();
		NWStatMgr mgr = nwsession.newStatMgrInstance();
		NWFilter filter = new NWFilter();
		NWOrg org = WorkflowManager.getNWOrg();
		// 按照时间查询，确定开始时间
		if (auditForm.isSflag() == true) {
			filter.addFilter(NWFilter.Log_eventTime, NWFilter.OP_GE, Util
					.format(CommonInfoManager.str2StartDate(auditForm
							.getStartTime())), NWFilter.OP_AND);
			
		}
		// 确定结束时间
		if (auditForm.isEflag() == true) {
			filter.addFilter(NWFilter.Log_eventTime, NWFilter.OP_LE, Util
					.format(CommonInfoManager.str2EndDate(auditForm
							.getEndTime())), NWFilter.OP_AND);

		}
		String personID = "";
		if (!auditForm.getPersonID().equals("")) {
			if (auditForm.getPersonID().equals("All")) {
				personID = "All";
			} else {
				try {
					personID = (org.getPersonByAccount(auditForm.getPersonID()))
							.getID();
				} catch (Exception e) {
					System.out.println("Cannot find the person!");
				}
			}
		}
		filter.setPageInfo(param.getOrderBy(), param.isIsAscending(), param
				.getStart(), param.getOffset());
		if (personID.equals("All")) {
			list = mgr.auditAllUserMessage(filter);
		} else {
			list = mgr.auditMessage(personID, filter);
		}

		if (list.size() > 0) {
			auditForm.setSelectedItem(((NWAuditMessage) list.elementAt(0))
					.getMessageID());
		} 
		return list;

	}

}