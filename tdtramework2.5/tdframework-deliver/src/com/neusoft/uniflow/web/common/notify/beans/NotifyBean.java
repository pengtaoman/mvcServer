package com.neusoft.uniflow.web.common.notify.beans;

/**
 * <p>Title: uniflow 3.5 web client</p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) 2003</p>
 * <p>Company: neusoft</p>
 * @author wangwb
 * @version 1.0
 */
import java.util.ArrayList;
import java.util.Vector;

import com.neusoft.uniflow.api.handler.NWAgent;
import com.neusoft.uniflow.api.mgmt.NWPersonInfo;

public class NotifyBean {

  public static String DATEFORMAT = "yyyy-MM-dd";

  private String style = "";
  private String number = "";
  private boolean modifypass = false;
  private String newpass = "";
  private ArrayList styleinfo =  new ArrayList();
  private NWPersonInfo personinfo = null;
  private Vector notifyinfo = null;

  private boolean setAgent = false;
  private boolean hasAgent = false;
  private boolean ismodified = false;
  private NWAgent agent = null;
  private String agentID = "";
  private String startTime = "";
  private String endTime = "";

  public NotifyBean() {
    this.style = "";
  }

  public String getStyle() {
    return this.style;
  }

  public void setStyle(String style) {
    this.style = style;
  }

  public void setNumber(String number) {
    this.number = number;
  }

  public String getNumber() {
    return this.number;
  }

  public ArrayList getStyleinfo() {
    return this.styleinfo;
  }

  public void setStyleinfo(ArrayList styleinfo) {
    this.styleinfo = styleinfo;
  }

  public boolean getSetAgent() {
    return setAgent;
  }
  public void setSetAgent(boolean setAgent) {
    this.setAgent = setAgent;
  }

  public boolean getHasAgent() {
    return hasAgent;
  }
  public void setHasAgent(boolean hasAgent) {
    this.hasAgent = hasAgent;
  }

  public boolean getIsmodified() {
    return ismodified;
  }
  public void setIsmodified(boolean ismodified) {
    this.ismodified = ismodified;
  }

  public NWAgent getAgent() {
    return agent;
  }
  public void setAgent(NWAgent agent) {
    this.agent = agent;
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

  public String getNewpass() {
    return newpass;
  }

  public void setNewpass(String newpass) {
    this.newpass = newpass;
  }

  public boolean getModifypass() {
    return modifypass;
  }

  public void setModifypass(boolean modifypass) {
    this.modifypass = modifypass;
  }

  public Vector getNotifyinfo() {
    return this.notifyinfo;
  }

  public void setNotifyinfo(Vector notifyinfo) {
    this.notifyinfo = notifyinfo;
  }

  public NWPersonInfo getPersoninfo() {
    return this.personinfo;
  }

  public void setPersoninfo(NWPersonInfo personinfo) {
    this.personinfo = personinfo;
  }

}