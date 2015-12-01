package com.neusoft.tdframework.dao.jdbchandler;

import java.util.ArrayList;
import java.util.List;

import org.springframework.jdbc.core.RowCallbackHandler;

/**
 * 该类的存在主要目的是让全部DAO代码与spring解藕,使DAO层不直接依赖于spring,
 * 加上将来因技术上不在采用spring,或spring发生较大变化时对DAO代码的影响.
 * 
 * 具体用法请参见spring API文档的 RowCallbackHandler类 部分
 */
public abstract class ResultSetHandler implements RowCallbackHandler {
	private final ArrayList results = new ArrayList( );
	
	/**
	 * 在迭代结果集时,将单条记录加入一个结果的集合中.
	 * @param record 单条记录对应的对象
	 */
	public void addRecord(Object record){
		results.add(record);
	}
	
	/**
	 * 取得结果的集合
	 * @return 结果的集合
	 */
	public List getRecordList(){
		return results;
	}
}
