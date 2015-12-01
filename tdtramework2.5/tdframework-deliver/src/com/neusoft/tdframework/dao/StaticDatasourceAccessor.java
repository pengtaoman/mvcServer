package com.neusoft.tdframework.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.sql.DataSource;

import org.springframework.jdbc.datasource.DataSourceUtils;

import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;

/**brief description
 * <p>Date       : 2004-11-1</p>
 * <p>Module     : </p>
 * <p>Description: </p>
 * <p>Remark     : </p>
 * @author lub
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> �޸���ʷ</p>
 * <p>  ���		����		�޸���			�޸�ԭ��</p>
 * <p>   1                                       </p>
 */

public class StaticDatasourceAccessor {	

	/**
	 * ȡ�����ݿ�����
	 * description: 
	 * @param DataSource
	 * @return Connection
	 * @throws DataAccessException
	 */	
	public static final Connection getConnection(DataSource ds) throws DataAccessException {

		try {
			if(ds != null){
				return DataSourceUtils.getConnection(ds);
			}else{
				throw new DataAccessException("cannot getConnection �� DataSource cannot be null��");
			}
		} catch (Exception e) {
			SysLog.writeExceptionLogs("tdframework",GlobalParameters.ERROR,"StaticDatasourceAccessor--getConnection-1:"+e.getMessage(),e);
			throw new DataAccessException("cannot getConnection "+e);
		}
	}

	/**
	 * �ͷ�����Դ��Դ
	 * description: 
	 * @param rest
	 * @param pstmt
	 * @param conn
	 */
	public static void close(ResultSet rest,PreparedStatement pstmt,Connection conn){
		try{			
			if(rest != null)rest.close();
		}catch(SQLException e){
			SysLog.writeLogs("tdframework",GlobalParameters.ERROR,"StaticDatasourceAccessor--close-1:"+e.getMessage());
		}
		try{
			if(pstmt!= null)pstmt.close();
		}catch(SQLException e){
			SysLog.writeLogs("tdframework",GlobalParameters.ERROR,"StaticDatasourceAccessor--close-2:"+e.getMessage());
		}			
		try {
			if(conn != null)conn.close();
		} catch(Exception e) {
			SysLog.writeLogs("tdframework",GlobalParameters.ERROR,"StaticDatasourceAccessor--close-3:"+e.getMessage());
		}
	}

	/**
	 * �ͷ�����Դ��Դ
	 * description: 
	 * @param rest
	 * @param pstmt
	 * @param conn
	 */
	public static void close(ResultSet rest,Statement pstmt,Connection conn){
		try{			
			if(rest != null)rest.close();
		}catch(SQLException e){
			SysLog.writeLogs("tdframework",GlobalParameters.ERROR,"StaticDatasourceAccessor--close-1:"+e.getMessage());
		}
		try{
			if(pstmt!= null)pstmt.close();
		}catch(SQLException e){
			SysLog.writeLogs("tdframework",GlobalParameters.ERROR,"StaticDatasourceAccessor--close-2:"+e.getMessage());
		}			
		try {
			if(conn != null)conn.close();
		} catch(Exception e) {
			SysLog.writeLogs("tdframework",GlobalParameters.ERROR,"StaticDatasourceAccessor--close-3:"+e.getMessage());
		}
	}
	
	/**
	 * �ͷ�����Դ��Դ
	 * description: 
	 * @param pstmt
	 * @param conn
	 */
	public static void close(PreparedStatement pstmt,Connection conn){
		try{
			if(pstmt!= null)pstmt.close();
		}catch(SQLException e){
			SysLog.writeLogs("tdframework",GlobalParameters.ERROR,"StaticDatasourceAccessor--close-1:"+e.getMessage());
		}			
		try {
			if(conn != null)conn.close();
		} catch(Exception e) {
			SysLog.writeLogs("tdframework",GlobalParameters.ERROR,"StaticDatasourceAccessor--close-2:"+e.getMessage());
		}
	}
	
	/**
	 * �ͷ�����Դ��Դ
	 * description: 
	 * @param pstmt
	 * @param conn
	 */
	public static void close(Statement pstmt,Connection conn){
		try{
			if(pstmt!= null)pstmt.close();
		}catch(SQLException e){
			SysLog.writeLogs("tdframework",GlobalParameters.ERROR,"StaticDatasourceAccessor--close-1:"+e.getMessage());
		}			
		try {
			if(conn != null)conn.close();
		} catch(Exception e) {
			SysLog.writeLogs("tdframework",GlobalParameters.ERROR,"StaticDatasourceAccessor--close-2:"+e.getMessage());
		}
	}
	
	/**
	 * �ͷ�����Դ��Դ
	 * description: 
	 * @param pstmt
	 * @param conn
	 */
	public static void close(Connection conn){
		try {
			if(conn != null)conn.close();
		} catch(Exception e) {
			SysLog.writeLogs("tdframework",GlobalParameters.ERROR,"StaticDatasourceAccessor--close-1:"+e.getMessage());
		}
	}
}
