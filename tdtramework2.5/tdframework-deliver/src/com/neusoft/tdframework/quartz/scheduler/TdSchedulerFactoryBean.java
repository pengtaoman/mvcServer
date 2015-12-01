package com.neusoft.tdframework.quartz.scheduler;

import org.springframework.beans.factory.BeanNameAware;
import org.springframework.scheduling.quartz.SchedulerFactoryBean;

import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.log.SysLog;

public class TdSchedulerFactoryBean extends SchedulerFactoryBean implements
		BeanNameAware {

	public void setBeanName(String name) {
		
		//SysLog.writeLogs(" TdSchedulerFactoryBean ", GlobalParameters.INFO, "###############  BEAN-NAME £º" + name);
		SchedulerBeanNameHold.getInstance().addBeanName(name);

	}



}
