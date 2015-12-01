package com.neusoft.tdframework.ria;

import com.neusoft.tdframework.authorization.AuthorizeVO;
import com.neusoft.unieap.ria.IDataCenter;
import java.util.List;
import java.util.Map;

/**
 * Ria封装对象 将dataCentre和AuthorizeVO进行封装，将包装对象传给BO，并实现dataCenter和BO的分离的效果，
 * 其提供封装的方法直接从dataCenter中的数据直接提取对象。 
 * @version 0.5 根据需要向内添加方法,根据需要改为泛型,缺少异常处理
 */
public interface RiaTransWrapper extends java.io.Serializable {

	public IDataCenter getDataCenter();

	public AuthorizeVO getAuthorizeVO();

	/**
	 * 调用dataCenter.setCode
	 * 
	 * @param code
	 */
	public void setCode(long code);

	/**
	 * 调用dataCenter.setTitle
	 * 
	 * @param title
	 */
	public void setTitle(String title);

	/**
	 * 调用dataCenter.setDetail
	 * 
	 * @param detail
	 */
	public void setDetail(String detail);

	/**
	 * 将对象生成dataStore传递给dataCenter
	 * 
	 * @param object
	 * @param storeName
	 */
	public void addDataStore(Object object, String storeName);

	/**
	 * 将对象列表生成dataStore传递给dataCenter
	 * 
	 * @param list
	 * @param storeName
	 */
	public void addDataStore(List list, String storeName);

	/**
	 * 根据名字获取DataStore对应的对象列表的第一个对象
	 * 
	 * @param storeName
	 * @return
	 */
	public Object getDataStoreFirstObject(String storeName);

	/**
	 * 获取第一个DataStore对应的对象列表的第一个对象
	 * 
	 * @return
	 */
	public Object getDataStoreFirstObject();

	/**
	 * 根据名字获取DataStore对应的对象列表
	 * 
	 * @param storeName
	 * @return
	 */
	public List getDataStoreObjectList(String storeName);

	/**
	 * 获取第一个DataStore对应的对象列表
	 * 
	 * @return
	 */
	public List getDataStoreObjectList();

	/**
	 * 根据名字获取DataStore对应的第一个对象对应的Map
	 * 
	 * @param storeName
	 * @return
	 */
	public Map getDataStoreFirstMap(String storeName);

	/**
	 * 根据名字获取DataStore对应的的List<Map>
	 * 
	 * @param storeName
	 * @return
	 */
	public List<Map> getDataStoreMapList(String storeName);

	/**
	 * 获取第一个DataStore对应的第一个对象对应的List<Map>
	 * 
	 * @return
	 */
	public Map getDataStoreFirstMap();

	/**
	 * 获取第一个DataStore对应的List<Map>
	 * 
	 * @return
	 */
	public List<Map> getDataStoreMapList();
}
