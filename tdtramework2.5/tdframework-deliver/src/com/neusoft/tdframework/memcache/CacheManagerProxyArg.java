package com.neusoft.tdframework.memcache;

import java.io.Serializable;

public class CacheManagerProxyArg {
	
	/**
	 * ��������KEY
	 * */
	private String cacheKey;
	
	/**
	 * �������ı���
	 * */
	private Object cacheObject;
	
	/**
	 * �������ʱʹ�õ�beanID
	 * */
	private String beanId;
	
	/**
	 * �������ʹ�õķ���
	 * */
	private String beanMethodName;
	
	/**
	 * �������ʹ�õ�bean��application name
	 * */
	private String applicationName;
	
	/**
	 * �����������
	 * */
	private String description;
	
	/**
	 * �������ʹ�õķ����Ĳ���
	 * */
	private Serializable[] beanMethodArgs;
	
	/**
	 * ���»������ͬʱ�������ݿ��beanID
	 * */
	private String updateDBBeanID;
	
	/**
	 * ���»������ͬʱ�������ݿ�ķ���
	 * */
	private String updateDBBeanMethodName;
	
	/**
	 * ���»������ͬʱ�������ݿ��application name
	 * */
	private String updateDBApplicationName;

	
	/**��������KEY
	 * @return ��������KEY
	 */
	public String getCacheKey() {
		return cacheKey;
	}

	/**�������ı���
	 * @return �������ı���
	 */
	public Object getCacheObject() {
		return cacheObject;
	}

	/**�������ʱʹ�õ�beanID
	 * @return �������ʱʹ�õ�beanID
	 */
	public String getBeanId() {
		return beanId;
	}

	/**�������ʹ�õķ���
	 * @return �������ʹ�õķ���
	 */
	public String getBeanMethodName() {
		return beanMethodName;
	}

	/**�������ʹ�õ�bean��application name
	 * @return �������ʹ�õ�bean��application name
	 */
	public String getApplicationName() {
		return applicationName;
	}

	/**�����������
	 * @return �����������
	 */
	public String getDescription() {
		return description;
	}

	/**�������ʹ�õķ����Ĳ���
	 * @return �������ʹ�õķ����Ĳ���
	 */
	public Serializable[] getBeanMethodArgs() {
		return beanMethodArgs;
	}

	/**���»������ͬʱ�������ݿ��beanID
	 * @return the updateDBBeanID
	 */
	public String getUpdateDBBeanID() {
		return updateDBBeanID;
	}

	/**���»������ͬʱ�������ݿ�ķ���
	 * @return the updateDBBeanMethodName
	 */
	public String getUpdateDBBeanMethodName() {
		return updateDBBeanMethodName;
	}

	/**���»������ͬʱ�������ݿ�ĵ�bean��application name
	 * @return the updateDBApplicationName
	 */
	public String getUpdateDBApplicationName() {
		return updateDBApplicationName;
	}

	/**
	 * ���û�������KEY
	 * @param cacheKey ��������KEY
	 */
	public void setCacheKey(String cacheKey) {
		this.cacheKey = cacheKey;
	}

	/**���û������ı���
	 * @param cacheObject �������ı���
	 */
	public void setCacheObject(Object cacheObject) {
		this.cacheObject = cacheObject;
	}

	/**���û������ʱʹ�õ�beanID
	 * @param beanId �������ʱʹ�õ�beanID
	 */
	public void setBeanId(String beanId) {
		this.beanId = beanId;
	}

	/**
	 * ���û������ʹ�õķ���
	 * @param beanMethodName �������ʹ�õķ���
	 */
	public void setBeanMethodName(String beanMethodName) {
		this.beanMethodName = beanMethodName;
	}

	/**
	 * ���û������ʹ�õ�bean��application name
	 * @param applicationName �������ʹ�õ�bean��application name
	 */
	public void setApplicationName(String applicationName) {
		this.applicationName = applicationName;
	}

	/**
	 * ���û����������
	 * @param description �����������
	 */
	public void setDescription(String description) {
		this.description = description;
	}

	/**
	 * ���û������ʹ�õķ����Ĳ���
	 * @param beanMethodArgs �������ʹ�õķ����Ĳ���
	 */
	public void setBeanMethodArgs(Serializable[] beanMethodArgs) {
		this.beanMethodArgs = beanMethodArgs;
	}

	/**
	 * ���ø��»������ͬʱ�������ݿ��beanID
	 * @param updateDBBeanID ���»������ͬʱ�������ݿ�ĵ�beanID
	 */
	public void setUpdateDBBeanID(String updateDBBeanID) {
		this.updateDBBeanID = updateDBBeanID;
	}

	/**
	 * ���ø��»������ͬʱ�������ݿ��bean�ķ���
	 * @param updateDBBeanMethodName ���»������ͬʱ�������ݿ�ĵ�bean�ķ���
	 */
	public void setUpdateDBBeanMethodName(String updateDBBeanMethodName) {
		this.updateDBBeanMethodName = updateDBBeanMethodName;
	}

	/**
	 * ���ø��»������ͬʱ�������ݿ��bean��application name
	 * @param updateDBApplicationName ���»������ͬʱ�������ݿ�ĵ�bean��application name
	 */
	public void setUpdateDBApplicationName(String updateDBApplicationName) {
		this.updateDBApplicationName = updateDBApplicationName;
	}

}
