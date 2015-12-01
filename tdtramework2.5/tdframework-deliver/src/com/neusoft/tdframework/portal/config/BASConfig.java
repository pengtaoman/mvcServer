/*
 * Created on 2006-11-17
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
package com.neusoft.tdframework.portal.config;

/**
 * @author zhangjn
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class BASConfig {
	/**
	 * @return Returns the visitLog.
	 */
	public String getVisitLog() {
		return visitLog;
	}
	/**
	 * @param visitLog The visitLog to set.
	 */
	public void setVisitLog(String visitLog) {
		this.visitLog = visitLog;
	}
	private String visitLog;
	/**
	 * @return Returns the loginLog.
	 */
	public boolean getLoginLog() {
		return loginLog;
	}
	/**
	 * @param loginLog The loginLog to set.
	 */
	public void setLoginLog(boolean loginLog) {
		this.loginLog = loginLog;
	}
	private boolean loginLog;
}
