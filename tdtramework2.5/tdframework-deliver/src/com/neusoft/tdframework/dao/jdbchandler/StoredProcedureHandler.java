package com.neusoft.tdframework.dao.jdbchandler;

import javax.sql.DataSource;

import org.springframework.jdbc.object.StoredProcedure;


/**
 * 该类的存在主要目的是让全部DAO代码与spring解藕,使DAO层不直接依赖于spring,
 * 加上将来因技术上不在采用spring,或spring发生较大变化时对DAO代码的影响.
 * 
 * 具体用法请参见spring API文档的 StoredProcedure类 部分
 */
public class StoredProcedureHandler extends StoredProcedure{

	
	public StoredProcedureHandler() {
		super();

	}
	public StoredProcedureHandler(DataSource ds) {
		this();
		this.setDataSource(ds);
	}
	
	public StoredProcedureHandler(DataSource ds,String sql) {
		super(ds,sql);
	}

}
