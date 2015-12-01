package com.neusoft.tdframework.dao;

import org.springframework.core.NestedRuntimeException;
import org.springframework.dao.DataAccessException;

import org.springframework.dao.CannotAcquireLockException;
import org.springframework.dao.CannotSerializeTransactionException;
import org.springframework.dao.DataAccessResourceFailureException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.DeadlockLoserDataAccessException;
import org.springframework.dao.PermissionDeniedDataAccessException;
import org.springframework.jdbc.BadSqlGrammarException;
import org.springframework.jdbc.InvalidResultSetAccessException;

/**
 * @author Wei Zijun
 *
 */
public class DataAccessExceptionWrapper extends NestedRuntimeException {
	


	private DataAccessException dataAccessException;
	public DataAccessExceptionWrapper(DataAccessException dataAccessException) {
		super(dataAccessException.getMessage(),dataAccessException.getCause());
		this.dataAccessException=dataAccessException;
	}
	
	protected DataAccessExceptionWrapper(String msg) {
		super(msg);
	}
	
	protected DataAccessExceptionWrapper(String msg, Throwable cause) {
		super(msg, cause);
	}

	public DataAccessException getDataAccessException() {
		return dataAccessException;
	}

	public void setDataAccessException(DataAccessException dataAccessException) {
		this.dataAccessException = dataAccessException;
	}

	/////////////////////////////////////
	
	

	/**
	 * �Ƿ�Ϊ"Υ�����ݿ�Լ���쳣"
	 * ����쳣����"ִ�в������²���ʱ,Υ����Լ��"ʱ������,��ô�÷�������true ���򷵻� false.
	 * ������Υ��Լ��:�ֶ����Ͳ�ƥ��,Υ��ΨһԼ��,ֵ����.
	 */
	public boolean isDataIntegrityViolation(){
		return getDataAccessException() instanceof DataIntegrityViolationException;
	}
	
	/**
	 * �Ƿ�Ϊ"��Ч��SQl����쳣"
	 * ����쳣����"ִ����Ч��SQl���"ʱ������,��ô�÷�������true ���򷵻� false.
	 */
	public boolean isBadSqlGrammar(){
		return getDataAccessException() instanceof BadSqlGrammarException;
	}
	
	public boolean isDeadlockLoserDataAccess(){
		return getDataAccessException() instanceof DeadlockLoserDataAccessException;
	}
	
	public boolean isPermissionDeniedDataAccess(){
		return getDataAccessException() instanceof PermissionDeniedDataAccessException;
	}
	


	public boolean isInvalidResultSetAccess(){
		return getDataAccessException() instanceof InvalidResultSetAccessException;
	}
	
	public boolean isCannotAcquireLock(){
		return getDataAccessException() instanceof CannotAcquireLockException;
	}
	
	public boolean isCannotSerializeTransaction(){
		return getDataAccessException() instanceof CannotSerializeTransactionException;
	}
	
	public boolean isDataAccessResourceFailure(){
		return getDataAccessException() instanceof DataAccessResourceFailureException;
	}


}
