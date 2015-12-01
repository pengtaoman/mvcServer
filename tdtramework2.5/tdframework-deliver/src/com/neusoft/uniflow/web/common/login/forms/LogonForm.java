package com.neusoft.uniflow.web.common.login.forms;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;

public class LogonForm extends ActionForm {
	private static final long serialVersionUID = 1234567822;
  private String pwd;
  private String usrname;
  private String language="zh";
  public void setPwd(String pwd) {
    this.pwd = pwd;
  }
  public String getPwd() {
    return pwd;
  }
  public void setUsrname(String usrname) {
    this.usrname = usrname;
  }
  public String getUsrname() {
    return usrname;
  }
  public void reset(ActionMapping mapping, HttpServletRequest request)
  {
     // pwd = null;
     // usrname = null;
  }
public String getLanguage() {
	return language;
}
public void setLanguage(String language) {
	this.language = language;
}

//  public ActionErrors validate(ActionMapping mapping, HttpServletRequest request)
//  {
//      ActionErrors errors = new ActionErrors();
//      if(usrname == null || usrname.length() < 1)
//	  errors.add("username", new ActionError("error.username.required"));
//      if(pwd == null || pwd.length() < 1)
//	  errors.add("password", new ActionError("error.password.required"));
//
//      return errors;
//  }

}