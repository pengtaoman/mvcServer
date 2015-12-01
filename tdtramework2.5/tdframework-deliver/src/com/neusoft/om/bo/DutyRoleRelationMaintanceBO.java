package com.neusoft.om.bo;

import com.neusoft.om.dao.role.RoleColl;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.core.BaseBO;
/**brief description
 * <p>Date       : 2004-12-09</p>
 * <p>Module     : om</p>
 * <p>Description: 职务角色关系维护</p>
 * <p>Remark     : </p>
 * @author ren.hui@neusoft.com
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> 修改历史</p>
 * <p>  序号		日期		修改人			修改原因</p>
 * <p>   1                                       </p>
 */
public interface DutyRoleRelationMaintanceBO extends BaseBO {
	public static final String BEAN = "dutyRoleRelationManagementFacade";
	/**
	 * 根据职务编码得到该职务上对应的角色的集合
	 * @param dutyId
	 * @return RoleColl
	 * @throws ServiceException
	 */
	public RoleColl getRoleInfoByDutyId(int dutyId) throws ServiceException;

	/**
	 * 在一个职务上增加多个角色
	 * @param dutyId
	 * @param roleId
	 * @return int
	 * @throws ServiceException
	 */
	public int doAddRoleInfo(int dutyId,int[] roleId) throws ServiceException;
	/**
	 * 在职务上删除一个角色
	 * @param dutyId
	 * @param roleId
	 * @return
	 * @throws ServiceException
	 */
	public int doDeleteRoleInfo(int dutyId, int roleId) throws ServiceException;
}
