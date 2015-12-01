package com.neusoft.uniflow.web.management.worktimemgt.beans;

/**
 * <p>Title: uniflow 4.0 web client</p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) 2004</p>
 * <p>Company: neusoft</p>
 * @author shangzf
 * @version 1.0
 */

import com.neusoft.uniflow.util.NWTime;
import com.neusoft.uniflow.api.calendar.NWDayPart;


public class WorktimeBean
{
	private NWTime fromTime= new NWTime();//作息开始时间
	private NWTime toTime= new NWTime();//作息结束时间
	private String calendarid = new String();//所属日历的id
	private String daypartId = new String();//作息时间id
	private String category="";//作息时间所属类别
	private int type;
	public WorktimeBean(NWDayPart nwdaypart){
		this.fromTime = nwdaypart.getFromTime();
		this.toTime = nwdaypart.getToTime();
		this.daypartId = nwdaypart.getID();
		this.calendarid=nwdaypart.getCalendarID();
		this.category=nwdaypart.getCategory();
		this.type=nwdaypart.getType();
	}
	public String getCalendarid() {
		return calendarid;
	}
	public void setCalendarid(String calendarid) {
		this.calendarid = calendarid;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getDaypartId() {
		return daypartId;
	}
	public void setDaypartId(String daypartId) {
		this.daypartId = daypartId;
	}
	public NWTime getFromTime() {
		return fromTime;
	}
	public void setFromTime(NWTime fromTime) {
		this.fromTime = fromTime;
	}
	public NWTime getToTime() {
		return toTime;
	}
	public void setToTime(NWTime toTime) {
		this.toTime = toTime;
	}
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
	}
	
}