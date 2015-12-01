package com.neusoft.om.dao.app;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

public interface AppDAO extends BaseDao{
	public static final String BEAN = "appDAO";
	
	/**
	 * 通过id得到应用信息
	 * @param appId
	 * @return
	 * @throws DataAccessException
	 */
	public AppVO getAppById(int appId) throws DataAccessException;
	
	/**
	 * 得到所有的应用信息集合
	 * @return
	 * @throws DataAccessException
	 */
	public AppColl getAllApp() throws DataAccessException;
	
	/**
	 * 根据角色编码的到其对应的应用信息集合
	 * @param roleId
	 * @return
	 * @throws DataAccessException
	 */
	public AppRoleRelColl getAppRoleRelCollByRoleId(int roleId) throws DataAccessException;
	
	/**
	 * 得到对某应用具有访问权限的角色集合
	 * @param appId
	 * @return
	 * @throws DataAccessException
	 */
	public AppRoleRelColl getAppRoleRelCollByAppId(int appId) throws DataAccessException;
	
	/**
	 * 保存制定的角色－应用关系信息
	 * @param coll
	 * @return
	 * @throws DataAccessException
	 */
	public int doModifyAppRoleRel(AppRoleRelColl coll, String roleId) throws DataAccessException;

}
