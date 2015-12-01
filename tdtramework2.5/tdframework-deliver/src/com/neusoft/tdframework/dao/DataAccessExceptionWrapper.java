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
	 * 是否为"违反数据库约束异常"
	 * 如果异常是在"执行插入或更新操作时,违反了约束"时产生的,那么该方法返回true 否则返回 false.
	 * 常见的违反约束:字段类型不匹配,违反唯一约束,值过大.
	 */
	public boolean isDataIntegrityViolation(){
		return getDataAccessException() instanceof DataIntegrityViolationException;
	}
	
	/**
	 * 是否为"无效的SQl语句异常"
	 * 如果异常是在"执行无效的SQl语句"时产生的,那么该方法返回true 否则返回 false.
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
