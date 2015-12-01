package com.neusoft.om.interfase.authorize;

import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.core.BaseBO;
import com.neusoft.tdframework.exception.ServiceException;

public interface MoreCityBO extends BaseBO{

	/**
	 * 根据职员编码，返回其可以受理的地市集合，专为框架使用
	 * @param employeeId
	 * @return
	 * @throws ServiceException
	 */
	public ParamObjectCollection getMoreCityColl(String employeeId) throws ServiceException;
	
	
}
