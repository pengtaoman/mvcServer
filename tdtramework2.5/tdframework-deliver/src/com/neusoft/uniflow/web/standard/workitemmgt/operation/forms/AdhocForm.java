package com.neusoft.uniflow.web.standard.workitemmgt.operation.forms;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;

public class AdhocForm extends ActionForm {
	private static final long serialVersionUID = 1234567817;
  public final static String ACTION_UPDATE = "update";
  public final static String ACTION_UPDATE_OK = "ok";
  private String workItemID;
  private boolean everyOneCanCommit;
  private String action;
	private boolean editable = true;
	private String[] steps;


  public void reset(ActionMapping mapping, HttpServletRequest request)
  {
    workItemID = "";
    everyOneCanCommit = false;
    action = "";
    steps =  new String[0];
  }

  public String getWorkItemID() {
    return workItemID;
  }
  public void setWorkItemID(String workItemID) {
    this.workItemID = workItemID;
  }
  public boolean isEveryOneCanCommit() {
    return everyOneCanCommit;
  }
  public void setEveryOneCanCommit(boolean everyOneCanCommit) {
    this.everyOneCanCommit = everyOneCanCommit;
  }

  public String getAction() {
    return action;
  }
  public void setAction(String action) {
    this.action = action;
  }
	public boolean isEditable()
	{
		return editable;
	}
	public void setEditable(boolean editable)
	{
		this.editable = editable;
	}
	public String[] getSteps()
	{
		return steps;
	}
	public void setSteps(String[] steps)
	{
		this.steps = steps;
	}
}