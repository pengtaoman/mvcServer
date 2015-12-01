/*
 * Created on 2004-12-16
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.tdframework.authorization;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.context.FrameAppContext;

/**
 * @author chenzt
 *
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
public class AuthorizeUtil {
	/**
	 * 获取登陆认证信息
	 * @param request
	 * @return
	 */
	public static AuthorizeVO getAuthorize(HttpServletRequest request) {
		return (AuthorizeVO)request.getSession(true).getAttribute(GlobalParameters.SESSION_INFO);
	}
	
	/**
	 * 根据名称获取远程的信息
	 * @param context
	 * @param remoteSystemName
	 * @return
	 */
	public static RemoteAuthorizeVO getRemoteAuthorize(ServletContext context,String remoteSystemName) {
		RemoteAuthorizeColl coll = (RemoteAuthorizeColl)FrameAppContext.getBean(context,RemoteAuthorizeColl.BEAN);
		return coll.getRemoteAuthorizeVO(remoteSystemName);
	}
}
