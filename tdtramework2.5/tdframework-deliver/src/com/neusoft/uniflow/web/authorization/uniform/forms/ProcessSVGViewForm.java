package com.neusoft.uniflow.web.authorization.uniform.forms;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;

public class ProcessSVGViewForm extends ActionForm {
	private static final long serialVersionUID = 1234567820;
	private String processid;
	private String version;
	public void reset(ActionMapping mapping, HttpServletRequest request){
		super.reset(mapping,request);
		this.processid = "";
		this.version = "";
	}
	public String getProcessid() {
		return processid;
	}
	public void setProcessid(String processid) {
		this.processid = processid;
	}
	public String getVersion() {
		return version;
	}
	public void setVersion(String version) {
		this.version = version;
	}

}
