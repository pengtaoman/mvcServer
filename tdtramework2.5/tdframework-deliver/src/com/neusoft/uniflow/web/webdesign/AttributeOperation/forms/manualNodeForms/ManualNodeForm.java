package com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.manualNodeForms;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.ActivityNodeForm;
import com.neusoft.workflow.model.Participant;


public class ManualNodeForm extends ActivityNodeForm{
	private static final long serialVersionUID = 1111101;
	
	private Participant [] Participants=null;
	private String primaryPreDefine = null;
	private String minorPreDefine = null;
	private String primaryPerson = null;
	private String minorPerson = null;
	private String primaryRole = null;
	private String minorRole = null;
	
	private String primaryPeople = "";
	private String minorPeople = "";
	
	private String primaryPeopleName = "";
	private String minorPeopleName = "";
	
	private String application="";
	private String applicationName = "";
	private String applicationParams="";
	
	private String assignRule="0";
	private String opertionLevel="0";
	
	private String punit = "";//为设置主送参与人显示
	private String munit = "";//为设置抄送参与人显示
	private String exAlertActionName = "";
	private String exActionName = "";
	private String action;
	private String participantsName = "";
	private String nodeArraryString = "";
	private String variablesString = "";
	private String minorNodeArraryString = "";
	private String minorVariablesString = "";
	public void reset(ActionMapping mapping , HttpServletRequest request){
		Participants=null;
		application=null;
		applicationParams=null;
		assignRule=null;
		action=null;
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

	public String getAction() {
		return action;
	}

	public void setAction(String action) {
		this.action = action;
	}



	public Participant[] getParticipants() {

		return Participants;
	}



	public void setParticipants(Participant[] participants) {
		Participants = participants;
	}

	public String getAssignRule() {
		return assignRule;
	}

	public void setAssignRule(String assignRule) {
		this.assignRule = assignRule;
	}

	public String getOpertionLevel() {
		return opertionLevel;
	}

	public void setOpertionLevel(String opertionLevel) {
		this.opertionLevel = opertionLevel;
	}


	public String getPrimaryPreDefine() {
		return primaryPreDefine;
	}

	public void setPrimaryPreDefine(String primaryPreDefine) {
		this.primaryPreDefine = primaryPreDefine;
	}

	public String getMinorPreDefine() {
		return minorPreDefine;
	}

	public void setMinorPreDefine(String minorPreDefine) {
		this.minorPreDefine = minorPreDefine;
	}

	public String getPrimaryPerson() {
		return primaryPerson;
	}

	public void setPrimaryPerson(String primaryPerson) {
		this.primaryPerson = primaryPerson;
	}

	public String getMinorPerson() {
		return minorPerson;
	}

	public void setMinorPerson(String minorPerson) {
		this.minorPerson = minorPerson;
	}

	public String getPrimaryRole() {
		return primaryRole;
	}

	public void setPrimaryRole(String primaryRole) {
		this.primaryRole = primaryRole;
	}

	public String getMinorRole() {
		return minorRole;
	}

	public void setMinorRole(String minorRole) {
		this.minorRole = minorRole;
	}

	public String getPrimaryPeople() {
		return primaryPeople;
	}

	public void setPrimaryPeople(String primaryPeople) {
		this.primaryPeople = primaryPeople;
	}

	public String getMinorPeople() {
		return minorPeople;
	}

	public void setMinorPeople(String minorPeople) {
		this.minorPeople = minorPeople;
	}

	public String getPrimaryPeopleName() {
		return primaryPeopleName;
	}

	public void setPrimaryPeopleName(String primaryPeopleName) {
		this.primaryPeopleName = primaryPeopleName;
	}

	public String getMinorPeopleName() {
		return minorPeopleName;
	}

	public void setMinorPeopleName(String minorPeopleName) {
		this.minorPeopleName = minorPeopleName;
	}

	public String getApplicationName() {
		return applicationName;
	}

	public void setApplicationName(String applicationName) {
		this.applicationName = applicationName;
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

	public String getParticipantsName() {
		return participantsName;
	}

	public void setParticipantsName(String participantsName) {
		this.participantsName = participantsName;
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

	public String getNodeArraryString() {
		return nodeArraryString;
	}

	public void setNodeArraryString(String nodeArraryString) {
		this.nodeArraryString = nodeArraryString;
	}

	public String getVariablesString() {
		return variablesString;
	}

	public void setVariablesString(String variablesString) {
		this.variablesString = variablesString;
	}

	public String getMinorVariablesString() {
		return minorVariablesString;
	}

	public void setMinorVariablesString(String minorVariablesString) {
		this.minorVariablesString = minorVariablesString;
	}

	public String getMinorNodeArraryString() {
		return minorNodeArraryString;
	}

	public void setMinorNodeArraryString(String minorNodeArraryString) {
		this.minorNodeArraryString = minorNodeArraryString;
	}

}