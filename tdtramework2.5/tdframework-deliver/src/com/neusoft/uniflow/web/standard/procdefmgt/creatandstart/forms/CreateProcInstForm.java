/*
 * Created on 2004-11-3
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.uniflow.web.standard.procdefmgt.creatandstart.forms;

import java.util.Vector;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.web.standard.procdefmgt.creatandstart.beans.RDBean;


public class CreateProcInstForm extends ActionForm {
	private static final long serialVersionUID = 12345678;
	private String procInstName;
	private String operation;
	private String procDefID;
	private boolean hasRD;
	private Vector rdlist = new Vector();
	private boolean needCreatorRole;
	private String roleID;
	
	public String getProcInstName(){
		return this.procInstName;
	}
	public void setProcInstName(String procInstName){
		this.procInstName = procInstName;
	}
	public String getOperation() {
	  return operation;
	}

	public void setOperation(String operation) {
	  this.operation = operation;
	}

	public String getProcDefID() {
	  return procDefID;
	}

	public void setProcDefID(String selectedID) {
		this.procDefID = selectedID;
//	  try {
//		this.selectedID = new String(selectedID.getBytes("iso8859-1"));
//	} catch (UnsupportedEncodingException e1) {
//		e1.printStackTrace();
//	}
//	System.out.println(this.selectedID);
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
