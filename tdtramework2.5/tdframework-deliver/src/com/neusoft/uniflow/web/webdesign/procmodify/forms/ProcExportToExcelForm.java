package com.neusoft.uniflow.web.webdesign.procmodify.forms;


import java.util.Hashtable;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;

public class ProcExportToExcelForm extends ActionForm {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Hashtable map = new Hashtable(); 
		
	public Hashtable getMap() {
		return map;
	}

	public void setMap(Hashtable map) {
		this.map = map;
	}

	public void reset(ActionMapping mapping, HttpServletRequest request) {
		map = new Hashtable();
	}
}
