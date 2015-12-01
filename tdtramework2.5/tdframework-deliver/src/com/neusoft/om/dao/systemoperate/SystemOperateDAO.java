package com.neusoft.om.dao.systemoperate;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

public interface SystemOperateDAO extends BaseDao{
	public static final String BEAN = "systemDAO";
	/**
	 * �����������Ҽ�¼
	 * @param systemId
	 * @return
	 * @throws DataAccessException
	 */
	public SystemOperateVO getSystemInfoById(String systemId) throws DataAccessException;
	/**
	 * �������ϵͳ��Ϣ
	 * @return
	 * @throws DataAccessException
	 */
	public SystemOperateColl getAllSystemInfo() throws DataAccessException;
	/**
	 * ���ݲ���Ա��ŵõ��ò���ԭ��Ȩʹ�õ�ϵͳ����
	 * @param employeeId
	 * @return
	 * @throws DataAccessException
	 */
	public SystemOperateVO getSystemInfoByName(String systemName) throws DataAccessException;
	public SystemOperateColl getSystemInfoByEmployeeId(String employeeId) throws DataAccessException;
	/**
	 * ���ʹ��webҳ���ϵͳ��Ϣ
	 * @return
	 * @throws DataAccessException
	 */
	public SystemOperateColl getSystemInfoWeb() throws DataAccessException;
	/**
	 * ����һ����¼
	 * @param vo
	 * @return
	 * @throws DataAccessException
	 */
	public int doAddSystemInfo(SystemOperateVO vo) throws DataAccessException;
	/**
	 * �޸�һ����¼
	 * @param vo
	 * @return
	 * @throws DataAccessException
	 */
	public int doModifySystemInfo(SystemOperateVO vo,String oldSystemId) throws DataAccessException;
	/**
	 * ɾ��һ����¼
	 * @param vo
	 * @return
	 * @throws DataAccessException
	 */
	public int doDeleteSystemInfo(String systemId) throws DataAccessException;
	
}