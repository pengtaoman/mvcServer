package com.neusoft.om.bo;

import com.neusoft.om.dao.area.AreaColl;
import com.neusoft.om.dao.duty.DutyColl;
import com.neusoft.om.dao.organ.OrganColl;
import com.neusoft.om.dao.organkind.OrganKindColl;
import com.neusoft.om.dao.role.RoleColl;
import com.neusoft.om.dao.system.SystemColl;
import com.neusoft.tdframework.core.BaseBO;
import com.neusoft.tdframework.exception.ServiceException;
/**
 * @author renh
 *
 * 动态数据的下拉框调用接口
 */
public interface DynamicListBO extends BaseBO {
	public static final String BEAN = "dynamicListFacade";
	/**职务*/
	public DutyColl getDutyList() throws ServiceException;
	/**组织机构*/
	public OrganColl getOrganList() throws ServiceException;
	
	public OrganColl getOrganListByOragn(String organId) throws ServiceException;
	
	public OrganColl getOrganInfoByOragn(String organId) throws ServiceException;
	/**
	 * 查区域下的组织机构
	 * @param areaId
	 * @return
	 * @throws ServiceException
	 */
	public OrganColl getOrganListByArea(String areaId) throws ServiceException;
	/**行政区域*/
	public AreaColl getAreaList() throws ServiceException;
	
	public AreaColl getAreaList(String areaId) throws ServiceException;
	
	public AreaColl getAreaListByOrgan(String organId) throws ServiceException;
	/**
	 * 得到当前AreaId,及AreaId下的所有子结点
	 * @return
	 * @throws ServiceException
	 */
	public AreaColl getAreaChildList(String areaId) throws ServiceException;
	/**组织机构类型*/
	public OrganKindColl getOrganKindList() throws ServiceException;
	/**
	 * 功能角色
	 * @return RoleColl
	 * @throws ServiceException
	 */
	public RoleColl getFuncRoleList() throws ServiceException;
	/**
	 * 数据角色
	 * @return RoleColl
	 * @throws ServiceException
	 */
	public RoleColl getDataRoleList() throws ServiceException;
	/**
	 * 角色(包括数据角色和功能角色)
	 * @return
	 * @throws ServiceException
	 */
	public RoleColl getAllRoleList() throws ServiceException;
	/**
	 * 系统
	 * @return
	 * @throws ServiceException
	 */
	public SystemColl getAllSystemList() throws ServiceException;
	/**
	 * 根据组织机构类型(organ,area),编号(id) 得到组织机构类型集合
	 * @param kind
	 * @param id
	 * @return OrganKindColl
	 * @throws ServiceException
	 */
	public OrganKindColl getOrganKindColl(String kind,String id) throws ServiceException;
}
