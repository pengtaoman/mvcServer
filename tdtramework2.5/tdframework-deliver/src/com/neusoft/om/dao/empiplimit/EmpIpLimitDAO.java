package com.neusoft.om.dao.empiplimit;

import java.util.List;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

public interface EmpIpLimitDAO extends BaseDao{

	
	/**
	 * �õ�����������Ϣ
	 * @param address
	 * @param description
	 * @return
	 */
	public EmpIpLimitColl getEmpIpLimit();
	
	/**
	 * ����һ����¼
	 * @param vo
	 * @return
	 * @throws DataAccessException
	 */
	public int doAddEmpIpLimit(EmpIpLimitVO vo) throws DataAccessException;
	
	/**
	 * �õ�ĳһ����ϸ��Ϣ
	 * @param workNo
	 * @param ipStartAdd
	 * @param ipEndAdd
	 * @return
	 * @throws DataAccessException
	 */
	public EmpIpLimitVO getEmpIpLimitVO(String workNo, String ipStartAdd, String ipEndAdd) throws DataAccessException;
	
	/**
	 * �޸�
	 * @param vo
	 * @param workNo
	 * @param priStartAdd
	 * @param priEndAdd
	 * @return
	 * @throws DataAccessException
	 */
	public int doModifyEmpIpLimit(EmpIpLimitVO vo,String workNo, String priStartAdd, String priEndAdd) throws DataAccessException;
	
	/**
	 * ɾ��
	 * @param workNo
	 * @param priStartAdd
	 * @param priEndAdd
	 * @return
	 * @throws DataAccessException
	 */
	public int doDeleteEmpIpLimit(String workNo, String priStartAdd, String priEndAdd) throws DataAccessException;
	
	/**
	 * ��ѯ������ҳ
	 * @param beginNum
	 * @param endNum
	 * @return
	 * @throws DataAccessException
	 */
	public List getEmpIpLimitList(int beginNum, int endNum) throws DataAccessException;
	
	public int getRowCount() throws DataAccessException;
}
