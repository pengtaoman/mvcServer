package com.neusoft.om.bo;

import com.neusoft.tdframework.core.BaseBO;
import com.neusoft.tdframework.exception.ServiceException;

public interface ServiceKindBO {
	
	public static final String BEAN ="serviceKindBO";
	public int getServiceKind(String serviceId,String areaCode)throws ServiceException;

}
