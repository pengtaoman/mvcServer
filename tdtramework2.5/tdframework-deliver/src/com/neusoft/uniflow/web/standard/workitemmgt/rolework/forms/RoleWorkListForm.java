package com.neusoft.uniflow.web.standard.workitemmgt.rolework.forms;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.web.common.list.OpenListForm;

public class RoleWorkListForm extends OpenListForm {
	private static final long serialVersionUID = 1234567825;
	private String operation;

	private String state = "";

	public void reset(ActionMapping mapping, HttpServletRequest request) {
		super.reset(mapping, request);
		operation = "";
	}

	public String getOperation() {
		return operation;
	}

	public void setOperation(String action) {
		this.operation = action;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

}