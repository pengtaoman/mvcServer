package com.neusoft.uniflow.web.webdesign.AttributeOperation.forms;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;

public class ForwardForm extends ActionForm{
	private static final long serialVersionUID = 1111111;
	
	private String xmlStr = null;
	private String id = null;
	private String type = null;
	// For midea
	private String flag = "ok";
	private String isNewVersion = "";
	private String editable = "true";
	private String operatable = "false";
	
	public void reset(ActionMapping mapping , HttpServletRequest request){
		id=null;
		type=null;
		xmlStr = null;
	}

	public String getXmlStr() {
		return xmlStr;
	}

	public void setXmlStr(String xmlStr) {
		this.xmlStr = xmlStr;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getFlag() {
		return flag;
	}

	public void setFlag(String flag) {
		this.flag = flag;
	}

	public String getIsNewVersion() {
		return isNewVersion;
	}

	public void setIsNewVersion(String isNewVersion) {
		this.isNewVersion = isNewVersion;
	}

	public String getEditable() {
		return editable;
	}

	public void setEditable(String editable) {
		this.editable = editable;
	}

	public String getOperatable() {
		return operatable;
	}

	public void setOperatable(String operatable) {
		this.operatable = operatable;
	}
	
	
}
