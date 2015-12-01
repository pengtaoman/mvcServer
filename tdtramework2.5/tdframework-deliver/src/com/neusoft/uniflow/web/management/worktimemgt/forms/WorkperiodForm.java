package com.neusoft.uniflow.web.management.worktimemgt.forms;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionErrors;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;



public class WorkperiodForm extends ActionForm {
	private static final long serialVersionUID = 12346;
  private String action;
  private String endTime;
  private String fromDate;
  private String selDate;
  private String selectedItem;
  private String startTime;
  private String toDate;
  private String fdiID;
  private String periodID;
 // private String scheduleID;
  private String type;
  private String orgunit;
  private String orgunitId;
  private String worktimeType;
  private String daypartId;
  private String categoryId;
  private String calendarId;
 public String getWorktimeType() {
	return worktimeType;
}
public void setWorktimeType(String worktimeType) {
	this.worktimeType = worktimeType;
}
public String getOrgunitId() {
	return orgunitId;
}
public void setOrgunitId(String orgunitId) {
	this.orgunitId = orgunitId;
}
public String getOrgunit() {
	return orgunit;
}
public void setOrgunit(String orgunit) {
	this.orgunit = orgunit;
}
public String getType() {
	return type;
}
public void setType(String type) {
	this.type = type;
}
public String getAction() {
    return action;
  }
  public void setFdiID(String fdiID) {
    this.fdiID = fdiID;
  }
  public String getFdiID() {
	 return fdiID;
  }
  public void setAction(String action) {
	 this.action = action;
  }

  public String getEndTime() {
        return endTime;
  }
  public void setEndTime(String endTime) {
    this.endTime = endTime;
  }
  public String getEndTime_show() {
  	return this.endTime;
  }
  
  public String getSelDate() {
    return selDate;
  }
  public void setSelDate(String selDate) {
    this.selDate = selDate;
  }
  public String getSelectedItem() {
    return selectedItem;
  }
  public void setSelectedItem(String selectedItem) {
    this.selectedItem = selectedItem;
  }
  public String getStartTime() {
    return this.startTime;
  }
  public void setStartTime(String startTime) {
    this.startTime = startTime;
  }
  
  public String getCalendarId() {
	return calendarId;
}
public void setCalendarId(String calendarId) {
	this.calendarId = calendarId;
}
public ActionErrors validate(ActionMapping actionMapping, HttpServletRequest httpServletRequest) {
    /**@todo: finish this method, this is just the skeleton.*/
    return null;
  }
  public void reset(ActionMapping actionMapping, HttpServletRequest httpServletRequest) {
    action = null;
    endTime = null;
   
    selDate = null;
    selectedItem = "1";
    startTime = null;
    this.calendarId="";
  }
public String getFromDate() {
	return fromDate;
}
public void setFromDate(String fromDate) {
	this.fromDate = fromDate;
}
public String getPeriodID() {
	return periodID;
}
public void setPeriodID(String periodID) {
	this.periodID = periodID;
}
/*public String getScheduleID() {
	return scheduleID;
}
public void setScheduleID(String scheduleID) {
	this.scheduleID = scheduleID;
}*/
public String getToDate() {
	return toDate;
}
public void setToDate(String toDate) {
	this.toDate = toDate;
}
public String getCategoryId() {
	return categoryId;
}
public void setCategoryId(String categoryId) {
	this.categoryId = categoryId;
}
public String getDaypartId() {
	return daypartId;
}
public void setDaypartId(String daypartId) {
	this.daypartId = daypartId;
}

}