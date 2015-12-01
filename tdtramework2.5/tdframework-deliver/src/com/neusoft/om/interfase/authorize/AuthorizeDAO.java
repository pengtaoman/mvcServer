package com.neusoft.om.interfase.authorize;

import java.util.Map;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

public interface AuthorizeDAO extends BaseDao{
	/**
	 * 
	 * @param workNo
	 * @param newAreaId
	 * @return map : key=code(1:��ʾ��ת�����д��ڹ��ţ�0��ʾ�õ���û�ж�Ӧ�Ĺ���)
	 * @throws DataAccessException
	 */
	public Map getNewUserInfo(String workNo, String newAreaId) throws DataAccessException;
	/**
	 * ���ݵ�ǰ��¼�˺ţ�Ҫ�л��ĵ��б�ŵõ��µĵ�¼�˺���Ϣ
	 * @param workNo
	 * @param newArea
	 * @return map:key=employeeVO,organVO,areaVO
	 * @throws DataAccessException
	 */
	public Map changeUser(String workNo) throws DataAccessException;

}
