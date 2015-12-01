/*
 * Created on 2004-11-24
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.uniflow.web.management.enginecap.forms;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.web.common.list.OpenListForm;


public class OrgStatForm extends OpenListForm {
	private String type;
	private static final long serialVersionUID = 1234567256;
	public void setType(String type){
		this.type = type;
	}
	public String getType(){
		return this.type;
	}
	public void reset(ActionMapping mapping, HttpServletRequest request) {
	
	}


}
