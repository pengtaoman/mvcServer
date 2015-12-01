/*
 * Created on 2005-2-18
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.om.bo;

import java.util.ArrayList;
import java.util.List;

import com.neusoft.om.dao.duty.DutyDAO;
import com.neusoft.om.dao.duty.DutyVO;
import com.neusoft.om.dao.duty.OrganKindDutyColl;
import com.neusoft.om.dao.dutypower.DutyPowerColl;
import com.neusoft.om.dao.dutypower.DutyPowerDAO;
import com.neusoft.om.dao.dutyrolerelation.DutyRoleRelationDAO;
import com.neusoft.om.dao.employee.EmployeeColl;
import com.neusoft.om.dao.employee.EmployeeDAO;
import com.neusoft.om.dao.funcrole.FuncRoleDAO;
import com.neusoft.om.dao.menu.MenuColl;
import com.neusoft.om.dao.menu.MenuDAO;
import com.neusoft.om.dao.organ.OrganDAO;
import com.neusoft.om.dao.organkind.OrganKindDAO;
import com.neusoft.om.dao.system.SystemColl;
import com.neusoft.om.dao.system.SystemDAO;
import com.neusoft.om.dao.system.SystemVO;
import com.neusoft.om.omutil.ParseFuncString;
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
public class DutyBOImpl implements DutyBO{
	private DutyDAO dutyDAO;
	private MenuDAO menuDAO;
	private DutyPowerDAO dutyPowerDAO;
	private FuncRoleDAO funcRoleDAO;
	private OrganDAO organDAO;
	private OrganKindDAO organKindDAO;
	private EmployeeDAO employeeDAO;
	private DutyRoleRelationDAO dutyRoleRelationDAO;
	private SystemDAO systemDAO;
	
	public int doAddDutyInfo(DutyVO vo) throws ServiceException {
		int code = 1;//成功
		try{
			code = dutyDAO.doAddDuty(vo);
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyBOImpl--doAddDutySystemInfo-1:"+e.getMessage());
			throw new ServiceException(e);
		}
		return code;
	}

	public int doModifyDudyInfo(DutyVO vo) throws ServiceException {
		int code = 1;//成功
		try{
			code = dutyDAO.doModifyDutyById(vo);
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyBOImpl--doModifyDudyInfo-1:"+e.getMessage());
			throw new ServiceException(e);
		}
		return code;
	}

	public int doDeleteDutyInfoByDutyId(int dutyId) throws ServiceException {
		int code=1;//成功
		//首先判断该职务下是否有人员(包括兼职)
		EmployeeColl employeeColl = null;
		try{
			employeeColl = employeeDAO.getAllEmployeeInfoByDutyId(dutyId);
		}catch (DataAccessException e) {
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyBOImpl--doDeleteDutyInfoByDutyId-1:"+e.getMessage());
			throw new ServiceException(e);
		}
		if(employeeColl !=null&&employeeColl.getRowCount()>0){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyBOImpl--doDeleteDutyInfoByDutyId-2:"+"该组织机构类型已经被使用,不允许删除");
			throw new ServiceException("有人员在该职务任职,不能删除!");
		}
		//删除职务信息
		try{
			dutyDAO.doDeleteDutyById(dutyId);
		}catch (DataAccessException e) {
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyBOImpl--doDeleteDutyInfoByDutyId-3:"+e.getMessage());
			throw new ServiceException(e);
		}
		//维护职务和角色关系
		try{
			dutyRoleRelationDAO.doDeleteAllInfoByDutyId(dutyId);
		}catch (DataAccessException e) {
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyBOImpl--doDeleteDutyInfoByDutyId-4:"+e.getMessage());
			throw new ServiceException(e);
		}
		//维护职务的职责范围
		try{
			dutyPowerDAO.doDeleteDutyPower(dutyId);
		}catch (DataAccessException e) {
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyBOImpl--doDeleteDutyInfoByDutyId-5:"+e.getMessage());
			throw new ServiceException(e);
		}
		return code;
	}

	public DutyVO getDutyInfoByDutyId(int dutyId) throws ServiceException {
		DutyVO vo = null;
		try{
			vo = dutyDAO.getDutyInfoById(dutyId);
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyBOImpl--getDutyInfoByDutyId-1:"+e.getMessage());
			throw new ServiceException(e);
		}
		return vo;
	}

	public OrganKindDutyColl getOrganKindDuty() throws ServiceException {
		OrganKindDutyColl coll = null;
		try{
			coll = dutyDAO.getOrganKindDuty();
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyBOImpl--getDutyInfoByDutyId-1:"+e.getMessage());
			throw new ServiceException(e);
		}
		return coll;
	}

	public int doModifyDutyPower(int dutyId, String delFuncStr, String allFuncStr) throws ServiceException {
		int code = 1;
		//处理删除的权限信息
		//解析串
		DutyPowerColl delDutyPowerColl = new DutyPowerColl();
		delDutyPowerColl = ParseFuncString.getDutyPowerColl(dutyId,delFuncStr);
		if(delDutyPowerColl != null){
			for(int i=0;i<delDutyPowerColl.getRowCount();i++){
				//删除角色中的信息
				try{
					funcRoleDAO.doDeleteFuncRoleByDutyIdMenuId(dutyId,delDutyPowerColl.getDutyPower(i).getMenuId());
				}catch(DataAccessException e){
					SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyBOImpl--doModifyDutyPower--1:"+e.getMessage());
					throw new ServiceException(e);
				}
			}
		}
		//处理当前的权限信息,先删除再插入
		try{
			code = dutyPowerDAO.doDeleteDutyPower(dutyId);
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyBOImpl--doModifyDutyPower--2:"+e.getMessage());
			throw new ServiceException(e);
		}
		//解析新串
		DutyPowerColl addDutyPowerColl = new DutyPowerColl();
		addDutyPowerColl = ParseFuncString.getDutyPowerColl(dutyId,allFuncStr);
		if(addDutyPowerColl != null) {
			try{
				code = dutyPowerDAO.doAddDutyPower(dutyId,addDutyPowerColl);
			}catch (DataAccessException e) {
				SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyBOImpl--doModifyDutyPower--3:"+e.getMessage());
				throw new ServiceException(e);
			}
		}
		return code;
	}

	public MenuColl getAllDutyPowerInfo(int dutyId) throws ServiceException {
		MenuColl menuColl = null;
		try{
			menuColl= menuDAO.getAllDutyPower(dutyId);
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyBOImpl--getAllDutyPowerInfo:"+e.getMessage());
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
                    String a = "a";
                    
                    
                    if(sysVO != null){
                        String systemName = sysVO.getSystemName();
                        menuColl.getMenu(i).setMenuName(systemName);                        
                    }

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

	public MenuColl getDutyPowerInfo(int dutyId) throws ServiceException {
		MenuColl menuColl = null;
		try{
			menuColl= menuDAO.getDutyPower(dutyId);
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyBOImpl--getDutyPowerInfo:"+e.getMessage());
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
	/**
	 * 设置菜单
	 * @param menuDAO
	 */
	public void setMenuDAO(MenuDAO menuDAO) {
		this.menuDAO = menuDAO;
	}
	/**
	 * 设置职务
	 * @param dutyDAO
	 */
	public void setDutyDAO(DutyDAO dutyDAO) {
		this.dutyDAO = dutyDAO;
	}
	/**
	 * 设置职责范围
	 * @param dutyPowerDAO
	 */
	public void setDutyPowerDAO(DutyPowerDAO dutyPowerDAO) {
		this.dutyPowerDAO = dutyPowerDAO;
	}
	/**
	 * 设置功能角色
	 * @param funcRoleDAO
	 */
	public void setFuncRoleDAO(FuncRoleDAO funcRoleDAO) {
		this.funcRoleDAO = funcRoleDAO;
	}
	/**
	 * 设置组织机构
	 * @param organDAO
	 */
	public void setOrganDAO(OrganDAO organDAO) {
		this.organDAO = organDAO;
	}
	/**
	 * 设置组织机构类型
	 * @param organKindDAO
	 */
	public void setOrganKindDAO(OrganKindDAO organKindDAO){
		this.organKindDAO = organKindDAO;
	}
	/**
	 * 设置职员
	 * @param employeeDAO
	 */
	public void setEmployeeDAO(EmployeeDAO employeeDAO){
		this.employeeDAO = employeeDAO;
	}
	/**
	 * 设置职务角色关系
	 * @param dutyRoleRelationDAO
	 */
	public void setDutyRoleRelationDAO(DutyRoleRelationDAO dutyRoleRelationDAO){
		this.dutyRoleRelationDAO = dutyRoleRelationDAO;
	}
	/**
	 * 设置系统
	 * @param systemDAO
	 */
	public void setSystemDAO(SystemDAO systemDAO) {
		this.systemDAO = systemDAO;
	}
	
}
