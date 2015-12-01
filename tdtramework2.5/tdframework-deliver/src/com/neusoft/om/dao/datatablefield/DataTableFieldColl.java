package com.neusoft.om.dao.datatablefield; 

import java.sql.ResultSet;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.ObjectCollection;

/**
 * Title:
 * Description:
 * Company: neusoft
 * Date: 2004-12-14
 * @author ren.hui@neusoft.com
 * @version
 */

public class DataTableFieldColl extends ObjectCollection { 
	/** 
		增加一个 DataTableFieldVO 对象 
	*/ 
	public void addDataTableFieldVO(DataTableFieldVO vo) {
		addElement(vo);
	}

	/** 
		按照行号获取一个 DataTableFieldVO 对象 
	*/ 
	public DataTableFieldVO getDataTableField(int index) {
		return (DataTableFieldVO)getElement(index);
	}

	/** 
		用户ResultSet对象增加多个 DataTableFieldVO 对象 
	*/ 
	public void addDataTableFieldResultSet(ResultSet resultSet) throws SQLException {
		while(resultSet.next()) {
			DataTableFieldVO vo = new DataTableFieldVO(); 
			vo.setAttribute(resultSet);
			addDataTableFieldVO (vo);
		}
	}

}