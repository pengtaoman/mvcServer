package com.neusoft.tdframework.exception;

/** 
  * <p>Title: SysException </p>
  * <p>Description: �쳣</p>
  * <p>Copyright: Copyright (c) 2002</p>
  * <p>Company: neusoft</p>
  * @author liyj
  * @version 1.0   
*/

public class SysException extends BaseException{
	
	/** @param mesg */
	public SysException(String mesg)
	{
		super(mesg);
	}

	public SysException(Exception e){
	  this(e.getMessage());
	}
}
