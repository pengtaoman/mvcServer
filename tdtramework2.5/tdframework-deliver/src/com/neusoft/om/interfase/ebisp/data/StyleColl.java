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
		����һ�� StyleVO ���� 
	*/ 
	public void addStyleVO(StyleVO vo) {
		addElement(vo);
	}

	/** 
		�����кŻ�ȡһ�� StyleVO ���� 
	*/ 
	public StyleVO getStyle(int index) {
		return (StyleVO)getElement(index);
	}

	/** 
		�û�ResultSet�������Ӷ�� StyleVO ���� 
	*/ 
	public void addStyleResultSet(ResultSet resultSet) throws SQLException {
		while(resultSet.next()) {
			StyleVO vo = new StyleVO(); 
			vo.setAttribute(resultSet);
			addStyleVO (vo);
		}
	}

}