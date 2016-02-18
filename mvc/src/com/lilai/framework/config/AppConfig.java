package com.lilai.framework.config;

import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.concurrent.ConcurrentMapCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.ComponentScan.Filter;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.context.annotation.FilterType;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.support.ApplicationObjectSupport;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.core.env.Environment;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.web.authentication.session.CompositeSessionAuthenticationStrategy;
import org.springframework.security.web.authentication.session.ConcurrentSessionControlAuthenticationStrategy;
import org.springframework.security.web.authentication.session.RegisterSessionAuthenticationStrategy;
import org.springframework.security.web.authentication.session.SessionAuthenticationStrategy;
import org.springframework.security.web.authentication.session.SessionFixationProtectionStrategy;
import org.springframework.security.web.session.ConcurrentSessionFilter;
import org.springframework.stereotype.Controller;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.support.RequestDataValueProcessor;

import com.lilai.framework.base.BaseController;
//import com.lilai.framework.web.config.TDRequestDataValueProcessor;
import com.lilai.framework.web.config.WebConfig;
import com.lilai.framework.web.controller.TDWebController;

@Configuration
@PropertySource(value = { "classpath:resource/properties/system-config.properties" })
@ComponentScan(basePackages = {"${base.framework.package}"}, 
        excludeFilters = {@Filter(type = FilterType.ANNOTATION, value=Controller.class ),
		                  @Filter(type = FilterType.ASSIGNABLE_TYPE, value=WebConfig.class )})
@EnableScheduling
@EnableAspectJAutoProxy
@EnableCaching
public class AppConfig  extends ApplicationObjectSupport{
	
	@Autowired
	private Environment env;

	private Logger logger = LogManager.getLogger(AppConfig.class);
	
	@Bean
	public static PropertySourcesPlaceholderConfigurer placeHolderConfigurer() {
		
		System.out.println("666666666666666666666666" );
		PropertySourcesPlaceholderConfigurer propertySourcesPlaceholderConfigurer = 
				new PropertySourcesPlaceholderConfigurer();
		
		//propertySourcesPlaceholderConfigurer.setLocation("classpath:resources/system/config/properties/system-config.properties");
		return propertySourcesPlaceholderConfigurer;
	}
	



	@Bean
	public CacheManager cacheManager() {

		logger.trace("7777777777777777777"+ env.getProperty("mvc.dispatch.servlet.map"));
		logger.trace("7777777777777777777"+ env.getClass().getName());
		logger.trace("7777777777777777777" + env.hashCode());
		return new ConcurrentMapCacheManager();
	}

	@Bean
	public CommonsMultipartResolver multipartResolver(){
		CommonsMultipartResolver commonsMultipartResolver = new CommonsMultipartResolver();
	    commonsMultipartResolver.setDefaultEncoding("utf-8");
	    commonsMultipartResolver.setMaxUploadSize(50000000);
	    return commonsMultipartResolver;
	}

}