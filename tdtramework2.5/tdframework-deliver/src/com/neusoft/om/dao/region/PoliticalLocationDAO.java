package com.neusoft.om.dao.region;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

public interface PoliticalLocationDAO   extends BaseDao {
	public static final String BEAN_ID="politicalLocationDAO";
	
	/**
	 * 根据公用管理区域编号，获取所包含的行政区域信息
	 * @param commonRegionId
	 * @return
	 */
	PoliticalLocationColl getPoliticalLocationColl(long commonRegionId) throws DataAccessException;;
	
	/**
	 * 删除公用管理区域与行政区域的关联关系
	 * @param commonRegionId
	 * @return
	 */
	int deletePoliticalLocation(long commonRegionId) throws DataAccessException;;
	
	/**
	 * 获得行政区域树形集合
	 * @param politicalLocationRoot
	 * @return
	 */
	PoliticalLocationColl getPoliticalLocationTreeColl(PoliticalLocationColl politicalLocationRoot) throws DataAccessException;
 
	/**
	 * 新增公用管理区域与行政区域的关联关系
	 * @param commonRegionId
	 * @return
	 */
	int insertPoliticalLocation(PoliticalLocationVO vo) throws DataAccessException;;
}
