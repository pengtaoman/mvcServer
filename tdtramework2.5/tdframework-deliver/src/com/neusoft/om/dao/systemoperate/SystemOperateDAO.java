package com.neusoft.om.dao.systemoperate;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

public interface SystemOperateDAO extends BaseDao{
	public static final String BEAN = "systemDAO";
	/**
	 * 根据主键查找记录
	 * @param systemId
	 * @return
	 * @throws DataAccessException
	 */
	public SystemOperateVO getSystemInfoById(String systemId) throws DataAccessException;
	/**
	 * 获得所有系统信息
	 * @return
	 * @throws DataAccessException
	 */
	public SystemOperateColl getAllSystemInfo() throws DataAccessException;
	/**
	 * 根据操作员编号得到该操作原有权使用的系统集合
	 * @param employeeId
	 * @return
	 * @throws DataAccessException
	 */
	public SystemOperateVO getSystemInfoByName(String systemName) throws DataAccessException;
	public SystemOperateColl getSystemInfoByEmployeeId(String employeeId) throws DataAccessException;
	/**
	 * 获得使用web页面的系统信息
	 * @return
	 * @throws DataAccessException
	 */
	public SystemOperateColl getSystemInfoWeb() throws DataAccessException;
	/**
	 * 增加一条记录
	 * @param vo
	 * @return
	 * @throws DataAccessException
	 */
	public int doAddSystemInfo(SystemOperateVO vo) throws DataAccessException;
	/**
	 * 修改一条记录
	 * @param vo
	 * @return
	 * @throws DataAccessException
	 */
	public int doModifySystemInfo(SystemOperateVO vo,String oldSystemId) throws DataAccessException;
	/**
	 * 删除一条记录
	 * @param vo
	 * @return
	 * @throws DataAccessException
	 */
	public int doDeleteSystemInfo(String systemId) throws DataAccessException;
	
}