package com.neusoft.om.bo;

import com.neusoft.om.dao.menuoperate.MenuOperateColl;
import com.neusoft.om.dao.menuoperate.MenuOperateDAO;
import com.neusoft.om.dao.menuoperate.MenuOperateVO;
import com.neusoft.om.dao.systemoperate.SystemOperateColl;
import com.neusoft.om.dao.systemoperate.SystemOperateDAO;
import com.neusoft.om.dao.systemoperate.SystemOperateVO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.SysLog;


public class MenuOperateBOImpl implements MenuOperateBO{

	private MenuOperateDAO menuOperateDAO;
	private SystemOperateDAO systemOperateDAO;
	
	public MenuOperateColl getMenuSystemInfo()  throws ServiceException{
		MenuOperateColl menuOperateColl = null;
		MenuOperateColl menuSystemOperateColl = new MenuOperateColl();
		try{
			menuOperateColl = menuOperateDAO.getAllMenuInfo();
		}catch(DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"MenuFuncManagementBOImpl--getAllMenuInfo-1 :"+e.getMessage());
			throw new ServiceException(e);
		}
		//系统
		SystemOperateColl sysOperateColl = null;
		try{
			sysOperateColl = systemOperateDAO.getAllSystemInfo();
		}catch(DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"MenuFuncManagementBOImpl--getAllMenuInfo-2 :"+e.getMessage());
			throw new ServiceException(e);
		}
		//设置系统信息
		//SystemOperateVO sysOperateVO = null;
		MenuOperateVO menuOperateVO=null;
		//String tempSystemId="-1";
		if(menuOperateColl!=null&&menuOperateColl.getRowCount()>0){
			for(int j=0;j<sysOperateColl.getRowCount();j++)
			{
				
					menuOperateVO=new MenuOperateVO();
					menuOperateVO.setMenuId(sysOperateColl.getSystem(j).getSystemId());
					menuOperateVO.setMenuName(sysOperateColl.getSystem(j).getSystemName());
					menuOperateVO.setSystemId(sysOperateColl.getSystem(j).getSystemId());
					menuSystemOperateColl.addMenu(menuOperateVO);
				
				for(int i=0;i<menuOperateColl.getRowCount();i++)
				{
					if(menuOperateColl.getMenu(i).getSystemId().equals(sysOperateColl.getSystem(j).getSystemId()))
					{
						menuSystemOperateColl.addMenu(menuOperateColl.getMenu(i));
					}
				}
			}
			/*for(int i=0;i<sysOperateColl.getRowCount();i++)
			{
				sysOperateVO = sysOperateColl.getSystem(i);
				menuOperateVO=new MenuOperateVO();
				menuOperateVO.setMenuName(sysOperateVO.getSystemName());
				menuOperateVO.setMenuId(sysOperateVO.getSystemId());
				menuOperateColl.addMenu(menuOperateVO);
			}*/
		}
		return menuSystemOperateColl;
	}
	
	public MenuOperateColl getMenuTree() throws ServiceException{
		MenuOperateColl coll = new MenuOperateColl();
		try {
			coll = menuOperateDAO.getAllMenuInfo();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return coll;
	}

	public MenuOperateVO getMenuByName(String menuName) throws ServiceException{
		MenuOperateVO vo = null;

		try {
			vo = new MenuOperateVO();
			vo = menuOperateDAO.getMenuByMenuName(menuName);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return vo;
	}
	
	public MenuOperateVO getMenuById(String menuId) throws ServiceException{
		MenuOperateVO vo = null;
		try {
			vo = new MenuOperateVO();
			vo = menuOperateDAO.getMenuByMenuId(menuId);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return vo;
	}

	public int doDeleteMenuById(String menuId)  throws ServiceException{
		int code = 1;
		try{
			code = menuOperateDAO.doDeleteMenu(menuId);
		}catch(Exception e){
			e.printStackTrace();
		}
		return code;
	}

	public int doModifyMenuById(MenuOperateVO menuVO,String oldMenuId) throws ServiceException{
		int code = 1;
		try{
			code = menuOperateDAO.doModifyMenuInfo(menuVO,oldMenuId);
		}catch(Exception e){
			e.printStackTrace();
		}
		return code;
	}

	public int doAddMenu(MenuOperateVO menuVO) throws ServiceException{
		int code = 1;
		try {
			code = menuOperateDAO.doAddMenuInfo(menuVO);
		} catch (Exception e) {
			code = 0;
			e.printStackTrace();
		}
		return code;
	}

	/**
	 * @param menuOperateDAO 要设置的 menuOperateDAO。
	 */
	public void setMenuOperateDAO(MenuOperateDAO menuOperateDAO) {
		this.menuOperateDAO = menuOperateDAO;
	}

	public void setSystemOperateDAO(SystemOperateDAO systemOperateDAO) {
		// TODO 自动生成方法存根
		this.systemOperateDAO=systemOperateDAO;
	}

	
	public int doModifySystemInfo(SystemOperateVO vo,String oldSystemId)  throws ServiceException{
		// TODO 自动生成方法存根
		int code=-1;
		try {
			code= systemOperateDAO.doModifySystemInfo(vo,oldSystemId);
		} catch (DataAccessException e) {
			// TODO 自动生成 catch 块
			e.printStackTrace();
		}
		return code;
	}

	public int doDeleteSystemInfo(String id)  throws ServiceException{
		// TODO 自动生成方法存根
		int code=-1;
		try {
			code= systemOperateDAO.doDeleteSystemInfo(id);
		} catch (DataAccessException e) {
			// TODO 自动生成 catch 块
			e.printStackTrace();
		}
		return code;
	}

	public int doAddSystemInfo(SystemOperateVO vo)  throws ServiceException{
		// TODO 自动生成方法存根
		int code=-1;
		try {
			code= systemOperateDAO.doAddSystemInfo(vo);
		} catch (DataAccessException e) {
			// TODO 自动生成 catch 块
			e.printStackTrace();
		}
		return code;
	}

	public SystemOperateVO getSystemInfoByName(String name)  throws ServiceException{
		// TODO 自动生成方法存根
		SystemOperateVO vo=new SystemOperateVO();
		try {
			vo= systemOperateDAO.getSystemInfoByName(name);
		} catch (DataAccessException e) {
			// TODO 自动生成 catch 块
			e.printStackTrace();
		}
		return vo;
	}

	public SystemOperateVO getSystemInfoById(String id) throws ServiceException {
		// TODO 自动生成方法存根
		SystemOperateVO vo=new SystemOperateVO();
		try {
			vo= systemOperateDAO.getSystemInfoById(id);
		} catch (DataAccessException e) {
			// TODO 自动生成 catch 块
			e.printStackTrace();
		}
		return vo;
	}

	

} 