package com.neusoft.tdframework.exception;

import org.springframework.core.NestedCheckedException;

/**brief description 基本异常，系统定义的所有异常都需要继承这个基本类
 * <p>Date       : 2004-10-22</p>
 * <p>Module     : </p>
 * <p>Description: </p>
 * <p>Remark     : </p>
 * @author liyj
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> 修改历史</p>
 * <p>  序号		日期		修改人			修改原因</p>
 * <p>   1                                       </p>
 */
public class BaseException extends NestedCheckedException {

	public BaseException(String msg) {
	  super(msg);
	}

	public BaseException(Exception e){
	  this(e.getMessage());
	}
}
