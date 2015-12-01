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
 * <p>Description: ְ����ϵά���ӿ�ʵ��</p>
 * <p>Remark     : </p>
 * @author renh
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> �޸���ʷ</p>
 * <p>  ���		����		�޸���			�޸�ԭ��</p>
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
		int code = 1;//�ɹ�
		try{
			code = dutyDAO.doAddDuty(vo);
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutySystemBOImpl--doAddDutySystemInfo-1:"+e.getMessage());
			throw new ServiceException(e);
		}
		//ͬʱά����֯������ְ���Ӧ��ϵ��
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
		int code = 1;//�ɹ�
		//�����ж������е���֯������Ϣ���Ƿ��и����͵���֯����
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
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutySystemBOImpl--doDeleteDutySystemInfoByOrganKind-2:"+"����֯���������Ѿ���ʹ��,������ɾ��");
			throw new ServiceException("����֯���������Ѿ���ʹ��,������ɾ��");
		}
		//ɾ��ְ����Ϣ
		try{
			dutyDAO.doDeleteDutyByOrganKind(organKind);
		}catch (DataAccessException e) {
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutySystemBOImpl--doDeleteDutySystemInfoByOrganKind-3:"+e.getMessage());
			throw new ServiceException(e);
		}
		//ɾ����֯����������Ϣ
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
		int code=1;//�ɹ�
		//�����жϸ�ְ�����Ƿ�����Ա(������ְ)
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
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutySystemBOImpl--doDeleteDutySystemInfoByDutyId-2:"+"����֯���������Ѿ���ʹ��,������ɾ��");
			throw new ServiceException("����Ա�ڸ�ְ����ְ,����ɾ��!");
		}
		//ɾ��ְ����Ϣ
		try{
			dutyDAO.doDeleteDutyById(dutyId);
		}catch (DataAccessException e) {
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutySystemBOImpl--doDeleteDutySystemInfoByDutyId-3:"+e.getMessage());
			throw new ServiceException(e);
		}
		//ά��ְ��ͽ�ɫ��ϵ
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
	 * ְ��DAO
	 * @param maintenanceDAO
	 */
	public void setDutyDAO(DutyDAO maintenanceDAO) {
		dutyDAO = maintenanceDAO;
	}
	/**
	 * ��֯����ְ���ϵDAO
	 * @param maintenanceDAO
	 */
	public void setOrganDutyRelationDAO(OrganDutyRelationDAO maintenanceDAO) {
		organDutyRelationDAO = maintenanceDAO;
	}
	/**
	 * ��֯����DAO
	 * @param maintenanceDAO
	 */
	public void setOrganDAO(OrganDAO maintenanceDAO) {
		organDAO = maintenanceDAO;
	}
	/**
	 * ��֯��������DAO
	 * @param maintenanceDAO
	 */
	public void setOrganKindDAO(OrganKindDAO maintenanceDAO) {
		organKindDAO = maintenanceDAO;
	}
	/**
	 * ְԱDAO
	 * @param maintenanceDAO
	 */
	public void setEmployeeDAO(EmployeeDAO maintenanceDAO) {
		employeeDAO = maintenanceDAO;
	}
	/**
	 * ְ�����ɫ��ϵDAO
	 * @param maintenanceDAO
	 */
	public void setDutyRoleRelationDAO(DutyRoleRelationDAO maintenanceDAO ) {
		dutyRoleRelationDAO = maintenanceDAO;
	}

}
