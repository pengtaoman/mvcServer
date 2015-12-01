package com.neusoft.tdframework.home.action;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.om.dao.menu.MenuColl;
import com.neusoft.tdframework.authorization.AuthorizeVO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.web.struts.TDDispatchAction;

public class HomePageAction extends TDDispatchAction {

	static int DEFAULT_PAGE_SIZE = 10;

	public ActionForward showHomePage(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		
		MenuColl menuColl=null;
		try {
			HomePageBO homepageBO=(HomePageBO)getServiceFacade(HomePageBO.HOMEPAGEBO_BEANNAME,mapping);
			
			String systemId=null;
			String employeeId=null;
			
			AuthorizeVO authorizeVO = (AuthorizeVO)request.getSession(true).getAttribute(GlobalParameters.SESSION_INFO);
			employeeId=authorizeVO.getEmployeeId();
			systemId=request.getParameter("systemId");
			HashMap map=new HashMap();
			map.put("systemId",systemId);
			map.put("employeeId",employeeId);
			menuColl=homepageBO.getHomePageMenuColl(map);
		}catch(Exception e){
			throw new ActionException("Ê×Ò³¼ÓÔØ´íÎó");
		}
		request.setAttribute("date_select", HomePageUtil.getDateSelect());
		request.setAttribute("homepage_mods",menuColl);
		return mapping.findForward("homepage");
	}
	
    protected ActionForward unspecified(
            ActionMapping mapping,
            ActionForm form,
            HttpServletRequest request,
            HttpServletResponse response)
            throws Exception {
    	return showHomePage(mapping,form,request,response);
    }


}
