package com.neusoft.uniflow.web.monitor.procdef.forms;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.web.common.list.OpenListForm;

public class CurActDetailForm extends OpenListForm
{
	private static final long serialVersionUID = 1234567816;
  private String procID;;
  public void reset(ActionMapping mapping, HttpServletRequest request)
  {
	  procID=null;
    super.reset(mapping,request);
  }
public String getProcID() {
	return procID;
}
public void setProcID(String procID) {
	this.procID = procID;
}


 }