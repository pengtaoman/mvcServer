package com.neusoft.om.dao.appcontainer;

import java.util.List;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

/**brief description
 * <p>Date       : 2006-10-23</p>
 * <p>Module     : om</p>
 * <p>Description: 为单点认证提供的接口，通过menu_t中container字段获得对应的应用</p>
 * <p>Remark     : </p>
 * @author zhaof@neusoft.com
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> 修改历史</p>
 * <p>  序号		日期		修改人			修改原因</p>
 * <p>   1                                       </p>
 */
public interface AppContainerDAO extends BaseDao{ 
	/**
	 * 
	 * @param containerFlag
	 * @return
	 * @throws DataAccessException
	 */
	public String getAppContainer(int containerFlag) throws DataAccessException;
	public List getHostNames();
	public String getCacheObjectName(String appName, String cacheKey);
	public List getAppNames();
	public List getAppNamesForCompress(boolean isTDFrameworkCompress);

}
