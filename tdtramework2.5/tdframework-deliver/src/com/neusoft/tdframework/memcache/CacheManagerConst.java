package com.neusoft.tdframework.memcache;

public class CacheManagerConst {
	
	private CacheManagerConst() {};
	
    /**
     * 日志用MODEL名
     * */
	public final static String CACHE_MODEL_NAME = "tdframework cache";//MemCacheManager.class.getName();
    
	/**
	 * 存入Map中的缓存对象过期时间的KEY
	 * */
	public static final String CACHE_CONFIG_EXPIRYMINUTS_KEY = "CACHE_CONFIG_EXPIRYMINUTS_KEY";
    
	/**
	 * 存入Map中的根据上下文路径取得对应配置文件的设定的KEY
	 * */
	public static final String CACHE_CONFIG_CONTEXT_PATH = "CACHE_CONFIG_PRECACHE_KEY";
	
	/**
	 * 存入Map中的预加载缓存对象的KEY
	 * */
	public static final String CONTEXT_PATH_CONFIG_KEY = "CONTEXT_PATH_CONFIG_KEY";
	/**
	 * 存入Map中的预加载缓存对象的配置信息的KEY
	 * */
	public static final String CACHE_CONFIG_PRELOAD_CONF_KEY = "CACHE_CONFIG_PRELOAD_CONF_KEY";
    
    /**
     * memcached配置文件
     * */
	public static final String CACHE_CONFIG_FILE = "conf/cache/cache-config.xml";
    
    /**
     * memcached服务名
     * */
	public static final String MEM_CLIENT_NAME = "mclient";
    
    /**
     * memcached缓存对象有效
     * */
	public static final int CACHEDATA_VALID_TRUE = 1;
    /**
     * memcached缓存对象无效
     * */
	public static final int CACHEDATA_VALID_FALSE = 0;
    /**
     * memcached缓存对象数据域的KEY
     * */
	public static final String KEY_CACHEDATA_DATA = "MEMCACHE_DATA";
    /**
     * memcached缓存对象大小域的KEY
     * */
	public static final String KEY_CACHEDATA_SIZE = "MEMCACHE_SIZE";
    /**
     * memcached缓存对象开始时间域的KEY
     * */
	public static final String KEY_CACHEDATA_STIME = "MEMCACHE_STIME";
    /**
     * memcached缓存对象是否有效域的KEY
     * */
	public static final String KEY_CACHEDATA_VALID = "MEMCACHE_VALID";
    
    /**
     * memcached缓存对象BEAN ID的KEY
     * */
    public static final String KEY_CACHEDATA_BEANID = "KEY_CACHEDATA_BEANID";
    
    /**
     * memcached缓存对象方法域的KEY
     * */
    public static final String KEY_CACHEDATA_METHOD = "MEMCACHE_METHOD";
    
	/**
	 *  XML配置文件中系统启动时缓存对象描述
	 * */
    public static final String KEY_CACHEDATA_DISCRIPTION = "description";
    
    /**
     * 缓存对象参数域的KEY
     * */
    public static final String KEY_CACHEDATA_ARGS = "MEMCACHE_ARGS";
    
    /**
     * 缓存对象对应bean的application name
     * */
    public static final String KEY_CACHEDATA_APPLICATION_NAME = "KEY_CACHEDATA_APPLICATION_NAME";
    
    /**
     * 更新缓存对象同时更新数据库的bean ID
     * */
    public static final String KEY_CACHEDATA_UPDATEDB_BEANID = "KEY_CACHEDATA_UPDATEDB_BEANID";
    
    /**
     * 更新缓存对象同时更新数据库的bean的方法
     * */
    public static final String KEY_CACHEDATA_UPDATEDB_METHOD = "KEY_CACHEDATA_UPDATEDB_METHOD";
    
    /**
     * 更新缓存对象同时更新数据库的beanbean的application name
     * */
    public static final String KEY_CACHEDATA_UPDATEDB_APPLICATION_NAME = "KEY_CACHEDATA_UPDATEDB_APPLICATION_NAME";
    
    /**
     * 缓存对象的key用~分隔为区域~编号  缓存系统维护区域的KEY
     * */
    public static final String CACHE_OBJECT_DIF_REGION = "CACHE_OBJEC_DIF_REGION";
    
    /**
     * 缓存对象的key用~分隔为区域~编号  缓存系统维护区域的KEY
     * */
    public static final String CACHE_OBJECT_KEY_SEPARATOR = "~";
    
    /**
     * 缓存对象的类别(MEMCACHED缓存 ： MEMCACHED   ； EHMCACHE缓存 ： EHMCACHE  )
     * */
    public static final String KEY_CACHEDATA_TYPE = "KEY_CACHEDATA_TYPE";
    
    

	/**
	 *  XML配置文件中缓存对象过期时间设置的KEY
	 * */
    public static final String MEMCACHE_CONFIG_EXPIRY_MINUTS = "cache-expiry-minuts";
	
	/**
	 *  XML配置文件中系统启动时缓存配置
	 * */
    public static final String MEMCACHE_PRE_CACHED_WEBAPP_CONTEXT = "context-cached-config";

	
	/**
	 *  XML配置文件中系统启动时缓存对象bean id
	 * */
    public static final String MEMCACHE_CONFIG_PRE_BEANID = "bean-id";
	
	/**
	 *  XML配置文件中系统启动时缓存对象方法名
	 * */
    public static final String MEMCACHE_CONFIG_PRE_METHOD = "method";
    
	
	/**
	 *  XML配置文件中系统启动时缓存对象VO
	 * */
	public static final String MEMCACHE_CONFIG_CACHED_OBJECT_VO = "voclass";
	
	
	public static final String CACHE_TYPE_MEMCACHED = "MEMCACHED_MANAGER";
	
	public static final String CACHE_TYPE_EHCACHE = "EHCACHE_MAMANGER";
	
	public static final String CACHE_MEMCACHED_MANAGER_BEANID = "MemCacheManagerImpl";
	
	/**
	 * 缓存对象类型  MEMCACHE
	 * */
	public final static String CACHE_TYPE_MEM = "MEMCACHE";
	/**
	 * 缓存对象类型  EHCACHE
	 * */
	public final static String CACHE_TYPE_EH = "EHCACHE";

}
