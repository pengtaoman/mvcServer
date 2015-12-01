package com.neusoft.uniflow.web.management.procdefauthoriy.form;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;

public class AuthorityForm extends ActionForm {
	private static final long serialVersionUID = 1234567817;
  public static String ACTION_UPDATE = "update";
  public static String ACTION_UPDATE_OK = "ok";
  private String action;
	private boolean editable = true;
	private String[] steps;


  public void reset(ActionMapping mapping, HttpServletRequest request)
  {
    action = "";
    steps =  new String[0];
  }

  public String getAction() {
    return action;
  }
  public void setAction(String action) {
    this.action = action;
  }
	
	public String[] getSteps()
	{
		return steps;
	}
	public void setSteps(String[] steps)
	{
		this.steps = steps;
	}
}
