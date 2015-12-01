package com.neusoft.tdframework.memcache;

import java.io.Serializable;

public class CacheManagerProxyArg {
	
	/**
	 * 缓存对象的KEY
	 * */
	private String cacheKey;
	
	/**
	 * 缓存对象的本体
	 * */
	private Object cacheObject;
	
	/**
	 * 缓存对象时使用的beanID
	 * */
	private String beanId;
	
	/**
	 * 缓存对象使用的方法
	 * */
	private String beanMethodName;
	
	/**
	 * 缓存对象使用的bean的application name
	 * */
	private String applicationName;
	
	/**
	 * 缓存对像描述
	 * */
	private String description;
	
	/**
	 * 缓存对象使用的方法的参数
	 * */
	private Serializable[] beanMethodArgs;
	
	/**
	 * 更新缓存对象同时更新数据库的beanID
	 * */
	private String updateDBBeanID;
	
	/**
	 * 更新缓存对象同时更新数据库的方法
	 * */
	private String updateDBBeanMethodName;
	
	/**
	 * 更新缓存对象同时更新数据库的application name
	 * */
	private String updateDBApplicationName;

	
	/**缓存对象的KEY
	 * @return 缓存对象的KEY
	 */
	public String getCacheKey() {
		return cacheKey;
	}

	/**缓存对象的本体
	 * @return 缓存对象的本体
	 */
	public Object getCacheObject() {
		return cacheObject;
	}

	/**缓存对象时使用的beanID
	 * @return 缓存对象时使用的beanID
	 */
	public String getBeanId() {
		return beanId;
	}

	/**缓存对象使用的方法
	 * @return 缓存对象使用的方法
	 */
	public String getBeanMethodName() {
		return beanMethodName;
	}

	/**缓存对象使用的bean的application name
	 * @return 缓存对象使用的bean的application name
	 */
	public String getApplicationName() {
		return applicationName;
	}

	/**缓存对像描述
	 * @return 缓存对像描述
	 */
	public String getDescription() {
		return description;
	}

	/**缓存对象使用的方法的参数
	 * @return 缓存对象使用的方法的参数
	 */
	public Serializable[] getBeanMethodArgs() {
		return beanMethodArgs;
	}

	/**更新缓存对象同时更新数据库的beanID
	 * @return the updateDBBeanID
	 */
	public String getUpdateDBBeanID() {
		return updateDBBeanID;
	}

	/**更新缓存对象同时更新数据库的方法
	 * @return the updateDBBeanMethodName
	 */
	public String getUpdateDBBeanMethodName() {
		return updateDBBeanMethodName;
	}

	/**更新缓存对象同时更新数据库的的bean的application name
	 * @return the updateDBApplicationName
	 */
	public String getUpdateDBApplicationName() {
		return updateDBApplicationName;
	}

	/**
	 * 设置缓存对象的KEY
	 * @param cacheKey 缓存对象的KEY
	 */
	public void setCacheKey(String cacheKey) {
		this.cacheKey = cacheKey;
	}

	/**设置缓存对象的本体
	 * @param cacheObject 缓存对象的本体
	 */
	public void setCacheObject(Object cacheObject) {
		this.cacheObject = cacheObject;
	}

	/**设置缓存对象时使用的beanID
	 * @param beanId 缓存对象时使用的beanID
	 */
	public void setBeanId(String beanId) {
		this.beanId = beanId;
	}

	/**
	 * 设置缓存对象使用的方法
	 * @param beanMethodName 缓存对象使用的方法
	 */
	public void setBeanMethodName(String beanMethodName) {
		this.beanMethodName = beanMethodName;
	}

	/**
	 * 设置缓存对象使用的bean的application name
	 * @param applicationName 缓存对象使用的bean的application name
	 */
	public void setApplicationName(String applicationName) {
		this.applicationName = applicationName;
	}

	/**
	 * 设置缓存对像描述
	 * @param description 缓存对像描述
	 */
	public void setDescription(String description) {
		this.description = description;
	}

	/**
	 * 设置缓存对象使用的方法的参数
	 * @param beanMethodArgs 缓存对象使用的方法的参数
	 */
	public void setBeanMethodArgs(Serializable[] beanMethodArgs) {
		this.beanMethodArgs = beanMethodArgs;
	}

	/**
	 * 设置更新缓存对象同时更新数据库的beanID
	 * @param updateDBBeanID 更新缓存对象同时更新数据库的的beanID
	 */
	public void setUpdateDBBeanID(String updateDBBeanID) {
		this.updateDBBeanID = updateDBBeanID;
	}

	/**
	 * 设置更新缓存对象同时更新数据库的bean的方法
	 * @param updateDBBeanMethodName 更新缓存对象同时更新数据库的的bean的方法
	 */
	public void setUpdateDBBeanMethodName(String updateDBBeanMethodName) {
		this.updateDBBeanMethodName = updateDBBeanMethodName;
	}

	/**
	 * 设置更新缓存对象同时更新数据库的bean的application name
	 * @param updateDBApplicationName 更新缓存对象同时更新数据库的的bean的application name
	 */
	public void setUpdateDBApplicationName(String updateDBApplicationName) {
		this.updateDBApplicationName = updateDBApplicationName;
	}

}
