package com.neusoft.tdframework.quartz.bo;

import java.util.List;
import java.util.Map;

import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.exception.ServiceException;

public interface SchedulerMonitorBO {
	
	public final static String SchedulerMonitor_BEANNAME="schedulerMonitorBO";
	
	public Map<String, String> getSchedulerWar() throws ServiceException;
	
	public List<String> getHttpWars() throws ServiceException;
	
	public boolean updateWar(String scheName, String httpwar) throws ServiceException;
}
