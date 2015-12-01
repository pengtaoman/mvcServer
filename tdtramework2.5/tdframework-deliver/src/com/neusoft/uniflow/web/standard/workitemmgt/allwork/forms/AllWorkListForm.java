package com.neusoft.uniflow.web.standard.workitemmgt.allwork.forms;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.web.common.list.OpenListForm;


public class AllWorkListForm extends OpenListForm
{private static final long serialVersionUID = 1234567814;
  private String operation;
  private String state;
  private String topage;
  private String workItemName;
  private String startTime;
  private String endTime;
  private String workPart;
  private String workItemState;
  private String orgunitId;
  private String actortype;

  public String getActortype() {
	return actortype;
}
public void setActortype(String actortype) {
	this.actortype = actortype;
}
public void reset(ActionMapping mapping, HttpServletRequest request)
  {
    super.reset(mapping,request);
    operation = "";
  }
  public String getOperation() {
		return operation;
	}

	public void setOperation(String action) {
		this.operation = action;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getTopage() {
		return topage;
	}
	public void setTopage(String topage) {
		this.topage = topage;
	}
	public String getEndTime() {
		return endTime;
	}
	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}
	public String getOrgunitId() {
		return orgunitId;
	}
	public void setOrgunitId(String orgunitId) {
		this.orgunitId = orgunitId;
	}
	public String getStartTime() {
		return startTime;
	}
	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}
	public String getWorkItemName() {
		return workItemName;
	}
	public void setWorkItemName(String workItemName) {
		this.workItemName = workItemName;
	}
	public String getWorkItemState() {
		return workItemState;
	}
	public void setWorkItemState(String workItemState) {
		this.workItemState = workItemState;
	}
	public String getWorkPart() {
		return workPart;
	}
	public void setWorkPart(String workPart) {
		this.workPart = workPart;
	}
	
}