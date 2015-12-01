package com.neusoft.uniflow.web.participant.forms;

import java.util.Vector;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;

public class SetActPartiForm extends ActionForm {
	private static final long serialVersionUID = 123452215;
	public String actPartiId; //节点id
	public Vector actpartilist;//人员参与者列表
	public Vector roleActpartilist;//角色参与者列表
	public Vector actDefList;//节点列表
	public Vector varPartisList;
	public String[]personActParti;
	public String[] roleActparti;
	private String[] proCreator;//实例创建者
	private String[] manactor;//节点参与者
	private String name;//流程实例名称
	private String []varpartis;
	private String action;
	private String sendType;//参与者类型 0主送参与者，1普送参与者
	
	
	public void reset(ActionMapping mapping, HttpServletRequest request){
		super.reset(mapping,request);
		actPartiId="";
		actpartilist=new Vector();
		roleActpartilist=new Vector();
		actDefList=new Vector();
		varPartisList=new Vector();
		personActParti=new String[0];
		roleActparti=new String[0];
		proCreator=new String[0];
		manactor=new String[0];
		varpartis=new String[0];
		action="";
		name="";
		sendType="0";
	}
	
	
	public String getAction(){
		return this.action;
	}
	public void setAction(String action){
		this.action=action;
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String[] getVarpartis() {
		return varpartis;
	}
	public void setVarpartis(String[] varpartis) {
		this.varpartis = varpartis;
	}
	public void setVarPartisList(Vector varpartislist){
		this.varPartisList=varpartislist;
	}
	public Vector getVarPartisList(){
		return this.varPartisList;
	}
	public String getActPartiId() {
		return actPartiId;
	}
	public void setActPartiId(String actPartiId) {
		this.actPartiId = actPartiId;
	}
	public Vector getActpartilist() {
		return actpartilist;
	}
	public void setActpartilist(Vector actpartilist) {
		this.actpartilist = actpartilist;
	}
	public String[] getRoleActparti() {
		return roleActparti;
	}
	public void setRoleActparti(String[] roleActparti) {
		this.roleActparti = roleActparti;
	}
	public String[] getPersonActParti() {
		return personActParti;
	}
	public void setPersonActParti(String[] personActParti) {
		this.personActParti = personActParti;
	}
	public Vector getRoleActpartilist() {
		return roleActpartilist;
	}
	public void setRoleActpartilist(Vector roleActpartilist) {
		this.roleActpartilist = roleActpartilist;
	}
	public Vector getActDefList() {
		return actDefList;
	}
	public void setActDefList(Vector actDefList) {
		this.actDefList = actDefList;
	}
	public String[] getProCreator() {
		return proCreator;
	}
	public void setProCreator(String[] proCreator) {
		this.proCreator = proCreator;
	}


	public String[] getManactor() {
		return manactor;
	}


	public void setManactor(String[] manactor) {
		this.manactor = manactor;
	}


	public String getSendType() {
		return sendType;
	}


	public void setSendType(String sendType) {
		this.sendType = sendType;
	}
	
}