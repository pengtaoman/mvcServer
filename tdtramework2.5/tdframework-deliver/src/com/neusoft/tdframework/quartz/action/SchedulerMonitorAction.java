package com.neusoft.tdframework.quartz.action;

import java.io.PrintWriter;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.quartz.CronTrigger;
import org.quartz.JobDataMap;
import org.quartz.JobDetail;
import org.quartz.Scheduler;
import org.quartz.Trigger;
import org.quartz.impl.StdScheduler;
import org.quartz.impl.StdSchedulerFactory;

import com.neusoft.tdframework.common.util.NullProcessUtil;
import com.neusoft.tdframework.common.util.json.JsonUtil;
import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.tdframework.memcache.CacheManagerProxy;
import com.neusoft.tdframework.quartz.bo.SchedulerMonitorBO;
import com.neusoft.tdframework.quartz.data.JobVO;
import com.neusoft.tdframework.quartz.data.SchedulerVO;
import com.neusoft.tdframework.quartz.data.TriggerVO;
import com.neusoft.tdframework.quartz.scheduler.SchedulerBeanNameHold;
import com.neusoft.tdframework.quartz.utility.SchedulerUtil;
import com.neusoft.tdframework.web.struts.TDDispatchAction;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;
import com.neusoft.unieap.util.RequestUtil;

public class SchedulerMonitorAction extends TDDispatchAction {
	
	public ActionForward init (ActionMapping actionMapping,
			ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws ActionException {
		
		InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
		
		try {
			AppContext appContext03 = new AppContextImpl();
			appContext03.setApplicationName("home");
			SchedulerMonitorBO schedulerMonitorBO = (SchedulerMonitorBO) factory
					.getInteractionObject(SchedulerMonitorBO.SchedulerMonitor_BEANNAME, appContext03);
			
			request.setAttribute("httpWarsLst", schedulerMonitorBO.getHttpWars());
		    request.setAttribute("httpWars", JsonUtil.bean2Json(schedulerMonitorBO.getHttpWars()));
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return actionMapping.findForward("init");
	}

	public ActionForward getSchedulers (ActionMapping actionMapping,
			ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws ActionException {
		
		InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
		
		try {
			String ca = request.getParameter("callback");
			String json = JsonUtil.bean2Json(SchedulerUtil.getSchInfo());
			
			int port = request.getServerPort();
			String targetUrl = request.getScheme() + "://"
					+ request.getServerName() + ":" + port
					+ request.getContextPath() + "/";
			
			String retJson = new StringBuffer("{id:'").append(targetUrl).append("',sche:").append(json).append("}").toString();
			json = ca + "("+retJson+");";
			 response.setContentType("text/javascript; charset=UTF-8");
		        PrintWriter out = response.getWriter();
		        out.println(json);
		        
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return null;
	}
	
	public ActionForward stopScheduler (ActionMapping actionMapping,
			ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws ActionException {
		
		InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
		try {
			int port = request.getServerPort();
			String targetUrl = request.getScheme() + "://"
					+ request.getServerName() + ":" + port
					+ request.getContextPath() + "/";
			CacheManagerProxy cacheManagerProxy = CacheManagerProxy.getInstanceOfEhCacheProxy();
			java.util.Properties property = (java.util.Properties)cacheManagerProxy.peek("ENVCONF");
			String schAppname = property.getProperty("scheduler.applicationName");
			String schedulerName = request.getParameter("scheName");

				AppContext appContext02 = new AppContextImpl();
				appContext02.setApplicationName(schAppname);
				      
				StdScheduler stdScheduler = (StdScheduler) factory
						.getInteractionObject(schedulerName, appContext02);
				stdScheduler.standby();


		    //boolean isStarted = stdScheduler.isPaused();
		    //String aa="";
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return this.init(actionMapping, actionForm, request, response);
	}
	
	public ActionForward startScheduler (ActionMapping actionMapping,
			ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws ActionException {
		
		InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
		try {
			int port = request.getServerPort();
			String targetUrl = request.getScheme() + "://"
					+ request.getServerName() + ":" + port
					+ request.getContextPath() + "/";
			CacheManagerProxy cacheManagerProxy = CacheManagerProxy.getInstanceOfEhCacheProxy();
			java.util.Properties property = (java.util.Properties)cacheManagerProxy.peek("ENVCONF");
			String schAppname = property.getProperty("scheduler.applicationName");
			String schedulerName = request.getParameter("scheName");
			
			AppContext appContext03 = new AppContextImpl();
			appContext03.setApplicationName("home");
			SchedulerMonitorBO schedulerMonitorBO = (SchedulerMonitorBO) factory
					.getInteractionObject(SchedulerMonitorBO.SchedulerMonitor_BEANNAME, appContext03);
			
			boolean upScuess = schedulerMonitorBO.updateWar(schedulerName, targetUrl);
			
			if (upScuess) {
				AppContext appContext02 = new AppContextImpl();
				appContext02.setApplicationName(schAppname);
				      
				StdScheduler stdScheduler = (StdScheduler) factory
						.getInteractionObject(schedulerName, appContext02);
				stdScheduler.start();

			}

		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return this.init(actionMapping, actionForm, request, response);
	}

}
