package com.neusoft.om.bo;
import com.neusoft.om.dao.duty.DutyColl;
import com.neusoft.om.dao.duty.DutyDAO;
import com.neusoft.om.dao.duty.DutyVO;
import com.neusoft.om.dao.dutyrolerelation.DutyRoleRelationDAO;
import com.neusoft.om.dao.employee.EmployeeColl;
import com.neusoft.om.dao.employee.EmployeeDAO;
import com.neusoft.om.dao.organ.OrganColl;
import com.neusoft.om.dao.organ.OrganDAO;
import com.neusoft.om.dao.organdutyrelation.OrganDutyRelationDAO;
import com.neusoft.om.dao.organkind.OrganKindDAO;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.tdframework.common.GlobalParameters;

/**brief description
 * <p>Date       : 2004-12-6</p>
 * <p>Module     : om</p>
 * <p>Description: 职务体系维护接口实现</p>
 * <p>Remark     : </p>
 * @author renh
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> 修改历史</p>
 * <p>  序号		日期		修改人			修改原因</p>
 * <p>   1                                       </p>
 */
public class DutySystemBOImpl implements DutySystemBO {
	private DutyDAO dutyDAO;
	private OrganDutyRelationDAO organDutyRelationDAO;
	private OrganDAO organDAO;
	private OrganKindDAO organKindDAO;
	private EmployeeDAO employeeDAO;
	private DutyRoleRelationDAO dutyRoleRelationDAO;
	
	public DutyColl queryDutySystemInfoByOrganKind(int organKind) throws ServiceException {
		DutyColl coll = null;
		try{
			coll= dutyDAO.getDutyInfoByOrganKind(organKind);
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutySystemBOImpl--getOrganDisplayInfo:"+e.getMessage());
			throw new ServiceException(e);
		}
		return coll;
	}

	public int doAddDutySystemInfo(DutyVO vo) throws ServiceException {
		int code = 1;//成功
		try{
			code = dutyDAO.doAddDuty(vo);
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutySystemBOImpl--doAddDutySystemInfo-1:"+e.getMessage());
			throw new ServiceException(e);
		}
		//同时维护组织机构和职务对应关系表
		int organKind = vo.getOrganKind();
		int dutyId = vo.getDutyId();
		try{
			code = organDutyRelationDAO.doAddOrganDutyRelationInfo(organKind,dutyId);
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutySystemBOImpl--doAddDutySystemInfo-2:"+e.getMessage());
			throw new ServiceException(e);
		}
		return code;
	}

	public int doDeleteDutySystemInfoByOrganKind(int organKind) throws ServiceException {
		int code = 1;//成功
		//首先判断在已有的组织机构信息中是否有该类型的组织机构
		OrganColl organColl = null;
		try{
			organColl = organDAO.getOrganInfoByOrganKind(organKind);
		}catch (DataAccessException e) {
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutySystemBOImpl--doDeleteDutySystemInfoByOrganKind-1:"+e.getMessage());
			throw new ServiceException(e);
		}
		if(organColl != null){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutySystemBOImpl--doDeleteDutySystemInfoByOrganKind-2:"+"该组织机构类型已经被使用,不允许删除");
			throw new ServiceException("该组织机构类型已经被使用,不允许删除");
		}
		//删除职务信息
		try{
			dutyDAO.doDeleteDutyByOrganKind(organKind);
		}catch (DataAccessException e) {
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutySystemBOImpl--doDeleteDutySystemInfoByOrganKind-3:"+e.getMessage());
			throw new ServiceException(e);
		}
		//删除组织机构类型信息
		try{
			organKindDAO.doDeleteOrganKindInfo(organKind);
		}catch (DataAccessException e) {
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutySystemBOImpl--doDeleteDutySystemInfoByOrganKind-4:"+e.getMessage());
			throw new ServiceException(e);
		}
		return code;
	}

	public int doDeleteDutySystemInfoByDutyId(int dutyId) throws ServiceException {
		int code=1;//成功
		//首先判断该职务下是否有人员(包括兼职)
		EmployeeColl employeeColl = null;
		try{
			employeeColl = employeeDAO.getAllEmployeeInfoByDutyId(dutyId);
		}catch (DataAccessException e) {
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutySystemBOImpl--doDeleteDutySystemInfoByDutyId-1:"+e.getMessage());
			throw new ServiceException(e);
		}
		if(employeeColl !=null&&employeeColl.getRowCount()>0){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutySystemBOImpl--doDeleteDutySystemInfoByDutyId-2:"+"该组织机构类型已经被使用,不允许删除");
			throw new ServiceException("有人员在该职务任职,不能删除!");
		}
		//删除职务信息
		try{
			dutyDAO.doDeleteDutyById(dutyId);
		}catch (DataAccessException e) {
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutySystemBOImpl--doDeleteDutySystemInfoByDutyId-3:"+e.getMessage());
			throw new ServiceException(e);
		}
		//维护职务和角色关系
		try{
			dutyRoleRelationDAO.doDeleteAllInfoByDutyId(dutyId);
		}catch (DataAccessException e) {
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutySystemBOImpl--doDeleteDutySystemInfoByDutyId-4:"+e.getMessage());
			throw new ServiceException(e);
		}
		return code;
	}
	
	/**
	 * 职务DAO
	 * @param maintenanceDAO
	 */
	public void setDutyDAO(DutyDAO maintenanceDAO) {
		dutyDAO = maintenanceDAO;
	}
	/**
	 * 组织机构职务关系DAO
	 * @param maintenanceDAO
	 */
	public void setOrganDutyRelationDAO(OrganDutyRelationDAO maintenanceDAO) {
		organDutyRelationDAO = maintenanceDAO;
	}
	/**
	 * 组织机构DAO
	 * @param maintenanceDAO
	 */
	public void setOrganDAO(OrganDAO maintenanceDAO) {
		organDAO = maintenanceDAO;
	}
	/**
	 * 组织机构类型DAO
	 * @param maintenanceDAO
	 */
	public void setOrganKindDAO(OrganKindDAO maintenanceDAO) {
		organKindDAO = maintenanceDAO;
	}
	/**
	 * 职员DAO
	 * @param maintenanceDAO
	 */
	public void setEmployeeDAO(EmployeeDAO maintenanceDAO) {
		employeeDAO = maintenanceDAO;
	}
	/**
	 * 职务与角色关系DAO
	 * @param maintenanceDAO
	 */
	public void setDutyRoleRelationDAO(DutyRoleRelationDAO maintenanceDAO ) {
		dutyRoleRelationDAO = maintenanceDAO;
	}

}
