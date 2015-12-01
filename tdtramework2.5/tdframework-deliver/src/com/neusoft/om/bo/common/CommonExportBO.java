package com.neusoft.om.bo.common;

import java.util.Vector;

import com.neusoft.om.dao.area.AreaColl;
import com.neusoft.om.dao.area.AreaDAO;
import com.neusoft.om.dao.area.AreaVO;
import com.neusoft.tdframework.core.BaseBO;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.exception.ServiceException;

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

public interface CommonExportBO extends BaseBO {
	public static final String BEAN = "areaFacade";
	/**
	 * 设置AreaDAO
	 * @param dao
	 */
	public void setAreaDAO(AreaDAO dao);
	/**
	 * 根据行政区域Id查询行政区域信息
	 * @param areaId
	 * @return AreaVO
	 * @throws ServiceException
	 */
	public AreaVO getAreaInfoById(String areaId) throws ServiceException;
	/**
	 * 得到所有行政区域信息
	 * @return
	 * @throws ServiceException
	 */
	public AreaColl getAreaAllInfo() throws ServiceException;
	/**
	 * 修改行政区域信息
	 * @param areaVO
	 * @return 1:成功 0:失败
	 * @throws ServiceException
	 */
	public int doModifyAreaInfo(AreaVO areaVO) throws ServiceException;
	/**
	 * 修改行政区域信息--ylm
	 * @param areaVO
	 * @return
	 * @throws DataAccessException
	 */
	public String modifyAreaInfo(AreaVO vo) throws ServiceException;
	/**
	 * 增加行政区域信息
	 * @param areaVO
	 * @return 1:成功 0:失败
	 * @throws ServiceException
	 */
	public int doAddAreaInfo(AreaVO areaVO) throws ServiceException;
	/**
	 * 根据行政区域ID删除信息
	 * @param areaId
	 * @return 1:成功 0:失败
	 * @throws ServiceException
	 */
	public int doDeleteAreaInfoById(String areaId) throws ServiceException;
	/**
	 * 根据areaId得到分区地市信息
	 * @param areaId
	 * @return String
	 * @throws ServiceException
	 */
	public String getPartCityByAreaId(String areaId) throws ServiceException;
    
    /**
     * 根据行政区域Id得到上级行政区域的级别
     * @param areaId 
     * @return areaLevel
     * @throws DataAccessException
     */
    public int getAreaLevelByAreaId(String areaId) throws ServiceException;
    /**
     * 根据操作员的区域代码获取所有的区域信息
     * @param areaId areaLevel
     * @return areaLevel
     * @throws DataAccessException
     */
    public Vector getAllAreaInfo(String areaId,int areaLevel) throws ServiceException;
    
    
    
}
