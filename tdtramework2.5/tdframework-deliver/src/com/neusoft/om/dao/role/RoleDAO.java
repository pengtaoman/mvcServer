package com.neusoft.om.dao.role;
import java.util.List;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;


/**brief description
 * <p>Date       : 2004-12-07</p>
 * <p>Module     : om</p>
 * <p>Description: ʵ��ְ��ͽ�ɫ��ϵ��dao�ӿ�</p>
 * <p>Remark     : </p>
 * @author ren.hui@neusoft.com
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> �޸���ʷ</p>
 * <p>  ���		����		�޸���			�޸�ԭ��</p>
 * <p>   1                                       </p>
 */
public interface RoleDAO extends BaseDao {
	public static final String BEAN = "roleDAO";
	/**
	 * ���ݽ�ɫ���ͷ��ؽ�ɫ��Ϣ
	 * @param roleKind 1:���ܽ�ɫ 2:���ݽ�ɫ 0:������
	 * @return RoleColl
	 * @throws DataAccessException
	 */
	public RoleColl getRoleInfoByDutyIdRoleType(int dutyId,int roleType) throws DataAccessException;
	/**
	 * �õ����н�ɫ����Ϣ(�������ݽ�ɫ�͹��ܽ�ɫ)
	 * @return RoleColl
	 * @throws DataAccessException
	 */
	public RoleColl getAllRoleInfo() throws DataAccessException;
	/**
	 * ����ְԱ��Ų�ѯְԱ��ɫ��Ϣ����
	 * @param employeeId
	 * @return RoleColl
	 * @throws DataAccessException
	 */
	public RoleColl getRoleInfoByEmployeeId(String employeeId) throws DataAccessException;
	/**
	 * ����ְԱ��������ѡ��Ľ�ɫ����
	 * @param employeeId
	 * @return RoleColl
	 * @throws DataAccessException
	 */
	public RoleColl getEmployeePermittedRoleColl(String employeeId) throws DataAccessException;
	/**
	 * ͨ������Ա����,����Ա��ŵõ���ǰ���Թ���Ľ�ɫ
	 * 
	 * @param f_admin_type,f_employee_id
	 * @return
	 * @throws DataAccessException
	 */
	public RoleColl getEmployeePermittedRoleColl(String adminType,String employee_id) throws DataAccessException;
	
	/**
	 * ���ݽ�ɫ��ŵõ���ɫ��Ϣ
	 * @param roleId
	 * @return RoleVO
	 * @throws DataAccessException
	 */
	public RoleVO getRoleInfoByRoleId(int roleId) throws DataAccessException;
	/**
	 * ����һ����¼
	 * @param vo
	 * @return int
	 * @throws DataAccessException
	 */
	public int doAddRoleInfo(RoleVO vo) throws DataAccessException;
	/**
	 * ���������޸�һ����¼
	 * @param vo
	 * @return int
	 * @throws DataAccessException
	 */
	public int doModifyInfo(int roleId,String roleName, String roleDesc) throws DataAccessException;
	/**
	 * ����roleIdɾ��һ����¼
	 * @param roleId
	 * @return int
	 * @throws DataAccessException
	 */
	public int doDeleteInfoByRoleId(int roleId) throws DataAccessException;
    
    /**
     * ͨ��ְԱ��ŵõ��䴴���Ľ�ɫ�б�
     * @param employeeId
     * @return
     * @throws DataAccessException
     */
    public RoleColl getCreateRoleColl(String employeeId) throws DataAccessException;
    
    /**
     * ͨ��ְԱ��ŵõ��䴴���������Ʒ��ϲ�ѯ�����Ľ�ɫ�б�
     * @param roleName
     * @param employeeId
     * @return
     * @throws DataAccessException
     */
    public RoleColl getCreateRoleColl(String roleName, String employeeId) throws DataAccessException;
    /**
     * ͨ��ְԱ��ŵõ��䴴���������ƣ���ʶ���������ϲ�ѯ�����Ľ�ɫ�б�
     * @param roleName
     * @param employeeId
     * @param roleId
     * @param desc
     * @return
     * @throws DataAccessException
     */
    public RoleColl getCreateRoleColl(String roleName, String employeeId, String roleId, String desc) throws DataAccessException;
    /**
     * ͨ��employeeId�õ���ɷ���Ľ�ɫ�б�
     * @param employeeId
     * @return
     * @throws DataAccessException
     */
    public RoleColl getAssignableRoleColl(String employeeId) throws DataAccessException;
    /**
	 * ���ݵ�½����Ա��½�ʺ�work_no�õ���ά���Ľ�ɫ��Ϣ
	 * @param work_no
	 * @return int
	 * @throws DataAccessException
	 */
	public  RoleColl getFuncRoleInfoByAdminEmpID(String adminEmpID) throws DataAccessException;
	/**
	 * new
	 * ����һ�����ܽ�ɫ��Ϣ
	 * @param vo
	 * @return
	 * @throws DataAccessException
	 */
	public int doAddRole(RoleVO vo) throws DataAccessException;	
	/**
	 * new
	 * ɾ��һ�����ܽ�ɫ��Ϣ
	 * @param vo
	 * @return
	 * @throws DataAccessException
	 */
	public int doDelRole(int roleId) throws DataAccessException;
	/**
	 * new
	 * �޸�һ�����ܽ�ɫ��Ϣ
	 * @param vo
	 * @return
	 * @throws DataAccessException
	 */
	public int doMofRole(RoleVO vo) throws DataAccessException;
	
	
	public RoleColl seachRoleName(String roleName,String AdminEmpId)throws DataAccessException;
	
	public RoleColl seachRoleName(String roleName,String AdminEmpId,String roleId, String desc)throws DataAccessException;
	/**
	 * ȷ���Ƿ���������ظ��Ľ�ɫ
	 * @param roleName
	 * @return
	 * @throws DataAccessException
	 */
	public boolean repeateName(String roleName) throws DataAccessException;
	
	/**
	 * �õ�Ա�����õĽ�ɫid����
	 * @param empId
	 * @return
	 * @throws DataAccessException
	 */
	public List getUsableRoleId(String empId) throws DataAccessException;
}