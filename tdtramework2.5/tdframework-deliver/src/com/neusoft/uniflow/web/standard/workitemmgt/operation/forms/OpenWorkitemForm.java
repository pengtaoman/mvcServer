package com.neusoft.uniflow.web.standard.workitemmgt.operation.forms;


import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;

public class OpenWorkitemForm
    extends ActionForm {
	private static final long serialVersionUID = 1234567819;
  private String operation;
  private String workItemID;
  private String appType;
  public static long WAIT_FORMSUBMIT_TIME = 500;

  public void reset(ActionMapping mapping, HttpServletRequest request) {
    this.operation = "";
    workItemID = "";
  }

  public String getOperation() {
    return operation;
  }

  public void setOperation(String operation) {
    this.operation = operation;
  }

  public String getWorkItemID() {
    return workItemID;
  }

  public void setWorkItemID(String workItemID) {
    this.workItemID = workItemID;
  }

  public String getAppType() {
    return appType;
  }

  public void setAppType(String appType) {
    this.appType = appType;
  }
 }