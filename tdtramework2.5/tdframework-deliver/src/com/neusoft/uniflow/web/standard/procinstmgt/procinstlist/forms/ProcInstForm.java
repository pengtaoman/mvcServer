package com.neusoft.uniflow.web.standard.procinstmgt.procinstlist.forms;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.web.common.list.OpenListForm;

public class ProcInstForm extends OpenListForm {
	private static final long serialVersionUID = 123456715;

	private String operation;

	private String state = "";

	private String curstate;

	private String procInstState;

	private String procInstName;

	private String procInstCategory;

	private String procdefBuilderTime;

	private String procinstBuilder;

	private String procdefBuilderTime_show;
	
	private String endTime;
	
	private String endTime_show;
	
	private String 	orgunitId;
	
	public void reset(ActionMapping mapping, HttpServletRequest request) {
		super.reset(mapping, request);
		operation = "";
		procInstState = "";
		procInstName = "";
		procInstCategory = "";
		procdefBuilderTime = "";
		procinstBuilder = "";
		procdefBuilderTime_show = "";
		endTime="";
		endTime_show="";
		orgunitId="";
	}

	public String getOperation() {
		return operation;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getState() {
		return state;
	}

	public void setOperation(String operation) {
		this.operation = operation;
	}

	public String getCurstate() {
		return curstate;
	}

	public void setCurstate(String curstate) {
		this.curstate = curstate;
	}

	public String getProcdefBuilderTime() {
		return procdefBuilderTime;
	}

	public void setProcdefBuilderTime(String procdefBuilderTime) {
		this.procdefBuilderTime = procdefBuilderTime;
	}

	public String getProcinstBuilder() {
		return procinstBuilder;
	}

	public void setProcinstBuilder(String procinstBuilder) {
		this.procinstBuilder = procinstBuilder;
	}

	public String getProcInstCategory() {
		return procInstCategory;
	}

	public void setProcInstCategory(String procInstCategory) {
		this.procInstCategory = procInstCategory;
	}

	public String getProcInstName() {
		return procInstName;
	}

	public void setProcInstName(String procInstName) {
		this.procInstName = procInstName;
	}

	public String getProcInstState() {
		return procInstState;
	}

	public void setProcInstState(String procInstState) {
		this.procInstState = procInstState;
	}

	public String getProcdefBuilderTime_show() {
		return procdefBuilderTime_show;
	}

	public void setProcdefBuilderTime_show(String procdefBuilderTime_show) {
		this.procdefBuilderTime_show = procdefBuilderTime_show;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	public String getEndTime_show() {
		return endTime_show;
	}

	public void setEndTime_show(String endTime_show) {
		this.endTime_show = endTime_show;
	}

	public String getOrgunitId() {
		return orgunitId;
	}

	public void setOrgunitId(String orgunitId) {
		this.orgunitId = orgunitId;
	}
	
}
