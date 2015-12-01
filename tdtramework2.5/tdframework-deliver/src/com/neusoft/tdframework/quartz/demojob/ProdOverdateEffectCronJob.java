package com.neusoft.tdframework.quartz.demojob;

import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.tdframework.memcache.CacheManagerProxy;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;
import com.neusoft.unieap.comp.jobscheduling.bean.EAPJobBean;

/**
 * 功能类产品实例到期处理cron_job
 * 
 * @author yuhj
 * 
 */
public class ProdOverdateEffectCronJob extends EAPJobBean {
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
		try {
			SysLog.writeLogs("ProdOverdateEffectCronJob", GlobalParameters.INFO,
					"###############  ProdOverdateEffectCronJob--executeInternal：" + paramJobExecutionContext.getScheduler().getContext().get("SERVER-INFO"));

		} catch (Exception e) {
			SysLog.writeLogs("ProdOverdateEffectJob", GlobalParameters.ERROR, "ProdOverdateEffectJob--executeInternal："
					+ e.getMessage());
		}
	}
}
