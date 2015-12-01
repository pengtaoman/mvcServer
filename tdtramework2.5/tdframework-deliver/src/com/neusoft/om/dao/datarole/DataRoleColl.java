package com.neusoft.om.dao.datarole; 

import java.sql.ResultSet;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.ObjectCollection;

/**
 * Title: ���ݽ�ɫ����
 * Description:
 * Company: neusoft
 * Date: 2004-12-14
 * @author ren.hui@neusoft.com
 * @version
 */

public class DataRoleColl extends ObjectCollection { 
	/** 
		����һ�� DataRoleVO ���� 
	*/ 
	public void addDataRoleVO(DataRoleVO vo) {
		addElement(vo);
	}

	/** 
		�����кŻ�ȡһ�� DataRoleVO ���� 
	*/ 
	public DataRoleVO getDataRole(int index) {
		return (DataRoleVO)getElement(index);
	}

	/** 
		�û�ResultSet�������Ӷ�� DataRoleVO ���� 
	*/ 
	public void addDataRoleResultSet(ResultSet resultSet) throws SQLException {
		while(resultSet.next()) {
			DataRoleVO vo = new DataRoleVO(); 
			vo.setAttribute(resultSet);
			addDataRoleVO (vo);
		}
	}

}
