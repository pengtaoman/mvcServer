/*
 * Created on 2006-6-19
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
package com.neusoft.tdframework.authorization.security.db;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Vector;

import com.neusoft.om.dao.page.PageDAO;
import com.neusoft.tdframework.authorization.AuthorizeFactory;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;
import com.neusoft.unieap.service.security.SecurityFactory;
import com.neusoft.unieap.service.security.authorization.Permission;
import com.neusoft.unieap.service.security.providers.dao.SecurityRole;
import com.neusoft.unieap.service.security.resource.SecurityResource;
import com.neusoft.unieap.service.security.authorization.PermissionManager;

/**
 * @author zhangjn
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class TDPermissionManager implements  PermissionManager{

	public Vector getRolePermissionsByResourceID(SecurityRole sr, String resourceTypeID, String resourceID)throws Exception
	{
		//resourceID = "/crm1/fffff/../tdframework/demo/operatorMaint/QueryResult.jsp:test_b";
		//System.out.println("从页面获取到的权限控制组件的URL:"+resourceID);
		int needCut = resourceID.indexOf("..");
		if(needCut>0){
			resourceID = resourceID.substring(needCut + "..".length());
		}
		//System.out.println("经过处理后的权限控制组件的URL:"+resourceID);
        Vector vec = new Vector();
		InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
		AppContext appContext = new AppContextImpl();
		appContext.setApplicationName("");
		PageDAO page = (PageDAO) factory.getInteractionObject("pageDAO", appContext);
		vec = page.getRolePermissionsByResourceID(sr,resourceTypeID,resourceID);
        return vec;
	}

	/* (non-Javadoc)
	 * @see com.neusoft.unieap.service.security.authorization.PermissionManager#grant(com.neusoft.unieap.service.security.providers.dao.SecurityRole, com.neusoft.unieap.service.security.resource.SecurityResource, com.neusoft.unieap.service.security.authorization.Permission, java.lang.Object)
	 */
	public void grant(SecurityRole arg0, SecurityResource arg1, Permission arg2, Object arg3) {
		// TODO Auto-generated method stub
		
	}

	/* (non-Javadoc)
	 * @see com.neusoft.unieap.service.security.authorization.PermissionManager#revoke(com.neusoft.unieap.service.security.providers.dao.SecurityRole, com.neusoft.unieap.service.security.resource.SecurityResource, com.neusoft.unieap.service.security.authorization.Permission)
	 */
	public void revoke(SecurityRole arg0, SecurityResource arg1, Permission arg2) {
		// TODO Auto-generated method stub
		
	}

	/* (non-Javadoc)
	 * @see com.neusoft.unieap.service.security.authorization.PermissionManager#revoke(com.neusoft.unieap.service.security.providers.dao.SecurityRole)
	 */
	public void revoke(SecurityRole arg0) {
		// TODO Auto-generated method stub
		
	}

	/* (non-Javadoc)
	 * @see com.neusoft.unieap.service.security.authorization.PermissionManager#getExtPermissionInfo(com.neusoft.unieap.service.security.providers.dao.SecurityRole, com.neusoft.unieap.service.security.authorization.Permission, java.lang.String)
	 */
	public Object getExtPermissionInfo(SecurityRole arg0, Permission arg1, String arg2) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	/* (non-Javadoc)
	 * @see com.neusoft.unieap.service.security.authorization.PermissionManager#getRolesIDByPermissionInfo(com.neusoft.unieap.service.security.authorization.Permission, java.lang.String)
	 */
	public Vector getRolesIDByPermissionInfo(Permission arg0, String arg1) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}
}
