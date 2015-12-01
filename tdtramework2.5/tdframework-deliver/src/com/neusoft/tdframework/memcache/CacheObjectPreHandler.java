package com.neusoft.tdframework.memcache;

import java.util.HashMap;
import java.util.List;

import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;

public class CacheObjectPreHandler {
	
	private MemCacheManager memCacheManagerImpl;

	public MemCacheManager getMemCacheManagerImpl() {
		return memCacheManagerImpl;
	}

	public void setMemCacheManagerImpl(MemCacheManager memCacheManagerImpl) {
		this.memCacheManagerImpl = memCacheManagerImpl;
	}
	
    public void afterPropertiesSet(String contextPath) throws Exception {

        String methodName = "afterPropertiesSet";
        SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");
        
        if (memCacheManagerImpl instanceof MemCacheManager) {

		    if (memCacheManagerImpl instanceof MemCacheManager) {
		    	MemCacheManager memCacheManager = (MemCacheManager)memCacheManagerImpl;
		    	memCacheManager.setContextPath(contextPath);
		    	memCacheManager.afterPropertiesSet();
    		    HashMap memcacheConfig = memCacheManager.getMemcacheConfig();
    	        for (String[] voAttribute : (String[][])memcacheConfig.get(CacheManagerConst.CACHE_CONFIG_CONTEXT_PATH)) {
    	        	
    	        	if (voAttribute[0].indexOf(contextPath) > -1) {
    	        		
    	        		List<String[][]> preBeans = MemCacheUtil.getPreCachedBeans(voAttribute[1]);
    	        		memcacheConfig.put(CacheManagerConst.CACHE_CONFIG_PRELOAD_CONF_KEY, preBeans);
    	            	for(int beanCount = 0; beanCount < preBeans.size(); beanCount++) {
    	            		String[][] beans = (String[][])preBeans.get(beanCount);
    	            		for (String[] bean : beans) {
    	            			
    	            			String model = bean[0];  
    	            			String beanId = bean[1];
    	            			String method = bean[2];
    	            			try {
	    	                        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
	    	            			AppContext appContext = new AppContextImpl();
	    	            			appContext.setApplicationName(model);
	    	            			Object pre_bean = factory.getInteractionObject(beanId,appContext);
	    	            			
	    	            			bean[6] = pre_bean.getClass().getName();
	    	            			
	    	            			
	    	            			Object returnObject = pre_bean.getClass().getMethod(method).invoke(pre_bean);
	    	            			
	    	            			if (bean.length > 9 && bean[7] != null && !"".equals(bean[7])) {
	    	            				
	    	            				CacheManagerProxy cacheManagerProxy;
	    	            				if ("e".equals(bean[8])) {
	    	            					cacheManagerProxy = CacheManagerProxy.getInstanceOfEhCacheProxy();
	    	            				} else {
	    	            					cacheManagerProxy = CacheManagerProxy.getInstanceOfMemcachedProxy();
	    	            				}
	    	            				
	    	            				if (returnObject != null) {
	    	            					if (!"".equals(returnObject.toString())) {
	    	            						cacheManagerProxy.putCacheLoadOnStartup(bean[7], returnObject, bean[9], bean[6], method);
	    	            					}
	    	            				}
	    	            			}
    	            			} catch (Exception ex) {
    	                            //ex.printStackTrace();
    	                            SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.ERROR, ex.getMessage());
    	            			}
    	            		}
    	            	}
    	        	}
    	        }
		    }

        } else {
        	//....
        }
        
    }

}
