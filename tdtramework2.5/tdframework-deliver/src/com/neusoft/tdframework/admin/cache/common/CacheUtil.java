package com.neusoft.tdframework.admin.cache.common;

import java.beans.PropertyDescriptor;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import net.sf.json.JsonConfig;

import org.apache.commons.beanutils.BeanUtilsBean;
import org.apache.commons.beanutils.ConvertUtilsBean;
import org.apache.commons.beanutils.PropertyUtilsBean;

import com.neusoft.om.dao.appcontainer.AppContainerDAO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.common.data.CacheVO;
import com.neusoft.tdframework.common.data.ParamObject;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.tdframework.memcache.CacheManagerConst;
import com.neusoft.tdframework.memcache.CacheManagerProxy;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;
import com.neusoft.unieap.config.CacheConfig;
import com.neusoft.unieap.service.cache.ICacheManager;
import com.neusoft.unieap.service.cache.exception.CachingException;
import com.neusoft.tdframework.common.data.ParamObjectCollection;

public class CacheUtil {
	
	private static final String CACHE_MODEL_NAME = CacheUtil.class.getName();
	/**
	 * 通过给定的class名称字符串，得到类实例
	 * @param className class名称字符串
	 * 
	 * */
	public static Object getVOObjectFromName(String className) {
		
		String methodName = "getVOFromName("+ className +")";
		SysLog.writeLogs(CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");
		try {
			ClassLoader loader = Thread.currentThread().getContextClassLoader();
			return loader.loadClass(className).newInstance();
		} catch (Exception ex) {
    		ex.printStackTrace();
    		SysLog.writeLogs(CACHE_MODEL_NAME, GlobalParameters.ERROR, ex.getMessage());
		} finally {
			SysLog.writeLogs(CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": end");
		}
		return null;
	}
	
	/**
	 * 用从数据库中取得的记录，为VO类实例赋值
	 * @param voObject VO类实
	 * @param columName 表的字段名称
	 * @param columValue 表的字段名称对应的值
	 * */
	public static void setVOObjectFromRS(Object voObject, String columName, String columValue) {
		String methodName = new StringBuilder("setVOFromRS(")
		        .append(voObject.getClass().getName())
		        .append(",")
		        .append(columName)
		        .append(",")
		        .append(columValue)
		        .append(")").toString();
		
		SysLog.writeLogs(CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");
		
		try {
			
			 Method[] methods = voObject.getClass().getMethods();
			 for (Method method : methods) {
				 if (method.getName().toLowerCase().equals("set"+columName.toLowerCase())) {
					 method.invoke(voObject, columValue);
					 break;
				 }
			 }
			
		} catch (Exception ex) {
    		ex.printStackTrace();
    		SysLog.writeLogs(CACHE_MODEL_NAME, GlobalParameters.ERROR, ex.getMessage());
		} finally {
			SysLog.writeLogs(CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": end");
		}
		
	}

	
	private static String getCacheObjectName(String appName, String cacheKey){
		
        InteractionObjectFactory factory = InteractionObjectFactory
        .getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("");
        AppContainerDAO dao = (AppContainerDAO) factory.getInteractionObject("containerDAO",appContext);
		String tCacheKey = cacheKey;
        if(tCacheKey.indexOf(CacheConst.CACHE_SPEC_SEP)>-1){
        	tCacheKey = tCacheKey.substring(0,tCacheKey.indexOf('~'));
		}
		return dao.getCacheObjectName(appName, tCacheKey);
		
	}
	
	private static void setList(List list, String appName, String cacheKey) throws CachingException {
		HashMap map = null;
		if(cacheKey.indexOf(CacheConst.CACHE_SPEC_SEP)==-1){
			
	        CacheManagerProxy memCacheManager = CacheManagerProxy.getInstanceOfMemcachedProxy();
	        CacheManagerProxy ehCacheManager = CacheManagerProxy.getInstanceOfEhCacheProxy();
	        
	        String memType = null;
	        
	        Object cacheObjWithStat = memCacheManager.peekForStat(cacheKey);

	        if (cacheObjWithStat != null) {
	        	memType = CacheManagerConst.CACHE_TYPE_MEM;
	        } else {
	        	memType = CacheManagerConst.CACHE_TYPE_EH;
	        	cacheObjWithStat = ehCacheManager.peekForStat(cacheKey);
	        }
	        
	        
	        Object cacheObject = null;
	        try {
	        	if (memType == CacheManagerConst.CACHE_TYPE_MEM) {
	                cacheObject = memCacheManager.peek(cacheKey);
	        	} else {
	        		cacheObject = ehCacheManager.peek(cacheKey);
	        	}
	        } catch (Exception e) {
	        	SysLog.writeLogs("om",GlobalParameters.ERROR,"CacheUtil--setList(Object cache)-1 :"+e.getMessage());
	        }
	        

            boolean isReloadAble = false;
            
            String cacheDescript = "";
            if (cacheObjWithStat != null 
            		&& (cacheObjWithStat instanceof HashMap)) {
            	cacheDescript = (String)((HashMap)cacheObjWithStat).get(CacheManagerConst.KEY_CACHEDATA_DISCRIPTION);
            }
            
            if (cacheObjWithStat != null 
            		&& (cacheObjWithStat instanceof HashMap)
            		&& ((HashMap)cacheObjWithStat).get(CacheManagerConst.KEY_CACHEDATA_BEANID) != null 
                    && ((HashMap)cacheObjWithStat).get(CacheManagerConst.KEY_CACHEDATA_METHOD) != null
                    && !"".equals(((String)((HashMap)cacheObjWithStat).get(CacheManagerConst.KEY_CACHEDATA_METHOD)).trim())) {
            	isReloadAble = true;
            }
	        
	        if (cacheObject instanceof List || cacheObject instanceof ParamObjectCollection) {

	        	StringBuilder sbu = new StringBuilder("<table><tr><td><a href=\"cacheObjectManagerAction.do?method=showCacheObjectDetail&cacheKey=")
				        .append(cacheKey)
				        .append(CacheConst.CACHE_KEY_TYPE_SEP)
						.append(memType)
		                .append("\">数据</a></td>");
	        	
                if (isReloadAble) {
                	sbu.append("<td><a href=\"javascript:dealReload ('")
		                    .append(cacheKey)
		                    .append(CacheConst.CACHE_KEY_TYPE_SEP)
		                    .append(memType)
		                    .append("');\">重载</a>");
                	
                	//单条刷新用
                	sbu.append("<td><a href=\"javascript:diffCacheObjectToDB('")
                            .append(cacheKey)
                            .append(CacheConst.CACHE_KEY_TYPE_SEP)
                            .append(memType)
                            .append("');\">对比数据</a>");
                	
                }
                sbu.append("</td><td><a href=\"javascript:removeCachedObj('")
                .append(cacheKey)
                .append(CacheConst.CACHE_KEY_TYPE_SEP)
                .append(memType)
                .append("');\">删除</a>");
                sbu.append("</td></tr></table>");
                
				map = new HashMap();
				map.put("cacheObject", cacheKey);
				map.put("cacheObjName", getCacheObjectName(appName, cacheKey));
				map.put("cacheKeys", cacheKey);
				map.put("showDetail", sbu.toString());
				map.put("cacheDescript", cacheDescript);
				list.add(map);
	        } else if (cacheObject instanceof Map) {
	        	
	        	setCombineKeyForDType(list,appName,cacheKey,isReloadAble, memType, "getCacheObjectListForMap", cacheDescript);
	        	
			} else {
				StringBuilder sbu = new StringBuilder(
						"<table><tr><td><a href=\"cacheObjectManagerAction.do?method=showCacheObjectDetail&cacheKey=")
						.append(cacheKey).append(CacheConst.CACHE_KEY_TYPE_SEP)
						.append(memType).append("\">数据</a></td>");

				if (isReloadAble) {
					sbu.append("<td><a href=\"javascript:dealReload ('")
							.append(cacheKey)
							.append(CacheConst.CACHE_KEY_TYPE_SEP)
							.append(memType).append("');\">重载</a>");
					
                	//单条刷新用
                	sbu.append("<td><a href=\"javascript:diffCacheObjectToDB('")
                            .append(cacheKey)
                            .append(CacheConst.CACHE_KEY_TYPE_SEP)
                            .append(memType)
                            .append("');\">对比数据</a>");

				}
				 sbu.append("</td><td><a href=\"javascript:removeCachedObj('")
	                .append(cacheKey)
	                .append(CacheConst.CACHE_KEY_TYPE_SEP)
	                .append(memType)
	                .append("');\">删除</a>");
				sbu.append("</td></tr></table>");

				map = new HashMap();
				map.put("cacheObject", cacheKey);
				map.put("cacheObjName", getCacheObjectName(appName, cacheKey));
				map.put("cacheKeys", cacheKey);
				map.put("showDetail", sbu.toString());
				map.put("cacheDescript", cacheDescript);
				list.add(map);
			}
		}else if(cacheKey.indexOf(CacheConst.CACHE_SPEC_SEP)>-1){
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
		String keyAd = cacheObject.substring(0,cacheObject.indexOf('~'));
		map.put("cacheObject", keyAd);
		map.put("cacheObjName", getCacheObjectName(appName, cacheObject));
		map.put("cacheKeys", cacheObject);
	    StringBuilder sbu = new StringBuilder();
	    sbu.append("<table><tr><td><div><a href='cacheObjectManagerAction.do?method=getCacheObjectList&cacheAd="+keyAd+"'>查看</a></div></td>");

	        sbu.append("</tr></table>");
	    map.put("showDetail", sbu.toString());
		list.add(map);
		
		return ;
	}
	
	
	/**
	 * added by pengtao
	 * 对应缓存对象中MAP数据类型
	 * */
	private static void setCombineKeyForDType(
			List list,  
			String appName, 
			String cacheObjectKey, 
			boolean isReloadAble, 
			String memType,
			String actionMethod,
			String cacheDescript) {
		//getCacheObjectListForMap
		String pCacheObject = cacheObjectKey;

		HashMap map = new HashMap();
		map.put("cacheObject", pCacheObject);
		map.put("cacheObjName", getCacheObjectName(appName, cacheObjectKey));
		map.put("cacheKeys", cacheObjectKey);
		StringBuilder sbu = new StringBuilder("<table><tr><td><div><a href='cacheObjectManagerAction.do?method="+ actionMethod +"&cacheKey=");
		sbu.append(pCacheObject);
		sbu.append(CacheConst.CACHE_KEY_TYPE_SEP);
		sbu.append(memType);
		sbu.append("'>查看</a></div></td>");
		if (isReloadAble) {
			sbu.append("<td><div><a href=\"javascript:dealReload ('");
			sbu.append(pCacheObject);
			sbu.append(CacheConst.CACHE_KEY_TYPE_SEP);
			sbu.append(memType);
			sbu.append("');\">重载</a></div></td>");

		}
		
		if (cacheObjectKey.indexOf("ENVCONF") < 0) {
			sbu.append("<td><a href=\"javascript:removeCachedObj('")
	        .append(cacheObjectKey)
	        .append(CacheConst.CACHE_KEY_TYPE_SEP)
	        .append(memType)
	        .append("');\">删除</a>");
	        sbu.append("</td>");
		}
		sbu.append("</tr></table>");
	    map.put("showDetail", sbu.toString());
	    map.put("cacheDescript", cacheDescript);
		list.add(map);
		
		return ;
	}
	
	/** added by pengtao
	**获取缓存对象集合
	 * @throws Exception 
	*/
	@SuppressWarnings("rawtypes")
	public static List getMemEhCacheObject(Set set, String appName, String queryCacheKey) throws Exception {
		List list = new ArrayList();
        @SuppressWarnings("unused")
		CacheVO vo = null;
		try{

			Iterator result = set.iterator();
			HashMap map = null;
			while( result.hasNext()){
				//vo.setCacheObject(result.next());
				//map = new HashMap();
				String cObject = (String)result.next();
				if (queryCacheKey != null && !"".equals(queryCacheKey)) {
					if (cObject.toLowerCase().indexOf(queryCacheKey.toLowerCase()) > -1) {
						setList(list, appName, cObject);
					}
				} else {
					setList(list, appName, cObject);
				}
				//map.put("cacheObject", cObject);
				//map.put("cacheObjName", getCacheObjectName(appName, cObject));
				
				//list.add(map);
				
			}
		}catch (Exception e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"CacheUtil--getALLCacheObject()-1 :"+e.getMessage());
			throw new ServiceException(e);
		}

		return list;
  	}
	
	/** added by pengtao
	**获取缓存对象MAP的key set
	 * @throws Exception 
	*/
	@SuppressWarnings("rawtypes")
	public static List getCacheMapKeySet(Map cacheMap, String keyOfCache, String memType, boolean isReloadAble) throws Exception {
		List list = new ArrayList();
		try{

			Iterator result = cacheMap.keySet().iterator();
			HashMap map = null;
			while( result.hasNext()){
				//vo.setCacheObject(result.next());
				//map = new HashMap();
				Object cObject = result.next();
				map = new HashMap();
				map.put("cacheObject", cObject.toString());
				map.put("cacheKeys", cObject.toString());
				StringBuilder sbu = new StringBuilder("<table><tr><td><div><a href='cacheObjectManagerAction.do?method=showCacheObjectDetail&cacheKey=")
	                .append(keyOfCache)
	                .append("&mapKey=")
	                .append(cObject)
	                .append("'>数据</a></div>");
				
				if (isReloadAble) {
					/*
					sbu.append("<td><a href='cacheObjectManagerAction.do?method=invalidateMapKey&cacheKey=")
							.append(keyOfCache)
							.append("&mapKey=")
							.append(cObject)
							.append("'>无效</a>");
							*/
					
					//单条刷新用
                	sbu.append("<td><a href=\"javascript:diffCacheObjectToDB('")
                            .append(keyOfCache)
                            .append("','").append(cObject).append("');\">对比数据</a>");
				}
				
				sbu.append("</td></tr></table>");
				if (cObject instanceof String) {
				    map.put("showDetail", sbu.toString());
				} else {
				    map.put("showDetail", "");
				}
				list.add(map);
			}
		}catch (Exception e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"CacheUtil--getALLCacheObject()-1 :"+e.getMessage());
			throw new ServiceException(e);
		}

		return list;
  	}
	
	
	
	/** added by pengtao
	**刷新缓存
	*/
	public static void refreshMemEhCathObject(String cacheObject, boolean isRemoveAll) throws ServiceException {
		//Object newCacheObject = null;
		try{
			
			CacheManagerProxy cacheMemManagerProxy = null;
			CacheManagerProxy cacheEhManagerProxy = null;
	        try {
	        	cacheMemManagerProxy = CacheManagerProxy.getInstanceOfMemcachedProxy();
	        } catch (Exception e) {
	        	SysLog.writeLogs("om",GlobalParameters.ERROR,"CacheUtil--refreshMemEhCathObject-1 :"+e.getMessage());
	        }
	        try {
	        	cacheEhManagerProxy = CacheManagerProxy.getInstanceOfEhCacheProxy();
	        } catch (Exception e) {
	        	SysLog.writeLogs("om",GlobalParameters.ERROR,"CacheUtil--refreshMemEhCathObject-2 :"+e.getMessage());
	        }
			

			if(cacheObject.indexOf(",")>-1){
				String[] objList = cacheObject.split(",");
				for(int i=0;i<objList.length;i++){
					
			        try {
			        	Object cachedObjectMem = cacheMemManagerProxy.peekForStat(objList[i]);
						
			    		if (!isRemoveAll && cachedObjectMem instanceof HashMap && ((HashMap)cachedObjectMem).get(CacheManagerConst.KEY_CACHEDATA_VALID) != null) {
			    			HashMap cacheValue = (HashMap)cachedObjectMem;
				        	cacheValue.put(CacheManagerConst.KEY_CACHEDATA_VALID, Integer.valueOf("0"));
				        	cacheMemManagerProxy.replaceCachedObject(objList[i], cacheValue);
		
			    		} else {
			    			cacheMemManagerProxy.removeCacheObject(objList[i]);
			    		}
			        } catch (Exception e) {
			        	SysLog.writeLogs("om",GlobalParameters.ERROR,"CacheUtil--refreshMemEhCathObject-3 :"+e.getMessage());
			        }
			        
			        try {
				        Object cachedObjectEh = cacheEhManagerProxy.peekForStat(objList[i]);
			    		if (!isRemoveAll && cachedObjectEh instanceof HashMap && ((HashMap)cachedObjectEh).get(CacheManagerConst.KEY_CACHEDATA_VALID) != null) {
			    			HashMap cacheValue = (HashMap)cachedObjectEh;
				        	cacheValue.put(CacheManagerConst.KEY_CACHEDATA_VALID, Integer.valueOf("0"));
				        	cacheEhManagerProxy.replaceCachedObject(objList[i], cacheValue);
		
			    		} else {
			    			cacheEhManagerProxy.removeCacheObject(objList[i]);
			    		}
			        } catch (Exception e) {
			        	SysLog.writeLogs("om",GlobalParameters.ERROR,"CacheUtil--refreshMemEhCathObject-4 :"+e.getMessage());
			        }
				}
			}else{
				try {
					Object cachedObjectMem = cacheMemManagerProxy.peekForStat(cacheObject);
		    		if (!isRemoveAll && cachedObjectMem instanceof HashMap && ((HashMap)cachedObjectMem).get(CacheManagerConst.KEY_CACHEDATA_VALID) != null) {
		    			HashMap cacheValue = (HashMap)cachedObjectMem;
			        	cacheValue.put(CacheManagerConst.KEY_CACHEDATA_VALID, Integer.valueOf("0"));
			        	cacheMemManagerProxy.replaceCachedObject(cacheObject, cacheValue);
	
		    		} else {
		    			cacheMemManagerProxy.removeCacheObject(cacheObject);
		    		}
		        } catch (Exception e) {
		        	SysLog.writeLogs("om",GlobalParameters.ERROR,"CacheUtil--refreshMemEhCathObject-5 :"+e.getMessage());
		        }
				try {
		    		Object cachedObjectEh = cacheEhManagerProxy.peekForStat(cacheObject);
		    		
		    		if (!isRemoveAll && cachedObjectEh instanceof HashMap && ((HashMap)cachedObjectEh).get(CacheManagerConst.KEY_CACHEDATA_VALID) != null) {
		    			HashMap cacheValue = (HashMap)cachedObjectEh;
			        	cacheValue.put(CacheManagerConst.KEY_CACHEDATA_VALID, Integer.valueOf("0"));
			        	cacheEhManagerProxy.replaceCachedObject(cacheObject, cacheValue);
	
		    		} else {
		    			cacheEhManagerProxy.removeCacheObject(cacheObject);
		    			Object aa = cacheEhManagerProxy.peek(cacheObject);
		    			if (aa != null) {
		    				SysLog.writeLogs("om",GlobalParameters.ERROR,"CacheUtil--refreshMemEhCathObject-6 : Why " + cacheObject + " has not be removed???? GOD konw");
		    			}
		    		}
		        } catch (Exception e) {
		        	SysLog.writeLogs("om",GlobalParameters.ERROR,"CacheUtil--refreshMemEhCathObject-5 :"+e.getMessage());
		        }
			}
			//manager.putCacheObject("cacheObject",newCacheObject);
			
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"CacheUtil--refreshCathObject(Object cache)-0 :"+e.getMessage());
			throw new ServiceException(e);
		}
  	}

	
	public static ConvertUtilsBean getConvertUtilsBean() {
		
		ConvertUtilsBean convertUtilsBean = new ConvertUtilsBean();
        
        convertUtilsBean.deregister(String.class);
        convertUtilsBean.deregister(long.class);
        convertUtilsBean.deregister(Date.class);
        convertUtilsBean.deregister(boolean.class);
        convertUtilsBean.deregister(int.class);
        convertUtilsBean.deregister(float.class);
        convertUtilsBean.deregister(double.class);
        convertUtilsBean.deregister(char.class);
        
        convertUtilsBean.register(new BeanUtilValueConverter(), String.class);
        convertUtilsBean.register(new BeanUtilValueConverter(), long.class);
        convertUtilsBean.register(new BeanUtilValueConverter(), Date.class);
        convertUtilsBean.register(new BeanUtilValueConverter(), boolean.class);
        convertUtilsBean.register(new BeanUtilValueConverter(), int.class);
        convertUtilsBean.register(new BeanUtilValueConverter(), float.class);
        convertUtilsBean.register(new BeanUtilValueConverter(), double.class);
        convertUtilsBean.register(new BeanUtilValueConverter(), char.class);
        
        return convertUtilsBean;
	}
	
	public static JsonConfig getJsonConfig() {
        JsonConfig jsonConfig = new JsonConfig();
        JsonOtherValueProcessor jsonOtherValueProcessor = new JsonOtherValueProcessor();
        
        jsonConfig.registerJsonValueProcessor(Date.class, jsonOtherValueProcessor); 

        jsonConfig.registerJsonValueProcessor(String.class, jsonOtherValueProcessor); 
        jsonConfig.registerJsonValueProcessor(Long.class, jsonOtherValueProcessor); 
        jsonConfig.registerJsonValueProcessor(Boolean.class, jsonOtherValueProcessor);
        jsonConfig.registerJsonValueProcessor(Integer.class, jsonOtherValueProcessor);
        jsonConfig.registerJsonValueProcessor(Float.class, jsonOtherValueProcessor);
        jsonConfig.registerJsonValueProcessor(Double.class, jsonOtherValueProcessor);
        jsonConfig.registerJsonValueProcessor(Character.class, jsonOtherValueProcessor);
        
        //下面是不做处理的复杂类型，如果出现其他复杂类型，需要继续添加
        jsonConfig.registerJsonValueProcessor(HashMap.class, jsonOtherValueProcessor); 
        jsonConfig.registerJsonValueProcessor(ArrayList.class, jsonOtherValueProcessor); 
        
        return jsonConfig;
	}
	
	
	
	public static HashMap diffObject(Object oldObject, Object newObject, String mapKey) {
		
		if (oldObject == null || newObject == null || !oldObject.getClass().getName().equals(newObject.getClass().getName())) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"001对比的对象为空或者类型不一致。");
			return null;
		}
		
		if (oldObject instanceof ArrayList) {
			ArrayList oldObjectLst = (ArrayList)oldObject;
			ArrayList newObjectLst = (ArrayList)newObject;
			if (oldObjectLst.size() != newObjectLst.size()) {
				SysLog.writeLogs("om",GlobalParameters.ERROR,"002对比的对象中，包含的VO数不一致。");
				HashMap errorMap = new HashMap();
				errorMap.put(CacheConst.MAP_KEY_DIFF_ERRORMSG, "数据库的数据已经增加或删除，请进行缓存重载操作。");
				return errorMap;
			}
			return diffPropertiesOfObject(oldObjectLst, newObjectLst);
		}
		
		if (oldObject instanceof HashMap) {
			ArrayList oldObjectLst = (ArrayList)((HashMap)oldObject).get(mapKey);
			ArrayList newObjectLst = (ArrayList)((HashMap)newObject).get(mapKey);
			if (oldObjectLst.size() != newObjectLst.size()) {
				SysLog.writeLogs("om",GlobalParameters.ERROR,"003对比的对象中，包含的VO数不一致。");
				HashMap errorMap = new HashMap();
				errorMap.put(CacheConst.MAP_KEY_DIFF_ERRORMSG, "数据库的数据已经增加或删除，请进行缓存重载操作。");
				return errorMap;
			}
			return diffPropertiesOfObject(oldObjectLst, newObjectLst);
		}
		
		if (oldObject instanceof ParamObjectCollection) {
			ArrayList oldObjectLst = (ArrayList)((ParamObjectCollection)oldObject).getList();
			ArrayList newObjectLst = (ArrayList)((ParamObjectCollection)newObject).getList();
			if (oldObjectLst.size() != newObjectLst.size()) {
				SysLog.writeLogs("om",GlobalParameters.ERROR,"004对比的对象中，包含的VO数不一致。");
				HashMap errorMap = new HashMap();
				errorMap.put(CacheConst.MAP_KEY_DIFF_ERRORMSG, "数据库的数据已经增加或删除，请进行缓存重载操作。");
				return errorMap;
			}
			return diffPropertiesOfObject(oldObjectLst, newObjectLst);
		}
		
		return null;
		
	}
	
	private static HashMap diffPropertiesOfObject(ArrayList oldLst, ArrayList newLst) {
		

 		HashMap diffMap = new HashMap();
		HashMap<String, ArrayList<String>> oldRowMap = new HashMap<String, ArrayList<String>>();
		HashMap<String, ArrayList<String>> newRowMap = new HashMap<String, ArrayList<String>>();
        ArrayList<String> propNameLst = new ArrayList<String>();
		for (int i = 0; i < oldLst.size(); i++) {
			
			Object oldVo = oldLst.get(i);
			Object newVo = newLst.get(i);
			BeanUtilsBean beanUtilsBean =
                new BeanUtilsBean();
            
            PropertyDescriptor[] oldPros = beanUtilsBean.getPropertyUtils().getPropertyDescriptors(oldVo);
            PropertyDescriptor[] newPros = beanUtilsBean.getPropertyUtils().getPropertyDescriptors(newVo);
            
            ArrayList<String> oldDataLst = new ArrayList<String>();
            ArrayList<String> newDataLst = new ArrayList<String>();
            boolean isDiff = false;
            for (int pi = 0; pi < oldPros.length; pi++) {
            	
            	if (!"class".equals(oldPros[pi].getName())) {
            		
            		if(i == 0) {
            			propNameLst.add(oldPros[pi].getName());
            		}
	   				String oldValue = null;
	   				String newValue = null;
	   				String propertyName = oldPros[pi].getName();
	   				if (propertyName.equals("f_Employee_Name")) {
	   					//do nothing
	   				}
	   				try {
	       			    oldValue = beanUtilsBean.getProperty(oldVo, oldPros[pi].getName());
	       			    newValue = beanUtilsBean.getProperty(newVo, newPros[pi].getName());
	   				} catch (Exception ex) {
	   					//do nothing
	   				}
	   				if (oldValue == null) oldValue="";
	   				if (newValue == null) newValue="";
	   				
	       			if (!oldValue.equals(newValue)) {
	       				oldDataLst.add("<font color='blue'>"+oldValue+"</font>");
	       				newDataLst.add("<font color='red'>"+newValue+"</font>");
	       				isDiff = true;
	       			} else {
	       				oldDataLst.add(oldValue);
	       				newDataLst.add(newValue);
	       			}
   			    }            
            }
            if (isDiff) {
            	newRowMap.put(String.valueOf(i),newDataLst);
            	oldRowMap.put(String.valueOf(i),oldDataLst);
            }
		}
		diffMap.put(CacheConst.MAP_KEY_DIFF_PROPNAME, propNameLst);
		diffMap.put(CacheConst.MAP_KEY_DIFF_PROPVALUE_NEW, newRowMap);
		diffMap.put(CacheConst.MAP_KEY_DIFF_PROPVALUE_OLD, oldRowMap);
		return diffMap;
	}
 
	
	//////////////////////////////////////For remote/////////////////////////////////////
	public static void reLoadCachedObjects(String cacheKey) {
		String[] sepKey = cacheKey.split(CacheConst.CACHE_KEY_TYPE_SEP);
        CacheManagerProxy cacheManagerProxy = null;
        if (CacheManagerConst.CACHE_TYPE_MEM.equals(sepKey[1])) {
            cacheManagerProxy = CacheManagerProxy.getInstanceOfMemcachedProxy();
        } else {
            cacheManagerProxy = CacheManagerProxy.getInstanceOfEhCacheProxy();
        }
        Object hCached = cacheManagerProxy.peekForStat(sepKey[0]);
        if (hCached instanceof HashMap) {
        	HashMap mapCached = (HashMap)hCached;
        	if (mapCached.get(CacheManagerConst.KEY_CACHEDATA_VALID) != null) {
        		mapCached.put(CacheManagerConst.KEY_CACHEDATA_VALID, Integer.valueOf(CacheManagerConst.CACHEDATA_VALID_FALSE));
        		cacheManagerProxy.putObjectDirectly(sepKey[0], mapCached);
        	}
        }
        try {
            cacheManagerProxy.reloadCachedObject(cacheKey);
        } catch (Exception ex) {
        	ex.printStackTrace();
        }
	}
	
	
	public static void reMoveObjects(String appName, String cacheObjKey) {
		Set cacheKeyWithSize = null;
        CacheManagerProxy memCacheManager = CacheManagerProxy.getInstanceOfMemcachedProxy();

        CacheManagerProxy ehCacheManager = CacheManagerProxy.getInstanceOfEhCacheProxy();
        List records=null;
		try {
            cacheKeyWithSize = memCacheManager.listCacheKeys();
        } catch(Exception ex ) {
            cacheKeyWithSize = new HashSet();
            SysLog.writeLogs("om",GlobalParameters.ERROR,"CacheObjectManagerAction--getCacheObjectSumList-0 :"+ex.getMessage());
        }
        try {
            cacheKeyWithSize.addAll(ehCacheManager.listCacheKeys());
            records=CacheUtil.getMemEhCacheObject(cacheKeyWithSize, appName, cacheObjKey.split(":")[0]);
        } catch(Exception ex ) {
        	SysLog.writeLogs("om",GlobalParameters.ERROR,"CacheObjectManagerAction--getCacheObjectSumList-1 :"+ex.getMessage());
        }
        
		for (int recordCount = 0 ; recordCount < records.size(); recordCount++) {
    		HashMap recordMap = (HashMap)records.get(recordCount);
    		String recordCacheKey = (String)recordMap.get("cacheKeys");
    		if (recordCacheKey != null && !"".equals(recordCacheKey)) {
    			try {
    				if (recordCacheKey.indexOf("ENVCONF") < 0) {
    			        CacheUtil.refreshMemEhCathObject(recordCacheKey, true);
    				}
    			} catch (Exception ex) {
    				ex.printStackTrace();
    			}
    		}
    	}
	}
}
