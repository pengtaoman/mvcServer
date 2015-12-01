package com.neusoft.uniflow.web.participant.beans;

public class VarPartiBean {
	private String id;
	private String name;
	private int type;
	public void setId(String id){
		this.id=id;
	}
	public String getId(){
		return this.id;
	}
	public void setName(String name){
		this.name=name;
	}
	public String getName(){
		return this.name;
	}
	public void setType(int type){
		this.type=type;
	}
	public int getType(){
		return this.type;
	}
}
