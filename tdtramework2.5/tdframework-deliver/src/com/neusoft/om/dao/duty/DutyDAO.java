package com.neusoft.om.dao.duty;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;


/**brief description
 * <p>Date       : 2004-12-06</p>
 * <p>Module     : om</p>
 * <p>Description: 实现duty的dao接口</p>
 * <p>Remark     : </p>
 * @author ren.hui@neusoft.com
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> 修改历史</p>
 * <p>  序号		日期		修改人			修改原因</p>
 * <p>   1                                       </p>
 */
public interface DutyDAO extends BaseDao {
	public static final String BEAN = "dutyDAO";
	
	/**
	 * 得到所有职务集合
	 * @return DutyColl
	 * @throws DataAccessException
	 */
	public DutyColl getAllDutyInfo() throws DataAccessException;
	/**
	 * 根据主键dutyId得到职务信息
	 * @param dutyId
	 * @return DutyVO
	 * @throws DataAccessException
	 */
	public DutyVO getDutyInfoById(int dutyId) throws DataAccessException;
	/**
	 * 根据组织机构类型和职务的名字得到职务的vo
	 * (主要为工作流调用)
	 * @param organId
	 * @param dutyName
	 * @return DutyVO
	 * @throws DataAccessException
	 */
	public DutyVO getDutyInfo(int organKind,String dutyName) throws DataAccessException;
	/**
	 * 根据组织机构类型organKind得到职务信息集合
	 * @param organKind
	 * @return DutyColl
	 * @throws DataAccessException
	 */
	public DutyColl getDutyInfoByOrganKind(int organKind) throws DataAccessException;
	/**
	 * 根据组织机构organId查找职务信息
	 * @param organId
	 * @return 
	 * @throws DataAccessException
	 */
	public DutyColl getDutyInfoByOrganId(String organId) throws DataAccessException;
	/**
	 * 根据职员编号得到职务信息集合
	 * @param employeeId
	 * @return DutyColl
	 * @throws DataAccessException
	 */
	public DutyColl getDutyInfoByEmployeeId(String employeeId) throws DataAccessException;
	/**
	 * 根据角色Id得到使用该角色的职务的集合
	 * @param roleId
	 * @return DutyColl
	 * @throws DataAccessException
	 */
	public DutyColl getDutyInfoByRoleId(int roleId) throws DataAccessException;
	/**
	 * 增加一条记录
	 * @param vo
	 * @return int
	 * @throws DataAccessException
	 */
	public int doAddDuty(DutyVO vo) throws DataAccessException;
	/**
	 * 根据主键值修改职务信息表
	 * @param vo
	 * @return int 1:成功,0:失败
	 * @throws DataAccessException
	 */
	public int doModifyDutyById(DutyVO vo) throws DataAccessException;
	/**
	 * 根据主键值删除职务信息
	 * @param dutyId
	 * @return int 1:成功,0:失败
	 * @throws DataAccessException
	 */
	public int doDeleteDutyById(int dutyId) throws DataAccessException;
	/**
	 * 根据组织机构类型删除属于该组织机构类型的所有职务信息
	 * @param organKind
	 * @return int
	 * @throws DataAccessException
	 */
	public int doDeleteDutyByOrganKind(int organKind) throws DataAccessException;
	/**
	 * 得到上级职务,在一个组织机构中,如果没有上级职务,此时返回null
	 * @param dutyId,organKind
	 * @return
	 * @throws DataAccessException
	 */
	public DutyVO getParentDutyInfo(int dutyId,int organKind) throws DataAccessException;
	/**
	 * 得到组织机构职务信息
	 * @return
	 * @throws DataAccessException
	 */
	public OrganKindDutyColl getOrganKindDuty() throws DataAccessException;
}
