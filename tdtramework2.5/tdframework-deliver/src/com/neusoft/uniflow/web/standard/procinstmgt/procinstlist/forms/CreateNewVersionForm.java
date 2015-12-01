package com.neusoft.uniflow.web.standard.procinstmgt.procinstlist.forms;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;

public class CreateNewVersionForm extends ActionForm {
	private String proinstId;
	private String proinstName;
	private String operation;
	public void rest(ActionMapping mapping,HttpServletRequest request){
		proinstId="";
		proinstName="";
		operation="";
	}
	public String getOperation() {
		return operation;
	}
	public void setOperation(String operation) {
		this.operation = operation;
	}
	public String getProinstId() {
		return proinstId;
	}
	public void setProinstId(String proinstId) {
		this.proinstId = proinstId;
	}
	public String getProinstName() {
		return proinstName;
	}
	public void setProinstName(String proinstName) {
		this.proinstName = proinstName;
	}
}
