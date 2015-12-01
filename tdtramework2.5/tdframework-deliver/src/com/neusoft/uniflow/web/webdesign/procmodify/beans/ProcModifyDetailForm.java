package com.neusoft.uniflow.web.webdesign.procmodify.beans;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.web.common.list.OpenListForm;

public class ProcModifyDetailForm extends OpenListForm{
	private String procID = "";
	private String xmlStr = "";
	
	public void reset(ActionMapping mapping, HttpServletRequest request){
		 procID = "";
	    }

	public String getProcID() {
		return procID;
	}

	public void setProcID(String procID) {
		this.procID = procID;
	}

	public String getXmlStr() {
		return xmlStr;
	}

	public void setXmlStr(String xmlStr) {
		this.xmlStr = xmlStr;
	}

}
