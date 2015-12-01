package com.neusoft.tdframework.ria;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import com.neusoft.tdframework.authorization.AuthorizeVO;
import com.neusoft.unieap.ria.IDataCenter;
import com.neusoft.unieap.ria.IDataStore;
import com.neusoft.unieap.ria.pojo.util.PojoUtil;

@SuppressWarnings("unchecked")
public class RiaTransWrapperImpl implements RiaTransWrapper {

	private static final long serialVersionUID = 1L;

	private AuthorizeVO authorizeVO;

	private IDataCenter dataCenter;

	private final int firstIndex = 0;

	public AuthorizeVO getAuthorizeVO() {

		return this.authorizeVO;
	}

	public IDataCenter getDataCenter() {

		return this.dataCenter;
	}

	public void setAuthorizeVO(AuthorizeVO authorizeVO) {
		this.authorizeVO = authorizeVO;
	}

	public void setDataCenter(IDataCenter dataCenter) {
		this.dataCenter = dataCenter;
	}

	public void setCode(long code) {
		dataCenter.setCode(code);
	}

	public void setTitle(String title) {
		dataCenter.setTitle(title);
	}

	public void setDetail(String detail) {
		dataCenter.setDetail(detail);
	}

	public void addDataStore(Object object, String storeName) {
		List<Object> list = new ArrayList<Object>();
		list.add(object);
		IDataStore createDataStore = PojoUtil.createDataStore(storeName, list);
		createDataStore.setRowSetName(VOManager.getName(object));
		dataCenter.addDataStore(createDataStore);
	}

	public void addDataStore(List list, String storeName) {
		IDataStore createDataStore = PojoUtil.createDataStore(storeName, list);
		if (list != null && list.size() > 0) {
			createDataStore.setRowSetName(VOManager.getName(list.get(firstIndex)));
		}
		dataCenter.addDataStore(createDataStore);
	}

	public Map getDataStoreFirstMap(String storeName) {
		List<Map> list = DataStoreToBean.createMapList(dataCenter.getDataStore(storeName));
		return list.get(firstIndex);
	}

	public Map getDataStoreFirstMap() {
		List<IDataStore> dataStores = dataCenter.getDataStores();
		IDataStore datatStore = dataStores.get(firstIndex);
		List<Map> list = DataStoreToBean.createMapList(datatStore);
		return list.get(firstIndex);
	}

	public List<Map> getDataStoreMapList(String storeName) {
		List<Map> list = DataStoreToBean.createMapList(dataCenter.getDataStore(storeName));
		return list;
	}

	public List<Map> getDataStoreMapList() {
		List<IDataStore> dataStores = dataCenter.getDataStores();
		IDataStore datatStore = dataStores.get(firstIndex);
		List<Map> list = DataStoreToBean.createMapList(datatStore);
		return list;
	}

	public Object getDataStoreFirstObject(String storeName) {
		List list = DataStoreToBean.createBeanList(dataCenter.getDataStore(storeName));
		return list.get(firstIndex);
	}

	public Object getDataStoreFirstObject() {
		List<IDataStore> dataStores = dataCenter.getDataStores();
		IDataStore datatStore = dataStores.get(firstIndex);
		List list = DataStoreToBean.createBeanList(datatStore);
		return list.get(firstIndex);
	}

	public List getDataStoreObjectList(String storeName) {
		List list = DataStoreToBean.createBeanList(dataCenter.getDataStore(storeName));
		return list;
	}

	public List getDataStoreObjectList() {
		List<IDataStore> dataStores = dataCenter.getDataStores();
		IDataStore datatStore = dataStores.get(firstIndex);
		List list = DataStoreToBean.createBeanList(datatStore);
		return list;
	}

}
