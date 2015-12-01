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
import com.neusoft.uniflow.util.NWTime;
import com.neusoft.uniflow.web.management.worktimemgt.forms.WorkperiodForm;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class AddWorktimePeriodAction extends Action {
	public static java.text.SimpleDateFormat dateF = new java.text.SimpleDateFormat(
			"yyyy-MM-dd HH:mm:ss");

	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		HttpSession session = request.getSession();
		NWSession nwsession = WorkflowManager.getSysNWSession();
		NWCalendarManager calendarManager = nwsession.getCalendarManager();
		WorkperiodForm btform = (WorkperiodForm) form;
		String categoryId = btform.getCategoryId();
		String calendarId=btform.getCalendarId();
		if (categoryId == null || categoryId.equals("")) {
			categoryId = request.getParameter("categoryid");
			btform.setCategoryId(categoryId);
		}
		if(calendarId==null||calendarId.equals("")){
			calendarId=request.getParameter("calendarId");
			btform.setCalendarId(calendarId);
		}
		String action = btform.getAction();
		if (action.equalsIgnoreCase("add"))// 新增作息时间
		{

			request.setAttribute("begtime", "00:00:0");
			request.setAttribute("endtime", "00:00:0");

			return mapping.findForward("success");
		}
		if (action.equalsIgnoreCase("ok"))// 新增自定义作息period
		{
			int onTimehour = 0, onTimemin = 0, offTimehour = 0, offTimemin = 0;
			onTimehour = Integer.parseInt(btform.getStartTime().split(":")[0]);
			onTimemin = Integer.parseInt(btform.getStartTime().split(":")[1]);
			offTimehour = Integer.parseInt(btform.getEndTime().split(":")[0]);
			offTimemin = Integer.parseInt(btform.getEndTime().split(":")[1]);
			NWTime onTime = new NWTime(onTimehour, onTimemin, 0);
			NWTime offTime = new NWTime(offTimehour, offTimemin, 0);
			String calenderId=btform.getCalendarId();
			categoryId=btform.getCategoryId();
			NWCalendar calendar=NWCalendarObjectFactory.createCalendar();
			Vector calendars=calendarManager.getCalendars(categoryId);
			int calendarLength=calendars.size();
			for(int i=0;i<calendarLength;i++){
				calendar=(NWCalendar)calendars.elementAt(i);
				if(calenderId.equals(calendar.getID())){
					break;
				}
			}
			if (calendar != null) {
				NWDayPart dayPart = NWCalendarObjectFactory.createDayPart();
				dayPart.setCalendarID(calendar.getID());
				dayPart.setCategory(calendar.getCategory());
				dayPart.setFromTime(onTime);
				dayPart.setToTime(offTime);
				dayPart.setType(NWDayPart.CALENDAR_DAYPART);
				try {
					dayPart.AddOrUpdate();
				} catch (Exception e) {
					session.setAttribute(SessionManager.ERROR,
							new UniException(e));
					return mapping.findForward("error");
				}
			}
			request.setAttribute("begtime", "00:00:0");
			request.setAttribute("endtime", "00:00:0");
			request.setAttribute("close_flag", "close");
			return mapping.findForward("success");
		}

		if (action.equalsIgnoreCase("modify"))// 修改作息period页面跳转
		{
			categoryId=request.getParameter("categoryId");
			String daypartId=request.getParameter("dayPartId");
			NWCalendar calendar=NWCalendarObjectFactory.createCalendar();
			String calenderId=btform.getCalendarId();
			if(calenderId==null||calenderId.equals("")){
				calenderId=request.getParameter("calendarId");
				btform.setCalendarId(calendarId);
			}
			Vector calendars=calendarManager.getCalendars(categoryId);
			int calendarLength=calendars.size();
			for(int i=0;i<calendarLength;i++){
				calendar=(NWCalendar)calendars.elementAt(i);
				if(calenderId.equals(calendar.getID())){
					break;
				}
			}
			Vector dayparts=null;
			//NWCalendar calendar = (NWCalendar) session.getAttribute("selectCalendar");
			try {
				dayparts=calendarManager.getDayParts(calendar.getID());
			} catch (Exception e) {
				e.printStackTrace();
			}
			int size=dayparts.size();
			for(int i=0;i<size;i++){
				NWDayPart nwdaypart=(NWDayPart)dayparts.elementAt(i);
				if(nwdaypart.getID().equals(daypartId)){
					NWTime formTime=nwdaypart.getFromTime();
					NWTime toTime=nwdaypart.getToTime();
					btform.setCategoryId(categoryId);
					btform.setPeriodID(daypartId);
					btform.setDaypartId(nwdaypart.getID());
					request.setAttribute("begtime", formTime.toString());
					request.setAttribute("endtime", toTime.toString());
					return mapping.findForward("editworkperiod");
				};
			}

		}
		return mapping.findForward("error");
	}

}