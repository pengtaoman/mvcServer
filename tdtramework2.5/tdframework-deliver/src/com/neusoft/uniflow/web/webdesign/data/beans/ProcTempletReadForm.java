package com.neusoft.uniflow.web.webdesign.data.beans;

import java.util.Vector;

import org.apache.struts.action.ActionForm;

public class ProcTempletReadForm extends ActionForm {
    /**
	 * 
	 */
	private static final long serialVersionUID = 2561159600239157232L;
	private Vector procVector = new Vector();

	public Vector getProcVector() {
		return procVector;
	}

	public void setProcVector(Vector procVector) {
		this.procVector = procVector;
	}
	
}
