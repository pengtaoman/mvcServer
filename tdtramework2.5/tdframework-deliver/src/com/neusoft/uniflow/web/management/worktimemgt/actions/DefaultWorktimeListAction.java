package com.neusoft.uniflow.web.management.worktimemgt.actions;

import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.calendar.NWCalendarManager;
import com.neusoft.uniflow.api.calendar.NWDayPart;
import com.neusoft.uniflow.common.NWException;
import com.neusoft.uniflow.web.management.worktimemgt.beans.WorktimeBean;
import com.neusoft.uniflow.web.management.worktimemgt.forms.WorktimeForm;
import com.neusoft.uniflow.web.util.CustomHandler;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class DefaultWorktimeListAction extends Action {
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws NWException {
		HttpSession session = request.getSession();
		NWSession nwsession = WorkflowManager.getSysNWSession();
		NWCalendarManager calendarManager=null;
		try {
			calendarManager=nwsession.getCalendarManager();
		} catch (Exception e1) {
			e1.printStackTrace();
		}
		WorktimeForm thisForm = (WorktimeForm) form;
		String categoryId=thisForm.getCategoryId();
		if(categoryId==null||categoryId.equals("")){
			categoryId=request.getParameter("categoryId");
			thisForm.setCategoryId(categoryId);
		}
		String action = thisForm.getAction();

		if (action != null && action.equals("delete")) { // 执行删除操作
			String daypartId = thisForm.getSelectedItem().split("#")[0];
			try {
				calendarManager.removeDayPart(daypartId);
			} catch (Exception e) {
				e.printStackTrace();
			}
			thisForm.setAction("");
		}
		Vector list = new Vector();
		try {
			list = openList(session, mapping, thisForm, request);
		} catch (Exception e) {
			session.setAttribute(SessionManager.ERROR, new UniException(e));
			return mapping.findForward("error");
		}

		thisForm.setList(list);
		return mapping.findForward("success");
	}

	private Vector openList(HttpSession session, ActionMapping mapping,
			WorktimeForm thisForm, HttpServletRequest request)
			throws Exception {
		NWSession nwsession = WorkflowManager.getSysNWSession();
		NWCalendarManager calendarManager=nwsession.getCalendarManager();
		String category=request.getParameter("categoryId");
		Vector worktimePeriodList = calendarManager.getDefaultDayParts(category);
		Vector list = new Vector();
		int worktimePeriodLength=worktimePeriodList.size();
		for (int j = 0; j < worktimePeriodLength; j++) {
			list.add(new WorktimeBean((NWDayPart) worktimePeriodList.elementAt(j)));
		}

		int countOfPage = thisForm.getCountOfPage();
		if (countOfPage == 0) { // read from session
			String custom = (String) session
					.getAttribute(SessionManager.CUSTOMATION);
			String strNumber = CustomHandler.getElements(
					CustomHandler.PREFERENCE_NUMBER, custom);
			countOfPage = Integer.valueOf(strNumber).intValue();
		}
		int pagesCount;
		int itemsCount = list.size();

		if (itemsCount % countOfPage == 0) {
			pagesCount = itemsCount / countOfPage;
		} else {
			pagesCount = itemsCount / countOfPage + 1;
		}
		int requestPage = thisForm.getRequestPage();
		thisForm.setCountOfPage(countOfPage);
		thisForm.setCurrentPage(requestPage);
		thisForm.setRequestPage(requestPage);
		thisForm.setTotal(itemsCount);

		if (pagesCount <= 0) {
			pagesCount = 1;
		}
		thisForm.setPagesCount(pagesCount);
		if (list != null && list.size() > 0) {
			list = orderlist(list, thisForm, request);
		}

		if (list.size() > 0) {
				thisForm.setSelectedItem(
						((WorktimeBean) list.elementAt(0)).getDaypartId()+"#"+((WorktimeBean) list.elementAt(0)).getCategory());

		}
		return list;
	}

	private Vector orderlist(Vector list, WorktimeForm thisForm,
			HttpServletRequest request) throws NWException {
		Vector lists = new Vector();

		if (thisForm.getOrderBy().equals("starttime")) {
			Vector vTemp = new Vector();
			vTemp.add(0, list.elementAt(0));
			if (thisForm.getAscending()) {
				for (int i = 0; i < list.size(); i++) {
					for (int j = i + 1; j < list.size(); j++) {
						NWDayPart nmwkp1 = (NWDayPart) list.elementAt(i);
						NWDayPart nmwkp2 = (NWDayPart) list.elementAt(j);
						if (nmwkp1.before(nmwkp2))

						{
							vTemp.setElementAt(list.get(j), 0);
							list.setElementAt(list.get(i), j);
							list.setElementAt(vTemp.get(0), i);
						}

					}
				}
			} else {
				for (int i = 0; i < list.size(); i++) {
					for (int j = i + 1; j < list.size(); j++) {
						NWDayPart nmwkp1 = (NWDayPart) list.elementAt(i);
						NWDayPart nmwkp2 = (NWDayPart) list.elementAt(j);
						if (nmwkp1.after(nmwkp2)) {
							vTemp.setElementAt(list.get(j), 0);
							list.setElementAt(list.get(i), j);
							list.setElementAt(vTemp.get(0), i);
						}

					}
				}

			}

		}
		if (thisForm.getOrderBy().equals("endtime")) {
			Vector vTemp = new Vector();
			vTemp.add(0, list.elementAt(0));
			if (thisForm.getAscending()) {
				for (int i = 0; i < list.size(); i++) {
					for (int j = i + 1; j < list.size(); j++) {
						NWDayPart nmwkp1 = (NWDayPart) list.elementAt(i);
						NWDayPart nmwkp2 = (NWDayPart) list.elementAt(j);
						if (nmwkp1.before(nmwkp2))

						{
							vTemp.setElementAt(list.get(j), 0);
							list.setElementAt(list.get(i), j);
							list.setElementAt(vTemp.get(0), i);
						}

					}
				}
			} else {
				for (int i = 0; i < list.size(); i++) {
					for (int j = i + 1; j < list.size(); j++) {
						NWDayPart nmwkp1 = (NWDayPart) list.elementAt(i);
						NWDayPart nmwkp2 = (NWDayPart) list.elementAt(j);
						if (nmwkp1.after(nmwkp2)) {
							vTemp.setElementAt(list.get(j), 0);
							list.setElementAt(list.get(i), j);
							list.setElementAt(vTemp.get(0), i);
						}

					}
				}

			}

		}
		int curPage = thisForm.getCurrentPage(); // 当前页
		int countOfPage = thisForm.getCountOfPage();
		int countsOfPage = thisForm.getPagesCount();
		int k = 0;
		if (curPage < countsOfPage) {
			for (int i = (curPage - 1) * countOfPage; i < curPage * countOfPage; i++) {
				lists.add(k++, list.elementAt(i));
			}
		} else {
			for (int i = (curPage - 1) * countOfPage; i < list.size(); i++) {
				lists.add(k++, list.elementAt(i));
			}
		}

		list.clear();

		return lists;
	}
}