package com.neusoft.om.interfase.authorize;

import javax.sql.DataSource;
/**
 * 
 * @author zhaofan
 *
 *  ��ȡdataSource
 */
public class DataSourceDAOImpl {

	private DataSource dataSource;

	public DataSource getDataSource() {
		return dataSource;
	}

	public void setDataSource(DataSource dataSource) {
		this.dataSource = dataSource;
	}
	
}
