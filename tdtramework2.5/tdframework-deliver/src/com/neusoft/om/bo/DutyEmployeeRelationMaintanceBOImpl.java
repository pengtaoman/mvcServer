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
 * 职员职务调整
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
public class DutyEmployeeRelationMaintanceBOImpl implements DutyEmployeeRelationMaintanceBO{
	private EmployeeDAO employeeDAO;
	private EmployeeDutyRelationDAO employeeDutyRelationDAO;
	private EmployeeRoleRelationDAO employeeRoleRelationDAO;
	
	public Map getAllEmployeeInfo(String organId, int dutyId) throws ServiceException {
		Map mapData = new HashMap();
		//得到主要职务的人员
		EmployeeColl mainEmployeeColl = null;
		try{
			mainEmployeeColl = employeeDAO.getEmployeeInfo(organId,dutyId);
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyEmployeeRelationMaintanceBOImpl--getAllEmployeeInfo-1:"+e.getMessage());
			throw new ServiceException(e);
		}
		mapData.put("mainEmployee",mainEmployeeColl);
		//得到兼职人员
		EmployeeColl partTimeEmployeeColl = null;
		try{
			partTimeEmployeeColl = employeeDAO.getPartTimeEmployeeInfo(organId,dutyId);
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyEmployeeRelationMaintanceBOImpl--getAllEmployeeInfo-2:"+e.getMessage());
			throw new ServiceException(e);
		}
		mapData.put("partTimeEmployee",partTimeEmployeeColl);
		//得到组织机构内的其它人信息集合
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
			throw new ServiceException("区域编号不允许空值");
		}
		if(organId==null || "".intern()==organId.intern()){
			throw new ServiceException("组织机构编号不允许空值");
		}
		if(employeeId==null || "".intern()==employeeId.intern()){
			throw new ServiceException("职员编号不允许空值");
		}
		EmployeeDutyRelationVO  vo = null;
		//判断是否为主要职务
		try{
			vo = employeeDutyRelationDAO.getEmployeeDutyRelationInfo(organId,dutyId,employeeId);
		}catch (DataAccessException e) {
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyEmployeeRelationMaintanceBOImpl--doDelPartTimeEmployeeInfo-1:"+e.getMessage());
			throw new ServiceException(e);
		}
		if(vo==null){
			throw new ServiceException("未找到职员信息!");
		}else{
			if(vo.getKind() != 2){
				throw new ServiceException("对不起,您只能删除兼职人员,当前职务为该职员主要职务,不允许删除!");
			}
		}
		
		//从职员职务关系表中删除信息
		try{
			employeeDutyRelationDAO.doDeleteEmployeeDutyRelationInfo(organId,dutyId,employeeId);
		}catch (DataAccessException e) {
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyEmployeeRelationMaintanceBOImpl--doDelPartTimeEmployeeInfo-1:"+e.getMessage());
			throw new ServiceException(e);
		}
		
		//职员角色关系表中删除
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
			throw new ServiceException("没有找到要增加的兼职人员信息");
		}
		//维护职员职务关系表
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
     * 在员工职务关系表中增加员工（此表中保存的都是兼职信息）
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
     * 删除员工职务关系信息
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


	//测试方法
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
