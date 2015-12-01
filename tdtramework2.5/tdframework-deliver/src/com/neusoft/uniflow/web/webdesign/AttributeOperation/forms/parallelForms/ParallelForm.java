package com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.parallelForms;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.ActivityNodeForm;


public class ParallelForm extends ActivityNodeForm{
	private static final long serialVersionUID = 1111101;
	private String application="";
	private String applicationName = "";
	private String applicationParams="";
	private String action;
	private String exAlertActionName = "";
	private String exActionName = "";
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

	public String getApplicationName() {
		return applicationName;
	}

	public void setApplicationName(String applicationName) {
		this.applicationName = applicationName;
	}



	

}
