package com.neusoft.om.dao.iplimit;

import java.util.List;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

public interface IpLimitDAO extends BaseDao{

	
	/**
	 * �õ�����ip������Ϣ
	 * @param address
	 * @param description
	 * @return
	 */
	public IpLimitColl getIpLimit();
	
	/**
	 * ����һ����¼
	 * @param vo
	 * @return
	 * @throws DataAccessException
	 */
	public int doAddIpLimit(IpLimitVO vo) throws DataAccessException;
	
	/**
	 * �õ�ĳһ����ϸ��Ϣ
	 * @param ipStartAdd
	 * @param ipEndAdd
	 * @return
	 * @throws DataAccessException
	 */
	public IpLimitVO getIpLimitVO(String ipStartAdd, String ipEndAdd) throws DataAccessException;
	
	/**
	 * �޸�
	 * @param vo,priStartAdd,priEndAdd
	 * @return
	 * @throws DataAccessException
	 */
	public int doModifyIpLimit(IpLimitVO vo,String priStartAdd, String priEndAdd) throws DataAccessException;
	
	/**
	 * ɾ��
	 * @param address
	 * @return
	 * @throws DataAccessException
	 */
	public int doDeleteIpLimit(String priStartAdd, String priEndAdd) throws DataAccessException;
	
	/**
	 * ��ѯ������ҳ
	 * @param beginNum
	 * @param endNum
	 * @return
	 * @throws DataAccessException
	 */
	public List getIpLimitList(int beginNum, int endNum) throws DataAccessException;
	
	public int getRowCount() throws DataAccessException;
}
