package com.neusoft.uniflow.web.test.forms;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;

public class StartProcForm extends ActionForm {
	private static final long serialVersionUID = 1234567822;

	private String operation="";
	private String tsbj="";
	private String wid="";

	public void reset(ActionMapping mapping, HttpServletRequest request) {

	}

	public String getOperation() {
		return operation;
	}

	public void setOperation(String operation) {
		this.operation = operation;
	}

	public String getTsbj() {
		return tsbj;
	}

	public void setTsbj(String tsbj) {
		this.tsbj = tsbj;
	}

	public String getWid() {
		return wid;
	}

	public void setWid(String wid) {
		this.wid = wid;
	}



}