package com.neusoft.om.dao.employeerolerelation;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

/**brief description
 * <p>Date       : 2004-12-09</p>
 * <p>Module     : om</p>
 * <p>Description: 职员和角色dao接口</p>
 * <p>Remark     : </p>
 * @author ren.hui@neusoft.com
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> 修改历史</p>
 * <p>  序号		日期		修改人			修改原因</p>
 * <p>   1                                       </p>
 */
public interface EmployeeRoleRelationDAO extends BaseDao {
	public static final String BEAN = "employeeRoleRelationDAO";
	/**
	 * 增加一条记录
	 * @param vo
	 * @return 0:失败 1:成功
	 * @throws DataAccessException
	 */
	public int doAddEmployeeRoleRelationInfo(EmployeeRoleRelationVO vo) throws DataAccessException;
	/**
	 * 增加记录
	 * 根据传入的职务信息能够得到该职务所对应的角色,从而得到职员与职务的对应关系信息
	 * @param employeeId
	 * @param dutyId
	 * @return
	 * @throws DataAccessException
	 */
	public int doAddEmployeeRoleRelationInfo(String employeeId,int dutyId) throws DataAccessException;
	/**
	 * 增加多条记录
	 * @param coll
	 * @return int[]
	 * @throws DataAccessException
	 */
	public int[] doAddEmployeeRoleRelationInfo(EmployeeRoleRelationColl coll) throws DataAccessException;
	/**
	 * 根据当前employeeId的职务增加角色
	 * @param employeeId
	 * @throws DataAccessException
	 */
	public void doAddEmployeeRoleRelationInfo(String employeeId) throws DataAccessException;
	/**
	 * 根据职员编号删除信息
	 * @param employeeId
	 * @return 0:失败 1:成功
	 * @throws DataAccessException
	 */
	public int doDeleteEmployeeRoleRelationInfoByEmployeeId(String employeeId) throws DataAccessException;
	
	/**
	 * 删除某职员由某管理员创建的角色
	 * @param employeeId
	 * @param creater
	 * @return
	 * @throws DataAccessException
	 */
	public int doDelEmpRoleRelByEmpIdAndCreater(String employeeId, String creater) throws DataAccessException;
	/**
	 * 根据角色编号删除信息
	 * @param roleId
	 * @return 0:失败 1:成功
	 * @throws DataAccessException
	 */
	public int doDeleteEmployeeRoleRelationInfoByRoleId(String roleId) throws DataAccessException;
	/**
	 * 根据职员编号,职务编号删除职员的角色信息
	 * @param employeeId
	 * @param dutyId
	 * @return
	 * @throws DataAccessException
	 */
	public int doDeleteEmployeeRoleRelationInfoByEmployeeIdDutyId(String employeeId,int dutyId) throws DataAccessException;
    /**
     * 根据职员编号，得到职员职务关系信息列表
     * @param employeeId
     * @return
     * @throws DataAccessException
     */
    public EmployeeRoleRelationColl getEmployeeRoleRelationInfoByEmployeeId(String employeeId) throws DataAccessException;
}