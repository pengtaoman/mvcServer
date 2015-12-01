package com.neusoft.uniflow.web.common.myagentmgt.agentlist.beans;

public class AgentBean {
	private String id;
	private String assignee;
	private String assigner;
	private String stime;
	private String etime;
	/*
	 * 代理创建者标识
	 */
	private String createID;

	/*
	 * 代理创建者名称
	 */
	private String createName;

	/*
	 * 0,原办理者为人员;1,为角色
	 */
	private int assignerType;

	/*
	 * 原办理者名称
	 */
	private String assignerName;

	/*
	 * 0,代理者为人员;1,代理者为角色
	 */
	private int assigneeType;

	/*
	 * 代理者名称
	 */
	private String assigneeName;

	/*
	 * 流程模板标识
	 */
	private String processID;

	/**
	 * **/
	private String processName;
	/*
	 * 分类标识
	 */
	private String categoryID;

	/*
	 * type 0,全部代理;1,按模板;2,按分类
	 */
	private int type;
	/**
	 * @return Returns the assignee.
	 */
	private String categoryName;
	
	public String getCategoryName() {
		return categoryName;
	}
	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}
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
	public String getAssigner() {
		return assigner;
	}
	/**
	 * @param assigner The assigner to set.
	 */
	public void setAssigner(String assigner) {
		this.assigner = assigner;
	}
	/**
	 * @return Returns the etime.
	 */
	public String getEtime() {
		return etime;
	}
	/**
	 * @param etime The etime to set.
	 */
	public void setEtime(String etime) {
		this.etime = etime;
	}
	/**
	 * @return Returns the stime.
	 */
	public String getStime() {
		return stime;
	}
	/**
	 * @param stime The stime to set.
	 */
	public void setStime(String stime) {
		this.stime = stime;
	}
	/**
	 * @return Returns the id.
	 */
	public String getId() {
		return id;
	}
	/**
	 * @param id The id to set.
	 */
	public void setId(String id) {
		this.id = id;
	}
	public String getAssigneeName() {
		return assigneeName;
	}
	public void setAssigneeName(String assigneeName) {
		this.assigneeName = assigneeName;
	}
	public int getAssigneeType() {
		return assigneeType;
	}
	public void setAssigneeType(int assigneeType) {
		this.assigneeType = assigneeType;
	}
	public String getAssignerName() {
		return assignerName;
	}
	public void setAssignerName(String assignerName) {
		this.assignerName = assignerName;
	}
	public int getAssignerType() {
		return assignerType;
	}
	public void setAssignerType(int assignerType) {
		this.assignerType = assignerType;
	}
	public String getCategoryID() {
		return categoryID;
	}
	public void setCategoryID(String categoryID) {
		this.categoryID = categoryID;
	}
	public String getCreateID() {
		return createID;
	}
	public void setCreateID(String createID) {
		this.createID = createID;
	}
	public String getCreateName() {
		return createName;
	}
	public void setCreateName(String createName) {
		this.createName = createName;
	}
	public String getProcessID() {
		return processID;
	}
	public void setProcessID(String processID) {
		this.processID = processID;
	}
	public String getProcessName() {
		return processName;
	}
	public void setProcessName(String processName) {
		this.processName = processName;
	}
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
	}
	

}