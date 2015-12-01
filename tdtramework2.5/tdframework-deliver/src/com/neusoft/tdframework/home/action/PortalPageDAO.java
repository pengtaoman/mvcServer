package com.neusoft.tdframework.home.action;

import java.util.Map;
import java.util.List;

import com.neusoft.tdframework.common.data.ObjectCollection;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.exception.ServiceException;

public interface PortalPageDAO {
	public static final String BEAN = "portalPageDAO";

	public List getPortalPageMenuColl(Map map) throws DataAccessException;
	
    public List getViewForEmployee(String emplyeeId) throws DataAccessException;
	
	public List getPortaletForView(String[] viewIds) throws DataAccessException;
	
	public List getPortaletForViews(String[] viewIds) throws DataAccessException;
	
	public List getPortaletForPointView(String viewId) throws DataAccessException;
	
	public String getOnlineNumber(String city) throws DataAccessException;
	
	public String getLastLoginTime(String workNo) throws DataAccessException;
	


}
