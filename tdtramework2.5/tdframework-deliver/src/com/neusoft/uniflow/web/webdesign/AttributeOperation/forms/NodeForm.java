package com.neusoft.uniflow.web.webdesign.AttributeOperation.forms;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;

import javax.servlet.http.HttpServletRequest;

public class NodeForm extends ActionForm{
	private static final long serialVersionUID = 1111111;
	
	private String id=null;
	private String name="";
	private String style="";
	private String desc="";
	private String xmlStr = null;
	private String xmlStr1 = null;
	private String extendProperties = "";
	
	public void reset(ActionMapping mapping , HttpServletRequest request){
		id=null;
		name=null;
		style=null;
		desc=null;
		xmlStr = null;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getStyle() {
		return style;
	}

	public void setStyle(String style) {
		this.style = style;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}

	public String getXmlStr() {
		return xmlStr;
	}

	public void setXmlStr(String xmlStr) {
		this.xmlStr = xmlStr;
	}

	public String getXmlStr1() {
		return xmlStr1;
	}

	public void setXmlStr1(String xmlStr1) {
		this.xmlStr1 = xmlStr1;
	}

	public String getExtendProperties() {
		return extendProperties;
	}

	public void setExtendProperties(String extendProperties) {
		this.extendProperties = extendProperties;
	}

}
