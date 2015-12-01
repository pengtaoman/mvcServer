package com.neusoft.uniflow.web.management.organization.forms;

/**
 * <p>Title: uniflow 3.5 web client</p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) 2003</p>
 * <p>Company: neusoft</p>
 * @author wangwb
 * @version 1.0
 */
import java.io.UnsupportedEncodingException;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionErrors;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;

public class RoleForm
    extends ActionForm {
	private static final long serialVersionUID = 1234567367;
  private String ID = "";
  private String operation;
  private String page_operation;
  private String name = "";
  private String description = "";
  private String[] personinfo = {};
  private String rolemember = "";
  private String[] selectmember = {};
  private String parent ="";
  private String ownerUnit ="";
  private boolean needSelUnit;
  public RoleForm() {
  }
  public void setNeedSelUnit(boolean need){
  	this.needSelUnit = need;
  }
  public boolean getNeedSelUnit(){
  	return this.needSelUnit;
  }
  public void setOwnerUnit(String unit){

	try {
			this.ownerUnit = new String(unit.getBytes("iso-8859-1"));
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		if (this.ownerUnit.indexOf("?") != -1) {
		//this.description = description;
			this.ownerUnit = unit;
		} 
  }
  public String getOwnerUnit(){
  	return this.ownerUnit;
  }
  public String getParent(){
  	return this.parent;
  }
  public void setParent(String p){
  	this.parent = p;
  }
  public String getID() {
    return this.ID;
  }

  public void setID(String ID) {
    this.ID = ID;
  }

  public String getOperation() {
    return this.operation;
  }

  public void setOperation(String operation) {
    this.operation = operation;
  }

  public String getPage_operation() {
    return this.page_operation;
  }

  public void setPage_operation(String page_operation) {
    this.page_operation = page_operation;
  }

  public void setName(String name) {
	try {
			this.name = new String(name.getBytes("iso-8859-1"));
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		if (this.name.indexOf("?") != -1) {
			this.name = name;
		}
  }

  public String getName() {
    return this.name;
  }

  public void setDescription(String description) {
	try {
			this.description = new String(description.getBytes("iso-8859-1"));
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		if (this.description.indexOf("?") != -1) {
			this.description = description;
		} 
  }

  public String getDescription() {
    return this.description;
  }

  public String[] getPersoninfo() {
    return (this.personinfo);
  }

  public void setPersoninfo(String personinfo[]) {
    this.personinfo = personinfo;
  }

  public String getRolemember() {
    return (this.rolemember);
  }

  public void setRolemember(String rolemember) {
	try {
			   this.rolemember = new String(rolemember.getBytes("iso-8859-1"));
		   } catch (UnsupportedEncodingException e) {
			   e.printStackTrace();
		   }
		   if (this.rolemember.indexOf("?") != -1) {
			   this.rolemember = rolemember;
		   }  }

  public String[] getSelectmember() {
    return (this.selectmember);
  }

  public void setSelectmember(String selectmember[]) {
    this.selectmember = selectmember;
  }

  public ActionErrors validate(ActionMapping actionMapping,
                               HttpServletRequest httpServletRequest) {
    return null;
  }

  public void reset(ActionMapping actionMapping,
                    HttpServletRequest httpServletRequest) {
    this.personinfo = new String[0];
    this.selectmember = new String[0];
    this.rolemember = "";
  }

}