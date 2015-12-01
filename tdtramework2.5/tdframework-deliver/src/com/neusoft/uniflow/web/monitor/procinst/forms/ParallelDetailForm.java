package com.neusoft.uniflow.web.monitor.procinst.forms;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;

public class ParallelDetailForm extends ActionForm {
	public String name;
	public String completeTime;
	public String startTime;
	public String description;
	public void reset(ActionMapping mapping,HttpServletRequest request){
		super.reset(mapping, request);
	}
	public String getCompleteTime() {
		return completeTime;
	}
	public void setCompleteTime(String compoleteTime) {
		this.completeTime = compoleteTime;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getStartTime() {
		return startTime;
	}
	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}
	
}
