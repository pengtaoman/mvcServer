package com.neusoft.om.bo;

import java.util.HashMap;
import java.util.Map;

import com.neusoft.om.OMAppContext;
import com.neusoft.om.dao.common.SwitchDAO;
import com.neusoft.om.dao.employee.EmployeeColl;
import com.neusoft.om.dao.employee.EmployeeDAO;
import com.neusoft.om.dao.employee.EmployeeVO;
import com.neusoft.om.dao.employeedutyrelation.EmployeeDutyRelationColl;
import com.neusoft.om.dao.employeedutyrelation.EmployeeDutyRelationDAO;
import com.neusoft.om.dao.employeedutyrelation.EmployeeDutyRelationVO;
import com.neusoft.om.dao.employeerolerelation.EmployeeRoleRelationDAO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.SysLog;

/**
 * @author renh
 * ְԱְ�����
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
public class DutyEmployeeRelationMaintanceBOImpl implements DutyEmployeeRelationMaintanceBO{
	private EmployeeDAO employeeDAO;
	private EmployeeDutyRelationDAO employeeDutyRelationDAO;
	private EmployeeRoleRelationDAO employeeRoleRelationDAO;
	
	public Map getAllEmployeeInfo(String organId, int dutyId) throws ServiceException {
		Map mapData = new HashMap();
		//�õ���Ҫְ�����Ա
		EmployeeColl mainEmployeeColl = null;
		try{
			mainEmployeeColl = employeeDAO.getEmployeeInfo(organId,dutyId);
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyEmployeeRelationMaintanceBOImpl--getAllEmployeeInfo-1:"+e.getMessage());
			throw new ServiceException(e);
		}
		mapData.put("mainEmployee",mainEmployeeColl);
		//�õ���ְ��Ա
		EmployeeColl partTimeEmployeeColl = null;
		try{
			partTimeEmployeeColl = employeeDAO.getPartTimeEmployeeInfo(organId,dutyId);
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyEmployeeRelationMaintanceBOImpl--getAllEmployeeInfo-2:"+e.getMessage());
			throw new ServiceException(e);
		}
		mapData.put("partTimeEmployee",partTimeEmployeeColl);
		//�õ���֯�����ڵ���������Ϣ����
		/*
		EmployeeColl otherEmployeeColl = null;
		try{
			otherEmployeeColl = employeeDAO.
		}
		*/
		return mapData;
	}

	public int doDelPartTimeEmployeeInfo(String areaId, String organId, int dutyId, String employeeId) throws ServiceException {
		int code = 1;
		if(areaId==null || "".intern()==areaId.intern()){
			throw new ServiceException("�����Ų������ֵ");
		}
		if(organId==null || "".intern()==organId.intern()){
			throw new ServiceException("��֯������Ų������ֵ");
		}
		if(employeeId==null || "".intern()==employeeId.intern()){
			throw new ServiceException("ְԱ��Ų������ֵ");
		}
		EmployeeDutyRelationVO  vo = null;
		//�ж��Ƿ�Ϊ��Ҫְ��
		try{
			vo = employeeDutyRelationDAO.getEmployeeDutyRelationInfo(organId,dutyId,employeeId);
		}catch (DataAccessException e) {
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyEmployeeRelationMaintanceBOImpl--doDelPartTimeEmployeeInfo-1:"+e.getMessage());
			throw new ServiceException(e);
		}
		if(vo==null){
			throw new ServiceException("δ�ҵ�ְԱ��Ϣ!");
		}else{
			if(vo.getKind() != 2){
				throw new ServiceException("�Բ���,��ֻ��ɾ����ְ��Ա,��ǰְ��Ϊ��ְԱ��Ҫְ��,������ɾ��!");
			}
		}
		
		//��ְԱְ���ϵ����ɾ����Ϣ
		try{
			employeeDutyRelationDAO.doDeleteEmployeeDutyRelationInfo(organId,dutyId,employeeId);
		}catch (DataAccessException e) {
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyEmployeeRelationMaintanceBOImpl--doDelPartTimeEmployeeInfo-1:"+e.getMessage());
			throw new ServiceException(e);
		}
		
		//ְԱ��ɫ��ϵ����ɾ��
		try{
			employeeRoleRelationDAO.doDeleteEmployeeRoleRelationInfoByEmployeeIdDutyId(employeeId,dutyId);
		}catch (DataAccessException e) {
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyEmployeeRelationMaintanceBOImpl--doDeleteEmployeeRoleRelationInfoByEmployeeIdDutyId-2:"+e.getMessage());
			throw new ServiceException(e);
		}
		return code;
	}

	public int doAddPartTimeEmployeeInfo(String areaId, String organId, int dutyId, String[] employeeId) throws ServiceException {
		int code = 1;
		if(employeeId.length==0){
			throw new ServiceException("û���ҵ�Ҫ���ӵļ�ְ��Ա��Ϣ");
		}
		//ά��ְԱְ���ϵ��
		EmployeeDutyRelationColl employeeDutyRelationColl = new EmployeeDutyRelationColl();
		for(int i=0;i<employeeId.length;i++){
			EmployeeDutyRelationVO employeeDutyRelationVO = new EmployeeDutyRelationVO();
			employeeDutyRelationVO.setDutyId(dutyId);
			employeeDutyRelationVO.setOrganId(organId);
			employeeDutyRelationVO.setEmployeeId((String)employeeId[i]);
			employeeDutyRelationVO.setKind(2);
			employeeDutyRelationColl.addEmployeeDutyRelation(employeeDutyRelationVO);
		}
		try{
			employeeDutyRelationDAO.doAddEmployeeDutyRelationInfo(employeeDutyRelationColl);
		}catch (DataAccessException e) {
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyEmployeeRelationMaintanceBOImpl--doAddPartTimeEmployeeInfo-1:"+e.getMessage());
			throw new ServiceException(e);
		}
		return code;
	}
    
    /**
     * ��Ա��ְ���ϵ��������Ա�����˱��б���Ķ��Ǽ�ְ��Ϣ��
     * @param map
     * including: String areaId, String organId, String dutyId, String workNo
     * @return
     * @throws ServiceException
     */
    public int doAddPartTimeEmployeeInfo(HashMap map) throws ServiceException{
        int code = 1; //succeed
        String organId = (String)map.get("organId");
        int dutyId = Integer.valueOf((String)map.get("dutyId")).intValue();
        String employeeId = (String) map.get("employeeId");
        String workNo = (String)map.get("workNo");
        
        try{
        	if(workNo!=null){
            	//employeeId=employeeDutyRelationDAO.getEmployeeEmployeeIdByWorkNo(workNo);
        		EmployeeVO evo = employeeDAO.getEmployeeInfoByWorkNo(workNo.toUpperCase());
        		if(evo != null){
        			employeeId = evo.getEmployeeId();
        		}
            	
            }
            EmployeeDutyRelationVO empDutyVO = new EmployeeDutyRelationVO();
            empDutyVO.setDutyId(dutyId);
            empDutyVO.setEmployeeId(employeeId);
            empDutyVO.setOrganId(organId);
            empDutyVO.setKind(2); //this field is no useable in fact
            code = employeeDutyRelationDAO.doAddEmployeeDutyRelationInfo(empDutyVO);
        }catch(DataAccessException e){
            code = 0;
            SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyEmployeeRelationMaintanceBOImpl--doAddPartTimeEmployeeInfo-1:"+e.getMessage());
            throw new ServiceException(e);
        }  
        
        return code;
    }
    /**
     * ɾ��Ա��ְ���ϵ��Ϣ
     * @param empDutyVO
     * @return
     * @throws ServiceException
     */
    public int doDeleteEmployeeDutyRelationInfo(EmployeeDutyRelationVO empDutyVO) throws ServiceException
    {
        int code = 1; // succeed
        String organId = empDutyVO.getOrganId();
        int dutyId = empDutyVO.getDutyId();
        String workNo= empDutyVO.getWorkNo();
        String employeeId = empDutyVO.getEmployeeId();
        
        try{
        	if(workNo!=null){
            	employeeId=employeeDutyRelationDAO.getEmployeeEmployeeIdByWorkNo(workNo);
            }
            employeeDutyRelationDAO.doDeleteEmployeeDutyRelationInfo(organId, dutyId, employeeId);
        }catch(DataAccessException e){
            code = 0; //failed
            SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyEmployeeRelationMaintanceBOImpl--doDeleteEmployeeDutyRelationInfo-1:"+e.getMessage());
            throw new ServiceException(e);
        }
        return code;
    }
	/**
	 * 
	 * @param employeeDAO
	 */
	public void setEmployeeDAO(EmployeeDAO employeeDAO){
		this.employeeDAO = employeeDAO;
	}
	/**
	 * 
	 * @param employeeDutyRelationDAO
	 */
	public void setEmployeeDutyRelationDAO(EmployeeDutyRelationDAO employeeDutyRelationDAO){
		this.employeeDutyRelationDAO = employeeDutyRelationDAO;
	}
	/**
	 * 
	 * @param employeeRoleRelationDAO
	 */
	public void setEmployeeRoleRelationDAO(EmployeeRoleRelationDAO employeeRoleRelationDAO) {
		this.employeeRoleRelationDAO = employeeRoleRelationDAO;
	}


	//���Է���
	public static void main(String args[]){
		DutyEmployeeRelationMaintanceBO bo = (DutyEmployeeRelationMaintanceBO)OMAppContext.getBean(DutyEmployeeRelationMaintanceBO.BEAN);
		String[] employeeId = new String[3];
		employeeId[0] = "aaa";
		employeeId[1] = "bbb";
		employeeId[2] = "ccc";
		try {
			   bo.doAddPartTimeEmployeeInfo("010","abc",1,employeeId);
		 }catch (ServiceException e) {
			e.printStackTrace();
		}
	}
   public boolean haveInOrgan(String employeeId,String organId){
	   boolean in = false;
	   EmployeeColl empColl = employeeDAO.getAllEmployeeInfoByOrganId(organId);
	   for(int i = 0; i < empColl.getRowCount(); i++){
		   EmployeeVO empVO = empColl.getEmployee(i);
		   String empId = empVO.getEmployeeId();
		   if(empId.trim().equals(employeeId.trim())){
			   in = true;
		   }
	   }

	   return in;
   }

}
