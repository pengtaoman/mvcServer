/*
 * Created on 2004-12-16
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.uniflow.web.monitor.procinst.forms;

import java.util.Vector;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;


public class ParallelBranchForm extends ActionForm {
	private static final long serialVersionUID = 12345613;
	private Vector list;
	private String action="";
	private String[] checked={};
	private String parallelid;
	public void reset(ActionMapping mapping, HttpServletRequest request)
	{
		list = new Vector(10, 5);
        action = "";
        parallelid="";
	}
	public Vector getList(){
		return list;
	}

	public void setList(Vector list){
		this.list = list;
	}

	public String getAction() {
	  return action;
	}
	public void setAction(String action) {
	  this.action = action;
	}
	public void setChecked(String[] check){
		this.checked = check;
	}
	public String[] getChecked(){
		return this.checked;
	}
	public String getParallelid() {
		return parallelid;
	}
	public void setParallelid(String parallelid) {
		this.parallelid = parallelid;
	}

}
