package com.neusoft.tdframework.dao.jdbchandler;

import javax.sql.DataSource;

import org.springframework.jdbc.object.BatchSqlUpdate;

/**
 * 该类的存在主要目的是让全部DAO代码与spring解藕,使DAO层不直接依赖于spring,
 * 加上将来因技术上不在采用spring,或spring发生较大变化时对DAO代码的影响.
 * 
 * 具体用法请参见spring API文档的 BatchSqlUpdate类 部分
 */
public class BatchUpdateHandler extends BatchSqlUpdate {

	public BatchUpdateHandler() {
		super();

	}
	public BatchUpdateHandler(DataSource ds) {
		this();
		this.setDataSource(ds);
	}
	
	public BatchUpdateHandler(DataSource ds,String sql) {
		super(ds,sql);
	}
}
