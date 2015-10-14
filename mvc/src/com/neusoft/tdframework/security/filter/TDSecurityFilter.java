package com.neusoft.tdframework.security.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.web.FilterChainProxy;
import org.springframework.security.web.access.ExceptionTranslationFilter;
import org.springframework.security.web.access.intercept.FilterSecurityInterceptor;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.authentication.AnonymousAuthenticationFilter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.security.web.context.SecurityContextPersistenceFilter;
import org.springframework.security.web.context.request.async.WebAsyncManagerIntegrationFilter;
import org.springframework.security.web.header.HeaderWriterFilter;
import org.springframework.security.web.savedrequest.RequestCacheAwareFilter;
import org.springframework.security.web.servletapi.SecurityContextHolderAwareRequestFilter;
import org.springframework.security.web.session.ConcurrentSessionFilter;
import org.springframework.security.web.session.SessionManagementFilter;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;
import org.springframework.web.filter.DelegatingFilterProxy;
import org.springframework.web.filter.GenericFilterBean;

import com.google.gson.Gson;
import com.neusoft.tdframework.entity.User;
import com.neusoft.tdframework.security.pojo.TDSecurityUser;

public class TDSecurityFilter  extends GenericFilterBean {




	private WebAsyncManagerIntegrationFilter aa ;
	  private SecurityContextPersistenceFilter bb ;
	  private HeaderWriterFilter cc ;
	  private LogoutFilter dd ;
	  private TDSecurityFilter ee ;
	  private UsernamePasswordAuthenticationFilter ff ;
	  private ConcurrentSessionFilter gg ;
	  private RequestCacheAwareFilter hh ;
	  private SecurityContextHolderAwareRequestFilter ii ;
	  private AnonymousAuthenticationFilter jj ;
	  private SessionManagementFilter kk  ;
	  private ExceptionTranslationFilter ll ;
	  private FilterSecurityInterceptor mm ;
	  
	  private DelegatingFilterProxy sdf;
	  
	  FilterChainProxy sdfsdff;
	
	@Override
	public void destroy() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain filterChain) throws IOException, ServletException {
		// TODO Auto-generated method stub
		System.out.println("????????????????????? doFilter :: " + request.getParameter("name"));
		//if ()
		WebApplicationContext wtc = WebApplicationContextUtils.getWebApplicationContext(request.getServletContext());
		SessionRegistry ss = wtc.getBean(SessionRegistry.class);
		
		System.out.println("????????????????????? TDSecurityFilter doFilter :: " + new Gson().toJson(ss.getAllPrincipals()));
		
		//System.out.println("????????????????????? TDSecurityFilter getAuthenticationManager :: " + this.getAuthenticationManager().getClass().getName());
		((HttpServletRequest)request).getUserPrincipal();
		if ("ali".equals(request.getParameter("username"))) {
			User us = new User();
			us.setId(1000000009L);
			us.setLastname("ali");
			us.setPassword("");
			us.setPhoneNum("133000000");
			TDSecurityUser tu =  new TDSecurityUser(us);
			
			Authentication au = new UsernamePasswordAuthenticationToken(tu, tu.getAuthorities());
			//au.setAuthenticated(true);
			SecurityContextHolder.getContext().setAuthentication(au);
		}
		System.out.println("??????? 555555555  TDSecurityFilter PASS BY ");
		filterChain.doFilter(request, response);
	}




}
