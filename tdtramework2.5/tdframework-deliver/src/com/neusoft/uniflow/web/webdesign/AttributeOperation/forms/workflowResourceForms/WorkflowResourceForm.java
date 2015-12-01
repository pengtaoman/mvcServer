package com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.workflowResourceForms;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;

public class WorkflowResourceForm extends ActionForm{
	private static final long serialVersionUID = 1111110;
	
	private String name = null;
	private String desc = null;
	private String id = null;
	
	private String xmlStr = null;
	
	public void reset(ActionMapping mapping , HttpServletRequest request){
    	id = null;
    	name = null;
    	desc = null;
    }

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getXmlStr() {
		return xmlStr;
	}

	public void setXmlStr(String xmlStr) {
		this.xmlStr = xmlStr;
	}
	
	
}
