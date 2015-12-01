package com.neusoft.om.omutil;
import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

/**brief description
 * <p>Date       : 2004-12-12</p>
 * <p>Module     : om</p>
 * <p>Description: </p>
 * <p>Remark     : </p>
 * @author ren.hui@neusoft.com
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> 修改历史</p>
 * <p>  序号		日期		修改人			修改原因</p>
 * <p>   1                                       </p>
 */
public interface OmUtilDAO extends BaseDao{
	public static final String BEAN = "omUtilDAO";
	/**
	 * 返回传入的日期与当前系统时间的差值,格式:yyyymmddhh或者yyyymmddhhmiss
	 * @param compareDate
	 * @return
	 * @throws DataAccessException
	 */
	public int getEffectDays(String compareDate)throws DataAccessException;
	/**
	 * 当前系统时间+numDays 后的时间,返回格式 yyyymmddhh24miss
	 * @param numDays
	 * @return
	 * @throws DataAccessException
	 */
	public String getDays(int numDays)throws DataAccessException;
	/**
	 * 根据区域编号得到分区地市
	 * @param areaId
	 * @return
	 * @throws DataAccessException
	 */
	public String getPartCity(String areaId) throws DataAccessException;
	/**
     * 查询所属渠道名称信息
     * @param name
     * @return
     * @throws DataAccessException
     */
     public String getDealerNameById(String dealerId) throws DataAccessException;
     /**
      * 查询渠道所属部门信息
      * @param name
      * @return
      * @throws DataAccessException
      */
      public String getRegionCodeById(String dealerId) throws DataAccessException;

}
