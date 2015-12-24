package com.lilai.framework.config;

import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.context.annotation.FilterType;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.ComponentScan.Filter;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Controller;

import com.lilai.framework.web.config.WebConfig;

@Configuration
@PropertySource(value = {"classpath:resource/properties/business-config.properties" })
@ComponentScan(basePackages = {"${business.base.packages}"}, 
		excludeFilters = {@Filter(type = FilterType.ANNOTATION, value=Controller.class ) })
@EnableScheduling
@EnableAspectJAutoProxy
@EnableCaching
public class BusinessConfig {

}
