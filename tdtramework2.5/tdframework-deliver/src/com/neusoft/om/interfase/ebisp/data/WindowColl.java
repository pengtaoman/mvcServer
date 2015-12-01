package com.neusoft.om.interfase.ebisp.data;

import java.sql.ResultSet;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.ObjectCollection;

/**
 * Title:
 * Description:
 * Company: neusoft
 * Date: 2006-09-26
 * @author zhaof@neusoft.com
 * @version
 */

public class WindowColl extends ObjectCollection { 
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/** 
		增加一个 WindowVO 对象 
	*/ 
	public void addWindowVO(WindowVO vo) {
		addElement(vo);
	}

	/** 
		按照行号获取一个 WindowVO 对象 
	*/ 
	public WindowVO getWindow(int index) {
		return (WindowVO)getElement(index);
	}

	/** 
		用户ResultSet对象增加多个 WindowVO 对象 
	*/ 
	public void addWindowResultSet(ResultSet resultSet) throws SQLException {
		while(resultSet.next()) {
			WindowVO vo = new WindowVO(); 
			vo.setAttribute(resultSet);
			addWindowVO (vo);
		}
	}

}