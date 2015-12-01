package com.neusoft.tdframework.quartz.data;

import java.util.Date;

public class TriggerVO {
	
	String triggerName = "";
	
	public String getTriggerName() {
		return triggerName;
	}

	public void setTriggerName(String triggerName) {
		this.triggerName = triggerName;
	}

	public String getTriggerGroupName() {
		return triggerGroupName;
	}

	public void setTriggerGroupName(String triggerGroupName) {
		this.triggerGroupName = triggerGroupName;
	}

	public String getTriggerEndtime() {
		return triggerEndtime;
	}

	public void setTriggerEndtime(String triggerEndtime) {
		this.triggerEndtime = triggerEndtime;
	}

	public String getTriggernexttime() {
		return triggernexttime;
	}

	public void setTriggernexttime(String triggernexttime) {
		this.triggernexttime = triggernexttime;
	}

	public String getCros() {
		return cros;
	}

	public void setCros(String cros) {
		this.cros = cros;
	}

	public String getTriDes() {
		return triDes;
	}

	public void setTriDes(String triDes) {
		this.triDes = triDes;
	}

	String triggerGroupName = "";
	
	String triggerEndtime = "";
	
	String triggernexttime = "";
	
	String cros = "";
	
	String triDes = "";

}
