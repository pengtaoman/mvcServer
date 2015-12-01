package com.neusoft.uniflow.web.standard.workitemmgt.operation.forms;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;
/**
 * <p>Title: uniflow 3.5 web client</p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) 2003</p>
 * <p>Company: neusoft</p>
 * @author xingtj
 * @version 1.0
 */

public class NexttoForm extends ActionForm {
	private static final long serialVersionUID = 1234567818;
  private String[] nextto;
  private String workitemID;
  private String action;

  public void reset(ActionMapping mapping, HttpServletRequest request)
  {
    nextto = new String[0];
    workitemID = "";
    action = "";
  }
  public String[] getNextto() {
    return nextto;
  }
  public void setNextto(String[] nextto) {
    this.nextto = nextto;
  }
  public String getWorkitemID() {
    return workitemID;
  }
  public void setWorkitemID(String workitemID) {
    this.workitemID = workitemID;
  }
  public String getAction() {
    return action;
  }
  public void setAction(String action) {
    this.action = action;
  }
}