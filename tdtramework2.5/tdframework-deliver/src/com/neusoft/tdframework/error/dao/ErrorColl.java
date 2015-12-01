package com.neusoft.tdframework.error.dao; 

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

public class ErrorColl extends ObjectCollection { 
	/** 
		增加一个 ErrorVO 对象 
	*/ 
	public void addErrorVO(ErrorVO vo) {
		addElement(vo);
	}

	/** 
		按照行号获取一个 ErrorVO 对象 
	*/ 
	public ErrorVO getError(int index) {
		return (ErrorVO)getElement(index);
	}

	/** 
		用户ResultSet对象增加多个 Error 对象 
	*/ 
	public void addError(ResultSet resultSet) throws SQLException {
		while(resultSet.next()) {
			ErrorVO vo = new ErrorVO(); 
			vo.setError_code(resultSet.getInt("error_code"));
			vo.setError_info(resultSet.getString("error_info"));
			addErrorVO (vo);
		}
	}

}