
package com.neusoft.uniflow.web.management.applicationmgt.forms;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.web.common.list.OpenListForm;


public class AppMgrForm extends OpenListForm {
	private static final long serialVersionUID = 1234567213;
	private String operation;
	private String selecttype="";
		
	public void reset(ActionMapping mapping, HttpServletRequest request){
		selecttype="";
	}
	
	public AppMgrForm(){
    }  
	public void setOperation(String opr){
		this.operation = opr;
	}
	public String getOperation(){
		return this.operation;
	}		  
	public String getSelecttype() {
		return selecttype;
	}	
	public void setSelecttype(String selecttype) {
		this.selecttype = selecttype;
	}

}
