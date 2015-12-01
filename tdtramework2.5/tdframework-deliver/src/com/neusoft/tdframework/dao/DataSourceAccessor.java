package com.neusoft.tdframework.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Calendar;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.jdbc.datasource.DataSourceUtils;

import com.neusoft.tdframework.exception.DataAccessException;

/**brief description:封装数据源的基本类
 * <p>Date       : 2004-10-30</p>
 * <p>Module     : </p>
 * <p>Description: </p>
 * <p>Remark     : </p>
 * @author liyj
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> 修改历史</p>
 * <p>  序号		日期		修改人			修改原因                   </p>
 * <p>   1      w-huan  20030331        修改oracle10g获取时间BUG    </p>
 */
public class DataSourceAccessor {
	private DataSource dataSource;
	private String testDSUrl;
	private String username;
	private String password;
	private static Map connectionHolders = Collections.synchronizedMap(new LinkedHashMap());
	
	public void setDataSource(DataSource ds) {
		/** add by w-huan 20090331*/
		System.setProperty("oracle.jdbc.V8Compatible", "true");
		dataSource = ds;
	}
	public void setTestDSUrl(String pdsurl,String puser,String ppassword) {
		testDSUrl = pdsurl;
		username = puser;
		password = ppassword;
	}
	private Connection getTestConnection() {
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
		Connection conn=null;
		if(getDataSource()==null)
		{
			conn = getTestConnection();
		}
		else
		{
			conn=getConnection(getDataSource());
		}
		return conn;
	}		

	
	public static final Connection getConnection(DataSource ds) throws DataAccessException {
		Connection conn= DataSourceUtils.getConnection(ds);
/*			String[] info=null;
			StackTraceElement[] stacks = (new Throwable()).getStackTrace();
			String key=String.valueOf(conn)+"_"+conn.hashCode()+"_"+Thread.currentThread().hashCode();
			int callerIdx=0;
			while (callerIdx<stacks.length){
				String className=stacks[callerIdx].getClassName();
				if (className.substring(className.lastIndexOf(".")).toUpperCase().indexOf("DAO")>0){
					info= new String[]{key,Calendar.getInstance().getTime()+"",stacks[callerIdx].getClassName(),stacks[callerIdx].getMethodName(),stacks[callerIdx].getLineNumber()+""};
					break;
				}
				callerIdx++;
			}
			connectionHolders.put(key,info);
*/	
		return conn;
	}		
	
	protected final void closeConnectionIfNecessary(Connection conn) {
		closeConnectionIfNecessary(conn,getDataSource());
	}
	
	public static final void closeConnectionIfNecessary(Connection conn,DataSource ds) {
		//DataSourceUtils.closeConnectionIfNecessary(con, getDataSource());

/*		String key=String.valueOf(conn)+"_"+conn.hashCode()+"_"+Thread.currentThread().hashCode();
		if (conn!=null ){
				connectionHolders.remove(key);
		}
*/		DataSourceUtils.releaseConnection(conn, ds);
	}
	
	public static Map getConnectionHolders() {
		return connectionHolders;
	}

}
