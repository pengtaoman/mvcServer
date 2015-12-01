package com.neusoft.om.dao.datatable;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

/**brief description
 * <p>Date       : 2004-12-14</p>
 * <p>Module     : om</p>
 * <p>Description: datatable maintenance</p>
 * <p>Remark     : </p>
 * @author ren.hui@neusoft.com
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> 修改历史</p>
 * <p>  序号		日期		修改人			修改原因</p>
 * <p>   1                                       </p>
 */
public interface DataTableDAO extends BaseDao{
	public static final String BEAN = "dataTableDAO";
	/**
	 * 根据主键查
	 * @param tableName
	 * @return DataTableVO
	 * @throws DataAccessException
	 */
	public DataTableVO getDataTableInfoByTalbeName(String tableName) throws DataAccessException;
	/**
	 * 根据角色Id得到该角色对应的数据表信息
	 * @param roleId
	 * @return DataTableColl
	 * @throws DataAccessException
	 */
	public DataTableColl getDataTableInfoByRoleId(int roleId) throws DataAccessException;
	
	
}
