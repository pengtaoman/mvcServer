
package com.neusoft.uniflow.web.monitor.procdef.forms;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.web.common.list.OpenListForm;


public class ApplicationListForm extends OpenListForm {	
	private static final long serialVersionUID = 1234567815;
	private String actDefID="";
	private String state="";
	public void reset(ActionMapping mapping, HttpServletRequest request){
		actDefID="";
		state="";
	}
	public String getActDefID() {
		return actDefID;
	}
	public void setActDefID(String actDefID) {
		this.actDefID = actDefID;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}

}
