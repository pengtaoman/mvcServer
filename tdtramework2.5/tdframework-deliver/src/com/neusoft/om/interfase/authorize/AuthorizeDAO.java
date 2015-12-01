package com.neusoft.om.interfase.authorize;

import java.util.Map;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

public interface AuthorizeDAO extends BaseDao{
	/**
	 * 
	 * @param workNo
	 * @param newAreaId
	 * @return map : key=code(1:表示需转换地市存在工号，0表示该地市没有对应的工号)
	 * @throws DataAccessException
	 */
	public Map getNewUserInfo(String workNo, String newAreaId) throws DataAccessException;
	/**
	 * 根据当前登录账号，要切换的地市编号得到新的登录账号信息
	 * @param workNo
	 * @param newArea
	 * @return map:key=employeeVO,organVO,areaVO
	 * @throws DataAccessException
	 */
	public Map changeUser(String workNo) throws DataAccessException;

}
