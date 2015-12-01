package com.neusoft.tdframework.quartz.bo;

import java.util.List;
import java.util.Map;

import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.quartz.dao.SchedulerMonitorDAO;

public class SchedulerMonitorBOImpl implements SchedulerMonitorBO {
	private SchedulerMonitorDAO schedulerMonitorDAO = null;
	
	
	public SchedulerMonitorDAO getSchedulerMonitorDAO() {
		return schedulerMonitorDAO;
	}


	public void setSchedulerMonitorDAO(SchedulerMonitorDAO schedulerMonitorDAO) {
		this.schedulerMonitorDAO = schedulerMonitorDAO;
	}


	public Map<String, String> getSchedulerWar() throws ServiceException {
		try { 
			return schedulerMonitorDAO.getSchedulerWar();
		}catch(Exception e){
			throw new ServiceException(e);
		}
	}
	
	public List<String> getHttpWars() throws ServiceException {
		try { 
			return schedulerMonitorDAO.getHttpWars();
		}catch(Exception e){
			throw new ServiceException(e);
		}
	}
	
	public boolean updateWar(String scheName, String httpwar) throws ServiceException {
		try { 
			return schedulerMonitorDAO.updateWar(scheName, httpwar);
		}catch(Exception e){
			throw new ServiceException(e);
		}
	}

}
