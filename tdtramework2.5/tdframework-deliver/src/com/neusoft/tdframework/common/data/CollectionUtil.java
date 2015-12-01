package com.neusoft.tdframework.common.data;

import java.util.HashMap;
import java.util.Map;

public class CollectionUtil {
	public static Map paramObjectCollectionToMap(ParamObjectCollection pcoll){
		Map reMap=new HashMap();
		for (int i=0;i<pcoll.getRowCount();i++){
			ParamObject po=pcoll.getParamObjectByIndex(i);
			reMap.put(po.getId(), po.getName());
		}
		return reMap;
	}
}
