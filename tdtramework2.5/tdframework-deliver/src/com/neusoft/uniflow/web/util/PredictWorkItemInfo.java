package com.neusoft.uniflow.web.util;

import java.util.Date;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Map;
import java.util.Vector;

import com.neusoft.uniflow.api.NWSessionImpl;
import com.neusoft.uniflow.api.def.NWActDef;
import com.neusoft.uniflow.engine.def.WorkItemInfo;
import com.neusoft.uniflow.engine.operator.Operator;
import com.neusoft.uniflow.persistence.IPersistence;

public class PredictWorkItemInfo {	

	private WorkItemInfo workItemInfo;
	
	private String category;

	private int actionType;

	private int userType;

	private String userName;	

	private String userID;

	private int wiType;

	private int operationLevel;

	private int priority;

	private boolean needCommitRole;

	private String description;

	private String extProp;

	private int flowDirection = 0;

	private Hashtable extProperties;

	private String businessKey = "";

	private String departID = "";
	
	private String name = "";

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public WorkItemInfo getWorkItemInfo() {
		return workItemInfo;
	}

	public void setWorkItemInfo(WorkItemInfo workItemInfo) {
		this.workItemInfo = workItemInfo;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public int getActionType() {
		return actionType;
	}

	public void setActionType(int actionType) {
		this.actionType = actionType;
	}

	public int getUserType() {
		return userType;
	}

	public void setUserType(int userType) {
		this.userType = userType;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getUserID() {
		return userID;
	}

	public void setUserID(String userID) {
		this.userID = userID;
	}

	public int getWiType() {
		return wiType;
	}

	public void setWiType(int wiType) {
		this.wiType = wiType;
	}

	public int getOperationLevel() {
		return operationLevel;
	}

	public void setOperationLevel(int operationLevel) {
		this.operationLevel = operationLevel;
	}

	public int getPriority() {
		return priority;
	}

	public void setPriority(int priority) {
		this.priority = priority;
	}

	public boolean isNeedCommitRole() {
		return needCommitRole;
	}

	public void setNeedCommitRole(boolean needCommitRole) {
		this.needCommitRole = needCommitRole;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getExtProp() {
		return extProp;
	}

	public void setExtProp(String extProp) {
		this.extProp = extProp;
	}

	public int getFlowDirection() {
		return flowDirection;
	}

	public void setFlowDirection(int flowDirection) {
		this.flowDirection = flowDirection;
	}

	public Hashtable getExtProperties() {
		return extProperties;
	}

	public void setExtProperties(Hashtable extProperties) {
		this.extProperties = extProperties;
	}

	public String getBusinessKey() {
		return businessKey;
	}

	public void setBusinessKey(String businessKey) {
		this.businessKey = businessKey;
	}

	public String getDepartID() {
		return departID;
	}

	public void setDepartID(String departID) {
		this.departID = departID;
	}
	
	

}
