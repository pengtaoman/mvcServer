package com.neusoft.om.omutil;

import com.neusoft.om.dao.organ.OrganColl;
import com.neusoft.tdframework.core.BaseBO;
import com.neusoft.tdframework.exception.ServiceException;

public interface OmOrganUtilBO extends BaseBO{
	/**
	 * 传入操作员ID，返回该操作员可见的所有组织机构信息
	 * 操作员权限分为三种
	 * 最大权限的可见：本人所在部门，与本人所在部门平级（如果parent不为空则平级表示同一个父亲的兄弟，如果parent为空，
	 * 				则平级表示areaId相同的parent为空的部门），和这些组织机构的下级所有组织机构
	 * 中等权限的可见：本人所在部门及以下级所有的部门
	 * 最小权限的可见：本人所在部门
	 * @param employeeId
	 * @return
	 * @throws ServiceException
	 */
	public OrganColl getOrganCollByAuthId(String employeeId) throws ServiceException;
	
	/**
	 * 传入操作员ID，返回该操作员可见的所有市场部信息
	 * 操作员权限分为三种
	 * 最大权限的可见：本人所在市场部，与本人所在市场部平级（如果parent不为空则平级表示同一个父亲的兄弟，如果parent为空，
	 * 				则平级表示areaId相同的parent为空的市场部），和这些市场部的下级所有市场部
	 * 中等权限的可见：本人所在市场部及以下级所有的市场部
	 * 最小权限的可见：本人所在市场部
	 * 前提：当前操作员归属的部门一定是市场部类型才可以
	 * @param employeeId
	 * @param cityCode
	 * @return
	 * @throws ServiceException
	 */
	public OrganColl getMarketCollByAuthId(String employeeId, String cityCode) throws ServiceException;
	
	/**
	 * 返回操作员的所有下级市场部信息（返回的数据要求city_code相同）
	 * @param employeeId
	 * @param cityCode
	 * @return
	 * @throws ServiceException
	 */
	public OrganColl getChildMarketCollByAuthId(String employeeId, String cityCode) throws ServiceException;
	
	/**
	 * 传入市场部ID，返回市场部的所有下级市场部信息(同区域)
	 * 返回的数据要求city_code相同
	 * @param organId
	 * @param cityCode
	 * @return
	 * @throws ServiceException
	 */
	public OrganColl getChildMarketCollByOrgId( String organId, String cityCode ) throws ServiceException;
	
	/**
	 * 传入市场部ID，返回市场部的所有同级别市场部信息(此处同级别是指：市场部所在区域的AREA_LEVEL相同，并且归属于同一个市场部)
	 * 返回的数据要求city_code相同
	 * @param organId
	 * @param cityCode
	 * @return
	 * @throws ServiceException
	 */
	public OrganColl getSameLevelAndCldOrgColl(String organId, String cityCode) throws ServiceException;
}
