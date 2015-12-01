package com.neusoft.uniflow.web.webdesign.procmodify.beans;


import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.web.common.list.OpenListForm;

public class ProcModifyForm
    extends OpenListForm {
  /**
	 * 
	 */
	private static final long serialVersionUID = -7817163245545557531L;
private String operation;
  public void reset(ActionMapping mapping, HttpServletRequest request) {
    super.reset(mapping, request);
    operation = "";
  }

  public String getOperation() {
    return operation;
  }
  public void setOperation(String operation) {
    this.operation = operation;
  }

}