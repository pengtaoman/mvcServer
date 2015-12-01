package com.neusoft.tdframework.quartz.demojob;

import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

//import com.neusoft.crm.ordermgr.common.commmqsync.bo.impl.ForceQuitJob;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.tdframework.memcache.CacheManagerProxy;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;
import com.neusoft.unieap.comp.jobscheduling.bean.EAPJobBean;

/**
 * 强拆/强拆返销处理cron_job
 * 
 * @author yuhj
 * 
 */
public class ForceQuitCronJob extends EAPJobBean {
	private static ConcurrentHashMap<String, ArrayBlockingQueue<Integer>> queueMap = new ConcurrentHashMap<String, ArrayBlockingQueue<Integer>>();



	/**
	 * <p>
	 * Description:
	 * </p>
	 * <p>
	 * Remark:
	 * </p>
	 * 
	 * @param paramJobExecutionContext
	 * @throws JobExecutionException
	 */
	@Override
	protected void executeInternal(JobExecutionContext paramJobExecutionContext) throws JobExecutionException {
		
		InteractionObjectFactory factory = InteractionObjectFactory
				.getInstance();
		
		try {
			SysLog.writeLogs("ForceQuitCronJob", GlobalParameters.INFO,
					"###############  ForceQuitCronJob--executeInternal：" + paramJobExecutionContext.getScheduler().getContext().get("SERVER-INFO"));

			
		} catch (Exception e) {
			SysLog.writeLogs("ForceQuitCronJob", GlobalParameters.ERROR, "ForceQuitCronJob--executeInternal："
					+ e.getMessage());
		}
	}
}
