package com.neusoft.om.omutil;

import com.neusoft.tdframework.core.BaseBO;
import com.neusoft.tdframework.exception.ServiceException;

public interface PowerBO extends BaseBO{
	
	public boolean haveRightByPageLink(String employeeId, String pageLink) throws ServiceException;
	
	public boolean haveRightByMenuId(String employeeId, String pageLink) throws ServiceException;
}
