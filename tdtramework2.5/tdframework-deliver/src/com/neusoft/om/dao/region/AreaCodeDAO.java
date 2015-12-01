package com.neusoft.om.dao.region;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

public interface AreaCodeDAO   extends BaseDao {
	public static final String BEAN_NAME="areaCodeDAO";
	/**
	 * 获取区号信息
	 * @return
	 * @throws DataAccessException
	 */
	AreaCodeColl getAreaCodeColl(long regionId) throws DataAccessException;
	/**
	 * 删除区号信息
	 * @param regionId
	 * @return
	 * @throws DataAccessException
	 */
	public int deleteAreaCode(long regionId) throws DataAccessException;
	
	/**
	 * 新增区号信息
	 * @param regionId
	 * @return
	 * @throws DataAccessException
	 */
	public int insertAreaCode(AreaCodeVO areaCodeVO) throws DataAccessException;
}
