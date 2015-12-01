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
		����һ�� WindowVO ���� 
	*/ 
	public void addWindowVO(WindowVO vo) {
		addElement(vo);
	}

	/** 
		�����кŻ�ȡһ�� WindowVO ���� 
	*/ 
	public WindowVO getWindow(int index) {
		return (WindowVO)getElement(index);
	}

	/** 
		�û�ResultSet�������Ӷ�� WindowVO ���� 
	*/ 
	public void addWindowResultSet(ResultSet resultSet) throws SQLException {
		while(resultSet.next()) {
			WindowVO vo = new WindowVO(); 
			vo.setAttribute(resultSet);
			addWindowVO (vo);
		}
	}

}