package com.neusoft.om.dao.role;
import java.util.List;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;


/**brief description
 * <p>Date       : 2004-12-07</p>
 * <p>Module     : om</p>
 * <p>Description: 实现职务和角色关系的dao接口</p>
 * <p>Remark     : </p>
 * @author ren.hui@neusoft.com
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> 修改历史</p>
 * <p>  序号		日期		修改人			修改原因</p>
 * <p>   1                                       </p>
 */
public interface RoleDAO extends BaseDao {
	public static final String BEAN = "roleDAO";
	/**
	 * 根据角色类型返回角色信息
	 * @param roleKind 1:功能角色 2:数据角色 0:不区分
	 * @return RoleColl
	 * @throws DataAccessException
	 */
	public RoleColl getRoleInfoByDutyIdRoleType(int dutyId,int roleType) throws DataAccessException;
	/**
	 * 得到所有角色的信息(包括数据角色和功能角色)
	 * @return RoleColl
	 * @throws DataAccessException
	 */
	public RoleColl getAllRoleInfo() throws DataAccessException;
	/**
	 * 根据职员编号查询职员角色信息集合
	 * @param employeeId
	 * @return RoleColl
	 * @throws DataAccessException
	 */
	public RoleColl getRoleInfoByEmployeeId(String employeeId) throws DataAccessException;
	/**
	 * 根据职员所有允许选择的角色集合
	 * @param employeeId
	 * @return RoleColl
	 * @throws DataAccessException
	 */
	public RoleColl getEmployeePermittedRoleColl(String employeeId) throws DataAccessException;
	/**
	 * 通过管理员类型,管理员编号得到当前可以管理的角色
	 * 
	 * @param f_admin_type,f_employee_id
	 * @return
	 * @throws DataAccessException
	 */
	public RoleColl getEmployeePermittedRoleColl(String adminType,String employee_id) throws DataAccessException;
	
	/**
	 * 根据角色编号得到角色信息
	 * @param roleId
	 * @return RoleVO
	 * @throws DataAccessException
	 */
	public RoleVO getRoleInfoByRoleId(int roleId) throws DataAccessException;
	/**
	 * 增加一条记录
	 * @param vo
	 * @return int
	 * @throws DataAccessException
	 */
	public int doAddRoleInfo(RoleVO vo) throws DataAccessException;
	/**
	 * 根据主键修改一条记录
	 * @param vo
	 * @return int
	 * @throws DataAccessException
	 */
	public int doModifyInfo(int roleId,String roleName, String roleDesc) throws DataAccessException;
	/**
	 * 根据roleId删除一条记录
	 * @param roleId
	 * @return int
	 * @throws DataAccessException
	 */
	public int doDeleteInfoByRoleId(int roleId) throws DataAccessException;
    
    /**
     * 通过职员编号得到其创建的角色列表
     * @param employeeId
     * @return
     * @throws DataAccessException
     */
    public RoleColl getCreateRoleColl(String employeeId) throws DataAccessException;
    
    /**
     * 通过职员编号得到其创建的且名称符合查询条件的角色列表
     * @param roleName
     * @param employeeId
     * @return
     * @throws DataAccessException
     */
    public RoleColl getCreateRoleColl(String roleName, String employeeId) throws DataAccessException;
    /**
     * 通过职员编号得到其创建的且名称，标识，描述符合查询条件的角色列表
     * @param roleName
     * @param employeeId
     * @param roleId
     * @param desc
     * @return
     * @throws DataAccessException
     */
    public RoleColl getCreateRoleColl(String roleName, String employeeId, String roleId, String desc) throws DataAccessException;
    /**
     * 通过employeeId得到其可分配的角色列表
     * @param employeeId
     * @return
     * @throws DataAccessException
     */
    public RoleColl getAssignableRoleColl(String employeeId) throws DataAccessException;
    /**
	 * 根据登陆管理员登陆帐号work_no得到可维护的角色信息
	 * @param work_no
	 * @return int
	 * @throws DataAccessException
	 */
	public  RoleColl getFuncRoleInfoByAdminEmpID(String adminEmpID) throws DataAccessException;
	/**
	 * new
	 * 增加一条功能角色信息
	 * @param vo
	 * @return
	 * @throws DataAccessException
	 */
	public int doAddRole(RoleVO vo) throws DataAccessException;	
	/**
	 * new
	 * 删除一条功能角色信息
	 * @param vo
	 * @return
	 * @throws DataAccessException
	 */
	public int doDelRole(int roleId) throws DataAccessException;
	/**
	 * new
	 * 修改一条功能角色信息
	 * @param vo
	 * @return
	 * @throws DataAccessException
	 */
	public int doMofRole(RoleVO vo) throws DataAccessException;
	
	
	public RoleColl seachRoleName(String roleName,String AdminEmpId)throws DataAccessException;
	
	public RoleColl seachRoleName(String roleName,String AdminEmpId,String roleId, String desc)throws DataAccessException;
	/**
	 * 确认是否存在名称重复的角色
	 * @param roleName
	 * @return
	 * @throws DataAccessException
	 */
	public boolean repeateName(String roleName) throws DataAccessException;
	
	/**
	 * 得到员工可用的角色id集合
	 * @param empId
	 * @return
	 * @throws DataAccessException
	 */
	public List getUsableRoleId(String empId) throws DataAccessException;
}