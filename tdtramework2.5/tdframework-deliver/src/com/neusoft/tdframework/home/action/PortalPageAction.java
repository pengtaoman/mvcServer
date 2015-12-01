package com.neusoft.tdframework.home.action;

import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.tdframework.authorization.AuthorizeVO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.web.struts.TDDispatchAction;

import com.neusoft.crm.channel.outInterface.om.bo.*;
import com.neusoft.crm.channel.outInterface.om.dao.*;

public class PortalPageAction extends TDDispatchAction {
	static int DEFAULT_PAGE_SIZE = 10;

	public ActionForward showHomePage(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		
		List menuColl=null;
		JSONArray jsonArr = new JSONArray();
		try {
			PortalPageBO portalPageBO=(PortalPageBO)getServiceFacade(PortalPageBO.PORTALPAGEBO_BEANNAME,mapping);
			
			String systemId=null;
			String employeeId=null;
			
			AuthorizeVO authorizeVO = (AuthorizeVO)request.getSession(true).getAttribute(GlobalParameters.SESSION_INFO);
			employeeId=authorizeVO.getEmployeeId();
			systemId=request.getParameter("systemId");
			HashMap map=new HashMap();
			map.put("systemId",systemId);
			map.put("employeeId",employeeId);
			menuColl=portalPageBO.getPortalPageMenuColl(map);
			for (int i = 0; i < menuColl.size(); i++) {
				jsonArr.add(menuColl.get(i));
			}
			String ans = jsonArr.toString();
			response.setContentType("text/html; charset=GB18030");
			PrintWriter out = response.getWriter();
			out.println(ans);
		}catch(Exception e){
			e.printStackTrace();
			throw new ActionException("Ê×Ò³¼ÓÔØ´íÎó");
		}
		
		request.setAttribute("homepage_mods",menuColl);
		return null;
	}
	
	public ActionForward getViewForEmployee(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		
		List menuColl=null;
		JSONArray jsonArr = new JSONArray();
		try {
			PortalPageBO portalPageBO=(PortalPageBO)getServiceFacade(PortalPageBO.PORTALPAGEBO_BEANNAME,mapping);
			
			String employeeId=null;
			
			AuthorizeVO authorizeVO = (AuthorizeVO)request.getSession(true).getAttribute(GlobalParameters.SESSION_INFO);
			employeeId=authorizeVO.getEmployeeId();
			HashMap map=new HashMap();
			menuColl=portalPageBO.getViewForEmployee(employeeId);
			for (int i = 0; i < menuColl.size(); i++) {
				jsonArr.add(menuColl.get(i));
			}
			String ans = jsonArr.toString();
			response.setContentType("text/html; charset=GB18030");
			PrintWriter out = response.getWriter();
			out.println(ans);
		}catch(Exception e){
			e.printStackTrace();
			throw new ActionException("Ê×Ò³¼ÓÔØ´íÎó");
		}
		
		return null;
	}
	
	public ActionForward getPortaletForView(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		
		List menuColl=null;
		JSONArray jsonArr = new JSONArray();
		try {
			PortalPageBO portalPageBO=(PortalPageBO)getServiceFacade(PortalPageBO.PORTALPAGEBO_BEANNAME,mapping);
			
			String viewId=null;
			
			AuthorizeVO authorizeVO = (AuthorizeVO)request.getSession(true).getAttribute(GlobalParameters.SESSION_INFO);
			viewId=request.getParameter("viewId");
			HashMap map=new HashMap();
			menuColl=portalPageBO.getPortaletForView(viewId.split("~"));
			for (int i = 0; i < menuColl.size(); i++) {
				jsonArr.add(menuColl.get(i));
			}
			String ans = jsonArr.toString();
			response.setContentType("text/html; charset=GB18030");
			PrintWriter out = response.getWriter();
			out.println(ans);
		}catch(Exception e){
			e.printStackTrace();
			throw new ActionException("Ê×Ò³¼ÓÔØ´íÎó");
		}
		
		return null;
	}
	
	public ActionForward getPortaletForViews(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		
		List menuColl=null;
		JSONArray jsonArr = new JSONArray();
		try {
			PortalPageBO portalPageBO=(PortalPageBO)getServiceFacade(PortalPageBO.PORTALPAGEBO_BEANNAME,mapping);
			
			String viewId=null;
			
			AuthorizeVO authorizeVO = (AuthorizeVO)request.getSession(true).getAttribute(GlobalParameters.SESSION_INFO);
			viewId=request.getParameter("viewId");
			HashMap map=new HashMap();
			menuColl=portalPageBO.getPortaletForViews(viewId.split("~"));
			for (int i = 0; i < menuColl.size(); i++) {
				jsonArr.add(menuColl.get(i));
			}
			String ans = jsonArr.toString();
			response.setContentType("text/html; charset=GB18030");
			PrintWriter out = response.getWriter();
			out.println(ans);
		}catch(Exception e){
			e.printStackTrace();
			throw new ActionException("Ê×Ò³¼ÓÔØ´íÎó");
		}
		
		return null;
	}
	
	public ActionForward getPortaletForPointView(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		
		List menuColl=null;
		JSONArray jsonArr = new JSONArray();
		try {
			PortalPageBO portalPageBO=(PortalPageBO)getServiceFacade(PortalPageBO.PORTALPAGEBO_BEANNAME,mapping);
			
			String viewId=null;
			
			AuthorizeVO authorizeVO = (AuthorizeVO)request.getSession(true).getAttribute(GlobalParameters.SESSION_INFO);
			viewId=request.getParameter("viewId");
			HashMap map=new HashMap();
			menuColl=portalPageBO.getPortaletForPointView(viewId);
			for (int i = 0; i < menuColl.size(); i++) {
				jsonArr.add(menuColl.get(i));
			}
			String ans = jsonArr.toString();
			response.setContentType("text/html; charset=GB18030");
			PrintWriter out = response.getWriter();
			out.println(ans);
		}catch(Exception e){
			e.printStackTrace();
			throw new ActionException("Ê×Ò³¼ÓÔØ´íÎó");
		}
		
		return null;
	}
	
	public ActionForward getTitleInfo(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		
		try {
			AuthorizeVO authorizeVO = (AuthorizeVO)request.getSession(true).getAttribute(GlobalParameters.SESSION_INFO);
			PortalPageBO portalPageBO=(PortalPageBO)getServiceFacade(PortalPageBO.PORTALPAGEBO_BEANNAME,mapping);
			StringBuilder ans = new StringBuilder();
			String onlineNumber = portalPageBO.getOnlineNumber(authorizeVO.getCityCode());
			String lastLoginTime = portalPageBO.getLastLoginTime(authorizeVO.getWorkNo());
			ans.append("{onlineNumner:'");
			ans.append(onlineNumber);
			ans.append("',lastLoginTime:'");
			ans.append(lastLoginTime);
			/*
			try {
				OmQueryBO omQueryBO=(OmQueryBO)getServiceFacade("omQueryBO",mapping);
				int noReadWarning = omQueryBO.getCphBulletin(authorizeVO.getWorkNo());
				int noComMession = omQueryBO.getTaskCount(authorizeVO.getWorkNo(), authorizeVO.getEmployeeId(), authorizeVO.getCityCode());
				ans.append("',noReadWraning:'");
				ans.append(noReadWarning);
				ans.append("',noComMission:'");
				ans.append(noComMession);
			} catch (Exception ex) {
				ex.printStackTrace();
				ans.append("',noReadWraning:'");
				ans.append("XX");
				ans.append("',noComMission:'");
				ans.append("XX");
			}
			*/
			ans.append("'}");
			
			response.setContentType("text/html; charset=GB18030");
			PrintWriter out = response.getWriter();
			out.println(ans.toString());
		}catch(Exception e){
			e.printStackTrace();
			throw new ActionException("Ê×Ò³¼ÓÔØ´íÎó");
		}
		
		return null;
	}
	
//    protected ActionForward unspecified(
//            ActionMapping mapping,
//            ActionForm form,
//            HttpServletRequest request,
//            HttpServletResponse response)
//            throws Exception {
//    	return showHomePage(mapping,form,request,response);
//    }

}
