/*
 * Created on 2005-5-27
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.om.bo;

import com.neusoft.om.dao.work.WorkColl;
import com.neusoft.tdframework.core.BaseBO;
import com.neusoft.tdframework.exception.ServiceException;

/**
 * @author renh
 *
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
public interface WorkBO extends BaseBO  {
	
	public static final String BEAN = "workFacade";
	/**
	 * ���ݸ��˵���ʶ,����Ա��Ż�øò���Ա�Ĳ˵���Ϣ
	 * @param organId
	 * @return
	 * @throws ServiceException
	 */
	public WorkColl getWorkInfoByEmployeeId(String parentMenuId,String employeeId) throws ServiceException;

}
