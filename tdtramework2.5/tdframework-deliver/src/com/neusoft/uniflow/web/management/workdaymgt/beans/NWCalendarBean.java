package com.neusoft.uniflow.web.management.workdaymgt.beans;

import com.neusoft.uniflow.util.NWDate;
/**
 * 
 * @author husy
 *add 2008.03.10
 *对日历对象的封装
 */
public class NWCalendarBean {
	private String id;
	private NWDate fromDate;
	private int monthDay;
	private NWDate toDate;
	private int weekDay;
	private String category;
	private int type;
	private boolean isHoliday;
	
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public NWDate getFromDate() {
		return fromDate;
	}
	public void setFromDate(NWDate formDate) {
		this.fromDate = formDate;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public boolean isisHoliday() {
		return isHoliday;
	}
	public void setHoliday(boolean isHoliday) {
		this.isHoliday = isHoliday;
	}
	public int getMonthDay() {
		return monthDay;
	}
	public void setMonthDay(int monthDay) {
		this.monthDay = monthDay;
	}
	public NWDate getToDate() {
		return toDate;
	}
	public void setToDate(NWDate toDate) {
		this.toDate = toDate;
	}
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
	}
	public int getWeekDay() {
		return weekDay;
	}
	public void setWeekDay(int weekDay) {
		this.weekDay = weekDay;
	}
	
}