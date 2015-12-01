/*
 * Created on 2004-11-24
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.uniflow.web.management.enginecap.forms;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;

/**
 * @author liwei
 *
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
public class EngineStatForm extends ActionForm {
	private static final long serialVersionUID = 1234567245;
	public static String DATEFORMAT = "yyyy-MM-dd";
	private String startTime = "";
	private String endTime = "";

	
	public String getStartTime() {
	  return startTime;
	}

	public void setStartTime(String startTime) {
	  this.startTime = startTime;
	}

	public String getEndTime() {
	  return endTime;
	}

	public void setEndTime(String endTime) {
	  this.endTime = endTime;
	}


	public void reset(ActionMapping mapping, HttpServletRequest request) {
		startTime = "";
		endTime = "";

	}

}
