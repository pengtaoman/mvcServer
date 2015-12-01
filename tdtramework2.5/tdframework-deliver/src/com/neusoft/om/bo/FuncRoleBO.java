package com.neusoft.om.bo;

import com.neusoft.om.dao.menu.MenuColl;
import com.neusoft.om.dao.role.RoleColl;
import com.neusoft.om.dao.role.RoleVO;
import com.neusoft.tdframework.core.BaseBO;
import com.neusoft.tdframework.exception.ServiceException;

/**brief description
 * <p>Date       : 2004-12-09</p>
 * <p>Module     : om</p>
 * <p>Description: 实现功能角色维护的所有接口</p>
 * <p>Remark     : </p>
 * @author ren.hui@neusoft.com
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> 修改历史</p>
 * <p>  序号		日期		修改人			修改原因</p>
 * <p>   1                                       </p>
 */
public interface FuncRoleBO extends BaseBO{
	public static final String BEAN ="funcRoleFacade";
	
	/**
	 * 增加功能角色
	 * @param roleVO
	 * @return int
	 * @throws ServiceException
	 */
	public int doAddFuncRoleInfo(RoleVO roleVO) throws ServiceException;
	/**
	 * 修改功能角色
	 * @param roleId
	 * @param roleName
	 * @param roleDesc
	 * @return
	 * @throws ServiceException
	 */
	public int doModifyFuncRoleInfo(int roleId,String roleName,String roleDesc) throws ServiceException;
	/**
	 * 修改功能角色
	 * @param roleId
	 * @param roleName
	 * @return
	 * @throws ServiceException
	 */
	public int doModifyFuncRoleInfo(int roleId,String roleName) throws ServiceException;
	/**
	 * 根据角色标识roleId删除信息
	 * 如果该角色标识已被使用则不允许删除
	 * 同时维护角色表,将角色表中的该记录相应删除
	 * @param roleId
	 * @return int
	 * @throws ServiceException
	 */
	public int doDeleteFuncRoleInfo(int roleId) throws ServiceException;
	/**
	 * 根据角色标识对该角色对应的权利进行调整
	 * funcStr为菜单组成的串,每个菜单以";"分隔
	 * @param roleId
	 * @param funcStr
	 * @return
	 * @throws ServiceException
	 */
	public int doAdjustPrivilegeFuncRoleInfo(int roleId,String funcStr) throws ServiceException;
	/**
	 * 得到职务范围内的某个角色的功能菜单信息(有权利)
	 * @param dutyId
	 * @param roleId
	 * @return MenuColl
	 * @throws ServiceException
	 */
	public MenuColl getMenuInfoByDutyIdRoleId(int dutyId,int roleId) throws ServiceException;
	/**
	 * 得到职务范围内的某个角色的功能菜单信息(包括有权利的菜单和无权利的菜单)
	 * @param dutyId
	 * @param roleId
	 * @return MenuColl
	 * @throws ServiceException
	 */
	public MenuColl getAllMenuInfoByDutyIdRoleId(int dutyId,int roleId) throws ServiceException;
	/**
	 * 根据职务Id得到功能角色集合
	 * @param dutyId
	 * @return RoleColl
	 * @throws ServiceException
	 */
	public RoleColl getAllFuncRoleByDutyId(int dutyId) throws ServiceException;
	/**
	 * new 060701
	 * 新增角色
	 * @param RoleVO
	 * @return int
	 * @throws ServiceException
	 */
	public int doAddRoleInfo(RoleVO roleVO) throws ServiceException;
	/**
	 * new 060701
	 * 修改角色的菜单权限
	 * @param oldMenus
	 * @param newMenus
	 * @param roleId
	 * @return int
	 * @throws ServiceException
	 */
	public int modifyRolePower(String oldMenus,String newMenus,int roleId) throws ServiceException;
	
	/**
	 * 赋权 
	 * @param newMenus
	 * @param roleId
	 * @return
	 * @throws ServiceException
	 */
	public int modifyRolePower(String[] newMenus, int roleId ,String systemId) throws ServiceException;
	
	
}
