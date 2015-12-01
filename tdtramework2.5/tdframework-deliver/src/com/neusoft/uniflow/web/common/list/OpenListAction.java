package com.neusoft.uniflow.web.common.list;

import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.web.util.CustomHandler;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.WorkflowManager;

public abstract class OpenListAction extends Action
{
	public final static int DISPLAY_MARGIN = 2;
	public ActionForward execute(ActionMapping mapping,
					     ActionForm form,
					     HttpServletRequest request,
					     HttpServletResponse response)

	{
		OpenListForm openListForm = (OpenListForm) form;
		HttpSession session = request.getSession();
		String userID = (String)session.getAttribute(SessionManager.BIZ_USERID);
		try {
			this.handleRequest(userID,mapping, openListForm, request, response);
		}
		catch (Exception e) {
			session.setAttribute(SessionManager.ERROR, new UniException(e));
			return mapping.findForward("error");
		}
		NWSession nwsession = WorkflowManager.getNWSession();
		int countOfPage = openListForm.getCountOfPage();
		if (countOfPage == 0) { //read from session
			String custom = (String) session.getAttribute(SessionManager.
			    CUSTOMATION);
			String strNumber = CustomHandler.getElements(CustomHandler.
			    PREFERENCE_NUMBER, custom);
			countOfPage = Integer.valueOf(strNumber).intValue();
			//System.out.println("-----------"+countOfPage);
		}
		int pagesCount;
		try {
			int itemsCount = this.getItemsCount(userID,nwsession, mapping, form);
		    openListForm.setTotal(itemsCount);
			if (itemsCount <= DISPLAY_MARGIN) {
				pagesCount = 1;
			}
			else {
				if (itemsCount % countOfPage == 0) {
				pagesCount = itemsCount/countOfPage;
				}else{
					pagesCount = itemsCount/countOfPage + 1;
				}
			}
		}catch (Exception e) {
			session.setAttribute(SessionManager.ERROR, new UniException(e));
			return mapping.findForward("error");
		}
		int requestPage = openListForm.getRequestPage();
		if(requestPage>pagesCount) {
			requestPage = pagesCount;
		}

		int startLocation = (requestPage - 1) *
		    countOfPage + 1; //first one's NO is 1

		try {
			Vector list = openList(userID,nwsession, mapping, form,
					new OpenListParamBean(openListForm.getOrderBy(),
							openListForm.isAscending(),startLocation, countOfPage));
			openListForm.setCountOfPage(countOfPage);
			openListForm.setCurrentPage(requestPage);
			openListForm.setRequestPage(requestPage);
			openListForm.setPagesCount(pagesCount);
			openListForm.setList(list);
		}
		catch (Exception e) {
			session.setAttribute(SessionManager.ERROR, new UniException(e));
			return mapping.findForward("error");
		}
		if ("request".equals(mapping.getScope()))
			request.setAttribute(mapping.getAttribute(), openListForm);
		else
			session.setAttribute(mapping.getAttribute(), openListForm);
		return findForward(mapping, form);
	}

	public void handleRequest(String userID,ActionMapping mapping,
					  ActionForm form,
					  HttpServletRequest request,
					  HttpServletResponse response
					  ) throws Exception
	{}

	public ActionForward findForward(ActionMapping mapping, ActionForm form)
	{
		return mapping.findForward("success");
	}

	public abstract int getItemsCount(String userID,NWSession nwsession,
						    ActionMapping mapping,
						    ActionForm form) throws Exception;

	public abstract Vector openList(String userID,NWSession nwsession,
						  ActionMapping mapping,
						  ActionForm form, OpenListParamBean param) throws
	    Exception;
}