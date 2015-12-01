/**
 * 文件说明信息
 */
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
 * <p>
 * Module:
 * </p>
 * <p>
 * Description:
 * </p>
 * <p>
 * Remark:
 * </p>
 * <p>
 * Date: 2012-07-03
 * </p>
 * 
 * @author yu_hj
 * @version
 * 
 * <p>
 * 修改历史
 * </p>
 * <p>
 * 序号 日期 修改人 修改原因
 * </p>
 * 
 */
public class ReserveEffectCornJob extends EAPJobBean {
	private static ConcurrentHashMap<String, ArrayBlockingQueue<Integer>> queueMap = new ConcurrentHashMap<String, ArrayBlockingQueue<Integer>>();

	private ArrayBlockingQueue<Integer> getQueueMap(String threadPool) {
		return queueMap.get(threadPool);
	}

	private void setQueueMap(String threadPool, ArrayBlockingQueue<Integer> queue) {
		queueMap.put(threadPool, queue);
	}

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
			SysLog.writeLogs("ReserveEffectCornJob", GlobalParameters.INFO,
					"###############  ReserveEffectCornJob--executeInternal：" + paramJobExecutionContext.getScheduler().getContext().get("SERVER-INFO"));
		
			
		} catch (Exception e) {
			e.printStackTrace();
			SysLog.writeLogs("ReserveEffectCornJob", GlobalParameters.ERROR, "ReserveEffectCornJob--executeInternal："
					+ e.getMessage());
		}
	}
}
