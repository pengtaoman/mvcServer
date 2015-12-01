package com.neusoft.tdframework.admin.cache;

import java.util.List;

import com.neusoft.tdframework.admin.cache.common.CacheUtil;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.tdframework.memcache.CacheManagerConst;
import com.neusoft.tdframework.message.bo.PromptInfoBO;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;

public class CacheServiceImpl implements CacheService { 

	public List getObjects(String appName) {
		// TODO Auto-generated method stub
		List records=null;
		//获取缓存对象集合
//		try{
//			records=CacheUtil.getALLCacheObject(appName);
//		}catch(ServiceException e){
//			e.getMessage();
//		}
		return records;
	}

	public void reLoadCachedObjects(String[] list) {
        String[] objects=list;
        
        if(objects==null){
        	return ;
        }else{
        	for(int i=0;i<objects.length;i++){
	        	String obj = objects[i];
	        	if(obj!=null){
	        		try{
		        		CacheUtil.reLoadCachedObjects(obj);  
		        	}catch(Exception e){
		        		e.getMessage();
		        	}
	        	}else{
	        		continue;
	        	}	
        	}
	    }
        return;
	}
	
	public void reMoveObjects(String appName, String cacheObjKey) {
		CacheUtil.reMoveObjects(appName, cacheObjKey);
	}
	
	public void reLoadCachedObject(String key) {
		CacheUtil.reLoadCachedObjects(key);  
	}
	
	public void reLoadPromptMessage() {
		InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
	    try {
	    
			AppContext appContext01 = new AppContextImpl();
			appContext01.setApplicationName("home");
		    PromptInfoBO promptInfoBO = (PromptInfoBO)factory.getInteractionObject(
		    		"promptInfoBO", 
		    		appContext01);
		    promptInfoBO.putMessageInfoToCache();
	    } catch (Exception ex) {
			ex.printStackTrace();
			SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.ERROR, "CacheServiceImpl-reLoadPromptMessage:重载Message信息失败。");
		}
	}
}
