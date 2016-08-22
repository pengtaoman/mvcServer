package com.lilai.framework.config;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.ResourceBundle;

import javax.servlet.Filter;
import javax.servlet.FilterRegistration;

//import org.sitemesh.config.ConfigurableSiteMeshFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.core.env.Environment;
import org.springframework.orm.hibernate4.support.OpenSessionInViewFilter;
import org.springframework.orm.jpa.support.OpenEntityManagerInViewFilter;
import org.springframework.security.web.FilterChainProxy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextPersistenceFilter;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.filter.DelegatingFilterProxy;
import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

//import com.lilai.framework.demo.UserService;
import com.lilai.framework.web.config.WebConfig;


public class FrameworkEnvInitializer extends
		AbstractAnnotationConfigDispatcherServletInitializer {
	
	

	@Override
	protected Class<?>[] getRootConfigClasses() {
		//return new Class[] { PersistenceConfig.class, AppConfig.class, JcaptchaConfig.class ,SecurityConfig.class,  BusinessConfig.class};
		return new Class[] {AppConfig.class, ElasticSearchConfig.class, BusinessConfig.class};
	}

	@Override
	protected Class<?>[] getServletConfigClasses() {
		return new Class[] { WebConfig.class };
	}

	@Override
	protected String[] getServletMappings() {

		ResourceBundle resb = ResourceBundle.getBundle("resource/properties/system-config",Locale.getDefault(), this.getClass().getClassLoader());
		String servletMap = resb.getString("mvc.dispatch.servlet.map");
		return servletMap.split(",");
	}
	
	/**OpenEntityManagerInViewFilter 控制Entity 延迟加载 */
	@Override
    protected Filter[] getServletFilters() {
		
		
//		List<SecurityFilterChain> filterChains = new ArrayList<SecurityFilterChain>();
//		SecurityFilterChain securityFilterChain = new TDSecurityFilterChain();
//		filterChains.add(securityFilterChain);
//		FilterChainProxy filterChainProxy = new FilterChainProxy(filterChains);
//		DelegatingFilterProxy  delegatingFilterProxy = new DelegatingFilterProxy("springSecurityFilterChain");

		//delegatingFilterProxy.setBeanName("tdFilterProxy");
		
//		ConfigurableSiteMeshFilter cc = new ConfigurableSiteMeshFilter();
//		cc.init(filterConfig);
		
	    //如果在service层hibernate session，在view层或ut层session会置空，导致异常
//		OpenSessionInViewFilter openSessionInViewFilter = new OpenSessionInViewFilter();
//		openSessionInViewFilter.setSessionFactoryBeanName("entityManagerFactory");
		//OpenEntityManagerInViewFilter openEntityManagerInViewFilter = new OpenEntityManagerInViewFilter();
		//openEntityManagerInViewFilter.setEntityManagerFactoryBeanName("entityManagerFactory");
        return new Filter[]{
        		//not secutiry
        		//new DelegatingFilterProxy("springSecurityFilterChain"),
        	//	openEntityManagerInViewFilter
        	//	new ConfigurableSiteMeshFilter()
              //,new OpenEntityManagerInViewFilter()
              };
    }
	

   
}
