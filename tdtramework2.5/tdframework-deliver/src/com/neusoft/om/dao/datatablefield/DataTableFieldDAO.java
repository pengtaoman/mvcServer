/*
 * Created on 2004-12-14
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.om.dao.datatablefield;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

/**
 * @author renh
 *
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
public interface DataTableFieldDAO extends BaseDao{
	public static final String BEAN = "dataTableFieldDAO";
	/**
	 * ИљОн
	 * @param tableName
	 * @return
	 * @throws DataAccessException
	 */
	public DataTableFieldVO getDataTableFieldInfoByTableName(String tableName) throws DataAccessException;
	

}
