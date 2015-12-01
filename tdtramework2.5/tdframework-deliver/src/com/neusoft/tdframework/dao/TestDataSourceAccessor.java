package com.neusoft.tdframework.dao;

import javax.sql.DataSource;
import java.sql.*;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Map;


import com.neusoft.tdframework.exception.DataAccessException;

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

import java.util.Date;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Map;


/**brief description:封装数据源的基本类
 * <p>Date       : 2004-10-30</p>
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
public class TestDataSourceAccessor {
	private DataSource dataSource;
	private String testDSUrl;
	private String username;
	private String password;
	private static Map currentConnections = new HashMap();
	//private static Hashtable dataSourceTable = new Hashtable();
	private String invoker = "never invoked";

	public TestDataSourceAccessor(){
			//Thread.currentThread
		
	}
	
	public void setDataSource(DataSource ds) {
		dataSource = ds;
	}
	public void setTestDSUrl(String pdsurl,String puser,String ppassword) {
		testDSUrl = pdsurl;
		username = puser;
		password = ppassword;
	}
	private Connection getTestDS() {
	    Connection con = null;
	    try
	    {
	        try
	        {
	            Class.forName("oracle.jdbc.driver.OracleDriver").newInstance();
	        }
	        catch (Exception ex)
	        {
	            ex.printStackTrace();
	            return con;
	        }
	        con = DriverManager.getConnection(testDSUrl,username,password);
	    }
	    catch( SQLException se )
	    {
	      se.printStackTrace();
	      con = null;
	    }
	    catch( Exception e )
	    {
	      e.printStackTrace();
	      con = null;
	    }
	    return con;
	}

	public DataSource getDataSource() {
		return dataSource;
	}
			
	protected final Connection getConnection() throws DataAccessException {
		Connection conn;
		if(getDataSource()==null)
		{
			conn = getTestDS();
		}
		else
		{
			conn = DataSourceUtils.getConnection(getDataSource());
			//currentConnections.put(conn,new ConnectionInfo());
		}
		return conn;
	}		

	protected final void closeConnectionIfNecessary(Connection con) {
		//DataSourceUtils.closeConnectionIfNecessary(con, getDataSource());
		//currentConnections.remove(con);

		DataSourceUtils.releaseConnection(con, getDataSource());

	}
	public Map getCurrentConnections(){
		return currentConnections;
	}
}
