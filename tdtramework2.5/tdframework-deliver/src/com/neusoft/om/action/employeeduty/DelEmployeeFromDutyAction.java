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
 * 在组织机构中增加操作员信息
 * 
 */
public class DelEmployeeFromDutyAction extends BaseAction{

	/* (non-Javadoc)
	 * @see com.neusoft.tdframework.web.struts.BaseAction#service(org.apache.struts.action.ActionMapping, org.apache.struts.action.ActionForm, javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse)
	 */
	public ActionForward service(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws ActionException {
		String alertMessage = "删除职员和职务对应关系成功";
		
		String areaId = request.getParameter("areaId");
		String organId = request.getParameter("organId");
		int dutyId = Integer.parseInt(request.getParameter("dutyId"));
		
		String employeeId = request.getParameter("employeeId");
		
		DutyEmployeeRelationMaintanceBO edrBO = (DutyEmployeeRelationMaintanceBO)getBaseService().getServiceFacade(DutyEmployeeRelationMaintanceBO.BEAN);
		
		try {
			edrBO.doDelPartTimeEmployeeInfo(areaId,organId,dutyId,employeeId);
		} catch (ServiceException e) {
			//e.printStackTrace();
			alertMessage = "在职务中删除职员失败：" + e.getMessage();
		}
		request.setAttribute("alertMessage",alertMessage);
		request.setAttribute("operType","delete");
		return mapping.findForward("delEmployeeFromDuty");
	}

}
