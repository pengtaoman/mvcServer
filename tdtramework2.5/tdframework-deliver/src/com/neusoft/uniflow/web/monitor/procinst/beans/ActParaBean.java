/*
 * Created on 2004-12-16
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.uniflow.web.monitor.procinst.beans;



public class ActParaBean {
	private boolean checked;
	private String actID;
	private String actName;

	
	public ActParaBean(){
		checked=true;
		actID="";
		actName="";

	}
	public boolean isChecked(){
		return checked;
	}
	public void setChecked(boolean checked){
		this.checked = checked;
	}
	public String getActID(){
		return this.actID;
	}
	public void setActID(String actID){
		this.actID = actID;
	}
	public String getActName(){
		return this.actName;
	}
	public void setActName(String name){
		this.actName = name;
	}

}
