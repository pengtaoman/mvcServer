package com.neusoft.tdframework.config;

import java.util.Set;

import javax.servlet.FilterRegistration;
import javax.servlet.ServletContainerInitializer;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration;

import org.apache.logging.log4j.web.Log4jServletContextListener;

public class ContainerInitializer  implements ServletContainerInitializer {

	@Override
	public void onStartup(Set<Class<?>> arg0, ServletContext servletContext)
			throws ServletException {
		
	    servletContext.setInitParameter("log4jConfiguration", "/log4j2.xml");
	    
	    servletContext.setInitParameter("javamelody.disabled", "false");
	    
	    servletContext.addListener(new Log4jServletContextListener());
	    
	    servletContext.addListener(new net.bull.javamelody.SessionListener());

	    FilterRegistration fr = servletContext.addFilter("jmelodymonitoring", "net.bull.javamelody.MonitoringFilter");
	    
	    ServletRegistration sr = servletContext.addServlet("jcaptcha", "com.neusoft.tdframework.security.servlet.TDCaptchaServlet");
	    sr.addMapping("/resources/jcaptcha.jpg");
	    
	}

}
