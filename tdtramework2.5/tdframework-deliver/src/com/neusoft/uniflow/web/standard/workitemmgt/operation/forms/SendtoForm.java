package com.neusoft.uniflow.web.standard.workitemmgt.operation.forms;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;


public class SendtoForm extends ActionForm
{private static final long serialVersionUID = 1234567822;
  private String action;
  private String workItemID;
  private String[] sendToParts;
  private String[] copyToParts;
  private String[] sendto;
  public void reset(ActionMapping mapping, HttpServletRequest request)
  {
    this.sendto = new String[0];
    this.sendToParts = new String[0];
    this.copyToParts = new String[0];
    this.action= "";
    workItemID = "";
  }
  public String[] getSendto() {
    return sendto;
  }
  public void setSendto(String[] sendto) {
    this.sendto = sendto;
  }
  public String[] getSendToParts() {
    return sendToParts;
  }
  public void setSendToParts(String[] sendToParts) {
    this.sendToParts = sendToParts;
  }
  public String[] getCopyToParts() {
    return copyToParts;
  }
  public void setCopyToParts(String[] copyToParts) {
    this.copyToParts = copyToParts;
  }

  public String getAction() {
    return action;
  }
  public void setAction(String action) {
    this.action = action;
  }
  public String getWorkItemID() {
    return workItemID;
  }
  public void setWorkItemID(String workItemID) {
    this.workItemID = workItemID;
  }
}