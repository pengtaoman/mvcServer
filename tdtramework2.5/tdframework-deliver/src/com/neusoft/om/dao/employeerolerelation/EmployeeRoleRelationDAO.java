package com.neusoft.om.dao.employeerolerelation;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

/**brief description
 * <p>Date       : 2004-12-09</p>
 * <p>Module     : om</p>
 * <p>Description: ְԱ�ͽ�ɫdao�ӿ�</p>
 * <p>Remark     : </p>
 * @author ren.hui@neusoft.com
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> �޸���ʷ</p>
 * <p>  ���		����		�޸���			�޸�ԭ��</p>
 * <p>   1                                       </p>
 */
public interface EmployeeRoleRelationDAO extends BaseDao {
	public static final String BEAN = "employeeRoleRelationDAO";
	/**
	 * ����һ����¼
	 * @param vo
	 * @return 0:ʧ�� 1:�ɹ�
	 * @throws DataAccessException
	 */
	public int doAddEmployeeRoleRelationInfo(EmployeeRoleRelationVO vo) throws DataAccessException;
	/**
	 * ���Ӽ�¼
	 * ���ݴ����ְ����Ϣ�ܹ��õ���ְ������Ӧ�Ľ�ɫ,�Ӷ��õ�ְԱ��ְ��Ķ�Ӧ��ϵ��Ϣ
	 * @param employeeId
	 * @param dutyId
	 * @return
	 * @throws DataAccessException
	 */
	public int doAddEmployeeRoleRelationInfo(String employeeId,int dutyId) throws DataAccessException;
	/**
	 * ���Ӷ�����¼
	 * @param coll
	 * @return int[]
	 * @throws DataAccessException
	 */
	public int[] doAddEmployeeRoleRelationInfo(EmployeeRoleRelationColl coll) throws DataAccessException;
	/**
	 * ���ݵ�ǰemployeeId��ְ�����ӽ�ɫ
	 * @param employeeId
	 * @throws DataAccessException
	 */
	public void doAddEmployeeRoleRelationInfo(String employeeId) throws DataAccessException;
	/**
	 * ����ְԱ���ɾ����Ϣ
	 * @param employeeId
	 * @return 0:ʧ�� 1:�ɹ�
	 * @throws DataAccessException
	 */
	public int doDeleteEmployeeRoleRelationInfoByEmployeeId(String employeeId) throws DataAccessException;
	
	/**
	 * ɾ��ĳְԱ��ĳ����Ա�����Ľ�ɫ
	 * @param employeeId
	 * @param creater
	 * @return
	 * @throws DataAccessException
	 */
	public int doDelEmpRoleRelByEmpIdAndCreater(String employeeId, String creater) throws DataAccessException;
	/**
	 * ���ݽ�ɫ���ɾ����Ϣ
	 * @param roleId
	 * @return 0:ʧ�� 1:�ɹ�
	 * @throws DataAccessException
	 */
	public int doDeleteEmployeeRoleRelationInfoByRoleId(String roleId) throws DataAccessException;
	/**
	 * ����ְԱ���,ְ����ɾ��ְԱ�Ľ�ɫ��Ϣ
	 * @param employeeId
	 * @param dutyId
	 * @return
	 * @throws DataAccessException
	 */
	public int doDeleteEmployeeRoleRelationInfoByEmployeeIdDutyId(String employeeId,int dutyId) throws DataAccessException;
    /**
     * ����ְԱ��ţ��õ�ְԱְ���ϵ��Ϣ�б�
     * @param employeeId
     * @return
     * @throws DataAccessException
     */
    public EmployeeRoleRelationColl getEmployeeRoleRelationInfoByEmployeeId(String employeeId) throws DataAccessException;
}