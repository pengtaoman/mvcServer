package com.neusoft.tdframework.home.action;

import java.util.Map;
import java.util.List;

import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.exception.ServiceException;

public interface PortalPageBO {
	public final static String PORTALPAGEBO_BEANNAME="portalpageBO";
	
	public void setPortalpageDAO(PortalPageDAO portalPageDAO);	

	public List getPortalPageMenuColl(Map map) throws ServiceException;
	
	
	public List getViewForEmployee(String emplyeeId) throws ServiceException;
	
	public List getPortaletForView(String[] viewIds) throws ServiceException;
	
	public List getPortaletForViews(String[] viewIds) throws ServiceException;
	
	public List getPortaletForPointView(String viewId) throws ServiceException;
	
	public String getOnlineNumber(String city) throws ServiceException;
	
	
	public String getLastLoginTime(String workNo) throws ServiceException;
	

	
}
