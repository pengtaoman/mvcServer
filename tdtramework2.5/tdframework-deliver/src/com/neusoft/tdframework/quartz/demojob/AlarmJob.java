/**
 * 文件说明信息
 */
package com.neusoft.tdframework.quartz.demojob;

import java.util.concurrent.ArrayBlockingQueue;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

//import com.neusoft.crm.ordermgr.common.commsms.bo.SmsSendBO;
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
 * <p>Date: 2012-4-28</p>
 *
 * @author chezhl
 * @version
 * 
 * <p> 修改历史</p>
 * <p> 序号 日期 修改人 修改原因</p>
 * 
 */
public class AlarmJob extends EAPJobBean {

	/**<p>Description: </p>
	 * <p>Remark: </p>
	 * @param paramJobExecutionContext
	 * @throws JobExecutionException
	 */
	@Override
	protected void executeInternal(JobExecutionContext paramJobExecutionContext)
			throws JobExecutionException {
		SysLog.writeLogs("AlarmJob", GlobalParameters.INFO,
				"###############  AlarmJob--executeInternal：" + this.hashCode());
		InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
	    String appName = "quartz";
	    AppContext appContext = new AppContextImpl();
	    appContext.setApplicationName(appName);
	    try {

	    } catch (Exception e) {
	    	e.printStackTrace();
	    	SysLog.writeLogs("AlarmJob", GlobalParameters.ERROR,
					"AlarmJob--executeInternal：" + e.getMessage());
	    }
	}
}
