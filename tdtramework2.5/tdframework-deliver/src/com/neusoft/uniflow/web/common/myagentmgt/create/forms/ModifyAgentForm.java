package com.neusoft.uniflow.web.common.myagentmgt.create.forms;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;

public class ModifyAgentForm extends ActionForm {
	private static final long serialVersionUID = 1234567824;
	private String startTime = "";
	private String endTime = "";
	private String startTime_show = "";
	private String endTime_show = "";
	private String assignee = "";
	private String assigneeId = "";
	private int assigneType = 0;
	private String operation = "";
	private String cateResName = "";
	private String cateResID = "";
	private int agentType;
	private String id = "";

	public void reset(ActionMapping mapping, HttpServletRequest request) {
		this.id = "";
	}

	/**
	 * @return Returns the assignee.
	 */
	public String getAssignee() {
		return assignee;
	}

	/**
	 * @param assignee
	 *            The assignee to set.
	 */
	public void setAssignee(String assignee) {
		this.assignee = assignee;
	}

	/**
	 * @return Returns the endTime.
	 */
	public String getEndTime() {
		return endTime;
	}

	/**
	 * @param endTime
	 *            The endTime to set.
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
	 * @param endTime_show
	 *            The endTime_show to set.
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
	 * @param startTime
	 *            The startTime to set.
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
	 * @param startTime_show
	 *            The startTime_show to set.
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
	 * @param operation
	 *            The operation to set.
	 */
	public void setOperation(String operation) {
		this.operation = operation;
	}

	/**
	 * @return Returns the id.
	 */
	public String getId() {
		return id;
	}

	/**
	 * @param id
	 *            The id to set.
	 */
	public void setId(String id) {
		this.id = id;
	}

	public String getAssigneeId() {
		return assigneeId;
	}

	public void setAssigneeId(String assigneeId) {
		this.assigneeId = assigneeId;
	}

	public int getAssigneType() {
		return assigneType;
	}

	public void setAssigneType(int assigneType) {
		this.assigneType = assigneType;
	}

	public String getCateResName() {
		return cateResName;
	}

	public void setCateResName(String cateResName) {
		this.cateResName = cateResName;
	}

	public String getCateResID() {
		return cateResID;
	}

	public void setCateResID(String cateResID) {
		this.cateResID = cateResID;
	}

	public int getAgentType() {
		return agentType;
	}

	public void setAgentType(int agentType) {
		this.agentType = agentType;
	}

}
