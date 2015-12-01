package com.neusoft.tdframework.common.util;

import java.util.*;

import com.neusoft.om.dao.appcontainer.AppContainerDAO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.common.data.CacheVO;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.SysLog;
//import com.neusoft.unieap.bl.context.AppContext;
//import com.neusoft.unieap.bl.context.impl.AppContextImpl;
//import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;
import com.neusoft.unieap.config.CacheConfig;
import com.neusoft.unieap.service.cache.ICacheManager;
import com.neusoft.unieap.service.cache.exception.CachingException;
/**
 * Title: DateUtil
 * Description: 处理缓存对象的工具类
 * Company: neusoft
 * Date: 2004-10-14
 * @author liyj
 * @version 1.0
 */
public class CacheUtil {
	private static ICacheManager manager = CacheConfig.manager;
	/**
	**获取缓存对象集合
	*/
	public static List getALLCacheObject(String appName) throws ServiceException {
		List list = new ArrayList();
        CacheVO vo = null;
		try{
			Set set = null;
			set = manager.listCacheKeys();
			Iterator result = set.iterator();
			HashMap map = null;
			while( result.hasNext()){
				//vo.setCacheObject(result.next());
				//map = new HashMap();
				String cObject = (String)result.next();
				//map.put("cacheObject", cObject);
				//map.put("cacheObjName", getCacheObjectName(appName, cObject));
				
				//list.add(map);
				setList(list, appName, cObject);
			}
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"CacheUtil--getALLCacheObject()-1 :"+e.getMessage());
			throw new ServiceException(e);
		}catch (CachingException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"CacheUtil--getALLCacheObject()-2 :"+e.getMessage());
			throw new ServiceException(e);
		}

		return list;
  	} 
	/**
	**刷新缓存
	*/
	public static void refreshCathObject(String cacheObject) throws ServiceException {
		//Object newCacheObject = null;
		try{
			if(cacheObject.indexOf(",")>-1){
				String[] objList = cacheObject.split(",");
				for(int i=0;i<objList.length;i++){
					manager.removeCacheObject(objList[i]);
				}
			}else{
				manager.removeCacheObject(cacheObject);
			}
			//manager.putCacheObject("cacheObject",newCacheObject);
			
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"CacheUtil--refreshCathObject(Object cache)-1 :"+e.getMessage());
			throw new ServiceException(e);
		}catch (CachingException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"CacheUtil--refreshCathObject(Object cache)-2 :"+e.getMessage());
			throw new ServiceException(e);
		}
  	}
	
	
	private static String getCacheObjectName(String appName, String cacheKey){
		
        InteractionObjectFactory factory = InteractionObjectFactory
        .getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("");
        AppContainerDAO dao = (AppContainerDAO) factory.getInteractionObject("containerDAO",appContext);
		String tCacheKey = cacheKey;
        if(tCacheKey.indexOf('~')>-1){
        	tCacheKey = tCacheKey.substring(0,tCacheKey.indexOf('~'));
		}
		return dao.getCacheObjectName(appName, tCacheKey);
		
	}
	
	private static void setList(List list, String appName, String cacheKey){
		HashMap map = null;
		if(cacheKey.indexOf('~')==-1){
			map = new HashMap();
			map.put("cacheObject", cacheKey);
			map.put("cacheObjName", getCacheObjectName(appName, cacheKey));
			map.put("cacheKeys", cacheKey);
			list.add(map);
		}else if(cacheKey.indexOf('~')>-1){
			setCombineKey(list,appName,cacheKey);
		}
		return; 
		
	}
	private static void setCombineKey(List list,  String appName, String cacheObject){
		Iterator it = list.iterator();
		String pCacheObject = cacheObject.substring(0,cacheObject.indexOf('~'));
		while(it.hasNext()){
			Map mp = (Map)it.next();
			String tmpCacheObject = (String)mp.get("cacheObject");
			if(tmpCacheObject.equals(pCacheObject)){
				String cacheKeys = (String)mp.get("cacheKeys");
				cacheKeys = cacheKeys + ","+cacheObject;
				mp.remove("cacheKeys");
				mp.put("cacheKeys", cacheKeys);
				return;
			}
		}
		HashMap map = new HashMap();
		map.put("cacheObject", cacheObject.substring(0,cacheObject.indexOf('~')));
		map.put("cacheObjName", getCacheObjectName(appName, cacheObject));
		map.put("cacheKeys", cacheObject);
		list.add(map);
		
		return ;
	}
	
}
