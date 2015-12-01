package com.neusoft.om.interfase.ebisp.data;

import java.sql.ResultSet;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.ObjectCollection;

/**
 * Title:
 * Description:
 * Company: neusoft
 * Date: 2006-11-06
 * @author zhaof@neusoft.com
 * @version
 */

public class ButtonColl extends ObjectCollection { 
	
	private static final long serialVersionUID = 1L;
	/** 
		增加一个 ButtonVO 对象 
	*/ 
	public void addButtonVO(ButtonVO vo) {
		addElement(vo);
	}

	/** 
		按照行号获取一个 ButtonVO 对象 
	*/ 
	public ButtonVO getButton(int index) {
		return (ButtonVO)getElement(index);
	}

	/** 
		用户ResultSet对象增加多个 ButtonVO 对象 
	*/ 
	public void addButtonResultSet(ResultSet resultSet) throws SQLException {
		while(resultSet.next()) {
			ButtonVO vo = new ButtonVO(); 
			vo.setAttribute(resultSet);
			addButtonVO (vo);
		}
	}

}