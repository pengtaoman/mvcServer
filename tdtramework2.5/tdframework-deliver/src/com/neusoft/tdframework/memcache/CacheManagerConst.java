package com.neusoft.tdframework.memcache;

public class CacheManagerConst {
	
	private CacheManagerConst() {};
	
    /**
     * ��־��MODEL��
     * */
	public final static String CACHE_MODEL_NAME = "tdframework cache";//MemCacheManager.class.getName();
    
	/**
	 * ����Map�еĻ���������ʱ���KEY
	 * */
	public static final String CACHE_CONFIG_EXPIRYMINUTS_KEY = "CACHE_CONFIG_EXPIRYMINUTS_KEY";
    
	/**
	 * ����Map�еĸ���������·��ȡ�ö�Ӧ�����ļ����趨��KEY
	 * */
	public static final String CACHE_CONFIG_CONTEXT_PATH = "CACHE_CONFIG_PRECACHE_KEY";
	
	/**
	 * ����Map�е�Ԥ���ػ�������KEY
	 * */
	public static final String CONTEXT_PATH_CONFIG_KEY = "CONTEXT_PATH_CONFIG_KEY";
	/**
	 * ����Map�е�Ԥ���ػ�������������Ϣ��KEY
	 * */
	public static final String CACHE_CONFIG_PRELOAD_CONF_KEY = "CACHE_CONFIG_PRELOAD_CONF_KEY";
    
    /**
     * memcached�����ļ�
     * */
	public static final String CACHE_CONFIG_FILE = "conf/cache/cache-config.xml";
    
    /**
     * memcached������
     * */
	public static final String MEM_CLIENT_NAME = "mclient";
    
    /**
     * memcached���������Ч
     * */
	public static final int CACHEDATA_VALID_TRUE = 1;
    /**
     * memcached���������Ч
     * */
	public static final int CACHEDATA_VALID_FALSE = 0;
    /**
     * memcached��������������KEY
     * */
	public static final String KEY_CACHEDATA_DATA = "MEMCACHE_DATA";
    /**
     * memcached��������С���KEY
     * */
	public static final String KEY_CACHEDATA_SIZE = "MEMCACHE_SIZE";
    /**
     * memcached�������ʼʱ�����KEY
     * */
	public static final String KEY_CACHEDATA_STIME = "MEMCACHE_STIME";
    /**
     * memcached��������Ƿ���Ч���KEY
     * */
	public static final String KEY_CACHEDATA_VALID = "MEMCACHE_VALID";
    
    /**
     * memcached�������BEAN ID��KEY
     * */
    public static final String KEY_CACHEDATA_BEANID = "KEY_CACHEDATA_BEANID";
    
    /**
     * memcached������󷽷����KEY
     * */
    public static final String KEY_CACHEDATA_METHOD = "MEMCACHE_METHOD";
    
	/**
	 *  XML�����ļ���ϵͳ����ʱ�����������
	 * */
    public static final String KEY_CACHEDATA_DISCRIPTION = "description";
    
    /**
     * �������������KEY
     * */
    public static final String KEY_CACHEDATA_ARGS = "MEMCACHE_ARGS";
    
    /**
     * ��������Ӧbean��application name
     * */
    public static final String KEY_CACHEDATA_APPLICATION_NAME = "KEY_CACHEDATA_APPLICATION_NAME";
    
    /**
     * ���»������ͬʱ�������ݿ��bean ID
     * */
    public static final String KEY_CACHEDATA_UPDATEDB_BEANID = "KEY_CACHEDATA_UPDATEDB_BEANID";
    
    /**
     * ���»������ͬʱ�������ݿ��bean�ķ���
     * */
    public static final String KEY_CACHEDATA_UPDATEDB_METHOD = "KEY_CACHEDATA_UPDATEDB_METHOD";
    
    /**
     * ���»������ͬʱ�������ݿ��beanbean��application name
     * */
    public static final String KEY_CACHEDATA_UPDATEDB_APPLICATION_NAME = "KEY_CACHEDATA_UPDATEDB_APPLICATION_NAME";
    
    /**
     * ��������key��~�ָ�Ϊ����~���  ����ϵͳά�������KEY
     * */
    public static final String CACHE_OBJECT_DIF_REGION = "CACHE_OBJEC_DIF_REGION";
    
    /**
     * ��������key��~�ָ�Ϊ����~���  ����ϵͳά�������KEY
     * */
    public static final String CACHE_OBJECT_KEY_SEPARATOR = "~";
    
    /**
     * �����������(MEMCACHED���� �� MEMCACHED   �� EHMCACHE���� �� EHMCACHE  )
     * */
    public static final String KEY_CACHEDATA_TYPE = "KEY_CACHEDATA_TYPE";
    
    

	/**
	 *  XML�����ļ��л���������ʱ�����õ�KEY
	 * */
    public static final String MEMCACHE_CONFIG_EXPIRY_MINUTS = "cache-expiry-minuts";
	
	/**
	 *  XML�����ļ���ϵͳ����ʱ��������
	 * */
    public static final String MEMCACHE_PRE_CACHED_WEBAPP_CONTEXT = "context-cached-config";

	
	/**
	 *  XML�����ļ���ϵͳ����ʱ�������bean id
	 * */
    public static final String MEMCACHE_CONFIG_PRE_BEANID = "bean-id";
	
	/**
	 *  XML�����ļ���ϵͳ����ʱ������󷽷���
	 * */
    public static final String MEMCACHE_CONFIG_PRE_METHOD = "method";
    
	
	/**
	 *  XML�����ļ���ϵͳ����ʱ�������VO
	 * */
	public static final String MEMCACHE_CONFIG_CACHED_OBJECT_VO = "voclass";
	
	
	public static final String CACHE_TYPE_MEMCACHED = "MEMCACHED_MANAGER";
	
	public static final String CACHE_TYPE_EHCACHE = "EHCACHE_MAMANGER";
	
	public static final String CACHE_MEMCACHED_MANAGER_BEANID = "MemCacheManagerImpl";
	
	/**
	 * �����������  MEMCACHE
	 * */
	public final static String CACHE_TYPE_MEM = "MEMCACHE";
	/**
	 * �����������  EHCACHE
	 * */
	public final static String CACHE_TYPE_EH = "EHCACHE";

}
