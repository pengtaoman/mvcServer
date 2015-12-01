package com.neusoft.om.bo;

import com.neusoft.om.dao.servicekind.ServiceKindDAO;
import com.neusoft.tdframework.exception.ServiceException;

public class ServiceKindBOImpl implements ServiceKindBO {
	
	private ServiceKindDAO serviceKindDAO=null;
	
	public void setServiceKindDAO(ServiceKindDAO serviceKindDAO) {
		this.serviceKindDAO = serviceKindDAO;
	}
	
	public int getServiceKind(String serviceId,String areaCode)throws ServiceException{		
		return serviceKindDAO.getServiceKind(serviceId,areaCode);
	}

}
