package com.neusoft.tdframework.memcache;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import org.jdom.*;
import org.jdom.input.*;

import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.log.SysLog;

public class MemCacheUtil {

	
	/**
	 * 从xml配置文件中取得缓存过期时间，以分钟为单位
	 * @return int 缓存过期时间(分钟)
	 * */
	public static int getCacheExpiryMinuts(String fileClassPath) {
		String methodName = "getCacheExpiryMinuts()";
		SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");
		int returnVlue = 0;
    	InputStream in =  null;
    	
    	try {
    	
			SAXBuilder builder = new SAXBuilder(false);
			
			ClassLoader loader = Thread.currentThread().getContextClassLoader();
			in = loader.getResourceAsStream(fileClassPath);
			
			Document doc = builder.build(in);

			List ls = doc.getRootElement().getChildren(CacheManagerConst.MEMCACHE_CONFIG_EXPIRY_MINUTS);
			
			if (ls != null) {
				returnVlue = Integer.valueOf(((Element)ls.get(0)).getText());
			}
		 
    	} catch (Exception ex) {
    		//ex.printStackTrace();
    		//SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.ERROR, "MemCacheUtil-getCacheExpiryMinuts:缓存配置文件读取错误或设置不正确。");
    	} finally {
    		try {
    			if (in != null) {
    				in.close();
    			}
    		} catch (Exception e) {
    			//e.printStackTrace();
    			//SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.ERROR, e.getMessage());
    		}
    		SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": end");
    	}
    	return returnVlue;
	}
	
	/**
	 * 从xml配置文件中取得上下文路径的配置
	 * @return String[][] {{context,configFileClassPath},{context,configFileClassPath}......}
	 * */
	public static String[][] getPreCacheObjectsConfig() throws Exception {
		String methodName = "getPreCacheObjectsConfig()";
		SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");

    	InputStream in =  null;
    	
    	//HashMap<String, String> preCacheHash = new HashMap<String, String>();
    	String[][] returnStringarr = null;
    	try {
    	
			SAXBuilder builder = new SAXBuilder(false);
			
			ClassLoader loader = Thread.currentThread().getContextClassLoader();
			in = loader.getResourceAsStream(CacheManagerConst.CACHE_CONFIG_FILE);
			
			Document doc = builder.build(in);

			List ls = doc.getRootElement().getChildren(CacheManagerConst.MEMCACHE_PRE_CACHED_WEBAPP_CONTEXT);
			
			if (ls != null && ls.size() > 0) {
				returnStringarr = new String[ls.size()][2];
				
				int lsCount = 0;
				for (Element webappEle : (List<Element>)ls) {
					
					returnStringarr[lsCount][0] = webappEle.getAttribute("context-path").getValue();
					returnStringarr[lsCount][1] = webappEle.getAttribute("cache-config-classpath").getValue();
					
					lsCount++;
				}
			}
		 
    	} catch (Exception ex) {
    		//ex.printStackTrace();
    		SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.ERROR, "MemCacheUtil-getPreCacheObjectsConfig:缓存配置文件读取错误或设置不正确。");
    		throw ex;
    	} finally {
    		try {
    			if (in != null) {
    				in.close();
    			}
    		} catch (Exception e) {
    			e.printStackTrace();
    			SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.ERROR, e.getMessage());
    			throw e;
    		}
    		SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": end");
    	}
    	return returnStringarr;
	}
	
    /**
     * 取得系统启动时需要预加载缓存对象的配置
     * @return List ({String[][]{{applicationName, beanId, method, updateApplicationName, updateBeanid, updateMethod, beanClassName, xmlKey}})
     * */
    public static List<String[][]> getPreCachedBeans(String beanConfigClassPath) throws Exception {
		String methodName = "getPreCachedBeans()";
		SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");

    	InputStream in =  null;
    	List<String[][]> beanConfigArr = new ArrayList<String[][]>();
    	try {
    	
			SAXBuilder builder = new SAXBuilder(false);
			
			ClassLoader loader = Thread.currentThread().getContextClassLoader();
			in = loader.getResourceAsStream(beanConfigClassPath);
			
			Document doc = builder.build(in);

			List<Element> ls = (List<Element>)doc.getRootElement().getChildren("preloadcache-bean-model");
			
			if (ls != null && ls.size() > 0) {
				
				int lsCount = 0;
				for (Element webappEle : ls) {
					List<Element> lsBean = (List<Element>)webappEle.getChildren("preloadcache-bean");
					
					if (lsBean != null && lsBean.size() > 0) {
						
						String[][] returnStringarr = new String[lsBean.size()][10];
						
						int lsBeanCount = 0;
						for (Element bean : lsBean) {
							List<Element> updateBean = (List<Element>)bean.getChildren("preloadcache-updatedb-bean");
							returnStringarr[lsBeanCount][0] = webappEle.getAttribute("application-name").getValue();
							returnStringarr[lsBeanCount][1] = bean.getAttribute("id").getValue();
							returnStringarr[lsBeanCount][2] = bean.getAttribute("method").getValue();
							
							if (updateBean != null && updateBean.size() == 1) {
							    returnStringarr[lsBeanCount][3] = updateBean.get(0).getAttribute("application-name").getValue();
							    returnStringarr[lsBeanCount][4] = updateBean.get(0).getAttribute("bean-id").getValue();
							    returnStringarr[lsBeanCount][5] = updateBean.get(0).getAttribute("method").getValue();
							} else {
								returnStringarr[lsBeanCount][3] = "";
							    returnStringarr[lsBeanCount][4] = "";
							    returnStringarr[lsBeanCount][5] = "";
							}
							returnStringarr[lsBeanCount][6] = "";
							
							if (bean.getAttribute("key") != null) {
							    returnStringarr[lsBeanCount][7] = bean.getAttribute("key").getValue();
							} else {
								returnStringarr[lsBeanCount][7] = "";
							}
							
							if (bean.getAttribute("cachetype") != null) {
							    returnStringarr[lsBeanCount][8] = bean.getAttribute("cachetype").getValue();
							} else {
								returnStringarr[lsBeanCount][8] = "e";
							}
							
							if (bean.getAttribute("desc") != null) {
							    returnStringarr[lsBeanCount][9] = bean.getAttribute("desc").getValue();
							} else {
								returnStringarr[lsBeanCount][9] = "";
							}
							
							
							lsBeanCount++;
						}
						beanConfigArr.add(returnStringarr);
						lsCount++;
					}
				}
			}
		 
    	} catch (Exception ex) {
    		//ex.printStackTrace();
    		SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.ERROR, "MemCacheUtil-getPreCachedBeans:缓存配置文件读取错误或设置不正确。");
    		throw ex;
    	} finally {
    		try {
    			if (in != null) {
    				in.close();
    			}
    		} catch (Exception e) {
    			e.printStackTrace();
    			SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.ERROR, e.getMessage());
    			throw e;
    		}
    		SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": end");
    	}
    	return beanConfigArr;
    }
    
    /**
     * 取得系统启动时缓存对象的KEY
     * @return List {key1,key2,key3......}
     * */
    public static List<String> getPreCachedKeys() throws Exception {
    	String methodName = "getPreCachedKeys";
        SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");
        
        List<String> returnArrayList = new ArrayList<String>();
        
        String[][] preCachedConfig = getPreCacheObjectsConfig();
        for(String[] pres : preCachedConfig) {
        	returnArrayList.add(pres[0]);
        }
        
        SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": end");
        return returnArrayList;
    }
    
    
	/**
	 * 从xml配置文件中取得不同war包的上下文路径 以及说明,显示查询条件的下拉框用
	 * @return String[][] {{contextPaht,discription},{contextPaht,discription}......}
	 * */
	public static String[][] getContextPathConfig() throws Exception {
		String methodName = "getContextConfig()";
		SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");

    	InputStream in =  null;
    	
    	//HashMap<String, String> preCacheHash = new HashMap<String, String>();
    	String[][] returnStringarr = null;
    	try {
    	
			SAXBuilder builder = new SAXBuilder(false);
			
			ClassLoader loader = Thread.currentThread().getContextClassLoader();
			in = loader.getResourceAsStream(CacheManagerConst.CACHE_CONFIG_FILE);
			
			Document doc = builder.build(in);

			List ls = doc.getRootElement().getChildren("context-path-config");
			
			if (ls != null && ls.size() > 0) {
				returnStringarr = new String[ls.size()][2];
				
				int lsCount = 0;
				for (Element webappEle : (List<Element>)ls) {
					
					returnStringarr[lsCount][0] = webappEle.getAttribute("path").getValue();
					returnStringarr[lsCount][1] = webappEle.getAttribute("discription").getValue();
					lsCount++;
					
				}
			}
		 
    	} catch (Exception ex) {
    		//ex.printStackTrace();
    		SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.ERROR, "MemCacheUtil-getContextPathConfig:缓存配置文件读取错误或设置不正确。");
    		throw ex;
    	} finally {
    		try {
    			if (in != null) {
    				in.close();
    			}
    		} catch (Exception e) {
    			e.printStackTrace();
    			SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.ERROR, e.getMessage());
    			throw e;
    		}
    		SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": end");
    	}
    	return returnStringarr;
	}


}
