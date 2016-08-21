package com.lilai.framework.config;

import java.util.Set;

import javax.servlet.DispatcherType;
import javax.servlet.FilterRegistration;
import javax.servlet.ServletContainerInitializer;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration;

import org.apache.logging.log4j.web.Log4jServletContextListener;
//import org.springframework.session.web.context.AbstractHttpSessionApplicationInitializer;

public class ContainerInitializer implements ServletContainerInitializer {

	@Override
	public void onStartup(Set<Class<?>> arg0, ServletContext servletContext)
			throws ServletException {
		
	    servletContext.setInitParameter("log4jConfiguration", "/log4j2.xml");
	    
	    servletContext.setInitParameter("javamelody.disabled", "false");
	    
	    servletContext.addListener(new Log4jServletContextListener());
	    
	    servletContext.addListener(new net.bull.javamelody.SessionListener());

	    FilterRegistration fr = servletContext.addFilter("jmelodymonitoring", "net.bull.javamelody.MonitoringFilter");
	    
	    ServletRegistration sr = servletContext.addServlet("jcaptcha", "com.lilai.framework.security.servlet.TDCaptchaServlet");
	    sr.addMapping("/resources/jcaptcha.jpg");
	    
	    //如果在service层hibernate session，在view层或ut层session会置空，导致异常
//	    FilterRegistration openSessionInViewFilter = 
//	    		servletContext.addFilter("Spring OpenSessionInViewFilter", "org.springframework.orm.hibernate3.support.OpenSessionInViewFilter");
//	    
//	    openSessionInViewFilter.setInitParameter("sessionFactoryBean", "entityManagerFactory");
//	    openSessionInViewFilter.addMappingForUrlPatterns(null, true, "/*");
	    
	}

}
