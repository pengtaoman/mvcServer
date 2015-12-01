package com.neusoft.tdframework.memcache;

import java.util.HashMap;
import java.util.List;
import java.util.Set;
import java.io.Serializable;
import java.lang.reflect.Method;


import com.neusoft.tdframework.admin.cache.common.CacheConst;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;
import com.neusoft.unieap.config.CacheConfig;
import com.neusoft.unieap.service.cache.ICacheLoader;
import com.neusoft.unieap.service.cache.ICacheLoaders;
import com.neusoft.unieap.service.cache.ICacheManager;
import com.neusoft.unieap.service.cache.exception.CachingException;

public class CacheManagerProxy {

	private ICacheManager iCacheManager;
	
	private HashMap memcacheConfig;
	
	private CacheManagerProxy(String cacheType) {
		
        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
		AppContext appContext = new AppContextImpl();
	    appContext.setApplicationName("");
	    
	    CacheObjectPreHandler cacheObjectPreHandler = (CacheObjectPreHandler)factory.getInteractionObject(
	    		"preLoadCache", 
        		appContext);
	    MemCacheManager memCacheManager = cacheObjectPreHandler.getMemCacheManagerImpl();
	    try {
	        memCacheManager.afterPropertiesSet();
	    } catch (Exception ex) {
	    	//ex.printStackTrace();
	    	SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.ERROR, ex.getMessage());
	    }
	    memcacheConfig = memCacheManager.getMemcacheConfig();
	    
	    
		if (CacheManagerConst.CACHE_TYPE_EHCACHE.equals(cacheType)) {
			
			iCacheManager = CacheConfig.manager;
			
		} else if (CacheManagerConst.CACHE_TYPE_MEMCACHED.equals(cacheType)) {
		    iCacheManager = memCacheManager;

		} else {
			Exception ex = new Exception("CACHE TYPE 不合法.");
			SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.ERROR, ex.getMessage());
			//throw ex;
		}
	}
	
	public static CacheManagerProxy getInstanceOfEhCacheProxy() {
		return new CacheManagerProxy(CacheManagerConst.CACHE_TYPE_EHCACHE);
	}
	
	public static CacheManagerProxy getInstanceOfMemcachedProxy() {
		return new CacheManagerProxy(CacheManagerConst.CACHE_TYPE_MEMCACHED);
	}

    public void clear() throws CachingException {
    	iCacheManager.clear();
    }

    /**
     * @deprecated memcached实现，该方法多余
     * */
    public void clear(String arg0) throws CachingException {
    	iCacheManager.clear(arg0);
    }

    /**
     * @deprecated memcached实现，该方法多余
     * */
    public void clear(String arg0, String arg1) throws CachingException {
    	iCacheManager.clear(arg0, arg1);
    }
    /**
     * @deprecated memcached实现，该方法多余
     * */
    public Object getCacheObject(Object arg0, ICacheLoader arg1)
            throws CachingException {
    	return iCacheManager.getCacheObject(arg0, arg1);
    }
    /**
     * @deprecated memcached实现，该方法多余
     * */
    public Object getCacheObject(Object arg0, boolean arg1, ICacheLoader arg2)
            throws CachingException {
    	return iCacheManager.getCacheObject(arg0, arg1, arg2);
    }
    
    /**
     * @deprecated memcached实现，该方法多余
     * */
    public Object getCacheObject(Object arg0, ICacheLoader arg1, String arg2)
            throws CachingException {
    	return iCacheManager.getCacheObject(arg0, arg1, arg2);
    }
    /**
     * @deprecated memcached实现，该方法多余
     * */
    public Object getCacheObject(Object arg0, ICacheLoaders arg1, String arg2)
            throws CachingException {
        
    	return iCacheManager.getCacheObject(arg0, arg1, arg2);
    }

    public Object getCacheObject(Object arg0, boolean arg1, ICacheLoader arg2,
            String arg3) throws CachingException {
    	return iCacheManager.getCacheObject(arg0, arg1, arg2);
    }
    /**
     * @deprecated memcached实现，该方法多余
     * */
    public Object getCacheObject(Object arg0, ICacheLoader arg1, String arg2,
            String arg3) throws CachingException {
        
    	return iCacheManager.getCacheObject(arg0, arg1, arg2, arg3);
    }
    /**
     * @deprecated memcached实现，该方法多余
     * */
    public Object getCacheObject(Object arg0, boolean arg1, ICacheLoaders arg2,
            String arg3) throws CachingException {
        
    	return iCacheManager.getCacheObject(arg0, arg1, arg2, arg3);
    }
    /**
     * @deprecated memcached实现，该方法多余
     * */
    public Object getCacheObject(Object arg0, ICacheLoaders arg1, String arg2,
            String arg3) throws CachingException {
    	return iCacheManager.getCacheObject(arg0, arg1, arg2, arg3);
    }
    /**
     * @deprecated memcached实现，该方法多余
     * */
    public Object getCacheObject(Object arg0, boolean arg1, ICacheLoader arg2,
            String arg3, String arg4) throws CachingException {
    	return iCacheManager.getCacheObject(arg0, arg1, arg2, arg3, arg4);
    }
    
    /**
     * @deprecated memcached实现，该方法多余
     * */
    public Object getCacheObject(Object arg0, boolean arg1, ICacheLoaders arg2,
            String arg3, String arg4) throws CachingException {
    	return iCacheManager.getCacheObject(arg0, arg1, arg2, arg3, arg4);
    }
    /**
     * @deprecated memcached实现，该方法多余
     * */
    public String getConfigFile() {
    	return iCacheManager.getConfigFile();
    }
    /**
     * @deprecated memcached实现，该方法多余
     * */
    public String[] getGroupNames() throws CachingException {
    	return iCacheManager.getGroupNames();
    }
    /**
     * @deprecated memcached实现，该方法多余
     * */
    public String[] getGroupNames(String arg0) throws CachingException {
    	return iCacheManager.getGroupNames(arg0);
    }
    /**
     * @deprecated memcached实现，该方法多余
     * */
    public String[] getRegionNames() throws CachingException {
    	return iCacheManager.getRegionNames();
    }
    /**
     * @deprecated memcached实现，该方法多余
     * */
    public boolean isPresent(Object arg0) throws CachingException {
    	return iCacheManager.isPresent(arg0);
    }
    /**
     * @deprecated memcached实现，该方法多余
     * */
    public boolean isPresent(Object arg0, String arg1) throws CachingException {
    	return iCacheManager.isPresent(arg0, arg1);
    }
    /**
     * @deprecated memcached实现，该方法多余
     * */
    public boolean isPresent(Object arg0, String arg1, String arg2)
            throws CachingException {
    	return iCacheManager.isPresent(arg0, arg1, arg2);
    }

    public Set listCacheKeys() throws CachingException {
    	return iCacheManager.listCacheKeys();
    }
    

    public Set listCacheKeys(String arg0) throws CachingException {
    	return iCacheManager.listCacheKeys(arg0);
    }


    public Set listCacheKeys(String arg0, String arg1) throws CachingException {
    	return iCacheManager.listCacheKeys(arg0, arg1);
    }

    public Object peek(Object arg0) throws CachingException {
        
    	return peek(arg0, "");
    	
    }


    private Object peek(Object arg0, String arg1) throws CachingException {
    	return peek(arg0, arg1, "");
    }


    private Object peek(Object arg0, String arg1, String arg2)
            throws CachingException {

        try {
          
            Object gettedCache = iCacheManager.peek((String)arg0);
            if (gettedCache instanceof HashMap && ((HashMap)gettedCache).get(CacheManagerConst.KEY_CACHEDATA_VALID) != null) {
                HashMap<String, Object> cache_dataMap = (HashMap<String, Object>)gettedCache;
                Object cacheData = cache_dataMap.get(CacheManagerConst.KEY_CACHEDATA_DATA);
                if (cacheData != null) {
                    if (((Integer)cache_dataMap.get(CacheManagerConst.KEY_CACHEDATA_VALID)).intValue() == 1) {
                        return cache_dataMap.get(CacheManagerConst.KEY_CACHEDATA_DATA);
                    } else {
                        return null;
                    }
                } else {
                	if (cache_dataMap.get(CacheManagerConst.KEY_CACHEDATA_VALID) != null) {
                		return null;
                	} else {
                        return gettedCache;
                	}
                }
            } else {
                return gettedCache;
            }

            
        } catch (Exception ex) {
            
            //ex.printStackTrace();
            SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.ERROR, 
            		new StringBuilder("CacheManagerProxy-peek(")
                            .append(arg0)
                            .append(", ")
                            .append(arg1)
                            .append(", ")
                            .append(arg2)
                            .append(") : 执行失败。").toString());
            return null;
            
        } 
    }
    
    
    public Object peekForStat(Object arg0) {
    	try{
	    	if (iCacheManager instanceof MemCacheManager) {
	    		return ((MemCacheManager)iCacheManager).peekForStat(arg0);
	    	} else {
	    		return iCacheManager.peek(arg0);
	    	}
    	} catch (Exception ex) {
            //ex.printStackTrace();
            SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.ERROR, ex.getMessage());
            return null;
    	}
    }
    
    /*
    public void putCacheObject(Object arg0, Object arg1)
    {
    	Serializable[] seArg = null;
    	putCacheObject(arg0, arg1, null, null, "", "", seArg);
    }
    
    public void putCacheObject(Object arg0, Object arg1, String beanId, String beanMethodName)
    {
    	Serializable[] seArg = null;
    	putCacheObject(arg0, arg1, beanId, beanMethodName, "", "", seArg);
    }
    
    
    
    public void putCacheObject(Object arg0, Object arg1, String beanId, String beanMethodName, String applicationName, Serializable... args)
    {
    	putCacheObject(arg0, arg1, beanId, beanMethodName, applicationName, "", args);
    }
    */
    
    /**
     * 缓存对象存入缓存
     * @param cacheManagerProxyArg  缓存对象管理参数类
     * */
    public void putCacheObject(CacheManagerProxyArg cacheManagerProxyArg)
    {
		String cacheKey = "";
		Object cacheObject = null; 
		String beanId = ""; 
		String beanMethodName = ""; 
		String applicationName = ""; 
		String description = ""; 
		String updateDBBeanID = "";
		String updateDBBeanMethodName = "";
		String updateDBApplicationName = "";
		Serializable[] serArgs = null;
    	if (cacheManagerProxyArg.getCacheKey() != null) {
    		cacheKey = cacheManagerProxyArg.getCacheKey(); 
    	}
    	
    	if (cacheManagerProxyArg.getCacheObject() != null) {
    		cacheObject = cacheManagerProxyArg.getCacheObject(); 
    	}
    	
		if (cacheManagerProxyArg.getBeanId() != null) {
			beanId = cacheManagerProxyArg.getBeanId();
		}
		
		if (cacheManagerProxyArg.getBeanMethodName() != null) {
			beanMethodName = cacheManagerProxyArg.getBeanMethodName();
		}
		
		if (cacheManagerProxyArg.getApplicationName() != null) {
			applicationName = cacheManagerProxyArg.getApplicationName();
		}
		
		if (cacheManagerProxyArg.getDescription() != null) {
			description = cacheManagerProxyArg.getDescription();
		}
		
		if (cacheManagerProxyArg.getUpdateDBBeanID() != null) {
			updateDBBeanID = cacheManagerProxyArg.getUpdateDBBeanID();
		}
		
		if (cacheManagerProxyArg.getUpdateDBBeanMethodName() != null) {
			updateDBBeanMethodName = cacheManagerProxyArg
					.getUpdateDBBeanMethodName();
		}
		
		if (cacheManagerProxyArg.getUpdateDBApplicationName() != null) {
			updateDBApplicationName = cacheManagerProxyArg.getUpdateDBApplicationName();
		}
		
		if (cacheManagerProxyArg.getBeanMethodArgs() != null) {
			serArgs = cacheManagerProxyArg.getBeanMethodArgs();
		}
		
		putCacheObject(
        		cacheKey, 
        		cacheObject, 
        		beanId, 
        		beanMethodName, 
        		applicationName, 
        		description, 
        		updateDBBeanID,
        		updateDBBeanMethodName,
        		updateDBApplicationName,
        		serArgs);
    }
    
    /**
     * 缓存预加载的对象 ，由于是预加载的缓存对象，因此缓存对象均可以重新加载，不用指定重新加载的参数，
     *                  同时，如果配置文件中设置了更新数据库的相关配置，则该缓存对象可以与数据库进行同步操作
     * @param cacheKey             缓存对象的KEY
     * @param cacheObject             缓存对象的本体
     * @param description      缓存对像描述
     * */
    /*  bean经过代理之后  类名变化  该方法不再使用
    public void putCacheLoadOnStartup(String cacheKey, Object cacheObject, String description) {
    	
        String methodName = "putCacheLoadOnStartup(" + cacheKey + ", Object cacheObject, String description)";
        SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");
    	
    	String callingClass = null;
    	String callingMethod = null;
    	
    	Serializable[] serArgs = null;
    	StackTraceElement stack[] = (new Throwable()).getStackTrace();
    	// First, search back to a method in the Logger class.
    	int ix = 0;
    	while (ix < stack.length) {
    	    StackTraceElement frame = stack[ix];
    	    String cname = frame.getClassName();
    	    if (cname.equals(this.getClass().getName())) {
    		break;
    	    }
    	    ix++;
    	}
    	// Now search for the first frame before the "Logger" class.
    	while (ix < stack.length) {
    	    StackTraceElement frame = stack[ix];
    	    String cname = frame.getClassName();
    	    if (!cname.equals(this.getClass().getName())) {
    		// We've found the relevant frame.
    	    	callingClass = cname;
    	    	callingMethod = frame.getMethodName();
    	    	break;
    	    }
    	    ix++;
    	}
    	
    	if (callingClass != null && callingMethod != null && memcacheConfig != null) {
    		List<String[][]> preBeansConf = (List<String[][]>)memcacheConfig.get(CacheManagerConst.CACHE_CONFIG_PRELOAD_CONF_KEY);
    		boolean outFirstLoop = false;
    		for (String[][] preconfs : preBeansConf) {
    			for (String[] beanconfs : preconfs) {
    				if (callingClass.equals(beanconfs[6]) && callingMethod.equals(beanconfs[2])) {
    					putCacheObject(
    							cacheKey, 
    							cacheObject, 
    							beanconfs[1],  
    							beanconfs[2], 
    							beanconfs[0], 
    							description, 
    							beanconfs[4], 
    							beanconfs[5],  
    							beanconfs[3],  
    							serArgs);
    					outFirstLoop = true;
    					break;
    				}
    			}
    			if (outFirstLoop) {
    				break;
    			}
    		}
    		
    		if (!outFirstLoop) {
				putCacheObject(
						cacheKey, 
						cacheObject, 
						"",  
						"", 
						"", 
						description, 
						serArgs);
    		}
    		
    	} else {
			putCacheObject(
					cacheKey, 
					cacheObject, 
					"",  
					"", 
					"", 
					description, 
					serArgs);
    	}
    	
    	SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": end");
    }
    */
    /**
     * 该方法不是给业务侧调用的，是给框架自己调用的
     * 缓存预加载的对象 ，由于是预加载的缓存对象，因此缓存对象均可以重新加载，不用指定重新加载的参数，
     *                  同时，如果配置文件中设置了更新数据库的相关配置，则该缓存对象可以与数据库进行同步操作
     * @param cacheKey             缓存对象的KEY
     * @param cacheObject             缓存对象的本体
     * @param description      缓存对像描述
     * @param callingClass 调用putCacheLoadOnStartup方法的类名
     * @param callingMethod 调用putCacheLoadOnStartup方法的方法名
     * */
    public void putCacheLoadOnStartup(String cacheKey, Object cacheObject, String description, String callingClass, String callingMethod) {
    	
        String methodName = "putCacheLoadOnStartup(" + cacheKey + ", Object cacheObject, String description)";
        SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");
    	
    	Serializable[] serArgs = null;

    	
    	if (callingClass != null && callingMethod != null && memcacheConfig != null) {
    		List<String[][]> preBeansConf = (List<String[][]>)memcacheConfig.get(CacheManagerConst.CACHE_CONFIG_PRELOAD_CONF_KEY);
    		boolean outFirstLoop = false;
    		for (String[][] preconfs : preBeansConf) {
    			for (String[] beanconfs : preconfs) {
    				if (callingClass.equals(beanconfs[6]) && callingMethod.equals(beanconfs[2])) {
    					putCacheObject(
    							cacheKey, 
    							cacheObject, 
    							beanconfs[1],  
    							beanconfs[2], 
    							beanconfs[0], 
    							description, 
    							beanconfs[4], 
    							beanconfs[5],  
    							beanconfs[3],  
    							serArgs);
    					outFirstLoop = true;
    					break;
    				}
    			}
    			if (outFirstLoop) {
    				break;
    			}
    		}
    		
    		if (!outFirstLoop) {
				putCacheObject(
						cacheKey, 
						cacheObject, 
						"",  
						"", 
						"", 
						description, 
						serArgs);
    		}
    		
    	} else {
			putCacheObject(
					cacheKey, 
					cacheObject, 
					"",  
					"", 
					"", 
					description, 
					serArgs);
    	}
    	
    	SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": end");
    }
  
    
    /**
     * 缓存对象存入缓存，该缓存对象没有能力重新加载
     * @param cacheKey             缓存对象的KEY
     * @param cacheObject             缓存对象的本体
     * @param description      缓存对像描述
     * */
    public void putCacheObjectNoReloadable(String cacheKey, Object cacheObject, String description)
    {
    	Serializable[] serArgs = null;
    	putCacheObject(cacheKey, cacheObject, "", "", "", description, serArgs);
    }
    
    /**
     * 缓存对象存入缓存，参数给全则该缓存对象有能力重新加载但是不能够更新数据库
     * @param cacheKey             缓存对象的KEY
     * @param cacheObject             缓存对象的本体
     * @param beanId           缓存对象时使用的beanID
     * @param beanMethodName   缓存对象使用的方法
     * @param applicationName  缓存对象使用的bean的application name
     * @param description      缓存对像描述
     * @param args             缓存对象使用的方法的参数
     * */
    public void putCacheObject(
    		String cacheKey, 
    		Object cacheObject, 
    		String beanId, 
    		String beanMethodName, 
    		String applicationName, 
    		String description, 
    		Serializable[] args)
    {
        String methodName = "putCacheObject(" + cacheKey + ", Object arg1, String arg2,String arg3)";
        SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");

        putCacheObject(
        		cacheKey, 
        		cacheObject, 
        		beanId, 
        		beanMethodName, 
        		applicationName, 
        		description, 
        		"",
        		"",
        		"",
        		args);

        SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": end");

        
    }
    
    /**
     * 缓存对象存入缓存，参数给全则该缓存对象有能力重新加载 并在更新时与数据库同步
     * @param cacheKey             缓存对象的KEY
     * @param cacheObject             缓存对象的本体
     * @param beanId           缓存对象时使用的beanID
     * @param beanMethodName   缓存对象使用的方法
     * @param applicationName  缓存对象使用的bean的application name
     * @param description      缓存对像描述
     * @param updateDBBeanID           更新缓存对象同时更新数据库的beanID
     * @param updateDBBeanMethodName   更新缓存对象同时更新数据库的方法
     * @param updateDBApplicationName  更新缓存对象同时更新数据库的的bean的application name
     * @param args             缓存对象使用的方法的参数
     * */
    public void putCacheObject (
    		String cacheKey, 
    		Object cacheObject, 
    		String beanId, 
    		String beanMethodName, 
    		String applicationName, 
    		String description, 
    		String updateDBBeanID,
    		String updateDBBeanMethodName,
    		String updateDBApplicationName,
    		Serializable[] args)
    {
        String methodName = "putCacheObject(" + cacheKey + ", Object arg1, String arg2,String arg3)";
        SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");
        try {
            
            	
                HashMap<String, Object> cache_dataMap = new HashMap<String, Object>();
                if (cacheObject instanceof Serializable) {
                    //可以通过命令统计大小，不用计算了
                    //cache_dataMap.put(KEY_CACHEDATA_SIZE, MemCacheUtil.calcSize((Serializable)arg1));
                } else {
                    cache_dataMap = null;
                    throw new Exception("要缓存的对象不是可序列化的。");
                }
                cache_dataMap.put(CacheManagerConst.KEY_CACHEDATA_DATA, cacheObject);
                cache_dataMap.put(CacheManagerConst.KEY_CACHEDATA_STIME, Long.valueOf(System.currentTimeMillis()));
                cache_dataMap.put(CacheManagerConst.KEY_CACHEDATA_VALID, Integer.valueOf(CacheManagerConst.CACHEDATA_VALID_TRUE));
                cache_dataMap.put(CacheManagerConst.KEY_CACHEDATA_BEANID, beanId);
                cache_dataMap.put(CacheManagerConst.KEY_CACHEDATA_METHOD, beanMethodName);
                cache_dataMap.put(CacheManagerConst.KEY_CACHEDATA_DISCRIPTION, description);
                cache_dataMap.put(CacheManagerConst.KEY_CACHEDATA_ARGS, args);
                cache_dataMap.put(CacheManagerConst.KEY_CACHEDATA_APPLICATION_NAME, applicationName);
                if (iCacheManager instanceof MemCacheManager) {
                	cache_dataMap.put(CacheManagerConst.KEY_CACHEDATA_TYPE, CacheManagerConst.CACHE_TYPE_MEM);
                } else {
                	cache_dataMap.put(CacheManagerConst.KEY_CACHEDATA_TYPE, CacheManagerConst.CACHE_TYPE_EH);
                }
                cache_dataMap.put(CacheManagerConst.KEY_CACHEDATA_UPDATEDB_BEANID, updateDBBeanID);
                cache_dataMap.put(CacheManagerConst.KEY_CACHEDATA_UPDATEDB_METHOD, updateDBBeanMethodName);
                cache_dataMap.put(CacheManagerConst.KEY_CACHEDATA_UPDATEDB_APPLICATION_NAME, updateDBApplicationName);
                iCacheManager.putCacheObject(cacheKey, cache_dataMap);

        } catch (Exception ex) {
            
            //ex.printStackTrace();
            SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.ERROR, ex.getMessage());
            SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.ERROR, 
            		new StringBuilder("CacheManagerProxy-putCacheObject(")
                            .append(cacheKey)
                            .append(", ")
                            .append(cacheObject)
                            .append(", ")
                            .append(beanId)
                            .append(", ")
                            .append(beanMethodName)
                            .append(", ")
                            .append(applicationName)
                            .append(", ")
                            .append(description)
                            .append(", ")
                            .append(updateDBBeanID)
                            .append(", ")
                            .append(updateDBBeanMethodName)
                            .append(", ")
                            .append(updateDBApplicationName)
                            .append(") : 执行失败。").toString());
            //throw new CachingException(ex);
            
        } finally {
            SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": end");
        }
        
    }
    
    public void putObjectDirectly(String key, Object cacheObject) {
    	
    	String methodName = "putObjectDirectly(" + key + ", Object cacheObject)";
    	SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");
    	try {
	    	if (iCacheManager.peek(key) != null) {
	    		iCacheManager.removeCacheObject(key);
	    	}
	    	iCacheManager.putCacheObject(key, cacheObject);
    	} catch (Exception ex) {
    		SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": end 异常。");
    	}
    	SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": end");
    }


    public void removeCacheObject(Object arg0) throws CachingException {
    	iCacheManager.removeCacheObject(arg0);
    }
    

    public void removeCacheObject(Object arg0, String arg1)
            throws CachingException {
    	iCacheManager.removeCacheObject(arg0, arg1);
        
    }


    public void removeCacheObject(Object arg0, String arg1, String arg2)
            throws CachingException {
    	iCacheManager.removeCacheObject(arg0, arg1, arg2);
        
    }

    /**
     * @deprecated memcached实现，该方法多余
     * */
    public void setConfigFile(String arg0) {
        // TODO Auto-generated method stub
        
    }
    
    /**
     * 取得缓存对象的KEY+SIZE
     * */
    public Set getKeySetWithSize() {
    	if (iCacheManager instanceof MemCacheManager) {
    		
    		return ((MemCacheManager)iCacheManager).getKeySetWithSize();
    		
    	} else {
    		try {
    		   return iCacheManager.listCacheKeys();
    		   
    		} catch (Exception ex) {
    			//ex.printStackTrace();
                SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.ERROR, 
                		new StringBuilder("CacheManagerProxy-getKeySetWithSize(")
                                .append(") : 执行失败。").toString());
    			return null;
    		}
    	}

    }
    
    /**
     * 更新缓存对象
     * */
    public void replaceCachedObject(String key, Object value) {
    	if (iCacheManager instanceof MemCacheManager) {
    		((MemCacheManager)iCacheManager).replaceCachedObject(key, value);
    	} else {
    		try {
    		    iCacheManager.removeCacheObject(key);
    		    iCacheManager.putCacheObject(key, value);
    		} catch (Exception ex) {
    			//ex.printStackTrace();
                SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.ERROR, 
                		new StringBuilder("CacheManagerProxy-replaceCachedObject(")
                                .append(key)
                                .append(", ")
                                .append(value)
                                .append(") : 执行失败。").toString());
    		}
    	}
    }
    
    /**
     * 更新缓存对象的数据部分
     * */
    public void replaceCachedData(String key, Object value) {
    	String methodName = "replaceCachedData";
    	SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");
    	Object getCached = peekForStat(key);
        if (getCached instanceof HashMap ) {
        	
        	try {
        		
    	        String beanId = (String)((HashMap)getCached).get(CacheManagerConst.KEY_CACHEDATA_BEANID);
    	        String beanMethodName = (String)((HashMap)getCached).get(CacheManagerConst.KEY_CACHEDATA_METHOD); 
    	        String applicationName = (String)((HashMap)getCached).get(CacheManagerConst.KEY_CACHEDATA_APPLICATION_NAME);
    	        
    	        if (beanId != null && !"".equals(beanId.trim()) 
    	        		&& beanMethodName != null && !"".equals(beanMethodName.trim())
    	        		&& applicationName != null) {
    	        	
    	        	((HashMap)getCached).put(CacheManagerConst.KEY_CACHEDATA_DATA, value);
                    this.putObjectDirectly(key, getCached);
    	        	
    	        } else {
    	        	replaceCachedObject(key, value);
    	        }

            } catch (Exception ex) {
                ex.printStackTrace();
                SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.ERROR, ex.getMessage());
            } finally {
                SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": end");
            }
        } else {
        	replaceCachedObject(key, value);
        }
    }
    
    /**
     * 重新载入缓存对象
     * */
    public void reloadCachedObject(String key) throws CachingException {

    	String methodName = "reloadCachedObject";
        SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");
        String[] sepKey = key.split(CacheConst.CACHE_KEY_TYPE_SEP);
        Object getCached = peekForStat(sepKey[0]);
        
        if (getCached instanceof HashMap ) {
        	
        	try {
        		
    	        String beanId = (String)((HashMap)getCached).get(CacheManagerConst.KEY_CACHEDATA_BEANID);
    	        String beanMethodName = (String)((HashMap)getCached).get(CacheManagerConst.KEY_CACHEDATA_METHOD); 
    	        String applicationName = (String)((HashMap)getCached).get(CacheManagerConst.KEY_CACHEDATA_APPLICATION_NAME);
    	        
    	        if (beanId != null && !"".equals(beanId.trim()) 
    	        		&& beanMethodName != null && !"".equals(beanMethodName.trim())
    	        		&& applicationName != null) {
    	        
	                InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
	    			AppContext appContext = new AppContextImpl();
	    		    appContext.setApplicationName(applicationName);
	    		    
	    		    Object beanObj = factory.getInteractionObject(
	    		    		beanId, 
	                		appContext);
	 
	    	        Object argsObj = ((HashMap)getCached).get(CacheManagerConst.KEY_CACHEDATA_ARGS);
	    	        Object[] args = (Object[])argsObj;
	    	        
	    	        //执行重载之前，先清除一下缓存数据
	    	        ((HashMap)getCached).put(CacheManagerConst.KEY_CACHEDATA_DATA, null);
	    	        Object returnValue = null;
	    	        if (argsObj != null && args.length > 0) {
	    	        	
		    	        returnValue = org.apache.commons.beanutils.MethodUtils.invokeMethod(beanObj, beanMethodName, args);
	    	        	
	    	        } else {
	    	        	returnValue = org.apache.commons.beanutils.MethodUtils.invokeMethod(beanObj, beanMethodName, null);
	    	        }
	    	        
	    	        if (returnValue != null) {
	    	        	((HashMap)getCached).put(CacheManagerConst.KEY_CACHEDATA_DATA, returnValue);
	    	        	((HashMap)getCached).put(CacheManagerConst.KEY_CACHEDATA_VALID, 1);
	    	        	this.putObjectDirectly(sepKey[0], getCached);
    	        	}
	    	        
    	        } else {
    	            SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.ERROR, 
    	            		new StringBuilder("CacheManagerProxy-reloadCachedObject(")
    	                            .append(key)
    	                            .append(") : 执行失败，缓存对象没有必要的重新加载的设置信息。").toString());
    	        }

            } catch (Exception ex) {
                ex.printStackTrace();
                SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.ERROR, ex.getMessage());
                throw new CachingException(ex);
            } finally {
                SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": end");
            }
        }
        
    }	
}
