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
import com.neusoft.uniflow.api.calendar.NWCalendarObjectFactory;
import com.neusoft.uniflow.api.calendar.NWDayPart;
import com.neusoft.uniflow.util.NWTime;
import com.neusoft.uniflow.web.management.worktimemgt.forms.WorkperiodForm;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class AddDefaultWorkTimeAction extends Action {
	public static java.text.SimpleDateFormat dateF = new java.text.SimpleDateFormat(
			"yyyy-MM-dd HH:mm:ss");

	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		HttpSession session = request.getSession();
		NWSession nwsession = WorkflowManager.getSysNWSession();
		NWCalendarManager calendarManager=nwsession.getCalendarManager();
		WorkperiodForm btform = (WorkperiodForm) form;
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
			String category = btform.getCategoryId();
			NWTime onTime = new NWTime(onTimehour, onTimemin, 0);
			NWTime offTime = new NWTime(offTimehour, offTimemin, 0);
			
			
			NWDayPart nwdaypart=NWCalendarObjectFactory.createDayPart();
			nwdaypart.setCategory(category);
			nwdaypart.setFromTime(onTime);
			nwdaypart.setToTime(offTime);
			nwdaypart.setType(NWDayPart.CATEGORY_DEFAULT_DAYPART);
			try {
				calendarManager.addDefaultDayPart(category, nwdaypart);
			} catch (Exception e) {
				session.setAttribute(SessionManager.ERROR, new UniException(e));
				return mapping.findForward("error");
			}

			request.setAttribute("begtime", "00:00:0");
			request.setAttribute("endtime", "00:00:0");
			request.setAttribute("close_flag", "close");
			return mapping.findForward("success");
		}

		if (action.equalsIgnoreCase("modify"))// 修改作息period页面跳转
		{
			String categoryId=request.getParameter("categoryId");
			String daypartId=request.getParameter("daypartId");
			Vector dayparts=calendarManager.getDefaultDayParts(categoryId);
			int size=dayparts.size();
			for(int i=0;i<size;i++){
				NWDayPart nwdaypart=(NWDayPart)dayparts.elementAt(i);
				if(nwdaypart.getID().equals(daypartId)){
					//session.setAttribute("editDayPart", nwdaypart);
					NWTime formTime=nwdaypart.getFromTime();
					NWTime toTime=nwdaypart.getToTime();
					btform.setCategoryId(categoryId);
					btform.setPeriodID(daypartId);
					btform.setCalendarId("default");
					request.setAttribute("begtime", formTime.toString());
					request.setAttribute("endtime", toTime.toString());
					return mapping.findForward("editworkperiod");
				};
			}
		}
		return mapping.findForward("error");
	}

}