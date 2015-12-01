package com.neusoft.tdframework.authorization;

import java.util.List;
import java.util.Map;

import com.neusoft.tdframework.core.BaseBO;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.support.favorite.dao.FavoriteColl;

/**brief description
 * <p>Date       : 2004-11-19</p>
 * <p>Module     : om</p>
 * <p>Description: AuthorizeBO interface</p>
 * <p>Remark     : </p>
 * @author renh
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> 修改历史</p>
 * <p>  序号		日期		修改人			修改原因</p>
 * <p>   1                                       </p>
 */

public interface AuthorizeBO extends BaseBO {
	/**
	 * BEAN 配置在框架：config/applicationContext.xml中 <b>
	 * bean_id = authorizeFacade
	 */
	public static final String BEAN = "authorizeFacade";
	
	/**
	 * 
	 * 认证返回的结果
	 * 
	 * @param workNo
	 * @param workPwd
	 * @return
	 * @throws ServiceException
	 */
	public AuthorizeVO getAuthorizeInfo(String workNo,String workPwd) throws ServiceException;
	
	/**
	 * 获取操作员的某一系统的菜单信息. <b>
	 * 返回结果不包括按钮. <b>
	 * key: "workmenu","favoritemenu","funcmenu"
	 * value: menuName, 菜单名称
	 * @param employeeId
	 * @param systemId
	 * @return
	 * @throws ServiceException
	 */
	public Map getMenuInfo(String employeeId,String systemId) throws ServiceException;
	/**
	 * 获取是否显示收藏夹
	 * @param employeeId
	 * @param systemId
	 * @return
	 * @throws ServiceException
	 */
	public String getIfshowfav(String systemId) throws ServiceException;
	/**
	 * 获取操作相应的功能菜单
	 * @param employeeId
	 * @param systemId
	 * @return
	 * @throws ServiceException
	 */
	public FrameMenuColl getAllMenuInfo(String employeeId,String systemId) throws ServiceException;
	
	/**
	 * added by pengtao 2011-05-24 for CRM6
	 * 获取操作相应的功能菜单,按照工号获取
	 * @param employeeId
	 * @return
	 * @throws ServiceException
	 */
	public List getMenuNavigation(String systemId, String employeeId) throws ServiceException;
	
	/**
	 * added by pengtao 2011-05-24 for CRM6
	 * 获取全部系统信息
	 * @return
	 * @throws ServiceException
	 */
	public List getSystemNavigation(String employeeId) throws ServiceException;
	
	/**
	 * 返回工作区信息
	 * @param systemId
	 * @return
	 * @throws ServiceException
	 */
	public FrameWorkColl getWorkInfoBySystemId(String systemId) throws ServiceException;
	
	/**
	 * 返回收藏夹
	 * @param employeeId
	 * @param systemId
	 * @return
	 * @throws ServiceException
	 */
	public FavoriteColl getFavoriteInfoByEmployeeIdSystemId(String employeeId,String systemId) throws ServiceException;
	
	/**
	 * 
	 * 获取系统信息
	 * 
	 * @param employeeId
	 * @return
	 * @throws ServiceException
	 */
	public SystemColl getSystemInfo(String employeeId) throws ServiceException;
	
	/**
	 * 检查页面是否有权限，在TAGLIB中被
	 * @param employeeId	帐户标识
	 * @param menuId  菜单标识(业务开发自主定义)
	 * @return
	 * @throws ServiceException
	 */
	public boolean checkPage(String employeeId,String menuId) throws ServiceException;
	
	/**
	 * 检查按钮的有效性
	 * @param employeeId
	 * @param menuId
	 * @return 返回智慧按钮的
	 * @throws ServiceException
	 */
	public String getDisabledButton(String employeeId,String menuId) throws ServiceException;
	
	
	public List getMenuForSearch(String employeeId, String searchKey) throws ServiceException;

}
