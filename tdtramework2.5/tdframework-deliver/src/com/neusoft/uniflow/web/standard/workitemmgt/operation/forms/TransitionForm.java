package com.neusoft.uniflow.web.standard.workitemmgt.operation.forms;

import java.util.Vector;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;

public class TransitionForm extends ActionForm {
	
	public Vector transitionList;
	
	public String action;
	
	public String workItemId;
	
	public String transitionId;
	
	public void reset(ActionMapping mapping,HttpServletRequest request){
		transitionList=new Vector();
		
		action="";
		
		workItemId="";
	}

	public String getAction() {
		return action;
	}

	public void setAction(String action) {
		this.action = action;
	}

	public Vector getTransitionList() {
		return transitionList;
	}

	public void setTransitionList(Vector transitionList) {
		this.transitionList = transitionList;
	}

	public String getWorkItemId() {
		return workItemId;
	}

	public void setWorkItemId(String workItemId) {
		this.workItemId = workItemId;
	}

	public String getTransitionId() {
		return transitionId;
	}

	public void setTransitionId(String transitionId) {
		this.transitionId = transitionId;
	}
	
	

}
