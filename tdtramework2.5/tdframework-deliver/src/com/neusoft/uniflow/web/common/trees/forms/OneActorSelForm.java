package com.neusoft.uniflow.web.common.trees.forms;

import java.util.Vector;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;


public class OneActorSelForm extends ActionForm {
private static final long serialVersionUID = 1234567826;
  public final static int ACTOR_TYPE_ROLE = 1;
  public final static int ACTOR_TYPE_USER = 0;
  private int selType;
  private String selActorID;
  private String expendRoleID;
  private boolean needButton;
  private Vector userList;
  private String selActorName;
  private String openallChild;
  private int treeType;
  public int getTreeType() {
	return treeType;
}
public void setTreeType(int treeType) {
	this.treeType = treeType;
}
public String getOpenallChild() {
	return openallChild;
}
public void setOpenallChild(String openallChild) {
	this.openallChild = openallChild;
}
public void reset(ActionMapping mapping, HttpServletRequest request)
  {
    selType = ACTOR_TYPE_USER;
    selActorID = "";
    expendRoleID = "";
    selActorName = "";
    needButton = false;
    userList = new Vector();
    openallChild="";
  }
  public int getSelType() {
    return selType;
  }
  public void setSelType(int selType) {
    this.selType = selType;
  }
  public String getSelActorID() {
    return selActorID;
  }
  public void setSelActorID(String selActorID) {
    this.selActorID = selActorID;
  }
  public String getExpendRoleID() {
    return expendRoleID;
  }
  public void setExpendRoleID(String expendRoleID) {
    this.expendRoleID = expendRoleID;
  }
  public boolean isNeedButton() {
    return needButton;
  }
  public void setNeedButton(boolean needButton) {
    this.needButton = needButton;
  }
  public Vector getUserList() {
    return userList;
  }
  public void setUserList(Vector userList) {
    this.userList = userList;
  }
  public String getSelActorName() {
    return selActorName;
  }
  public void setSelActorName(String selActorName) {
    this.selActorName = selActorName;
  }
}