package com.neusoft.om.dao.emplogintime;

import java.util.List;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

public interface EmpLoginTimeDAO extends BaseDao{

	
	/**
	 * �õ�����������Ϣ
	 * @param address
	 * @param description
	 * @return
	 */
	public EmpLoginTimeColl getEmpLoginTime();
	
	/**
	 * ����һ����¼
	 * @param vo
	 * @return
	 * @throws DataAccessException
	 */
	public int doAddEmpLoginTime(EmpLoginTimeVO vo) throws DataAccessException;
	
	/**
	 * �õ�ĳһ����ϸ��Ϣ
	 * @param workNo
	 * @param logId
	 * @return
	 * @throws DataAccessException
	 */
	public EmpLoginTimeVO getEmpLoginTimeVO(String logId,String workNo) throws DataAccessException;
	
	/**
	 * �޸�
	 * @param vo
	 * @param workNo
	 * @param priStartAdd
	 * @param priEndAdd
	 * @return
	 * @throws DataAccessException
	 */
	public int doModifyEmpLoginTime(EmpLoginTimeVO vo,String priLogId, String priWorkNo) throws DataAccessException;
	
	/**
	 * ɾ��
	 * @param workNo
	 * @param logId
	 * @return
	 * @throws DataAccessException
	 */
	public int doDeleteEmpLoginTime(String logId, String workNo) throws DataAccessException;
	
	/**
	 * ��ѯ������ҳ
	 * @param beginNum
	 * @param endNum
	 * @return
	 * @throws DataAccessException
	 */
	public List getEmpLoginTimeList(int beginNum, int endNum) throws DataAccessException;
	
	public int getRowCount() throws DataAccessException;
}
