package com.lilai.framework.config;

import java.io.Serializable;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import org.springframework.security.web.session.HttpSessionEventPublisher;
import org.springframework.session.MapSessionRepository;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;
import org.springframework.session.web.http.CookieHttpSessionStrategy;
import org.springframework.session.web.http.HeaderHttpSessionStrategy;
import org.springframework.session.web.http.HttpSessionStrategy;
import org.springframework.web.filter.DelegatingFilterProxy;

import redis.clients.jedis.JedisPoolConfig;

/**
 * @EnableRedisHttpSession
 * that implements Filter. The filter is what is in charge of replacing the HttpSession 
 * implementation to be backed by Spring Session. In this instance Spring Session is backed by Redis.
 * */
@Configuration
@EnableRedisHttpSession
public class RedisConfig {
	
	@Bean
	public JedisConnectionFactory jedisConnectionFactory(){
		System.out.println("##################### RedisConfig JedisConnectionFactory ##############");
		//@SuppressWarnings("deprecation")
		JedisPoolConfig jedisPoolConfig = new JedisPoolConfig();
		jedisPoolConfig.setMaxIdle(10);
		jedisPoolConfig.setMaxTotal(15);
		
		JedisConnectionFactory jedisConnectionFactory = new JedisConnectionFactory();
		jedisConnectionFactory.setHostName("192.168.99.100");
		jedisConnectionFactory.setPort(32768);
		jedisConnectionFactory.setPoolConfig(jedisPoolConfig);
		jedisConnectionFactory.setUsePool(true);
		
	    return jedisConnectionFactory;
	}
	
	
	@Bean(name="redisTemplate")
	public <K,V> RedisTemplate<K,V> redisTemplate(){
		
		System.out.println("##################### RedisConfig RedisTemplate ##############" );
		RedisTemplate<K,V> redisTemplate = new RedisTemplate<K,V>();
		redisTemplate.setConnectionFactory(jedisConnectionFactory());
		
        
		redisTemplate.setDefaultSerializer(new StringRedisSerializer());
		
		redisTemplate.setEnableDefaultSerializer(true);
	    return redisTemplate;
	}
	
	
	/**
	 * customize Spring Session’s HttpSession integration 
	 * to use HTTP headers to convey the current session information instead of cookies
	 * 
	 * Our Spring Configuration created a Spring Bean named springSessionRepositoryFilter 
	 * that implements Filter. The springSessionRepositoryFilter bean is responsible for replacing the HttpSession 
	 * with a custom implementation that is backed by Spring Session.
	 * 
	 * 
	 * String filterName = DEFAULT_FILTER_NAME;
		DelegatingFilterProxy springSessionRepositoryFilter = new DelegatingFilterProxy(
				filterName);
		String contextAttribute = getWebApplicationContextAttribute();
		if (contextAttribute != null) {
			springSessionRepositoryFilter.setContextAttribute(contextAttribute);
		}
		registerFilter(servletContext, true, filterName, springSessionRepositoryFilter);
	 * */
	@Bean
    public HttpSessionStrategy httpSessionStrategy() {
		
		//SpringSessionRepositoryFilter aa;
            return new CookieHttpSessionStrategy(); 
    }
	
	/**
	 * assume you want to support Spring Security’s 
	 * concurrency control and need to use HttpSessionEventPublisher 
	 * you can simply add HttpSessionEventPublisher as a bean.
	 * */
//	@Bean
//    public HttpSessionEventPublisher httpSessionEventPublisher() {
//            return new HttpSessionEventPublisher();
//    }
	
	/**
	 * String username = "username";
        Map<String,Session> sessionIdToSession =
        sessionRepository.findByIndexNameAndIndexValue(FindByIndexNameSessionRepository.PRINCIPAL_NAME_INDEX_NAME, username);
	 * 
	 * The @EnableSpringHttpSession annotation can be added 
	 * to an @Configuration class to expose the SessionRepositoryFilter as 
	 * a bean named "springSessionRepositoryFilter".
	 *  In order to leverage the annotation, a single SessionRepository bean must be provided. For example:


	 * */
	
	
	/**
	 * 
	 * It is important to note that no infrastructure for session expirations is configured for you out of the box. 
	 * This is because things like session expiration are highly implementation dependent. This means 
	 * if you require cleaning up expired sessions, you are responsible for cleaning up the expired sessions.
	 * */
//	@Bean
//    public MapSessionRepository sessionRepository() {
//            return new MapSessionRepository();
//    }
}
