package com.neusoft.om.omutil;

import com.neusoft.om.dao.organ.OrganColl;
import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

public interface OmOrganUtilDAO extends BaseDao{
	/**
	 * 得到工号对应的组织机构数据角色
	 * @param employeeId
	 * @return
	 * @throws DataAccessException
	 */
	public int getOrganParamId(String employeeId) throws DataAccessException;
	
	/**
	 * 得到与组织机构平级的组织机构和这些组织机构下属的所有组织机构（parent不为空，则返回其兄弟部门）
	 * @param organId
	 * @return
	 * @throws DataAccessException
	 */
	public OrganColl getSameLevelAndChildOrgan(String organId) throws DataAccessException;
	
	/**
	 * 得到与组织机构平级的所有组织机构（parent为空，则返回同区域其他parent为空的部门和这些部门的所有下级部门
	 * @param organId
	 * @return
	 * @throws DataAccessException
	 */
	public OrganColl getSameAndChildPrtIsNull(String organId) throws DataAccessException;
	
	/**
	 * 得到当前组织机构和以下级的所有组织机构（包括下级和下下级...）
	 * @param organId
	 * @return
	 * @throws DataAccessException
	 */
	public OrganColl getChildOrganColl(String organId) throws DataAccessException;
	
	/**
	 * 得到与组织机构平级的市场部和这些市场部下级的所有市场部，只返回市场部类型的部门数据
	 * 适用于当前市场部的上级不为空的情况
	 * @param organId
	 * @return
	 * @throws DataAccessException
	 */
	public OrganColl getSameLevelAndChildMarket(String organId) throws DataAccessException;
	
	/**
	 * 得到与组织机构平级的市场部和这些市场部下级的所有市场部，只返回市场部类型的部门数据
	 * 适用于当前市场部的上级为空的情况。
	 * @param organId
	 * @return
	 * @throws DataAccessException
	 */
	public OrganColl getSameAndCldMarketPrtIsNull(String organId) throws DataAccessException;
	
	/**
	 * 得到当前市场部和以下级的所有市场部（包括下级和下下级...）
	 * @param organId
	 * @return
	 * @throws DataAccessException
	 */
	public OrganColl getChildMarketColl(String organId) throws DataAccessException;

	/**
	 * 得到当前市场部和以下级的所有市场部（包括下级和下下级...）
	 * 要求city_code相同的市场部
	 * @param organId
	 * @param cityCode
	 * @return
	 * @throws DataAccessException
	 */
	public OrganColl getSameCityChildMarketColl(String organId, String cityCode) throws DataAccessException;
	/**
	 * 得到与组织机构平级的市场部和这些市场部下级的所有市场部，只返回市场部类型的部门数据
	 * 适用于当前市场部的上级不为空的情况
	 * 要求返回city_code相同的市场部
	 * @param organId
	 * @return
	 * @throws DataAccessException
	 */
	public OrganColl getSameLevelAndChildMarket(String organId, String cityCode) throws DataAccessException;
	
	/**
	 * 得到与组织机构平级的市场部和这些市场部下级的所有市场部，只返回市场部类型的部门数据
	 * 适用于当前市场部的上级为空的情况。
	 *  要求返回city_code相同的市场部
	 * @param organId
	 * @return
	 * @throws DataAccessException
	 */
	public OrganColl getSameAndCldMarketPrtIsNull(String organId, String cityCode) throws DataAccessException;
	
	/**
	 * 得到输入city_code对应地市的所有市场部和所有子市场部
	 * @param cityCode
	 * @return
	 * @throws DataAccessException
	 */
	public OrganColl getAllCityMarket(String cityCode) throws DataAccessException;
	
	/**
	 * 得到city_code对应地市或省份的所有部门
	 * @param cityCode
	 * @return
	 * @throws DataAccessException
	 */
	public OrganColl getAllCityOrgan(String cityCode) throws DataAccessException;
	
	public int getAreaLevel(String areaId) throws DataAccessException;
	
	public int getDepartmentKind(String organId) throws DataAccessException;
}
