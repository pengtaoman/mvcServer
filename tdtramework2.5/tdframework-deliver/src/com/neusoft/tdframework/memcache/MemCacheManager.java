package com.neusoft.tdframework.memcache;


import java.util.Date;
import java.util.HashMap;
import java.util.Set;

import com.alisoft.xplatform.asf.cache.IMemcachedCache;
import com.alisoft.xplatform.asf.cache.memcached.CacheUtil;
import com.alisoft.xplatform.asf.cache.memcached.MemcachedCacheManager;
import com.neusoft.unieap.service.cache.ICacheLoader;
import com.neusoft.unieap.service.cache.ICacheLoaders;
import com.neusoft.unieap.service.cache.ICacheManager;
import com.neusoft.unieap.service.cache.exception.CachingException;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.log.SysLog;



public class MemCacheManager implements ICacheManager {//, InitializingBean {
    
   
    /**
     * memcached服务器连接管理类
     * */
    private com.alisoft.xplatform.asf.cache.ICacheManager<IMemcachedCache> manager;
    
    /**
     * memcached缓存读写操作类
     * */
    private IMemcachedCache cache;
    /**
     * memcached缓存过期时间，以分为单位
     * */
    //private int cacheExpiryMinuts = 0;
    
    private boolean isMemCacheConfigError = false;
    
    /**
     * 系统启动时，需要加载的缓存设置
     * */
    //private String[][] preCachedConfig;
    
    private HashMap memcacheConfig = null;
    
    private String contextPath = null;

	public HashMap getMemcacheConfig() {
		return memcacheConfig;
	}
	

    public String getContextPath() {
		return contextPath;
	}

	public void setContextPath(String contextPath) {
		this.contextPath = contextPath;
	}


    /**
     * 释放资源
     */
    public void close() {
        String methodName = "close";
        SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");
        if (manager != null) {
            manager.stop();
        }
        SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": end");
    }

    
    @SuppressWarnings("unchecked")
	public void afterPropertiesSet() throws Exception {
        
        String methodName = "afterPropertiesSet";
        SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");
        
        String[][] cacheConfig = null;
        String memcacheConfigPath = null;
        try {
	        if (!isMemCacheConfigError) {
		        cacheConfig = MemCacheUtil.getPreCacheObjectsConfig();
		        for (String[] config : cacheConfig) {
		        	if (config[0].indexOf(contextPath) > -1) {
		        		memcacheConfigPath = config[1];
		        		break;
		        	}
		        }
	        }
        } catch (Exception ex) {
        	isMemCacheConfigError = true;
            ////ex.printStackTrace();
            SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.ERROR, ex.getMessage());
            
        }
        
        try {

            if ((manager == null || cache == null) && !isMemCacheConfigError) {
                manager = CacheUtil.getCacheManager(IMemcachedCache.class,
                                MemcachedCacheManager.class.getName());

                manager.setConfigFile(memcacheConfigPath);
                
                manager.start();
                
                cache = manager.getCache(CacheManagerConst.MEM_CLIENT_NAME);
            
            } 
            
        } catch (Exception ex) {
        	    isMemCacheConfigError = true;
                ////ex.printStackTrace();
                SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.ERROR, ex.getMessage());
                
        }
            
        try {
            //预加载缓存处理
	        if (memcacheConfig == null) {
	        	
	        	memcacheConfig = new HashMap();
	        	memcacheConfig.put(CacheManagerConst.CACHE_CONFIG_EXPIRYMINUTS_KEY, Integer.valueOf(MemCacheUtil.getCacheExpiryMinuts(memcacheConfigPath)));
	        	memcacheConfig.put(CacheManagerConst.CACHE_CONFIG_CONTEXT_PATH, cacheConfig);
	        	memcacheConfig.put(CacheManagerConst.CONTEXT_PATH_CONFIG_KEY, MemCacheUtil.getContextPathConfig());
	        	isMemCacheConfigError = true;
	        } else {
	        	
	        	if (memcacheConfig.get(CacheManagerConst.CACHE_CONFIG_EXPIRYMINUTS_KEY) == null && !isMemCacheConfigError) {
	        		memcacheConfig.put(CacheManagerConst.CACHE_CONFIG_EXPIRYMINUTS_KEY, Integer.valueOf(MemCacheUtil.getCacheExpiryMinuts(memcacheConfigPath)));
	        	}
	        	
	        	if (memcacheConfig.get(CacheManagerConst.CACHE_CONFIG_CONTEXT_PATH) == null && !isMemCacheConfigError) {
	        		memcacheConfig.put(CacheManagerConst.CACHE_CONFIG_CONTEXT_PATH, cacheConfig);
	        	}
	        	
	        	if (memcacheConfig.get(CacheManagerConst.CONTEXT_PATH_CONFIG_KEY) == null && !isMemCacheConfigError) {
	        		memcacheConfig.put(CacheManagerConst.CONTEXT_PATH_CONFIG_KEY, MemCacheUtil.getContextPathConfig());
	        	}
	        	isMemCacheConfigError = true;
	        }
            
        } catch (Exception ex) {
        	isMemCacheConfigError = true;
            ////ex.printStackTrace();
            SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.ERROR, ex.getMessage());
            
        }
        SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": end");
               
    }
    


    public void clear() throws CachingException {
        String methodName = "clear";
        SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");
        try {
            if (cache != null) {
                this.clear("");
            }
        } catch (Exception ex) {
            
            //ex.printStackTrace();
            SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.ERROR, ex.getMessage());
            throw new CachingException(ex);
        } finally {
            SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": end");
        }
    }

    /**
     * @deprecated memcached实现，该方法多余
     * */
    public void clear(String arg0) throws CachingException {
        String methodName = "clear(" + arg0 + ")";
        SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");
        try {
            if (cache != null) {
                this.clear(arg0, "");
            }
        } catch (Exception ex) {
            
            //ex.printStackTrace();
            SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.ERROR, ex.getMessage());
            throw new CachingException(ex);
            
        } finally {
            
            SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": end");
        }
        
    }

    /**
     * @deprecated memcached实现，该方法多余
     * */
    public void clear(String arg0, String arg1) throws CachingException {
        String methodName = new StringBuilder("clear(").append(arg0).append(",").append(arg1).append(")").toString();
        try {
            if (cache != null) {
                cache.clear();
            }
        } catch (Exception ex) {
            
            //ex.printStackTrace();
            SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.ERROR, ex.getMessage());
            throw new CachingException(ex);
            
        } finally {
            SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": end");
        }
        
    }
    /**
     * @deprecated memcached实现，该方法多余
     * */
    public Object getCacheObject(Object arg0, ICacheLoader arg1)
            throws CachingException {
        String methodName = new StringBuilder("getCacheObject(").append(arg0).append(",ICacheLoader arg1").append(")").toString();
        SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");
        try {
            if (cache != null) {
                
                HashMap<String, Object> cache_dataMap = (HashMap<String, Object>)cache.get((String)arg0);
                
                if (cache_dataMap != null && ((Integer)cache_dataMap.get(CacheManagerConst.KEY_CACHEDATA_VALID)).intValue() == 1) {
                    return cache_dataMap.get(CacheManagerConst.KEY_CACHEDATA_DATA);
                }
                
            } else {
                throw new Exception("memcached cache is null.");
            }
            
        } catch (Exception ex) {
            
            //ex.printStackTrace();
            SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.ERROR, ex.getMessage());
            throw new CachingException(ex);
            
        } finally {
            SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": end");
        }
        return null;
    }
    /**
     * @deprecated memcached实现，该方法多余
     * */
    public Object getCacheObject(Object arg0, boolean arg1, ICacheLoader arg2)
            throws CachingException {
        
        String methodName = new StringBuilder("getCacheObject(").append(arg0).append(",boolean arg1, ICacheLoader arg2").append(")").toString();
        SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");
        try {
            if (cache != null) {
                
                HashMap<String, Object> cache_dataMap = (HashMap<String, Object>)cache.get((String)arg0);
                if (cache_dataMap != null && ((Integer)cache_dataMap.get(CacheManagerConst.KEY_CACHEDATA_VALID)).intValue() == 1) {
                    return cache_dataMap.get(CacheManagerConst.KEY_CACHEDATA_DATA);
                }
            } else {
                throw new Exception("memcached cache is null.");
            }
            
        } catch (Exception ex) {
            
            //ex.printStackTrace();
            SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.ERROR, ex.getMessage());
            throw new CachingException(ex);
            
        } finally {
            SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": end");
        }
        return null;
    }
    
    /**
     * @deprecated memcached实现，该方法多余
     * */
    public Object getCacheObject(Object arg0, ICacheLoader arg1, String arg2)
            throws CachingException {
        String methodName = new StringBuilder("getCacheObject(").append(arg0).append(",ICacheLoader arg1, String arg2").append(")").toString();
        SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");
        try {
            if (cache != null) {
                
                HashMap<String, Object> cache_dataMap = (HashMap<String, Object>)cache.get((String)arg0);
                if (cache_dataMap != null && ((Integer)cache_dataMap.get(CacheManagerConst.KEY_CACHEDATA_VALID)).intValue() == 1) {
                    return cache_dataMap.get(CacheManagerConst.KEY_CACHEDATA_DATA);
                }
            } else {
                throw new Exception("memcached cache is null.");
            }
            
        } catch (Exception ex) {
            
            //ex.printStackTrace();
            SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.ERROR, ex.getMessage());
            throw new CachingException(ex);
            
        } finally {
            SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": end");
        }
        return null;
    }
    /**
     * @deprecated memcached实现，该方法多余
     * */
    public Object getCacheObject(Object arg0, ICacheLoaders arg1, String arg2)
            throws CachingException {
        
        String methodName = new StringBuilder("getCacheObject(").append(arg0).append(",ICacheLoaders arg1, String arg2").append(")").toString();
        SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");
        try {
            if (cache != null) {
                
                HashMap<String, Object> cache_dataMap = (HashMap<String, Object>)cache.get((String)arg0);
                if (cache_dataMap != null && ((Integer)cache_dataMap.get(CacheManagerConst.KEY_CACHEDATA_VALID)).intValue() == 1) {
                    return cache_dataMap.get(CacheManagerConst.KEY_CACHEDATA_DATA);
                }
            } else {
                throw new Exception("memcached cache is null.");
            }
            
        } catch (Exception ex) {
            
            //ex.printStackTrace();
            SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.ERROR, ex.getMessage());
            throw new CachingException(ex);
            
        } finally {
            SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": end");
        }
        return null;
    }

    public Object getCacheObject(Object arg0, boolean arg1, ICacheLoader arg2,
            String arg3) throws CachingException {
        String methodName = new StringBuilder("getCacheObject(").append(arg0).append(",boolean arg1, ICacheLoader arg2,String arg3").append(")").toString();
        SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");
        try {
            if (cache != null) {
                
                HashMap<String, Object> cache_dataMap = (HashMap<String, Object>)cache.get((String)arg0);
                if (cache_dataMap != null && ((Integer)cache_dataMap.get(CacheManagerConst.KEY_CACHEDATA_VALID)).intValue() == 1) {
                    return cache_dataMap.get(CacheManagerConst.KEY_CACHEDATA_DATA);
                }
            } else {
                throw new Exception("memcached cache is null.");
            }
            
        } catch (Exception ex) {
            
            //ex.printStackTrace();
            SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.ERROR, ex.getMessage());
            throw new CachingException(ex);
            
        } finally {
            SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": end");
        }
        return null;
    }
    /**
     * @deprecated memcached实现，该方法多余
     * */
    public Object getCacheObject(Object arg0, ICacheLoader arg1, String arg2,
            String arg3) throws CachingException {
        
        String methodName = new StringBuilder("getCacheObject(").append(arg0).append(",ICacheLoader arg1, String arg2,String arg3").append(")").toString();
        SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");
        try {
            if (cache != null) {
                
                HashMap<String, Object> cache_dataMap = (HashMap<String, Object>)cache.get((String)arg0);
                if (cache_dataMap != null && ((Integer)cache_dataMap.get(CacheManagerConst.KEY_CACHEDATA_VALID)).intValue() == 1) {
                    return cache_dataMap.get(CacheManagerConst.KEY_CACHEDATA_DATA);
                }
            } else {
                throw new Exception("memcached cache is null.");
            }
            
        } catch (Exception ex) {
            
            //ex.printStackTrace();
            SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.ERROR, ex.getMessage());
            throw new CachingException(ex);
            
        } finally {
            SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": end");
        }
        return null;
    }
    /**
     * @deprecated memcached实现，该方法多余
     * */
    public Object getCacheObject(Object arg0, boolean arg1, ICacheLoaders arg2,
            String arg3) throws CachingException {
        
        String methodName = new StringBuilder("getCacheObject(").append(arg0).append(",boolean arg1, ICacheLoaders arg2,String arg3").append(")").toString();
        SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");
        try {
            if (cache != null) {
                
                HashMap<String, Object> cache_dataMap = (HashMap<String, Object>)cache.get((String)arg0);
                if (cache_dataMap != null && ((Integer)cache_dataMap.get(CacheManagerConst.KEY_CACHEDATA_VALID)).intValue() == 1) {
                    return cache_dataMap.get(CacheManagerConst.KEY_CACHEDATA_DATA);
                }
            } else {
                throw new Exception("memcached cache is null.");
            }
            
        } catch (Exception ex) {
            
            //ex.printStackTrace();
            SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.ERROR, ex.getMessage());
            throw new CachingException(ex);
            
        } finally {
            SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": end");
        }
        return null;
    }
    /**
     * @deprecated memcached实现，该方法多余
     * */
    public Object getCacheObject(Object arg0, ICacheLoaders arg1, String arg2,
            String arg3) throws CachingException {
        String methodName = new StringBuilder("getCacheObject(").append(arg0).append("ICacheLoaders arg1, String arg2,String arg3").append(")").toString();
        SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");
        try {
            if (cache != null) {
                
                HashMap<String, Object> cache_dataMap = (HashMap<String, Object>)cache.get((String)arg0);
                if (cache_dataMap != null && ((Integer)cache_dataMap.get(CacheManagerConst.KEY_CACHEDATA_VALID)).intValue() == 1) {
                    return cache_dataMap.get(CacheManagerConst.KEY_CACHEDATA_DATA);
                }
            } else {
                throw new Exception("memcached cache is null.");
            }
            
        } catch (Exception ex) {
            
            //ex.printStackTrace();
            SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.ERROR, ex.getMessage());
            throw new CachingException(ex);
            
        } finally {
            SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": end");
        }
        return null;
    }
    /**
     * @deprecated memcached实现，该方法多余
     * */
    public Object getCacheObject(Object arg0, boolean arg1, ICacheLoader arg2,
            String arg3, String arg4) throws CachingException {
        String methodName = new StringBuilder("getCacheObject(").append(arg0).append("boolean arg1, ICacheLoader arg2,String arg3, String arg4").append(")").toString();
        SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");
        try {
            if (cache != null) {
                
                HashMap<String, Object> cache_dataMap = (HashMap<String, Object>)cache.get((String)arg0);
                if (cache_dataMap != null && ((Integer)cache_dataMap.get(CacheManagerConst.KEY_CACHEDATA_VALID)).intValue() == 1) {
                    return cache_dataMap.get(CacheManagerConst.KEY_CACHEDATA_DATA);
                }
            } else {
                throw new Exception("memcached cache is null.");
            }
            
        } catch (Exception ex) {
            
            //ex.printStackTrace();
            SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.ERROR, ex.getMessage());
            throw new CachingException(ex);
            
        } finally {
            SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": end");
        }
        return null;
    }
    
    /**
     * @deprecated memcached实现，该方法多余
     * */
    public Object getCacheObject(Object arg0, boolean arg1, ICacheLoaders arg2,
            String arg3, String arg4) throws CachingException {
        String methodName = new StringBuilder("getCacheObject(").append(arg0).append("boolean arg1, ICacheLoader arg2,String arg3, String arg4").append(")").toString();
        SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");
        try {
            if (cache != null) {
                
                HashMap<String, Object> cache_dataMap = (HashMap<String, Object>)cache.get((String)arg0);
                if (cache_dataMap != null && ((Integer)cache_dataMap.get(CacheManagerConst.KEY_CACHEDATA_VALID)).intValue() == 1) {
                    return cache_dataMap.get(CacheManagerConst.KEY_CACHEDATA_DATA);
                }
            } else {
                throw new Exception("memcached cache is null.");
            }
            
        } catch (Exception ex) {
            
            //ex.printStackTrace();
            SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.ERROR, ex.getMessage());
            throw new CachingException(ex);
            
        } finally {
            SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": end");
        }
        return null;
    }
    /**
     * @deprecated memcached实现，该方法多余
     * */
    public String getConfigFile() {
        String methodName = "getConfigFile()";
        SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");
        SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": end");
        return CacheManagerConst.MEM_CLIENT_NAME;
    }
    /**
     * @deprecated memcached实现，该方法多余
     * */
    public String[] getGroupNames() throws CachingException {
        String methodName = " getGroupNames()";
        SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");
        SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": end");
        return null;
    }
    /**
     * @deprecated memcached实现，该方法多余
     * */
    public String[] getGroupNames(String arg0) throws CachingException {
        String methodName = new StringBuilder("getGroupNames(").append(arg0).append(")").toString();
        SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");
        SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": end");
        return null;
    }
    /**
     * @deprecated memcached实现，该方法多余
     * */
    public String[] getRegionNames() throws CachingException {
        String methodName = "getRegionNames()";
        SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");
        SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": end");
        return null;
    }
    /**
     * @deprecated memcached实现，该方法多余
     * */
    public boolean isPresent(Object arg0) throws CachingException {
        String methodName = new StringBuilder("isPresent(").append(arg0).append(")").toString();
        SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");
        SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": end");
        return false;
    }
    /**
     * @deprecated memcached实现，该方法多余
     * */
    public boolean isPresent(Object arg0, String arg1) throws CachingException {
        String methodName = new StringBuilder("isPresent(").append(arg0).append(", String arg1)").toString();
        SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");
        SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": end");
        return false;
    }
    /**
     * @deprecated memcached实现，该方法多余
     * */
    public boolean isPresent(Object arg0, String arg1, String arg2)
            throws CachingException {
        String methodName = new StringBuilder("isPresent(").append(arg0).append("String arg1, String arg2)").toString();
        SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");
        SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": end");
        return false;
    }

    public Set listCacheKeys() throws CachingException {
        String methodName = "listCacheKeys()";
        SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");
        try {
            if (cache != null) {
                
                return this.listCacheKeys("");
            } else {
                throw new Exception("memcached cache is null.");
            }
            
        } catch (Exception ex) {
            
            //ex.printStackTrace();
            SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.ERROR, ex.getMessage());
            throw new CachingException(ex);
            
        } finally {
            SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": end");
        }
    }
    

    public Set listCacheKeys(String arg0) throws CachingException {
        String methodName = new StringBuilder("listCacheKeys(").append(arg0).append(")").toString();
        SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");
        try {
            if (cache != null) {
                
                return this.listCacheKeys(arg0, "");
            } else {
                throw new Exception("memcached cache is null.");
            }
            
        } catch (Exception ex) {
            
            //ex.printStackTrace();
            SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.ERROR, ex.getMessage());
            throw new CachingException(ex);
            
        } finally {
            SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": end");
        }
    }


    public Set listCacheKeys(String arg0, String arg1) throws CachingException {
        String methodName = new StringBuilder("listCacheKeys(").append(arg0).append(", String arg1)").toString();
        SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");
        try {
            if (cache != null) {
                
                return cache.keySet();
            } else {
                throw new Exception("memcached cache is null.");
            }
            
        } catch (Exception ex) {
            
            //ex.printStackTrace();
            SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.ERROR, ex.getMessage());
            throw new CachingException(ex);
            
        } finally {
            SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": end");
        }
    }

    public Object peek(Object arg0) throws CachingException {
        
        String methodName =  new StringBuilder("peek(").append(arg0).append(")").toString();
        SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");
        try {
            if (cache != null) {
                
                return this.peek(arg0, "");
            } else {
                throw new Exception("memcached cache is null.");
            }
            
        } catch (Exception ex) {
            
            //ex.printStackTrace();
            SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.ERROR, ex.getMessage());
            throw new CachingException(ex);
            
        } finally {
            SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": end");
        }
    }


    public Object peek(Object arg0, String arg1) throws CachingException {
        String methodName = new StringBuilder("peek(").append(arg0).append(", String arg1)").toString();
        SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");
        try {
            if (cache != null) {
                
                return this.peek(arg0, arg1, "");
            } else {
                throw new Exception("memcached cache is null.");
            }
            
        } catch (Exception ex) {
            
            //ex.printStackTrace();
            SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.ERROR, ex.getMessage());
            throw new CachingException(ex);
            
        } finally {
            SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": end");
        }
    }


    public Object peek(Object arg0, String arg1, String arg2)
            throws CachingException {
        String methodName = new StringBuilder("peek(").append(arg0).append(", String arg1, String arg2)").toString();
        SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");
        try {
            if (cache != null && arg0 !=null && !"".equals((String)arg0)) {
                Object gettedCache = cache.get((String)arg0);
                return gettedCache;
            } else {
                throw new Exception("memcached cache is null.");
            }
            
        } catch (Exception ex) {
            
            //ex.printStackTrace();
            SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.ERROR, ex.getMessage());
            throw new CachingException(ex);
            
        } finally {
            SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": end");
        }
    }
    
    
    public Object peekForStat(Object arg0)
            throws CachingException {
        String methodName = new StringBuilder("peekForStat(").append(arg0).append(")").toString();
        SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");
        try {
        	cache = manager.getCache(CacheManagerConst.MEM_CLIENT_NAME);
            if (cache != null && arg0 !=null && !"".equals((String)arg0)) {
                Object gettedCache = cache.get((String)arg0);
                return gettedCache;
            } else {
                throw new Exception("memcached cache is null.");
            }
            
        } catch (Exception ex) {
            
            //ex.printStackTrace();
            SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.ERROR, ex.getMessage());
            throw new CachingException(ex);
            
        } finally {
            SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": end");
        }
    }

    public void putCacheObject(Object arg0, Object arg1)
            throws CachingException {
        
        String methodName = new StringBuilder("putCacheObject(").append(arg0).append(",").append(arg1.getClass().getName()).append(")").toString();
        SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");
        try {
            if (cache != null) {
                
                this.putCacheObject(arg0, arg1, "");
            } else {
                throw new Exception("memcached cache is null.");
            }
            
        } catch (Exception ex) {
            
            //ex.printStackTrace();
            SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.ERROR, ex.getMessage());
            throw new CachingException(ex);
            
        } finally {
            SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": end");
        }
        
    }


    public void putCacheObject(Object arg0, Object arg1, String arg2)
            throws CachingException {
        
        String methodName = "putCacheObject(" + arg0 + ", Object arg1, String arg2)";
        SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");
        try {
            if (cache != null) {
                
                this.putCacheObject(arg0, arg1, arg2, "");
            } else {
                throw new Exception("memcached cache is null.");
            }
            
        } catch (Exception ex) {
            
            //ex.printStackTrace();
            SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.ERROR, ex.getMessage());
            throw new CachingException(ex);
            
        } finally {
            SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": end");
        }
        
    }


    public void putCacheObject(Object arg0, Object arg1, String arg2,
            String arg3) throws CachingException {
        String methodName = "putCacheObject(" + arg0 + ", Object arg1, String arg2,String arg3)";
        SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");
        try {
            if (cache != null) {
            	/*
                HashMap<String, Object> cache_dataMap = new HashMap<String, Object>();
                if (arg1 instanceof Serializable) {
                    //可以通过命令统计大小，不用计算了
                    //cache_dataMap.put(KEY_CACHEDATA_SIZE, MemCacheUtil.calcSize((Serializable)arg1));
                } else {
                    cache_dataMap = null;
                    throw new Exception("Cached object is not a Serializable object.");
                }
                cache_dataMap.put(CacheManagerConst.KEY_CACHEDATA_DATA, arg1);
                cache_dataMap.put(KEY_CACHEDATA_STIME, Long.valueOf(System.currentTimeMillis()));
                cache_dataMap.put(CacheManagerConst.KEY_CACHEDATA_VALID, Integer.valueOf(CACHEDATA_VALID_TRUE));
                */
                int expiryMinuts = ((Integer)memcacheConfig.get(CacheManagerConst.CACHE_CONFIG_EXPIRYMINUTS_KEY)).intValue();
                if (cache.get((String)arg0) == null) {

                	
	                if (expiryMinuts != 0)  {
	                    cache.put((String)arg0, arg1, expiryMinuts*60);
	                } else {
	                    cache.put((String)arg0, arg1);
	                }
	                
                } else {
                	
	                if (expiryMinuts != 0)  {
	                    cache.replace((String)arg0, arg1, new Date(System.currentTimeMillis() + expiryMinuts*60*1000L));
	                } else {
	                    cache.replace((String)arg0, arg1);
	                }
                }
                
            } else {
                throw new Exception("memcached cache is null.");
            }
            
        } catch (Exception ex) {
            
            //ex.printStackTrace();
            SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.ERROR, ex.getMessage());
            throw new CachingException(ex);
            
        } finally {
            SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": end");
        }
        
    }
    

    public void removeCacheObject(Object arg0) throws CachingException {
        String methodName = "removeCacheObject(" + arg0 + ")";
        SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");
        try {
            if (cache != null) {

                this.removeCacheObject(arg0, "");
            } else {
                throw new Exception("memcached cache is null.");
            }
            
        } catch (Exception ex) {
            
            //ex.printStackTrace();
            SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.ERROR, ex.getMessage());
            throw new CachingException(ex);
            
        } finally {
            SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": end");
        }
        
    }
    

    public void removeCacheObject(Object arg0, String arg1)
            throws CachingException {
        String methodName = "removeCacheObject(" + arg0 + ", " + arg1 + ")";
        SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");
        try {
            if (cache != null) {

                this.removeCacheObject(arg0, arg1, "");
            } else {
                throw new Exception("memcached cache is null.");
            }
            
        } catch (Exception ex) {
            
            //ex.printStackTrace();
            SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.ERROR, ex.getMessage());
            throw new CachingException(ex);
            
        } finally {
            SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": end");
        }
        
    }


    public void removeCacheObject(Object arg0, String arg1, String arg2)
            throws CachingException {
        String methodName = "removeCacheObject(" + arg0 + ", " + arg1 + ", " + arg2 + ")";
        SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");
        try {
            if (cache != null) {

                cache.remove((String)arg0);
                
            } else {
                throw new Exception("memcached cache is null.");
            }
            
        } catch (Exception ex) {
            
            //ex.printStackTrace();
            SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.ERROR, ex.getMessage());
            throw new CachingException(ex);
            
        } finally {
            SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": end");
        }
        
    }

    /**
     * @deprecated memcached实现，该方法多余
     * */
    public void setConfigFile(String arg0) {
        // TODO Auto-generated method stub
        
    }
    
    /**
     * 取得缓存对象的详细信息，由于缓存监控不要了，因此该方法暂时没有用到，保留
     * @deprecated 该方法暂时没有用到，保留
     * */
    public Set getKeySetWithStatus() {
        String methodName = "getKeySetWithStatus";
        SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");
        Set keyset = cache.keySet();
        Set keysetWithSize = cache.keySetAppendSize();
        Set keysetWithStatus = cache.keySetAppendStat(keyset, keysetWithSize);
        SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": end");
        return keysetWithStatus;
    }
    
    /**
     * 取得缓存对象的KEY+SIZE
     * */
    public Set getKeySetWithSize() {
        String methodName = "getKeySetWithSize";
        SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");
        Set keysetWithSize = cache.keySetAppendSize();
        SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": end");
        return keysetWithSize;
    }
    
    /**
     * 更新缓存对象
     * */
    public void replaceCachedObject(String key, Object value) {
        String methodName = "replaceCachedObject";
        SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");
        
        int expiryMinuts = ((Integer)memcacheConfig.get(CacheManagerConst.CACHE_CONFIG_EXPIRYMINUTS_KEY)).intValue();
        
        if (expiryMinuts != 0)  {
            cache.replace(key, value, new Date(System.currentTimeMillis() + expiryMinuts*60*1000L));
        } else {
            cache.replace(key, value);
        }
        SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": end");
    }

    
    /**
     * 取得全量缓存时，数据库中的表名称
     * */
    /*
    public List<String> getDBTablesFromBO() {
        String methodName = "reloadCachedObject";
        SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");
        String tad = MemCacheUtil.getCachePerformanceTableAd();
        List<String> rel = cacheManagerBO.getDBTables(tad);
        SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": end");
    	return rel;
    	
    }
    */
    /*
    
     * 缓存数据库表的全量数据，取得所用的时间

    public List<String> cacheTableForPerformance(String tableName, MemCacheManager memCacheManager) {
        String methodName = "cacheTableForPerformance";
        SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");

        List<String> returnLs = cacheManagerBO.getPerformanceDetail(tableName, memCacheManager);
        
        SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": end");
    	return returnLs;
    	
    }
    */

}
