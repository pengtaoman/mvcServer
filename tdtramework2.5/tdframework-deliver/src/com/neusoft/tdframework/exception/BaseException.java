package com.neusoft.tdframework.exception;

import org.springframework.core.NestedCheckedException;

/**brief description �����쳣��ϵͳ����������쳣����Ҫ�̳����������
 * <p>Date       : 2004-10-22</p>
 * <p>Module     : </p>
 * <p>Description: </p>
 * <p>Remark     : </p>
 * @author liyj
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> �޸���ʷ</p>
 * <p>  ���		����		�޸���			�޸�ԭ��</p>
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
