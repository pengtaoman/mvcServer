/*
 * Created on 2005-1-14
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.tdframework.authorization;

import com.neusoft.tdframework.common.data.ObjectCollection;

/**
 * @author Administrator
 *
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
public class RemoteAuthorizeVO extends ObjectCollection{
	private String name = null;
	private String webContext = null;
	private String authUrl = null;
	private String authType = null;
	private String userKey = null;
	private String passwordKey = null;
	private String desc = null;
	private String encry = null;
	private int timeWait = 1000;
	private boolean ifValid = false;
	/**
	 * @return
	 */
	public String getAuthUrl() {
		return authUrl;
	}

	/**
	 * @return
	 */
	public boolean isIfValid() {
		return ifValid;
	}

	/**
	 * @return
	 */
	public String getName() {
		return name;
	}

	/**
	 * @return
	 */
	public String getPasswordKey() {
		return passwordKey;
	}

	/**
	 * @return
	 */
	public String getUserKey() {
		return userKey;
	}

	/**
	 * @param string
	 */
	public void setAuthUrl(String string) {
		authUrl = string;
	}

	/**
	 * @param b
	 */
	public void setIfValid(boolean b) {
		ifValid = b;
	}

	/**
	 * @param string
	 */
	public void setName(String string) {
		name = string;
	}

	/**
	 * @param string
	 */
	public void setPasswordKey(String string) {
		passwordKey = string;
	}

	/**
	 * @param string
	 */
	public void setUserKey(String string) {
		userKey = string;
	}

	/**
	 * @return
	 */
	public int getTimeWait() {
		return timeWait;
	}

	/**
	 * @param i
	 */
	public void setTimeWait(int i) {
		timeWait = i;
	}

	/**
	 * @return
	 */
	public String getWebContext() {
		return webContext;
	}

	/**
	 * @param string
	 */
	public void setWebContext(String string) {
		webContext = string;
	}

	/**
	 * @return
	 */
	public String getDesc() {
		return desc;
	}

	/**
	 * @param string
	 */
	public void setDesc(String string) {
		desc = string;
	}

	public String getAuthType() {
		return authType;
	}

	public void setAuthType(String authType) {
		this.authType = authType;
	}

	public String getEncry() {
		return encry;
	}

	public void setEncry(String encry) {
		this.encry = encry;
	}

}
