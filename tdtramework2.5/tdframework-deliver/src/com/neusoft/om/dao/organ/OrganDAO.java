package com.neusoft.om.dao.organ;

import java.util.Map;
import java.util.Vector;

import com.neusoft.om.dao.area.AreaColl;
import com.neusoft.om.dao.organkind.OrganKindColl;
import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;


/**brief description
 * <p>Date       : 2004-12-06</p>
 * <p>Module     : om</p>
 * <p>Description: 实现organ的dao接口</p>
 * <p>Remark     : </p>
 * @author ren.hui@neusoft.com
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> 修改历史</p>
 * <p>  序号		日期		修改人			修改原因</p>
 * <p>   1                                       </p>
 */
public interface OrganDAO extends BaseDao {
	public static final String BEAN = "organDAO";
	
	/**
	 * 得到所有组织机构信息集合
	 * @return OrganColl
	 * @throws DataAccessException
	 */
	public OrganColl getAllOrganInfo() throws DataAccessException;
	
	public OrganColl getAllOrganInfo(String organId) throws DataAccessException;
	
	public OrganColl getOrganInfo(String organId) throws DataAccessException;
	/**
	 * 根据主键查找记录
	 * @param organId
	 * @return 
	 * @throws DataAccessException
	 */
	public OrganVO getOrganInfoById(String organId) throws DataAccessException;
	/**
	 * 根据区域代码查找组织机构集合
	 * @param areaId
	 * @return 
	 * @throws DataAccessException
	 */
	public OrganColl getOrganInfoByAreaId(String areaId) throws DataAccessException;
	/**
	 * 根据过滤条件查询
	 * @param areaId
	 * @return 
	 * @throws DataAccessException
	 */
	public OrganVO getOrganInfoFilter(Map filter) throws DataAccessException;
	/**
	 * 根据组织机构编码,查找该组织机构的下级机构
	 * @param organId
	 * @return OrganColl
	 * @throws DataAccessException
	 */
	public OrganColl getChildOrganInfo(String organId) throws DataAccessException;
	/**
	 * 根据组织机构类型查询所有属于该类型的组织机构信息
	 * @param organKind
	 * @return OrganColl
	 * @throws DataAccessException
	 */
	public OrganColl getOrganInfoByOrganKind(int organKind) throws DataAccessException;
	/**
	 * 增加一条记录到组织机构表中
	 * @param vo
	 * @return
	 * @throws DataAccessException
	 */
	public int doAddOrgan(OrganVO vo) throws DataAccessException;
	/*
	 * 通过存储过程增加记录
	 * @param vo
	 * @return
	 * @throws DataAccessException
	 *
	public int doAddOrganByProc(OrganVO vo) throws DataAccessException;*/
	/**
	 * 根据主键删除一条记录
	 * @param organId
	 * @return
	 * @throws DataAccessException
	 */
	public int doDeleteOrganById(String organId) throws DataAccessException;
	/**
	 * 根据主键修改记录
	 * @param vo
	 * @return
	 * @throws DataAccessException
	 */
	public int doModifyOrganById(OrganVO vo) throws DataAccessException;

	/**
	 * 获得两个级别之间区域所有的组织机构
	 * @param level1
	 * @param level2
	 * @return
	 * @throws DataAccessException
	 */
	public OrganColl getOrganByAreaLevel(int level1, int level2) throws DataAccessException;
	
	/**
	 * 判断是否存在重名
	 * @return
	 * @throws DataAccessException
	 */
	public boolean repeatedName(String areaId, String organName) throws DataAccessException;
	/**
	 * 返回应用连接
	 * @return
	 * @throws DataAccessException
	 */
	public String getAppContainer(String key) throws DataAccessException;
	/**
	 * 得到省份(minLevel)及以下级，输入areaId以上级和areaId确定的区域，之间的所有区域中组织机构的集合
	 * @param minLevel
	 * @param areaId
	 * @return
	 * @throws DataAccessException
	 */
	public OrganColl getOrganCollByAuthAreaId(String areaId) throws DataAccessException;
	
	/**
	 * 得到某区域的组织机构集合 -- innerTree使用
	 * @param areaId
	 * @return
	 * @throws DataAccessException
	 */
	public Vector getOrgsByAreaId(String areaId) throws DataAccessException;
	
	/**
	* 得到可以作为上级职能部门的组织机构集合
	*/
	public OrganColl getOrganCollByAreaId(String areaId,String organId) throws DataAccessException;
	
	public OrganKindColl getOrganKindColl() throws DataAccessException;

	/**
	 * 对特权管理员，在权限系统中可以看见其归属区域中所有部门及这些部门下属的所有部门
	 * @param areaId
	 * @param adminType
	 * @return
	 * @throws DataAccessException
	 */
	public OrganColl getOrganByAreaForOM(String areaId) throws DataAccessException;

	/**
	 * 得到组织机构所在区域，及以下级的区域集合
	 * @param organId
	 * @return
	 * @throws DataAccessException
	 */
	public AreaColl getChildAreaCollByOrganId(String organId) throws DataAccessException;
	
	public OrganColl getSelfAndChildren(String organId) throws DataAccessException;
	
	/**
	 * 根据组织机构类型查询组织机构信息
	 * @param minLevel
	 * @param areaId
	 * @return
	 * @throws DataAccessException
	 */
	public OrganVO getOrganCollByKind4PPM(String organKind,String areaId) throws DataAccessException;
	
	/**
	 * 只为PPM使用，查询部门的方法
	 * @param organId
	 * @return
	 * @throws DataAccessException
	 */
	public OrganVO getOrganInfoById4PPM(String organId) throws DataAccessException;
	
	/**
	 * 根据组织机构ID查询组织结构
	 * @param organId
	 * @return
	 * @throws DataAccessException
	 */
	public OrganColl getSelfAndChildren4PPM(String organId) throws DataAccessException;
	
}
