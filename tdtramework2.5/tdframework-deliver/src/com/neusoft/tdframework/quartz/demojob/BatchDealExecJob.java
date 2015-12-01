/**
 * 文件说明信息
 */
package com.neusoft.tdframework.quartz.demojob;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

//import com.neusoft.crm.ordermgr.business.batchservice.common.bo.BatchDealExecJobBO;
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
 * Date: 2012-4-28
 * </p>
 * 
 * @author liurong
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
public class BatchDealExecJob extends EAPJobBean {

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
	protected void executeInternal(JobExecutionContext paramJobExecutionContext)
			throws JobExecutionException {
		

		InteractionObjectFactory factory = InteractionObjectFactory
				.getInstance();
//		String appName = "ordermgr";
//		AppContext appContext = new AppContextImpl();
//		appContext.setApplicationName(appName);
		try {
			SysLog.writeLogs("BatchDealExecJob", GlobalParameters.INFO,
					"###############  BatchDealExecJob--executeInternal：" + paramJobExecutionContext.getScheduler().getContext().get("SERVER-INFO"));


		} catch (Exception e) {
			SysLog.writeLogs("BatchDealExecJob", GlobalParameters.ERROR,
					"BatchDealExecJob--executeInternal：" + e.getMessage());
		}
	}
}
