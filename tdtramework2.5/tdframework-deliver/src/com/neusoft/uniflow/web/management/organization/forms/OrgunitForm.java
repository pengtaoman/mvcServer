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
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.web.common.list.OpenListForm;


public class OrgunitForm
    extends OpenListForm {
	private static final long serialVersionUID = 1234567345;

  private String action = "";
  private String name = "";
  private String description = "";
  private String leadername = "";
  private String leaderID = "";
  //add by liwei 
  private String[] roleinfo={};
  private boolean hasrole;
  
  public OrgunitForm() {
  }
  public void setHasrole(boolean has){
  	this.hasrole=has;
  }
  public boolean getHasrole(){
  	return this.hasrole;
  }
  public void setRoleinfo(String[] roles){
  	this.roleinfo = roles;
  }
  public String[] getRoleinfo(){
  	return this.roleinfo;
  }

  public String getAction() {
    return this.action;
  }

  public void setAction(String action) {
    this.action = action;
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

  public void setLeadername(String leadername) {
	try {
				this.leadername = new String(leadername.getBytes("iso-8859-1"));
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}
			if (this.leadername.indexOf("?") != -1) {
				this.leadername = leadername;
			}  }
  public String getLeadername() {
    return this.leadername;
  }

  public void setLeaderID(String leaderID) {
    this.leaderID = leaderID;
  }
  public String getLeaderID() {
    return this.leaderID;
  }

  public ActionErrors validate(ActionMapping actionMapping,
					 HttpServletRequest httpServletRequest) {
    return null;
  }

  public void reset(ActionMapping actionMapping,
			  HttpServletRequest httpServletRequest) {
    this.action = "";
  }

}