/*
 * Created on 2004-12-16
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.uniflow.web.standard.workitemmgt.operation.forms;


import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;


public class UpdatePartiActionForm extends ActionForm {
	private static final long serialVersionUID = 1234567823;
	private String action;
	private String[] parti;
	private String[] partinew;
	private String activityid = "";
	public void reset(ActionMapping mapping, HttpServletRequest request)
	{
	  this.parti = new String[0];
	  this.partinew = new String[0];
	  this.action= "";
	  activityid="";
	}
	public void setParti(String[] parti) {
	  this.parti = parti;
	}
	public String[] getParti() {
	  return parti;
	}
	public void setParti_new(String[] parti_new) {
	  this.partinew = parti_new;
	}
	public String[] getParti_new() {
	  return partinew;
	}
	public String getAction() {
	  return action;
	}
	public void setAction(String action) {
	  this.action = action;
	}
	public String getActivityid() {
		return activityid;
	}
	public void setActivityid(String activityid) {
		this.activityid = activityid;
	}

}
