package com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.procForms;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.ActivityNodeForm;
import com.neusoft.workflow.model.Participant;

public class ProcForm extends ActivityNodeForm{
	private static final long serialVersionUID = 1111110;
	
	private String versionName = null;
	private String builder = null;
	private String buildTime = null;
	private String modifiedTime = null;

	
	private String validCreators = "";
	private String validCreatorsName = "";
	private String monitors = "";
	private String monitorsName = "";
	private String exAlertActionName = "";
	private String exActionName = "";
	private String variableJson="";
	private String punit = "";
	private String munit = "";
    //For midea	
	private String canModifyFlow = "false"; 
	
	private String action = null;
	
	public void reset(ActionMapping mapping , HttpServletRequest request){
    	versionName=null;
    	builder=null;
    	buildTime=null;
    	modifiedTime=null;
    	action=null;
    }

	public String getVersionName() {
		return versionName;
	}

	public void setVersionName(String versionName) {
		this.versionName = versionName;
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

	public String getModifiedTime() {
		return modifiedTime;
	}

	public void setModifiedTime(String modifiedTime) {
		this.modifiedTime = modifiedTime;
	}

	public String getAction() {
		return action;
	}

	public void setAction(String action) {
		this.action = action;
	}

	

	
	public String getValidCreators() {
		return validCreators;
	}

	public void setValidCreators(String validCreators) {
		this.validCreators = validCreators;
	}

	public String getMonitors() {
		return monitors;
	}

	public void setMonitors(String monitors) {
		this.monitors = monitors;
	}

	public String getValidCreatorsName() {
		return validCreatorsName;
	}

	public void setValidCreatorsName(String validCreatorsName) {
		this.validCreatorsName = validCreatorsName;
	}

	public String getMonitorsName() {
		return monitorsName;
	}

	public void setMonitorsName(String monitorsName) {
		this.monitorsName = monitorsName;
	}

	public String getPunit() {
		return punit;
	}

	public void setPunit(String punit) {
		this.punit = punit;
	}

	public String getMunit() {
		return munit;
	}

	public void setMunit(String munit) {
		this.munit = munit;
	}

	public String getCanModifyFlow() {
		return canModifyFlow;
	}

	public void setCanModifyFlow(String canModifyFlow) {
		this.canModifyFlow = canModifyFlow;
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

	public String getVariableJson() {
		return variableJson;
	}

	public void setVariableJson(String variableJson) {
		this.variableJson = variableJson;
	}

}
