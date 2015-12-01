package com.neusoft.uniflow.web.management.procdefmgt.forms;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.web.common.list.OpenListForm;

public class ProcVerManagementForm extends OpenListForm {
	
	private String operation;
	
	private String procdefID;

	private String procdefName;
	
	private String procTemVersion;

	private String procdefBuilder;

	private String procdefBuilderTime;
	
	private String procdefBuilderTime_show;
	
	private String procdefCategory;
	
	public void reset(ActionMapping mapping, HttpServletRequest request) {
		super.reset(mapping, request);
		operation = "";
		procdefName="";
		procdefBuilderTime="";
		procdefBuilderTime_show="";
		procdefCategory="";
	}

	public String getOperation() {
		return operation;
	}

	public void setOperation(String operation) {
		this.operation = operation;
	}

	public String getProcdefName() {
		return procdefName;
	}

	public void setProcdefName(String procdefName) {
		this.procdefName = procdefName;
	}

	public String getProcdefBuilder() {
		return procdefBuilder;
	}

	public void setProcdefBuilder(String procdefBuilder) {
		this.procdefBuilder = procdefBuilder;
	}

	public String getProcdefBuilderTime() {
		return procdefBuilderTime;
	}

	public void setProcdefBuilderTime(String procdefBuilderTime) {
		this.procdefBuilderTime = procdefBuilderTime;
	}

	public String getProcdefBuilderTime_show() {
		return procdefBuilderTime_show;
	}

	public void setProcdefBuilderTime_show(String procdefBuilderTime_show) {
		this.procdefBuilderTime_show = procdefBuilderTime_show;
	}

	public String getProcdefCategory() {
		return procdefCategory;
	}

	public void setProcdefCategory(String procdefCategory) {
		this.procdefCategory = procdefCategory;
	}

	public String getProcdefID() {
		return procdefID;
	}

	public void setProcdefID(String procdefID) {
		this.procdefID = procdefID;
	}

	public String getProcTemVersion() {
		return procTemVersion;
	}

	public void setProcTemVersion(String procTemVersion) {
		this.procTemVersion = procTemVersion;
	}

}
