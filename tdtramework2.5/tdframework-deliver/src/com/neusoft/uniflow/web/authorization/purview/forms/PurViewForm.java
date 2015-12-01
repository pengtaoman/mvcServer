package com.neusoft.uniflow.web.authorization.purview.forms;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.web.common.list.OpenListForm;

public class PurViewForm extends OpenListForm {
	private static final long serialVersionUID = 1234567123;
	private String type;
	
	public void setType(String type){
		this.type = type;
	}
	public String getType(){
		return this.type;
	}
	public void reset(ActionMapping mapping, HttpServletRequest request) {
	
	}


}