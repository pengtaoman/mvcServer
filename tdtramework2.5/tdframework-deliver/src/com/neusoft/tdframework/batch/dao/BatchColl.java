package com.neusoft.tdframework.batch.dao; 

import java.sql.ResultSet;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.ObjectCollection;

/**
 * Title:
 * Description:
 * Company: neusoft
 * Date: 2004-12-14
 * @author yang-lm@neusoft.com
 * @version
 */

public class BatchColl extends ObjectCollection { 
	/** 
		增加一个对象 
	*/ 
	public void addBatchVO(BatchVO vo) {
		addElement(vo);
	}

	/** 
		按照行号获取一个对象 
	*/ 
	public BatchVO getBatch(int index) {
		return (BatchVO)getElement(index);
	}

	/** 
		用户ResultSet对象增加多个对象 
	*/ 
	public void addBatch(ResultSet resultSet) throws SQLException {
		while(resultSet.next()) {
			BatchVO vo = new BatchVO(); 
			vo.setBatch_no(resultSet.getString("batch_no"));
			//vo.setStatus(resultSet.getInt("status"));
			vo.setCreate_operator(resultSet.getString("create_operator"));
			vo.setCreate_date(resultSet.getString("create_date"));
			vo.setCity_code(resultSet.getString("city_code"));
			vo.setDepartment_no(resultSet.getString("department_no"));
			vo.setFinish_date(resultSet.getString("finish_date"));
			vo.setModule_id(resultSet.getString("module_id"));
			vo.setSystem_id(resultSet.getString("system_id"));
			vo.setProcedure_name(resultSet.getString("procedure_name"));
			
			addBatchVO(vo);
		}
	}

}