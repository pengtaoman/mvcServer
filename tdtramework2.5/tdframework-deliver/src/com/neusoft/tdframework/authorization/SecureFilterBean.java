package com.neusoft.tdframework.authorization;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Enumeration;
import java.util.Vector;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.RequestDispatcher;

import net.sf.acegisecurity.Authentication;
import net.sf.acegisecurity.AuthenticationException;
import net.sf.acegisecurity.AuthenticationManager;
import net.sf.acegisecurity.context.ContextHolder;
import net.sf.acegisecurity.context.security.SecureContext;
import net.sf.acegisecurity.context.security.SecureContextImpl;
import net.sf.acegisecurity.context.security.SecureContextUtils;
import net.sf.acegisecurity.providers.UsernamePasswordAuthenticationToken;
import net.sf.acegisecurity.ui.AbstractProcessingFilter;
import net.sf.acegisecurity.util.FilterChainProxy;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.util.Assert;
import org.springframework.util.StringUtils;

import com.neusoft.om.bo.EmployeeManagementBO;
import com.neusoft.om.dao.employee.EmployeeVO;
import com.neusoft.om.dao.role.RoleColl;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.common.util.DESUtil;
import com.neusoft.tdframework.common.util.PassWord;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;
import com.neusoft.unieap.service.security.SecurityFactory;
import com.neusoft.unieap.util.RequestUtil;

public class SecureFilterBean implements InitializingBean, Filter {

	private static final Log logger = LogFactory
	.getLog(SecureFilterBean.class);
	private String loginFormUrl=null;
	
	private String simpleUrlPattern=null;
	
	private FilterConfig filterConfig=null;
	
	
	static final boolean uniflow = true;
	
	private AuthenticationManager authenticationManager;

	private FilterChainProxy filterChainProxy;
	
	public void afterPropertiesSet() throws Exception {
		Assert.notNull(this.loginFormUrl, "the loginFormUrl must be set");
	}

	public void destroy() {
	}

	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		boolean doContinue=false;
		
		HttpServletRequest hrequest=(HttpServletRequest)request;
		HttpServletResponse hresponse =(HttpServletResponse)response;
		String requestURI=hrequest.getRequestURI();
		String webPath=hrequest.getContextPath();
		if (loginFormUrl.length()>0 ){

			boolean doCheck=false;
			if (simpleUrlPattern!=null){
				simpleUrlPattern=simpleUrlPattern.trim();
				String[] urlTypes=simpleUrlPattern.split(";");

				for (int i=0;i<urlTypes.length;i++){
					String urlT=urlTypes[i].trim();
					if (urlT.length()<1) continue;
					if (StringUtils.startsWithIgnoreCase(urlT,"*.")){
						urlT=urlT.substring(1);
					}
					if (urlTypes[i].trim().length()>0 
						&& StringUtils.endsWithIgnoreCase(requestURI, urlT) ){
						doCheck=true;
						break;
					}
				}
			}else{
				doCheck=true;
			}
			
			if (doCheck){
				HttpSession session=hrequest.getSession(true);
				AuthorizeVO authorizeVO = (AuthorizeVO)session.getAttribute(GlobalParameters.SESSION_INFO);
				if (authorizeVO!=null && authorizeVO.getWorkNo()!=null && authorizeVO.getWorkNo().length()>0){
					String username = "";//(String)nvl(hrequest.getParameter("j_username"));
					String password = "";//(String)nvl(hrequest.getParameter("j_password"));
					String STAFFNO = request.getParameter("STAFFNO");
					String PASSWORD = request.getParameter("PASSWORD");
					if (STAFFNO != null && PASSWORD != null){
						username = STAFFNO;
						password = DESUtil.decrypt(PASSWORD);
					}
					if(username.equals("")){
						doContinue=true;
					}
					else if(username.equalsIgnoreCase(authorizeVO.getWorkNo())){
						String org_passWord = (String)session.getAttribute("decodedPass");
						if(password.equalsIgnoreCase(org_passWord)){
							doContinue = true;
							String doubScreen = request.getParameter("double_flag");
							if(doubScreen!=null){
								if(doubScreen.equals("1"))
									session.setAttribute("double_flag", "1");
								else
									session.setAttribute("double_flag", "0");
							}else
								session.setAttribute("double_flag", "0");
						}
					}
					else{
						PortalInfoRegistry.unRegisterLoginInfo(hrequest);   
						removeSession(hrequest);
						ContextHolder.setContext(new SecureContextImpl());
					}
				}
			}	
			
		}else{
			
			doContinue=true;
		}
		if (doContinue 
				|| StringUtils.startsWithIgnoreCase(webPath+loginFormUrl,requestURI) 
				|| StringUtils.endsWithIgnoreCase(webPath+"/index.jsp", requestURI) 
				|| StringUtils.endsWithIgnoreCase(webPath+"/tdframework/mainframe/login.jsp", requestURI)  
				|| StringUtils.startsWithIgnoreCase(webPath+"/tdframework/mainframe/error.jsp", requestURI) 
				|| StringUtils.startsWithIgnoreCase(webPath+"/tdframework/mainframe/session_invalid.jsp", requestURI)) {
			
			if ( StringUtils.startsWithIgnoreCase(webPath+loginFormUrl,requestURI)) {

				HttpSession session=hrequest.getSession(true);
				AuthorizeVO authorizeVO = (AuthorizeVO)session.getAttribute(GlobalParameters.SESSION_INFO);
				AuthenticationManager aa = this.authenticationManager;
				SecureContext ssc = (SecureContext)ContextHolder.getContext();
				String formUserName = null;
				try {
				com.neusoft.unieap.service.security.providers.dao.SecurityUser securityUser 
				        = (com.neusoft.unieap.service.security.providers.dao.SecurityUser)ssc.getAuthentication().getPrincipal();
				formUserName = securityUser.getUsername();
				}catch(Exception ex) {}
				//String formUserName = hrequest.getParameter("j_username");
				if (authorizeVO!=null && authorizeVO.getWorkNo()!=null && authorizeVO.getWorkNo().length()>0 && authorizeVO.getWorkNo().equals(formUserName)){
					request.setAttribute("isDoubleLogin", "true");
				} else if (authorizeVO!=null && authorizeVO.getWorkNo()!=null && authorizeVO.getWorkNo().length()>0 && !authorizeVO.getWorkNo().equals(formUserName)) {
					request.setAttribute("isDoubleLogin", "trueNotSameUser");
				}
			}
			
			request.setAttribute("isComeFromLogin", "true");
			
			chain.doFilter(request, response);
			return;
			
		}else{
			
			String username = "";//request.getParameter("j_username");
			String password = "";//request.getParameter("j_password");
			String doubScreen = request.getParameter("double_flag");
			String encoded = (String)nvl(request.getParameter("encoded"));
			String STAFFNO = request.getParameter("STAFFNO");
			String PASSWORD = request.getParameter("PASSWORD");
			if (STAFFNO != null && PASSWORD != null){
				username = STAFFNO;
				password = DESUtil.decrypt(PASSWORD);
				
			}
			
			if (username != null && password != null) {
				
				int port = hrequest.getServerPort();
				if(encoded.equals("ALL")){
					password = DESUtil.decrypt(password);
					username=DESUtil.decrypt(username);
				}
				String targetUrl = hrequest.getScheme() + "://"
				+ hrequest.getServerName() + ":" + port
				+ hrequest.getRequestURI();
				//String targetUrl = hrequest.getRequestURI();
				SecureContext sc = (SecureContext)ContextHolder.getContext();
				if (sc == null) {
					removeSession(hrequest);
					ContextHolder.setContext(new SecureContextImpl());
					filterChainProxy.doFilter(request, response, chain);
				}

				UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(
						username, password);
				authRequest.setDetails(hrequest.getRemoteAddr());
				try {
					Authentication authentication = this.getAuthenticationManager()
							.authenticate(authRequest);
					//SecureContext sc = SecureContextUtils.getSecureContext();
					sc.setAuthentication(authentication);
					ContextHolder.setContext(sc);
					((HttpServletRequest) request).getSession().setAttribute(
							AbstractProcessingFilter.ACEGI_SECURITY_TARGET_URL_KEY,
							targetUrl);
					if (PortalInfoRegistry.register(hrequest,hresponse,username, password)) {
						// added for double screen 20080310 
						HttpSession session = hrequest.getSession(true);
							if(doubScreen!=null){
								if(doubScreen.equals("1"))
									session.setAttribute("double_flag", "1");
							}else
								session.setAttribute("double_flag", "0");
						// end added for double screen
						thirdPartyAuthorize(hrequest);
					}
			
					chain.doFilter(request, response);
					return;
				} catch (AuthenticationException e) {
					/**CRM 6.0*/
					/*
					request.setAttribute("flag","fail");
					hresponse.addHeader("authentication", "error");
					hresponse.sendError(401, "ERROR");
					sc.setAuthentication(null);
					ContextHolder.setContext(sc);
					*/
					/**CRM 6.0*/
					
					if (logger.isDebugEnabled()) {
						logger.debug("Updated ContextHolder to contain null Authentication");
					}
					//e.printStackTrace();
					SysLog.writeLogs("tdframework",GlobalParameters.ERROR,"SecureFilterBean--dofilter:"+e.getMessage());
					
					System.out.println(" ============bad credential user is "+ username + " password is " +password);
					String loginUrl = hrequest.getScheme() + "://"
							+ hrequest.getServerName() + ":" + port + hrequest.getContextPath();
					hresponse.sendRedirect(loginUrl);
				} catch (Exception e) {
					
				} 
			}else{
				// session timeout handling
				int port = hrequest.getServerPort();
				String targetUrl = hrequest.getScheme() + "://"
				+ hrequest.getServerName() + ":" + port + hrequest.getContextPath()+"/tdframework/mainframe/session_invalid.jsp";
				hresponse.sendRedirect(targetUrl);
			}
			
		}
	}
	
	private void removeSession(HttpServletRequest request) {
		HttpSession session = request.getSession();
		Enumeration enum1 = session.getAttributeNames();
		Vector tempname=new Vector();
		while (enum1.hasMoreElements()) {
			tempname.addElement(String.valueOf(enum1.nextElement()));
		}
		for(int i=0;i<tempname.size();i++){
			session.removeAttribute(tempname.elementAt(i).toString());
		}
	}
	private EmployeeVO getEmployeeVoByWorkNo(String username){
		InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
		AppContext appContext = new AppContextImpl();
		appContext.setApplicationName("");
		EmployeeManagementBO employeeFacade = (EmployeeManagementBO) factory.getInteractionObject("employeeManagementFacade", appContext);
		EmployeeVO employeeVO = null;
		RoleColl roles = null;
		String workno = null;
		String password = null;
		//String cName = StringUtil.convertToChinese(username);
		
		try {
			employeeVO = employeeFacade.getEmployeeByWorkNo(username);
		} catch (ServiceException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}	

		return employeeVO;
	}
	
	private boolean thirdPartyAuthorize(HttpServletRequest request) {
		InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("");
		AuthorizeFactory authorizeFactory = (AuthorizeFactory) factory
				.getInteractionObject(AuthorizeFactory.BEAN, appContext);

		ThirdPartyAuthorize[] thirdPartyAuthorize = authorizeFactory
					.getThirdParyAuthorize(request);

		if (thirdPartyAuthorize == null)
				return true;

		boolean result = true;
		String errMsg = null;
		for (int i = 0; i < thirdPartyAuthorize.length; i++) {
			ThirdPartyAuthorize thirdAuthorize = thirdPartyAuthorize[i];
			//如果没有找到对应的配置类，跳出循环
			if (thirdAuthorize == null)
				continue;

			try {
				if (!thirdAuthorize.authorize(request))
					result = false;
			} catch (ServiceException e) {
				//e.printStackTrace();
				SysLog.writeLogs("tdframework",GlobalParameters.ERROR,"SecureFilterBean--thirdPartyAuthorize:"+e.getMessage());
				errMsg = errMsg + "\n" + thirdAuthorize.getClass().getName()
						+ ":" + e.getMessage();
			}
		}

		if (errMsg != null) {
			String alertMsg = nvl(request.getAttribute("alertMsg")) + " "
					+ errMsg;
			request.setAttribute("alertMsg", alertMsg);
		}
		return result;
	}
	/**
	 * 
	 * @param obj
	 * @return
	 */
	private Object nvl(Object obj) {
		if (obj == null)
			return "";
		else
			return obj;
	}
	
	
	
	
	public void init(FilterConfig filterConfig) throws ServletException {
		this.filterConfig=filterConfig;
	}

	public String getLoginFormUrl() {
		return loginFormUrl;
	}

	public void setLoginFormUrl(String loginFormUrl) {
		this.loginFormUrl = loginFormUrl;
	}

	public String getSimpleUrlPattern() {
		return simpleUrlPattern;
	}

	public void setSimpleUrlPattern(String simpleUrlPattern) {
		this.simpleUrlPattern = simpleUrlPattern;
	}


	public FilterChainProxy getFilterChainProxy() {
		return filterChainProxy;
	}

	public void setFilterChainProxy(FilterChainProxy filterChainProxy) {
		this.filterChainProxy = filterChainProxy;
	}
	public AuthenticationManager getAuthenticationManager() {
		return authenticationManager;
	}

	public void setAuthenticationManager(
			AuthenticationManager authenticationManager) {
		this.authenticationManager = authenticationManager;
	}


}
