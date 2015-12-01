package com.neusoft.tdframework.common;

import java.lang.reflect.Method;

import org.springframework.aop.AfterReturningAdvice;
import org.springframework.aop.MethodBeforeAdvice;

import com.neusoft.tdframework.memcache.CacheManagerProxy;

public class TraceLogInterceptor implements MethodBeforeAdvice, AfterReturningAdvice {

    public void before(Method method, Object[] args, Object target) throws Throwable {
    	CacheManagerProxy cacheManagerProxy = CacheManagerProxy.getInstanceOfEhCacheProxy();
	    java.util.Properties property = (java.util.Properties)cacheManagerProxy.peek("ENVCONF");
	    String traceLogEnabled = property.getProperty("td.tracelog.enabled");
	    if ("1".equals(traceLogEnabled)) {
	    	
	    	com.neusoft.jdbc.spy.TraceLogUtil.begin(com.neusoft.jdbc.spy.LogConstants.INFO_LEVEL, target.getClass().getName(), method.getName());
	    }
    }

    public void afterReturning(Object returnValue, Method method, Object[] args, Object target) throws Throwable {
    	CacheManagerProxy cacheManagerProxy = CacheManagerProxy.getInstanceOfEhCacheProxy();
	    java.util.Properties property = (java.util.Properties)cacheManagerProxy.peek("ENVCONF");
	    String traceLogEnabled = property.getProperty("td.tracelog.enabled");
	    if ("1".equals(traceLogEnabled)) {
	    	
	    	com.neusoft.jdbc.spy.TraceLogUtil.end(com.neusoft.jdbc.spy.LogConstants.INFO_LEVEL, target.getClass().getName(), method.getName());
	    }
    }


}