/*
 * Created on 2005-1-21
 *
 * 数据校验失败异常
 */
package com.neusoft.tdframework.web.controller;


/**
 * @author chenzt
 *
 * 校验失效
 * 
 */
public class UnValidateException extends Exception{
	
	public UnValidateException(String errorInfo) {
		super(errorInfo);
	}
	
}
