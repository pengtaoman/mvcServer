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

import com.neusoft.org.NWUnit;
import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.calendar.NWCalendar;
import com.neusoft.uniflow.api.calendar.NWCalendarManager;
import com.neusoft.uniflow.common.NWException;
import com.neusoft.uniflow.util.NWDate;
import com.neusoft.uniflow.web.management.workdaymgt.forms.FreedayForm;
import com.neusoft.uniflow.web.util.MessageUtil;
import com.neusoft.uniflow.web.util.CommonInfoManager;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class MonthDayAction extends Action {
	// private static java.text.SimpleDateFormat dateF = new java.text.
	// SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws NWException {
		HttpSession session = request.getSession();
		NWSession nwsession = WorkflowManager.getSysNWSession();
		FreedayForm mdActForm = (FreedayForm) form;
		String categoryId=mdActForm.getOrgunitId();
		if (mdActForm.getAction().equals("betweenday")) {
			mdActForm.setStartTime("");
			mdActForm.setEndTime("");
			return mapping.findForward("between");
		}
		if (mdActForm.getAction().equals("weekday")) {
			ArrayList arrayDate = new ArrayList();
			String allweek = MessageUtil.getString(
					"workflow.schedule.allweekday", request.getSession());
			String[] weeks = allweek.split(",");
			for (int i = 0; i < weeks.length; i++) {
				arrayDate.add(new LabelValueBean(weeks[i], String
						.valueOf(i + 1)));
			}
			mdActForm.setStartTime("");
			mdActForm.setEndTime("");
			request.setAttribute("allWeek", arrayDate);
			return mapping.findForward("week");
		}

		if (mdActForm.getAction().equals("OK")) {

			if (CommonInfoManager.str2EndDate(mdActForm.getEndTime()).before(
					CommonInfoManager.str2StartDate(mdActForm.getStartTime()))) { // 判断是否开始日期小于结束日期
				ActionErrors errors = new ActionErrors();
				// errors.add("invalid_time",new
				// ActionError("errors.perference.agent.time.invalid"));
				if (!errors.isEmpty()) {
					// saveErrors(request, errors);
					String strDate = mdActForm.getStartTime();
					int loc = strDate.indexOf(" ");
					if (loc > 0) {
						strDate = strDate.substring(0, loc);
					}
					mdActForm.setStartTime_show(strDate);
					strDate = mdActForm.getEndTime();
					loc = strDate.indexOf(" ");
					if (loc > 0) {
						strDate = strDate.substring(0, loc);
					}
					mdActForm.setEndTime_show(strDate);

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
			}
			String category = mdActForm.getOrgunitId();
			NWCalendarManager nwcalManager=null;
			try {
				nwcalManager = nwsession.getCalendarManager();
			} catch (Exception e1) {
				e1.printStackTrace();
				session.setAttribute(SessionManager.ERROR, new UniException(e1));
				return mapping.findForward("error");
			}
			NWCalendar nwcal = nwcalManager.createCalendar();
			String worktimetype = mdActForm.getWorktimeType();
			if (worktimetype.equals("1")) {
				nwcal.setCategory(category);
				
			} else if (worktimetype.equals("2")) {
				nwcal.setCategory("system");
			}
			nwcal.setType(NWCalendar.TYPE_MONTH_DAY);
			nwcal.setHoliday(mdActForm.getSelectedItem().equals("1") ? true: false);
			nwcal.setFromDate(new NWDate(CommonInfoManager.str2StartDate(mdActForm
					.getStartTime())));
			nwcal.setToDate(new NWDate(CommonInfoManager.str2EndDate(mdActForm
					.getEndTime())));
			nwcal.setMonthDay((short) Integer.parseInt(mdActForm
					.getSelDate()));
			try {
				nwcalManager.addCalendar(nwcal);
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