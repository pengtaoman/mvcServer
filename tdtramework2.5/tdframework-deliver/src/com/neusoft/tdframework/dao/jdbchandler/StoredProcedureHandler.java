package com.neusoft.tdframework.dao.jdbchandler;

import javax.sql.DataSource;

import org.springframework.jdbc.object.StoredProcedure;


/**
 * ����Ĵ�����ҪĿ������ȫ��DAO������spring��ź,ʹDAO�㲻ֱ��������spring,
 * ���Ͻ��������ϲ��ڲ���spring,��spring�����ϴ�仯ʱ��DAO�����Ӱ��.
 * 
 * �����÷���μ�spring API�ĵ��� StoredProcedure�� ����
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
