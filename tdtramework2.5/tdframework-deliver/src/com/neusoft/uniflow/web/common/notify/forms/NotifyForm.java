package com.neusoft.uniflow.web.common.notify.forms;

/**
 * <p>Title: uniflow 3.5 web client</p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) 2003</p>
 * <p>Company: neusoft</p>
 * @author wangwb
 * @version 1.0
 */
import java.io.Serializable;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;

public class NotifyForm
    extends ActionForm
    implements Serializable {
	private static final long serialVersionUID = 1234567827;

  private String style = "";
  private String number = "";
  private String action = "";
  private boolean ifemail = false;
  private String email = "";
  private String phone = "";
  private boolean ifphone = false;
  private boolean ifalert = false;

  private String oldpass = "";
  private String newpass = "";
  private String confpass = "";


  private boolean setAgent = false;
  private String agentID = "";
  private String startTime = "";
  private String endTime = "";
  private String startTime_show = "";
  private String endTime_show = "";
  private String hintkey = "";


  public NotifyForm() {}

  public void setAction(String action) {
    this.action = action;
  }

  public String getAction() {
    return this.action;
  }

  public void setStyle(String style) {
    this.style = style;
  }

  public String getStyle() {
    return this.style;
  }

  public void setNumber(String number) {
    this.number = number;
  }

  public String getNumber() {
    return this.number;
  }

  public void setIfemail(boolean ifemail) {
    this.ifemail = ifemail;
  }

  public boolean getIfemail() {
    return this.ifemail;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getEmail() {
    return this.email;
  }

  public void setIfphone(boolean ifphone) {
    this.ifphone = ifphone;
  }

  public boolean getIfphone() {
    return this.ifphone;
  }

  public void setPhone(String phone) {
    this.phone = phone;
  }

  public String getPhone() {
    return this.phone;
  }

  public void setIfalert(boolean ifalert) {
    this.ifalert = ifalert;
  }

  public boolean getIfalert() {
    return this.ifalert;
  }

  public String getOldpass() {
    return oldpass;
  }

  public void setOldpass(String oldpass) {
    this.oldpass = oldpass;
  }

  public String getNewpass() {
    return newpass;
  }

  public void setNewpass(String newpass) {
    this.newpass = newpass;
  }

  public String getConfpass() {
    return confpass;
  }

  public void setConfpass(String confpass) {
    this.confpass = confpass;
  }

  public String getAgentID() {
    return agentID;
  }

  public void setAgentID(String agentID) {
    this.agentID = agentID;
  }

  public String getStartTime() {
    return startTime;
  }

  public void setStartTime(String startTime) {
    this.startTime = startTime;
  }

  public String getEndTime() {
    return endTime;
  }

  public void setEndTime(String endTime) {
    this.endTime = endTime;
  }

  public String getStartTime_show() {
    return startTime_show;
  }

  public void setStartTime_show(String startTime_show) {
    this.startTime_show = startTime_show;
  }

  public String getEndTime_show() {
    return endTime_show;
  }

  public void setEndTime_show(String endTime_show) {
    this.endTime_show = endTime_show;
  }

  public boolean getSetAgent() {
    return setAgent;
  }

  public void setSetAgent(boolean setAgent) {
    this.setAgent = setAgent;
  }

  public String getHintkey() {
    return hintkey;
  }

  public void setHintkey(String hintkey) {
    this.hintkey = hintkey;
  }
  public void reset(ActionMapping actionMapping,
			  HttpServletRequest httpServletRequest) {
    this.style = "";
    this.action = "";
    this.ifemail = false;
    this.email = "";
    this.ifphone = false;
    this.phone = "";
    this.ifalert = false;
    this.oldpass = "";
    this.newpass = "";
    this.confpass = "";
    this.setAgent = false;
    this.agentID = "";
    this.startTime = "";
    this.action = "";
  }


}