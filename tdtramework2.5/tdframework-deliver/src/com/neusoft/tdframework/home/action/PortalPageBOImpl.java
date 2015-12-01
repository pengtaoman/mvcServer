package com.neusoft.tdframework.home.action;

import java.util.Map;
import java.util.List;

import com.neusoft.om.dao.menu.MenuColl;
import com.neusoft.tdframework.exception.ServiceException;

public class PortalPageBOImpl implements PortalPageBO {
	private PortalPageDAO portalpageDAO;

	public List getPortalPageMenuColl(Map map) throws ServiceException {
		List menuColl=null;
		try { 
			menuColl=portalpageDAO.getPortalPageMenuColl(map);
		}catch(Exception e){
			menuColl=null;
		}
		return menuColl;
	}


	public PortalPageDAO getPortalpageDAO() {
		return portalpageDAO;
	}



	public void setPortalpageDAO(PortalPageDAO portalPageDAO) {
		this.portalpageDAO = portalPageDAO;
	} 
	
    public List getViewForEmployee(String emplyeeId) throws ServiceException {
    	List menuColl=null;
		try { 
			menuColl=portalpageDAO.getViewForEmployee(emplyeeId);
		}catch(Exception e){
			menuColl=null;
		}
		return menuColl;
    }
	
	public List getPortaletForView(String[] viewIds) throws ServiceException {
		List menuColl=null;
		try { 
			menuColl=portalpageDAO.getPortaletForView(viewIds);
		}catch(Exception e){
			menuColl=null;
		}
		return menuColl;

	}
	
	public List getPortaletForViews(String[] viewIds) throws ServiceException {
		List menuColl=null;
		try { 
			menuColl=portalpageDAO.getPortaletForViews(viewIds);
		}catch(Exception e){
			menuColl=null;
		}
		return menuColl;

	}
	
	public List getPortaletForPointView(String viewId) throws ServiceException{
		List menuColl=null;
		try { 
			menuColl=portalpageDAO.getPortaletForPointView(viewId);
		}catch(Exception e){
			menuColl=null;
		}
		return menuColl;
	}
	
	public String getOnlineNumber(String city) throws ServiceException {
		try { 
			return portalpageDAO.getOnlineNumber(city);
		}catch(Exception e){
			throw new ServiceException(e);
		}
	}
	
	public String getLastLoginTime(String workNo) throws ServiceException {
		try { 
			return portalpageDAO.getLastLoginTime(workNo);
		}catch(Exception e){
			throw new ServiceException(e);
		}
	}
	

}
