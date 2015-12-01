package com.neusoft.tdframework.dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.jdbc.datasource.DataSourceUtils;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.jdbc.support.JdbcUtils;
import org.springframework.jdbc.support.SQLExceptionTranslator;

import com.neusoft.tdframework.dao.jdbchandler.BatchUpdateHandler;
import com.neusoft.tdframework.dao.jdbchandler.JdbcHandler;
import com.neusoft.tdframework.dao.jdbchandler.JdbcTemplatePlus;
import com.neusoft.tdframework.dao.jdbchandler.StoredProcedureHandler;

public class TDBaseDAO {

	private DataSource dataSource;
	
	private LinkedHashMap dataSources;
	
	
	protected void initTemplateConfig() {
	}

	/**
	 * 创建一个使用默认的DataSource的普通的JdbcHandler.
	 * 普通的JdbcHandler用于进行常规的 crud操作.
	 * @return JdbcHandler对象
	 */
	public JdbcHandler createJdbcHandler() {
		return new JdbcHandler(new JdbcTemplatePlus(getDataSource()));
	}
	
	/**
	 * 创建一个使用指定名字的DataSource的普通的JdbcHandler.
	 * 普通的JdbcHandler用于进行常规的 crud操作.
	 * @param dsName 数据源的名字
	 * @return JdbcHandler对象
	 */
	public JdbcHandler createJdbcHandler(String dsName) {
		return new JdbcHandler(new JdbcTemplatePlus(getDataSource(dsName)));
	}
	
	/**
	 * 创建一个使用默认的DataSource的执行存储过程的JdbcHandler.
	 * @return JdbcHandler对象
	 */
	public JdbcHandler createProcedureHandler() {
		return new JdbcHandler(new StoredProcedureHandler(getDataSource()));
	}
	
	/**
	 * 创建一个使用指定名字的DataSource的执行存储过程的JdbcHandler.
	 * @param dsName 数据源的名字
	 * @return JdbcHandler对象
	 */
	public JdbcHandler createProcedureHandler(String dsName) {
		return new JdbcHandler(new StoredProcedureHandler(getDataSource(dsName)));
	}
	
	
	/**
	 * 创建一个使用默认的DataSource的执行批量更新操作的JdbcHandler.
	 * @return JdbcHandler对象
	 */
	public JdbcHandler createBatchUpdateHandler() {
		return new JdbcHandler(new BatchUpdateHandler(getDataSource()));
	}
	
	/**
	 * 创建一个使用指定名字的DataSource的执行批量更新操作的JdbcHandler.
	 * @param dsName 数据源的名字
	 * @return JdbcHandler对象
	 */
	public JdbcHandler createBatchUpdateHandler(String dsName) {
		return new JdbcHandler(new BatchUpdateHandler(getDataSource(dsName)));
	}
	
	
	// 以下方法通常不需要开发人员直接调用.
	
	/**
	 * 通过默认的DataSource取得一个可用的数据库链接.
	 * @return 一个数据库链接
	 * @throws CannotGetJdbcConnectionException
	 */
	public final Connection getConnection() throws CannotGetJdbcConnectionException {
		return DataSourceUtils.getConnection(getDataSource());
	}
	
	/**
	 * 通过指定名字的DataSource取得一个可用的数据库链接.
	 * @param dsName 数据源的名字
	 * @return 一个数据库链接
	 * @throws CannotGetJdbcConnectionException
	 */
	public final Connection getConnection(String dsName) throws CannotGetJdbcConnectionException {
		return DataSourceUtils.getConnection(getDataSource(dsName));
	}
	
	
	/**
	 * 取得默认的DataSource
	 * @return DataSource对象
	 */
	public DataSource getDataSource() {
		return dataSource!=null?dataSource:getFirstDataSource();
	}
	
	/**
	 * 取得指定名字的DataSource
	 * @param dsName 数据源的名字
	 * @return DataSource对象
	 */
	public DataSource getDataSource(String dsName){
		return (DataSource)getDataSources().get(dsName);
	}


	// 以下为若干"关闭"方法,比较好理解,就不一一写注释了.
	// 如果使用JabcHandler来进行数据库操作,通常并不需要使用下面的方法.
	public final void close(ResultSet rs) {
		JdbcUtils.closeResultSet(rs);
	}
	
	public final void close(Statement statement) {
		JdbcUtils.closeStatement(statement);
	}

	
	public final void close(Connection conn) {
		DataSourceUtils.releaseConnection(conn, getDataSource());
	}
	public final void close(Connection conn,String dsName) {
		DataSourceUtils.releaseConnection(conn, getDataSource(dsName));
	}
	
	public final void close(ResultSet rs,Statement statement) {
		close(rs,statement,null);
	}
	
	public final void close(Statement statement,Connection conn) {
		close(null,statement,conn);
	}
	
	public final void close(Statement statement,Connection conn,String dsName) {
		close(null,statement,conn,dsName);
	}
	
	public final void close(ResultSet rs,Statement statement,Connection conn) {
		close(rs);
		close(statement);
		close(conn);
	}
	public final void close(ResultSet rs,Statement statement,Connection conn,String dsName) {
		close(rs);
		close(statement);
		close(conn,dsName);
	}
	

	public void addDataSource(String name,DataSource dataSource) {
		if (dataSources==null){
			dataSources=new LinkedHashMap();
		}
		dataSources.put(name, dataSource);
	}
	
	public void setDataSource(DataSource dataSource) {
		this.dataSource = dataSource;
	}

	public Map getDataSources() {
		return dataSources;
	}

	public void setDataSources(Map dataSources) {
		this.dataSources = (LinkedHashMap)dataSources;
	}
	
	public DataSource getFirstDataSource(){
		return (DataSource)dataSources.entrySet().iterator().next();
	}
	
	public final SQLExceptionTranslator getExceptionTranslator() {
		return createJdbcHandler().getJdbcTemplate().getExceptionTranslator();
	}

	public final void setExceptionTranslator(SQLExceptionTranslator sqlExceptionTranslator) {
		createJdbcHandler().getJdbcTemplate().setExceptionTranslator(sqlExceptionTranslator);
	}
	
	
	protected final static  String  defaultDriverName="oracle.jdbc.driver.OracleDriver";
	public void addDataSource(String name,String url,String username,String password) {
		if (dataSources==null){
			dataSources=new LinkedHashMap();
		}
		dataSources.put(name, new DriverManagerDataSource(defaultDriverName,url,username,password));
	}
	
	public void setDataSource(String url,String username,String password) {
		this.dataSource = new DriverManagerDataSource(defaultDriverName,url,username,password);
	}


	
}
