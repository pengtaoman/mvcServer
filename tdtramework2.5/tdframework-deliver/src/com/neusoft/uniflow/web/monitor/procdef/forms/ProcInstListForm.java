package com.neusoft.uniflow.web.monitor.procdef.forms;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.web.common.list.OpenListForm;


public class ProcInstListForm extends OpenListForm
{
	private static final long serialVersionUID = 1234567819;
  private String procdefID;
  private String verName;
  private long procState;
  public void reset(ActionMapping mapping, HttpServletRequest request)
  {
    super.reset(mapping,request);
    procdefID = "";
    verName = "";
    procState = -1;
  }
	/**
	 * @return Returns the procdefID.
	 */
	public String getProcdefID() {
		return procdefID;
	}
	/**
	 * @param procdefID The procdefID to set.
	 */
	public void setProcdefID(String procdefID) {
		this.procdefID = procdefID;
	}
	/**
	 * @return Returns the verName.
	 */
	public String getVerName() {
		return verName;
	}
	/**
	 * @param verName The verName to set.
	 */
	public void setVerName(String verName) {
		this.verName = verName;
	}
	public long getProcState() {
		return procState;
	}
	public void setProcState(long procState) {
		this.procState = procState;
	}



 }
