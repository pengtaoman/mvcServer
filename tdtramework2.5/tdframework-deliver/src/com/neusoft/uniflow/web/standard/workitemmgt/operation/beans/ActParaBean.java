/*
 * Created on 2004-12-16
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.uniflow.web.standard.workitemmgt.operation.beans;

import java.util.Vector;

/**
 * @author liwei
 *
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
public class ActParaBean {
	private boolean checked;
	private String actID;
	private String actName;
	private Vector participants;
	private Vector newPart;
	
	public ActParaBean(){
		checked=true;
		actID="";
		actName="";
		participants = new Vector(1);
		newPart = new Vector(1);
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
	public Vector getParticipants(){
	    return this.participants;
	}
	public void setParticipants(Vector par){
		this.participants = par;
	}
	public Vector getNewPart(){
		return this.newPart;
	}
	public void setNewPart(Vector newPart){
		this.newPart = newPart;
	}
}
