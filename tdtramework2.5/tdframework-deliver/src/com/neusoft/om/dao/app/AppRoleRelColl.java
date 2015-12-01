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

public class AppRoleRelColl extends ObjectCollection { 
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/** 
		增加一个 AppRoleRelVO 对象 
	*/ 
	public void addAppRoleRelVO(AppRoleRelVO vo) {
		addElement(vo);
	}

	/** 
		按照行号获取一个 AppRoleRelVO 对象 
	*/ 
	public AppRoleRelVO getAppRoleRel(int index) {
		return (AppRoleRelVO)getElement(index);
	}

	/** 
		用户ResultSet对象增加多个 AppRoleRelVO 对象 
	*/ 
	public void addAppRoleRelResultSet(ResultSet resultSet) throws SQLException {
		while(resultSet.next()) {
			AppRoleRelVO vo = new AppRoleRelVO(); 
			vo.setAttribute(resultSet);
			addAppRoleRelVO (vo);
		}
	}

}