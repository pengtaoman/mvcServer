package com.neusoft.uniflow.web.management.organization.forms;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;



public class RoleTreeForm extends ActionForm
{private static final long serialVersionUID = 1234567378;
  private String selectedRole;//selected role id
  private boolean expand;
  private boolean select;
  private String selectedRoleName;
  private String selectedRoleDesc;
  private String operation = "operation";//delete etc.
  
  private boolean hasPerson;
  private boolean ownOneUnit;
  private String ownerUnit;
  private String[] personInfo = {};
  //modefied by liwei 
  public void setHasPerson(boolean has){
  	this.hasPerson = has; 
  }
  public boolean getHasPerson(){
  	return this.hasPerson;
  }
  public void setOwnOneUnit(boolean own){
  	this.ownOneUnit = own;
  }
  public boolean getOwnOneUnit(){
  	return this.ownOneUnit;
  }
  public void setOwnerUnit(String owner){
  	this.ownerUnit = owner;
  }
  public String getOwnerUnit(){
  	return this.ownerUnit;
  }
  public void setPersonsInfo(String[] persons){
  	this.personInfo = persons;
  }
  public String[] getPersonsInfo(){
  	return this.personInfo;
  }

  public String getSelectedRole()
  {
    return this.selectedRole;
  }
  public void setSelectedRole(String roleID)
  {
    this.selectedRole = roleID;
  }

  public boolean isExpand()
  {
    return this.expand;
  }
  public void setExpand(boolean expand)
  {
    this.expand = expand;
  }

  public boolean isSelect()
  {
    return this.select;
  }
  public void setSelect(boolean select)
  {
    this.select = select;
  }

  public String getSelectedRoleName()
  {
    return this.selectedRoleName;
  }
  public void setSelectedRoleName(String rolename)
  {
    this.selectedRoleName = rolename;
  }

  public String getSelectedRoleDesc()
  {
    return this.selectedRoleDesc;
  }
  public void setSelectedRoleDesc(String roledesc)
  {
    this.selectedRoleDesc = roledesc;
  }

  public String getOperation()
  {
    return this.operation;
  }
  public void setOperation(String operation)
  {
    this.operation = operation;
  }

  public void reset(ActionMapping mapping, javax.servlet.ServletRequest request)
  {
    this.selectedRole = "";
    this.expand = false;
    this.select = false;
    this.selectedRoleName = "";
    this.selectedRoleDesc = "";
    this.operation = "operation";
  }
}