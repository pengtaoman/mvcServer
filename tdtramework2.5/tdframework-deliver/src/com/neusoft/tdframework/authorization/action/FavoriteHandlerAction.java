package com.neusoft.tdframework.authorization.action;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashSet;
import java.util.HashMap;
import java.util.List;
import java.util.Properties;
import java.util.Set;
import java.net.URLDecoder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.hsqldb.lib.Iterator;

import com.neusoft.tdframework.authorization.AuthorizeUtil;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.tdframework.support.favorite.bo.FavoriteMenuBO;
import com.neusoft.tdframework.support.favorite.dao.FavoriteColl;
import com.neusoft.tdframework.support.favorite.dao.FavoriteVO;
import com.neusoft.tdframework.web.struts.TDDispatchAction;

public class FavoriteHandlerAction  extends TDDispatchAction{
	
	 public ActionForward getFavoriteMenu (
			 ActionMapping actionMapping,
			 ActionForm actionForm, 
			 HttpServletRequest request,
			 HttpServletResponse response) 
     throws ActionException, IOException {

		FavoriteMenuBO favoriteMenuBO = (FavoriteMenuBO)getServiceFacade(FavoriteMenuBO.BEAN);
		JSONArray jsonArr = new JSONArray();
		try { 

			FavoriteColl coll = favoriteMenuBO.getFavoriteInfoByEmployeeIdSystemId(
							AuthorizeUtil.getAuthorize(request).getEmployeeId(),
							null);
			List list = coll.getList();
			for (int i = 0; i < list.size(); i++) {
				jsonArr.add(list.get(i));
			}
			String ans = jsonArr.toString();
			//SysLog.writeLogs("","","###########   " + ans);
			response.setContentType("text/html; charset=GBK");
			PrintWriter out = response.getWriter();
			out.println(ans);

		} catch (Exception e) {
			e.printStackTrace();
			throw new ActionException("获取菜单信息异常: " + e.getMessage());
		}
		return null;
	}
	 
	 public ActionForward addFavoriteMenu (
			 ActionMapping actionMapping,
			 ActionForm actionForm, 
			 HttpServletRequest request,
			 HttpServletResponse response) 
     throws ActionException, IOException {
		PrintWriter out = response.getWriter();
		FavoriteMenuBO favoriteMenuBO = (FavoriteMenuBO)getServiceFacade(FavoriteMenuBO.BEAN);
		try { 
			FavoriteVO vo = new FavoriteVO();
			String menuId = request.getParameter("menuId");
			String favoriteName = null;
			favoriteName = request.getParameter("favoriteName");
			try {
//				System.out.println("##########1  " + favoriteName);
//				System.out.println("##########2  " + new String(favoriteName.getBytes("iso8859-1"),"gb2312"));
//				System.out.println("##########3  " + new String(favoriteName.getBytes("iso8859-1"),"utf-8"));
//				System.out.println("##########4  " + new String(favoriteName.getBytes(),"utf-8"));
//				System.out.println("##########5  " + new String(favoriteName.getBytes(),"gb2312"));
//				System.out.println("##########6  " + new String(favoriteName.getBytes(),"GBK"));
//				System.out.println("##########7  " + new String(favoriteName.getBytes("GBK"),"utf-8"));
//				System.out.println("##########8  " + new String(favoriteName.getBytes("utf-8"),"GBK"));
//				System.out.println("##########9  " + URLDecoder.decode(favoriteName));
//				System.out.println("##########10  " + URLDecoder.decode(favoriteName, "gb2312"));
//				System.out.println("##########11  " + URLDecoder.decode(favoriteName, "utf-8"));
//				System.out.println("##########12  " + URLDecoder.decode(favoriteName, "GBK"));
//				System.out.println("##########13  " + URLDecoder.decode(favoriteName, "iso8859-1"));
				//TODO for UT  
				//favoriteName =  new String(favoriteName.getBytes("iso8859-1"),"gb2312");
				
				response.setContentType("text/html; charset=UTF-8");
				out.println("SUCCESS");
			} catch (Exception ex) {
				ex.printStackTrace();
				
			}
			String systemId = request.getParameter("systemId");
			String pageLink = request.getParameter("pageLink");
			
			vo.setEmployeeId(AuthorizeUtil.getAuthorize(request).getEmployeeId());
			vo.setFavoriteName(favoriteName);
			vo.setMenuId(menuId);
			vo.setPageLink(pageLink);
			vo.setSystemId(systemId);
            if (menuId != null && !"".equals(menuId.trim())
            		&& systemId != null && !"".equals(systemId.trim())
            		&& pageLink != null && !"".equals(pageLink.trim())
            		&& favoriteName != null && !"".equals(favoriteName.trim())) {
			    favoriteMenuBO.doAddFavorite(vo);
            }
			//return null;

		} catch (Exception e) {
			e.printStackTrace();
			out.println("FAIL");
			//throw new ActionException("获取菜单信息异常: " + e.getMessage());
		}
		return null;
	}
	 
	 
	 public ActionForward getEditorLeft (
			 ActionMapping actionMapping,
			 ActionForm actionForm, 
			 HttpServletRequest request,
			 HttpServletResponse response) 
     throws ActionException, IOException {
		 
		 JSONArray jsonArr = new JSONArray();

		try { 

			Properties prop = (Properties)request.getSession().getServletContext().getAttribute("ENVCONF");
			//Iterator ite = prop.keys();
			HashSet<String> keySet = new HashSet<String>();
			java.util.Iterator<Object> it = prop.keySet().iterator();
			while (it.hasNext()) {
				String theKey = (String)it.next();
				if (theKey.indexOf("edit.menu") != -1) {
                    String keyDif = theKey.substring(0, 12);
                    keySet.add(keyDif);
				}
			}


			List editMenuLst = new java.util.ArrayList();
			for (String keyDiff : keySet) {
				HashMap menuMap = new HashMap();
				menuMap.put("menuId", (String)prop.get(keyDiff+".id"));
				
				String menuName = (String)prop.get(keyDiff+".name");
				menuName = new String(menuName.getBytes("iso8859-1"),"utf-8");
				menuMap.put("menuName", menuName);
				menuMap.put("systemId", (String)prop.get(keyDiff+".systemId"));
				
				String url = (String)prop.get(keyDiff+".url");
				
				if (prop.get(keyDiff+".context") != null) {
					menuMap.put("ifDiffContext", "1");
					String context = (String) prop.get(keyDiff+".context");
					if (!context.startsWith("/")) {
						context = "/" + context;
					}
					menuMap.put("pageLink", context + url);
				} else {
					menuMap.put("ifDiffContext", "0");
					menuMap.put("pageLink", url);
				}
				
				menuMap.put("ifChild", true);
				menuMap.put("parentMenuId", "");
				editMenuLst.add(menuMap);
			}

			for (int i = 0; i < editMenuLst.size(); i++) {
				jsonArr.add(editMenuLst.get(i));
			}
			String ans = jsonArr.toString();
			//SysLog.writeLogs("","","###########   " + ans);
			response.setContentType("text/html; charset=GBK");
			PrintWriter out = response.getWriter();
			out.println(ans);

		} catch (Exception e) {
			e.printStackTrace();
			throw new ActionException("获取菜单信息异常: " + e.getMessage());
		}
		return null;
	}
	 
	 public ActionForward getManagerLeft (
			 ActionMapping actionMapping,
			 ActionForm actionForm, 
			 HttpServletRequest request,
			 HttpServletResponse response) 
     throws ActionException, IOException {
		 
		 JSONArray jsonArr = new JSONArray();

		try { 

			Properties prop = (Properties)request.getSession().getServletContext().getAttribute("ENVCONF");
			//Iterator ite = prop.keys();
			HashSet<String> keySet = new HashSet<String>();
			java.util.Iterator<Object> it = prop.keySet().iterator();
			while (it.hasNext()) {
				String theKey = (String)it.next();
				if (theKey.indexOf("mana.menu") != -1) {
                    String keyDif = theKey.substring(0, 12);
                    keySet.add(keyDif);
				}
			}


			List editMenuLst = new java.util.ArrayList();
			for (String keyDiff : keySet) {
				HashMap menuMap = new HashMap();
				menuMap.put("menuId", (String)prop.get(keyDiff+".id"));
				
				String menuName = (String)prop.get(keyDiff+".name");
				menuName = new String(menuName.getBytes("iso8859-1"),"utf-8");
				menuMap.put("menuName", menuName);
				menuMap.put("systemId", (String)prop.get(keyDiff+".systemId"));
				
				String url = (String)prop.get(keyDiff+".url");
				
				if (prop.get(keyDiff+".context") != null) {
					menuMap.put("ifDiffContext", "1");
					String context = (String) prop.get(keyDiff+".context");
					if (!context.startsWith("/")) {
						context = "/" + context;
					}
					menuMap.put("pageLink", context + url);
				} else {
					menuMap.put("ifDiffContext", "0");
					menuMap.put("pageLink", url);
				}
				
				menuMap.put("ifChild", true);
				menuMap.put("parentMenuId", "");
				editMenuLst.add(menuMap);
			}

			for (int i = 0; i < editMenuLst.size(); i++) {
				jsonArr.add(editMenuLst.get(i));
			}
			String ans = jsonArr.toString();
			//SysLog.writeLogs("","","###########   " + ans);
			response.setContentType("text/html; charset=GBK");
			PrintWriter out = response.getWriter();
			out.println(ans);

		} catch (Exception e) {
			e.printStackTrace();
			throw new ActionException("获取菜单信息异常: " + e.getMessage());
		}
		return null;
	}


}
