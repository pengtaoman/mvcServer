package com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.workflowResourceForms;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionMapping;

public class AppForm extends WorkflowResourceForm{
	private static final long serialVersionUID = 1111110;
	
	private String appType = "wform";
	private String synchMode = "1";
	private String appUrl = null;
	private String builder = null;
	private String buildTime = null;
	private String appHost = "appmanager";
	//如果是表单类型，则记录表单名称
	private String formName="";
	
	public void reset(ActionMapping mapping , HttpServletRequest request){
		appType = null;
		synchMode = null;
		appUrl = null;
		builder = null;
		buildTime = null;
		appHost = null;
	}

	public String getAppType() {
		return appType;
	}

	public void setAppType(String appType) {
		this.appType = appType;
	}

	public String getSynchMode() {
		return synchMode;
	}

	public void setSynchMode(String synchMode) {
		this.synchMode = synchMode;
	}

	public String getAppUrl() {
		return appUrl;
	}

	public void setAppUrl(String appUrl) {
		this.appUrl = appUrl;
	}

	public String getBuilder() {
		return builder;
	}

	public void setBuilder(String builder) {
		this.builder = builder;
	}

	public String getBuildTime() {
		return buildTime;
	}

	public void setBuildTime(String buildTime) {
		this.buildTime = buildTime;
	}

	public String getAppHost() {
		return appHost;
	}

	public void setAppHost(String appHost) {
		this.appHost = appHost;
	}

	public String getFormName() {
		return formName;
	}

	public void setFormName(String formName) {
		this.formName = formName;
	}
}
