/*
 * Created on 2005-1-25
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.tdframework.web.taglibs;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;

import com.neusoft.tdframework.web.controller.ControllerData;

/**
 * @author chenzt
 *
 * 由ControllerData生成相关通用的标签
 * 
 */
public class ControllerDataTagLib extends BaseXMLTagLib{
	ControllerData controllerData = null;
	/* (non-Javadoc)
	 * @see com.neusoft.tdframework.web.taglibs.BaseXMLTagLib#createTagBody()
	 */
	protected void createTagBody() throws IOException {
		writeXMLTag("path",getRequest().getContextPath());
		if(controllerData==null) return;
		writeXMLTag("alertMessage",controllerData.getAlertMessage());
	}

	/* (non-Javadoc)
	 * @see com.neusoft.tdframework.web.taglibs.BaseXMLTagLib#init(javax.servlet.http.HttpServletRequest)
	 */
	protected void init(HttpServletRequest request) {
		controllerData = (ControllerData)request.getAttribute(ControllerData.REQUEST_NAME);		
	}
	
	public static void main(String args[]) {
		printTagConfig("ControllerData",ControllerDataTagLib.class);
	}
	
}
