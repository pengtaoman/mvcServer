package com.neusoft.om.dao.employeedutyrelation;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;


/**brief description
 * <p>Date       : 2004-12-07</p>
 * <p>Module     : om</p>
 * <p>Description: 职员和职务的dao接口</p>
 * <p>Remark     : </p>
 * @author ren.hui@neusoft.com
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> 修改历史</p>
 * <p>  序号		日期		修改人			修改原因</p>
 * <p>   1                                       </p>
 */
public interface EmployeeDutyRelationDAO extends BaseDao {
	public static final String BEAN = "employeeDutyRelationDAO";
	/**
	 * 根据操作员登陆的账号,获得职员编号
	 * @param workNo
	 * @return String
	 * @throws DataAccessException
	 */
	public String getEmployeeEmployeeIdByWorkNo(String workNo) throws DataAccessException;
	/**
	 * 根据操作员登陆的账号,获得操作员所担任职务信息集合(流程)
	 * @param workNo
	 * @return EmployeeDutyRelationColl
	 * @throws DataAccessException
	 */
	public EmployeeDutyRelationColl getEmployeeDutyRelationInfoByWorkNo(String workNo) throws DataAccessException;
	/**
	 * 根据职员ID得到职务信息集合
	 * @param employeeId
	 * @return
	 * @throws DataAccessException
	 */
	public EmployeeDutyRelationColl getEmployeeDutyRelationInfoByEmployeeId(String employeeId) throws DataAccessException;
	/**
	 * 得到EmployeeDutyRelationVO
	 * @param organId
	 * @param dutyId
	 * @param employeeId
	 * @return EmployeeDutyRelationVO
	 * @throws DataAccessException
	 */
	public EmployeeDutyRelationVO getEmployeeDutyRelationInfo(String organId,int dutyId,String employeeId) throws DataAccessException;
	/**
	 * 根据职务编号得到该职务上任职的人员Id信息
	 * @param dutyId
	 * @return EmployeeDutyRelationColl
	 * @throws DataAccessException
	 */
	public EmployeeDutyRelationColl getEmployeeDutyRelationInfoByDutyId(int dutyId) throws DataAccessException;
	/**
	 * 增加一条记录到职员职务信息表中
	 * @param vo
	 * @return
	 * @throws DataAccessException
	 */
	public int doAddEmployeeDutyRelationInfo(EmployeeDutyRelationVO vo) throws DataAccessException;
	/**
	 * 增加多条记录到职员职务信息表中
	 * @param coll
	 * @return
	 * @throws DataAccessException
	 */
	public int[] doAddEmployeeDutyRelationInfo(EmployeeDutyRelationColl coll) throws DataAccessException;
	/**
	 * 按照oldOrganId,oldDuty将数据更新为employeeDutyRelationVO中的内容
	 * @param employeeDutyRelationVO
	 * @param oldOrganId
	 * @param oldDuty
	 * @return
	 * @throws DataAccessException
	 */
	public int doModifyEmployeeDutyRelationInfo(EmployeeDutyRelationVO employeeDutyRelationVO,String oldOrganId, int oldDuty) throws DataAccessException;
	/**
	 * 根据职员编号删除信息
	 * 删除职员时调用将与该职员相关的信息全部删除
	 * @param coll
	 * @return
	 * @throws DataAccessException
	 */
	public int doDeleteEmployeeDutyRelationInfoByEmployeeId(String employeeId) throws DataAccessException;
	/**
	 * 根据组织机构删除信息
	 * @param employeeId
	 * @return
	 * @throws DataAccessException
	 */
	public int doDeleteEmployeeDutyRelationInfoByOrganId(String organId) throws DataAccessException;
	/**
	 * 删除职员在某个组织机构某个职务上的兼职信息
	 * @param OrganId
	 * @param dutyId
	 * @param employeeId
	 * @return int
	 * @throws DataAccessException
	 */
	public int doDeleteEmployeeDutyRelationInfo(String organId,int dutyId,String employeeId) throws DataAccessException;
    /**
     * 根绝组织机构编码得到该组织机构下所有职员职务关系信息
     * @param organId
     * @return
     * @throws DataAccessException
     */
    public EmployeeDutyRelationColl getEmployeeDutyRelationByOrganId(String organId) throws DataAccessException;

		
}