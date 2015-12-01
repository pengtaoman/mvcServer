package com.neusoft.om.dao.region;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

public interface AreaCodeDAO   extends BaseDao {
	public static final String BEAN_NAME="areaCodeDAO";
	/**
	 * ��ȡ������Ϣ
	 * @return
	 * @throws DataAccessException
	 */
	AreaCodeColl getAreaCodeColl(long regionId) throws DataAccessException;
	/**
	 * ɾ��������Ϣ
	 * @param regionId
	 * @return
	 * @throws DataAccessException
	 */
	public int deleteAreaCode(long regionId) throws DataAccessException;
	
	/**
	 * ����������Ϣ
	 * @param regionId
	 * @return
	 * @throws DataAccessException
	 */
	public int insertAreaCode(AreaCodeVO areaCodeVO) throws DataAccessException;
}
