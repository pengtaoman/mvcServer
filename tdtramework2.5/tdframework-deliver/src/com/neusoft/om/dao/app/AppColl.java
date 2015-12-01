package com.neusoft.om.dao.app;

import java.sql.ResultSet;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.ObjectCollection;

/**
 * Title:
 * Description:
 * Company: neusoft
 * Date: 2006-11-24
 * @author zhaof@neusoft.com
 * @version
 */

public class AppColl extends ObjectCollection { 
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/** 
		增加一个 AppVO 对象 
	*/ 
	public void addAppVO(AppVO vo) {
		addElement(vo);
	}

	/** 
		按照行号获取一个 AppVO 对象 
	*/ 
	public AppVO getApp(int index) {
		return (AppVO)getElement(index);
	}

	/** 
		用户ResultSet对象增加多个 AppVO 对象 
	*/ 
	public void addAppResultSet(ResultSet resultSet) throws SQLException {
		while(resultSet.next()) {
			AppVO vo = new AppVO(); 
			vo.setAttribute(resultSet);
			addAppVO (vo);
		}
	}

}