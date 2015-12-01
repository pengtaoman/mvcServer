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
import com.neusoft.uniflow.api.calendar.NWCalendar;
import com.neusoft.uniflow.api.calendar.NWCalendarManager;
import com.neusoft.uniflow.api.calendar.NWCalendarObjectFactory;
import com.neusoft.uniflow.api.calendar.NWDayPart;
import com.neusoft.uniflow.common.NWException;
import com.neusoft.uniflow.web.management.worktimemgt.beans.WorktimeBean;
import com.neusoft.uniflow.web.management.worktimemgt.forms.WorktimeForm;
import com.neusoft.uniflow.web.util.CustomHandler;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class WorktimePeriodListAction extends Action {
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		HttpSession session = request.getSession();
		WorktimeForm thisForm = (WorktimeForm) form;
		String action = thisForm.getAction();

		if (action != null && action.equals("delete")) { // 执行删除操作
			String dayPartId = thisForm.getSelectedItem().split("#")[0];// periodID
			String categoryId=thisForm.getSelectedItem().split("#")[1];//categoryid取得所属的组织机构
			String calendarId=thisForm.getCalendarId();//取得日程设置的id
			NWSession nwsession = WorkflowManager.getSysNWSession();
			NWCalendarManager calendarManager=nwsession.getCalendarManager();
			Vector calendars=calendarManager.getCalendars(categoryId);
			NWCalendar calendar=NWCalendarObjectFactory.createCalendar();
			int calendarcount=calendars.size();
			for(int i=0;i<calendarcount;i++){
				calendar=(NWCalendar)calendars.elementAt(i);
				if(calendar.getID().equals(calendarId)){
					break;
				}
			}
			//NWCalendar calendar=(NWCalendar)session.getAttribute("selectCalendar");
			if(calendar!=null){
				calendarManager.removeDayPart(dayPartId);
			}
			thisForm.setAction("");
		}
		Vector list = new Vector();
		try {
			list = openList(session, mapping, thisForm, request);
		} catch (NWException e) {
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
		String category=thisForm.getCategoryId();
		if(category==null||category.equals("")){
			
			category=request.getParameter("categoryId");
			thisForm.setCategoryId(category);
		}
		String calendarId=thisForm.getCalendarId();
		if(calendarId==null||calendarId.equals("")){
			calendarId=request.getParameter("calendarId");
			thisForm.setCalendarId(calendarId);
		}
		Vector calendars=calendarManager.getCalendars(category);
		NWCalendar calendar=NWCalendarObjectFactory.createCalendar();
		int calendarcount=calendars.size();
		for(int i=0;i<calendarcount;i++){
			calendar=(NWCalendar)calendars.elementAt(i);
			if(calendar.getID().equals(calendarId)){
				session.setAttribute("selectCalendar", calendar);
				break;
			}
		}
		Vector list = new Vector();
		Vector dayparts=calendarManager.getDayParts(calendar.getID());
		int daypartsCount=dayparts.size();
		if(daypartsCount==0){
			request.setAttribute("schedulID", calendarId);
		}
		else request.setAttribute("schedulID","NO");
		for (int j = 0; j < daypartsCount; j++) {
			list.add(new WorktimeBean((NWDayPart) dayparts.elementAt(j)));
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
			if (((WorktimeBean) list.elementAt(0)).getDaypartId() == null
					|| ((WorktimeBean) list.elementAt(0)).getDaypartId().equals(
							"")) {
				thisForm.setSelectedItem("#"
						+ ((WorktimeBean) list.elementAt(0)).getCategory());
			} else
				thisForm.setSelectedItem(((WorktimeBean) list.elementAt(0))
						.getDaypartId()
						+ "#"
						+ ((WorktimeBean) list.elementAt(0)).getCategory());

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