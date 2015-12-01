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


public class NextActForm extends ActionForm {
	private static final long serialVersionUID = 12345613;
	private String workitemID;
	private String action="";
	private String expand = "";
	private String select = "";
	public void reset(ActionMapping mapping, HttpServletRequest request)
	{
        workitemID = "";
        expand = "";
        select = "";
        action = "";
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
	public String getExpand() {
		return expand;
	}
	public void setExpand(String expand) {
		this.expand = expand;
	}
	public String getSelect() {
		return select;
	}
	public void setSelect(String select) {
		this.select = select;
	}


}
