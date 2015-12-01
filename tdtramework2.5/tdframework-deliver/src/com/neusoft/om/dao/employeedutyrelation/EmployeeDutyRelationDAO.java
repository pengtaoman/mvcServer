package com.neusoft.om.dao.employeedutyrelation;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;


/**brief description
 * <p>Date       : 2004-12-07</p>
 * <p>Module     : om</p>
 * <p>Description: ְԱ��ְ���dao�ӿ�</p>
 * <p>Remark     : </p>
 * @author ren.hui@neusoft.com
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> �޸���ʷ</p>
 * <p>  ���		����		�޸���			�޸�ԭ��</p>
 * <p>   1                                       </p>
 */
public interface EmployeeDutyRelationDAO extends BaseDao {
	public static final String BEAN = "employeeDutyRelationDAO";
	/**
	 * ���ݲ���Ա��½���˺�,���ְԱ���
	 * @param workNo
	 * @return String
	 * @throws DataAccessException
	 */
	public String getEmployeeEmployeeIdByWorkNo(String workNo) throws DataAccessException;
	/**
	 * ���ݲ���Ա��½���˺�,��ò���Ա������ְ����Ϣ����(����)
	 * @param workNo
	 * @return EmployeeDutyRelationColl
	 * @throws DataAccessException
	 */
	public EmployeeDutyRelationColl getEmployeeDutyRelationInfoByWorkNo(String workNo) throws DataAccessException;
	/**
	 * ����ְԱID�õ�ְ����Ϣ����
	 * @param employeeId
	 * @return
	 * @throws DataAccessException
	 */
	public EmployeeDutyRelationColl getEmployeeDutyRelationInfoByEmployeeId(String employeeId) throws DataAccessException;
	/**
	 * �õ�EmployeeDutyRelationVO
	 * @param organId
	 * @param dutyId
	 * @param employeeId
	 * @return EmployeeDutyRelationVO
	 * @throws DataAccessException
	 */
	public EmployeeDutyRelationVO getEmployeeDutyRelationInfo(String organId,int dutyId,String employeeId) throws DataAccessException;
	/**
	 * ����ְ���ŵõ���ְ������ְ����ԱId��Ϣ
	 * @param dutyId
	 * @return EmployeeDutyRelationColl
	 * @throws DataAccessException
	 */
	public EmployeeDutyRelationColl getEmployeeDutyRelationInfoByDutyId(int dutyId) throws DataAccessException;
	/**
	 * ����һ����¼��ְԱְ����Ϣ����
	 * @param vo
	 * @return
	 * @throws DataAccessException
	 */
	public int doAddEmployeeDutyRelationInfo(EmployeeDutyRelationVO vo) throws DataAccessException;
	/**
	 * ���Ӷ�����¼��ְԱְ����Ϣ����
	 * @param coll
	 * @return
	 * @throws DataAccessException
	 */
	public int[] doAddEmployeeDutyRelationInfo(EmployeeDutyRelationColl coll) throws DataAccessException;
	/**
	 * ����oldOrganId,oldDuty�����ݸ���ΪemployeeDutyRelationVO�е�����
	 * @param employeeDutyRelationVO
	 * @param oldOrganId
	 * @param oldDuty
	 * @return
	 * @throws DataAccessException
	 */
	public int doModifyEmployeeDutyRelationInfo(EmployeeDutyRelationVO employeeDutyRelationVO,String oldOrganId, int oldDuty) throws DataAccessException;
	/**
	 * ����ְԱ���ɾ����Ϣ
	 * ɾ��ְԱʱ���ý����ְԱ��ص���Ϣȫ��ɾ��
	 * @param coll
	 * @return
	 * @throws DataAccessException
	 */
	public int doDeleteEmployeeDutyRelationInfoByEmployeeId(String employeeId) throws DataAccessException;
	/**
	 * ������֯����ɾ����Ϣ
	 * @param employeeId
	 * @return
	 * @throws DataAccessException
	 */
	public int doDeleteEmployeeDutyRelationInfoByOrganId(String organId) throws DataAccessException;
	/**
	 * ɾ��ְԱ��ĳ����֯����ĳ��ְ���ϵļ�ְ��Ϣ
	 * @param OrganId
	 * @param dutyId
	 * @param employeeId
	 * @return int
	 * @throws DataAccessException
	 */
	public int doDeleteEmployeeDutyRelationInfo(String organId,int dutyId,String employeeId) throws DataAccessException;
    /**
     * ������֯��������õ�����֯����������ְԱְ���ϵ��Ϣ
     * @param organId
     * @return
     * @throws DataAccessException
     */
    public EmployeeDutyRelationColl getEmployeeDutyRelationByOrganId(String organId) throws DataAccessException;

		
}