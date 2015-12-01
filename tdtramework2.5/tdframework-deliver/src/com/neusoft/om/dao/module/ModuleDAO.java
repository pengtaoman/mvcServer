package com.neusoft.om.dao.module;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;


/**brief description
 * <p>Date       : 2004-12-06</p>
 * <p>Module     : om</p>
 * <p>Description: module maintance</p>
 * <p>Remark     : </p>
 * @author ren.hui@neusoft.com
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> 修改历史</p>
 * <p>  序号		日期		修改人			修改原因</p>
 * <p>   1                                       </p>
 */
public interface ModuleDAO extends BaseDao {
	/**
	 * 根据模块编号得到模块信息
	 * @param moduleId
	 * @return
	 * @throws DataAccessException
	 */
	public ModuleVO getModuleInfoByModuleId(String moduleId) throws DataAccessException;
	/**
	 * 根据系统编号得到模块信息集合
	 * @param systemId
	 * @return
	 * @throws DataAccessException
	 */
	public ModuleColl getModuleInfoBySystemId(String systemId) throws DataAccessException;
	/**
	 * 增加模块信息
	 * @param vo
	 * @return
	 * @throws DataAccessException
	 */
	public int doAddModule(ModuleVO vo) throws DataAccessException;
	/**
	 * 修改模块信息
	 * @param vo
	 * @return
	 * @throws DataAccessException
	 */
	public int doModifyModule(ModuleVO vo) throws DataAccessException;
	/**
	 * 根据模块id删除信息
	 * @param moduleId
	 * @return
	 * @throws DataAccessException
	 */
	public int doDeleteModuleByModuleId(String moduleId) throws DataAccessException;
	/**
	 * 根据系统标识删除模块信息
	 * @param moduleId
	 * @return
	 * @throws DataAccessException
	 */
	public int doDeleteModuleBySystemId(String systemId) throws DataAccessException;
	
}