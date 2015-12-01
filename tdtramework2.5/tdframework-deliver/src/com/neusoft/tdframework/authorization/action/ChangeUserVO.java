package com.neusoft.tdframework.authorization.action;

public class ChangeUserVO {

	private String pfWorkNo;
	
	private String dsWorkNo;
	
	private String cityCode;
	
	private String areaName;
	
	private String pwd;

	public String getPwd() {
		return pwd;
	}

	public void setPwd(String pwd) {
		this.pwd = pwd;
	}

	public String getPfWorkNo() {
		return pfWorkNo;
	}

	public void setPfWorkNo(String pfWorkNo) {
		this.pfWorkNo = pfWorkNo;
	}

	public String getDsWorkNo() {
		return dsWorkNo;
	}

	public void setDsWorkNo(String dsWorkNo) {
		this.dsWorkNo = dsWorkNo;
	}

	public String getCityCode() {
		return cityCode;
	}

	public void setCityCode(String cityCode) {
		this.cityCode = cityCode;
	}

	public String getAreaName() {
		return areaName;
	}

	public void setAreaName(String areaName) {
		this.areaName = areaName;
	}
}
