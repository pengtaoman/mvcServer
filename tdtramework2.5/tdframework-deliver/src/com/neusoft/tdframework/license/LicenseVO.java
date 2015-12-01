package com.neusoft.tdframework.license;

import java.util.Date;

public class LicenseVO {
	String projectNo;
	String projectName;
	String licenseNo;
	String expiredDate;
	String menuId;
	
	public String getExpiredDate() {
		return expiredDate;
	}
	public void setExpiredDate(String expiredDate) {
		this.expiredDate = expiredDate;
	}
	public String getLicenseNo() {
		return licenseNo;
	}
	public void setLicenseNo(String licenseNo) {
		this.licenseNo = licenseNo;
	}
	public String getProjectName() {
		return projectName;
	}
	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}
	public String getProjectNo() {
		return projectNo;
	}
	public void setProjectNo(String projectNo) {
		this.projectNo = projectNo;
	}
	public String getExpireStatus(){
		String status = "normal";// toExpire, normal
		int daysBefore = LicenseUtil.getLicenseWarnConfig().getDaysOfBeforeExpiration();
		if(CalendarUtil.getDaysBetween(new Date(),expiredDate)<=0){
			status = "expired";
		}else if(CalendarUtil.getDaysBetween(new Date(),expiredDate)<=daysBefore){
			status = "toExpire";
		}
		return status;
	}
	public String getMenuId() {
		return menuId;
	}
	public void setMenuId(String menuId) {
		this.menuId = menuId;
	}
}
