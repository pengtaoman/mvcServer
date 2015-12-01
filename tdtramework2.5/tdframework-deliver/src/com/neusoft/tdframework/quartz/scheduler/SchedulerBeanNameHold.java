package com.neusoft.tdframework.quartz.scheduler;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.BeanNameAware;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

public class SchedulerBeanNameHold  implements
BeanNameAware , ApplicationContextAware {
	private static ApplicationContext appCtx = null;
	
	private final List<String> beanNameLst = new ArrayList<String>();
	
	private static String beanName = null;
	
	public static ApplicationContext getApplicationContext() {
	    return appCtx;
	}

	
	public void setBeanName(String name) {
		beanName = name;
	}


	public void setApplicationContext(ApplicationContext arg0)
			throws BeansException {
		appCtx = arg0;
		
	}
	
	public static SchedulerBeanNameHold getInstance() {
		return (SchedulerBeanNameHold)appCtx.getBean(beanName);
	}
	
	public synchronized void addBeanName(String name) {
		beanNameLst.add(name);
	}
	
	public List<String> getBeanNameLst() {
		return this.beanNameLst;
	}

}
