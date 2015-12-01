package com.neusoft.tdframework.ria;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import com.neusoft.unieap.ria.IDataStore;
import com.neusoft.unieap.ria.exception.DataCenterException;
import com.neusoft.unieap.ria.impl.DataStore;

@SuppressWarnings("unchecked")
public class DataStoreToBean {

	private static JsonConfig jsonConfig = new JsonConfig();

	public static List createBeanList(IDataStore store) {
		List<JSONObject> data = ((DataStore) store).getRowDataObjs();
		String beanName = store.getRowSetName();
		List<Object> list = new ArrayList<Object>();
		try {
			Object vo = VOManager.getVO(beanName);
			for (int i = 0, l = data.size(); i < l; i++) {
				Object bean = JSONObject.toBean(data.get(i), vo, jsonConfig);
				list.add(bean);
			}
		} catch (Exception e) {
			throw new DataCenterException(e.getMessage());
		}
		return list;
	}

	public static List<Map> createMapList(IDataStore store) {
		return store.getRowDatas();
	}

}
