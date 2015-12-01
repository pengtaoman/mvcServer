/*
 * Created on 2005-1-7
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.om.action.employeeduty;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.om.bo.EmployeeManagementBO;
import com.neusoft.om.dao.employee.EmployeeColl;
import com.neusoft.tdframework.context.FrameAppContext;
import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.web.struts.BaseAction;

/**
 * @author Administrator
 *
 * ��ѯһ��ְ���Ӧ�����в���Ա��Ϣ
 */
public class EmployeeListQueryByDuty extends BaseAction{

	/* (non-Javadoc)
	 * @see com.neusoft.tdframework.web.struts.BaseAction#service(org.apache.struts.action.ActionMapping, org.apache.struts.action.ActionForm, javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse)
	 */
	public ActionForward service(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws ActionException {
		String alertMessage = "";
		
		String areaId = request.getParameter("AreaId");
		String organId = request.getParameter("OrganId");
		String dutyId = request.getParameter("DutyId");
		
		EmployeeManagementBO employeeManagementBO = (EmployeeManagementBO)getBaseService().getServiceFacade(EmployeeManagementBO.BEAN);
		
		HashMap mapData = new HashMap();
		if(areaId==null) areaId="";
		mapData.put("areaId",areaId);
		
		if(organId==null) organId="";
		mapData.put("organId",organId);
		
		if(dutyId==null) dutyId="";
		mapData.put("dutyId",dutyId);

		try {
			EmployeeColl employeeColl = employeeManagementBO.getEmployeeInfo(mapData);
			request.setAttribute("employeeColl",employeeColl);
		} catch (ServiceException e) {
			//e.printStackTrace();
			alertMessage = "��ѯ��֯������ְԱ��Ϣʧ�ܣ�" + e.getMessage();
		}
		request.setAttribute("operType","query");
		return mapping.findForward("employeeListQueryByDuty");
	}
	
	public static void main(String args[]) {
		HashMap mapData = new HashMap();
		mapData.put("areaId","050501");
		mapData.put("organId","");
		mapData.put("dutyId","");
		
		try {
			EmployeeColl employeeColl = ((EmployeeManagementBO)FrameAppContext.getBean(EmployeeManagementBO.BEAN)).getEmployeeInfo(mapData);
			System.out.println(employeeColl.getRowCount());
		} catch (ServiceException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
}
