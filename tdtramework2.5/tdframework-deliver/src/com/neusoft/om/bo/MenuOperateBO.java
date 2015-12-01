package com.neusoft.om.bo;

import com.neusoft.om.dao.menuoperate.MenuOperateColl;
import com.neusoft.om.dao.menuoperate.MenuOperateDAO;
import com.neusoft.om.dao.menuoperate.MenuOperateVO;
import com.neusoft.om.dao.systemoperate.SystemOperateDAO;
import com.neusoft.om.dao.systemoperate.SystemOperateVO;
import com.neusoft.tdframework.core.BaseBO;
import com.neusoft.tdframework.exception.ServiceException;

public interface MenuOperateBO extends BaseBO{
	
	public static final String BEAN = "menuOperateFacade";
	
	public void setMenuOperateDAO(MenuOperateDAO dao) throws ServiceException;
	
	public void setSystemOperateDAO(SystemOperateDAO dao) throws ServiceException;

	public MenuOperateColl getMenuTree() throws ServiceException;

	public MenuOperateVO getMenuById(String menuId) throws ServiceException;
	
	public MenuOperateVO getMenuByName(String menuName) throws ServiceException;
	
	public int doDeleteMenuById(String menuId) throws ServiceException;

	public int doModifyMenuById(MenuOperateVO vo,String oldMenuId) throws ServiceException;
	
	public int doAddMenu(MenuOperateVO vo) throws ServiceException;
	
	public int doModifySystemInfo(SystemOperateVO vo,String oldSystemId) throws ServiceException;
	
	public int doDeleteSystemInfo(String id) throws ServiceException;
	
	public int doAddSystemInfo(SystemOperateVO vo) throws ServiceException;
	
	public SystemOperateVO getSystemInfoByName(String name) throws ServiceException;
	
	public MenuOperateColl getMenuSystemInfo() throws ServiceException;
	
	public SystemOperateVO getSystemInfoById(String id) throws ServiceException;
	
	//public SystemOperateVO getSystemInfoByName(String name);
	
}
