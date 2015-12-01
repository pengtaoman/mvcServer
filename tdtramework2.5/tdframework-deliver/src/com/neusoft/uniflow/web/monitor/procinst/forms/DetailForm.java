package com.neusoft.uniflow.web.monitor.procinst.forms;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;



public class DetailForm extends ActionForm
{
	private static final long serialVersionUID = 1234567812;
	private String procInstID = "";
	public DetailForm()
	{
		this.procInstID = "";
	}
	public String getProcInstID()
	{
		return this.procInstID;
	}
	public void setProcInstID(String id)
	{
		this.procInstID = id;
	}
	public void reset(ActionMapping mapping, HttpServletRequest request)
	{
		this.procInstID = "";
	}
}