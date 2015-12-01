package com.neusoft.om.dao.datarole;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

/**brief description
 * <p>Date       : 2004-12-14</p>
 * <p>Module     : om</p>
 * <p>Description: datarole maintenance</p>
 * <p>Remark     : </p>
 * @author ren.hui@neusoft.com
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> 修改历史</p>
 * <p>  序号		日期		修改人			修改原因</p>
 * <p>   1                                       </p>
 */
public interface DataRoleDAO extends BaseDao {
	public static final String BEAN = "dataRoleDao";
	/**
	 * 通过角色Id得到数据角色信息集合
	 * @param roleId
	 * @return
	 * @throws DataAccessException
	 */
	public DataRoleColl getDataRoleInfoByRoleId(int roleId) throws DataAccessException;
	/**
	 * 增加一条数据角色信息的记录
	 * @param vo
	 * @return
	 * @throws DataAccessException
	 */
	public int doAddDataRoleInfo(DataRoleVO vo) throws DataAccessException;
	/**
	 * 修改一条数据角色信息的记录
	 * @param vo
	 * @return
	 * @throws DataAccessException
	 */
	public int doModifyDataRoleInfo(DataRoleVO vo) throws DataAccessException;
	/**
	 * 删除该角色下的所有信息
	 * @param roleId
	 * @return
	 * @throws DataAccessException
	 */
	public int doDeleteDataRoleByRoleId(int roleId) throws DataAccessException;
	/**
	 * 根据主键角色id,表名删除信息
	 * @param roleId
	 * @param tableName
	 * @return
	 * @throws DataAccessException
	 */
	public int doDeleteDataRoleByRoleIdTableName(int roleId,String tableName) throws DataAccessException;
	

}
