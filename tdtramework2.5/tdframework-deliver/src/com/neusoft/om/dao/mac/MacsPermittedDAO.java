package com.neusoft.om.dao.mac;

import java.util.List;
import java.util.Map;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

public interface MacsPermittedDAO extends BaseDao{
	/**
	 * ͨ����ַ���Ψһ��¼
	 * @param address
	 * @return
	 */
	public MacsPermittedVO getMacsPermittedVO(String address);
	
	/**
	 * ͨ����ַ��������ģ����ѯ�õ������
	 * @param address
	 * @param description
	 * @return
	 */
	public MacsPermittedColl getMacsPermitted(Map map);
	
	/**
	 * ����һ����¼
	 * @param vo
	 * @return
	 * @throws DataAccessException
	 */
	public int doAddMacsPermitted(MacsPermittedVO vo) throws DataAccessException;
	
	/**
	 * �޸�
	 * @param vo,priAddress
	 * @return
	 * @throws DataAccessException
	 */
	public int doModifyMacsPermitted(MacsPermittedVO vo,String priAddress) throws DataAccessException;
	
	/**
	 * ɾ��
	 * @param address
	 * @return
	 * @throws DataAccessException
	 */
	public int doDeleteMacsPermitted(String address) throws DataAccessException;
	
	/**
	 * ��ѯ������ҳ
	 * @param map
	 * @param beginNum
	 * @param endNum
	 * @return
	 * @throws DataAccessException
	 */
	public List getMacsPermittedList(Map map, int beginNum, int endNum) throws DataAccessException;
	
	public int getRowCount(Map map) throws DataAccessException;
}
