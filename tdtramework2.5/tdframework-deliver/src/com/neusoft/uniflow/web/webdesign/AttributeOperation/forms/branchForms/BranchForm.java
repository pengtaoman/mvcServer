package com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.branchForms;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.ActivityNodeForm;


public class BranchForm extends ActivityNodeForm{
	private static final long serialVersionUID = 1111101;
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
}
