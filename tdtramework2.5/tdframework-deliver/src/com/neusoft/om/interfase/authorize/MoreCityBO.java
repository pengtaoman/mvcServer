package com.neusoft.om.interfase.authorize;

import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.core.BaseBO;
import com.neusoft.tdframework.exception.ServiceException;

public interface MoreCityBO extends BaseBO{

	/**
	 * ����ְԱ���룬�������������ĵ��м��ϣ�רΪ���ʹ��
	 * @param employeeId
	 * @return
	 * @throws ServiceException
	 */
	public ParamObjectCollection getMoreCityColl(String employeeId) throws ServiceException;
	
	
}
