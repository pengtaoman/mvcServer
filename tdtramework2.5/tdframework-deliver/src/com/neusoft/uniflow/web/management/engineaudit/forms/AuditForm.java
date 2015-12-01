/*
 * Created on 2005-8-11
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
package com.neusoft.uniflow.web.management.engineaudit.forms;


import java.util.Vector;
import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionMapping;
import com.neusoft.uniflow.web.common.list.OpenListForm;


/**
 * @author TianJun
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class AuditForm extends OpenListForm {
	private static final long serialVersionUID = 1234607245;
    Vector list=new Vector(); 
    private String startTime=null;
    private String endTime=null;
    private boolean sflag=false;
    private boolean eflag=false;
    private String personID="";
    
	public Vector getList() {
		return list;
	}
	public void setList(Vector list) {
		this.list = list;
	}
	
	public void reset(ActionMapping mapping, HttpServletRequest request) {
		
		super.reset(mapping,request);
	    list = new Vector();
	    startTime=null;
	    endTime=null;
	    personID="";
	    sflag=false;
	    eflag=false;
	}


	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}



	public String getPersonID() {
		return personID;
	}

	public void setPersonID(String personID) {
		this.personID = personID;
	}
	public boolean isEflag() {
		return eflag;
	}
	public void setEflag(boolean eflag) {
		this.eflag = eflag;
	}
	public boolean isSflag() {
		return sflag;
	}
	public void setSflag(boolean sflag) {
		this.sflag = sflag;
	}


}
