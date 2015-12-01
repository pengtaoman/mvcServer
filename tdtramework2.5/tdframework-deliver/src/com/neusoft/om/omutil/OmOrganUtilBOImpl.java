package com.neusoft.om.omutil;

import com.neusoft.om.dao.area.AreaDAO;
import com.neusoft.om.dao.area.AreaVO;
import com.neusoft.om.dao.employee.EmployeeDAO;
import com.neusoft.om.dao.employee.EmployeeVO;
import com.neusoft.om.dao.organ.OrganColl;
import com.neusoft.om.dao.organ.OrganDAO;
import com.neusoft.om.dao.organ.OrganVO;
import com.neusoft.tdframework.exception.ServiceException;

public class OmOrganUtilBOImpl implements OmOrganUtilBO{

	private OmOrganUtilDAO organUtilDAO;
	private EmployeeDAO employeeDAO;
	private OrganDAO organDAO;
	private AreaDAO areaDAO;
	/**
	 * 传入操作员ID，返回该操作员可见的所有组织机构信息
	 * 操作员权限分为三种
	 * 最大权限的可见：本人所在部门，与本人所在部门平级（如果parent不为空则平级表示同一个父亲的兄弟，如果parent为空，
	 * 				则平级表示areaId相同的parent为空的部门），和这些组织机构的下级所有组织机构
	 * 中等权限的可见：本人所在部门及以下级所有的部门
	 * 最小权限的可见：本人所在部门
	 * @param employeeId
	 * @return
	 * @throws ServiceException
	 */
	public OrganColl getOrganCollByAuthId(String employeeId) throws ServiceException{
		OrganColl coll = new OrganColl();
		//首先得到当前操作员的数据角色，对应的组织机构权限，初始化数据，1：特权，2：普通，3：本身		
		int paramId = 1000;
		paramId=organUtilDAO.getOrganParamId(employeeId);
		if(paramId == 1000){
			paramId = 2; //如果没有配置数据角色，默认为普通
		}
		String organId = getOrganId(employeeId);
		if(paramId == 1){//特权
			String parentOrganId = organDAO.getOrganInfoById(organId).getParentOrganId();
			if( parentOrganId == null || parentOrganId.equals("")){
				coll = organUtilDAO.getSameAndChildPrtIsNull(organId);				
			}else{
				coll = organUtilDAO.getSameLevelAndChildOrgan(organId);
			}
			
		}else if(paramId == 2){//普通
			coll = organUtilDAO.getChildOrganColl(organId);
		}else if(paramId == 3){//本身
			coll = organDAO.getOrganInfo(organId);
		}		
		return coll;
	}

	private String getOrganId(String employeeId) {
		EmployeeVO empVO = new EmployeeVO();
		empVO = employeeDAO.getEmployeeInfoById(employeeId);
		String organId = "";
		if(empVO != null){
			organId = empVO.getOrganId();
		}
		return organId;
	}
	
	/**
	 * 传入操作员ID，返回该操作员可见的所有市场部信息
	 * 操作员权限分为三种
	 * 最大权限的可见：本人所在市场部，与本人所在市场部平级（如果parent不为空则平级表示同一个父亲的兄弟，如果parent为空，
	 * 				则平级表示areaId相同的parent为空的市场部），和这些市场部的下级所有市场部
	 * 中等权限的可见：本人所在市场部及以下级所有的市场部
	 * 最小权限的可见：本人所在市场部
	 * 前提：当前操作员归属的部门一定是市场部类型才可以
	 * @param employeeId
	 * @return
	 * @throws ServiceException
	 */
	public OrganColl getMarketCollByAuthId(String employeeId, String cityCode) throws ServiceException{
		OrganColl coll = new OrganColl();		
		//首先得到当前操作员的数据角色，对应的组织机构权限，初始化数据，1：特权，2：普通，3：本身		
		int paramId = 1000;
		paramId=organUtilDAO.getOrganParamId(employeeId);
		if(paramId == 1000){
			paramId = 2; //如果没有配置数据角色，默认为普通
		}
		String organId = getOrganId(employeeId);
		boolean isMarket = isMarket(organId);
		String parentOrganId = getParentOrganId(organId);
		int areaLevel = getAreaLevel(employeeId);
		int cityCodeLevel = getCityCodeLevel(cityCode);
		if(paramId == 1){//特权
			if(areaLevel <= 2 && cityCodeLevel >= 3){ //对于省份特权工号，且选择的city_code是地市编号而不是省份编号。则返回该地市所有市场部。
				coll = organUtilDAO.getAllCityMarket(cityCode);
			}else{//对于省份特权工号，选择的city_code为省份编号时正常访问省份市场部和以下市场部。与非省份特权工号逻辑相同。
				if(parentOrganId != null &&  !parentOrganId.equals("")){
					coll = organUtilDAO.getSameLevelAndChildMarket(organId, cityCode);
				}else{
					coll = organUtilDAO.getSameAndCldMarketPrtIsNull(organId, cityCode);				
				}
			}
		}else if(paramId == 2){//普通
			coll = organUtilDAO.getChildMarketColl(organId);
		}else if(paramId == 3){//本身
			if(isMarket){
				coll = organDAO.getOrganInfo(organId);
			}			
		}
		
		return coll;
	}

	private String getParentOrganId(String organId) {
		OrganVO vo = organDAO.getOrganInfoById(organId);		
		String parentOrganId = "";
		if(vo != null){
			parentOrganId = vo.getParentOrganId();
		}
		return parentOrganId;
	}
	private int  getAreaLevel(String employeeId){
		EmployeeVO vo = employeeDAO.getEmployeeInfoById(employeeId);
		String areaId = vo.getAreaId();
		int areaLevel = organUtilDAO.getAreaLevel(areaId);
		return areaLevel;
	}
	
	private int getCityCodeLevel(String cityCode){
		AreaVO vo = areaDAO.getAreaByCityCode(cityCode);
		int cityCodeLevel = vo.getAreaLevel();
		return cityCodeLevel;
	}

	private boolean isMarket(String organId){
		boolean isMarket = false;
		int departmentKind = organUtilDAO.getDepartmentKind(organId);
		if(departmentKind == 2 ){
			isMarket = true;
		}
		return isMarket;
	}
	/**
	 * 返回操作员的所有下级市场部信息,相同city_code的市场部
	 */
	public OrganColl getChildMarketCollByAuthId(String employeeId, String cityCode) throws ServiceException{
		String organId = getOrganId(employeeId);
		OrganColl coll = organUtilDAO.getSameCityChildMarketColl(organId, cityCode);
		return coll;
	}
	
	/**
	 * 传入市场部ID，返回市场部的所有下级市场部信息
	 */
	public OrganColl getChildMarketCollByOrgId( String organId, String cityCode ) throws ServiceException{
		OrganColl coll = organUtilDAO.getChildMarketColl(organId);
		return coll;
	}
	
	/**
	 * 传入市场部ID，返回市场部的所有同级别市场部信息(此处同级别是指：市场部所在区域的AREA_LEVEL相同，并且归属于同一个市场部)\
	 * 和他们下属的所有市场部。
	 * 需要city_code相同。
	 * @param organId
	 * @return
	 * @throws ServiceException
	 */
	public OrganColl getSameLevelAndCldOrgColl(String organId, String cityCode) throws ServiceException{
		String parentOrganId =  getParentOrganId(organId);
		OrganColl coll = new OrganColl();
		if(parentOrganId != null && !parentOrganId.trim().equals("")){
			coll = organUtilDAO.getSameLevelAndChildMarket(organId);
		}else{
			coll = organUtilDAO.getSameAndCldMarketPrtIsNull(organId);
		}
		return coll;
	}

	public void setOrganUtilDAO(OmOrganUtilDAO organUtilDAO) {
		this.organUtilDAO = organUtilDAO;
	}

	public void setEmployeeDAO(EmployeeDAO employeeDAO) {
		this.employeeDAO = employeeDAO;
	}

	public void setOrganDAO(OrganDAO organDAO) {
		this.organDAO = organDAO;
	}

	public void setAreaDAO(AreaDAO areaDAO) {
		this.areaDAO = areaDAO;
	}
	
	

}
