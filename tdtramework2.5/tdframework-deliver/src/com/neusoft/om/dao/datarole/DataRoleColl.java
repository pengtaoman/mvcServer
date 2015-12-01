package com.neusoft.om.dao.datarole; 

import java.sql.ResultSet;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.ObjectCollection;

/**
 * Title: 数据角色详情
 * Description:
 * Company: neusoft
 * Date: 2004-12-14
 * @author ren.hui@neusoft.com
 * @version
 */

public class DataRoleColl extends ObjectCollection { 
	/** 
		增加一个 DataRoleVO 对象 
	*/ 
	public void addDataRoleVO(DataRoleVO vo) {
		addElement(vo);
	}

	/** 
		按照行号获取一个 DataRoleVO 对象 
	*/ 
	public DataRoleVO getDataRole(int index) {
		return (DataRoleVO)getElement(index);
	}

	/** 
		用户ResultSet对象增加多个 DataRoleVO 对象 
	*/ 
	public void addDataRoleResultSet(ResultSet resultSet) throws SQLException {
		while(resultSet.next()) {
			DataRoleVO vo = new DataRoleVO(); 
			vo.setAttribute(resultSet);
			addDataRoleVO (vo);
		}
	}

}
