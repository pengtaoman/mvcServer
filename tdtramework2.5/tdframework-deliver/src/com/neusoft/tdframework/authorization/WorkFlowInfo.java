/*
 * Created on 2004-12-24
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.tdframework.authorization;

import com.neusoft.tdframework.exception.ServiceException;

/**
 * @author chenzt
 *
 * 
 * 
 */
public interface WorkFlowInfo {
	public static final String BEAN="workFlowInfo";
	public String getWorkItems() throws ServiceException;
	
}
