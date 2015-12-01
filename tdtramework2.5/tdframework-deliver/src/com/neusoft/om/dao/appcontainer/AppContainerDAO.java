package com.neusoft.om.dao.appcontainer;

import java.util.List;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

/**brief description
 * <p>Date       : 2006-10-23</p>
 * <p>Module     : om</p>
 * <p>Description: Ϊ������֤�ṩ�Ľӿڣ�ͨ��menu_t��container�ֶλ�ö�Ӧ��Ӧ��</p>
 * <p>Remark     : </p>
 * @author zhaof@neusoft.com
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> �޸���ʷ</p>
 * <p>  ���		����		�޸���			�޸�ԭ��</p>
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
