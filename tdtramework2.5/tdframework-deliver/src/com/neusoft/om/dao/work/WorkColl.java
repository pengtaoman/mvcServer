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
		增加一个 WorkVO 对象 
	*/ 
	public void addWorkVO(WorkVO vo) {
		addElement(vo);
	}

	/** 
		按照行号获取一个 WorkVO 对象 
	*/ 
	public WorkVO getWork(int index) {
		return (WorkVO)getElement(index);
	}

	/** 
		用户ResultSet对象增加多个 Work 对象 
	*/ 
	public void addWork(ResultSet resultSet) throws SQLException {
		while(resultSet.next()) {
			WorkVO vo = new WorkVO(); 
			vo.setAttribute(resultSet);
			addWorkVO (vo);
		}
	}

}