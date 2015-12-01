package com.neusoft.om.dao.employeepower;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;
/**brief description
 * <p>Date       : 2004-12-10</p>
 * <p>Module     : om</p>
 * <p>Description: 职员权限详细信息的调用接口</p>
 * <p>Remark     : </p>
 * @author ren.hui@neusoft.com
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> 修改历史</p>
 * <p>  序号		日期		修改人			修改原因</p>
 * <p>   1                                       </p>
 */
public interface EmployeePowerDAO extends BaseDao{
	public static final String BEAN = "employeePowerDAO";
	/**
	 * 增加记录(增加操作员权限时调用)
	 * 根据操作员的编号,可以得到操作员的角色信息,从而得到详情,然后更新到职员角色权限表中
	 * @param partCity
	 * @param employeeId
	 * @return
	 * @throws DataAccessException
	 */
	public int[] doAddEmployeePowerInfo(String employeeId,int[] roleIds) throws DataAccessException;
	/**
	 * 将职员的权限信息删除
	 * @param partCity
	 * @param employeeId
	 * @return
	 * @throws DataAccessException
	 */
	public int doDeleteEmployeePowerInfo(String employeeId) throws DataAccessException;

}
