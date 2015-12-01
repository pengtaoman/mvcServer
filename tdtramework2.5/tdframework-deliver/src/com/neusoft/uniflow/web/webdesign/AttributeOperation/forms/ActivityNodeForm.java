package com.neusoft.uniflow.web.webdesign.AttributeOperation.forms;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionMapping;

import com.neusoft.workflow.model.Expiration;

public class ActivityNodeForm extends NodeForm{
	private static final long serialVersionUID = 1111110;
	
    private Expiration expiration=null;
    private String varOrDur="0";
    private String duration="0";
    private String variable="";
    private String actionType="0";
    private String actionApplication="";
    private String actionAppName = "";
    private String alertVarOrDur = "0";
    private String alertVariable="";
    private String alertDuration="0";
    private String alertActionType="0";
    private String alertActionApplication="";
    private String alertActionAppName = "";
    private String alertActionCount="1";
    private String alertActionInterval="0";
    
    private String preCondition="";
    
    private String postCondition="";
    
    
    private String msgReceiver = "";
    
    private String events = "";
    
    private String category=null;
    
    public void reset(ActionMapping mapping , HttpServletRequest request){
    	expiration=null;
    	category=null;
    }

	public Expiration getExpiration() {
		return expiration;
	}

	public void setExpiration(Expiration expiration) {
		this.expiration = expiration;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}


	public String getActionType() {
		return actionType;
	}

	public void setActionType(String actionType) {
		this.actionType = actionType;
	}

	public String getAlertActionType() {
		return alertActionType;
	}

	public void setAlertActionType(String alertActionType) {
		this.alertActionType = alertActionType;
	}

	public String getAlertActionApplication() {
		return alertActionApplication;
	}

	public void setAlertActionApplication(String alertActionApplication) {
		this.alertActionApplication = alertActionApplication;
	}

	public String getAlertActionCount() {
		return alertActionCount;
	}

	public void setAlertActionCount(String alertActionCount) {
		this.alertActionCount = alertActionCount;
	}

	public String getAlertActionInterval() {
		return alertActionInterval;
	}

	public void setAlertActionInterval(String alertActionInterval) {
		this.alertActionInterval = alertActionInterval;
	}

	public String getVarOrDur() {
		return varOrDur;
	}

	public void setVarOrDur(String varOrDur) {
		this.varOrDur = varOrDur;
	}

	public String getDuration() {
		return duration;
	}

	public void setDuration(String duration) {
		this.duration = duration;
	}

	public String getVariable() {
		return variable;
	}

	public void setVariable(String variable) {
		this.variable = variable;
	}

	public String getAlertVarOrDur() {
		return alertVarOrDur;
	}

	public void setAlertVarOrDur(String alertVarOrDur) {
		this.alertVarOrDur = alertVarOrDur;
	}

	public String getAlertVariable() {
		return alertVariable;
	}

	public void setAlertVariable(String alertVariable) {
		this.alertVariable = alertVariable;
	}

	public String getAlertDuration() {
		return alertDuration;
	}

	public void setAlertDuration(String alertDuration) {
		this.alertDuration = alertDuration;
	}

	public String getActionApplication() {
		return actionApplication;
	}

	public void setActionApplication(String actionApplication) {
		this.actionApplication = actionApplication;
	}

	public String getActionAppName() {
		return actionAppName;
	}

	public void setActionAppName(String actionAppName) {
		this.actionAppName = actionAppName;
	}

	public String getAlertActionAppName() {
		return alertActionAppName;
	}

	public void setAlertActionAppName(String alertActionAppName) {
		this.alertActionAppName = alertActionAppName;
	}
	
	public String getEvents() {
		return events;
	}

	public void setEvents(String events) {
		this.events = events;
	}

	public String getMsgReceiver() {
		return msgReceiver;
	}

	public void setMsgReceiver(String msgReceiver) {
		this.msgReceiver = msgReceiver;
	}

	public String getPreCondition() {
		return preCondition;
	}

	public void setPreCondition(String preCondition) {
		this.preCondition = preCondition;
	}

	public String getPostCondition() {
		return postCondition;
	}

	public void setPostCondition(String postCondition) {
		this.postCondition = postCondition;
	}


}