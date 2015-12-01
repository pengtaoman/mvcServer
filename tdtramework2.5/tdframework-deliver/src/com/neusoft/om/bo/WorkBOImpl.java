/*
 * Created on 2005-5-27
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.om.bo;

import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.SysLog;

import com.neusoft.om.dao.work.WorkColl;
import com.neusoft.om.dao.work.WorkDAO;

/**
 * @author renh
 *
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
public class WorkBOImpl implements WorkBO{
	private WorkDAO workDAO;
  	
  	public WorkColl getWorkInfoByEmployeeId(String parentMenuId,String employeeId) throws ServiceException {
		WorkColl coll = null;
		try{
			coll = workDAO.getAllWorkInfoByEmployeeId(parentMenuId,employeeId);
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"WorkBOImpl--getWorkInfoByEmployeeId-1 :"+e.getMessage());
			throw new ServiceException(e);
		}
		return coll;
  	} 
  	
  	public void setWorkDAO(WorkDAO workDAO){
		this.workDAO = workDAO;
  	}
}
