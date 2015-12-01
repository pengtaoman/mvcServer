/*
 * Created on 2004-10-14
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.tdframework.exception;

/**
  * <p>Title: BusinessException </p>
  * <p>Description: “Ï≥£</p>
  * <p>Copyright: Copyright (c) 2002</p>
  * <p>Company: neusoft</p>
  * @author liyj
 */
public class ServiceException extends BaseException {

	public ServiceException(String msg) {
	  super(msg);
	}

	public ServiceException(Exception e){
	  this(e.getMessage());
	}
}
