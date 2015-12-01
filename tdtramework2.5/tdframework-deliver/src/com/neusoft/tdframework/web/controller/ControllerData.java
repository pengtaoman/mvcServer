/*
 * Created on 2005-1-21
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.tdframework.web.controller;

import com.neusoft.tdframework.common.util.XMLProperties;

/**
 * @author Administrator
 *
 * 控制处理数据信息: <b> 
 * 
 * alertMessage 采用追加的方式 <b>
 * 如果之前是fail，则还是fail，不管设置是什么。
 * <b>
 * 如果设置的值不是SUCCEED,FAIL，则以设置的值为准
 * 
 */
public class ControllerData {
	public static final int SUCCEED = 0;
	public static final int FAIL = 10;
	public static final int INVALID_ERROR = 20;
	public static final int SERVICE_ERROR = 30;
	
	public static final String REQUEST_NAME = "controllerData";
	
	private String alertMessage = "";
	private int result = SUCCEED;
	
	//private String 
	/**
	 * @return
	 */
	public String getAlertMessage() {
		return alertMessage;
	}

	/**
	 * @return
	 */
	public int getResult() {
		return result;
	}

	/**
	 * @param string
	 */
	public void setAlertMessage(String alertMsg) {
		if(alertMessage.intern()=="".intern())
			this.alertMessage = alertMsg;
		else
			alertMessage = alertMessage + " | " + XMLProperties.prepareXml(alertMsg);
	}

	/**
	 * 设置结果信息，如果结果比原结果值大，则设置为新的值
	 * 
	 * @param rest 
	 */
	public void setResult(int rest) {
		if(rest > this.result)
			this.result = rest;
	}
}
