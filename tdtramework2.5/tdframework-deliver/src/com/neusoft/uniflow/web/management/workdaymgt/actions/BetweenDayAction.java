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
import com.neusoft.uniflow.api.calendar.NWCalendarObjectFactory;
import com.neusoft.uniflow.common.NWException;
import com.neusoft.uniflow.util.NWDate;
import com.neusoft.uniflow.web.management.workdaymgt.forms.FreedayForm;
import com.neusoft.uniflow.web.util.CommonInfoManager;
import com.neusoft.uniflow.web.util.MessageUtil;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class BetweenDayAction extends Action {
	public static java.text.SimpleDateFormat dateF = new java.text.SimpleDateFormat(
			"yyyy-MM-dd HH:mm:ss");

	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws NWException {
		HttpSession session = request.getSession();
		NWSession nwsession = WorkflowManager.getSysNWSession();
		FreedayForm btActForm = (FreedayForm) form;
		String categoryId = btActForm.getOrgunitId();
		if ((btActForm.getAction().equals("OK"))) {
			if (CommonInfoManager.str2EndDate(btActForm.getEndTime()).before(
					CommonInfoManager.str2StartDate(btActForm.getStartTime()))) { // 判断是否开始日期小于结束日期
				ActionErrors errors = new ActionErrors();
				// errors.add("invalid_time",new
				// ActionError("errors.perference.agent.time.invalid"));
				if (!errors.isEmpty()) {
					// saveErrors(request, errors);
					String strDate = btActForm.getStartTime();
					int loc = strDate.indexOf(" ");
					if (loc > 0) {
						strDate = strDate.substring(0, loc);
					}
					btActForm.setStartTime_show(strDate);
					strDate = btActForm.getEndTime();
					loc = strDate.indexOf(" ");
					if (loc > 0) {
						strDate = strDate.substring(0, loc);
					}
					btActForm.setEndTime_show(strDate);
					return mapping.findForward("between");

				}
			}
			NWCalendarManager nwcalManager = null;
			try {
				nwcalManager = nwsession.getCalendarManager();
			} catch (Exception e) {
				session.setAttribute(SessionManager.ERROR, new UniException(e));
				return mapping.findForward("error");
			}
			NWCalendar calendar = NWCalendarObjectFactory.createCalendar();

			String category = btActForm.getOrgunitId();
			String worktimeType = btActForm.getWorktimeType();
			if (worktimeType.equals("1")) {
				calendar.setCategory(category);
			} else if (worktimeType.equals("2")) {
				calendar.setCategory("system");
			}
			calendar.setType(NWCalendar.TYPE_DAY);
			calendar.setHoliday(btActForm.getSelectedItem().equals("1") ? true
					: false);
			calendar.setFromDate(new NWDate(CommonInfoManager
					.str2StartDate(btActForm.getStartTime())));
			calendar.setToDate(new NWDate(CommonInfoManager
					.str2EndDate(btActForm.getEndTime())));
			try {
				nwcalManager.addCalendar(calendar);
			} catch (Exception e) {
				session.setAttribute(SessionManager.ERROR, new UniException(e));
				return mapping.findForward("error");
			}
			request.setAttribute("close_flag", "close");
			return mapping.findForward("between");
		} else {
			if (categoryId == null || categoryId.equals(""))
				categoryId = request.getParameter("workCategoryId");
			NWUnit nwunit = null;
			try {
				nwunit = WorkflowManager.getNWOrg().getUnit(categoryId);
				if (nwunit != null) {
					btActForm.setOrgunit(nwunit.getName());
					btActForm.setOrgunitId(nwunit.getID());
					btActForm.setWorktimeType("1");
				} else {
					btActForm.setOrgunit("");
					btActForm.setOrgunitId(categoryId);
					btActForm.setWorktimeType("2");
				}
			} catch (Exception e1) {
				e1.printStackTrace();
			}
			if (btActForm.getAction().equals("add")) {
				return mapping.findForward("between");
			} else if (btActForm.getAction().equals("monthday")) {
				ArrayList arrayDate = new ArrayList();

				String dayunit = MessageUtil.getString(
						"workflow.schedule.allmonthday", request.getSession());
				String[] days = dayunit.split(",");
				for (int i = 0; i < days.length; i++) {
					arrayDate.add(new LabelValueBean(days[i], String
							.valueOf(i + 1)));
				}
				btActForm.setStartTime("");
				btActForm.setEndTime("");
				request.setAttribute("allDate", arrayDate);

				return mapping.findForward("month");
			} else if (btActForm.getAction().equals("weekday")) {
				ArrayList arrayDate = new ArrayList();
				String allweek = MessageUtil.getString(
						"workflow.schedule.allweekday", request.getSession());
				String[] weeks = allweek.split(",");
				for (int i = 0; i < weeks.length; i++) {
					arrayDate.add(new LabelValueBean(weeks[i], String
							.valueOf(i + 1)));
				}
				btActForm.setStartTime("");
				btActForm.setEndTime("");
				request.setAttribute("allWeek", arrayDate);

				return mapping.findForward("week");
			}
		}
		return mapping.findForward("error");
	}

}