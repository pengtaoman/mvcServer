package com.neusoft.om.dao.employeepower;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;
/**brief description
 * <p>Date       : 2004-12-10</p>
 * <p>Module     : om</p>
 * <p>Description: ְԱȨ����ϸ��Ϣ�ĵ��ýӿ�</p>
 * <p>Remark     : </p>
 * @author ren.hui@neusoft.com
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> �޸���ʷ</p>
 * <p>  ���		����		�޸���			�޸�ԭ��</p>
 * <p>   1                                       </p>
 */
public interface EmployeePowerDAO extends BaseDao{
	public static final String BEAN = "employeePowerDAO";
	/**
	 * ���Ӽ�¼(���Ӳ���ԱȨ��ʱ����)
	 * ���ݲ���Ա�ı��,���Եõ�����Ա�Ľ�ɫ��Ϣ,�Ӷ��õ�����,Ȼ����µ�ְԱ��ɫȨ�ޱ���
	 * @param partCity
	 * @param employeeId
	 * @return
	 * @throws DataAccessException
	 */
	public int[] doAddEmployeePowerInfo(String employeeId,int[] roleIds) throws DataAccessException;
	/**
	 * ��ְԱ��Ȩ����Ϣɾ��
	 * @param partCity
	 * @param employeeId
	 * @return
	 * @throws DataAccessException
	 */
	public int doDeleteEmployeePowerInfo(String employeeId) throws DataAccessException;

}
