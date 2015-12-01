package com.neusoft.tdframework.dao.jdbchandler;

import java.util.ArrayList;
import java.util.List;

import org.springframework.jdbc.core.RowCallbackHandler;

/**
 * ����Ĵ�����ҪĿ������ȫ��DAO������spring��ź,ʹDAO�㲻ֱ��������spring,
 * ���Ͻ��������ϲ��ڲ���spring,��spring�����ϴ�仯ʱ��DAO�����Ӱ��.
 * 
 * �����÷���μ�spring API�ĵ��� RowCallbackHandler�� ����
 */
public abstract class ResultSetHandler implements RowCallbackHandler {
	private final ArrayList results = new ArrayList( );
	
	/**
	 * �ڵ��������ʱ,��������¼����һ������ļ�����.
	 * @param record ������¼��Ӧ�Ķ���
	 */
	public void addRecord(Object record){
		results.add(record);
	}
	
	/**
	 * ȡ�ý���ļ���
	 * @return ����ļ���
	 */
	public List getRecordList(){
		return results;
	}
}
