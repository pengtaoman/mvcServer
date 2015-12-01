package com.neusoft.tdframework.license;

public class LicenseWarnConfig {
	int daysOfBeforeExpiration = 3;
	String warnType;
	String warnTarget;
	public int getDaysOfBeforeExpiration() {
		return daysOfBeforeExpiration;
	}
	public void setDaysOfBeforeExpiration(int daysOfBeforeExpiration) {
		this.daysOfBeforeExpiration = daysOfBeforeExpiration;
	}
	public String getWarnTarget() {
		return warnTarget;
	}
	public void setWarnTarget(String warnTarget) {
		this.warnTarget = warnTarget;
	}
	public String getWarnType() {
		return warnType;
	}
	public void setWarnType(String warnType) {
		this.warnType = warnType;
	}
	
}
