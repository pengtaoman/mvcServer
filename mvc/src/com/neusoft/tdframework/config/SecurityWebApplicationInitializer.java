//package com.neusoft.tdframework.config;
//
//import java.util.ArrayList;
//import java.util.List;
//
//import javax.servlet.FilterRegistration;
//import javax.servlet.ServletContext;
//import javax.servlet.ServletException;
//
//import org.apache.logging.log4j.web.Log4jServletContextListener;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.core.session.SessionRegistry;
//import org.springframework.security.core.session.SessionRegistryImpl;
//import org.springframework.security.web.FilterChainProxy;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.context.AbstractSecurityWebApplicationInitializer;
//import org.springframework.security.web.session.ConcurrentSessionFilter;
//import org.springframework.security.web.session.HttpSessionEventPublisher;
//import org.springframework.web.context.WebApplicationContext;
//import org.springframework.web.context.support.WebApplicationContextUtils;
//import org.springframework.web.filter.CharacterEncodingFilter;
//import org.springframework.web.filter.DelegatingFilterProxy;
//import org.springframework.web.multipart.support.MultipartFilter;
//import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;
//
//import com.neusoft.tdframework.security.filter.TDSecurityFilterChain;
//import com.neusoft.tdframework.web.config.WebConfig;
//
//
//public class SecurityWebApplicationInitializer extends AbstractSecurityWebApplicationInitializer {
//	
////	public SecurityWebApplicationInitializer() {
////		super(SecurityConfig.class, WebConfig.class);
////	}
//	
//	//@Autowired
//	//SessionRegistry sessionRegistry;
////	@Override
////	void onStartup(ServletContext servletContext) throws ServletException {
////		
////	}
//	
//	@Override
//	protected void beforeSpringSecurityFilterChain(ServletContext servletContext) {
//		System.out.println("*****************************************************************");
//		
////		List<SecurityFilterChain> filterChains = new ArrayList<SecurityFilterChain>();
////		SecurityFilterChain securityFilterChain = new TDSecurityFilterChain();
////		filterChains.add(securityFilterChain);
////		FilterChainProxy filterChainProxy = new FilterChainProxy(filterChains);
////		
////		DelegatingFilterProxy  delegatingFilterProxy = new DelegatingFilterProxy("");
////
////		delegatingFilterProxy.setBeanName("tdFilterProxy");
////		servletContext.addFilter("delegatingFilterProxy", delegatingFilterProxy);
//		
////	    servletContext.addListener(new HttpSessionEventPublisher());  
//	    
////		WebApplicationContext ac1 = WebApplicationContextUtils.getRequiredWebApplicationContext(servletContext);
//		
//		//System.out.println("::::::::  beforeSpringSecurityFilterChain :::::::::: " + ac1.getBean(SessionRegistry.class));
//		//insertFilters(servletContext,ac1.getBean(ConcurrentSessionFilter.class));
////		insertFilters(servletContext, new TDSecurityFilter());
////	    insertFilters(servletContext, new MultipartFilter());
//	    FilterRegistration.Dynamic encodingFilter = servletContext.addFilter("encoding-filter", CharacterEncodingFilter.class);  
//	    encodingFilter.setInitParameter("encoding", "UTF-8");  
//	    encodingFilter.setInitParameter("forceEncoding", "true");  
//	    encodingFilter.setAsyncSupported(true);  
//	    encodingFilter.addMappingForUrlPatterns(null, true, "/*");  
//	    
//
//	   
//	    
//	    
//	}
//	
//	@Override
//	protected boolean enableHttpSessionEventPublisher() {
//		return true;
//	}
//
//
//}