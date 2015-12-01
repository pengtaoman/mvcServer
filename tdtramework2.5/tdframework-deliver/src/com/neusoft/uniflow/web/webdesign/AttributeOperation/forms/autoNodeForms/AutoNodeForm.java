package com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.autoNodeForms;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.ActivityNodeForm;

public class AutoNodeForm extends ActivityNodeForm{
	private static final long serialVersionUID = 1111000;
	
	private String application=null;
	private String applicationParams=null;
	private String exAlertActionName = "";
	private String exActionName = "";
	private String applicationName = "";
	public String getApplicationName() {
		return applicationName;
	}

	public void setApplicationName(String applicationName) {
		this.applicationName = applicationName;
	}

	public String getExAlertActionName() {
		return exAlertActionName;
	}

	public void setExAlertActionName(String exAlertActionName) {
		this.exAlertActionName = exAlertActionName;
	}

	public String getExActionName() {
		return exActionName;
	}

	public void setExActionName(String exActionName) {
		this.exActionName = exActionName;
	}

	public void reset(ActionMapping mapping , HttpServletRequest request){	
		application=null;
		applicationParams=null;
	}

	public String getApplication() {
		return application;
	}

	public void setApplication(String application) {
		this.application = application;
	}

	public String getApplicationParams() {
		return applicationParams;
	}

	public void setApplicationParams(String applicationParams) {
		this.applicationParams = applicationParams;
	}

	
}
