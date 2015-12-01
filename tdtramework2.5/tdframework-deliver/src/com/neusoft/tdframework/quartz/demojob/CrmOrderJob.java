/**
 * 文件说明信息
 */
package com.neusoft.tdframework.quartz.demojob;

import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

//import com.neusoft.crm.ordermgr.business.orderreceive.bo.impl.OrderReceiveJobBOImpl;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.tdframework.memcache.CacheManagerProxy;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;
import com.neusoft.unieap.comp.jobscheduling.bean.EAPJobBean;

/**<p>Module: </p>
 * <p>Description: </p>
 * <p>Remark: </p>
 * <p>Date: 2012-5-7</p>
 *
 * @author chezhl
 * @version
 * 
 * <p> 修改历史</p>
 * <p> 序号 日期 修改人 修改原因</p>
 * 
 */
public class CrmOrderJob extends EAPJobBean {
	private static ConcurrentHashMap<String, ArrayBlockingQueue<Integer>> queueMap = new ConcurrentHashMap<String, ArrayBlockingQueue<Integer>>();
	
	private ArrayBlockingQueue<Integer> getQueueMap(String threadPool){
		return queueMap.get(threadPool);
	}
	
//	private synchronized void setQueueMap(String threadPool, ArrayBlockingQueue<Integer> queue){
//		if (queueMap.get(threadPool) == null){
//			queueMap.put(threadPool, queue);
//		}
//	}
	private void setQueueMap(String threadPool, ArrayBlockingQueue<Integer> queue){
		queueMap.put(threadPool, queue);
	}
	
	public ArrayBlockingQueue<Integer> getQueue(String threadPool){
		
		SysLog.writeLogs("CrmOrderJob", GlobalParameters.INFO,
				"###############  CrmOrderJob--getQueue：" + this.hashCode());
		ArrayBlockingQueue<Integer> queue = null;
		try {
			queue = getQueueMap(threadPool);
			if (queue == null) {
				// 加同步，原因：防止在初始化的时候，循环的i乱套。不会影响性能，因为只有在启动的时候满足queue==null--add by yu_hj
				synchronized ("crmOrderJob".intern()) {
					queue = new ArrayBlockingQueue<Integer>(10);
					AtomicInteger at = new AtomicInteger();
					queue.put(at.intValue());
					queue.put(at.addAndGet(1));
					queue.put(at.addAndGet(1));
					queue.put(at.addAndGet(1));
					queue.put(at.addAndGet(1));
					queue.put(at.addAndGet(1));
					queue.put(at.addAndGet(1));
					queue.put(at.addAndGet(1));
					queue.put(at.addAndGet(1));
					queue.put(at.addAndGet(1));
//					for (int i = 0; i < 10; i++) {
//						queue.put(i);
//					}
					setQueueMap(threadPool, queue);
				}
			}
		} catch (InterruptedException e) {
			SysLog.writeLogs("CrmOrderJob", GlobalParameters.ERROR,
					"CrmOrderJob--getQueue：" + e.getMessage());
		}
		return queue;
	}

	/**<p>Description: </p>
	 * <p>Remark: </p>
	 * @param paramJobExecutionContext
	 * @throws JobExecutionException
	 */
	@Override
	protected void executeInternal(JobExecutionContext paramJobExecutionContext)
			throws JobExecutionException {
		InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
	    String appName = "ordermgr";
	    AppContext appContext = new AppContextImpl();
	    appContext.setApplicationName(appName);
	    try {
			SysLog.writeLogs("CrmOrderJob", GlobalParameters.INFO,
					"###############  CrmOrderJob--executeInternal：" + this.hashCode());

	    } catch (Exception e) {
	    	SysLog.writeLogs("CrmOrderJob", GlobalParameters.ERROR,
					"CrmOrderJob--executeInternal：" + e.getMessage());
	    }
	}
}
