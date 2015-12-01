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

import com.neusoft.om.bo.OrganManagementBO;
import com.neusoft.om.dao.organdisplay.OrganDisplayColl;
import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.web.struts.BaseAction;

/**
 * @author chenzt
 *
 * 执行组织机构查询的Action
 * 
 * Add notes by liudong: 这里得到的组织树数据与“组织管理里面” 不一样，这里得到的数据是带有职务的组织树数据。这里是要把组织中一些人付给在组织树上选中的职务。
 */
public class OrganDutyDisplayAction extends BaseAction{
	
	/* (non-Javadoc)
	 * @see com.neusoft.tdframework.web.struts.BaseAction#service(org.apache.struts.action.ActionMapping, org.apache.struts.action.ActionForm, javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse)
	 */
	public ActionForward service(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws ActionException {
		String forwardPage = request.getParameter("forwardPage");   //？？The forwardPage object is never used.(l-dong@neusoft.com)
		String alertMessage = "";
		
		String areaId = getAuthorize(request).getAreaId();
		OrganManagementBO organservice =(OrganManagementBO)getBaseService().getServiceFacade(OrganManagementBO.BEAN);
		try {
			OrganDisplayColl organDisplayColl = organservice.getOrganDisplayInfoIncludeDuty(areaId);
			request.setAttribute("organDisplayColl",organDisplayColl);
		} catch (ServiceException e) {
			//e.printStackTrace();
			alertMessage = "查询组织机构列表失败：" + e.getMessage();
		}
		
		request.setAttribute("alertMessage",alertMessage);
		request.setAttribute("operType","organDisplay");
		return mapping.findForward("organDutyDisplay");
	}

}
