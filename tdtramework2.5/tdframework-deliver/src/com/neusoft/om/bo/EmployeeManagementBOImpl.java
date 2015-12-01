package com.neusoft.om.bo;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.neusoft.crm.channel.outInterface.om.dao.OmQueryDAOImpl;
import com.neusoft.om.OMAppContext;
import com.neusoft.om.OMLogger;
import com.neusoft.om.dao.common.SwitchDAO;
import com.neusoft.om.dao.dictionary.OMDictionaryDAO;
import com.neusoft.om.dao.duty.DutyColl;
import com.neusoft.om.dao.duty.DutyDAO;
import com.neusoft.om.dao.employee.EmployeeColl;
import com.neusoft.om.dao.employee.EmployeeDAO;
import com.neusoft.om.dao.employee.EmployeeVO;
import com.neusoft.om.dao.employee.IntEmployeeDAO;
import com.neusoft.om.dao.employee.IntEmployeeVO;
import com.neusoft.om.dao.employeedutyrelation.EmployeeDutyRelationColl;
import com.neusoft.om.dao.employeedutyrelation.EmployeeDutyRelationDAO;
import com.neusoft.om.dao.employeedutyrelation.EmployeeDutyRelationVO;
import com.neusoft.om.dao.employeeparamrolerelation.EmployeeParamRoleRelationColl;
import com.neusoft.om.dao.employeeparamrolerelation.EmployeeParamRoleRelationDAO;
import com.neusoft.om.dao.employeeparamrolerelation.EmployeeParamRoleRelationVO;
import com.neusoft.om.dao.employeeroledisplay.EmployeeRoleDisplayColl;
import com.neusoft.om.dao.employeeroledisplay.EmployeeRoleDisplayVO;
import com.neusoft.om.dao.employeeroledisplay.OwnAndAssignedRoleDispColl;
import com.neusoft.om.dao.employeeroledisplay.OwnAndAssignedRoleDispVO;
import com.neusoft.om.dao.employeerolerelation.EmployeeRoleRelationColl;
import com.neusoft.om.dao.employeerolerelation.EmployeeRoleRelationDAO;
import com.neusoft.om.dao.employeerolerelation.EmployeeRoleRelationVO;
import com.neusoft.om.dao.funcrole.FuncRoleColl;
import com.neusoft.om.dao.funcrole.FuncRoleDAO;
import com.neusoft.om.dao.funcrole.FuncRoleVO;
import com.neusoft.om.dao.log.LogDAO;
import com.neusoft.om.dao.menu.MenuColl;
import com.neusoft.om.dao.menu.MenuDAO;
import com.neusoft.om.dao.menu.MenuVO;
import com.neusoft.om.dao.omswitch.OmSwitchDAO;
import com.neusoft.om.dao.organ.OrganDAO;
import com.neusoft.om.dao.organemployeedisplay.OrganEmployeeDisplayColl;
import com.neusoft.om.dao.organemployeedisplay.OrganEmployeeDisplayVO;
import com.neusoft.om.dao.paramrole.ParamRoleColl;
import com.neusoft.om.dao.paramrole.ParamRoleDAO;
import com.neusoft.om.dao.paramrole.ParamRoleVO;
import com.neusoft.om.dao.poweradjust.PowerAdjustColl;
import com.neusoft.om.dao.poweradjust.PowerAdjustDAO;
import com.neusoft.om.dao.poweradjust.PowerAdjustVO;
import com.neusoft.om.dao.role.RoleColl;
import com.neusoft.om.dao.role.RoleDAO;
import com.neusoft.om.dao.role.RoleVO;
import com.neusoft.om.dao.sequence.SequenceDAO;
import com.neusoft.om.dao.system.SystemDAO;
import com.neusoft.om.omutil.OmUtilDAO;
import com.neusoft.om.omutil.PassWord;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.SysLog;

/**brief description
 * <p>Date       : 2004-11-16</p>
 * <p>Module     : </p>
 * <p>Description: </p>
 * <p>Remark     : </p>
 * @author renh
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> �޸���ʷ</p>
 * <p>  ���		����		�޸���			�޸�ԭ��</p>
 * <p>   1                                       </p>
 */

public class EmployeeManagementBOImpl implements EmployeeManagementBO{
	private EmployeeDAO employeeDAO;
	private EmployeeDutyRelationDAO employeeDutyRelationDAO;
	private OmSwitchDAO omSwitchDAO;
	private OmUtilDAO omUtilDAO;
	private RoleDAO roleDAO;
	private DutyDAO dutyDAO;
	private EmployeeRoleRelationDAO employeeRoleRelationDAO;
	private PowerAdjustDAO powerAdjustDAO;
	private SequenceDAO sequenceDAO;
	private LogDAO logDAO;
    private SystemDAO systemDAO;
    private MenuDAO menuDAO;
    private OMDictionaryDAO dictionaryDAO;
    private OrganDAO organDAO;
    private SwitchDAO switchDAO;
    private FuncRoleDAO funcRoleDAO;
    private ParamRoleDAO paramRoleDAO;
    private IntEmployeeDAO intEmployeeDAO;
    private OmQueryDAOImpl omQueryDAOInterface;
    /**
     * @param employeeParamRoleRelationDAO Ҫ���õ� employeeParamRoleRelationDAO��
     */
    public void setEmployeeParamRoleRelationDAO(
            EmployeeParamRoleRelationDAO employeeParamRoleRelationDAO) {
        this.employeeParamRoleRelationDAO = employeeParamRoleRelationDAO;
    }
    private EmployeeParamRoleRelationDAO employeeParamRoleRelationDAO;
    
	
    /**
	 * @param intEmployeeDAO the intEmployeeDAO to set
	 */
	public void setIntEmployeeDAO(IntEmployeeDAO intEmployeeDAO) {
		this.intEmployeeDAO = intEmployeeDAO;
	}
	
	public void setOmQueryDAOInterface(OmQueryDAOImpl omQueryDAOInterface) {
		this.omQueryDAOInterface = omQueryDAOInterface;
	}

	/**
     *��ȡ����������Ϣ
     * @return
     */
    public String getDealerNameInfo(String dealerId) throws ServiceException {
		String dealerName = "";
		try{
			if(dealerId != null && !dealerId.equals("")){
				com.neusoft.crm.channel.outInterface.om.data.DealerVO channelVO = omQueryDAOInterface.doGetDealerByDealer(dealerId);
				dealerName= channelVO.getDealer_name();
			}			
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--getDealerNameInfo:"+e.getMessage());
			throw new ServiceException(e);
		}
		return dealerName;
	}
    /**
     *��ѯ��������������Ϣ
     * @return
     */
    public String getRegionCodeById(String dealerId) throws ServiceException {
		String organId = "";
		try{
			organId= omUtilDAO.getRegionCodeById(dealerId);
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OmCommon--getRegionCodeById():"+e.getMessage());
			throw new ServiceException(e);
		}
		return organId;
	}

	//��Ա��Ϣ
	public EmployeeColl getEmployeeInfo(HashMap mapData) throws ServiceException{
		String areaId = (String)mapData.get("areaId");
		String organId = (String)mapData.get("organId");
		String dutyId = (String)mapData.get("dutyId");
		
		
		EmployeeColl coll = new EmployeeColl();
        EmployeeColl empColl = new EmployeeColl();
		try{
			coll= employeeDAO.getEmployeeInfo(areaId,organId,dutyId);
            for(int i = 0; i < coll.getRowCount(); i++){
                EmployeeVO vo = coll.getEmployee(i);
                String dutyName = switchDAO.getDutyNameByDutyId(String.valueOf(vo.getDutyId()));
                String organName = switchDAO.getOrganNameByOrganId(vo.getOrganId());
                String levelName = switchDAO.getPersonLevelNameById(vo.getPersonLevel());
                vo.setDutyName(dutyName);
                vo.setOrganName(organName);
                vo.setLevelName(levelName);
                empColl.addEmployee(vo);
            }
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--getEmployeeInfo:"+e.getMessage());
			throw new ServiceException(e);
		}

        
		return empColl;
	}
	
	//ĳ��ְԱ��ְ����Ϣ
	public EmployeeDutyRelationColl getEmployeeDutyRelationInfoByEmployeeId(String employeeId) throws ServiceException{
		EmployeeDutyRelationColl coll = new EmployeeDutyRelationColl();
		try{
			coll = employeeDutyRelationDAO.getEmployeeDutyRelationInfoByEmployeeId(employeeId);	
            for(int i =0; i < coll.getRowCount(); i++){
                EmployeeDutyRelationVO vo = coll.getEmployeeDutyRelation(i);
                vo.setDutyName(switchDAO.getDutyNameByDutyId(String.valueOf(vo.getDutyId())));
                vo.setOrganName(switchDAO.getOrganNameByOrganId(vo.getOrganId()));
            }
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--getEmployeeDutyRelationInfoByEmployeeId:"+e.getMessage());
			throw new ServiceException(e);
		}
		return coll;
	}
	
	//ְԱ��ϸ��Ϣ
	public EmployeeVO getEmployeeByEmployeeId(String employeeId) throws ServiceException {
		EmployeeVO vo = null;
		try{
			vo= employeeDAO.getEmployeeInfoById(employeeId);
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,
				"EmployeeManagementBOImpl--getEmployeeInfoById:"+e.getMessage());
			throw new ServiceException(e);
		}
		return vo;
	}
	//ְԱ��ϸ��Ϣ
	
	
	//ְԱ��ɫ��Ϣ����
	public RoleColl getRoleInfoByEmployeeId(String employeeId) throws ServiceException {
		RoleColl coll = null;
		try{
			coll= roleDAO.getRoleInfoByEmployeeId(employeeId);
		
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--queryRoleInfoByEmployeeId:"+e.getMessage());
			throw new ServiceException(e);
		}
		return coll;
	}
	
	//ְ����Ϣ����
	public DutyColl getDutyInfoByEmployeeId(String employeeId) throws ServiceException {
		DutyColl coll = null;
		try{
			coll= dutyDAO.getDutyInfoByEmployeeId(employeeId);

		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--queryDutyInfoByEmployeeId:"+e.getMessage());
			throw new ServiceException(e);
		}
		return coll;
	}
	
	public EmployeeColl getEmployee(String organId) throws ServiceException {
		EmployeeColl coll = null;
		try{
			coll = employeeDAO.getEmployeeInfoByOrganId(organId);
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--getEmployee:"+e.getMessage());
			throw new ServiceException(e);
		}
		return coll;
	}
	
	public int doModifyEmployeeInfo(EmployeeVO employeeVO,String oldOrganId,int oldDutyId,HashMap map) throws ServiceException {
		int code = 1;
		String newOrganId = employeeVO.getOrganId();
		int newDutyId = employeeVO.getDutyId();
        boolean ifMatchCase;
        //���Ȼ�ÿ��ز����ѵõ���½�˺��Ƿ����ִ�Сд
        try{
            ifMatchCase = omSwitchDAO.getIfMatchCase();
        }catch (DataAccessException e) {
            SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--doAddEmployeeInfo-0:"+e.getMessage());
            throw new ServiceException(e);
        }
        if(!ifMatchCase){ //��������֣���Ҫ����½�˺�תΪ��д
            employeeVO.setWorkNo(employeeVO.getWorkNo().toUpperCase());
        }
		//��֯������ְ��ֻҪ��һ�������仯�����д˲���
		if(newOrganId.intern()!=oldOrganId.intern() || newDutyId !=oldDutyId){
			//ά������Աְ���ϵ��,��ԭ������Ҫְ�����֯����������Ϊ��ǰ��ֵ
			EmployeeDutyRelationVO employeeDutyRelationVO = new EmployeeDutyRelationVO();
			employeeDutyRelationVO.setDutyId(employeeVO.getDutyId());
			employeeDutyRelationVO.setEmployeeId(employeeVO.getEmployeeId());
			employeeDutyRelationVO.setOrganId(employeeVO.getOrganId());
			employeeDutyRelationVO.setKind(1);
			try{
				employeeDutyRelationDAO.doModifyEmployeeDutyRelationInfo(employeeDutyRelationVO,oldOrganId,oldDutyId);
			}catch (DataAccessException e){
				code = 0;
				SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--doModifyEmployeeInfo-1:"+e.getMessage());
				throw new ServiceException(e);
			}
		}
		//���ְ�����仯
		if(newDutyId !=oldDutyId){
			//ְ��仯ֻ����Ҫְ��ı仯,��Ҫ����Ҫְ���Ӧ�Ľ�ɫ��Ϣɾ��
			try{
				employeeRoleRelationDAO.doDeleteEmployeeRoleRelationInfoByEmployeeIdDutyId(employeeVO.getEmployeeId(),oldDutyId);
			}catch (DataAccessException e){
				code = 0;
				SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--doModifyEmployeeInfo-2:"+e.getMessage());
				throw new ServiceException(e);
			}
		}
		//����ְԱ����Ϣ
		try{
//			�����Ҫͬ��,���޸�ְԱ�ĵ�¼�ʺŲ�Ϊ��
			if(getIfSynchronize(employeeVO) 
					&& employeeVO.getWorkNo() != null 
					&& !employeeVO.getWorkNo().trim().equals("")){
				code = doSynOperate(employeeVO,2);
			}else{
				employeeDAO.doModifyEmployeeById(employeeVO);
			}			
		}catch (DataAccessException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--doModifyEmployeeInfo-1:"+e.getMessage());
			throw new ServiceException(e);
		}
		return code;
	}
	
	//ɾ��
	public int doDeleteEmployeeInfo(String employeeId,HashMap map) throws ServiceException {
		int code = 1;
	
		//ɾ��ְԱ��Ϣ
		try{
//			�����Ҫͬ��,���޸�ְԱ�ĵ�¼�ʺŲ�Ϊ��
			EmployeeVO employeeVO = new EmployeeVO();
			employeeVO = employeeDAO.getEmployeeInfoById(employeeId);
			if(getIfSynchronize(employeeVO) 
					&& employeeVO.getWorkNo() != null 
					&& !employeeVO.getWorkNo().trim().equals("")){
				code = doSynOperate(employeeVO,3);
			}else{
				employeeDAO.doDeleteEmployeeById(employeeId);
			}	
			
		}catch (DataAccessException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--doDeleteEmployeeInfo-1:"+e.getMessage());
			throw new ServiceException(e);
		}
		//ɾ��ְԱ���ɫ��ϵ
		try{
			employeeRoleRelationDAO.doDeleteEmployeeRoleRelationInfoByEmployeeId(employeeId);
		}catch (DataAccessException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--doDeleteEmployeeInfo-2:"+e.getMessage());
			throw new ServiceException(e);
		}
		//ɾ��ְԱ��ְ���ϵ
		try{
			employeeDutyRelationDAO.doDeleteEmployeeDutyRelationInfoByEmployeeId(employeeId);
		}catch (DataAccessException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--doDeleteEmployeeInfo-3:"+e.getMessage());
			throw new ServiceException(e);
		}
		//��΢����Ϣ����ɾ��΢����Ϣ
		try{
			powerAdjustDAO.doDeletePowerAdjustInfo(employeeId);
		}catch (DataAccessException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--doDeleteEmployeeInfo-54:"+e.getMessage());
			throw new ServiceException(e);
		}		
		return code;
	}
	
	//�����޸�
	public int doUpdatePassWord(String workNo,String workPwd) throws  ServiceException{
		int code = 1;
		//���ò���Ա�����޸ĵ����ݿ�ӿ�
		try{
			employeeDAO.doUpdatePassWord(workNo,workPwd);
		}catch (DataAccessException e) {
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--doUpdatePassWord--3"+e.getMessage());
			throw new ServiceException(e);
		}
		return code;
	}
	//����ָ�
	public HashMap doRenewPassWord(String workNo) throws  ServiceException {
		HashMap result = new HashMap();
        int code = 1;
		boolean ifMatchCase;
//		���Ȼ�ÿ��ز����ѵõ���½�˺��Ƿ����ִ�Сд
		  try{
			  ifMatchCase = omSwitchDAO.getIfMatchCase();
		  }catch (DataAccessException e) {
			  SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--doAddEmployeeInfo-0:"+e.getMessage());
			  throw new ServiceException(e);
		  }
		  if(!ifMatchCase){ //��������֣���Ҫ����½�˺�תΪ��д
			  workNo = workNo.toUpperCase();
		  }
		//����ָ�����½�˺�ת��ΪСд����ݹ���ָ�
		String workPwd = workNo.toLowerCase();
		//����������
		int y = 6 - workPwd.length();
		if (workPwd.length() < 6) {
			for (int i=1;i<= y;i++) {
				workPwd += "0";
			}
		}else if (workPwd.length() >15) {
			workPwd = workPwd.substring(0,15);
		}
		
		String ts = "";
		String rs = "";
		int x = workPwd.length();
		
		if (workPwd.indexOf("_") != -1 ) {
			for (int i=1;i<=x;i++) {  
				ts = workPwd.substring(i-1,i);
				if (ts.equals("_")) {
					rs += "0";
				}
				else {
					rs += ts;
				}
			}		
		}else{
			rs = workPwd;
		}
        result.put("workPwd", rs);
		//����������м��ܴ���
		rs = PassWord.encode(rs);
		
		//���ò���Ա�����޸ĵ����ݿ�ӿ�
		try{
			employeeDAO.doPasswordUpdate(workNo,rs);
		}catch (DataAccessException e) {
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--doUpdatePassWord--3"+e.getMessage());
			throw new ServiceException(e);
		}
        result.put("code", new Integer(code));
		return result;
	}
	/**
	 * ְԱ
	 * @param maintenanceDAO
	 */
	public void setEmployeeDAO(EmployeeDAO maintenanceDAO) {
			employeeDAO = maintenanceDAO;
		}
	/**
	 * ְԱְ���ϵ
	 * @param maintenanceDAO
	 */
	public void setEmployeeDutyRelationDAO(EmployeeDutyRelationDAO maintenanceDAO) {
		employeeDutyRelationDAO = maintenanceDAO;
	}
	/**
	 * ���ؿ�����Ϣ
	 * @param maintenanceDAO
	 */
	public void setOmSwitchDAO(OmSwitchDAO maintenanceDAO ){
		omSwitchDAO = maintenanceDAO;
	}
	/**
	 * Ȩ���Զ����һЩ���÷���
	 * @param maintenanceDAO
	 */
	public void setOmUtilDAO(OmUtilDAO maintenanceDAO){
		omUtilDAO = maintenanceDAO;
	}
	/**
	 * ��ɫ
	 * @param maintenanceDAO
	 */
	public void setRoleDAO(RoleDAO maintenanceDAO){
		roleDAO = maintenanceDAO;
	}
	/**
	 * ��־
	 * @param maintenanceDAO
	 */
	public void setLogDAO(LogDAO maintenanceDAO){
		logDAO = maintenanceDAO;
	}
	/**
	 * ְ��
	 * @param maintenanceDAO
	 */
	public void setDutyDAO(DutyDAO maintenanceDAO) {
		dutyDAO = maintenanceDAO;
	}
	/**
	 * ְԱ��ɫ��ϵ
	 * @param maintenanceDAO
	 */
	public void setEmployeeRoleRelationDAO(EmployeeRoleRelationDAO maintenanceDAO) {
		employeeRoleRelationDAO = maintenanceDAO;
	}
	/**
	 * Ȩ��΢��
	 * @param maintenanceDAO
	 */
	public void setPowerAdjustDAO(PowerAdjustDAO maintenanceDAO) {
		powerAdjustDAO = maintenanceDAO;
	}    
	/**
	 * ����
	 * @param maintenanceDAO
	 */
	public void setSequenceDAO(SequenceDAO maintenanceDAO){
		sequenceDAO = maintenanceDAO;
	}
    
	public void setSystemDAO(SystemDAO systemDAO)
    {
        this.systemDAO = systemDAO;
    }

    public void setMenuDAO(MenuDAO menuDAO)
    {
        this.menuDAO = menuDAO;
    }

    public void setDictionaryDAO(OMDictionaryDAO dictionaryDAO)
    {
        this.dictionaryDAO = dictionaryDAO;
    }

    public void setOrganDAO(OrganDAO organDAO)
    {
        this.organDAO = organDAO;
    }

    public void setSwitchDAO(SwitchDAO switchDAO)
    {
        this.switchDAO = switchDAO;
    }

	public void setFuncRoleDAO(FuncRoleDAO funcRoleDAO)
    {
        this.funcRoleDAO = funcRoleDAO;
    }

    /* (non-Javadoc)
	 * @see com.neusoft.om.bo.EmployeeManagementBO#getPermmitedRoleColl(java.lang.String)
	 */
	public RoleColl getPermmitedRoleColl(String employeeId) throws ServiceException {
		try {
			return roleDAO.getEmployeePermittedRoleColl(employeeId);
		} catch (DataAccessException e) {
			OMLogger.error("��ȡ����Ա���ý�ɫ��Ϣʧ�ܣ�" + e.getMessage(),e);
			throw new ServiceException(e.getMessage());
		}
	}

    /**
     * ����ְԱ��ɫ��ϵ��Ϣ
     * @param employeeId
     * @return EmployeeDutyRelationColl
     * @throws ServiceException
     */
    public int doModifyRole(EmployeeRoleRelationColl employeeRoleRelationColl, String authId) throws ServiceException{
        int code = 1; //succeed	
        int roleId = -9999;
        try{            
            for(int i = 0; i < employeeRoleRelationColl.getRowCount(); i++){
                EmployeeRoleRelationVO relationVO = employeeRoleRelationColl.getEmployeeRoleRelation(i);                
                String employeeId = relationVO.getEmployeeId();
                roleId = relationVO.getRoleId();
                //��ɾ��
                //employeeRoleRelationDAO.doDeleteEmployeeRoleRelationInfoByEmployeeId(employeeId); 
                employeeRoleRelationDAO.doDelEmpRoleRelByEmpIdAndCreater(employeeId,authId);
            }
            //���²���
            if(roleId != -9999){
            	 employeeRoleRelationDAO.doAddEmployeeRoleRelationInfo(employeeRoleRelationColl);
            }	
			
		}catch (DataAccessException e) {
            code = 0 ; //failed
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--doModifyRole-1:"+e.getMessage());
			throw new ServiceException(e);
		}
		return code;
	}

	//���Ӳ���Ա	
	public long doAddEmployeeInfo(EmployeeVO employeeVO,HashMap map) throws ServiceException {
		long code = 1;
		String employeeSequence;
		boolean ifMatchCase;
		//���Ȼ�ÿ��ز����ѵõ���½�˺��Ƿ����ִ�Сд
		try{
			ifMatchCase = omSwitchDAO.getIfMatchCase();
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--doAddEmployeeInfo-0:"+e.getMessage());
			throw new ServiceException(e);
		}
		if(!ifMatchCase){ //��������֣���Ҫ����½�˺�תΪ��д
			employeeVO.setWorkNo(employeeVO.getWorkNo().toUpperCase());
		}
		
		//����У���½�˺��Ƿ��Ѿ�����
		try{
			EmployeeVO  vo = employeeDAO.getEmployeeInfoByWorkNo(employeeVO.getWorkNo());
			if(vo != null){
				String promt = "�˺��Ѿ�����!";
				throw new ServiceException(promt);
			}
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--doAddEmployeeInfo-1:"+e.getMessage());
			throw new ServiceException(e);
		}
		
		//�õ����к���Ϊ��ǰ����Ա�ı��
		try{
			employeeSequence = sequenceDAO.getEmployeeSequenceValue();
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--doAddEmployeeInfo-2:"+e.getMessage());
			throw new ServiceException(e);
		}
		//���������
		String workPwd = PassWord.encode(employeeVO.getWorkPwd());
		employeeVO.setWorkPwd(workPwd);
		//����ְԱ(�ݲ������������ʱ���趨)
		//�������ò���ԱemployeeVO�е�employeeId
		employeeVO.setEmployeeId(employeeSequence);
		try{
			//�����Ҫͬ��,������ְԱ�ĵ�¼�ʺŲ�Ϊ��
			if(getIfSynchronize(employeeVO) 
					&& employeeVO.getWorkNo() != null 
					&& !employeeVO.getWorkNo().trim().equals("")){
				code = doSynOperate(employeeVO,1);
			}else{
				employeeDAO.doAddEmployee(employeeVO);
			}
			/*** Ϊ������Ա���������� �ṩ����������employeeId ***/
			if (code != -10) {
				code = Long.parseLong(employeeVO.getEmployeeId());
			}
			/*** Ϊ������Ա���������� �ṩ����������employeeId ***/
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--doAddEmployeeInfo-3:"+e.getMessage());
			throw new ServiceException(e);
		}catch(Exception e1){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--doAddEmployeeInfo-4:"+e1.getMessage());
			throw new ServiceException(e1);
		}
		return code;
	}
	
	public int doPowerAdjust(String employeeId,String strPowerInfo) throws  ServiceException{
		int code =1;
		//������
		String[] allPower = strPowerInfo.split(";");
		PowerAdjustColl addColl = new PowerAdjustColl();
		PowerAdjustColl reduceColl = new PowerAdjustColl();
		if(allPower.length<=0){
			throw new ServiceException("��΢����Ϣ!");
		}else{
			for(int i=0;i<allPower.length;i++){
				String[] temp = allPower[i].split("-");
				PowerAdjustVO vo = new PowerAdjustVO();
				vo.setEmployeeId(employeeId);
				vo.setMenuId(temp[0]);
				vo.setExecAdjust(Integer.parseInt(temp[1]));
				if(temp[1].intern()=="1".intern()){//����
					addColl.addPowerAdjustVO(vo);
				}else{//����
					reduceColl.addPowerAdjustVO(vo);
				}
			}
		}
		//���ӵ�
		for(int j=0;j<addColl.getRowCount();j++){
			try{
				powerAdjustDAO.doAddPowerAdjustInfo(addColl.getPowerAdjust(j));
			}catch(DataAccessException e) {
				SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--doAddPowerAdjustInfo-add:"+e.getMessage());
				throw new ServiceException(e);
			}
		}
		//���ٵ�
		for(int j=0;j<reduceColl.getRowCount();j++){
			try{
				powerAdjustDAO.doDeletePowerAdjustInfo(reduceColl.getPowerAdjust(j).getEmployeeId(),reduceColl.getPowerAdjust(j).getMenuId());
			}catch(DataAccessException e) {
				SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--doAddPowerAdjustInfo-reduce:"+e.getMessage());
				throw new ServiceException(e);
			}
		}
		return code;
	}
	
    /**
     * �õ�ĳ��֯���������еļ�ְ��Ա��������ְ��
     * @param organId
     * @return
     * @throws DataAccessException
     */
    public EmployeeColl getPartTimeEmployeeInfoByOrganId(String organId) throws ServiceException{
        EmployeeColl empColl = new EmployeeColl();
        try{
            empColl = employeeDAO.getPartTimeEmployeeInfoByOrganId(organId);
        }catch(DataAccessException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--getPartTimeEmployeeInfoByOrganId:"+e.getMessage());
            throw new ServiceException(e);
        }
        return empColl;
    }
    /**
     * �޸�ְԱ��Ϣ
     * @return
     * @throws ServiceException
     */
    public int doModifyEmployeeInfo(EmployeeVO employeeVO,boolean haveInOrgan) throws ServiceException{
        int code = 1;//succeed
        boolean ifMatchCase;
        //���Ȼ�ÿ��ز����ѵõ���½�˺��Ƿ����ִ�Сд
        try{
            ifMatchCase = omSwitchDAO.getIfMatchCase();
        }catch (DataAccessException e) {
            SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--doAddEmployeeInfo-0:"+e.getMessage());
            throw new ServiceException(e);
        }
        if(!ifMatchCase){ //��������֣���Ҫ����½�˺�תΪ��д
            employeeVO.setWorkNo(employeeVO.getWorkNo().toUpperCase());
        }
        if(haveInOrgan == false){
        	employeeVO.setDealerId("");
        }
        //����ְԱ����Ϣ
        try{
            employeeDAO.doModifyEmployeeById(employeeVO);
            code = 1;
        }catch (DataAccessException e){
            code = 0;//fail
            SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--doModifyEmployeeInfo-1:"+e.getMessage());
            throw new ServiceException(e);
        }
        return code;
    }
   /**
    * ��������ģ����ѯְԱ��Ϣ
    * @param name
    * @return
    * @throws ServiceException
    */
    public EmployeeColl getEmployeeInfoByName(String name, int cityLevel) throws ServiceException{
        EmployeeColl empColl = new EmployeeColl();
        EmployeeColl coll = new EmployeeColl();
        try{
            empColl = employeeDAO.getEmployeeInfoByName(name,cityLevel);
            for(int i = 0; i < empColl.getRowCount(); i++){
                EmployeeVO vo = empColl.getEmployee(i);
                vo.setDutyName(switchDAO.getDutyNameByDutyId(String.valueOf(vo.getDutyId())));
                vo.setOrganName(switchDAO.getOrganNameByOrganId(vo.getOrganId()));
                vo.setLevelName(switchDAO.getPersonLevelNameById(vo.getPersonLevel()));
                coll.addEmployee(vo);
            }
        }catch(DataAccessException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--getEmployeeInfoByName:"+e.getMessage());
            throw new ServiceException(e);
        }
        return coll;
    }
    /**
	 * ���ݹ��ĵõ�ְԱ��Ϣ
	 * @param workNo
	 * @return
	 * @throws ServiceException
	 */
    public EmployeeVO getEmployeeInfoByWorkNo(String workNo) throws ServiceException {
        EmployeeVO vo = new EmployeeVO();
        boolean ifMatchCase;
        //���Ȼ�ÿ��ز����ѵõ���½�˺��Ƿ����ִ�Сд
        try{
            ifMatchCase = omSwitchDAO.getIfMatchCase();
        }catch (DataAccessException e) {
            SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--getEmployeeInfoByWorkNo-0:"+e.getMessage());
            throw new ServiceException(e);
        }
        if(!ifMatchCase){ //��������֣���Ҫ����½�˺�תΪ��д
            workNo = workNo.toUpperCase();
        }
        try{
            vo= employeeDAO.getEmployeeInfoByWorkNo(workNo);
            if(vo != null){
                int dutyId = vo.getDutyId();
                String organId = vo.getOrganId();
                String organName = switchDAO.getOrganNameByOrganId(organId);
                String dutyName = switchDAO.getDutyNameByDutyId(String.valueOf(dutyId));
                vo.setLevelName(switchDAO.getPersonLevelNameById(vo.getPersonLevel()));
                vo.setOrganName(organName);
                vo.setDutyName(dutyName);               
            }

        }catch (DataAccessException e) {
            SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--getEmployeeInfoByWorkNo:"+e.getMessage());
            throw new ServiceException(e);
        }
        return vo;
    }
    
    public EmployeeVO getEmployeeByWorkNo(String workNo) throws ServiceException {
		EmployeeVO vo = null;
		boolean ifMatchCase;
		//���Ȼ�ÿ��ز����ѵõ���½�˺��Ƿ����ִ�Сд
		try{
			ifMatchCase = omSwitchDAO.getIfMatchCase();
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--doAddEmployeeInfo-0:"+e.getMessage());
			throw new ServiceException(e);
		}
		if(!ifMatchCase){ //��������֣���Ҫ����½�˺�תΪ��д
			workNo = workNo.toUpperCase();
		}
		try{
			vo= employeeDAO.getEmployeeInfoByWorkNo(workNo);
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--getEmployeeByWorkNo:"+e.getMessage());
			throw new ServiceException(e);
		}
		return vo;
	}
    /**
     * ����ְԱId�õ�ְԱ��ɫ��Ӧ�����б�
     * @param employeeId
     * @return
     * @throws ServiceException
     */
    public EmployeeRoleRelationColl getEmployeeRoleRelationInfoByEmployeeId(String employeeId) throws ServiceException{
        EmployeeRoleRelationColl empRoleColl = null;
        EmployeeRoleRelationColl coll = new EmployeeRoleRelationColl();
        try{
            empRoleColl = employeeRoleRelationDAO.getEmployeeRoleRelationInfoByEmployeeId(employeeId);
            for(int i = 0; i < empRoleColl.getRowCount(); i++){
                EmployeeRoleRelationVO vo = empRoleColl.getEmployeeRoleRelation(i);
                String roleName = switchDAO.getRoleNameByRoleId(vo.getRoleId());
                vo.setRoleName(roleName);
                coll.addEmployeeRoleRelation(vo);
            }
        }catch(DataAccessException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--getEmployeeRoleRelationInfoByEmployeeId:"+e.getMessage());
            throw new ServiceException(e);
        }
        return coll;
    }
    /**
     * ͨ��ְԱ��ŵõ��䴴���Ľ�ɫ�б�
     * @param account
     * @return
     * @throws DataAccessException
     */
    public RoleColl getCreateRoleColl(String employeeId) throws ServiceException{
        RoleColl roleColl = new RoleColl();
        try{
            roleColl = roleDAO.getCreateRoleColl(employeeId);
        }catch(DataAccessException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--getCreateRoleColl:"+e.getMessage());
            throw new ServiceException(e);
        }
        return roleColl;
    }
    
    /**
     * ͨ��employeeId�õ���ɷ���Ľ�ɫ�б�
     * @param employeeId
     * @return
     * @throws DataAccessException
     */
    public RoleColl getAssignableRoleColl(String employeeId) throws ServiceException{
        RoleColl roleColl = new RoleColl();
        try{
            roleColl = roleDAO.getAssignableRoleColl(employeeId);
        }catch(DataAccessException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--getAssignableRoleColl:"+e.getMessage());
            throw new ServiceException(e);
        }
        return roleColl;
    }

	//���Է���
	public static void main(String args[]) {
		EmployeeManagementBO bo = (EmployeeManagementBO)OMAppContext.getBean(EmployeeManagementBO.BEAN);
	    
		try {
			bo.doPowerAdjust("00001","180A-2;180AA-2;180-2");
		} catch (ServiceException e) {
			e.printStackTrace();
		}

	} 

    public OrganEmployeeDisplayColl getAllOrganEmployeeInfo(String organId) throws ServiceException
    {
        EmployeeColl empColl = new EmployeeColl();
        EmployeeDutyRelationColl empDutyColl = new EmployeeDutyRelationColl();
        OrganEmployeeDisplayColl organEmpDisColl = new OrganEmployeeDisplayColl();
        ParamObjectCollection dutyColl = dictionaryDAO.getDutyColl(organId);
        try{
            empColl = employeeDAO.getEmployeeInfoByOrganId(organId);
            for(int i = 0; i < empColl.getRowCount(); i++){
                String orgId = empColl.getEmployee(i).getOrganId(); 
                String employeeId = empColl.getEmployee(i).getEmployeeId();
                String name = empColl.getEmployee(i).getEmployeeName();
                String workNo = empColl.getEmployee(i).getWorkNo();
                int dutyId = empColl.getEmployee(i).getDutyId();  
                String dutyName = dutyColl.getParamNameById(String.valueOf(dutyId));
                String areaId = empColl.getEmployee(i).getAreaId();
                String owner = empColl.getEmployee(i).getOwner();
                OrganEmployeeDisplayVO organEmpDisVO = new OrganEmployeeDisplayVO();
                organEmpDisVO.setOrganId(orgId);
                organEmpDisVO.setDutyId(dutyId);
                organEmpDisVO.setDutyName(dutyName);
                organEmpDisVO.setEmployeeId(employeeId);
                organEmpDisVO.setEmployeeName(name);
                organEmpDisVO.setWorkNo(workNo);
                organEmpDisVO.setKind(0); //��Ҫְ��    
                organEmpDisVO.setKindName("��Ҫְ��");
                organEmpDisVO.setAreaId(areaId);
                organEmpDisVO.setOwner(owner);
                organEmpDisColl.addOrganEmployeeDisplay(organEmpDisVO);
            }
            
            empDutyColl = employeeDutyRelationDAO.getEmployeeDutyRelationByOrganId(organId);
            
            for(int i = 0 ; i < empDutyColl.getRowCount(); i++){
                EmployeeDutyRelationVO empDutyVO = new  EmployeeDutyRelationVO();
                empDutyVO = empDutyColl.getEmployeeDutyRelation(i);
                String empId = empDutyVO.getEmployeeId();
                String workNo = empDutyVO.getWorkNo();
                EmployeeVO emp = employeeDAO.getEmployeeInfoById(empId);
                int dutyId = empDutyVO.getDutyId();
                String orgId = empDutyVO.getOrganId();
                String areaId = empDutyVO.getAreaId();
                String owner = empDutyVO.getOwner();
                OrganEmployeeDisplayVO organEmpDisVO = new OrganEmployeeDisplayVO();
                organEmpDisVO.setOrganId(orgId);
                organEmpDisVO.setDutyId(dutyId);
                String dutyName = dutyColl.getParamNameById(String.valueOf(dutyId));
                organEmpDisVO.setDutyName(dutyName);
                organEmpDisVO.setEmployeeId(empId);
                organEmpDisVO.setEmployeeName(emp.getEmployeeName());
                organEmpDisVO.setWorkNo(workNo);
                organEmpDisVO.setKind(1); //��ְ  
                organEmpDisVO.setKindName("��ְ");
                organEmpDisVO.setAreaId(areaId);
                organEmpDisVO.setOwner(owner);
                organEmpDisColl.addOrganEmployeeDisplay(organEmpDisVO);
            }
        }catch(DataAccessException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--getAllEmployeeInfoByOrganId:"+e.getMessage());
            throw new ServiceException(e);
        }        
        return organEmpDisColl;
    }
        
    
    
    /**
     * �õ�ְԱ��Ȩʱ��չʾ��Ϣ�б����а�����ǰְԱ�ɷ���Ľ�ɫ�б����Щ��ɫ�е�Ȩ��ά��ְԱ�Ѿ����еĽ�ɫȨ�����ͣ�ʹ��Ȩ������Ȩ��
     * @param currentEmpId ��ǰ����Ա��employeeId
     * @param assignedEmpId ������ְԱ��employeeId
     * @return
     * @throws ServiceException
     */
    public EmployeeRoleDisplayColl getAssignDisplayColl(String currentEmpId, String assignedEmpId) throws ServiceException{
        EmployeeRoleDisplayColl empRoleDisColl = new EmployeeRoleDisplayColl();
        RoleColl roleColl = new RoleColl();
        RoleColl assignableRoleColl = null;
        try{
            //�õ���ǰְԱ�����Ľ�ɫ��Ϣ�б�
            roleColl = roleDAO.getCreateRoleColl(currentEmpId);
            for(int i = 0; i < roleColl.getRowCount(); i++){
                RoleVO vo = roleColl.getRole(i);
                EmployeeRoleDisplayVO displayVO = new EmployeeRoleDisplayVO();
                int roleId = vo.getRoleId();
                String roleName = vo.getRoleName();
                displayVO.setRoleId(roleId);
                displayVO.setRoleName(roleName);
                empRoleDisColl.addEmployeeRoleDisplay(displayVO);
            }
            //�õ���ǰְԱ���Է���Ľ�ɫ��Ϣ�б�
            assignableRoleColl = roleDAO.getAssignableRoleColl(currentEmpId);
            for(int i = 0; i < assignableRoleColl.getRowCount(); i++){
                RoleVO vo = assignableRoleColl.getRole(i);
                EmployeeRoleDisplayVO displayVO = new EmployeeRoleDisplayVO();
                int roleId = vo.getRoleId();
                String roleName = vo.getRoleName();
                displayVO.setRoleId(roleId);
                displayVO.setRoleName(roleName);
                int flag = 0; 
                for(int j = 0; j<empRoleDisColl.getRowCount(); j++){
                    EmployeeRoleDisplayVO erdvo = empRoleDisColl.getEmployeeRoleDisplay(j);
                    if(erdvo.getRoleId() == roleId){
                        flag = 1;
                    }
                }
                if(flag == 0 ){
                    empRoleDisColl.addEmployeeRoleDisplay(displayVO);
                }
            }
            
            //�õ���ǰ��ά��ְԱ�Ѿ�ӵ�еĽ�ɫ
            EmployeeRoleRelationColl empRoleRelColl = new EmployeeRoleRelationColl();
            empRoleRelColl = employeeRoleRelationDAO.getEmployeeRoleRelationInfoByEmployeeId(assignedEmpId);
            for(int i = 0 ; i < empRoleRelColl.getRowCount(); i++){
                EmployeeRoleRelationVO empRoleRelVo = empRoleRelColl.getEmployeeRoleRelation(i);
                EmployeeRoleDisplayVO displayVO = new EmployeeRoleDisplayVO();
                int roleId = empRoleRelVo.getRoleId();
                String roleName = switchDAO.getRoleNameByRoleId(roleId);
                int usableFlag = empRoleRelVo.getUsableFlag();
                int adminFlag = empRoleRelVo.getAdminFlag();
                displayVO.setRoleId(roleId);
                displayVO.setRoleName(roleName);
                displayVO.setUsableFlag(usableFlag);
                displayVO.setAdminFlag(adminFlag);
                
                for(int j = 0; j < empRoleDisColl.getRowCount(); j++){
                    EmployeeRoleDisplayVO vo = empRoleDisColl.getEmployeeRoleDisplay(j);
                    if(vo.getRoleId() == roleId){
                        empRoleDisColl.removeEmployeeRoleDisplay(j); 
                        empRoleDisColl.addEmployeeRoleDisplay(displayVO);
                    }                    
                }   
            }   
        }catch(DataAccessException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--getAssignDisplayColl:"+e.getMessage());
            throw new ServiceException(e);
        }
        return empRoleDisColl;
    }

    /**
     * �õ�ְԱ�����ĺͱ�����Ľ�ɫ��Ϣ���ϣ�ר����ְԱ��ϸ��Ϣ�Ľ�ɫ����չʾ
     * @param employeeId
     * @return
     * @throws ServiceException
     */
    public OwnAndAssignedRoleDispColl getEmpOwnerAndAssingedRoleColl(String employeeId) throws ServiceException{
        OwnAndAssignedRoleDispColl disColl = new OwnAndAssignedRoleDispColl();
        //�õ�ְԱ�����Ľ�ɫ��Ϣ����
        try{
            RoleColl roleColl = roleDAO.getCreateRoleColl(employeeId);
            EmployeeRoleRelationColl empRoleColl = employeeRoleRelationDAO.getEmployeeRoleRelationInfoByEmployeeId(employeeId);
            for(int i = 0; i < roleColl.getRowCount(); i++){
                RoleVO roleVO = roleColl.getRole(i);
                OwnAndAssignedRoleDispVO vo = new OwnAndAssignedRoleDispVO();
                vo.setAdminFlag(1);
                vo.setOwner(1);
                vo.setRoleId(roleVO.getRoleId());
                vo.setRoleName(switchDAO.getRoleNameByRoleId(roleVO.getRoleId()));
                vo.setUsableFlag(0);
                disColl.AddOwnAndAssignedRoleDisp(vo);   
            }
            for(int j = 0; j<empRoleColl.getRowCount(); j++){
                EmployeeRoleRelationVO empRoleRelVo = empRoleColl.getEmployeeRoleRelation(j);
                int rRoleId = empRoleRelVo.getRoleId();
                int rUsable = empRoleRelVo.getUsableFlag();
                int rAdminFlag = empRoleRelVo.getAdminFlag();                
                int flag = 0;
                for(int i =0; i < disColl.getRowCount(); i++){
                    OwnAndAssignedRoleDispVO displayVO = disColl.getOwnAndAssignedRoleDisp(i);
                    if(rRoleId == displayVO.getRoleId()){
                        flag = 1;
                        displayVO.setAdminFlag(rAdminFlag);
                        displayVO.setUsableFlag(rUsable);
                        disColl.removeOwnAndAssignedRoleDisp(i);
                        disColl.AddOwnAndAssignedRoleDisp(displayVO);
                        break;
                    }
                }
                if(flag == 0){
                    OwnAndAssignedRoleDispVO vo = new OwnAndAssignedRoleDispVO();
                    vo.setAdminFlag(rAdminFlag);
                    vo.setOwner(0);
                    vo.setRoleId(rRoleId);
                    vo.setRoleName(switchDAO.getRoleNameByRoleId(rRoleId));
                    vo.setUsableFlag(rUsable);
                    disColl.AddOwnAndAssignedRoleDisp(vo);
                }
            }

        }catch(DataAccessException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--getEmpOwnerAndAssingedRoleColl:"+e.getMessage());
            throw new ServiceException(e);
        }

        return disColl;
    }
    
    public FuncRoleColl getFunRoleCollByEmployeeId(String employeeId) throws ServiceException{
        FuncRoleColl funcRoleColl = new FuncRoleColl();
        try{
            MenuColl menuColl = menuDAO.getAssignableMenuCollByEmpId(employeeId);
            for(int i =0 ; i < menuColl.getRowCount() ; i++){
                MenuVO menuVO = menuColl.getMenu(i);
                FuncRoleVO funcRoleVO = new FuncRoleVO();
                funcRoleVO.setMenuId(menuVO.getMenuId());
                funcRoleColl.addFuncRole(funcRoleVO);                
            }
        }catch(DataAccessException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--getEmpOwnerAndAssingedRoleColl:"+e.getMessage());
            throw new ServiceException(e);
        }
        return funcRoleColl;
    }

    /**
     * �õ�ְԱ��Ȩ������ɫʱ��չʾ��Ϣ�б����а�����ǰְԱ�ɷ���Ľ�ɫ�б����Щ��ɫ�е�Ȩ��ά��ְԱ�Ѿ����еĲ�����ɫȨ�����ͣ�ʹ��Ȩ������Ȩ��
     * @param currentEmpId ��ǰ����Ա��employeeId
     * @param assignedEmpId ������ְԱ��employeeId
     * @return
     * @throws ServiceException
     */
    public ParamRoleColl getParamRoleAssignDisplayColl(String currentEmpId, String assignedEmpId) throws ServiceException {
        ParamRoleColl empRoleDisColl = new  ParamRoleColl();
       
        ParamRoleColl assignableParamRoleColl = null;
        try{
           
            //�õ���ǰְԱ���Է���Ľ�ɫ��Ϣ�б�
            assignableParamRoleColl = paramRoleDAO.getAssignableParamRoleColl(currentEmpId);
            //�õ���ǰְԱ���������ݽ�ɫ
            ParamRoleColl createRoleColl = paramRoleDAO.getCreateParamRoleColl(currentEmpId);
            for(int i = 0; i < assignableParamRoleColl.getRowCount(); i++){
                ParamRoleVO vo = assignableParamRoleColl.getParamRole(i);
                vo.setAdminFlag(0);
                vo.setUsableFlag(0);
                empRoleDisColl.addParamRole(vo);
              }
            for(int i = 0; i < createRoleColl.getRowCount(); i++){
                ParamRoleVO vo = createRoleColl.getParamRole(i);
                if(!empRoleDisColl.isExists(vo.getRoleId())){
                    vo.setAdminFlag(0);
                    vo.setUsableFlag(0);
                    empRoleDisColl.addParamRole(vo);
                }
              }
            //�õ���ǰ��ά��ְԱ�Ѿ�ӵ�еĽ�ɫ
            ParamRoleColl empParamRoleRelColl = new ParamRoleColl();
            empParamRoleRelColl = employeeParamRoleRelationDAO.getEmployeeParamRoleRelationInfoByEmployeeId(assignedEmpId);
            for(int i = 0 ; i < empParamRoleRelColl.getRowCount(); i++){
                ParamRoleVO vo = empParamRoleRelColl.getParamRole(i);
                int roleId=vo.getRoleId();
                for(int j = 0; j < empRoleDisColl.getRowCount(); j++){
                    ParamRoleVO pvo = empRoleDisColl.getParamRole(j);
                    if(pvo.getRoleId() == roleId){
                        empRoleDisColl.removeElement(j) ;
                        empRoleDisColl.addParamRole(vo);
                    }                    
                }   
            }   
        }catch(DataAccessException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--getParamRoleAssignDisplayColl:"+e.getMessage());
            throw new ServiceException(e);
        }
        return empRoleDisColl;
    }

    /**
     * �޸�ְԱ�������ɫ��ϵ
     * @param employeeParamRoleRelationColl
     * @return int
     * @throws ServiceException
     */
    public int doModifyEmployeeParamRoleRelation(EmployeeParamRoleRelationColl employeeParamRoleRelationColl, String authId) throws ServiceException {
        int code = 1; //succeed	
        int paramRoleId = -9999;
        try{            
            for(int i = 0; i < employeeParamRoleRelationColl.getRowCount(); i++){
                EmployeeParamRoleRelationVO relationVO = employeeParamRoleRelationColl.getEmployeeParamRoleRelation(i);                
                String employeeId = relationVO.getEmployeeId();
                paramRoleId = relationVO.getParamRoleId();
                //��ɾ��
                employeeParamRoleRelationDAO.doDeleteEmployeeParamRoleRelationInfoByEmployeeId(employeeId, authId);
            }
            //���²���
            if(paramRoleId != -9999){
            	employeeParamRoleRelationDAO.doAddEmployeeParamRoleRelationInfo(employeeParamRoleRelationColl);
            }	
			
		}catch (DataAccessException e) {
            code = 0 ; //failed
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--doModifyEmployeeParamRoleRelation-1:"+e.getMessage());
			throw new ServiceException(e);
		}
		return code;
    }

    
    /**
     * ��������ģ����ѯְԱ��Ϣ
     * @param name
     * @return
     * @throws ServiceException
     */
     public EmployeeColl getEmployeeInfoByNameFilter(String name, String employeeId,int areaLevel,int adminType) throws ServiceException{
         EmployeeColl empColl = new EmployeeColl();
         EmployeeColl coll = new EmployeeColl();
         try{
             empColl = employeeDAO.getEmployeeInfoByNameFilter(name,employeeId,areaLevel,adminType);
             for(int i = 0; i < empColl.getRowCount(); i++){
                 EmployeeVO vo = empColl.getEmployee(i);
                 vo.setDutyName(switchDAO.getDutyNameByDutyId(String.valueOf(vo.getDutyId())));
                 vo.setOrganName(switchDAO.getOrganNameByOrganId(vo.getOrganId()));
                 vo.setLevelName(switchDAO.getPersonLevelNameById(vo.getPersonLevel()));
                 vo.setAdminTypeName(getAdminTypeName(vo.getAdminType()));
                 String dealerId = vo.getDealerId();
                 if(dealerId != null && !dealerId.equals("")){
                	 com.neusoft.crm.channel.outInterface.om.data.DealerVO channelVO = omQueryDAOInterface.doGetDealerByDealer(dealerId);
                     vo.setDealerName(channelVO.getDealer_name());
                 }                 
                 coll.addEmployee(vo);
             }
         }catch(DataAccessException e){
             SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--getEmployeeInfoByNameFilter:"+e.getMessage());
             throw new ServiceException(e);
         }
         return coll;
     }
     /**
 	 * ���ݹ��ĵõ�ְԱ��Ϣ
 	 * @param workNo
 	 * @return
 	 * @throws ServiceException
 	 */
     public EmployeeVO getEmployeeInfoByWorkNoFilter(String workNo,String employeeId,int areaLevel,int adminType) throws ServiceException {
         EmployeeVO vo = new EmployeeVO();
         boolean ifMatchCase;
         //���Ȼ�ÿ��ز����ѵõ���½�˺��Ƿ����ִ�Сд
         try{
             ifMatchCase = omSwitchDAO.getIfMatchCase();
         }catch (DataAccessException e) {
             SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--getEmployeeInfoByWorkNoFilter-0:"+e.getMessage());
             throw new ServiceException(e);
         }
         if(!ifMatchCase){ //��������֣���Ҫ����½�˺�תΪ��д
             workNo = workNo.toUpperCase();
         }
         try{
             vo= employeeDAO.getEmployeeInfoByWorkNoFilter(workNo,employeeId,areaLevel,adminType);
             if(vo != null){
                 int dutyId = vo.getDutyId();
                 String organId = vo.getOrganId();
                 String organName = switchDAO.getOrganNameByOrganId(organId);
                 String dutyName = switchDAO.getDutyNameByDutyId(String.valueOf(dutyId));
                 vo.setLevelName(switchDAO.getPersonLevelNameById(vo.getPersonLevel()));
                 vo.setAdminTypeName(getAdminTypeName(vo.getAdminType()));
                 String dealerId = vo.getDealerId();
                 com.neusoft.crm.channel.outInterface.om.data.DealerVO channelVO = omQueryDAOInterface.doGetDealerByDealer(dealerId);
                 vo.setDealerName(channelVO.getDealer_name());
                 vo.setOrganName(organName);
                 vo.setDutyName(dutyName);               
             }

         }catch (DataAccessException e) {
             SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--getEmployeeInfoByWorkNo:"+e.getMessage());
             throw new ServiceException(e);
         }
         return vo;
     }
    /**
     * @param paramRoleDAO Ҫ���õ� paramRoleDAO��
     */
    public void setParamRoleDAO(ParamRoleDAO paramRoleDAO) {
        this.paramRoleDAO = paramRoleDAO;
    }

    /**
     * �õ���֯����ְԱ�б�
     * @param  EmployeeColl
     * @return
     * @throws ServiceException
     */
    //NEW:��ȡְԱ��Ϣ������
    public int getEmployeeRowCount(String areaId, String organId, String employeeId, 
    		int areaLevel, int adminType) throws ServiceException {
        int allRows = 0;
		try{
			allRows= employeeDAO.getEmployeeRowCount(areaId,organId,employeeId,areaLevel,adminType);
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--getEmployeeRowCount:"+e.getMessage());
			throw new ServiceException(e);
		}        
		return allRows;
    }
    //NEW�����ݿ��ҳ��ʽ��ȡְԱ��Ϣ
    public EmployeeColl getEmployeeInfoFilter(String areaId, String organId, 
    		String employeeId, int areaLevel, int adminType,
    			int startRow,int endRow) throws ServiceException {
    	EmployeeColl coll = new EmployeeColl();
		try{
			coll= employeeDAO.getEmployeeInfoFilter(areaId,organId,employeeId,areaLevel,adminType,startRow,endRow);
			List  adjustList = employeeDAO.getPowerAdjustEmpColl();
			for(int j=0 ; j < coll.getRowCount(); j++){
				EmployeeVO vo = coll.getEmployee(j);
				if(vo != null){
					if(vo.getEmployeeId() != null && adjustList.contains((vo.getEmployeeId()))){
						vo.setAdjustPower(1);//��΢������ְԱ
						vo.setAdjusetPowerDesc("��");
					}else{
						vo.setAdjustPower(0);//��΢������ְԱ	
						vo.setAdjusetPowerDesc("��");
					}
					// ���ýӿ�ȡ������������Ϣ
					if (vo.getDealerId() != null && vo.getDealerId() != "") {
						com.neusoft.crm.channel.outInterface.om.data.DealerVO channelVO = omQueryDAOInterface.doGetDealerByDealer(vo.getDealerId());
						String dealerName = channelVO.getDealer_name();
						vo.setDealerName(dealerName);
					} else {
						vo.setDealerName("");
					}
				}
			}
			
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--getEmployeeInfo:"+e.getMessage());
			throw new ServiceException(e);
		}        
		return coll;
    }
    
    public EmployeeColl getEmployeeInfoFilter(String areaId, String organId, 
    		String employeeId, int areaLevel, int adminType) 
    			throws ServiceException {
        EmployeeColl coll = new EmployeeColl();
		try{
			coll= employeeDAO.getEmployeeInfoFilter(areaId,organId,employeeId,areaLevel,adminType);
			List  adjustList = employeeDAO.getPowerAdjustEmpColl();
			for(int j=0 ; j < coll.getRowCount(); j++){
				EmployeeVO vo = coll.getEmployee(j);
				if(vo != null){
					if(vo.getEmployeeId() != null && adjustList.contains((vo.getEmployeeId()))){
						vo.setAdjustPower(1);//��΢������ְԱ
						vo.setAdjusetPowerDesc("��");
					}else{
						vo.setAdjustPower(0);//��΢������ְԱ	
						vo.setAdjusetPowerDesc("��");
					}
					// ���ýӿ�ȡ������������Ϣ
					if (vo.getDealerId() != null && vo.getDealerId() != "") {
						com.neusoft.crm.channel.outInterface.om.data.DealerVO channelVO = omQueryDAOInterface.doGetDealerByDealer(vo.getDealerId());
						String dealerName = channelVO.getDealer_name();
						vo.setDealerName(dealerName);
					} else {
						vo.setDealerName("");
					}
				}
			}
			
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--getEmployeeInfo:"+e.getMessage());
			throw new ServiceException(e);
		}        
		return coll;
    }
    
    public EmployeeColl getEmployeeInfoFilter(Map filterInfo) throws ServiceException{
    	EmployeeColl coll = new EmployeeColl();
		try{
			coll= employeeDAO.getEmployeeInfoFilter(filterInfo);
			List  adjustList = employeeDAO.getPowerAdjustEmpColl();
			for(int j=0 ; j < coll.getRowCount(); j++){
				EmployeeVO vo = coll.getEmployee(j);
				if(vo != null){
					if(vo.getEmployeeId() != null && adjustList.contains((vo.getEmployeeId()))){
						vo.setAdjustPower(1);//��΢������ְԱ
						vo.setAdjusetPowerDesc("��");
					}else{
						vo.setAdjustPower(0);//��΢������ְԱ	
						vo.setAdjusetPowerDesc("��");
					}
					// ���ýӿ�ȡ������������Ϣ
					if (vo.getDealerId() != null && vo.getDealerId() != "") {
						com.neusoft.crm.channel.outInterface.om.data.DealerVO channelVO = omQueryDAOInterface.doGetDealerByDealer(vo.getDealerId());
						String dealerName = channelVO.getDealer_name();
						vo.setDealerName(dealerName);
					} else {
						vo.setDealerName("");
					}
				}
			}
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--getEmployeeInfo:"+e.getMessage());
			throw new ServiceException(e);
		}        
		return coll;
    }
    
    public int getEmployeeInfoRowCountFilter(Map filterInfo) throws ServiceException{
    	int totalRow = 0;
		try{
			totalRow= employeeDAO.getEmployeeInfoRowCountFilter(filterInfo);
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--getEmployeeInfoRowCountFilter:"+e.getMessage());
			throw new ServiceException(e);
		}        
		return totalRow;
    }
    
    public EmployeeColl getEmployeeInfoFilter(Map filterInfo, int beginRow, int endRow) throws ServiceException{
    	EmployeeColl coll = new EmployeeColl();
		try{
			coll= employeeDAO.getEmployeeInfoFilter(filterInfo, beginRow, endRow);

			List  adjustList = employeeDAO.getPowerAdjustEmpColl();
			for(int j=0 ; j < coll.getRowCount(); j++){
				EmployeeVO vo = coll.getEmployee(j);
				if(vo != null){
					if(vo.getEmployeeId() != null && adjustList.contains((vo.getEmployeeId()))){
						vo.setAdjustPower(1);//��΢������ְԱ
						vo.setAdjusetPowerDesc("��");
					}else{
						vo.setAdjustPower(0);//��΢������ְԱ	
						vo.setAdjusetPowerDesc("��");
					}
					// ���ýӿ�ȡ������������Ϣ
					if (vo.getDealerId() != null && vo.getDealerId() != "") {
						com.neusoft.crm.channel.outInterface.om.data.DealerVO channelVO = omQueryDAOInterface.doGetDealerByDealer(vo.getDealerId());
						String dealerName = channelVO.getDealer_name();
						vo.setDealerName(dealerName);
					} else {
						vo.setDealerName("");
					}
				}
			}
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--getEmployeeInfo:"+e.getMessage());
			throw new ServiceException(e);
		}        
		return coll;
    }
    /**
     * �õ�������Ա��Ϣ����
     * @param dealerId
     * @param areaLevel
     * @param adminType
     * @param employeeId
     * @return
     */
    public EmployeeColl getDealerEmployee(String dealerId,int areaLevel,int adminType,String employeeId) throws ServiceException{
        EmployeeColl coll = new EmployeeColl();
        EmployeeColl empColl = new EmployeeColl();
		try{
			coll= employeeDAO.getDealerEmployee( dealerId, areaLevel, adminType, employeeId);
            for(int i = 0; i < coll.getRowCount(); i++){
                EmployeeVO vo = coll.getEmployee(i);
                String dutyName = switchDAO.getDutyNameByDutyId(String.valueOf(vo.getDutyId()));
                String organName = switchDAO.getOrganNameByOrganId(vo.getOrganId());
                String levelName = switchDAO.getPersonLevelNameById(vo.getPersonLevel());
                vo.setDutyName(dutyName);
                vo.setOrganName(organName);
                vo.setLevelName(levelName);
                if (vo != null) {
    				// ���ýӿ�ȡ������������Ϣ
    				if (vo.getDealerId() != null && vo.getDealerId() != "") {
    					com.neusoft.crm.channel.outInterface.om.data.DealerVO channelVO = omQueryDAOInterface.doGetDealerByDealer(vo.getDealerId());
    					String dealerName = channelVO.getDealer_name();
    					vo.setDealerName(dealerName);
    				} else {
    					vo.setDealerName("");
    				}
                }
                empColl.addEmployee(vo);
            }
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--getEmployeeInfo:"+e.getMessage());
			throw new ServiceException(e);
		}        
		return empColl;
    }
    
    
    

    /**
     * �õ�������Ա��Ϣ����
     * @param dealerId
     * @param areaLevel
     * @param adminType
     * @param employeeId
     * @return
     */
    public EmployeeColl getDealerEmployee(String dealerId,int areaLevel,int adminType,String employeeId, int beginRow, int endRow) throws ServiceException{
        EmployeeColl coll = new EmployeeColl();
        EmployeeColl empColl = new EmployeeColl();
		try{
			coll= employeeDAO.getDealerEmployee( dealerId, areaLevel, adminType, employeeId, beginRow, endRow);
            for(int i = 0; i < coll.getRowCount(); i++){
                EmployeeVO vo = coll.getEmployee(i);
                String dutyName = switchDAO.getDutyNameByDutyId(String.valueOf(vo.getDutyId()));
                String organName = switchDAO.getOrganNameByOrganId(vo.getOrganId());
                String levelName = switchDAO.getPersonLevelNameById(vo.getPersonLevel());
                vo.setDutyName(dutyName);
                vo.setOrganName(organName);
                vo.setLevelName(levelName);
				// ���ýӿ�ȡ������������Ϣ
                if (vo != null) {
    				if (vo.getDealerId() != null && vo.getDealerId() != "") {
    					com.neusoft.crm.channel.outInterface.om.data.DealerVO channelVO = omQueryDAOInterface.doGetDealerByDealer(vo.getDealerId());
    					String dealerName = channelVO.getDealer_name();
    					vo.setDealerName(dealerName);
    				} else {
    					vo.setDealerName("");
    				}                	
                }
                empColl.addEmployee(vo);
            }
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--getEmployeeInfo:"+e.getMessage());
			throw new ServiceException(e);
		}        
		return empColl;
    }
    
    
    public int getDealerEmployeeRowCount(String dealerId, int areaLevel, int adminType, String employeeId) throws ServiceException {
    	int rowcount = 0;
    	try {
			rowcount = employeeDAO.getDealerEmployeeRowCount(dealerId, areaLevel, adminType, employeeId);
		} catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--getDealerEmployeeRowCount:"+e.getMessage());
			throw new ServiceException(e);
		}
    	return rowcount;
    }
    
    /**
 	 * ���ݹ��ŵõ�����ְԱ��Ϣ
 	 * @param workNo
 	 * @return
 	 * @throws ServiceException
 	 */
     public EmployeeVO getDealerEmpByWorkNo(String workNo,String employeeId,int areaLevel,int adminType) throws ServiceException {
         EmployeeVO vo = new EmployeeVO();
         boolean ifMatchCase;
         //���Ȼ�ÿ��ز����ѵõ���½�˺��Ƿ����ִ�Сд
         try{
             ifMatchCase = omSwitchDAO.getIfMatchCase();
         }catch (DataAccessException e) {
             SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--getDealerEmpByWorkNo-0:"+e.getMessage());
             throw new ServiceException(e);
         }
         if(!ifMatchCase){ //��������֣���Ҫ����½�˺�תΪ��д
             workNo = workNo.toUpperCase();
         }
         try{
             vo= employeeDAO.getDealerEmpByWorkNo(workNo,employeeId,areaLevel,adminType);
             if(vo != null){
                 int dutyId = vo.getDutyId();
                 String organId = vo.getOrganId();
                 String organName = switchDAO.getOrganNameByOrganId(organId);
                 String dutyName = switchDAO.getDutyNameByDutyId(String.valueOf(dutyId));
                 vo.setLevelName(switchDAO.getPersonLevelNameById(vo.getPersonLevel()));
                 vo.setOrganName(organName);
                 vo.setDutyName(dutyName);               
             }

         }catch (DataAccessException e) {
             SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--getEmployeeInfoByWorkNo:"+e.getMessage());
             throw new ServiceException(e);
         }
         return vo;
     }
     /**
      * ��������ģ����ѯ����ְԱ��Ϣ
      * @param name
      * @return
      * @throws ServiceException
      */
      public EmployeeColl getDealerEmpByName(String name, String employeeId,int areaLevel,int adminType) throws ServiceException{
          EmployeeColl empColl = new EmployeeColl();
          EmployeeColl coll = new EmployeeColl();
          try{
              empColl = employeeDAO.getDealerEmpByName(name,employeeId,areaLevel,adminType);
              for(int i = 0; i < empColl.getRowCount(); i++){
                  EmployeeVO vo = empColl.getEmployee(i);
                  vo.setDutyName(switchDAO.getDutyNameByDutyId(String.valueOf(vo.getDutyId())));
                  vo.setOrganName(switchDAO.getOrganNameByOrganId(vo.getOrganId()));
                  vo.setLevelName(switchDAO.getPersonLevelNameById(vo.getPersonLevel()));
                  coll.addEmployee(vo);
              }
          }catch(DataAccessException e){
              SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--getDealerEmpByName:"+e.getMessage());
              throw new ServiceException(e);
          }
          return coll;
      }
      /**
   	 * ���ݹ��ŵõ�ְԱ��Ϣ--����ר��
   	 * @param workNo
   	 * @return
   	 * @throws ServiceException
   	 */
   	 public EmployeeVO getEmployeeInfoByWorkNoFilterForChnl(String workNo,String employeeId,int areaLevel,int adminType) throws ServiceException{
         EmployeeVO vo = new EmployeeVO();
         boolean ifMatchCase;
         //���Ȼ�ÿ��ز����ѵõ���½�˺��Ƿ����ִ�Сд
         try{
             ifMatchCase = omSwitchDAO.getIfMatchCase();
         }catch (DataAccessException e) {
             SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--getEmployeeInfoByWorkNoFilter-0:"+e.getMessage());
             throw new ServiceException(e);
         }
         if(!ifMatchCase){ //��������֣���Ҫ����½�˺�תΪ��д
             workNo = workNo.toUpperCase();
         }
         try{
             vo= employeeDAO.getEmployeeInfoByWorkNoFilterForChnl(workNo,employeeId,areaLevel,adminType);
             if(vo != null){
                 int dutyId = vo.getDutyId();
                 String organId = vo.getOrganId();
                 String organName = switchDAO.getOrganNameByOrganId(organId);
                 String dutyName = switchDAO.getDutyNameByDutyId(String.valueOf(dutyId));
                 vo.setLevelName(switchDAO.getPersonLevelNameById(vo.getPersonLevel()));
                 vo.setOrganName(organName);
                 vo.setDutyName(dutyName);               
             }

         }catch (DataAccessException e) {
             SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--getEmployeeInfoByWorkNo:"+e.getMessage());
             throw new ServiceException(e);
         }
         return vo;
   	 }
   	 /*
     * ��������ģ����ѯְԱ��Ϣ--����ר��
     * @param name
     * @return
     * @throws ServiceException
     */
     public EmployeeColl getEmployeeInfoByNameFilterForChnl(String name,String employeeId,int areaLevel,int adminType) throws ServiceException{
         EmployeeColl empColl = new EmployeeColl();
         EmployeeColl coll = new EmployeeColl();
         try{
             empColl = employeeDAO.getEmployeeInfoByNameFilterForChnl(name,employeeId,areaLevel,adminType);
             for(int i = 0; i < empColl.getRowCount(); i++){
                 EmployeeVO vo = empColl.getEmployee(i);
                 vo.setDutyName(switchDAO.getDutyNameByDutyId(String.valueOf(vo.getDutyId())));
                 vo.setOrganName(switchDAO.getOrganNameByOrganId(vo.getOrganId()));
                 vo.setLevelName(switchDAO.getPersonLevelNameById(vo.getPersonLevel()));
                 vo.setAdminTypeName(getAdminTypeName(vo.getAdminType()));
                 String dealerId = vo.getDealerId();
                 com.neusoft.crm.channel.outInterface.om.data.DealerVO channelVO = omQueryDAOInterface.doGetDealerByDealer(dealerId);
                 vo.setDealerName(channelVO.getDealer_name());
                 coll.addEmployee(vo);
             }
         }catch(DataAccessException e){
             SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--getEmployeeInfoByNameFilter:"+e.getMessage());
             throw new ServiceException(e);
         }
         return coll;
     }
     private String getAdminTypeName(int adminType){
    	 if(adminType == 0){
    		 return "��ͨ����Ա";
    	 }else if(adminType == 1){
    		 return "��Ȩ����Ա";
    	 }else if(adminType == 2){
    		 return "��ͨ����Ա";
    	 }else{
    		 return "";
    	 }
     }
     
     private IntEmployeeVO getIntEmployeeVO( EmployeeVO vo, int operType){
    	 IntEmployeeVO intVO = new IntEmployeeVO();
    	 intVO.setWorkNo(vo.getWorkNo());
    	 intVO.setEmployeeName(vo.getEmployeeName());
    	 intVO.setWorkPwd(vo.getWorkPwd());
    	 intVO.setOperType(operType);//
    	 return intVO;
     }
    
     private boolean getIfSynchronize(EmployeeVO vo ){
    	 String organId = vo.getOrganId();
    	 if(organId != null && !organId.trim().equals("") && organId.trim().equals("10101")){ //�����ʡ�ݿͷ�������
    		 if(omSwitchDAO.getIfSynchronize()){//���������Ҫͬ������
    			 return true;
    		}
    	 }
    	 return false;
     }
     
     private int doSynOperate(EmployeeVO vo, int operType)throws ServiceException{
    	 int code = 0;//�����ɹ���
    	//����һ��ͬ��VO
		IntEmployeeVO intVO = new IntEmployeeVO();
		intVO = getIntEmployeeVO(vo,1);
		//�����ݲ����м��
		intEmployeeDAO.doInsertSynInfo(intVO,operType);
		try{
			int sleep = 1;
			while(sleep == 1){
				Thread.sleep(2000);//�ȴ�2����
				int intCode = intEmployeeDAO.getResult(intVO);//��ѯ���ݴ�������
				if(intCode==2){//�ɹ�
					sleep = 0;
					if(operType == 1){//����
						code = employeeDAO.doAddEmployee(vo);			 
					}else if(operType ==2 ){//�޸�
						code = employeeDAO.doModifyEmployeeById(vo);
					}else if(operType == 3){//ɾ��
						code = employeeDAO.doDeleteEmployeeById(vo.getEmployeeId());
					}						
				}else if(intCode == 3 ){//ʧ��
					sleep = 0;
					code = -10;//Լ��-10��ʾͬ��ʧ�ܡ�
				}
			}			
			
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--doAddEmployeeInfo-3:"+e.getMessage());
			throw new ServiceException(e);
		}catch(Exception e1){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--doAddEmployeeInfo-4:"+e1.getMessage());
			throw new ServiceException(e1);
		}
		return code;    	 
     }
     
     public boolean ifInGroup(String employeeId) throws ServiceException{
    	 boolean retFlag = false;
    	 try{
    		 retFlag = employeeDAO.ifInGroup(employeeId);
    	 }catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--ifInGroup-3:"+e.getMessage());
			throw new ServiceException(e);
		}catch(Exception e1){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--ifInGroup-4:"+e1.getMessage());
			throw new ServiceException(e1);
		}
		return retFlag;
     }
     
     public void doUpdatePartyId(String employeeId, String partyId) throws ServiceException{
    	 try{
    		 employeeDAO.doUpdatePartyId(employeeId, partyId);
    	 }catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--doUpdatePartyId-3:"+e.getMessage());
			throw new ServiceException(e);
		}catch(Exception e1){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--doUpdatePartyId-4:"+e1.getMessage());
			throw new ServiceException(e1);
		}
    	 
     }
} 