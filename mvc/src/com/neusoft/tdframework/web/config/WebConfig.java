package com.neusoft.tdframework.web.config;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.Entity;

import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.FilterType;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.ComponentScan.Filter;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.HandlerMethodReturnValueHandler;
import org.springframework.web.method.support.HandlerMethodReturnValueHandlerComposite;
import org.springframework.web.servlet.DispatcherServlet;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.handler.SimpleUrlHandlerMapping;
import org.springframework.web.servlet.mvc.method.annotation.ViewNameMethodReturnValueHandler;
import org.springframework.web.servlet.mvc.support.DefaultHandlerExceptionResolver;
import org.springframework.web.servlet.support.RequestDataValueProcessor;
import org.springframework.web.servlet.view.AbstractView;
import org.springframework.web.servlet.view.ContentNegotiatingViewResolver;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.springframework.web.servlet.view.tiles3.TilesConfigurer;
import org.springframework.web.servlet.view.tiles3.TilesViewResolver;

import com.google.gson.Gson;
import com.neusoft.tdframework.web.handler.TDHandlerMethodReturnValueHandler;
import com.neusoft.tdframework.web.handler.TdHandlerInterceptor;
import com.neusoft.tdframework.web.resolver.TDEcxeptionResolver;
import com.neusoft.tdframework.web.resolver.TDPDViewResolver;
import com.neusoft.tdframework.web.resolver.TDTilesViewResolver;
import com.neusoft.tdframework.web.view.TDPDFView;

@Configuration
@PropertySource(value = { "classpath:resource/properties/system-config.properties", "classpath:resource/properties/business-config.properties" })
@ComponentScan(basePackages = {"com.neusoft.tdframework", "${business.base.packages}"},useDefaultFilters=false,
        includeFilters = @Filter(type = FilterType.ANNOTATION, value=Controller.class ))
@EnableWebMvc
public class WebConfig extends WebMvcConfigurerAdapter {
	
	@Autowired
	private Environment env;
	
	@Bean
	public ContentNegotiatingViewResolver contentNegotiatingViewResolver() {
		ContentNegotiatingViewResolver viewResolver;
		viewResolver = new ContentNegotiatingViewResolver();
		List<ViewResolver> viewResolvers = new ArrayList<ViewResolver>();
		viewResolvers.add(pdfViewResolver());
		viewResolver.setViewResolvers(viewResolvers);
		viewResolver.setOrder(1);
		return viewResolver;
	}
	
	@Bean
	public ViewResolver pdfViewResolver() {
		TDPDViewResolver tdPDViewResolver  = new TDPDViewResolver();
		Map<String, AbstractView> views;
		views = new HashMap<String, AbstractView>();
		views.put("pdf", new TDPDFView());
		tdPDViewResolver.setViews(views);
		return tdPDViewResolver;
	}
	
	@Bean(name={"tilesViewResolver"}) 
	public TilesViewResolver tilesViewResolver() {
		
		//TilesViewResolver tilesViewResolver = new TilesViewResolver();
		TDTilesViewResolver tilesViewResolver = new TDTilesViewResolver();
		tilesViewResolver.setOrder(2);
		return tilesViewResolver;
	}
	
	@Bean(name={"tilesConfigurer"}) 
	public TilesConfigurer tilesConfigurer() {
		
		TilesConfigurer tilesConfigurer = new TilesConfigurer();
		tilesConfigurer.setDefinitions("classpath:resource/xml/tiles.xml");
		return tilesConfigurer;
	}
	
	@Bean(name={"resolver"}) 
	public ViewResolver viewResolver() {
		//DispatcherServlet
		
		System.out.println("555555555555555555555555555555555555555" + env.getProperty("mvc.dispatch.servlet.map"));
		System.out.println("555555555555555555555555555555555555555---- " + env.hashCode());
		InternalResourceViewResolver viewResolver = new InternalResourceViewResolver();
		
		viewResolver.setPrefix(env.getProperty("mvc.view.resolver.url.prefix"));
		viewResolver.setSuffix(env.getProperty("mvc.view.resolver.url.suffix"));
		viewResolver.setOrder(3);
		//viewResolver.setViewClass(viewClass);
		//System.out.println("$$$$$$$$$$$$$$$$$$$$$$$$$$$$  viewResolver." + viewResolver.g);
		return viewResolver;
	}
	
	@Bean
	public HandlerExceptionResolver handlerExceptionResolver() {
		
		TDEcxeptionResolver tdEcxeptionResolver = new TDEcxeptionResolver();

		return tdEcxeptionResolver;
	}
	
	@Bean
	public HandlerExceptionResolver handlerExceptionResolverDefault() {
		
		DefaultHandlerExceptionResolver tdEcxeptionResolver = new DefaultHandlerExceptionResolver();

		return tdEcxeptionResolver;
	}
	
	@Bean
	public HandlerInterceptor tdHandlerInterceptor() {
		TdHandlerInterceptor tdHandlerInterceptor = new TdHandlerInterceptor();

		return tdHandlerInterceptor;
	}
	
	@Bean
	public HandlerMethodReturnValueHandler handlerMethodReturnValueHandler() {
//		HandlerMethodReturnValueHandlerComposite handlerMethodReturnValueHandlerComposite
//		        = new HandlerMethodReturnValueHandlerComposite();
//		
//		handlerMethodReturnValueHandlerComposite.addHandler(new TDHandlerMethodReturnValueHandler());
//		
		return new TDHandlerMethodReturnValueHandler();
		
	}
	
//	@Bean
//	public ViewNameMethodReturnValueHandler viewNameMethodReturnValueHandler() {
////		HandlerMethodReturnValueHandlerComposite handlerMethodReturnValueHandlerComposite
////		        = new HandlerMethodReturnValueHandlerComposite();
////		
////		handlerMethodReturnValueHandlerComposite.addHandler(new TDHandlerMethodReturnValueHandler());
////		
//		return new TDViewNameMethodReturnValueHandler();
//		
//	}


	
	@Override
	public void addReturnValueHandlers(
			List<HandlerMethodReturnValueHandler> returnValueHandlers) {
		System.out.println("!!!!! HandlerMethodReturnValueHandler :" +  returnValueHandlers);
		for (HandlerMethodReturnValueHandler hh : returnValueHandlers) {
			System.out.println("!!!!! HandlerMethodReturnValueHandler :" + hh.getClass().getName());
		}
		returnValueHandlers.add(handlerMethodReturnValueHandler());
	}
	

	
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		InterceptorRegistration interceptorRegistration = registry.addInterceptor(tdHandlerInterceptor());
		//interceptorRegistration.addPathPatterns("/**");
	}
	
	@Override
	public void configureDefaultServletHandling(
			DefaultServletHandlerConfigurer configurer) {

		configurer.enable("dispatcher");
	}

}