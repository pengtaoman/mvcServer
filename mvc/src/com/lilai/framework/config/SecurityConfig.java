package com.lilai.framework.config;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.sql.DataSource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.orm.hibernate4.support.OpenSessionInViewFilter;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.AbstractUserDetailsAuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.authentication.encoding.Md5PasswordEncoder;
import org.springframework.security.authentication.event.LoggerListener;
import org.springframework.security.config.annotation.SecurityConfigurer;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.WebSecurityConfigurer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.*;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.FilterChainProxy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.ExceptionTranslationFilter;
import org.springframework.security.web.access.intercept.FilterSecurityInterceptor;
import org.springframework.security.web.authentication.AnonymousAuthenticationFilter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.security.web.authentication.session.CompositeSessionAuthenticationStrategy;
import org.springframework.security.web.authentication.session.ConcurrentSessionControlAuthenticationStrategy;
import org.springframework.security.web.authentication.session.RegisterSessionAuthenticationStrategy;
import org.springframework.security.web.authentication.session.SessionAuthenticationStrategy;
import org.springframework.security.web.authentication.session.SessionFixationProtectionStrategy;
import org.springframework.security.web.authentication.switchuser.SwitchUserFilter;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
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

import com.lilai.framework.config.AppConfig;
import com.lilai.framework.security.filter.TDCaptchaFilter;
import com.lilai.framework.security.filter.TDSecurityFilter;
import com.lilai.framework.security.handler.XMLHttpRequestAccessHandler;
import com.lilai.framework.security.handler.XMLHttpRequestLoginFailerHandler;
import com.lilai.framework.security.provider.TDAuthenticationManager;
import com.lilai.framework.security.provider.TDUserAuthenticationProvider;
import com.lilai.framework.security.service.TDUserDetailService;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter{

	private Logger logger = LogManager.getLogger(SecurityConfig.class);
	
	//AbstractUserDetailsAuthenticationProvider AuthenticationProvider；
	
	@Autowired
	private TDUserDetailService tdUserDetailService;
	
	  WebAsyncManagerIntegrationFilter webAsyncManagerIntegrationFilter;
	  SecurityContextPersistenceFilter securityContextPersistenceFilter;
	  HeaderWriterFilter headerWriterFilter;
	  LogoutFilter logoutFilter;
	  TDCaptchaFilter tdCaptchaFilter;
	  ConcurrentSessionFilter concurrentSessionFilter;
	  TDSecurityFilter tdSecurityFilter;
	  UsernamePasswordAuthenticationFilter usernamePasswordAuthenticationFilter;
	  RequestCacheAwareFilter requestCacheAwareFilter;
	  SecurityContextHolderAwareRequestFilter securityContextHolderAwareRequestFilter;
	  AnonymousAuthenticationFilter anonymousAuthenticationFilter;
	  SessionManagementFilter sessionManagementFilter;
	  ExceptionTranslationFilter exceptionTranslationFilter;
	  FilterSecurityInterceptor filterSecurityInterceptor;
	
	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth)
			throws Exception {
		

		logger.trace(">>>>>>>>>>>>>>>>>>>>  auth >>>>>>>>>>>>>>>" + auth.getClass().getName());
		//logger.trace(">>>>>>>>>>>>>>>>>>>>  dataSource >>>>>>>>>>>>>>>" + dataSource);
		//auth.get
		//auth.getConfigurers(clazz)
		//auth.
		System.out.println(">>>>>>>>>>>>>>>>>>>>  getDefaultUserDetailsService >>>>>>>>>>>>>>>" + auth.getDefaultUserDetailsService());
		auth.inMemoryAuthentication().withUser("user").password("1")
				.roles("admin");
		//AuthenticationEntryPoint aa;
		//SecurityContextPersistenceFilter
		 //Boolean.TRUE
		
		System.out.println(">>>>>>>>>>>>>>>>>>>>  SECURITY ORDER 111111111111111111111111111");
	}
	

	
	@Override
	protected void configure(AuthenticationManagerBuilder registry)
			throws Exception {
		registry.userDetailsService(tdUserDetailService).passwordEncoder(bCryptPasswordEncoder());  
		registry.authenticationProvider(tdUserAuthenticationProvider());		
		System.out.println(">>>>>>>>>>>>>>>>>>>>  SECURITY ORDER 22222222222222222222222222");
		
	}

	@Override
	public void configure(WebSecurity web) throws Exception {
		web.debug(true);
		//web.
		web.ignoring().antMatchers("/resources/**","/bower_components/**","/main/tdlogin", "/main/register", "/main/logout","/app01/**");
		//web.
		
		System.out.println(">>>>>>>>>>>>>>>>>>>>  SECURITY ORDER 333333333333333333333333333333333");
	
	}
	@Override
	protected void configure(HttpSecurity http) throws Exception {

		
		http.addFilterBefore(new TDSecurityFilter(), UsernamePasswordAuthenticationFilter.class);
		http.addFilterBefore(concurrentSessionFilter(), TDSecurityFilter.class);
		http.addFilterBefore(new TDCaptchaFilter(), ConcurrentSessionFilter.class);
		
//		OpenSessionInViewFilter openSessionInViewFilter = new OpenSessionInViewFilter();
//		openSessionInViewFilter.setSessionFactoryBeanName("entityManagerFactory");
//		http.addFilterAfter(openSessionInViewFilter, SwitchUserFilter.class);
		
		http.csrf().disable().authorizeRequests()
		        .antMatchers("/**").hasRole("tduser")
		        //.antMatchers("/app01/**").access("hasRole('ADMIN') and hasRole('DBA')")
		        .anyRequest().authenticated()
				.and()
				.formLogin()
				//.failureHandler(xmlHttpRequestLoginFailerHandler())
				.loginPage("/main/tdlogin")
				.defaultSuccessUrl("/main")
				.loginProcessingUrl("/main/login")
				//if failureHandler has been configged,failureUrl would be disabled.
				.failureUrl("/main/tdlogin?loginfailureUrl")
				.and()
				.exceptionHandling()
				//.accessDeniedHandler(xmlHttpRequestAccessHandler())
				.accessDeniedPage("/main/tdlogin?access-denied")
				; 
		
		http.sessionManagement().sessionFixation().newSession()//.changeSessionId()
		        .sessionAuthenticationStrategy(compositeSessionAuthenticationStrategy())
		        .sessionAuthenticationErrorUrl("/main/tdlogin?sessionAuthenticationErrorUrl")
		        ;
		http.logout().deleteCookies("JSESSIONID")
		        .logoutUrl("/main/tdlogout")
		        .logoutSuccessUrl("/main/tdlogin?logoutSuccess")  
                .invalidateHttpSession(true);

		System.out.println(">>>>>>>>>>>>>>>>>>>>  SECURITY ORDER 44444444444444444444444444444444444");
		
	}
	
	

	@Bean
	public SessionRegistry sessionRegistry() {
		SessionRegistry sessionRegistry = new SessionRegistryImpl();
		System.out.println(">>>>>>> is same SessionRegistry ? " + sessionRegistry.getAllPrincipals());
		return sessionRegistry;
	}
	
	@Bean
	public SessionFixationProtectionStrategy sessionFixationProtectionStrategy() {
		return new SessionFixationProtectionStrategy();
	}
	
	@Bean
	public ConcurrentSessionControlAuthenticationStrategy concurrentSessionControlAuthenticationStrategy() {
		System.out.println("11111111111111111111111111111111  " + sessionRegistry());
		ConcurrentSessionControlAuthenticationStrategy concurrentSessionControlAuthenticationStrategy = 
				new ConcurrentSessionControlAuthenticationStrategy(sessionRegistry());
		concurrentSessionControlAuthenticationStrategy.setMaximumSessions(1);
		concurrentSessionControlAuthenticationStrategy.setExceptionIfMaximumExceeded(false);
		return concurrentSessionControlAuthenticationStrategy;
	}
	
	@Bean
	public RegisterSessionAuthenticationStrategy registerSessionAuthenticationStrategy() {
		System.out.println("22222222222222222222222222222222  " + sessionRegistry());
		return new RegisterSessionAuthenticationStrategy(sessionRegistry());
	}
	
	@Bean
	public CompositeSessionAuthenticationStrategy compositeSessionAuthenticationStrategy() {
		List<SessionAuthenticationStrategy> straLst = new ArrayList<SessionAuthenticationStrategy>();
		straLst.add(concurrentSessionControlAuthenticationStrategy());
		straLst.add(sessionFixationProtectionStrategy());
		straLst.add(registerSessionAuthenticationStrategy());
		return new CompositeSessionAuthenticationStrategy(straLst);
	}
	
	@Bean
	public ConcurrentSessionFilter concurrentSessionFilter() {
		System.out.println("333333333333333333333333333333333  " + sessionRegistry());
		ConcurrentSessionFilter concurrentSessionFilter = new ConcurrentSessionFilter(sessionRegistry(), "/main/tdlogin?expired");

		return concurrentSessionFilter;
	}
	
	@Bean 
	public UsernamePasswordAuthenticationFilter usernamePasswordAuthenticationFilter() throws Exception  {
		UsernamePasswordAuthenticationFilter usernamePasswordAuthenticationFilter = new UsernamePasswordAuthenticationFilter(); 
	    usernamePasswordAuthenticationFilter.setAuthenticationManager(authenticationManagerBean());  
		usernamePasswordAuthenticationFilter.setSessionAuthenticationStrategy(compositeSessionAuthenticationStrategy());
		return usernamePasswordAuthenticationFilter;
	}
	

	
	@Bean
	public LoggerListener loggerListener() {
		logger.info("org.springframework.security.authentication.event.LoggerListener");
		LoggerListener loggerListener = new LoggerListener();

		return loggerListener;
	}

	@Bean
	public org.springframework.security.access.event.LoggerListener eventLoggerListener() {
		logger.info("org.springframework.security.access.event.LoggerListener");
		org.springframework.security.access.event.LoggerListener eventLoggerListener = new org.springframework.security.access.event.LoggerListener();

		return eventLoggerListener;
	}
	
	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder(11);
	}
	
	@Bean
	public TDUserAuthenticationProvider tdUserAuthenticationProvider() throws Exception {
         System.out.println("<<<<  TDUserAuthenticationProvider  TDUserAuthenticationProvider ");
		 return new TDUserAuthenticationProvider();
		 
	}
	
	@Bean
	public XMLHttpRequestAccessHandler xmlHttpRequestAccessHandler() {
		return new XMLHttpRequestAccessHandler();
	}


	@Bean
	public XMLHttpRequestLoginFailerHandler xmlHttpRequestLoginFailerHandler() {
		return new XMLHttpRequestLoginFailerHandler();
	}
	

}