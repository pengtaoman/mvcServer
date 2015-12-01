package com.neusoft.om.interfase.ebisp.data;

import java.sql.ResultSet;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.ObjectCollection;

/**
 * Title:
 * Description:
 * Company: neusoft
 * Date: 2006-11-17
 * @author ren.hui@neusoft.com
 * @version
 */

public class IconColl extends ObjectCollection { 
	
	private static final long serialVersionUID = 1L;
	/** 
		增加一个 IconVO 对象 
	*/ 
	public void addIconVO(IconVO vo) {
		addElement(vo);
	}

	/** 
		按照行号获取一个 IconVO 对象 
	*/ 
	public IconVO getIcon(int index) {
		return (IconVO)getElement(index);
	}

	/** 
		用户ResultSet对象增加多个 IconVO 对象 
	*/ 
	public void addIconResultSet(ResultSet resultSet) throws SQLException {
		while(resultSet.next()) {
			IconVO vo = new IconVO(); 
			vo.setAttribute(resultSet);
			addIconVO (vo);
		}
	}

}