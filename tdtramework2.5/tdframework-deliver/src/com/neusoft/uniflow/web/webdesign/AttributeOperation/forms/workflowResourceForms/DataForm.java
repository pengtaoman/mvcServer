package com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.workflowResourceForms;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionMapping;


public class DataForm extends WorkflowResourceForm{
	private static final long serialVersionUID = 1111110;
	
	private String mergeRule = null;
	private String dataType = null;
	private String defaultValue = null;
	private String handleClass = null;
	
	public void reset(ActionMapping mapping , HttpServletRequest request){
		mergeRule = null;
		dataType = null;
		defaultValue = null;
	}

	public String getMergeRule() {
		return mergeRule;
	}

	public void setMergeRule(String mergeRule) {
		this.mergeRule = mergeRule;
	}

	public String getDataType() {
		return dataType;
	}

	public void setDataType(String dataType) {
		this.dataType = dataType;
	}

	public String getDefaultValue() {
		return defaultValue;
	}

	public void setDefaultValue(String defaultValue) {
		this.defaultValue = defaultValue;
	}

	public String getHandleClass() {
		return handleClass;
	}

	public void setHandleClass(String handleClass) {
		this.handleClass = handleClass;
	}
	
	
}
