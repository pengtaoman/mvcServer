package com.neusoft.uniflow.web.participant.actions;

/**
 * <p>Title: uniflow 3.5 web client</p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) 2003</p>
 * <p>Company: neusoft</p>
 * @author wangwb
 * @version 1.0
 */
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
import com.neusoft.uniflow.common.NWException;
import com.neusoft.uniflow.web.common.list.OpenListForm;
import com.neusoft.uniflow.web.common.list.OpenListParamBean;
import com.neusoft.uniflow.web.util.CustomHandler;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class ProcListAction extends Action {
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) {
		OpenListForm openListForm = (OpenListForm) form;
		HttpSession session = request.getSession();
		final String userID = (String) session
				.getAttribute(SessionManager.BIZ_USERID);
		NWSession nwsession = WorkflowManager.getNWSession();
		int countOfPage = openListForm.getCountOfPage();
		if (countOfPage == 0) {
			String custom = (String) session
					.getAttribute(SessionManager.CUSTOMATION);
			String strNumber = CustomHandler.getElements(
					CustomHandler.PREFERENCE_NUMBER, custom);
			countOfPage = Integer.valueOf(strNumber).intValue();
		}
		int pagesCount;
		try {
			int itemsCount = nwsession.getProcDefNum(0);
			openListForm.setTotal(itemsCount);
			if (itemsCount <= 2) {
				pagesCount = 1;
			} else {
				if (itemsCount % countOfPage == 0) {
					pagesCount = itemsCount / countOfPage;
				} else {
					pagesCount = itemsCount / countOfPage + 1;
				}
			}
		} catch (Exception e) {
			session.setAttribute(SessionManager.ERROR, new UniException(e));
			return mapping.findForward("error");
		}
		int requestPage = openListForm.getRequestPage();
		if (requestPage > pagesCount) {
			requestPage = pagesCount;
		}

		int startLocation = (requestPage - 1) * countOfPage + 1;
		try {
			Vector list = openList(userID, nwsession, mapping, form,
					new OpenListParamBean(openListForm.getOrderBy(),
							openListForm.isAscending(), startLocation,
							countOfPage));
			openListForm.setCountOfPage(countOfPage);
			openListForm.setCurrentPage(requestPage);
			openListForm.setRequestPage(requestPage);
			openListForm.setPagesCount(pagesCount);
			openListForm.setList(list);
		} catch (Exception e) {
			session.setAttribute(SessionManager.ERROR, new UniException(e));
			return mapping.findForward("error");
		}
		if ("request".equals(mapping.getScope()))
			request.setAttribute(mapping.getAttribute(), openListForm);
		else
			session.setAttribute(mapping.getAttribute(), openListForm);
		return mapping.findForward("success");
	}

	public Vector openList(String userID, NWSession nwsession,
			ActionMapping mapping, ActionForm form, OpenListParamBean param)
			throws NWException {
		Vector list = nwsession.openProcDefList(userID, 0, param.getOrderBy(),
				param.getStart(), param.getOffset(), param.isIsAscending());

		if (list.size() > 0) {
			String id = ((NWProcDef) list.elementAt(0)).getID();
			String verName = ((NWProcDef) list.elementAt(0)).getVersionName();
			((OpenListForm) form).setSelectedItem(id + "#" + verName);
		}
		return list;
	}
}
