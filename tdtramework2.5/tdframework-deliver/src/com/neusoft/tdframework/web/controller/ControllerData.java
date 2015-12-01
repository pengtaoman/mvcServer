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
 * ���ƴ���������Ϣ: <b> 
 * 
 * alertMessage ����׷�ӵķ�ʽ <b>
 * ���֮ǰ��fail������fail������������ʲô��
 * <b>
 * ������õ�ֵ����SUCCEED,FAIL���������õ�ֵΪ׼
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
	 * ���ý����Ϣ����������ԭ���ֵ��������Ϊ�µ�ֵ
	 * 
	 * @param rest 
	 */
	public void setResult(int rest) {
		if(rest > this.result)
			this.result = rest;
	}
}
