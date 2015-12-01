/*
 * Created on 2004-10-14
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.tdframework.exception;

/**
  * <p>Title: ActionException </p>
  * <p>Description: “Ï≥£</p>
  * <p>Copyright: Copyright (c) 2002</p>
  * <p>Company: neusoft</p>
  * @author liyj
  * @version 1.0
 */

public class ActionException extends BaseException {

  public ActionException(String msg) {
	super(msg);
  }

  public ActionException(Exception e){
	this(e.getMessage());
  }

}
