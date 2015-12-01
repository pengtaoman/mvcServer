package com.neusoft.om.commonbo;

import com.neusoft.om.dao.area.AreaColl;
import com.neusoft.om.dao.area.AreaDAO;
import com.neusoft.tdframework.core.BaseBO;
import com.neusoft.tdframework.exception.ServiceException;

/**brief description
 * <p>Date       : 2006-09-12</p>
 * <p>Module     : om</p>
 * <p>Description: 提供给业务系统直接调用的BO接口</p>
 * <p>Remark     : </p>
 * @author zhaof
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> 修改历史</p>
 * <p>  序号		日期		修改人			修改原因</p>
 * <p>   1                                       </p>
 */

public interface CommonAreaBO extends BaseBO {
	public static final String BEAN = "commonAreaBO";
	/**
	 * 设置AreaDAO
	 * @param dao
	 */
	public void setAreaDAO(AreaDAO dao);
    
	/**
	 * 根据areaId得到包括areaId及其子下级区域的所有区域
	 * @param areaId
	 * @return
	 */
	public AreaColl getAreaChildColl(String areaId) throws ServiceException;;
}
