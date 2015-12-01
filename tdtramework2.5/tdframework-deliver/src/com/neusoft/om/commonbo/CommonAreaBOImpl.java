package com.neusoft.om.commonbo;

import com.neusoft.om.dao.area.AreaColl;
import com.neusoft.om.dao.area.AreaDAO;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.tdframework.common.GlobalParameters;

/**brief description
 * <p>Date       : 2004-11-01</p>
 * <p>Module     : om</p>
 * <p>Description: ��������ά��</p>
 * <p>Remark     : </p>
 * @author renh
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> �޸���ʷ</p>
 * <p>  ���		����		�޸���			�޸�ԭ��</p>
 * <p>   1                                       </p>
 */

public class CommonAreaBOImpl implements CommonAreaBO{
	private AreaDAO areaDAO;

	public void setAreaDAO(AreaDAO maintenanceDAO) {
		areaDAO = maintenanceDAO;
	}

	public AreaColl getAreaChildColl(String areaId) throws ServiceException {
		AreaColl areaColl = null;
		try{
			areaColl = areaDAO.getAreaChildColl(areaId);
		}catch(DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"CommonAreaBOImpl--getAreaChildColl :"+e.getMessage());
			throw new ServiceException(e);
		}
		return areaColl;
	}
	
} 