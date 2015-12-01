/*
 * Created on 2005-1-2
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.om.bo;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import com.neusoft.om.OMAppContext;
import com.neusoft.om.dao.employee.EmployeeColl;
import com.neusoft.om.dao.employee.EmployeeDAO;
import com.neusoft.om.dao.funcrole.FuncRoleColl;
import com.neusoft.om.dao.funcrole.FuncRoleDAO;
import com.neusoft.om.dao.funcrole.FuncRoleVO;
import com.neusoft.om.dao.menu.MenuColl;
import com.neusoft.om.dao.menu.MenuDAO;
import com.neusoft.om.dao.menu.MenuVO;
import com.neusoft.om.dao.role.RoleColl;
import com.neusoft.om.dao.role.RoleDAO;
import com.neusoft.om.dao.role.RoleVO;
import com.neusoft.om.dao.sequence.SequenceDAO;
import com.neusoft.om.dao.system.SystemColl;
import com.neusoft.om.dao.system.SystemDAO;
import com.neusoft.om.dao.system.SystemVO;
import com.neusoft.om.omutil.ParseFuncString;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;

/**
 * @author renh
 *
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
public class FuncRoleBOImpl implements FuncRoleBO{
	private RoleDAO roleDAO;
	private SequenceDAO sequenceDAO;
	private FuncRoleDAO funcRoleDAO;
	private EmployeeDAO employeeDAO;
	private SystemDAO systemDAO;
	private MenuDAO menuDAO;
	
	public int doAddFuncRoleInfo(RoleVO roleVO) throws ServiceException {
		//维护角色表,取得角色序列标识
		int roleSequence;
		int code = 1;
		try{
			roleSequence = sequenceDAO.getRoleSequenceValue();
		}catch (DataAccessException e) {
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"FuncRoleBOImpl--doAddFuncRoleInfo-1-获得角色序列:"+e.getMessage());
			throw new ServiceException(e);
		}
		//将角色信息写入角色表
		int roleId = roleSequence;
		roleVO.setRoleId(roleId);
		roleVO.setRoleType(1);//1:功能角色 2:数据角色
		try{
			String roleName = roleVO.getRoleName();
			boolean repeatName = roleDAO.repeateName(roleName);
			if(repeatName){
				code = 2;
				return code;
			}
			roleDAO.doAddRole(roleVO);
		}catch (DataAccessException e) {
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"FuncRoleBOImpl--doAddFuncRoleInfo-2-写角色表:"+e.getMessage());
			throw new ServiceException(e);
		}
		//写功能角色表
		/*
		//解析funcStr,返回funcRoleColl的结果集
		FuncRoleColl funcRoleColl = new FuncRoleColl();
		try{
			funcRoleColl = ParseFuncString.getParseColl(roleId,funcStr);
		}catch(Exception e){
			code = 0;
			throw new ServiceException("FuncRoleBOImpl--doAddFuncRoleInfo-由功能串得到功能角色结果集时出错!");
		}
		try{
			funcRoleDAO.doAddFuncRole(funcRoleColl);
		}catch (DataAccessException e) {
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"FuncRoleBOImpl--doAddFuncRoleInfo-3-写功能角色表:"+e.getMessage());
			throw new ServiceException(e);
		}*/
		return code;
	}
	
	public int doAddRoleInfo(RoleVO roleVO) throws ServiceException {
		//维护角色表,取得角色序列标识
		int roleSequence;
		int code = 1;
		try{
			roleSequence = sequenceDAO.getRoleSequenceValue();
		}catch (DataAccessException e) {
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"FuncRoleBOImpl--doAddRoleInfo-1-获得角色序列:"+e.getMessage());
			throw new ServiceException(e);
		}
		//将角色信息写入角色表
		int roleId = roleSequence;
		roleVO.setRoleId(roleId);
		roleVO.setRoleType(1);//1:功能角色 2:数据角色
		try{
			String roleName = roleVO.getRoleName();
			boolean repeatName = roleDAO.repeateName(roleName);
			if(repeatName){
				code = 2;
				return code;
			}
			roleDAO.doAddRole(roleVO);
		}catch (DataAccessException e) {
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"FuncRoleBOImpl--doAddRoleInfo-2-写角色表:"+e.getMessage());
			throw new ServiceException(e);
		}
		//写功能角色表
		/*
		//解析funcStr,返回funcRoleColl的结果集
		FuncRoleColl funcRoleColl = new FuncRoleColl();
		try{
			funcRoleColl = ParseFuncString.getParseColl(roleId,funcStr);
		}catch(Exception e){
			code = 0;
			throw new ServiceException("FuncRoleBOImpl--doAddFuncRoleInfo-由功能串得到功能角色结果集时出错!");
		}
		try{
			funcRoleDAO.doAddFuncRole(funcRoleColl);
		}catch (DataAccessException e) {
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"FuncRoleBOImpl--doAddFuncRoleInfo-3-写功能角色表:"+e.getMessage());
			throw new ServiceException(e);
		}*/
		return code;
	}
	
	public int doAdjustPrivilegeFuncRoleInfo (int roleId,String funcStr) throws ServiceException{
		int code = 1;
		//维护角色信息表,将funcStr解析后插入功能角色表,采用先删除再插入方法
		try{
			 funcRoleDAO.doDeleteFuncRoleByRoleId(roleId);
		 }catch (DataAccessException e) {
			 code = 0;
			 SysLog.writeLogs("om",GlobalParameters.ERROR,"FuncRoleBOImpl--doModifyFuncRoleInfo-1-删除功能角色信息时失败:"+e.getMessage());
			 throw new ServiceException(e);
		 }
		 if(funcStr!=null &&"".intern()!=funcStr.intern()){
			 
			 FuncRoleColl funcRoleColl = new FuncRoleColl();
			 funcRoleColl = ParseFuncString.getParseColl(roleId,funcStr);
			 try{
				 funcRoleDAO.doAddFuncRole(funcRoleColl);
			 }catch (DataAccessException e) {
				 code = 0;
				 SysLog.writeLogs("om",GlobalParameters.ERROR,"FuncRoleBOImpl--doModifyFuncRoleInfo-2-修改后的功能角色信息插入:"+e.getMessage());
				 throw new ServiceException(e);
			 }
		 }
		 return code;
	}
	public int doModifyFuncRoleInfo(int roleId,String roleName, String roleDesc) throws ServiceException{
		int code = 1;
		
		 try{
			 roleDAO.doModifyInfo(roleId,roleName,roleDesc);
		 }catch (DataAccessException e) {
			 code = 0;
			 SysLog.writeLogs("om",GlobalParameters.ERROR,"FuncRoleBOImpl--doModifyFuncRoleInfo:"+e.getMessage());
			 throw new ServiceException(e);
		 }
		return code;	
	}
	public int doModifyFuncRoleInfo(int roleId,String roleName) throws ServiceException{
		int code = 1;
		
		 try{
			 roleDAO.doModifyInfo(roleId,roleName,"");
		 }catch (DataAccessException e) {
			 code = 0;
			 SysLog.writeLogs("om",GlobalParameters.ERROR,"FuncRoleBOImpl--doModifyFuncRoleInfo:"+e.getMessage());
			 throw new ServiceException(e);
		 }
		return code;	
	}
	public int doDeleteFuncRoleInfo(int roleId) throws ServiceException {
		int code = 1;//成功
		//校验职员角色关系表中是否有该角色信息,如果有则不允许删除
		EmployeeColl employeeColl = null;
		try{
			employeeColl = employeeDAO.getEmployeeInfoFromEmployeeRoleRelation(roleId);
		}catch (DataAccessException e) {
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"FuncRoleBOImpl--doDeleteFuncRoleInfo-2-验证职员角色关系表:"+e.getMessage());
			throw new ServiceException(e);
		}
		if(employeeColl!=null&&employeeColl.getRowCount()>0){
			throw new ServiceException("该角色已在使用中,不能删除!");
		}
		//删除功能角色表
		try{
			funcRoleDAO.doDeleteFuncRoleByRoleId(roleId);
		}catch (DataAccessException e) {
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"FuncRoleBOImpl--doDeleteFuncRoleInfo-3-删除功能角色:"+e.getMessage());
			throw new ServiceException(e);
		}
		//删除角色表
		try{
			roleDAO.doDeleteInfoByRoleId(roleId);
		}catch (DataAccessException e) {
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"FuncRoleBOImpl--doDeleteFuncRoleInfo-4-删除角色:"+e.getMessage());
			throw new ServiceException(e);
		}
		return code;
	}
	
	public MenuColl getMenuInfoByDutyIdRoleId(int dutyId, int roleId) throws ServiceException {
		MenuColl menuColl = null;
		try{
			menuColl= menuDAO.getAllMenuInfoByDutyIdRoleId(dutyId,roleId);
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
				  sysVO = sysColl.getSystem(menuColl.getMenu(i).getSystemId());
				  String systemName = sysVO.getSystemName();
				  menuColl.getMenu(i).setMenuName(systemName);
			  }
		  }
		}
		return menuColl;
	}

	public MenuColl getAllMenuInfoByDutyIdRoleId(int dutyId, int roleId) throws ServiceException {
		MenuColl menuColl = null;
		try{
			menuColl= menuDAO.getAllMenuInfoByDutyIdRoleId(dutyId,roleId);
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
					String systemName = sysVO.getSystemName();
					menuColl.getMenu(i).setMenuName(systemName);
				}
			}
		}
		//设置系统是否被选中
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

	public RoleColl getAllFuncRoleByDutyId(int dutyId) throws ServiceException {
		RoleColl roleColl = null;
		try{
			roleColl = roleDAO.getRoleInfoByDutyIdRoleType(dutyId,1);
		}catch(DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"FuncRoleBOImpl--getAllFuncRoleByDutyId :"+e.getMessage());
			throw new ServiceException(e);
		}
		return roleColl;
	}
	
	public RoleColl getEmployeePermittedRoleColl(String adminType,String employee_id) throws ServiceException {
		RoleColl roleColl = null;
		try{
			roleColl = roleDAO.getEmployeePermittedRoleColl(adminType,employee_id);
		}catch(DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"FuncRoleBOImpl--getEmployeePermittedRoleColl :"+e.getMessage());
			throw new ServiceException(e);
		}
		return roleColl;
	}
	
	/**
	 * 设置角色
	 * @param roleDAO
	 */
	public void setRoleDAO(RoleDAO roleDAO) {
		this.roleDAO = roleDAO;
	}
	/**
	 * 设置功能角色
	 * @param funcRoleDAO
	 */
	public void setFuncRoleDAO(FuncRoleDAO funcRoleDAO) {
		this.funcRoleDAO = funcRoleDAO;
	}
	/**
	 * 设置序列
	 * @param sequenceDAO
	 */
	public void setSequenceDAO(SequenceDAO sequenceDAO) {
		this.sequenceDAO = sequenceDAO;
	}

	/**
	 * 设置职员
	 * @param employeeDAO
	 */
	public void setEmployeeDAO(EmployeeDAO employeeDAO){
		this.employeeDAO = employeeDAO;
	}
	/**
	 * 设置系统
	 * @param systemDAO
	 */
	public void setSystemDAO(SystemDAO systemDAO) {
		this.systemDAO = systemDAO;
	}
	/**
	 * 设置菜单
	 * @param menuDAO
	 */
	public void setMenuDAO(MenuDAO menuDAO) {
		this.menuDAO = menuDAO;
	}
	
	public int modifyRolePower(String oldMenus,String newMenus,int roleId){
		
		String[] oldMenusArray = null;
		if(oldMenus != null){
			oldMenusArray = oldMenus.split("-");
		}else{
			oldMenusArray = new String[1];
			oldMenusArray[0] = "";
		}
		
		String[] newMenusArray =null;
		if(newMenus!= null){
			newMenusArray = newMenus.split("-");
		}else{
			newMenusArray = new String[1];
			newMenusArray[0] = "";
		}
			
			
		
		List oldMenuList = new ArrayList();
		List newMenuList = new ArrayList();
		
		int i;
		for(i=0;i<oldMenusArray.length;i++){
			oldMenuList.add(i,oldMenusArray[i]);
		}
		for(i=0;i<newMenusArray.length;i++){
			newMenuList.add(i,newMenusArray[i]);
		}
		
		for(i=0;i<oldMenusArray.length;i++){
			boolean ifSameMenu = newMenuList.contains(oldMenusArray[i]);
			if(ifSameMenu){
				oldMenuList.remove(oldMenusArray[i]);
				newMenuList.remove(oldMenusArray[i]);
			}
			
		}
		
		Iterator delMenusIt= oldMenuList.iterator();
		Iterator insMenusIt= newMenuList.iterator();
		
		InteractionObjectFactory factory = InteractionObjectFactory
		.getInstance();
		AppContext appContext = new AppContextImpl();
		appContext.setApplicationName("om");
		MenuDAO dao = (MenuDAO) factory.getInteractionObject("menuDAO",
				appContext);
		dao.modifyMenus(insMenusIt,delMenusIt,roleId);
		
		return 0;
	}
	public int modifyRolePower(String[] newMenus, int roleId,String systemId) throws ServiceException{
		FuncRoleColl funcRoleColl = new FuncRoleColl();
		funcRoleColl = funcRoleDAO.getFuncRole(roleId, systemId);
		List oldMenuList = new ArrayList();
		List newMenuList = new ArrayList();
		for(int i=0; i < funcRoleColl.getRowCount(); i++){
			FuncRoleVO funcRole = new FuncRoleVO();
			funcRole = funcRoleColl.getFuncRole(i);
			String menuId = funcRole.getMenuId();
			oldMenuList.add(menuId);
		}
		if(newMenus != null){
			for(int i=0;i<newMenus.length;i++){
				newMenuList.add(i,newMenus[i]);
			}
		}
		
		
		for(int i=0;i<funcRoleColl.getRowCount();i++){
			String menuId = funcRoleColl.getFuncRole(i).getMenuId();
			boolean ifSameMenu = newMenuList.contains(menuId);
			if(ifSameMenu){
				oldMenuList.remove(menuId);
				newMenuList.remove(menuId);
			}			
		}		
		newMenuList = getMenu(newMenuList,systemId);
		Iterator delMenusIt= oldMenuList.iterator();
		Iterator insMenusIt= newMenuList.iterator();
		
		InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
		AppContext appContext = new AppContextImpl();
		appContext.setApplicationName("om");
		MenuDAO dao = (MenuDAO) factory.getInteractionObject("menuDAO",	appContext);
		dao.modifyMenus(insMenusIt,delMenusIt,roleId);		
		return 0;
	}
	//测试
	public static void main(String args[]) {
		FuncRoleBO bo = (FuncRoleBO)OMAppContext.getBean(FuncRoleBO.BEAN);
		//add
		RoleVO vo = new RoleVO();
		vo.setDutyId(999);
		vo.setCreateAreaId("test");
		vo.setRoleName("renhtest");
		try {
			MenuColl coll = bo.getAllMenuInfoByDutyIdRoleId(3,137);
			System.out.println(coll.getRowCount());
			for(int i=0;i<coll.getRowCount();i++){
				System.out.println(coll.getMenu(i).toString(2));
			}
		} catch (ServiceException e) {
			e.printStackTrace();
		}
	}
	private List getMenu(List list, String systemId) {
		List menuList = new ArrayList();		
		InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
		AppContext appContext = new AppContextImpl();
		appContext.setApplicationName("om");
		MenuDAO dao = (MenuDAO) factory.getInteractionObject("menuDAO",	appContext);
		MenuColl menuColl = dao.getMenuCollByFirstSys(systemId);
		for(int i=0; i < list.size(); i++){
			String id = (String)list.get(i);
			MenuVO vo = menuColl.getMenu(id);
			if(vo != null){
				menuList.add(id);
			}
		}
		return menuList;
	}
	
	
}
