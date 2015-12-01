package com.neusoft.om.dao.datatable; 

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

public class DataTableColl extends ObjectCollection { 
	/** 
		增加一个 DataTableVO 对象 
	*/ 
	public void addDataTableVO(DataTableVO vo) {
		addElement(vo);
	}

	/** 
		按照行号获取一个 DataTableVO 对象 
	*/ 
	public DataTableVO getDataTable(int index) {
		return (DataTableVO)getElement(index);
	}

	/** 
		用户ResultSet对象增加多个 DataTableVO 对象 
	*/ 
	public void addDataTableResultSet(ResultSet resultSet) throws SQLException {
		while(resultSet.next()) {
			DataTableVO vo = new DataTableVO(); 
			vo.setAttribute(resultSet);
			addDataTableVO (vo);
		}
	}

}