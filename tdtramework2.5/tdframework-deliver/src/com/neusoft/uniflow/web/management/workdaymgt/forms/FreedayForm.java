package com.neusoft.uniflow.web.management.workdaymgt.forms;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionErrors;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;



public class FreedayForm extends ActionForm {
	private static final long serialVersionUID = 12348;
  private String action;
  private String endTime;
  private String endTime_show;
  private String selDate;
  private String selectedItem;
  private String startTime;
  private String startTime_show;
 // private String fdiID;
  private String selectedId;
  private String orgunit;
  private String orgunitId;
  private String worktimeType;
  private String category;
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
public String getAction() {
    return action;
  }
 /* public void setFdiID(String fdiID) {
    this.fdiID = fdiID;
  }
  public String getFdiID() {
	 return fdiID;
  }*/
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
  	return this.endTime_show;
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
  public String getStartTime_show() {
  	return startTime_show;
  }
  public void setStartTime_show(String startTime_show) {
    this.startTime_show = startTime_show;
  }
  public String getSelectedId() {
	return selectedId;
  }
  public void setSelectedId(String selectedId) {
	this.selectedId = selectedId;
  }
  
public String getCategory() {
	return category;
}
public void setCategory(String category) {
	this.category = category;
}
public ActionErrors validate(ActionMapping actionMapping, HttpServletRequest httpServletRequest) {
    /**@todo: finish this method, this is just the skeleton.*/
    return null;
  }
  public void reset(ActionMapping actionMapping, HttpServletRequest httpServletRequest) {
    action = null;
    endTime = null;
    endTime_show = null;
    selDate = null;
    selectedItem = "1";
    startTime = null;
    startTime_show = null;
    selectedId="";
    category="";
  }
public void setEndTime_show(String endTime_show) {
	this.endTime_show = endTime_show;
}
}