package com.neusoft.uniflow.web.management.procdefmgt.forms;



 
import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.web.common.list.OpenListForm;

public class CategoryResourceForm   extends OpenListForm {
	
	private static final long serialVersionUID = 123456732;
	  private String parentIdStore;
	  public void reset(ActionMapping mapping, HttpServletRequest request) {
	    super.reset(mapping, request);
	    parentIdStore = "";
	  }

	  public String getParentIdStore() {
	    return parentIdStore;
	  }
	  public void setParentIdStore(String operation) {
	    this.parentIdStore = operation;
	  }
}