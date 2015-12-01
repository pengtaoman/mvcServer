/**
 * EmployeeManagementSoapBindingImpl.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package com.neusoft.om.bo;

import com.neusoft.om.dao.employee.EmployeeDAO;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;

public class EmployeeManagementSoapBindingImpl implements com.neusoft.om.bo.EmployeeManagement{
 
	
	public EmployeeInfoResp doSynFromAuthPlat(EmployeeInfoReq employeeInfo) throws java.rmi.RemoteException {
        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");
        EmployeeDAO employeeDAO = (EmployeeDAO) factory.getInteractionObject("employeeDAO",appContext);
        return employeeDAO.doSynFromAuthPlat(employeeInfo);
//		EmployeeInfoResp resp = new EmployeeInfoResp();
//		resp.setRetFlag(0);
//		resp.setRetMsg("success");
//		return resp;
	}

}
