/*
 * Created on 2006-6-29
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
package com.neusoft.om.dao.page;

import java.util.Vector;

import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.unieap.service.security.authorization.Permission;
import com.neusoft.unieap.service.security.providers.dao.SecurityRole;
import com.neusoft.unieap.service.security.resource.SecurityResource;

/**
 * @author zhangjn
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public interface PageDAO {
	public abstract Vector getRolePermissionsByResourceID(SecurityRole sr,
			String resourceTypeID, String resourceID) throws Exception;

	 public String getRolePermissionsByResourceID(String employeeId, String resourceID)throws Exception;

	/* (non-Javadoc)
	 * @see com.neusoft.unieap.service.security.authorization.PermissionManager#grant(com.neusoft.unieap.service.security.providers.dao.SecurityRole, com.neusoft.unieap.service.security.resource.SecurityResource, com.neusoft.unieap.service.security.authorization.Permission, java.lang.Object)
	 */public abstract void grant(SecurityRole arg0, SecurityResource arg1,
			Permission arg2, Object arg3);

	/* (non-Javadoc)
	 * @see com.neusoft.unieap.service.security.authorization.PermissionManager#revoke(com.neusoft.unieap.service.security.providers.dao.SecurityRole, com.neusoft.unieap.service.security.resource.SecurityResource, com.neusoft.unieap.service.security.authorization.Permission)
	 */public abstract void revoke(SecurityRole arg0, SecurityResource arg1,
			Permission arg2);

	/* (non-Javadoc)
	 * @see com.neusoft.unieap.service.security.authorization.PermissionManager#revoke(com.neusoft.unieap.service.security.providers.dao.SecurityRole)
	 */public abstract void revoke(SecurityRole arg0);

	/* (non-Javadoc)
	 * @see com.neusoft.unieap.service.security.authorization.PermissionManager#getExtPermissionInfo(com.neusoft.unieap.service.security.providers.dao.SecurityRole, com.neusoft.unieap.service.security.authorization.Permission, java.lang.String)
	 */public abstract Object getExtPermissionInfo(SecurityRole arg0,
			Permission arg1, String arg2) throws Exception;

	/* (non-Javadoc)
	 * @see com.neusoft.unieap.service.security.authorization.PermissionManager#getRolesIDByPermissionInfo(com.neusoft.unieap.service.security.authorization.Permission, java.lang.String)
	 */public abstract Vector getRolesIDByPermissionInfo(Permission arg0,
			String arg1) throws Exception;
	 
	 /**
	  * ���ݲ���Ա��½�˺ţ���ɫ��ţ��ж����Ƿ���ж�ĳmenu(�����ǲ˵���ť)���з��ʵ�Ȩ��
	  * @param workNo
	  * @param roleId
	  * @param menuId
	  * @return
	  * @throws DataAccessException
	  */
	 public boolean ifHaveRight(String workNo, String menuId) throws DataAccessException;
	 /**
	  * ����ְԱ��źͰ�ť��url�õ����Ƿ���Ȩ�����ʴ˰�ť��Ϊbillingϵͳ�ṩ����Ϊ�䲻��ʹ��unieap��ǩ
	  * @param employeeId
	  * @param url
	  * @return
	  * @throws DataAccessException
	  */
	 public boolean ifHaveRightForOther(String employeeId, String url) throws DataAccessException;
	 
	 /**
	  * �ж�ĳְԱ��ĳ��ѡ���Ƿ����ʹ�õ�Ȩ��
	  * @param employeeId
	  * @param securityId
	  * @return
	  * @throws DataAccessException
	  */
	 public boolean haveRadioRight(String employeeId, String securityId) throws DataAccessException;
	 
	 /**
	  * �ж�ĳְԱ�Ƿ���з���ĳ��ѡ���Ȩ��
	  * @param employeeId
	  * @param securityId
	  * @return
	  * @throws DataAccessException
	  */
	 public boolean haveCheckBoxRight(String employeeId, String securityId) throws DataAccessException;
	 /**
	  * ����resourceid����ȡmenuid
	  * @param employeeId
	  * @param securityId
	  * @return
	  * @throws DataAccessException
	  * 20110505 zhangjn auto log button action
	  */
	 public String getMenuIDByResourceID(String employeeId, String resourceID)throws Exception;

}