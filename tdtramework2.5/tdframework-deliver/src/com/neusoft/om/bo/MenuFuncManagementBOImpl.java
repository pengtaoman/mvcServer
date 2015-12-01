package com.neusoft.om.bo;

import java.util.ArrayList;
import java.util.List;
import java.lang.Integer;

import com.neusoft.om.OMAppContext;
import com.neusoft.om.dao.menu.MenuColl;
import com.neusoft.om.dao.menu.MenuDAO;
import com.neusoft.om.dao.system.SystemColl;
import com.neusoft.om.dao.system.SystemDAO;
import com.neusoft.om.dao.system.SystemVO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.SysLog;

/**
 * @author renh
 *
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
public class MenuFuncManagementBOImpl implements MenuFuncManagementBO {
	private MenuDAO menuDAO;
	private SystemDAO systemDAO;
	
	public MenuColl getAllMenuInfo() throws ServiceException {
		MenuColl menuColl = null;
		try{
			menuColl = menuDAO.getAllMenuInfo();
		}catch(DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"MenuFuncManagementBOImpl--getAllMenuInfo-1 :"+e.getMessage());
			throw new ServiceException(e);
		}
		//系统
		SystemColl sysColl = null;
		try{
			sysColl = systemDAO.getAllSystemInfo();
		}catch(DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"MenuFuncManagementBOImpl--getAllMenuInfo-2 :"+e.getMessage());
			throw new ServiceException(e);
		}
		//设置系统信息
		SystemVO sysVO = null;
		if(menuColl!=null&&menuColl.getRowCount()>0){
			for(int i=0;i<menuColl.getRowCount();i++){
				if(menuColl.getMenu(i).getLayer()==0){
					sysVO = sysColl.getSystem(menuColl.getMenu(i).getMenuId());
					String systemName = sysVO.getSystemName();
					menuColl.getMenu(i).setMenuName(systemName);
				}
			}
		}
		return menuColl;
	}
	
	public MenuColl getAllFuncMenuInfoByRoleId(int roleId) throws ServiceException{
		//菜单
		MenuColl menuColl = null;
		try{
			menuColl = menuDAO.getAllFuncRoleMenuInfoByRoleId(roleId);
		}catch(DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"MenuFuncManagementBOImpl--getAllFuncMenuInfoByRoleId :"+e.getMessage());
			throw new ServiceException(e);
		}
		//系统
		SystemColl sysColl = null;
		try{
			sysColl = systemDAO.getAllSystemInfo();
		}catch(DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"MenuFuncManagementBOImpl--getAllFuncMenuInfoByRoleId :"+e.getMessage());
			throw new ServiceException(e);
		}
		//设置系统信息
		SystemVO sysVO = null;
		if(menuColl!=null&&menuColl.getRowCount()>0){
			for(int i=0;i<menuColl.getRowCount();i++){
				if(menuColl.getMenu(i).getLayer()==0){
					sysVO = sysColl.getSystem(menuColl.getMenu(i).getMenuId());
					String systemName = sysVO.getSystemName();
					menuColl.getMenu(i).setMenuName(systemName);
				}
			}
		}
//		设置系统是否被选中
			  List sysList = new ArrayList();
			  if(menuColl!=null&&menuColl.getRowCount()>0){
				  for(int i=0;i<menuColl.getRowCount();i++){
					  if(menuColl.getMenu(i).getLayer()==0){
						  Integer j = new Integer(i);
						  sysList.add(j);
					  }
				  }
				  Integer rowCnt = new Integer(menuColl.getRowCount()-1);
				  sysList.add(rowCnt);
				  for(int i=0;i<sysList.size()-1;i++){
					  for(int j=((Integer)sysList.get(i)).intValue()+1;j<((Integer)sysList.get(i+1)).intValue()-1;j++){
						  if(menuColl.getMenu(j).getAdminStatus()==1){
							  menuColl.getMenu(((Integer)sysList.get(i)).intValue()).setIfSelectAdmin(true);
							  menuColl.getMenu(((Integer)sysList.get(i)).intValue()).setAdminStatus(1);
						  }
						  if(menuColl.getMenu(j).getExecStatus()==1){
							  menuColl.getMenu(((Integer)sysList.get(i)).intValue()).setIfSelectExec(true);
							  menuColl.getMenu(((Integer)sysList.get(i)).intValue()).setExecStatus(1);
						  }
					  }
				  }
			
			  }
		return menuColl;
	}
	
	public MenuColl getFuncMenuInfoByRoleId(int roleId) throws ServiceException{
		//菜单
		MenuColl menuColl = null;
		try{
			menuColl = menuDAO.getFuncRoleMenuInfoByRoleId(roleId);
		}catch(DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"MenuFuncManagementBOImpl--getFuncMenuInfoByRoleId :"+e.getMessage());
			throw new ServiceException(e);
		}
		//系统
		SystemColl sysColl = null;
		try{
			sysColl = systemDAO.getAllSystemInfo();
		}catch(DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"MenuFuncManagementBOImpl--getFuncMenuInfoByRoleId :"+e.getMessage());
			throw new ServiceException(e);
		}
		//设置系统信息
		SystemVO sysVO = null;
		if(menuColl!=null&&menuColl.getRowCount()>0){
			for(int i=0;i<menuColl.getRowCount();i++){
				if(menuColl.getMenu(i).getLayer()==0){
					sysVO = sysColl.getSystem(menuColl.getMenu(i).getMenuId());
					String systemName = sysVO.getSystemName();
					menuColl.getMenu(i).setMenuName(systemName);
				}
			}
		}
		//设置系统是否被选中
		/*
		List sysList = new ArrayList();
		if(menuColl!=null&&menuColl.getRowCount()>0){
			for(int i=0;i<menuColl.getRowCount();i++){
				if(menuColl.getMenu(i).getLayer()==0){
					Integer j = new Integer(i);
					sysList.add(j);
				}
			}
			Integer rowCnt = new Integer(menuColl.getRowCount()-1);
			sysList.add(rowCnt);
			for(int i=0;i<sysList.size();i++){
				for(int j=((Integer)sysList.get(i)).intValue();j<((Integer)sysList.get(i+1)).intValue();j++){
					if(menuColl.getMenu(j).getAdminStatus()==1){
						menuColl.getMenu(((Integer)sysList.get(i)).intValue()).setAdminStatus(1);
					}
					if(menuColl.getMenu(j).getExecStatus()==1){
						menuColl.getMenu(((Integer)sysList.get(i)).intValue()).setExecStatus(1);
					}
				}
			}
			
		}*/
		return menuColl;
	}
		
	public void setMenuDAO(MenuDAO menuDAO) {
		this.menuDAO = menuDAO;
	}
	public void setSystemDAO(SystemDAO systemDAO) {
		this.systemDAO = systemDAO;
	}
	//test
	public static void main(String args[]) {
		MenuFuncManagementBO bo = (MenuFuncManagementBO)OMAppContext.getBean(MenuFuncManagementBO.BEAN);
		MenuColl coll = new MenuColl();
		try {
			//coll = bo.getAllMenuInfo();
			coll = bo.getAllFuncMenuInfoByRoleId(1);
			if(coll!=null&&coll.getRowCount()>0){
				for(int i=0;i<coll.getRowCount();i++){
					System.out.println(coll.getMenu(i).toString(2));
				}
			}
			
		} catch (ServiceException e) {
			e.printStackTrace();
		}
	}
}
