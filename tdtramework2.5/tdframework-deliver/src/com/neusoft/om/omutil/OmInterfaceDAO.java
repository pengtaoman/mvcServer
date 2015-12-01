package com.neusoft.om.omutil;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.neusoft.om.dao.container.ContainerVO;
import com.neusoft.om.dao.employee.EmployeeColl;
import com.neusoft.om.dao.employee.EmployeeVO;
import com.neusoft.om.dao.organization.OrganColl;
import com.neusoft.om.dao.region.RegionVO;
import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.exception.DataAccessException;

public interface OmInterfaceDAO {

	/**
	 * 根据区域标识取得区域信息，根据订单组需求提供
	 */
	public ParamObjectCollection getRegionCollById(HashMap<String, String> paramMap) throws DataAccessException;
	
	/**
	 * 根据区域标识、区域级别取得区域信息，根据订单组需求提供
	 */
	public ParamObjectCollection getRegionCollByLevel(HashMap<String, String> paramMap) throws DataAccessException;
	
	/**
	 * 根据区域标识取得所有区县信息，根据订单组需求提供
	 */
	public ParamObjectCollection getAllCityCollById(HashMap<String, String> paramMap) throws DataAccessException;
	
	/**
	 * 根据区域标识取得所有乡镇信息，根据订单组需求提供
	 */
	public ParamObjectCollection getAllTownCollById(HashMap<String, String> paramMap) throws DataAccessException;
	
	/**
	 * 根据操作员级别取得指定城市编码下所有区域信息，根据订单组需求提供
	 */
	public ParamObjectCollection getRegionCollByOperLevel(HashMap<String, String> paramMap) throws DataAccessException;
	
	/**
	 * 取得对应渠道下的登陆账号和职员姓名，根据订单组需求提供
	 */
	public ParamObjectCollection getStaffCollByDealerId(HashMap<String, String> paramMap) throws DataAccessException; 
	
	/**
	 * 根据city_code返回所有的组织机构，根据资源组需求提供
	 * @param cityCode
	 * @return
	 * @throws DataAccessException
	 */
	public ParamObjectCollection getOrganCollByCityCode(String cityCode) throws DataAccessException;
	
	/**
	 * 得到归属于某渠道的所有工号，根据资源组需求提供
	 * @param channelId
	 * @return
	 * @throws DataAccessException
	 */
	public ParamObjectCollection getSystemUserCollByChannelId(int channelId) throws DataAccessException;
	
	/**
	 * 得到指定组织机构内的所有工号，根据资源组需求提供
	 * @param orgId
	 * @return
	 * @throws DataAccessException
	 */
	public ParamObjectCollection getSystemUserCollByOrgId(int orgId) throws DataAccessException;
	
	/**
	 * 根据上级地市编码得到其下属的区县信息，根据订单组需求提供
	 * @param parentRegionId
	 * @return
	 * @throws DataAccessException
	 */
	public ParamObjectCollection getCountyByParentRegionId (int parentRegionId) throws DataAccessException;
	
	/**
	 * 获取om_container_t信息，根据传入的VO中设置的属性查询出所有符合条件,为订单组需求提供
	 * @param vo
	 * @return
	 * @throws DataAccessException
	 */
	public List getContainerColl (ContainerVO vo) throws DataAccessException;
	
	/**为订单组提供
	 * 获取区域信息，根据传入的VO中设置的属性查询出所有符合条件的记录放入List中
	 * @param vo
	 * @return
	 * @throws DataAccessException
	 */
	public List getRegionCollByVO(RegionVO vo) throws DataAccessException;
	
	/** 为渠道组提供
	 * @param map
	 * 	CITY_CODE	地市(无值则不作为查询条件)	String
		COMMON_REGION_ID	县区(若有值则取它及它以下的县区；无值则不作为查询条件)	String
		STAFF_ID	员工标识(无值则不作为查询条件)	number
		STAFF_NAME	员工名称(支持模糊查询, 无值则不作为查询条件)	String		
	 * @return
	 * 	HashMap	FLAG	成功失败标识 1-成功 0-失败	Int
				REMSG	失败时的原因	String
				NUM	总体行数	int
	 * @throws DataAccessException
	 */
	public int getStaffCollCount(Map map) throws DataAccessException;
	
	/**
	 * 为渠道组提供
	 * @param map
	 * 	CITY_CODE	地市(无值则不作为查询条件)	String
		COMMON_REGION_ID	县区(若有值则取它及它以下的县区；无值则不作为查询条件)	String
		STAFF_ID	员工标识(无值则不作为查询条件)	number
		STAFF_NAME	员工名称(支持模糊查询, 无值则不作为查询条件)	String
		BEGIN_RN	查询起始行	Int
		END_RN	查询结束行	Int
	 * @return
	 * 	FLAG	成功失败标识 1-成功 0-失败	Int
		REMSG	失败时的原因	String
		STAFFLIST	符合查询条件员工列表(list中的每个VO包括员工所在的CITY_CODE, COMMON_REGION_ID,
		STAFF_ID,
		STAFF_NAME)	List
	 * @throws DataAccessException
	 */
	public List getStaffColl(Map map) throws DataAccessException;
	
	/**为订单组提供  -- 与一次性费用手动优惠类似的功能使用  
	 * 判断传入的用户名，密码 是否匹配以及改工号对指定的pageLink对应的组件是否有操作的权利
	 * @param account
	 * @param pwd
	 * @param pageLink 
	 * @return
	 */
	public boolean haveRight(String account, String pwd, String pageLink) throws DataAccessException;
	/**
	 * 获得两个级别之间,相同CityCode区域所有的组织机构
	 * 为资源-销售组提供
	 * @param level1
	 * @param level2
	 * @param cityCode
	 * @return
	 * @throws DataAccessException
	 */
	public OrganColl getOrganByAreaLevel1(int level1, int level2,String cityCode) throws DataAccessException;
	/**
	 * 获得两个级别之间区域所有的组织机构
	 * 为资源-销售组提供
	 * @param level1
	 * @param level2
	 * @return
	 * @throws DataAccessException
	 */
	public OrganColl getOrganByAreaLevel(int level1, int level2) throws DataAccessException;
	
	/**
	 * 得到省份(minLevel)及以下级，输入areaId以上级和areaId确定的区域，之间的所有区域中组织机构的集合
	 * 资源-销售组使用
	 * @param minLevel
	 * @param areaId
	 * @return
	 * @throws DataAccessException
	 */
	public OrganColl getOrganCollByAuthAreaId(String areaId) throws DataAccessException;
    /**
     * 得到两个级别之间区域的所有职员
     * 为资源-销售组提供
     * @param level1
     * @param level2
     * @return
     * @throws DataAccessException
     */
    public EmployeeColl getEmployeeByAreaLevel1(int level1, int level2,String cityCode) throws DataAccessException;
    /**
     * 得到两个级别之间区域的所有职员
     * 为资源-销售组提供
     * @param level1
     * @param level2
     * @return
     * @throws DataAccessException
     */
    public EmployeeColl getEmployeeByAreaLevel(int level1, int level2) throws DataAccessException;
    /**
     * 
     * @param areaId
     * @return
     * @throws DataAccessException
     */
    public EmployeeColl getEmployeeByArea(String areaId) throws DataAccessException;
    
    /**
     * 根据职员编码得到员工信息
     * @param staffId
     * @return
     * @throws DataAccessException
     */
    public EmployeeVO getEmpByStaffId(String staffId) throws DataAccessException;
    
    /**
     * 根据工号编码得到员工信息
     * @param staffId
     * @return
     * @throws DataAccessException
     */
    public EmployeeVO getEmpBySystemUserId(String systemUserId) throws DataAccessException;
}
