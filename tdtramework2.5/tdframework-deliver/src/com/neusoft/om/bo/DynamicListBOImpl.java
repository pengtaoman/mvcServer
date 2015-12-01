package com.neusoft.om.bo;

import com.neusoft.om.dao.area.AreaColl;
import com.neusoft.om.dao.area.AreaDAO;
import com.neusoft.om.dao.area.AreaVO;
import com.neusoft.om.dao.duty.DutyColl;
import com.neusoft.om.dao.duty.DutyDAO;
import com.neusoft.om.dao.organ.OrganColl;
import com.neusoft.om.dao.organ.OrganDAO;
import com.neusoft.om.dao.organ.OrganVO;
import com.neusoft.om.dao.organkind.OrganKindColl;
import com.neusoft.om.dao.organkind.OrganKindDAO;
import com.neusoft.om.dao.role.RoleColl;
import com.neusoft.om.dao.role.RoleDAO;
import com.neusoft.om.dao.system.SystemColl;
import com.neusoft.om.dao.system.SystemDAO;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.tdframework.common.GlobalParameters;

/**
 * @author renh
 *
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
public class DynamicListBOImpl implements DynamicListBO{
	private DutyDAO dutyDAO;
	private OrganDAO organDAO;
	private AreaDAO areaDAO;
	private OrganKindDAO organKindDAO;
	private RoleDAO roleDAO;
	private SystemDAO systemDAO;
	
	public DutyColl getDutyList() throws ServiceException {
		DutyColl coll = null;
		try{
			coll = dutyDAO.getAllDutyInfo();
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DynamicListBOImpl--getDutyList():"+e.getMessage());
			throw new ServiceException(e);
		}
		return coll;
	}

	public OrganColl getOrganList() throws ServiceException {
		OrganColl coll = null;
		try{
			coll = organDAO.getAllOrganInfo();
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DynamicListBOImpl--getOrganList():"+e.getMessage());
			throw new ServiceException(e);
		}
		return coll;
	}
	
	public OrganColl getOrganListByOragn(String organId) throws ServiceException {
		OrganColl coll = null;
		try{
			coll = organDAO.getAllOrganInfo(organId);
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DynamicListBOImpl--getOrganList():"+e.getMessage());
			throw new ServiceException(e);
		}
		return coll;
	}
	
	public OrganColl getOrganInfoByOragn(String organId) throws ServiceException {
		OrganColl coll = null;
		try{
			coll = organDAO.getOrganInfo(organId);
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DynamicListBOImpl--getOrganList():"+e.getMessage());
			throw new ServiceException(e);
		}
		return coll;
	}
	
	public OrganColl getOrganListByArea(String areaId) throws ServiceException{
		OrganColl coll = null;
		try{
			coll = organDAO.getOrganInfoByAreaId(areaId);
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DynamicListBOImpl--getOrganListByArea():"+e.getMessage());
			throw new ServiceException(e);
		}
		return coll;
	}
	
	public AreaColl getAreaList() throws ServiceException {
		AreaColl coll = null;
		try{
			coll = areaDAO.getAreaAllInfo();
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DynamicListBOImpl--getAreaList():"+e.getMessage());
			throw new ServiceException(e);
		}
		return coll;
	}
	
	public AreaColl getAreaList(String areaId) throws ServiceException {
		AreaColl coll = null;
		try{
			coll = areaDAO.getAreaAllInfo(areaId);
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DynamicListBOImpl--getAreaList():"+e.getMessage());
			throw new ServiceException(e);
		}
		return coll;
	}
	
	public AreaColl getAreaListByOrgan(String organId) throws ServiceException {
		AreaColl coll = null;
		try{
			coll = areaDAO.getAreaInfoByOrgan(organId);
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DynamicListBOImpl--getAreaListByOrgan():"+e.getMessage());
			throw new ServiceException(e);
		}
		return coll;
	}
	
	
	public AreaColl getAreaChildList(String areaId) throws ServiceException{
		AreaColl coll = null;
		try{
			coll = areaDAO.getAreaChildColl(areaId);
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DynamicListBOImpl--getAreaChildList():"+e.getMessage());
			throw new ServiceException(e);
		}
		return coll;
	}

	public OrganKindColl getOrganKindList() throws ServiceException {
		OrganKindColl coll = null;
		try{
			coll = organKindDAO.getOrganKindInfo();
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DynamicListBOImpl--getOrganKindList():"+e.getMessage());
			throw new ServiceException(e);
		}
		return coll;
	}
	
	public RoleColl getFuncRoleList() throws ServiceException {
		RoleColl coll = null;
//		try{
//			coll = roleDAO.getRoleInfoByRoleKind(1);
//		}catch (DataAccessException e) {
//			SysLog.writeLogs("om",GlobalParameters.ERROR,"DynamicListBOImpl--getFuncRoleList():"+e.getMessage());
//			throw new ServiceException(e);
//		}
		return coll;
	}

	public RoleColl getDataRoleList() throws ServiceException {
		RoleColl coll = null;
//		try{
//			coll = roleDAO.getRoleInfoByRoleKind(2);
//		}catch (DataAccessException e) {
//			SysLog.writeLogs("om",GlobalParameters.ERROR,"DynamicListBOImpl--getDataRoleList():"+e.getMessage());
//			throw new ServiceException(e);
//		}
		return coll;
	}

	public RoleColl getAllRoleList() throws ServiceException {
		RoleColl coll = null;
		try{
			coll = roleDAO.getAllRoleInfo();
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DynamicListBOImpl--getAllRoleList():"+e.getMessage());
			throw new ServiceException(e);
		}
		return coll;
	}
	
	public SystemColl getAllSystemList() throws ServiceException {
		SystemColl coll = null;
		try{
			coll = systemDAO.getAllSystemInfo();
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DynamicListBOImpl--getAllRoleList():"+e.getMessage());
			throw new ServiceException(e);
		}
		return coll;
	}
	public OrganKindColl getOrganKindColl(String kind,String id) throws ServiceException{
		OrganKindColl coll = null;
		OrganVO organVO = null;
		if("area".intern()==kind.intern()){//根据区域编号,得到该区域下的直属组织机构集合
			AreaVO areaVO = null;
			//得到地市级别
			try{
				areaVO = areaDAO.getAreaById(id);
			}catch (DataAccessException e) {
				SysLog.writeLogs("om",GlobalParameters.ERROR,"DynamicListBOImpl--getOrganKindColl()-1:"+e.getMessage());
				throw new ServiceException(e);
			}
			if(areaVO==null){
				throw new ServiceException("获得地市信息异常!");
			}else{
				try{
					coll = organKindDAO.getOrganKindCollByLevel(areaVO.getAreaLevel());
				}catch (DataAccessException e) {
					SysLog.writeLogs("om",GlobalParameters.ERROR,"DynamicListBOImpl--getOrganKindColl()-2:"+e.getMessage());
					throw new ServiceException(e);
				}
			}
			
		}else{//根据组织机构id得到改组织机构所属类型下级组织机构集合
			try{
				organVO = organDAO.getOrganInfoById(id);
			}catch (DataAccessException e) {
				SysLog.writeLogs("om",GlobalParameters.ERROR,"DynamicListBOImpl--getOrganKindColl()-3:"+e.getMessage());
				throw new ServiceException(e);
			}
			if(organVO== null){
				throw new ServiceException("获得组织机构异常!");
			}else{
				try{
					coll = organKindDAO.getChildOrganKindCollByOrganKind(organVO.getOrganKind());
				}catch (DataAccessException e) {
					SysLog.writeLogs("om",GlobalParameters.ERROR,"DynamicListBOImpl--getOrganKindColl()-4:"+e.getMessage());
					throw new ServiceException(e);
				}
			}
			
		}
		return coll;		
	}
	/**
	 * 职务
	 * @param maintenanceDAO
	 */
	public void setDutyDAO(DutyDAO maintenanceDAO ) {
		dutyDAO = maintenanceDAO;
	}
	/**
	 * 组织机构
	 * @param maintenanceDAO
	 */
	public void setOrganDAO(OrganDAO maintenanceDAO) {
		organDAO = maintenanceDAO;
	}
	/**
	 * 行政区域
	 * @param maintenanceDAO
	 */
	public void setAreaDAO(AreaDAO maintenanceDAO) {
		areaDAO = maintenanceDAO;
	}
	/**
	 * 机构类型
	 * @param maintenanceDAO
	 */
	public void setOrganKindDAO(OrganKindDAO maintenanceDAO) {
		organKindDAO = maintenanceDAO;
	}
	/**
	 * 角色
	 * @param maintenanceDAO
	 */
	public void setRoleDAO(RoleDAO maintenanceDAO) {
		roleDAO = maintenanceDAO;
	}
	/**
	 * 系统
	 * @param systemDAO
	 */
	public void setSystemDAO(SystemDAO systemDAO) {
		this.systemDAO = systemDAO;
	}

}
