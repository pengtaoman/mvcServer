package com.neusoft.uniflow.web.common.myagentmgt.create.forms;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;

public class CreateAgentForm extends ActionForm{
	private static final long serialVersionUID = 1234567136;
	 private String startTime = "";
	 private String endTime = "";
	 private String startTime_show = "";
	 private String endTime_show = "";
	 private String assignee = "";
	 //private String assigner = "";
	 
	 private String operation = "";
	 private String agenttype="";
	 private String assigneeId="";
	 private int assigneType;
	// private String assignerId="";
	 private int assignerType;
	 private String categories;
	 

	public String getCategories() {
		return categories;
	}

	public void setCategories(String categories) {
		this.categories = categories;
	}

	public String getAssigneeId() {
		return assigneeId;
	}

	public void setAssigneeId(String assigneeId) {
		this.assigneeId = assigneeId;
	}

	//public String getAssignerId() {
		//return assignerId;
	//}

	//public void setAssignerId(String assignerId) {
		//this.assignerId = assignerId;
	//}

	public int getAssigneType() {
		return assigneType;
	}

	public void setAssigneType(int assigneType) {
		this.assigneType = assigneType;
	}

	public int getAssignerType() {
		return assignerType;
	}

	public void setAssignerType(int assignerType) {
		this.assignerType = assignerType;
	}

	public String getAgenttype() {
		return agenttype;
	}

	public void setAgenttype(String agenttype) {
		this.agenttype = agenttype;
	}

	public void reset(ActionMapping mapping, HttpServletRequest request){	
	 }

	/**
	 * @return Returns the assignee.
	 */
	public String getAssignee() {
		return assignee;
	}

	/**
	 * @param assignee The assignee to set.
	 */
	public void setAssignee(String assignee) {
		this.assignee = assignee;
	}

	/**
	 * @return Returns the assigner.
	 */
	//public String getAssigner() {
		//return assigner;
	//}

	/**
	 * @param assigner The assigner to set.
	 */
	//public void setAssigner(String assigner) {
		//this.assigner = assigner;
	//}

	/**
	 * @return Returns the endTime.
	 */
	public String getEndTime() {
		return endTime;
	}

	/**
	 * @param endTime The endTime to set.
	 */
	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	/**
	 * @return Returns the endTime_show.
	 */
	public String getEndTime_show() {
		return endTime_show;
	}

	/**
	 * @param endTime_show The endTime_show to set.
	 */
	public void setEndTime_show(String endTime_show) {
		this.endTime_show = endTime_show;
	}

	/**
	 * @return Returns the startTime.
	 */
	public String getStartTime() {
		return startTime;
	}

	/**
	 * @param startTime The startTime to set.
	 */
	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	/**
	 * @return Returns the startTime_show.
	 */
	public String getStartTime_show() {
		return startTime_show;
	}

	/**
	 * @param startTime_show The startTime_show to set.
	 */
	public void setStartTime_show(String startTime_show) {
		this.startTime_show = startTime_show;
	}

	/**
	 * @return Returns the operation.
	 */
	public String getOperation() {
		return operation;
	}

	/**
	 * @param operation The operation to set.
	 */
	public void setOperation(String operation) {
		this.operation = operation;
	}

}
