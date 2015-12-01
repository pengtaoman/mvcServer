package com.neusoft.om.dao.region;

import java.util.Map;
import java.util.Vector;

import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

/**brief description
 * <p>Date       : 2004-11-01</p>
 * <p>Module     : om</p>
 * <p>Description: area maintenance</p>
 * <p>Remark     : </p>
 * @author renh
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> 修改历史</p>
 * <p>  序号		日期		修改人			修改原因</p>
 * <p>   1                                       </p>
 */
public interface RegionDAO extends BaseDao {
	
	public static final String BEAN = "areaDAO";
	//public static final AreaDAO instance = (AreaDAO)OMAppContext.getBean(BEAN);
	/**
	 * 根据主键查行政区域信息
	 * @param areaId
	 * @return AreaVO
	 * @throws DataAccessException
	 */
	public AreaVO getAreaById(String areaId) throws DataAccessException;
	/**
	 * 得到全部行政区域结果集
	 * @return
	 * @throws DataAccessException
	 */
	public AreaColl getAreaAllInfo() throws DataAccessException;
	
	public AreaColl getAreaAllInfo(String areaId) throws DataAccessException;
	
	public AreaColl getAreaInfoByOrgan(String organId) throws DataAccessException;
	/**
	 * 根据areaId得到包括areaId及其子下级区域的所有区域
	 * @param areaId
	 * @return
	 * @throws DataAccessException
	 */
	public AreaColl getAreaChildColl(String areaId) throws DataAccessException;
	/**
	 * 根据行政区域Id得到上级行政区域的级别
	 * @param areaId 
	 * @return areaLevel
	 * @throws DataAccessException
	 */
	public int getAreaLevelByAreaId(String areaId) throws DataAccessException;
	/**
	 * 根据行政区域编码得到行政区域名字
	 * @param areaId
	 * @return
	 * @throws DataAccessException
	 */
	public String getAreaNameByAreaId(String areaId) throws DataAccessException;
	/**
	 * 增加行政区域信息
	 * @param areaVO
	 * @return 1:成功 0:失败
	 * @throws DataAccessException
	 */
	public int doAddAreaInfo(RegionVO areaVO) throws DataAccessException;
	/**
	 * 增加行政区域信息--ylm
	 * @param areaVO
	 * @return
	 * @throws DataAccessException
	 */
	public String addAreaInfo(RegionVO vo) throws DataAccessException;
	/**
	 * 修改行政区域信息
	 * @param areaVO
	 * @return 1:成功 0:失败
	 * @throws DataAccessException
	 */
	public int doModifyAreaInfo(AreaVO areaVO) throws DataAccessException;
	/**
	 * 修改行政区域信息--ylm
	 * @param areaVO
	 * @return
	 * @throws DataAccessException
	 */
	public int modifyAreaInfo(AreaVO vo) throws DataAccessException;
	/**
	 * 根据主键删除行政区域信息
	 * @param areaId
	 * @return 1:成功 0:失败
	 * @throws DataAccessException
	 */
	public int doDeleteAreaInfo(String areaId) throws DataAccessException;
	
	public AreaColl getAreaInnerTree() throws DataAccessException;
	
	/**
	 * 根据cityCode得到AreaVO
	 * @param cityCode
	 * @return
	 * @throws DataAccessException
	 */
	public AreaVO getAreaByCityCode(String cityCode) throws DataAccessException;

	/**
	 * 得到属于两个级别之间的区域集合
	 * @param level1
	 * @param level2
	 * @return
	 * @throws DataAccessException
	 */
    public AreaColl getAreaByLevel(int level1, int level2) throws DataAccessException;
    /**
     * 得到省份(minLevel)及以下级，输入areaId以上级和areaId确定的区域，之间的所有区域集合
     * @param areaId
     * @return
     * @throws DataAccessException
     */
    public AreaColl getAreaCollByAuthAreaId(String areaId) throws DataAccessException;
    /**
     * 根据查询条件获得区域信息集合
     * @param dataMap
     * @return
     * @throws DataAccessException
     */
    public AreaColl getAreaColl(Map dataMap) throws DataAccessException;
    /**
     * 根据查询条件获得区域信息集合总行数
     * @param dataMap
     * @return
     * @throws DataAccessException
     */
    public int getAreaRowCount(Map dataMap) throws DataAccessException;
    /**
     * 根据查询条件获得区域信息集合
     * @param dataMap
     * @return
     * @throws DataAccessException
     */
    public AreaColl getAreaCollInfo(Map dataMap) throws DataAccessException;
    /**
     * 得到上级区域下最大的areaId
     * @param parentAreaId
     * @return
     * @throws DataAccessException
     */
    public String getMaxAreaId(String parentAreaId) throws DataAccessException;
    /**
     * 根据操作员的区域级别获取第一个的区域信息
     * @param parentAreaId
     * @return
     * @throws DataAccessException
     */
    public String getFirseAreaInfo(int areaLevel) throws DataAccessException;
    /**
     * 根据操作员的区域代码获取所有的区域信息
     * @param parentAreaId
     * @return
     * @throws DataAccessException
     */
    public Vector getAllAreaInfo(String areaId,int areaLevel) 
    	throws DataAccessException;
    /**
     * 根据上级的区域代码获取新增区域的区域级别
     * @param parentAreaId
     * @return
     * @throws DataAccessException
     */
    public ParamObjectCollection getAreaLevelByParent(String areaId) 
    	throws DataAccessException;
    /**
     * 根据区域代码获取新增区域的区域级别
     * @param parentAreaId
     * @return
     * @throws DataAccessException
     */
    public ParamObjectCollection getAreaLevelById(String areaId) 
    	throws DataAccessException;
    
    /**
     * 根据登录账号得到其可以查看的地市信息列表
     * @param employeeId
     * @return
     * @throws DataAccessException
     */
    public ParamObjectCollection getAreaCollByEmp(String employeeId) 
    	throws DataAccessException;
    
    /**
     * 根据地市编码得到其下属区县的集合
     * @param areaId
     * @return
     * @throws DataAccessException
     */
    public AreaColl getCountryColl(String areaId) throws DataAccessException;
    /**
     * 根据area_id和 areaLevel构造innerTree
     * @param areaId
     * @param areaLevel
     * @return
     * @throws DataAccessException
     */
    public Vector getAreaVec(String areaId,int areaLevel) 
		throws DataAccessException;
    
    public Map getAllCityColl() throws DataAccessException;
}
