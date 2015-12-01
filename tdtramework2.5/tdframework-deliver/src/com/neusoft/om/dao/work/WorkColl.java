package com.neusoft.om.dao.work; 

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

public class WorkColl extends ObjectCollection { 
	/** 
		����һ�� WorkVO ���� 
	*/ 
	public void addWorkVO(WorkVO vo) {
		addElement(vo);
	}

	/** 
		�����кŻ�ȡһ�� WorkVO ���� 
	*/ 
	public WorkVO getWork(int index) {
		return (WorkVO)getElement(index);
	}

	/** 
		�û�ResultSet�������Ӷ�� Work ���� 
	*/ 
	public void addWork(ResultSet resultSet) throws SQLException {
		while(resultSet.next()) {
			WorkVO vo = new WorkVO(); 
			vo.setAttribute(resultSet);
			addWorkVO (vo);
		}
	}

}