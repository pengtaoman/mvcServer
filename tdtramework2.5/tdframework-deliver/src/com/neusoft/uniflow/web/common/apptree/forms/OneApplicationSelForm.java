package com.neusoft.uniflow.web.common.apptree.forms;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;

public class OneApplicationSelForm  extends ActionForm {
	private static final long serialVersionUID = 103456711;
	private String expand = "";
	private String activityid = "";
	private String choseid = "";
	private String operation = "";
	private String actiontype = "";
	private String opstring = "";
	public void reset(ActionMapping mapping, HttpServletRequest request){
        expand = "";
        activityid = "";
        choseid = "";
        operation = "";
        actiontype = "";
	}
	public String getExpand() {
		return expand;
	}
	public void setExpand(String expand) {
		this.expand = expand;
	}
	public String getActivityid() {
		return activityid;
	}
	public void setActivityid(String activityid) {
		this.activityid = activityid;
	}
	public String getChoseid() {
		return choseid;
	}
	public void setChoseid(String choseid) {
		this.choseid = choseid;
	}
	public String getOperation() {
		return operation;
	}
	public void setOperation(String operation) {
		this.operation = operation;
	}
	public String getActiontype() {
		return actiontype;
	}
	public void setActiontype(String actiontype) {
		this.actiontype = actiontype;
	}
	public String getOpstring() {
		return opstring;
	}
	public void setOpstring(String opstring) {
		this.opstring = opstring;
	}

}
