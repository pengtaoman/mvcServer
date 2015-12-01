/*
 * Created on 2004-11-30
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.uniflow.web.monitor.procinst.forms;

import org.apache.struts.action.ActionForm;

public class RollBackForm extends ActionForm{
	private static final long serialVersionUID = 1234567821;
	private String runningAct ="";
	private String rollBackAct = "";
	private String rollBackActName="";
	private String action;
	
	public void setAction(String action){
		this.action=action;
	}
	public String getAction(){
		return this.action;
	}
	public void setRunningAct(String running){
		this.runningAct = running;
	}
	public String getRunningAct(){
		return this.runningAct;
	}
	public void setRollBackAct(String rollbackact){
		this.rollBackAct = rollbackact; 
	}
	public String getRollBackAct(){
		return this.rollBackAct;
	}
	public void  setRollBackActName(String acts){
		this.rollBackActName = acts;
	}
	public String getRollBackActName(){
		return this.rollBackActName;
	}

}
