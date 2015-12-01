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
		����һ�� DataTableFieldVO ���� 
	*/ 
	public void addDataTableFieldVO(DataTableFieldVO vo) {
		addElement(vo);
	}

	/** 
		�����кŻ�ȡһ�� DataTableFieldVO ���� 
	*/ 
	public DataTableFieldVO getDataTableField(int index) {
		return (DataTableFieldVO)getElement(index);
	}

	/** 
		�û�ResultSet�������Ӷ�� DataTableFieldVO ���� 
	*/ 
	public void addDataTableFieldResultSet(ResultSet resultSet) throws SQLException {
		while(resultSet.next()) {
			DataTableFieldVO vo = new DataTableFieldVO(); 
			vo.setAttribute(resultSet);
			addDataTableFieldVO (vo);
		}
	}

}