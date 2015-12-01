package com.neusoft.om.interfase.ebisp.data;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.ObjectCollection;

/**
 * Title:
 * Description:
 * Company: neusoft
 * Date: 2006-11-17
 * @author zhaof@neusoft.com
 * @version
 */

public class StyleColl extends ObjectCollection { 
	
	private static final long serialVersionUID = 1L;
	/** 
		增加一个 StyleVO 对象 
	*/ 
	public void addStyleVO(StyleVO vo) {
		addElement(vo);
	}

	/** 
		按照行号获取一个 StyleVO 对象 
	*/ 
	public StyleVO getStyle(int index) {
		return (StyleVO)getElement(index);
	}

	/** 
		用户ResultSet对象增加多个 StyleVO 对象 
	*/ 
	public void addStyleResultSet(ResultSet resultSet) throws SQLException {
		while(resultSet.next()) {
			StyleVO vo = new StyleVO(); 
			vo.setAttribute(resultSet);
			addStyleVO (vo);
		}
	}

}