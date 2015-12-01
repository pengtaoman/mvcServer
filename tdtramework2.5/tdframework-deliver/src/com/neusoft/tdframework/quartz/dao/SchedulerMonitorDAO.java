package com.neusoft.tdframework.quartz.dao;

import java.util.List;
import java.util.Map;

import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.exception.ServiceException;

public interface SchedulerMonitorDAO {
	public Map<String,String> getSchedulerWar() throws DataAccessException;
	
	public List<String> getHttpWars() throws DataAccessException;
	
	public boolean updateWar(String scheName, String httpwar) throws DataAccessException;

}
