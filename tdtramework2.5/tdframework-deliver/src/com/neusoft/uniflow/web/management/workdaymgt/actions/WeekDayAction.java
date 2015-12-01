package com.neusoft.uniflow.web.management.workdaymgt.actions;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionErrors;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.util.LabelValueBean;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.calendar.NWCalendar;
import com.neusoft.uniflow.api.calendar.NWCalendarManager;
import com.neusoft.uniflow.api.calendar.NWCalendarObjectFactory;
import com.neusoft.uniflow.util.NWDate;
import com.neusoft.uniflow.web.management.workdaymgt.forms.FreedayForm;
import com.neusoft.uniflow.web.util.CommonInfoManager;
import com.neusoft.uniflow.web.util.MessageUtil;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class WeekDayAction extends Action {
	public static java.text.SimpleDateFormat dateF = new java.text.SimpleDateFormat(
			"yyyy-MM-dd HH:mm:ss");

	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		HttpSession session = request.getSession();
		NWSession nwsession = WorkflowManager.getSysNWSession();
		FreedayForm wdActForm = (FreedayForm) form;
		if (wdActForm.getAction().equals("betweenday")) {
			wdActForm.setStartTime("");
			wdActForm.setEndTime("");
			return mapping.findForward("between");
		}
		if (wdActForm.getAction().equals("monthday")) {
			ArrayList arrayDate = new ArrayList();
			String dayunit = MessageUtil.getString(
					"workflow.schedule.allmonthday", request.getSession());
			String[] days = dayunit.split(",");
			for (int i = 0; i < days.length; i++) {
				arrayDate.add(new LabelValueBean(days[i], String.valueOf(i + 1)));
			}
			request.setAttribute("allDate", arrayDate);
			wdActForm.setStartTime("");
			wdActForm.setEndTime("");
			return mapping.findForward("month");
		}

		if (wdActForm.getAction().equals("OK")) {

			if (CommonInfoManager.str2EndDate(wdActForm.getEndTime()).before(
					CommonInfoManager.str2StartDate(wdActForm.getStartTime()))) { // 判断是否开始日期小于结束日期
				ActionErrors errors = new ActionErrors();
				// errors.add("invalid_time",new
				// ActionError("errors.perference.agent.time.invalid"));
				if (!errors.isEmpty()) {
					// saveErrors(request, errors);
					String strDate = wdActForm.getStartTime();
					int loc = strDate.indexOf(" ");
					if (loc > 0) {
						strDate = strDate.substring(0, loc);
					}
					wdActForm.setStartTime_show(strDate);
					strDate = wdActForm.getEndTime();
					loc = strDate.indexOf(" ");
					if (loc > 0) {
						strDate = strDate.substring(0, loc);
					}
					wdActForm.setEndTime_show(strDate);
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

			NWCalendarManager nwcalManager = nwsession.getCalendarManager();
			NWCalendar nwcalendar=NWCalendarObjectFactory.createCalendar();
			String category = wdActForm.getOrgunitId();
			String worktimeType = wdActForm.getWorktimeType();
			if(worktimeType.equals("1")){
				nwcalendar.setCategory(category);
			}else{
				nwcalendar.setCategory("system");
			}
			nwcalendar.setHoliday(wdActForm.getSelectedItem().equals("1") ? true: false);
			nwcalendar.setType(NWCalendar.TYPE_WEEK_DAY);
			NWDate startDate=new NWDate(CommonInfoManager.str2StartDate(wdActForm
					.getStartTime()));
			nwcalendar.setFromDate(startDate);
			NWDate endDate=new NWDate(CommonInfoManager.str2EndDate(wdActForm
					.getEndTime()));
			nwcalendar.setToDate(endDate);
			nwcalendar.setWeekDay((short) Integer.parseInt(wdActForm.getSelDate()));
			try {
				nwcalManager.addCalendar(nwcalendar);
			} catch (Exception e) {
				session.setAttribute(SessionManager.ERROR, new UniException(e));
				return mapping.findForward("error");
			}
			request.setAttribute("close_flag", "close");
			return mapping.findForward("between");
		}
		return mapping.findForward("error");
	}

}