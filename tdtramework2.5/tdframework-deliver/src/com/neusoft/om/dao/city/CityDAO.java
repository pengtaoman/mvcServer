package com.neusoft.om.dao.city;

import com.neusoft.popedom.City;
import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

/**brief description
 * <p>Date       : 2007-04-18</p>
 * <p>Module     : om</p>
 * <p>Description: city maintenance</p>
 * <p>Remark     : 修改popedom中的方法</p>
 * @author zhaof
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> 修改历史</p>
 * <p>  序号		日期		修改人			修改原因</p>
 * <p>   1                                       </p>
 */
public interface CityDAO extends BaseDao{
	public City getCityByRegion(String region_code) throws DataAccessException;
}
