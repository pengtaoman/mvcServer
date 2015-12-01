/*
 * Created on 2005-2-19
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.om.interfase.crmmodule;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import com.neusoft.om.bo.DutyBO;
import com.neusoft.om.bo.EmployeeManagementBO;
import com.neusoft.om.bo.OrganManagementBO;
import com.neusoft.om.dao.duty.DutyVO;
import com.neusoft.om.dao.employee.EmployeeColl;
import com.neusoft.om.dao.organ.OrganVO;
import com.neusoft.om.dao.organdisplay.OrganDisplayColl;
import com.neusoft.om.dao.page.PageDAO;
import com.neusoft.tdframework.authorization.AuthorizeUtil;
import com.neusoft.tdframework.context.FrameAppContext;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;

/**
 * @author chenzt
 *
 * 调用权限的相应BO接口,返回相关VO对象, 为CRM系统提供相关数据接口.
 * CRM系统对该接口和相关VO形成依赖.
 * 
 */
public class OrganInterface {
	
	/**
	 * 根据当前操作员地市信息得到操作员所在地市及其下级地市的组织机构信息
	 * @param request
	 * @return
	 * @throws ServiceException
	 */
	public static OrganDisplayColl getOrganDisplayColl(HttpServletRequest request) throws ServiceException{
		String areaId = AuthorizeUtil.getAuthorize(request).getAreaId();
        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");
        OrganManagementBO service = (OrganManagementBO) factory.getInteractionObject(OrganManagementBO.BEAN, appContext);
		
		OrganDisplayColl coll = service.getOrganDisplayInfo(areaId);
		return coll;
	}
	
	/**
	 * 根据区域编号,组织机构编号,职务编号查询职员信息集合
	 * 支持areaId,organId,dutyId模糊查询
	 * @param request
	 * @param areaId
	 * @param organId
	 * @param dutyId
	 * @return EmployeeColl
	 * @throws ServiceException
	 */
	public static EmployeeColl getEmployeeColl(HttpServletRequest request,String areaId,String organId,String dutyId) throws ServiceException {
		EmployeeManagementBO employeeManagementBO = (EmployeeManagementBO)FrameAppContext.getBean(request.getSession().getServletContext(),EmployeeManagementBO.BEAN);
		if(areaId == null) areaId = "";
		if(organId == null) organId = "";
		if(dutyId == null) dutyId = "";
		HashMap mapData = new HashMap();
		mapData.put("areaId",areaId);
		mapData.put("organId",organId);
		mapData.put("dutyId",dutyId);
		EmployeeColl coll = employeeManagementBO.getEmployeeInfo(mapData);
		return coll;	
	}
	/**
	 * 根据职务编号得到职务对象
	 * @param request
	 * @param dutyId
	 * @return dutyName
	 * @throws ServiceException
	 */
	public static String getDutyName(HttpServletRequest request,int dutyId) throws ServiceException{
		DutyBO dutyBO = (DutyBO)FrameAppContext.getBean(request.getSession().getServletContext(),DutyBO.BEAN);
		DutyVO dutyVO = dutyBO.getDutyInfoByDutyId(dutyId);
		return dutyVO.getDutyName();	
	}
	/**
	 * 根据组织机构编号得到组织机构对象
	 * @param request
	 * @param organId
	 * @return organVO
	 * @throws ServiceException
	 */
	public static String getOrganName(HttpServletRequest request,String organId) throws ServiceException{
		OrganManagementBO organManagementBO =(OrganManagementBO)FrameAppContext.getBean(request.getSession().getServletContext(),OrganManagementBO.BEAN);
		OrganVO organVO = organManagementBO.getOrganInfoByOrganId(organId);
		return organVO.getOrganName();
	}
	
}
