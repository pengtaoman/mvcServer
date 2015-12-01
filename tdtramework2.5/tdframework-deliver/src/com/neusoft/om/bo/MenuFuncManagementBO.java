package com.neusoft.om.bo;

import com.neusoft.om.dao.menu.MenuColl;
import com.neusoft.tdframework.core.BaseBO;
import com.neusoft.tdframework.exception.ServiceException;

/**brief description
 * <p>Date       : 2004-12-09</p>
 * <p>Module     : om</p>
 * <p>Description: 实现功能管理的所有接口</p>
 * <p>Remark     : </p>
 * @author ren.hui@neusoft.com
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> 修改历史</p>
 * <p>  序号		日期		修改人			修改原因</p>
 * <p>   1                                       </p>
 */
public interface MenuFuncManagementBO extends BaseBO{
	public static final String BEAN = "menuFuncManagementFacade";
	/**
	 * 所有菜单,系统集合
	 * @return MenuColl
	 * @throws ServiceException
	 */
	public MenuColl getAllMenuInfo() throws ServiceException;
	/**
	 * 所有菜单,系统集合,包括权限信息
	 * @param roleId
	 * @return MenuColl
	 * @throws ServiceException
	 */
	public MenuColl getAllFuncMenuInfoByRoleId(int roleId) throws ServiceException;
	/**
	 * 有权限的系统菜单,集合
	 * @param roleId
	 * @return
	 * @throws ServiceException
	 */
	public MenuColl getFuncMenuInfoByRoleId(int roleId) throws ServiceException;
}
