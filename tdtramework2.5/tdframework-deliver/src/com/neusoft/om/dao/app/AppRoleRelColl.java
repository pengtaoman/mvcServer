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
		����һ�� AppRoleRelVO ���� 
	*/ 
	public void addAppRoleRelVO(AppRoleRelVO vo) {
		addElement(vo);
	}

	/** 
		�����кŻ�ȡһ�� AppRoleRelVO ���� 
	*/ 
	public AppRoleRelVO getAppRoleRel(int index) {
		return (AppRoleRelVO)getElement(index);
	}

	/** 
		�û�ResultSet�������Ӷ�� AppRoleRelVO ���� 
	*/ 
	public void addAppRoleRelResultSet(ResultSet resultSet) throws SQLException {
		while(resultSet.next()) {
			AppRoleRelVO vo = new AppRoleRelVO(); 
			vo.setAttribute(resultSet);
			addAppRoleRelVO (vo);
		}
	}

}