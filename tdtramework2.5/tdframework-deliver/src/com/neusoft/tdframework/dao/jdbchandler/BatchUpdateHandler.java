package com.neusoft.tdframework.dao.jdbchandler;

import javax.sql.DataSource;

import org.springframework.jdbc.object.BatchSqlUpdate;

/**
 * ����Ĵ�����ҪĿ������ȫ��DAO������spring��ź,ʹDAO�㲻ֱ��������spring,
 * ���Ͻ��������ϲ��ڲ���spring,��spring�����ϴ�仯ʱ��DAO�����Ӱ��.
 * 
 * �����÷���μ�spring API�ĵ��� BatchSqlUpdate�� ����
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
