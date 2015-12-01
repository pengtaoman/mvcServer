package com.neusoft.uniflow.web.management.worktimemgt.actions;

import java.text.ParseException;
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
import com.neusoft.uniflow.util.NWTime;
import com.neusoft.uniflow.common.NWException;
import com.neusoft.uniflow.web.management.worktimemgt.forms.WorkperiodForm;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class EditWorktimePeriodAction extends Action {
	public static java.text.SimpleDateFormat dateF = new java.text.SimpleDateFormat(
			"yyyy-MM-dd HH:mm:ss");

	public boolean flag = true;

	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws NWException, ParseException {
		HttpSession session = request.getSession();
		WorkperiodForm btform = (WorkperiodForm) form;
		String action = btform.getAction();
		NWSession nwsession = WorkflowManager.getSysNWSession();
		int onTimehour = 0, onTimemin = 0, offTimehour = 0, offTimemin = 0;
		if ((btform.getStartTime() != null && !btform.getStartTime().equals(""))
				&& (btform.getEndTime() != null && !btform.getEndTime().equals(
						""))) {
			onTimehour = Integer.parseInt(btform.getStartTime().split(":")[0]);
			onTimemin = Integer.parseInt(btform.getStartTime().split(":")[1]);
			offTimehour = Integer.parseInt(btform.getEndTime().split(":")[0]);
			offTimemin = Integer.parseInt(btform.getEndTime().split(":")[1]);

		}
		// 设置上下班时间。
		NWTime onTime = new NWTime(onTimehour, onTimemin, 0);
		NWTime offTime = new NWTime(offTimehour, offTimemin, 0);
		String calendarId = btform.getCalendarId();
		String categoryId = btform.getCategoryId();
		String dayPartId = btform.getDaypartId();
		if (action.equalsIgnoreCase("ok"))// 修改作息period
		{
			NWCalendarManager calendarManager = null;
			try {
				calendarManager = nwsession.getCalendarManager();
			} catch (Exception e1) {
				e1.printStackTrace();
			}
			if (calendarId.equals("default")) {//组织机构默认的作息时间
				try {
					Vector dayparts = calendarManager
							.getDefaultDayParts(categoryId);
					int size = dayparts.size();
					for (int i = 0; i < size; i++) {
						NWDayPart daypart = (NWDayPart) dayparts.elementAt(i);
						if (daypart.getID().equals(dayPartId)) {
							try {
								daypart.setFromTime(onTime);
								daypart.setToTime(offTime);
								daypart.AddOrUpdate();
								request.setAttribute("begtime", onTime
										.toString());
								request.setAttribute("endtime", offTime
										.toString());
								request.setAttribute("close_flag", "close");
							} catch (NWException e) {
								session.setAttribute(SessionManager.ERROR,
										new UniException(e));
								return mapping.findForward("error");
							}
							break;
						}
					}
				} catch (Exception e) {
					session.setAttribute(SessionManager.ERROR,
							new UniException(e));
					return mapping.findForward("error");
				}
				return mapping.findForward("success");
			} else {
				/**
				 * 取得修改的工作日历，通过工作日历取得日程安排
				 */
				Vector calendars = calendarManager.getCalendars(categoryId);
				NWCalendar calendar = NWCalendarObjectFactory.createCalendar();
				int calendarLength = calendars.size();
				for (int i = 0; i < calendarLength; i++) {
					calendar = (NWCalendar) calendars.elementAt(i);
					if (calendarId.equals(calendar.getID())) {
						break;
					}
				}
				Vector dayparts = null;
				try {
					dayparts = calendarManager.getDayParts(calendar.getID());
				} catch (Exception e) {
					e.printStackTrace();
				}
				int size = dayparts.size();
				for (int i = 0; i < size; i++) {
					NWDayPart nwdaypart = (NWDayPart) dayparts.elementAt(i);
					if (nwdaypart.getID().equals(dayPartId)) {
						try {
							nwdaypart.setFromTime(onTime);
							nwdaypart.setToTime(offTime);
							nwdaypart.AddOrUpdate();
							request.setAttribute("begtime", onTime.toString());
							request.setAttribute("endtime", offTime.toString());
							request.setAttribute("close_flag", "close");
						} catch (NWException e) {
							session.setAttribute(SessionManager.ERROR,
									new UniException(e));
							return mapping.findForward("error");
						}
						break;

					}
				}
				return mapping.findForward("success");
			}
		} else
			return mapping.findForward("error");
	}
}