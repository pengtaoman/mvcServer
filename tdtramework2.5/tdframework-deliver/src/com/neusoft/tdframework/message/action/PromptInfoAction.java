/**
 * 
 */
package com.neusoft.tdframework.message.action;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.springframework.remoting.caucho.HessianProxyFactoryBean;

import com.caucho.hessian.client.HessianProxyFactory;
import com.neusoft.om.dao.appcontainer.AppContainerDAO;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.tdframework.memcache.CacheManagerConst;
import com.neusoft.tdframework.memcache.MemCacheManager;
import com.neusoft.tdframework.memcache.MemCacheUtil;
import com.neusoft.tdframework.message.bo.PromptInfoBO;
import com.neusoft.tdframework.message.data.PromptInfoVO;
import com.neusoft.tdframework.portal.config.TDConfigHelper;
import com.neusoft.tdframework.action.TDServletWrapper;
import com.neusoft.tdframework.admin.cache.CacheService;
import com.neusoft.tdframework.authorization.AuthorizeVO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.web.struts.TDDispatchAction;
import com.neusoft.unieap.config.SystemConfig;
import com.neusoft.unieap.util.RequestUtil;

/**
 * @author yintj@neusoft.com
 * @version 2012-5-4 下午2:54:32
 */
public class PromptInfoAction extends TDDispatchAction {
	
	public ActionForward getPromptInfo(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) throws ActionException {
		// 数据收集业务类注入
		PromptInfoBO promptInfoBO = (PromptInfoBO) getServiceFacade("promptInfoBO", mapping);
		String result = null;
		try {

			RequestUtil requestUtil = new RequestUtil(request);
	
			String  busiCode = requestUtil.getParameter("busiCode");
			PromptInfoVO promptInfoVO = new PromptInfoVO();
			promptInfoVO.setBusiCode(busiCode);
			PromptInfoVO returnPromptInfoVO = promptInfoBO.getPromptInfo(busiCode);
			if (returnPromptInfoVO == null) {
				result = "{}";
			} else {
				result = com.neusoft.tdframework.common.util.json.JsonUtil.bean2Json(returnPromptInfoVO);
			}
		} catch (Exception e) {
			result = "{}";
		} finally {
			try {
				response.setContentType(SystemConfig.CONTENT_TYPE);
				response.getWriter().write(result);
			} catch (IOException e) {
				throw new ActionException(e);
			}
		}
		return null;
	}
	
	public ActionForward reloadCache(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) throws ActionException {
		// 数据收集业务类注入
		try {

            MemCacheManager memCacheManager = (MemCacheManager)getServiceFacade("memCacheManagerImpl");
            String[][] contextConfig = (String[][])memCacheManager.getMemcacheConfig().get(CacheManagerConst.CONTEXT_PATH_CONFIG_KEY);
			refreshPromptMessageCache(contextConfig);
			
		} catch (Exception e) {
			e.printStackTrace();
			throw new ActionException(e);
		} 
		request.setAttribute("reloaded", "true");
		return mapping.findForward("reloadScusess");
	}
	
	
	public ActionForward compress(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) throws ActionException {
		// 数据收集业务类注入
		String isbus = request.getParameter("isbus");
		try {
		    AppContainerDAO dao = (AppContainerDAO)getServiceFacade("containerDAO");
		    List<String> appNames = null;
		    if (isbus != null && "1".equals(isbus)) {
		    	appNames = dao.getAppNamesForCompress(false);
	    	} else {
	    		appNames = dao.getAppNamesForCompress(true);
	    	}
		    
		    List<String> hosts =  (List<String>)getHostNames();
		    StringBuilder sbu = new StringBuilder();
		    sbu.append("[");
		    int count = 1;
		    for(String host :hosts) {
		    	sbu.append("{id:'");
		    	sbu.append(count);
		    	sbu.append("'");
		    	sbu.append(",host:'");
		    	sbu.append(host);
		    	sbu.append("'");
		    	sbu.append(",context:'',url:'',opration:'',parent:'',leaf:false},");
		    	int countAppname = 1;
		    	for (String appname : appNames) {
		    		String idApp = count+"000"+countAppname;
		    		sbu.append("{id:'");
			    	sbu.append(idApp);
			    	sbu.append("'");
			    	sbu.append(",context:'");
			    	sbu.append("");
			    	sbu.append("'");
			    	sbu.append(",host:'");
			    	sbu.append(appname);
			    	sbu.append("',url:'http://");
			    	sbu.append(host);
			    	sbu.append("");
			    	sbu.append(appname);
			    	if (isbus != null && "1".equals(isbus)) {
			    		sbu.append("PreLoadCacheObject?compressJsCss=2");
			    	} else {
			    	    sbu.append("PreLoadCacheObject?compressJsCss=1");
			    	}
			    	sbu.append("',opration:'<a href=\"javascript:compress();\">压缩整合</a>'");
			    	sbu.append(",parent:'");
			    	sbu.append(count);
			    	sbu.append("',leaf:true");
			    	sbu.append("}");
			    	if (countAppname < appNames.size()) {
			    		sbu.append(",");
			    	}
		    		countAppname++;
		    	}
		    	if (count < hosts.size()) {
		    		sbu.append(",");
		    	}
		    	count++;
		    }
		    sbu.append("]");
		    request.setAttribute("json", sbu.toString());
		} catch (Exception ex) {
			ex.printStackTrace();
			SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.ERROR, "PromptInfoAction-compress:整合和压缩JS以及CSS文件失败。");
		}
		if (isbus != null && "1".equals(isbus)) {
		    return mapping.findForward("compressBusJsCss");
		}
		else {
			return mapping.findForward("compressJsCss");
	    }
	}
	
	
	public ActionForward getHostApps(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) throws ActionException {
		// 数据收集业务类注入
		try {
		    AppContainerDAO dao = (AppContainerDAO)getServiceFacade("containerDAO");
		    List<String> appNames = dao.getAppNames();
		    
		    List<String> hosts =  (List<String>)getHostNames();
		    StringBuilder sbu = new StringBuilder();
		    sbu.append("[");
		    int countHost = 1;
		    for(String host :hosts) {
		    	int countApp = 1;
		    	for (String appname : appNames) {
			    	sbu.append("{url:'http://");
			    	sbu.append(host);
			    	sbu.append("");
			    	sbu.append(appname);
			    	sbu.append("'}");

			    	if (countApp < appNames.size() || countHost < hosts.size()) {
			    		sbu.append(",");
			    	}
			    	countApp++;
		    	}
		    	countHost++;
		    }
		    sbu.append("]");
		    response.setContentType(SystemConfig.CONTENT_TYPE);
			response.getWriter().write(sbu.toString());
		} catch (Exception ex) {
			ex.printStackTrace();
			SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.ERROR, "PromptInfoAction-getHostApps:获取部署信息失败。");
		}
		return null;
	}
	
	public ActionForward getContexts(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) throws ActionException {
		// 数据收集业务类注入
		try {
		    AppContainerDAO dao = (AppContainerDAO)getServiceFacade("containerDAO");
		    List<String> appNames = dao.getAppNames();
		    StringBuilder sbu = new StringBuilder();
		    sbu.append("[");
	    	int countApp = 1;
	    	for (String appname : appNames) {
		    	sbu.append("{appname:'");
		    	sbu.append(appname);
		    	sbu.append("'}");

		    	if (countApp < appNames.size()) {
		    		sbu.append(",");
		    	}
		    	countApp++;
	    	}
		    sbu.append("]");
		    response.setContentType(SystemConfig.CONTENT_TYPE);
			response.getWriter().write(sbu.toString());
		} catch (Exception ex) {
			ex.printStackTrace();
			SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.ERROR, "PromptInfoAction-getContexts:获取部署上下文信息失败。");
		}
		return null;
	}
	
	
	public ActionForward setMoreCity(
				ActionMapping mapping,
				ActionForm form,
				HttpServletRequest request,
				HttpServletResponse response)
				throws Exception { 
			 AuthorizeVO authorizeVO = (AuthorizeVO)request.getSession().getAttribute(GlobalParameters.SESSION_INFO);
			 authorizeVO.setHomeCity(request.getParameter("cityCode"));
				 response.setContentType("text/html; charset=UTF-8");
			        PrintWriter out = response.getWriter();
			        out.println("OK   homecity:"+authorizeVO.getHomeCity()+"<form name='changeHomeCityCrm1' method='post'></form>");
			return null;
		}
	
	 private void refreshPromptMessageCache(String[][] contextConfig) throws Exception {
			boolean isNotLocal = TDConfigHelper.isCluster();

			String appName = "";
			if(!isNotLocal){
	    		CacheService service = (CacheService)getServiceFacade("localCacheService");
	    		service.reLoadPromptMessage();
			}else{
				List hosts = getHostNames();
				Iterator hostIt = hosts.iterator();
				while(hostIt.hasNext()){
					String hostName = (String)hostIt.next();
					CacheService service = null;
			        for (String[] config : contextConfig) {
			        	appName = "/" + config[0];
			        	service = getServiceByHostName(hostName,appName);
						if(service!=null)
						try{
							//System.out.println("############################# HOST : " + hostName);
							service.reLoadPromptMessage();
						}		
						catch(Exception e){
							SysLog.writeLogs("tdframework cache",GlobalParameters.ERROR,"PromptInfoAction--:refreshPromptMessageCache "+e.getMessage());
							//e.printStackTrace();
						}
			        }
					
					
				}
			}
		}
	 
	 private CacheService getServiceByHostName(String hostName,String appName){
	        HessianProxyFactoryBean factoryBean =  new HessianProxyFactoryBean();
	        HessianProxyFactory factory = new HessianProxyFactory();
	        CacheService service =null;
	        try{
	            factoryBean.setServiceUrl("http://"+hostName+ appName+"/remoting/CacheService");
	            factoryBean.setServiceInterface(com.neusoft.tdframework.admin.cache.CacheService.class);
	            factoryBean.setProxyFactory(factory);
	            factoryBean.prepare();
	            factoryBean.afterPropertiesSet();
	            service = (CacheService)factoryBean.getObject();
	        }
	        catch(Exception e){
	        	SysLog.writeLogs("om",GlobalParameters.ERROR,"CacheObjectManagerAction--getServiceByHostName-0 :"+e.getMessage());
	            //e.printStackTrace();
	        }
	        return service;
	    }
	 
	    private List getHostNames(){
	        AppContainerDAO dao = (AppContainerDAO)getServiceFacade("containerDAO");
	        List hostNames = dao.getHostNames();
	        return hostNames;
	    }
}
