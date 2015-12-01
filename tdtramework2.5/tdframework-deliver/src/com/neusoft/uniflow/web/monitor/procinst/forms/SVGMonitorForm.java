package com.neusoft.uniflow.web.monitor.procinst.forms;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;

public class SVGMonitorForm extends ActionForm {
	private static final long serialVersionUID = 1234567813;
	private String procinstid;
	private String operation;
	public void reset(ActionMapping mapping, HttpServletRequest request) {
		super.reset(mapping, request);
		this.procinstid = "";
		this.operation = "";
	}

	public String getOperation() {
		return operation;
	}

	public void setOperation(String operation) {
		this.operation = operation;
	}

	public String getProcinstid() {
		return procinstid;
	}

	public void setProcinstid(String procinstid) {
		this.procinstid = procinstid;
	}

}
