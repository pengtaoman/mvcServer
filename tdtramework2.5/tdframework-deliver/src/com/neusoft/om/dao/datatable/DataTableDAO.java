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
 * <p> �޸���ʷ</p>
 * <p>  ���		����		�޸���			�޸�ԭ��</p>
 * <p>   1                                       </p>
 */
public interface DataTableDAO extends BaseDao{
	public static final String BEAN = "dataTableDAO";
	/**
	 * ����������
	 * @param tableName
	 * @return DataTableVO
	 * @throws DataAccessException
	 */
	public DataTableVO getDataTableInfoByTalbeName(String tableName) throws DataAccessException;
	/**
	 * ���ݽ�ɫId�õ��ý�ɫ��Ӧ�����ݱ���Ϣ
	 * @param roleId
	 * @return DataTableColl
	 * @throws DataAccessException
	 */
	public DataTableColl getDataTableInfoByRoleId(int roleId) throws DataAccessException;
	
	
}
