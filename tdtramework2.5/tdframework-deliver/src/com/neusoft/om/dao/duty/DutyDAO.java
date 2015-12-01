package com.neusoft.om.dao.duty;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;


/**brief description
 * <p>Date       : 2004-12-06</p>
 * <p>Module     : om</p>
 * <p>Description: ʵ��duty��dao�ӿ�</p>
 * <p>Remark     : </p>
 * @author ren.hui@neusoft.com
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> �޸���ʷ</p>
 * <p>  ���		����		�޸���			�޸�ԭ��</p>
 * <p>   1                                       </p>
 */
public interface DutyDAO extends BaseDao {
	public static final String BEAN = "dutyDAO";
	
	/**
	 * �õ�����ְ�񼯺�
	 * @return DutyColl
	 * @throws DataAccessException
	 */
	public DutyColl getAllDutyInfo() throws DataAccessException;
	/**
	 * ��������dutyId�õ�ְ����Ϣ
	 * @param dutyId
	 * @return DutyVO
	 * @throws DataAccessException
	 */
	public DutyVO getDutyInfoById(int dutyId) throws DataAccessException;
	/**
	 * ������֯�������ͺ�ְ������ֵõ�ְ���vo
	 * (��ҪΪ����������)
	 * @param organId
	 * @param dutyName
	 * @return DutyVO
	 * @throws DataAccessException
	 */
	public DutyVO getDutyInfo(int organKind,String dutyName) throws DataAccessException;
	/**
	 * ������֯��������organKind�õ�ְ����Ϣ����
	 * @param organKind
	 * @return DutyColl
	 * @throws DataAccessException
	 */
	public DutyColl getDutyInfoByOrganKind(int organKind) throws DataAccessException;
	/**
	 * ������֯����organId����ְ����Ϣ
	 * @param organId
	 * @return 
	 * @throws DataAccessException
	 */
	public DutyColl getDutyInfoByOrganId(String organId) throws DataAccessException;
	/**
	 * ����ְԱ��ŵõ�ְ����Ϣ����
	 * @param employeeId
	 * @return DutyColl
	 * @throws DataAccessException
	 */
	public DutyColl getDutyInfoByEmployeeId(String employeeId) throws DataAccessException;
	/**
	 * ���ݽ�ɫId�õ�ʹ�øý�ɫ��ְ��ļ���
	 * @param roleId
	 * @return DutyColl
	 * @throws DataAccessException
	 */
	public DutyColl getDutyInfoByRoleId(int roleId) throws DataAccessException;
	/**
	 * ����һ����¼
	 * @param vo
	 * @return int
	 * @throws DataAccessException
	 */
	public int doAddDuty(DutyVO vo) throws DataAccessException;
	/**
	 * ��������ֵ�޸�ְ����Ϣ��
	 * @param vo
	 * @return int 1:�ɹ�,0:ʧ��
	 * @throws DataAccessException
	 */
	public int doModifyDutyById(DutyVO vo) throws DataAccessException;
	/**
	 * ��������ֵɾ��ְ����Ϣ
	 * @param dutyId
	 * @return int 1:�ɹ�,0:ʧ��
	 * @throws DataAccessException
	 */
	public int doDeleteDutyById(int dutyId) throws DataAccessException;
	/**
	 * ������֯��������ɾ�����ڸ���֯�������͵�����ְ����Ϣ
	 * @param organKind
	 * @return int
	 * @throws DataAccessException
	 */
	public int doDeleteDutyByOrganKind(int organKind) throws DataAccessException;
	/**
	 * �õ��ϼ�ְ��,��һ����֯������,���û���ϼ�ְ��,��ʱ����null
	 * @param dutyId,organKind
	 * @return
	 * @throws DataAccessException
	 */
	public DutyVO getParentDutyInfo(int dutyId,int organKind) throws DataAccessException;
	/**
	 * �õ���֯����ְ����Ϣ
	 * @return
	 * @throws DataAccessException
	 */
	public OrganKindDutyColl getOrganKindDuty() throws DataAccessException;
}
