/*
 * Created on 2005-1-7
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.om.action.employeeduty;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.om.bo.DutyEmployeeRelationMaintanceBO;
import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.web.struts.BaseAction;

/**
 * @author Administrator
 *
 * ����֯���������Ӳ���Ա��Ϣ
 * 
 */
public class AddEmployeeToDutyAction extends BaseAction{

	/* (non-Javadoc)
	 * @see com.neusoft.tdframework.web.struts.BaseAction#service(org.apache.struts.action.ActionMapping, org.apache.struts.action.ActionForm, javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse)
	 */
	public ActionForward service(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws ActionException {
		String alertMessage = "���Ӳ���Ա�ɹ�";	
		String areaId = request.getParameter("areaId");
		String organId = request.getParameter("organId");
		int dutyId = Integer.parseInt(request.getParameter("dutyId"));
		String operType = "add";
		String employeeIds = request.getParameter("employeeId");
		String employeeId[] = employeeIds.split(",");
		
		DutyEmployeeRelationMaintanceBO edrBO = (DutyEmployeeRelationMaintanceBO)getBaseService().getServiceFacade(DutyEmployeeRelationMaintanceBO.BEAN);
		
		try {
			edrBO.doAddPartTimeEmployeeInfo(areaId,organId,dutyId,employeeId);
		} catch (ServiceException e) {
			//e.printStackTrace();
			alertMessage = "��ְ�������Ӳ���Աʧ�ܣ�" + e.getMessage();
		}
		request.setAttribute("alertMessage",alertMessage);
		request.setAttribute("operType",operType);
		return mapping.findForward("addEmployeeToDuty");
	}

}
