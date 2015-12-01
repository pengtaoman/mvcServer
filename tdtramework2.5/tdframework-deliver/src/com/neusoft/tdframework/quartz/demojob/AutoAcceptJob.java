package com.neusoft.tdframework.quartz.demojob;

import java.util.concurrent.ArrayBlockingQueue;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

//import com.neusoft.crm.ordermgr.business.secondaccept.openservice.AutoAcceptBO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.tdframework.memcache.CacheManagerProxy;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;
import com.neusoft.unieap.comp.jobscheduling.bean.EAPJobBean;

public class AutoAcceptJob extends EAPJobBean {

	@Override
	protected void executeInternal(JobExecutionContext arg0)
			throws JobExecutionException {
	
		InteractionObjectFactory factory = InteractionObjectFactory
		.getInstance();
			try {
				SysLog.writeLogs("AutoAcceptJob", GlobalParameters.INFO,
						"###############  AutoAcceptJob--executeInternal£º" + this.hashCode());
			} catch (Exception e) {
				SysLog.writeLogs("AutoAcceptJob", GlobalParameters.ERROR,
						"AutoAcceptJob--doRecoverPhone£º" + e.getMessage());
			}
	}

}
