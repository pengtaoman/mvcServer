package com.neusoft.tdframework.ria;

import com.neusoft.tdframework.authorization.AuthorizeVO;
import com.neusoft.unieap.ria.IDataCenter;
import java.util.List;
import java.util.Map;

/**
 * Ria��װ���� ��dataCentre��AuthorizeVO���з�װ������װ���󴫸�BO����ʵ��dataCenter��BO�ķ����Ч����
 * ���ṩ��װ�ķ���ֱ�Ӵ�dataCenter�е�����ֱ����ȡ���� 
 * @version 0.5 ������Ҫ������ӷ���,������Ҫ��Ϊ����,ȱ���쳣����
 */
public interface RiaTransWrapper extends java.io.Serializable {

	public IDataCenter getDataCenter();

	public AuthorizeVO getAuthorizeVO();

	/**
	 * ����dataCenter.setCode
	 * 
	 * @param code
	 */
	public void setCode(long code);

	/**
	 * ����dataCenter.setTitle
	 * 
	 * @param title
	 */
	public void setTitle(String title);

	/**
	 * ����dataCenter.setDetail
	 * 
	 * @param detail
	 */
	public void setDetail(String detail);

	/**
	 * ����������dataStore���ݸ�dataCenter
	 * 
	 * @param object
	 * @param storeName
	 */
	public void addDataStore(Object object, String storeName);

	/**
	 * �������б�����dataStore���ݸ�dataCenter
	 * 
	 * @param list
	 * @param storeName
	 */
	public void addDataStore(List list, String storeName);

	/**
	 * �������ֻ�ȡDataStore��Ӧ�Ķ����б�ĵ�һ������
	 * 
	 * @param storeName
	 * @return
	 */
	public Object getDataStoreFirstObject(String storeName);

	/**
	 * ��ȡ��һ��DataStore��Ӧ�Ķ����б�ĵ�һ������
	 * 
	 * @return
	 */
	public Object getDataStoreFirstObject();

	/**
	 * �������ֻ�ȡDataStore��Ӧ�Ķ����б�
	 * 
	 * @param storeName
	 * @return
	 */
	public List getDataStoreObjectList(String storeName);

	/**
	 * ��ȡ��һ��DataStore��Ӧ�Ķ����б�
	 * 
	 * @return
	 */
	public List getDataStoreObjectList();

	/**
	 * �������ֻ�ȡDataStore��Ӧ�ĵ�һ�������Ӧ��Map
	 * 
	 * @param storeName
	 * @return
	 */
	public Map getDataStoreFirstMap(String storeName);

	/**
	 * �������ֻ�ȡDataStore��Ӧ�ĵ�List<Map>
	 * 
	 * @param storeName
	 * @return
	 */
	public List<Map> getDataStoreMapList(String storeName);

	/**
	 * ��ȡ��һ��DataStore��Ӧ�ĵ�һ�������Ӧ��List<Map>
	 * 
	 * @return
	 */
	public Map getDataStoreFirstMap();

	/**
	 * ��ȡ��һ��DataStore��Ӧ��List<Map>
	 * 
	 * @return
	 */
	public List<Map> getDataStoreMapList();
}
