package com.neusoft.om.dao.organdisplay;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;


/**brief description
 * <p>Date       : 2004-12-01</p>
 * <p>Module     : om</p>
 * <p>Description: 显示组织机构树图的dao接口</p>
 * <p>Remark     : </p>
 * @author ren.hui@neusoft.com
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> 修改历史</p>
 * <p>  序号		日期		修改人			修改原因</p>
 * <p>   1                                       </p>
 */
public interface OrganDisplayDAO extends BaseDao {
	public static final String BEAN = "organDisplayDAO";
	/**
	 * 将地市信息以OrganDisplay对象存储
	 * @param areaId
	 * @return OrganDisplayColl
	 * @throws DataAccessException
	 */
	public OrganDisplayColl getAreaInfoToOrganDisply(String areaId) throws DataAccessException;
	
	public OrganDisplayColl getAreaInfoToOrganDisply(String areaId,int areaLevel) throws DataAccessException;
	/**
	 * 将组织机构信息以OrganDisplay对象存储
	 * @param areaId
	 * @param level
	 * @return OrganDisplayColl
	 * @throws DataAccessException
	 */
	public OrganDisplayColl getOrganInfoToOrganDisply(String areaId,int level) throws DataAccessException;
	/**
	 * 将职务信息以OrganDisplay对象存储
	 * @param organId
	 * @param level
	 * @param areaId
	 * @param organKind
	 * @return OrganDisplayColl
	 * @throws DataAccessException
	 */
	public OrganDisplayColl getDutyInfoToOrganDisplay(String organId,int level,String areaId,int organKind) throws DataAccessException;
	/**
	 * 得到只有区域和市场部的数据，给渠道系统使用
	 * 注意，由于是否“市场部”只能通过om_organ_kind_t中的数据判断，
	 * 因此om_organ_kind_t中f_department_kind_t字段值不能轻易变化，此处认为2表示市场部
	 * @param areaId
	 * @param level
	 * @return
	 * @throws DataAccessException
	 */
	public OrganDisplayColl getMarketOrganToDisplay(String areaId,int level)throws DataAccessException;
	/**
	 * 得到某organ_id下所有市场部下的渠道集合
	 * @param areaId
	 * @return
	 * @throws DataAccessException
	 */
	public OrganDisplayColl getDealerColl(String organId,int level)throws DataAccessException;
	
	public OrganDisplayColl getMarketColl(String areaId, int level) throws DataAccessException;
	
	public OrganDisplayColl getMarketAreaColl(String areaId, int level) throws DataAccessException;
}
