/*
 * Created on 2005-5-27
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.om.action.work;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.om.bo.DynamicListBO;
import com.neusoft.om.bo.WorkBO;
import com.neusoft.om.dao.system.SystemColl;
import com.neusoft.om.dao.work.WorkColl;
import com.neusoft.tdframework.authorization.AuthorizeVO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.tdframework.web.struts.BaseAction;

public class WorkAction extends BaseAction {
	public ActionForward service(
		ActionMapping mapping,
		ActionForm form,
		HttpServletRequest request,
		HttpServletResponse response)
		throws ActionException{
			String message = "";
			WorkColl coll = null;
			WorkBO service =(WorkBO)getBaseService().getServiceFacade("workFacade");
			DynamicListBO serviceDynamicList = (DynamicListBO)getBaseService().getServiceFacade(DynamicListBO.BEAN);
			String parentMenuId = request.getParameter("menuID")==null?"":request.getParameter("menuID").trim();;
			//得到employeeId
			AuthorizeVO authvo = (AuthorizeVO) request.getSession().getAttribute(GlobalParameters.SESSION_INFO);
			String employeeId = authvo.getEmployeeId();
			
			//得到工作区信息
			try {
				coll = service.getWorkInfoByEmployeeId(parentMenuId,employeeId);
			} catch (ServiceException e) {
				SysLog.writeLogs("om",GlobalParameters.ERROR,"WorkAction--getWorkInfoByEmployeeId:"+e.getMessage());
				message = "发生异常!"+e.getMessage();	
				request.setAttribute("Message",message);
				return mapping.findForward("result");			
			}
			if(coll.getRowCount()< 1){
				
				return mapping.findForward("notFound");
				
			}
			//得到系统信息
			SystemColl systemColl = null;
			try{
				systemColl = serviceDynamicList.getAllSystemList();
			}catch (ServiceException e) {
				SysLog.writeLogs("om",GlobalParameters.ERROR,"WorkAction--getWorkInfoByEmployeeId:"+e.getMessage());
				message = "获得系统标是数据失败!"+e.getMessage();			
			}
			
			request.setAttribute("WorkColl",coll);
			request.setAttribute("SystemColl",systemColl);
			request.setAttribute("Message",message);
			return mapping.findForward("result");	
		}
}
		
		



