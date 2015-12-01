package com.neusoft.om.dao.app;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

public interface AppDAO extends BaseDao{
	public static final String BEAN = "appDAO";
	
	/**
	 * ͨ��id�õ�Ӧ����Ϣ
	 * @param appId
	 * @return
	 * @throws DataAccessException
	 */
	public AppVO getAppById(int appId) throws DataAccessException;
	
	/**
	 * �õ����е�Ӧ����Ϣ����
	 * @return
	 * @throws DataAccessException
	 */
	public AppColl getAllApp() throws DataAccessException;
	
	/**
	 * ���ݽ�ɫ����ĵ����Ӧ��Ӧ����Ϣ����
	 * @param roleId
	 * @return
	 * @throws DataAccessException
	 */
	public AppRoleRelColl getAppRoleRelCollByRoleId(int roleId) throws DataAccessException;
	
	/**
	 * �õ���ĳӦ�þ��з���Ȩ�޵Ľ�ɫ����
	 * @param appId
	 * @return
	 * @throws DataAccessException
	 */
	public AppRoleRelColl getAppRoleRelCollByAppId(int appId) throws DataAccessException;
	
	/**
	 * �����ƶ��Ľ�ɫ��Ӧ�ù�ϵ��Ϣ
	 * @param coll
	 * @return
	 * @throws DataAccessException
	 */
	public int doModifyAppRoleRel(AppRoleRelColl coll, String roleId) throws DataAccessException;

}
