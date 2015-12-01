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
	 * ����һ��ʹ��Ĭ�ϵ�DataSource����ͨ��JdbcHandler.
	 * ��ͨ��JdbcHandler���ڽ��г���� crud����.
	 * @return JdbcHandler����
	 */
	public JdbcHandler createJdbcHandler() {
		return new JdbcHandler(new JdbcTemplatePlus(getDataSource()));
	}
	
	/**
	 * ����һ��ʹ��ָ�����ֵ�DataSource����ͨ��JdbcHandler.
	 * ��ͨ��JdbcHandler���ڽ��г���� crud����.
	 * @param dsName ����Դ������
	 * @return JdbcHandler����
	 */
	public JdbcHandler createJdbcHandler(String dsName) {
		return new JdbcHandler(new JdbcTemplatePlus(getDataSource(dsName)));
	}
	
	/**
	 * ����һ��ʹ��Ĭ�ϵ�DataSource��ִ�д洢���̵�JdbcHandler.
	 * @return JdbcHandler����
	 */
	public JdbcHandler createProcedureHandler() {
		return new JdbcHandler(new StoredProcedureHandler(getDataSource()));
	}
	
	/**
	 * ����һ��ʹ��ָ�����ֵ�DataSource��ִ�д洢���̵�JdbcHandler.
	 * @param dsName ����Դ������
	 * @return JdbcHandler����
	 */
	public JdbcHandler createProcedureHandler(String dsName) {
		return new JdbcHandler(new StoredProcedureHandler(getDataSource(dsName)));
	}
	
	
	/**
	 * ����һ��ʹ��Ĭ�ϵ�DataSource��ִ���������²�����JdbcHandler.
	 * @return JdbcHandler����
	 */
	public JdbcHandler createBatchUpdateHandler() {
		return new JdbcHandler(new BatchUpdateHandler(getDataSource()));
	}
	
	/**
	 * ����һ��ʹ��ָ�����ֵ�DataSource��ִ���������²�����JdbcHandler.
	 * @param dsName ����Դ������
	 * @return JdbcHandler����
	 */
	public JdbcHandler createBatchUpdateHandler(String dsName) {
		return new JdbcHandler(new BatchUpdateHandler(getDataSource(dsName)));
	}
	
	
	// ���·���ͨ������Ҫ������Աֱ�ӵ���.
	
	/**
	 * ͨ��Ĭ�ϵ�DataSourceȡ��һ�����õ����ݿ�����.
	 * @return һ�����ݿ�����
	 * @throws CannotGetJdbcConnectionException
	 */
	public final Connection getConnection() throws CannotGetJdbcConnectionException {
		return DataSourceUtils.getConnection(getDataSource());
	}
	
	/**
	 * ͨ��ָ�����ֵ�DataSourceȡ��һ�����õ����ݿ�����.
	 * @param dsName ����Դ������
	 * @return һ�����ݿ�����
	 * @throws CannotGetJdbcConnectionException
	 */
	public final Connection getConnection(String dsName) throws CannotGetJdbcConnectionException {
		return DataSourceUtils.getConnection(getDataSource(dsName));
	}
	
	
	/**
	 * ȡ��Ĭ�ϵ�DataSource
	 * @return DataSource����
	 */
	public DataSource getDataSource() {
		return dataSource!=null?dataSource:getFirstDataSource();
	}
	
	/**
	 * ȡ��ָ�����ֵ�DataSource
	 * @param dsName ����Դ������
	 * @return DataSource����
	 */
	public DataSource getDataSource(String dsName){
		return (DataSource)getDataSources().get(dsName);
	}


	// ����Ϊ����"�ر�"����,�ȽϺ����,�Ͳ�һһдע����.
	// ���ʹ��JabcHandler���������ݿ����,ͨ��������Ҫʹ������ķ���.
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
