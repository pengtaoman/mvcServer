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
 * <p> �޸���ʷ</p>
 * <p>  ���		����		�޸���			�޸�ԭ��</p>
 * <p>   1                                       </p>
 */
public interface DataRoleDAO extends BaseDao {
	public static final String BEAN = "dataRoleDao";
	/**
	 * ͨ����ɫId�õ����ݽ�ɫ��Ϣ����
	 * @param roleId
	 * @return
	 * @throws DataAccessException
	 */
	public DataRoleColl getDataRoleInfoByRoleId(int roleId) throws DataAccessException;
	/**
	 * ����һ�����ݽ�ɫ��Ϣ�ļ�¼
	 * @param vo
	 * @return
	 * @throws DataAccessException
	 */
	public int doAddDataRoleInfo(DataRoleVO vo) throws DataAccessException;
	/**
	 * �޸�һ�����ݽ�ɫ��Ϣ�ļ�¼
	 * @param vo
	 * @return
	 * @throws DataAccessException
	 */
	public int doModifyDataRoleInfo(DataRoleVO vo) throws DataAccessException;
	/**
	 * ɾ���ý�ɫ�µ�������Ϣ
	 * @param roleId
	 * @return
	 * @throws DataAccessException
	 */
	public int doDeleteDataRoleByRoleId(int roleId) throws DataAccessException;
	/**
	 * ����������ɫid,����ɾ����Ϣ
	 * @param roleId
	 * @param tableName
	 * @return
	 * @throws DataAccessException
	 */
	public int doDeleteDataRoleByRoleIdTableName(int roleId,String tableName) throws DataAccessException;
	

}
