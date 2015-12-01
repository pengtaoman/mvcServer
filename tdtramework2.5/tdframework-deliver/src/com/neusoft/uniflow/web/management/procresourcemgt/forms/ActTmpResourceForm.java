package com.neusoft.uniflow.web.management.procresourcemgt.forms;


	

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.web.common.list.OpenListForm;

public class ActTmpResourceForm  extends OpenListForm {
	
	  private static final long serialVersionUID = 12345676;
	  private String operation;
	  private String parentIdStore;
	  private String deleteId;
	  public void reset(ActionMapping mapping, HttpServletRequest request) {
	    super.reset(mapping, request);
	    operation = "";
	    parentIdStore="";
	    deleteId="all";
	  }
	  public String getParentIdStore() {
		    return parentIdStore;
		  }
	  public void setParentIdStore(String operation) {
		    this.parentIdStore = operation;
		  }
	  public String getOperation() {
	    return operation;
	  }
	  public void setOperation(String operation) {
	    this.operation = operation;
	  }
	  public String getDeleteId(){
		  return deleteId;
	  }
	  public void setDeleteId(String deleteId){
		  this.deleteId=deleteId;
	  }
	
}

