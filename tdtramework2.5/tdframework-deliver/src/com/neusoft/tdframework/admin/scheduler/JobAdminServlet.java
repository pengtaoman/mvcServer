package com.neusoft.tdframework.admin.scheduler;
import java.io.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import javax.servlet.*;
import javax.servlet.http.*;

import org.quartz.SchedulerException;

import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.common.util.DateUtil;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.unieap.comp.jobscheduling.service.SchedulerService;
import com.neusoft.unieap.config.CacheConfig;
import com.neusoft.unieap.config.SchedulingConfig;
import com.neusoft.unieap.service.cache.ICacheManager;
import com.neusoft.unieap.service.cache.exception.CachingException;

public class JobAdminServlet  extends HttpServlet{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private static ICacheManager manager = CacheConfig.manager;

	public void init() throws ServletException
    {
		//String initial=getInitParameter("initial");
		try{
			//count=Integer.parseInt(initial);
		}
		catch(NumberFormatException e){
			//count=0;
		}
	}
	public void doGet(HttpServletRequest req,HttpServletResponse res) throws ServletException,IOException
	{
		SchedulerService schedulerService = new SchedulerService();
		List ids = null;
		try {
			ids = getSchedulerIDs("");
			Iterator it = ids.iterator();
			while(it.hasNext()){
			String schedulerID = (String)it.next();
			    schedulerService.shutdownScheduler(schedulerID);
			}
		} catch (SchedulerException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ServiceException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		String flag = (String)req.getParameter("flag");
		if(flag!=null&&flag.equals("test")){
			res.setContentType("text/html;charset=GBK");
			res.setHeader("Cache-Control", "no-cache");
			PrintWriter out = res.getWriter();
			out.write(getTestPage(req));
			out.flush();
			out.close();
		}


	}
	
	private String getTestPage(HttpServletRequest request){
		String dbdate = null;
		StringBuffer but = new StringBuffer("");
		String path = request.getContextPath();
		String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
		String promptStr = "<font size=\"3\" color=\"#FF0000\">"+basePath+"应用测试页面,访问成功!</font><br/>";
		try{
			dbdate = DateUtil.getDateFromDB();
		}catch(Exception e){
			promptStr = "<font size=\"3\" color=\"#0000FF\">"+basePath+"应用测试页面,访问失败!</font><br/>";
		}

		but.append("<html>");
		but.append("<head>");
		but.append("<meta http-equiv=\"Content-Type\" content=\"text/html; charset=GBK\" />");
		but.append("<title>河北联通新一代BSS系统</title>");
		but.append("</head>");
		but.append("<body>");
		but.append(promptStr);
		but.append("</body>");
		but.append("</html>");
		return but.toString();
	}
	
	  
	public void destroy(){
		super.destroy();
		SchedulerService schedulerService = new SchedulerService();
		List ids = null;
		try {
			ids = getSchedulerIDs("");
			Iterator it = ids.iterator();
			while(it.hasNext()){
				String schedulerID = (String)it.next();
			    schedulerService.shutdownScheduler(schedulerID);
			}
		} catch (SchedulerException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ServiceException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	 }
	
	public List getSchedulerIDs(String appName) throws ServiceException {
		List list = new ArrayList();
		try{
			Set set = null;
			set = manager.listCacheKeys(SchedulingConfig.SCHEDULER_GROUP,SchedulingConfig.SCHEDULER_REGION);
			Iterator result = set.iterator();
			//HashMap map = null;
			while( result.hasNext()){
				String cObject = (String)result.next();
				list.add(cObject);
			}
		}catch (DataAccessException e) {
			SysLog.writeLogs("tdframework",GlobalParameters.ERROR,"JobServlet--getSchedulerIDs()-1 :"+e.getMessage());
			throw new ServiceException(e);
		}catch (CachingException e) {
			SysLog.writeLogs("tdframework",GlobalParameters.ERROR,"JobServlet--getSchedulerIDs()-2 :"+e.getMessage());
			throw new ServiceException(e);
		}
		return list;
  	} 
}
