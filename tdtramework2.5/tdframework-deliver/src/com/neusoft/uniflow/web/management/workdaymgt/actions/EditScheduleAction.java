package com.neusoft.uniflow.web.management.workdaymgt.actions;

import java.util.ArrayList;
import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionErrors;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.util.LabelValueBean;

import com.neusoft.org.NWUnit;
import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.calendar.NWCalendar;
import com.neusoft.uniflow.api.calendar.NWCalendarManager;
import com.neusoft.uniflow.common.NWException;
import com.neusoft.uniflow.util.NWDate;
import com.neusoft.uniflow.web.management.workdaymgt.forms.FreedayForm;
import com.neusoft.uniflow.web.util.CommonInfoManager;
import com.neusoft.uniflow.web.util.MessageUtil;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class EditScheduleAction extends Action {
	private static java.text.SimpleDateFormat dateF = new java.text.SimpleDateFormat(
			"yyyy-MM-dd");

	public boolean flag = true;

	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws NWException {
		HttpSession session = request.getSession();
		NWSession nwsession = WorkflowManager.getSysNWSession();
		FreedayForm btform = (FreedayForm) form;
		//String itemID = btform.getSelectedId(); // get the freedayitem id
		NWCalendarManager calendarManager=null;
		try {
			calendarManager = nwsession.getCalendarManager();
		} catch (Exception e1) {
			e1.printStackTrace();
		}
		// 如果页面传过来的操作是修改
		if (btform.getAction().equals("modify")) { // 点击html:radio in SCHEDULE
			// PAGE
			String selectedId = request.getParameter("id");
			String category = request.getParameter("categoryid");// 日历分类id
			Vector calendars = calendarManager.getCalendars(category);
			for (int i = 0; i < calendars.size(); i++) {// 循环
				NWCalendar calendar = (NWCalendar) calendars.elementAt(i);
				if (calendar.getID().equals(selectedId)) {
					//session.setAttribute("bemodifycalendar", calendar);// 将查找到的calendar放到session中保存，避免修改完提交的时候再次循环查找
					btform.setSelectedId(selectedId);
					btform.setCategory(calendar.getCategory());
					btform.setSelectedItem(calendar.isHoliday() ? "1" : "0");
					String startTime = dateF.format(calendar.getFromDate().getDate());
					btform.setStartTime(startTime);
					btform.setStartTime_show(startTime);
					String endTime = dateF.format(calendar.getToDate().getDate());
					btform.setEndTime(endTime);
					btform.setEndTime_show(endTime);
					NWUnit nwunit;
					try {
						nwunit = WorkflowManager.getNWOrg().getUnit(
								calendar.getCategory());
						if (nwunit != null) {
							btform.setOrgunit(nwunit.getName());
							btform.setOrgunitId(calendar.getCategory());
						} else {
							btform.setOrgunit(calendar.getCategory());
							btform.setOrgunitId(calendar.getCategory());
						}
					} catch (Exception e) {
						e.printStackTrace();
					}

					switch (calendar.getType()) {
					case NWCalendar.TYPE_DAY:
						return mapping.findForward("between");
					case NWCalendar.TYPE_MONTH_DAY:
						ArrayList arrayDate = new ArrayList();
						String dayunit = MessageUtil.getString(
								"workflow.schedule.allmonthday", request
										.getSession());
						String[] days = dayunit.split(",");
						for (int j = 0; j < days.length; j++) {
							arrayDate.add(new LabelValueBean(days[j], String
									.valueOf(j + 1)));
						}
						request.setAttribute("allDate", arrayDate);
//						btform.setSelDate(String
//								.valueOf(calendar.getMonthDay()));
						return mapping.findForward("month");
					case NWCalendar.TYPE_WEEK_DAY:
						arrayDate = new ArrayList();
						String allweek = MessageUtil.getString(
								"workflow.schedule.allweekday", request
										.getSession());
						String[] weeks = allweek.split(",");
						for (int k = 0; k < weeks.length; k++) {
							arrayDate.add(new LabelValueBean(weeks[k], String
									.valueOf(k + 1)));
						}
						request.setAttribute("allWeek", arrayDate);
						btform
								.setSelDate(String.valueOf(calendar
										.getWeekDay()));
						return mapping.findForward("week");
					default:
						return mapping.findForward("error");
					}
				}
			}
		} else {// 提交修改后的内容
			if (btform.getAction().indexOf("OK") > 0
					&& CommonInfoManager.str2EndDate(btform.getEndTime())
							.before(
									CommonInfoManager.str2StartDate(btform
											.getStartTime()))) { // 判断是否开始日期小于结束日期
				ActionErrors errors = new ActionErrors();
				// errors.add("invalid_time",new
				// ActionError("errors.perference.agent.time.invalid"));
				if (!errors.isEmpty()) {
					// saveErrors(request, errors);
					String strDate = btform.getStartTime();
					int loc = strDate.indexOf(" ");
					if (loc > 0) {
						strDate = strDate.substring(0, loc);
					}
					btform.setStartTime_show(strDate);
					strDate = btform.getEndTime();
					loc = strDate.indexOf(" ");
					if (loc > 0) {
						strDate = strDate.substring(0, loc);
					}
					btform.setEndTime_show(strDate);
					if (btform.getAction().equals("BETWEENOK")) {
						return mapping.findForward("between");
					}
					if (btform.getAction().equals("MONTHOK")) {
						ArrayList arrayDate = new ArrayList();
						String dayunit = MessageUtil.getString(
								"workflow.schedule.allmonthday", request
										.getSession());
						String[] days = dayunit.split(",");
						for (int j = 0; j < days.length; j++) {
							arrayDate.add(new LabelValueBean(days[j], String
									.valueOf(j + 1)));
						}
						request.setAttribute("allDate", arrayDate);

						return mapping.findForward("month");
					}
					if (btform.getAction().equals("WEEKOK")) {
						ArrayList arrayDate = new ArrayList();
						String allweek = MessageUtil.getString(
								"workflow.schedule.allweekday", request
										.getSession());
						String[] weeks = allweek.split(",");
						for (int k = 0; k < weeks.length; k++) {
							arrayDate.add(new LabelValueBean(weeks[k], String
									.valueOf(k + 1)));
						}
						request.setAttribute("allWeek", arrayDate);

						return mapping.findForward("week");
					}

				}
			}
			String selectedId=btform.getSelectedId();
			String category=btform.getCategory();
			Vector calendars = calendarManager.getCalendars(category);
			int calendarssize=calendars.size();
			NWCalendar calendar=null;
			for(int i=0;i<calendarssize;i++){
				calendar=(NWCalendar)calendars.elementAt(i);
				if(selectedId.equals(calendar.getID())){
					break;
				}
			}
			if (btform.getAction().equals("BETWEENOK")) {
				try {
					if (calendar != null) {
						calendar.setHoliday(btform.getSelectedItem()
								.equals("1") ? true : false);
						calendar.setFromDate(new NWDate(CommonInfoManager
								.str2StartDate(btform.getStartTime())));
						calendar.setToDate(new NWDate(CommonInfoManager
								.str2EndDate(btform.getEndTime())));
						calendar.update();
					} else {
						throw new Exception();
					}
				} catch (Exception e) {
					session.setAttribute(SessionManager.ERROR,
							new UniException(e));
					return mapping.findForward("error");
				}
				request.setAttribute("close_flag", "close");
				return mapping.findForward("between");
			}
			if (btform.getAction().equals("MONTHOK")) {
				try {
					if (calendar != null) {
						calendar.setHoliday(btform.getSelectedItem()
								.equals("1") ? true : false);
						calendar.setFromDate(new NWDate(CommonInfoManager
								.str2StartDate(btform.getStartTime())));
						calendar.setToDate(new NWDate(CommonInfoManager
								.str2EndDate(btform.getEndTime())));
					}
					calendar.update();
				} catch (Exception e) {
					session.setAttribute(SessionManager.ERROR,
							new UniException(e));
					return mapping.findForward("error");
				}
				request.setAttribute("close_flag", "close");
				return mapping.findForward("between");
			}
			if (btform.getAction().equals("WEEKOK")) {
				try {
					if (calendar != null) {
						calendar.setHoliday(btform.getSelectedItem()
								.equals("1") ? true : false);
						calendar.setFromDate(new NWDate(CommonInfoManager
								.str2StartDate(btform.getStartTime())));
						calendar.setToDate(new NWDate(CommonInfoManager
								.str2EndDate(btform.getEndTime())));
						calendar.setWeekDay((short) Integer.parseInt(btform
								.getSelDate()));
						calendar.update();
					} else {
						throw new Exception();
					}
				} catch (Exception e) {
					session.setAttribute(SessionManager.ERROR,
							new UniException(e));
					return mapping.findForward("error");
				}

				request.setAttribute("close_flag", "close");
				return mapping.findForward("between");
			}
		}
			/** @todo: complete the business logic here, this is just a skeleton. */
			return mapping.findForward("error");
		
	}

	public void updateCalendar(NWCalendar calendar, FreedayForm form) {
		if (calendar != null) {
			calendar.setHoliday(form.getSelectedItem().equals("1") ? true
					: false);
			calendar.setFromDate(new NWDate(CommonInfoManager
					.str2StartDate(form.getStartTime())));
			calendar.setToDate(new NWDate(CommonInfoManager.str2EndDate(form
					.getEndTime())));

		}
	}
}