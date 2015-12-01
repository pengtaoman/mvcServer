package com.neusoft.tdframework.license;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.tdframework.demo.bo.staffer.OptrMaintBo;
import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.web.struts.TDDispatchAction;
import com.neusoft.unieap.util.RequestUtil;
import com.neusoft.unieap.util.ResponseUtil;

public class LicenseViewAction extends TDDispatchAction{
	public ActionForward query(ActionMapping actionMapping,
			ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws ActionException {
		//int DEFAULT_PAGE_SIZE=5;
		List list = LicenseUtil.getLicenseColl();
		int totalRows = list.size();
		
    	int[] startEnd = getStartEnd(request,totalRows,10);
/*    	if(totalRows>0){
    		records=getOptrs(request, bo,startEnd[0],startEnd[1]);
    		//ecords=getRecords(startEnd[0],startEnd[1]);
    	}
*/		request.setAttribute("lics", list);
		request.setAttribute("totalRows",new Integer(totalRows));

		return actionMapping.findForward("query");
	}  
	public ActionForward detail(ActionMapping actionMapping,
			ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws ActionException {
		//int DEFAULT_PAGE_SIZE=5;
		String menuId = (String)request.getParameter("menuId");
		LicenseVO vo = LicenseUtil.getLicenseVO(menuId);
		
		request.setAttribute("vo", vo);

		return actionMapping.findForward("detail");
	}  
	public ActionForward sub(ActionMapping actionMapping,
			ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws ActionException {
		//int DEFAULT_PAGE_SIZE=5;
		String menuId = (String)request.getParameter("menuId");
		String projectName = (String)request.getParameter("projectName");
		String projectNo = (String)request.getParameter("projectNo");
		String licenseNo = (String)request.getParameter("licenseNo");
		String expiredDate = (String)request.getParameter("expiredDate");
		LicenseVO vo = new LicenseVO();
		vo.setMenuId(menuId);
		vo.setExpiredDate(expiredDate);
		vo.setLicenseNo(licenseNo);
		vo.setProjectName(projectName);
		vo.setProjectNo(projectNo);
		//LicenseVO vo = LicenseUtil.getLicenseVO(menuId);
		LicenseMaintenanceUtil.addLicense(vo);
		//request.setAttribute("vo", vo);

		return query(actionMapping,actionForm, request,response);
	}  
	public ActionForward remove(ActionMapping actionMapping,
			ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws ActionException {
		//int DEFAULT_PAGE_SIZE=5;
    	RequestUtil requestUtil=new RequestUtil(request);
        ResponseUtil responseUtil=new ResponseUtil(response);

        String[] menuids=request.getParameterValues("chkbx_menuid");
        LicenseMaintenanceUtil.removeLicenses(menuids);
		return query(actionMapping,actionForm, request,response);
	}  

}
