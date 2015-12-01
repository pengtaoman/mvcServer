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
		����һ�� DataTableVO ���� 
	*/ 
	public void addDataTableVO(DataTableVO vo) {
		addElement(vo);
	}

	/** 
		�����кŻ�ȡһ�� DataTableVO ���� 
	*/ 
	public DataTableVO getDataTable(int index) {
		return (DataTableVO)getElement(index);
	}

	/** 
		�û�ResultSet�������Ӷ�� DataTableVO ���� 
	*/ 
	public void addDataTableResultSet(ResultSet resultSet) throws SQLException {
		while(resultSet.next()) {
			DataTableVO vo = new DataTableVO(); 
			vo.setAttribute(resultSet);
			addDataTableVO (vo);
		}
	}

}