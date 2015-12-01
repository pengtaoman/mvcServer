package com.neusoft.uniflow.web.test.forms;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;

public class WorkHandlerForm extends ActionForm {
	private static final long serialVersionUID = 1234567822;

	private String operation="";
	private String wid="";
	private String isRollback="complete";

	public void reset(ActionMapping mapping, HttpServletRequest request) {
		isRollback="complete";

	}

	public String getOperation() {
		return operation;
	}

	public void setOperation(String operation) {
		this.operation = operation;
	}

	public String getWid() {
		return wid;
	}

	public void setWid(String wid) {
		this.wid = wid;
	}

	public String getIsRollback() {
		return isRollback;
	}

	public void setIsRollback(String isRollback) {
		this.isRollback = isRollback;
	}


}