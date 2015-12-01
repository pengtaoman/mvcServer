package com.neusoft.uniflow.web.standard.procdefmgt.creatandstart.forms;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;

public class CreatRoleForm
    extends ActionForm {
	private static final long serialVersionUID = 12345677;
  private String operation;
  private String selectedID;
  private boolean hasRD;
  private boolean needCreatorRole;
  private String roleID;

  public String getOperation() {
    return operation;
  }

  public void setOperation(String operation) {
    this.operation = operation;
  }

  public String getSelectedID() {
    return selectedID;
  }

  public void setSelectedID(String selectedID) {
    this.selectedID = selectedID;
  }

  public boolean getHasRD() {
    return hasRD;
  }

  public void setHasRD(boolean hasRD) {
    this.hasRD = hasRD;
  }

  public boolean getNeedCreatorRole() {
    return needCreatorRole;
  }

  public void setNeedCreatorRole(boolean needCreatorRole) {
    this.needCreatorRole = needCreatorRole;
  }

  public String getRoleID() {
    return roleID;
  }

  public void setRoleID(String roleID) {
    this.roleID = roleID;
  }

  public void reset(ActionMapping mapping,
                    javax.servlet.http.HttpServletRequest request) {
  }

}