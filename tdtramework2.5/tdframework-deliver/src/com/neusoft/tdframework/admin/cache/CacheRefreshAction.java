package com.neusoft.tdframework.admin.cache;


import java.util.ArrayList;
import java.util.Enumeration;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.springframework.remoting.caucho.HessianProxyFactoryBean;
//import org.apache.commons.lang.StringUtils;
import com.caucho.hessian.client.HessianProxyFactory;
import com.neusoft.om.dao.appcontainer.AppContainerDAO;
import com.neusoft.tdframework.authorization.AuthBOExt;
import com.neusoft.tdframework.authorization.AuthorizeFactory;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.common.util.CacheUtil;
import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.tdframework.portal.config.TDConfigHelper;
import com.neusoft.tdframework.web.struts.TDDispatchAction;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;
import com.neusoft.tdframework.log.SysLog;

/**brief description
 * <p>Date       : 2006-3-10</p>
 * <p>Module     : </p>
 * <p>Description: </p>
 * <p>Remark     : </p>
 * @author zhangjn
 * @version 1.0
 * <p>------------------------------------------------------------</p>
 * <p> 修改历史</p>
 * <p>  序号		日期		   修改人			修改原因   			</p>
 * <p>   1      2007-1-31  zhangjn      实现多应用的缓存刷新    </p>
 */
public class CacheRefreshAction extends TDDispatchAction{
//
//	static int DEFAULT_PAGE_SIZE=10;
//	
//	public CacheRefreshAction() {
//		super();
//	}
//
//	public ActionForward cacheManager(ActionMapping actionMapping,
//			ActionForm actionForm, HttpServletRequest request,
//			HttpServletResponse response) throws ActionException {
//		
//		List records=null;
//		String appName = request.getParameter("appName");
//		try{
//			CacheService service = (CacheService)getServiceFacade("localCacheService");
//			records=service.getObjects(appName);
//		}catch(Exception e){
//			e.printStackTrace();
//		}
//		//获取页面显示信息
//    	int totalRows=-1;
//    	String totalRowsS=request.getParameter("totalRows");
//    	if (totalRowsS!=null){
//    		try {
//        		totalRows=Integer.parseInt(totalRowsS);
//			} catch (Exception e) {
//				totalRows=-1;
//			}
//    	}
//    	if (totalRows<0){
//    		//取得总行数
//    		totalRows = records.size();
//    	}
//    	//设定页面totalRows参数
//    	super.getStartEnd(request,totalRows,totalRows);
//		request.setAttribute("optrs", records);
//		request.setAttribute("totalRows",new Integer(totalRows));
//
//		return actionMapping.findForward("showCatchObject");
//	}
//	
//    public ActionForward rsfreshCache(ActionMapping actionMapping,
//			ActionForm actionForm, HttpServletRequest request,
//			HttpServletResponse response) throws ActionException {
//			String appName = request.getContextPath();			
//	        String[] objects=request.getParameterValues("chkbx_user");
//	        if(objects==null){
//	        	return cacheManager(actionMapping,actionForm,request,response);
//	        }else{
//	    		//CacheService service = (CacheService)getServiceFacade("localCacheService");
//	    		//service.refreshObjects(objects);
//	    		refreshCache(appName,objects);
//	        	return cacheManager(actionMapping,actionForm,request,response); 
//	        }        
//	}
//	
//	private void refreshCache(String appName,String[] objKeys){
//		boolean isNotLocal = TDConfigHelper.isCluster();
//		if(!isNotLocal){
//    		CacheService service = (CacheService)getServiceFacade("localCacheService");
//    		service.refreshObjects(objKeys);
//		}else{
//			List hosts = getHostNames();
//			Iterator hostIt = hosts.iterator();
//			while(hostIt.hasNext()){
//				String hostName = (String)hostIt.next();
//				CacheService service = null;
//				service = getServiceByHostName(hostName,appName);
//				if(service!=null)
//				try{
//					service.refreshObjects(objKeys);
//				}		
//				catch(Exception e){
//					SysLog.writeLogs("tdframework cache",GlobalParameters.ERROR,"CacheRefreash--:refreshCache "+e.getMessage());
//					//e.printStackTrace();
//				}
//				
//			}
//		}
//	}
//	/**
//	 * hostname requires port ie. 192.168.222.2:8080, appName requires /    / ie./crm1/
//	 * @param hostName
//	 * @param appName
//	 * @return
//	 */
//	private CacheService getServiceByHostName(String hostName,String appName){
//		HessianProxyFactoryBean factoryBean =  new HessianProxyFactoryBean();
//		HessianProxyFactory factory = new HessianProxyFactory();
//		CacheService service =null;
//		try{
//			factoryBean.setServiceUrl("http://"+hostName+ appName+"/remoting/CacheService");
//			factoryBean.setServiceInterface(com.neusoft.tdframework.admin.cache.CacheService.class);
//			factoryBean.setProxyFactory(factory);
//			factoryBean.prepare();
//			factoryBean.afterPropertiesSet();
//			service = (CacheService)factoryBean.getObject();
//		}
//		catch(Exception e){
//			SysLog.writeLogs("tdframework cache",GlobalParameters.ERROR,"CacheRefreash--:getServiceByHostName "+e.getMessage());
//			//e.printStackTrace();
//		}
//		return service;
//	}
//	
//	private List getHostNames(){
//		AppContainerDAO dao = (AppContainerDAO)getServiceFacade("containerDAO"); 
//		List hostNames = dao.getHostNames();
//		//List hostNames = new ArrayList();
//		//hostNames.add("10.195.129.33:8080");
//		//hostNames.add("10.195.129.34:8080");
//		return hostNames;
//	}
	
}
