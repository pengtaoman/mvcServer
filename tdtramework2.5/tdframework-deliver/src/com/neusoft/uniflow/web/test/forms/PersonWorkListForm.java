/*
 * Created on 2004-12-16
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.uniflow.web.test.forms;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.web.common.list.OpenListForm;


public class PersonWorkListForm extends OpenListForm {
	private static final long serialVersionUID = 1234567838;
	private String categoryview;


	public void reset(ActionMapping mapping, HttpServletRequest request)
	{
	  super.reset(mapping,request);

	  this.categoryview="";

	
	}

	public String getCategoryview() {
		return categoryview;
	}
	public void setCategoryview(String categoryview) {
		this.categoryview = categoryview;
	}



}
