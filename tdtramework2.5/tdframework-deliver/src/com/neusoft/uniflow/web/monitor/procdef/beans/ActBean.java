package com.neusoft.uniflow.web.monitor.procdef.beans;


public class ActBean {
      String name;
      String actDefID;
      String appDefID;
      String actInstID;
      String startTime;
      String procInstID;
      String completeTime;
      int state;
      int limitTime;      
      int overtimeAction;
      
	public String getActDefID() {
		return actDefID;
	}
	public void setActDefID(String actDefID) {
		this.actDefID = actDefID;
	}
	public String getAppDefID() {
		return appDefID;
	}
	public void setAppDefID(String appDefID) {
		this.appDefID = appDefID;
	}
	public int getLimitTime() {
		return limitTime;
	}
	public void setLimitTime(int limitTime) {
		this.limitTime = limitTime;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getOvertimeAction() {
		return overtimeAction;
	}
	public void setOvertimeAction(int overtimeAction) {
		this.overtimeAction = overtimeAction;
	}
	public String getStartTime() {
		return startTime;
	}
	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}
	public String getActInstID() {
		return actInstID;
	}
	public void setActInstID(String actInstID) {
		this.actInstID = actInstID;
	}
	public String getProcInstID() {
		return procInstID;
	}
	public void setProcInstID(String procInstID) {
		this.procInstID = procInstID;
	}
	public String getCompleteTime() {
		return completeTime;
	}
	public void setCompleteTime(String completeTime) {
		this.completeTime = completeTime;
	}
	public int getState() {
		return state;
	}
	public void setState(int state) {
		this.state = state;
	}
}