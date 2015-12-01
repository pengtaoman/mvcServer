package com.neusoft.tdframework.common.util;

import java.util.Enumeration;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

/**
 * Title: HttpUtil
 * Description: 处理http对象的工具类
 * Company: neusoft
 * Date: 2004-10-14
 * @author liyj
 * @version 1.0
 */
public class HttpObjectUtil {

	/**
		将请求中的参数数据转换为HashMap.
	*/
	public static HashMap getRequestParams(HttpServletRequest request){
		Enumeration requestParams = request.getParameterNames();
		HashMap mapData = new HashMap();
		while(requestParams.hasMoreElements()){
			String paramName = (String)requestParams.nextElement();
			String paramValue = request.getParameter(paramName);
			mapData.put(paramName,paramValue==null?"":paramValue);
		}
		return mapData;
	}
	/**
	 * 从request uri获取应用名称.
	 * @param request
	 * @return
	 */
	public static String getAppName(HttpServletRequest request)
	{
		String sPath = request.getRequestURI();
		String appName = "";
		String contextPath = "";
		if(sPath!=null){
			int iBegin = sPath.indexOf('/',1);
			int iEnd = sPath.indexOf('/',iBegin+1);
			if(iEnd>0)
			{
				appName = sPath.substring(iBegin+1,iEnd);
				contextPath = sPath.substring(0,iEnd);
			}
			else
			{
				contextPath = sPath.substring(0,iBegin);
			}
		}
		return appName;
		
	}
	public static String getApplicationContextPath(HttpServletRequest request)
	{
		String sPath = request.getRequestURI();
		String contextPath = "";
		if(sPath!=null){
			int iBegin = sPath.indexOf('/',1);
			int iEnd = sPath.indexOf('/',iBegin+1);
			if(iEnd>0)
			{
				contextPath = sPath.substring(0,iEnd);
			}
			else
			{
				contextPath = sPath.substring(0,iBegin);
			}
		}
		return contextPath;
	}
}
