package com.neusoft.tdframework.quartz.utility;

import java.util.ArrayList;
import java.util.List;

import org.quartz.CronTrigger;
import org.quartz.JobDataMap;
import org.quartz.JobDetail;
import org.quartz.Trigger;
import org.quartz.impl.StdScheduler;

import com.neusoft.tdframework.memcache.CacheManagerProxy;
import com.neusoft.tdframework.quartz.data.JobVO;
import com.neusoft.tdframework.quartz.data.SchedulerVO;
import com.neusoft.tdframework.quartz.data.TriggerVO;
import com.neusoft.tdframework.quartz.scheduler.SchedulerBeanNameHold;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;

public class SchedulerUtil {
	
	 
	public static List<SchedulerVO> getSchInfo() {
		java.text.SimpleDateFormat sd = new java.text.SimpleDateFormat( "yyyyƒÍM‘¬d»’  (E) a HH:mm:ss SSS");
		InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
		try {
			
			CacheManagerProxy cacheManagerProxy = CacheManagerProxy.getInstanceOfEhCacheProxy();
			java.util.Properties property = (java.util.Properties)cacheManagerProxy.peek("ENVCONF");
 			String schAppname = property.getProperty("scheduler.applicationName");
			
			List<String> beanNameLst = SchedulerBeanNameHold.getInstance()
					.getBeanNameLst();
			List<SchedulerVO> returnLst = new ArrayList<SchedulerVO>();
			
			for (String beanName : beanNameLst) {
				try {
				SchedulerVO schedulerVO = new SchedulerVO();
				AppContext appContext02 = new AppContextImpl();
				appContext02.setApplicationName(schAppname);
				      
				StdScheduler stdScheduler = (StdScheduler) factory
						.getInteractionObject(beanName, appContext02);
				int tNumber = stdScheduler.getMetaData().getThreadPoolSize();

				schedulerVO.settNumber(tNumber);
				schedulerVO.setSchName(beanName);

				boolean isScheStarted = stdScheduler.isStarted() && !stdScheduler.isPaused();
				schedulerVO.setScheStarted(isScheStarted);
				String scheSummary = stdScheduler.getMetaData().getSummary();
				schedulerVO.setScheSummary(scheSummary);
				String httpInfo = (String)stdScheduler.getContext().get("SERVER-INFO");

				schedulerVO.setHttpInfo(httpInfo);
				
				if (isScheStarted) {
				    String beginTime = sd.format(stdScheduler.getMetaData().getRunningSince());
				    schedulerVO.setBeginTime(beginTime);
				}
				
				String[] gNames = stdScheduler.getJobGroupNames();
				for(String gname : gNames) {
					String[] jobNames = stdScheduler.getJobNames(gname);
					for (String jname : jobNames) {
						
						JobDetail jobDetail = stdScheduler.getJobDetail(jname, gname);
						String jobClass = jobDetail.getJobClass().getName();
						String jobDetailDes = jobDetail.getDescription();

						JobVO jobVO = new JobVO();
						jobVO.setJobClass(jobClass);
						jobVO.setJobDetailDes(jobDetailDes);
						jobVO.setJobGroup(gname);
						jobVO.setJobName(jobDetail.getName());
						
						Trigger[] triggers = stdScheduler.getTriggersOfJob(jname, gname);
						for (Trigger trigger : triggers) {
							CronTrigger cronTrigger = (CronTrigger)trigger;
							String cros = cronTrigger.getCronExpression();
							String triggerEndtime = "";
							String triDes = trigger.getDescription();
							if (trigger.getEndTime() != null){
								triggerEndtime = sd.format(trigger.getEndTime());
							} else {
								triggerEndtime = "";
							}
							String triggernexttime = sd.format(trigger.getNextFireTime());
							String triGroup = trigger.getGroup();
							
							TriggerVO triggerVO = new TriggerVO();
							triggerVO.setCros(cros);
							triggerVO.setTriDes(triDes);
							triggerVO.setTriggerEndtime(triggerEndtime);
							triggerVO.setTriggerGroupName(triGroup);
							triggerVO.setTriggerName(trigger.getName());
							triggerVO.setTriggernexttime(triggernexttime);
							
							jobVO.addTriggerVO(triggerVO);
						}
						
						schedulerVO.addJob(jobVO);
					}
					
					returnLst.add(schedulerVO);
				}
				} catch (Exception ex) {
					ex.printStackTrace();
				}
				//stdScheduler.t
			}
			return returnLst;
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		
		return null;
	}
	
	public static List<String> getHttpWars(List<SchedulerVO> schedulerVOLst) {
		List<String> httpWars = new ArrayList<String>();
		for (SchedulerVO schedulerVO : schedulerVOLst) {
			
			if (!httpWars.contains(schedulerVO.getHttpInfo())) {
				httpWars.add(schedulerVO.getHttpInfo());
			}
		}
		return httpWars;
		
	}
}
