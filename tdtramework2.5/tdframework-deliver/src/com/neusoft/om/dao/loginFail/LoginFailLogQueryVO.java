package com.neusoft.om.dao.loginFail;

public class LoginFailLogQueryVO
{
  private String loginId = "";

  private String startTime = "";

  private String endTime = "";

  private String partMm = "";
  private String ipAddr;
  private String loginDate;
  private String delFlag;

  public String getLoginId()
  {
    return this.loginId;
  }

  public void setLoginId(String loginId) {
    this.loginId = loginId;
  }

  public String getStartTime() {
    return this.startTime;
  }

  public void setStartTime(String startTime) {
    this.startTime = startTime;
  }

  public String getEndTime() {
    return this.endTime;
  }

  public void setEndTime(String endTime) {
    this.endTime = endTime;
  }

  public String getPartMm() {
    return this.partMm;
  }

  public void setPartMm(String partMm) {
    this.partMm = partMm;
  }

  public String getIpAddr() {
    return this.ipAddr;
  }

  public void setIpAddr(String ipAddr) {
    this.ipAddr = ipAddr;
  }

  public String getLoginDate() {
    return this.loginDate;
  }

  public void setLoginDate(String loginDate) {
    this.loginDate = loginDate;
  }

  public String getDelFlag() {
    return this.delFlag;
  }

  public void setDelFlag(String delFlag) {
    this.delFlag = delFlag;
  }
}