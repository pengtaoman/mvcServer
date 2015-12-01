package com.neusoft.om.bo;

import java.util.Map;

import com.neusoft.om.OMAppContext;
import com.neusoft.om.dao.address.AddressColl;
import com.neusoft.om.dao.address.AddressDAO;
import com.neusoft.om.dao.address.AddressVO;
import com.neusoft.om.dao.dutyrolerelation.DutyRoleRelationVO;
import com.neusoft.om.dao.employee.EmployeeColl;
import com.neusoft.om.dao.employee.EmployeeDAO;
import com.neusoft.om.dao.employee.EmployeeVO;
import com.neusoft.om.dao.employeedutyrelation.EmployeeDutyRelationDAO;
import com.neusoft.om.dao.employeedutyrelation.EmployeeDutyRelationVO;
import com.neusoft.om.dao.organ.OrganColl;
import com.neusoft.om.dao.organ.OrganDAO;
import com.neusoft.om.dao.organ.OrganVO;
import com.neusoft.om.dao.organdisplay.OrganDisplayColl;
import com.neusoft.om.dao.organdisplay.OrganDisplayDAO;
import com.neusoft.om.dao.organdutyrelation.OrganDutyRelationDAO;
import com.neusoft.om.dao.sequence.SequenceDAO;
import com.neusoft.om.omutil.OmOrganUtilDAO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.SysLog;

/**
 * @author renh
 *
 * 组织机构管理BO接口实现
 */
public class OrganManagementBOImpl implements OrganManagementBO{
	private OrganDisplayDAO organDisplayDAO;
	private OrganDAO organDAO;
	private AddressDAO addressDAO;
	private OrganDutyRelationDAO organDutyRelationDAO;
	private EmployeeDutyRelationDAO employeeDutyRelationDAO;
	private EmployeeDAO employeeDAO;
	private SequenceDAO sequenceDAO;
	private OmOrganUtilDAO organUtilDAO;
	//根据组织机构ID查基本信息
	public OrganVO getOrganInfoByOrganId(String organId) throws ServiceException {
		OrganVO vo = null;
		try{
			vo = organDAO.getOrganInfoById(organId);        
		}catch(DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganManagementBOImpl--getOrganInfoByOrganId :"+e.getMessage());
			throw new ServiceException(e);
		}
		return vo;
	}
	
//	根据综合条件查询组织机构
	public OrganVO getOrganInfoByFilter(Map filterInfo) throws ServiceException {
		OrganVO vo = null;
		try{
			vo = organDAO.getOrganInfoFilter(filterInfo);        
		}catch(DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganManagementBOImpl--getOrganInfoByFilter :"+e.getMessage());
			throw new ServiceException(e);
		}
		return vo;
	}

	public AddressColl getOrganAddressByOrganId(String organId) throws ServiceException{
		AddressColl coll = null;
		try{
			coll = addressDAO.getAddressInfoByOrganId(organId);
		}catch(DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganManagementBOImpl--getOrganAddressByOrganId :"+e.getMessage());
			throw new ServiceException(e);
		}
		return coll;
	}
	/*
	 * 
	 * 
	 * 得到不带有职务的向下显示数据的组织树，把areaId作为父节点开始显示。
	 */
	public OrganDisplayColl getOrganDisplayInfo(String areaId) throws ServiceException {
		OrganDisplayColl coll = new OrganDisplayColl();
		OrganDisplayColl areaColl = null;
		OrganDisplayColl organColl = null;
		//获得区域
		try{
			areaColl = organDisplayDAO.getAreaInfoToOrganDisply(areaId);
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganManagementBOImpl--getAreaInfoToOrganDisply :"+e.getMessage());
			throw new ServiceException(e);
		}
		//根据区域结果集获得组织机构,同时得到该组织机构的职务,并添加到最终结果集合中
		
		for(int i=0;i<areaColl.getRowCount();i++){
			coll.addOrganDisplay(areaColl.getOrganDisplay(i));
			try{
				String id = areaColl.getOrganDisplay(i).getOrganId();
				int level = areaColl.getOrganDisplay(i).getOrganLevel();
				organColl = organDisplayDAO.getOrganInfoToOrganDisply(id,level);
				//organColl = organDisplayDAO.getMarketOrganToDisplay(id,level);
			}catch (DataAccessException e) {
				SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganManagementBOImpl--getAreaInfoToOrganDisply :"+e.getMessage());
				throw new ServiceException(e);
			}
			for(int j=0;j<organColl.getRowCount();j++){
				coll.addOrganDisplay(organColl.getOrganDisplay(j));
			}
		}
		return coll;
	}
	/*
	 * 
	 * 
	 * 得到不带有职务的向下显示数据的组织树，把areaId作为父节点开始显示。
	 */
	public OrganDisplayColl getOrganDisplayInfo(String areaId,int areaLevel) throws ServiceException {
		OrganDisplayColl coll = new OrganDisplayColl();
		OrganDisplayColl areaColl = null;
		OrganDisplayColl organColl = null;

		//获得区域
		try{
			areaColl = organDisplayDAO.getAreaInfoToOrganDisply(areaId,areaLevel);
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganManagementBOImpl--getAreaInfoToOrganDisply :"+e.getMessage());
			throw new ServiceException(e);
		}
		//根据区域结果集获得组织机构,同时得到该组织机构的职务,并添加到最终结果集合中
		
		for(int i=0;i<areaColl.getRowCount();i++){
			coll.addOrganDisplay(areaColl.getOrganDisplay(i));
			try{
				String id = areaColl.getOrganDisplay(i).getOrganId();
				int level = areaColl.getOrganDisplay(i).getOrganLevel();
				organColl = organDisplayDAO.getOrganInfoToOrganDisply(id,level);
				//organColl = organDisplayDAO.getMarketOrganToDisplay(id,level);
			}catch (DataAccessException e) {
				SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganManagementBOImpl--getAreaInfoToOrganDisply :"+e.getMessage());
				throw new ServiceException(e);
			}
			for(int j=0;j<organColl.getRowCount();j++){
				coll.addOrganDisplay(organColl.getOrganDisplay(j));
			}
		}
		return coll;
	}
	
	//得到带职务信息的组织树数据，把areaId作为父节点开始显示。
	public OrganDisplayColl getOrganDisplayInfoIncludeDuty(String areaId) throws ServiceException{
		OrganDisplayColl coll = new OrganDisplayColl();
		OrganDisplayColl areaColl = null;
		OrganDisplayColl organColl = null;
		OrganDisplayColl dutyColl = null;
		//获得区域
		try{
			areaColl = organDisplayDAO.getAreaInfoToOrganDisply(areaId);
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganManagementBOImpl--getAreaInfoToOrganDisply :"+e.getMessage());
			throw new ServiceException(e);
		}
		//根据区域结果集获得组织机构,同时得到该组织机构的职务,并添加到最终结果集合中
		
		for(int i=0;i<areaColl.getRowCount();i++){
			coll.addOrganDisplay(areaColl.getOrganDisplay(i));
			String id = areaColl.getOrganDisplay(i).getOrganId();
			int level = areaColl.getOrganDisplay(i).getOrganLevel();
			try{
				organColl = organDisplayDAO.getOrganInfoToOrganDisply(id,level);
			}catch (DataAccessException e) {
				SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganManagementBOImpl--getAreaInfoToOrganDisply :"+e.getMessage());
				throw new ServiceException(e);
			}
			for(int j=0;j<organColl.getRowCount();j++){
				coll.addOrganDisplay(organColl.getOrganDisplay(j));
				//根据organKind构造organDuty
				int organKind =organColl.getOrganDisplay(j).getKind();
				int dutyLevel =organColl.getOrganDisplay(j).getOrganLevel();
				String organId = organColl.getOrganDisplay(j).getOrganId();
				try{
					dutyColl = organDisplayDAO.getDutyInfoToOrganDisplay(organId,dutyLevel,id,organKind);
				}catch (DataAccessException e) {
					SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganManagementBOImpl--getAreaInfoToOrganDisply :"+e.getMessage());
					throw new ServiceException(e);
				}
				for(int m=0;m<dutyColl.getRowCount();m++){
					coll.addOrganDisplay(dutyColl.getOrganDisplay(m));
				}
			}
		}
		return coll;
	}
	//增加
	public int doAddOrganInfo(OrganVO organVO, AddressVO vo, long partyId) throws ServiceException {
		int code = 1;
		String organSequence;
		//增加一条记录(用存储过程增加)
		/*
		try{
			code = organDAO.doAddOrganByProc(organVO);
		}catch (DataAccessException e) {
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganManagementBOImpl--doAddOrganInfo :"+e.getMessage());
			throw new ServiceException(e);
		}*/
		//得到组织机构的序列号
		try{
			organSequence = sequenceDAO.getOrganSequenceValue();
		}catch (DataAccessException e) {
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganManagementBOImpl--doAddOrganInfo-1 :"+e.getMessage());
			throw new ServiceException(e);
		}
		//增加一条记录
		organVO.setOrganId(organSequence);
		try{
			String organName = organVO.getOrganName();
			String areaId = organVO.getAreaId();
			boolean repeateName = organDAO.repeatedName(areaId, organName);
			if(repeateName){
				code = 2;
				return code;
			}
			organDAO.doAddOrgan(organVO);
		}catch (DataAccessException e) {
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganManagementBOImpl--doAddOrganInfo-2 :"+e.getMessage());
			throw new ServiceException(e);
		}
		//在组织机构与职务关系表中增加该组织机构的职务信息
		String organId = organVO.getOrganId();
		int organKind = organVO.getOrganKind();
		try{
			organDutyRelationDAO.doAddOrganDutyRelationInfo(organId,organKind);
		}catch (DataAccessException e) {
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganManagementBOImpl--doAddOrganInfo-3 :"+e.getMessage());
			throw new ServiceException(e);
		}
		return code;
	}

	//组织机构修改时,编号,类型,所属区域不允许修改(控制在页面实现)
	public int doModifyOrganInfo(OrganVO organVO, AddressVO addressVO, String priOrganName) throws ServiceException {
		int code = 1;//成功
		try{
			String organName = organVO.getOrganName();
			String areaId = organVO.getAreaId();			
			boolean changeName = !organName.equals(priOrganName);
			if(changeName){
				boolean repeatName = organDAO.repeatedName(areaId, organName);
				if(repeatName){
					code = 2;
					return code;
				}
			}			
			code = organDAO.doModifyOrganById(organVO);
		}catch (DataAccessException e) {
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganManagementBOImpl--doModifyOrganInfo-1 :"+e.getMessage());
			throw new ServiceException(e);
		}
		
		return code;
	}

	public int doDeleteOrganInfo(String organId) throws ServiceException {
		int code = 1;//成功
		//首先校验该组织机构下是否有下级组织机构
		OrganColl organColl = null;
		try{
			organColl = organDAO.getChildOrganInfo(organId);
		}catch (DataAccessException e) {
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganManagementBOImpl--doDeleteOrganInfo-1 :"+e.getMessage());
			throw new ServiceException(e);
		}
		if(organColl!=null&&organColl.getRowCount()>0){
			code = 0;
			throw new ServiceException("该组织机构有下级机构,不能删除!");
		}
		//如果没有下级组织机构,则要校验是否有人员信息(兼职情况不考虑)
		EmployeeColl employeeColl = null;
		try{
			employeeColl = employeeDAO.getEmployeeInfoByOrganId(organId);
		}catch (DataAccessException e) {
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganManagementBOImpl--getAllEmployeeInfoByOrganId-2 :"+e.getMessage());
			throw new ServiceException(e);
		}
		if(employeeColl!=null&&employeeColl.getRowCount()>0){
			code = 0;
			throw new ServiceException("该组织机构已经有人员,不能删除!");
		}
		//删除组织机构信息
		try{
			code = organDAO.doDeleteOrganById(organId);
		}catch (DataAccessException e) {
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganManagementBOImpl--doDeleteOrganInfo-3 :"+e.getMessage());
			throw new ServiceException(e);
		}
		//删除组织机构与职务对应关系信息
		try{
			code = organDutyRelationDAO.doDeleteOrganDutyRelationInfoByOrganId(organId);
		}catch (DataAccessException e) {
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganManagementBOImpl--doDeleteOrganInfo-4 :"+e.getMessage());
			throw new ServiceException(e);
		}
		//删除该组织机构内兼职人员信息(在前面已经判断是否有非兼职人员在该组织机构下)
		try{
			code = employeeDutyRelationDAO.doDeleteEmployeeDutyRelationInfoByOrganId(organId);
		}catch (DataAccessException e) {
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganManagementBOImpl--doDeleteOrganInfo-5 :"+e.getMessage());
			throw new ServiceException(e);
		}
		return code;
	}
	/**
	 * 得到组织机构树信息集合(只包括分公司和市场部)
	 * @param areaId
	 * @return OrganDisplayColl
	 * @throws ServiceException
	 */
	public OrganDisplayColl getMarketOrganDisplayInfo(String areaId) throws ServiceException{
		OrganDisplayColl coll = new OrganDisplayColl();
		OrganDisplayColl areaColl = null;
		OrganDisplayColl organColl = null;
		//获得区域
		try{
			areaColl = organDisplayDAO.getAreaInfoToOrganDisply(areaId);
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganManagementBOImpl--getMarketOrganDisplayInfo :"+e.getMessage());
			throw new ServiceException(e);
		}
		//根据区域结果集获得组织机构(分公司和市场部)
		for(int i=0;i<areaColl.getRowCount();i++){
			coll.addOrganDisplay(areaColl.getOrganDisplay(i));
			try{
				String id = areaColl.getOrganDisplay(i).getOrganId();
				int level = areaColl.getOrganDisplay(i).getOrganLevel();
				organColl = organDisplayDAO.getMarketOrganToDisplay(id,level);
			}catch (DataAccessException e) {
				SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganManagementBOImpl--getMarketOrganDisplayInfo :"+e.getMessage());
				throw new ServiceException(e);
			}
			for(int j=0;j<organColl.getRowCount();j++){
				coll.addOrganDisplay(organColl.getOrganDisplay(j));
			}
		}
		return coll;
	}
	public int doDutyEmployeeRelationMaintance(EmployeeDutyRelationVO vo) throws ServiceException {
		//得到
		return 0;
	}

	public int doDutyRoleRelationMaintance(DutyRoleRelationVO vo) throws ServiceException {
		// TODO Auto-generated method stub
		return 0;
	}
	/**
	 * 
	 * @param maintenanceDAO
	 */
	public void setOrganDisplayDAO(OrganDisplayDAO maintenanceDAO) {
		organDisplayDAO = maintenanceDAO;
	}
	/**
	 * 
	 * @param maintenanceDAO
	 */
	public void setOrganDAO(OrganDAO maintenanceDAO){
		organDAO = maintenanceDAO; 
	}
	/**
	 * 
	 * @param maintenanceDAO
	 */
	public void setAddressDAO(AddressDAO maintenanceDAO){
		addressDAO = maintenanceDAO;
	}
	/**
	 * 
	 * @param maintenanceDAO
	 */
	public void setOrganDutyRelationDAO(OrganDutyRelationDAO maintenanceDAO){
		organDutyRelationDAO = maintenanceDAO;
	}
	/**
	 * 
	 * @param maintenanceDAO
	 */
	public void setEmployeeDutyRelationDAO(EmployeeDutyRelationDAO maintenanceDAO) {
		employeeDutyRelationDAO = maintenanceDAO;
	}
	/**
	 * 
	 * @param maintenanceDAO
	 */
	public void setEmployeeDAO(EmployeeDAO maintenanceDAO) {
		employeeDAO = maintenanceDAO;
	}
	/**
	 * 
	 * @param maintenanceDAO
	 */
	public void setSequenceDAO(SequenceDAO maintenanceDAO) {
		sequenceDAO = maintenanceDAO;
	}
	
	public String getAppContainer(String key) throws ServiceException{
		return organDAO.getAppContainer(key);
	}
	
	public void setOrganUtilDAO(OmOrganUtilDAO organUtilDAO) {
		this.organUtilDAO = organUtilDAO;
	}

	//测试方法
	public static void main(String args[]) {
		OrganManagementBO bo = (OrganManagementBO)OMAppContext.getBean(OrganManagementBO.BEAN);
		OrganDisplayColl coll = null;
		try {
			coll= bo.getOrganDisplayInfoIncludeDuty("00001000");
		} catch (ServiceException e) {
			e.printStackTrace();
		}
		for(int i=0;i<coll.getRowCount();i++){
			System.out.println(coll.getOrganDisplay(i).toString(2));
		}
	}

	public OrganColl getOrganByAuthId(String employeeId, int adminType) throws ServiceException {
		EmployeeVO empVO = employeeDAO.getEmployeeInfoById(employeeId);
		String areaId = "";
		String organId = "";
		if(empVO != null){
			areaId = empVO.getAreaId();
			organId = empVO.getOrganId();
		}		
		String organAreaId = organDAO.getOrganInfoById(organId).getAreaId();
		if(!organAreaId.equals("organId")){ //如果工号所在的部门归属区域与工号归属的区域不同，且其为特权操作员，则将其作为普通操作员处理
			if(adminType == 1){
				adminType = 2;
			}
		}
		OrganColl coll = new OrganColl();
		if(adminType == 0 ){//0 普通操作员
			coll = organDAO.getOrganInfo(organId);
		}else if(adminType == 1 ){//1 特权管理员
			coll = organDAO.getOrganByAreaForOM(areaId);
		}else if( adminType == 2 ){//2 普通管理员
			coll = organUtilDAO.getChildOrganColl(organId);
		}
		coll = adjParentOrganId(coll);
		return coll;
	}
	
	/**
	 * 
	 * @param coll
	 * @return
	 */
	private OrganColl adjParentOrganId(OrganColl coll){
		if( coll != null){
			//判断每个vo，把其中parent不在coll中的organ,parent置为null
			for(int i=0; i < coll.getRowCount(); i++){
				OrganVO vo = coll.getOrgan(i);
				String parentOrganId = vo.getParentOrganId();
				OrganVO parentVO = coll.getOrganById(parentOrganId);
				if( parentVO == null || parentVO.getOrganId() == null || parentVO.getOrganId().equals("")){
					vo.setParentOrganId("");
				}
			}
			
		}
		return coll;
	}
	

}
