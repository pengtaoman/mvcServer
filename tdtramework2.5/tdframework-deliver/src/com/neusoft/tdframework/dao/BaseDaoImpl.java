package com.neusoft.tdframework.dao;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.sql.DataSource;

import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.log.SysLog;

/**brief description
 * <p>Date       : 2004-10-25</p>
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
abstract public class BaseDaoImpl extends DataSourceAccessor {
	
	/**
	 * 释放数据源资源
	 * description: 
	 * @param rest
	 * @param pstmt
	 * @param conn
	 */
	public void close(ResultSet rest,PreparedStatement pstmt,Connection conn){
		try{			
			if(rest != null)rest.close();
		}catch(SQLException e){
			SysLog.writeLogs("tdframework",GlobalParameters.ERROR,"BaseDao--close-1:"+e.getMessage());
		}
		try{
			if(pstmt!= null)pstmt.close();
		}catch(SQLException e){
			SysLog.writeLogs("tdframework",GlobalParameters.ERROR,"BaseDao--close-2:"+e.getMessage());
		}			
		try {
			if(conn != null){
				closeConnectionIfNecessary(conn);
			}
		} catch(Exception e) {
			SysLog.writeLogs("tdframework",GlobalParameters.ERROR,"BaseDao--close-3:"+e.getMessage());
		}
	}
	
	public void close(ResultSet rest,CallableStatement cstmt,Connection conn){
		try{			
			if(rest != null)rest.close();
		}catch(SQLException e){
			SysLog.writeLogs("tdframework",GlobalParameters.ERROR,"BaseDao--close-1:"+e.getMessage());
		}
		try{
			if(cstmt!= null)cstmt.close();
		}catch(SQLException e){
			SysLog.writeLogs("tdframework",GlobalParameters.ERROR,"BaseDao--close-2:"+e.getMessage());
		}			
		try {
			if(conn != null)closeConnectionIfNecessary(conn);
		} catch(Exception e) {
			SysLog.writeLogs("tdframework",GlobalParameters.ERROR,"BaseDao--close-3:"+e.getMessage());
		}
	}
	
	public void close(ResultSet rest,Statement cstmt){
		try{			
			if(rest != null)rest.close();
		}catch(SQLException e){
			SysLog.writeLogs("tdframework",GlobalParameters.ERROR,"BaseDao--close-1:"+e.getMessage());
		}
		try{
			if(cstmt!= null)cstmt.close();
		}catch(SQLException e){
			SysLog.writeLogs("tdframework",GlobalParameters.ERROR,"BaseDao--close-2:"+e.getMessage());
		}			
	}
	
	public void close(ResultSet rest,Statement cstmt,Connection conn,DataSource ds){
		try{			
			if(rest != null)rest.close();
		}catch(SQLException e){
			SysLog.writeLogs("tdframework",GlobalParameters.ERROR,"BaseDao--close-1:"+e.getMessage());
		}
		try{
			if(cstmt!= null)cstmt.close();
		}catch(SQLException e){
			SysLog.writeLogs("tdframework",GlobalParameters.ERROR,"BaseDao--close-2:"+e.getMessage());
		}			
		try {
			if(conn != null)closeConnectionIfNecessary(conn,ds);
		} catch(Exception e) {
			SysLog.writeLogs("tdframework",GlobalParameters.ERROR,"BaseDao--close-3:"+e.getMessage());
		}
	}
	
	public void close(Statement stmt,Connection conn,DataSource ds){
		try{
			if(stmt!= null)stmt.close();
		}catch(SQLException e){
			SysLog.writeLogs("tdframework",GlobalParameters.ERROR,"BaseDao--close-1:"+e.getMessage());
		}			
		try {
			if(conn != null)closeConnectionIfNecessary(conn,ds);
		} catch(Exception e) {
			SysLog.writeLogs("tdframework",GlobalParameters.ERROR,"BaseDao--close-2:"+e.getMessage());
		}
	}
	
	/**
	 * 释放数据源资源
	 * description: 
	 * @param pstmt
	 * @param conn
	 */
	public void close(PreparedStatement pstmt,Connection conn){
		try{
			if(pstmt!= null)pstmt.close();
		}catch(SQLException e){
			SysLog.writeLogs("tdframework",GlobalParameters.ERROR,"BaseDao--close-1:"+e.getMessage());
		}			
		try {
			if(conn != null)closeConnectionIfNecessary(conn);
		} catch(Exception e) {
			SysLog.writeLogs("tdframework",GlobalParameters.ERROR,"BaseDao--close-2:"+e.getMessage());
		}
	}
	
	/**
	 * 释放数据源资源
	 * description: 
	 * @param pstmt
	 * @param conn
	 */
	public void close(CallableStatement cstmt,Connection conn){
		try{
			if(cstmt!= null)cstmt.close();
		}catch(SQLException e){
			SysLog.writeLogs("tdframework",GlobalParameters.ERROR,"BaseDao--close-1:"+e.getMessage());
		}			
		try {
			if(conn != null)closeConnectionIfNecessary(conn);
		} catch(Exception e) {
			SysLog.writeLogs("tdframework",GlobalParameters.ERROR,"BaseDao--close-2:"+e.getMessage());
		}
	}
	
	/**
	 * 释放数据源资源
	 * description: 
	 * @param pstmt
	 * @param conn
	 */
	public void close(Connection conn){
		try {
			if(conn != null)closeConnectionIfNecessary(conn);
		} catch(Exception e) {
			SysLog.writeLogs("tdframework",GlobalParameters.ERROR,"BaseDao--close-1:"+e.getMessage());
		}
	}

	public void close(Connection conn,DataSource ds){
		try {
			if(conn != null)closeConnectionIfNecessary(conn,ds);
		} catch(Exception e) {
			SysLog.writeLogs("tdframework",GlobalParameters.ERROR,"BaseDao--close-1:"+e.getMessage());
		}
	}
	
	/**
	 * 释放preparedStatement
	 * description: 
	 * @param pstmt
	 */
	public void close(PreparedStatement pstmt){
		try{			
			if(pstmt != null)pstmt.close();
		}catch(SQLException e){
			SysLog.writeLogs("tdframework",GlobalParameters.ERROR,"BaseDao--close-1:"+e.getMessage());
		}
	}
}
