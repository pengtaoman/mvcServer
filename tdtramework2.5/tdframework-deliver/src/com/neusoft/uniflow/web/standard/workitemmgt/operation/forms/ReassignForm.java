package com.neusoft.uniflow.web.standard.workitemmgt.operation.forms;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;



public class ReassignForm extends ActionForm {
	private static final long serialVersionUID = 1234567820;
  private boolean submitAuthor;
  private String workitemID;
  private String[] assignTo;
  private String operation;
  private String[] temp;

  public void reset(ActionMapping mapping, HttpServletRequest request)
  {
    this.submitAuthor = true;
    this.workitemID = "";
    this.operation = "";
    this.assignTo = new String[0];
    this.temp = new String[0];
  }
  public boolean isSubmitAuthor() {
    return submitAuthor;
  }
  public void setSubmitAuthor(boolean submitAuthor) {
    this.submitAuthor = submitAuthor;
  }
  public String getWorkitemID() {
    return workitemID;
  }
  public void setWorkitemID(String workitemID) {
    this.workitemID = workitemID;
  }
  public String[] getAssignTo() {
    return assignTo;
  }
  public void setAssignTo(String[] assignTo) {
    this.assignTo = assignTo;
  }
  public String getOperation() {
    return operation;
  }
  public void setOperation(String operation) {
    this.operation = operation;
  }
  public String[] getTemp() {
    return temp;
  }
  public void setTemp(String[] temp) {
    this.temp = temp;
  }
}