package com.neusoft.om.bo;

import java.util.Map;

import com.neusoft.om.dao.address.AddressColl;
import com.neusoft.om.dao.address.AddressVO;
import com.neusoft.om.dao.dutyrolerelation.DutyRoleRelationVO;
import com.neusoft.om.dao.employeedutyrelation.EmployeeDutyRelationVO;
import com.neusoft.om.dao.organ.OrganColl;
import com.neusoft.om.dao.organ.OrganVO;
import com.neusoft.om.dao.organdisplay.OrganDisplayColl;
import com.neusoft.tdframework.core.BaseBO;
import com.neusoft.tdframework.exception.ServiceException;

/**brief description
 * <p>Date       : 2004-12-09</p>
 * <p>Module     : om</p>
 * <p>Description: 实现组织机构维护的所有接口</p>
 * <p>Remark     : </p>
 * @author ren.hui@neusoft.com
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> 修改历史</p>
 * <p>  序号		日期		修改人			修改原因</p>
 * <p>   1                                       </p>
 */
public interface OrganManagementBO extends BaseBO{
	public static final String BEAN = "organManagementFacade";
	/**
	 * 根据组织机构Id查询组织机构的基本信息
	 * @return
	 * @throws ServiceException
	 */
	public OrganVO getOrganInfoByOrganId(String organId) throws ServiceException;
	/**
	 * 根据组织机构Id得到该组织机构的地址及联系信息
	 * @return
	 * @throws ServiceException
	 */
	public AddressColl getOrganAddressByOrganId(String organId) throws ServiceException;
	/**
	 * 根据过滤信息得到机构信息
	 * @return
	 * @throws ServiceException
	 */
	public OrganVO getOrganInfoByFilter(Map filterInfo) throws ServiceException;
	/**
	 * 得到组织机构树信息集合(不包括职务)
	 * @param areaId
	 * @return OrganDisplayColl
	 * @throws ServiceException
	 */
	public OrganDisplayColl getOrganDisplayInfo (String areaId) throws ServiceException;
	
	public OrganDisplayColl getOrganDisplayInfo(String areaId,int areaLevel) throws ServiceException;
	/**
	 * 得到组织机构树信息集合(包括职务)
	 * @param areaId
	 * @return
	 * @throws ServiceException
	 */
	public OrganDisplayColl getOrganDisplayInfoIncludeDuty(String areaId) throws ServiceException;
	/**
	 * 增加一个组织机构(基本信息,联系信息AddressVO),
	 * 包括该组织机构下的职务(根据组织机构类型确定职务DutyVO),维护组织机构和职务的关系表(
	 * OrganDutyRelationVO)
	 * @param vo
	 * @return
	 * @throws ServiceException
	 */
	public int doAddOrganInfo(OrganVO organVO,AddressVO vo,long partyId) throws ServiceException;
	/**
	 * 修改组织机构信息(基本信息修改,联系信息修改)
	 * 基本信息(OrganVO),联系地址信息(AddressVO)
	 * @param organVO
	 * @param addressVO
	 * @return
	 * @throws ServiceException
	 */
	public int doModifyOrganInfo(OrganVO organVO,AddressVO addressVO,String priOrganName) throws ServiceException;
	/**
	 * organId,对应的要维护: 组织机构-职务关系表,职员职务关系表,
	 * 职务下的人员信息,与人员相关的信息
	 * @param organId
	 * @return
	 * @throws ServiceException
	 */
	public int doDeleteOrganInfo(String organId) throws ServiceException;
	/**
	 * 职务与操作员对应关系维护(维护职员的兼职信息)
	 * 相应的需要维护:职务-职员关系表,职员-角色关系表,职员权限详情表
	 * @return
	 * @throws ServiceException
	 */
	public int doDutyEmployeeRelationMaintance(EmployeeDutyRelationVO vo) throws ServiceException;
	/**
	 * 职务与角色对应关系维护
	 * 相应的需要维护:职务-角色关系表,职员-角色关系表,职员权限详情表
	 * @return
	 * @throws ServiceException
	 */
	public int doDutyRoleRelationMaintance(DutyRoleRelationVO vo) throws ServiceException;
	/**
	 * 得到组织机构树信息集合(只包括分公司和市场部)
	 * @param areaId
	 * @return OrganDisplayColl
	 * @throws ServiceException
	 */
	public OrganDisplayColl getMarketOrganDisplayInfo(String areaId) throws ServiceException;
	/**
	 * 得到渠道应用连接
	 * @param key
	 * @return String
	 * @throws ServiceException
	 */
	public String getAppContainer(String key) throws ServiceException;
	
	/**
	 * 根据管理员id得到可见的组织机构范围。权限系统使用，根据工号的管理员类型确定其可见的范围
	 * @param employeeId
	 * @return
	 * @throws ServiceException
	 */
	public OrganColl getOrganByAuthId(String employeeId, int adminType) throws ServiceException;
	
	
		
	
}
