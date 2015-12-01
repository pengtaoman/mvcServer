package com.neusoft.uniflow.web.standard.procinstmgt.procinstlist.forms;

/**
 * <p>Title: uniflow 3.5 web client</p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) 2003</p>
 * <p>Company: neusoft</p>
 * @author wangwb
 * @version 1.0
 */
import java.util.Vector;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.web.standard.procinstmgt.procinstlist.beans.RDBean;


public class RDForm
    extends ActionForm {
	private static final long serialVersionUID = 123456723;
  private String operation;
  private String selectedID;
  private boolean hasRD;
  private Vector rdlist = new Vector();
  private boolean needCreatorRole;
  private String roleID;

  public RDForm() {
  }

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

  public Vector getRdlist() {
    return rdlist;
  }

  public void setRdlist(Vector rdlist) {
    this.rdlist = rdlist;
  }

  public RDBean getRdIndexed(int i) {
    while (i >= this.rdlist.size()) {
      this.rdlist.add(new RDBean());
    }
    return (RDBean)this.rdlist.elementAt(i);
  }

  public void setRdIndexed(int i, RDBean rd) {
    this.rdlist.add(i, rd);
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
    rdlist = new Vector();
  }

}