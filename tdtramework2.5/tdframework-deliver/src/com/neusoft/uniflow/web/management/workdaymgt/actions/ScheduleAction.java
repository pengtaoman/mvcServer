package com.neusoft.uniflow.web.management.workdaymgt.actions;

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
import com.neusoft.uniflow.common.NWException;
import com.neusoft.uniflow.web.management.workdaymgt.beans.NWCalendarBean;
import com.neusoft.uniflow.web.management.workdaymgt.forms.ScheduleForm;
import com.neusoft.uniflow.web.util.CustomHandler;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.WorkflowManager;
/**
 * 
 * @author husy
 *modify husy at 2008.03.10
 *
 */
public class ScheduleAction extends Action {
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws NWException {
		HttpSession session = request.getSession();
		NWSession nwsession=WorkflowManager.getNWSession();
		ScheduleForm thisForm = (ScheduleForm) form;
		String selectedId=thisForm.getWorkdaycategoryId();
		if(selectedId==null||selectedId.equals("")){
			selectedId=request.getParameter("workdaycategoryId");
			thisForm.setWorkdaycategoryId(selectedId);
		}
		String action = thisForm.getAction();
		if (action != null && action.equals("delete")) { // 执行删除操作
			try {
				NWCalendarManager calendarManager=nwsession.getCalendarManager();
				String id=thisForm.getSelectedItem().split("#")[0];
				calendarManager.removeCalendar(id);
				thisForm.setAction("");
			} catch (Exception e) {
				e.printStackTrace();
			}
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
	/**
	 * modify by hushiyuan
	 * at 2008.03.09
	 * get the workday categoryList in the new model of the workCalendar
	 */
	private Vector openList(HttpSession session, ActionMapping mapping,
			ScheduleForm thisForm, HttpServletRequest request)
			throws Exception {
		NWSession nwsession = WorkflowManager.getSysNWSession();
		NWCalendarManager calendarManager=nwsession.getCalendarManager();
		String selectedId=thisForm.getWorkdaycategoryId();
		if(selectedId==null||selectedId.equals("")){
			selectedId=request.getParameter("workdaycategoryId");
			thisForm.setWorkdaycategoryId(selectedId);
		}
		Vector list = calendarManager.getCalendars(selectedId);
		Vector nwcalendarbeanList=new Vector();
		int itemsCount = list.size();
		for(int i=0;i<itemsCount;i++){
			NWCalendarBean nwcalendarbean=new NWCalendarBean();
			NWCalendar nwCalendar=(NWCalendar)list.elementAt(i);
			nwcalendarbean.setId(nwCalendar.getID());
			nwcalendarbean.setCategory(nwCalendar.getCategory());
			nwcalendarbean.setFromDate(nwCalendar.getFromDate());
			nwcalendarbean.setToDate(nwCalendar.getToDate());
			nwcalendarbean.setWeekDay(nwCalendar.getWeekDay());
			nwcalendarbean.setHoliday(nwCalendar.isHoliday());
			nwcalendarbean.setType(nwCalendar.getType());
			nwcalendarbeanList.addElement(nwcalendarbean);
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

		if (itemsCount % countOfPage == 0) {
			pagesCount = itemsCount / countOfPage;
		} else {
			pagesCount = itemsCount / countOfPage + 1;
		}
		int requestPage = thisForm.getRequestPage();
		thisForm.setCountOfPage(countOfPage);

		thisForm.setCurrentPage(requestPage);

		thisForm.setRequestPage(requestPage);

		thisForm.setTotal(itemsCount); // add by liwei 2004.12.20 for pages;
		if (pagesCount <= 0) {
			pagesCount = 1;
		}
		thisForm.setPagesCount(pagesCount);
		if (list != null && list.size() > 0) {
			nwcalendarbeanList = orderlist(nwcalendarbeanList, thisForm, request);
		}

		if (list.size() > 0) {
			thisForm.setSelectedItem(((NWCalendarBean) nwcalendarbeanList.elementAt(0)).getId()+"#"+((NWCalendarBean) nwcalendarbeanList.elementAt(0)).getCategory());
		}
		return nwcalendarbeanList;
	}
	
	private Vector orderlist(Vector list, ScheduleForm thisForm,
			HttpServletRequest request) throws NWException {
		Vector lists = new Vector();
		if (thisForm.getOrderBy().equals("type")) {
			Vector vTemp = new Vector();
			vTemp.add(0, list.elementAt(0));
			if (thisForm.getAscending()) {
				for (int i = 0; i < list.size(); i++) {
					for (int j = i + 1; j < list.size(); j++) {
						if ((((NWCalendarBean) list.elementAt(i)).getType() > ((NWCalendarBean) list
								.elementAt(j)).getType())) {
							vTemp.setElementAt(list.get(j), 0);
							list.setElementAt(list.get(i), j);
							list.setElementAt(vTemp.get(0), i);
						}

					}
				}
			} else {
				for (int i = 0; i < list.size(); i++) {
					for (int j = i + 1; j < list.size(); j++) {
						if (((NWCalendarBean) list.elementAt(i)).getType() < ((NWCalendarBean) list
								.elementAt(j)).getType()) {
							vTemp.setElementAt(list.get(j), 0);
							list.setElementAt(list.get(i), j);
							list.setElementAt(vTemp.get(0), i);
						}

					}
				}

			}

		}
		if (thisForm.getOrderBy().equals("state")) {
			Vector vTemp = new Vector();
			vTemp.add(0, list.elementAt(0));
			if (thisForm.getAscending()) {
				for (int i = 0; i < list.size(); i++) {
					for (int j = i + 1; j < list.size(); j++) {
						if (((NWCalendarBean) list.elementAt(i)).getFromDate().after(((NWCalendarBean) list.elementAt(j))
								.getFromDate())) {
							vTemp.setElementAt(list.get(j), 0);
							list.setElementAt(list.get(i), j);
							list.setElementAt(vTemp.get(0), i);
						}

					}
				}
			} else {
				for (int i = 0; i < list.size(); i++) {
					for (int j = i + 1; j < list.size(); j++) {
						if (((NWCalendarBean) list.elementAt(i)).getFromDate()
								.before(((NWCalendarBean) list.elementAt(j))
										.getFromDate())) {
							vTemp.setElementAt(list.get(j), 0);
							list.setElementAt(list.get(i), j);
							list.setElementAt(vTemp.get(0), i);
						}

					}
				}

			}

		}
		if (thisForm.getOrderBy().equals("starttime")) {
			Vector vTemp = new Vector();
			vTemp.add(0, list.elementAt(0));
			if (thisForm.getAscending()) {
				for (int i = 0; i < list.size(); i++) {
					for (int j = i + 1; j < list.size(); j++) {
						if (((NWCalendarBean) list.elementAt(i)).getFromDate()
								.after(((NWCalendarBean) list.elementAt(j))
										.getFromDate())) {
							vTemp.setElementAt(list.get(j), 0);
							list.setElementAt(list.get(i), j);
							list.setElementAt(vTemp.get(0), i);
						}

					}
				}
			} else {
				for (int i = 0; i < list.size(); i++) {
					for (int j = i + 1; j < list.size(); j++) {
						if (((NWCalendarBean) list.elementAt(i)).getFromDate()
								.before(((NWCalendarBean) list.elementAt(j))
										.getFromDate())) {
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
						if (((NWCalendarBean) list.elementAt(i)).getToDate()
								.after(((NWCalendarBean) list.elementAt(j))
										.getToDate())) {
							vTemp.setElementAt(list.get(j), 0);
							list.setElementAt(list.get(i), j);
							list.setElementAt(vTemp.get(0), i);
						}

					}
				}
			} else {
				for (int i = 0; i < list.size(); i++) {
					for (int j = i + 1; j < list.size(); j++) {
						if (((NWCalendarBean) list.elementAt(i)).getToDate()
								.before(((NWCalendarBean) list.elementAt(j))
										.getToDate())) {
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