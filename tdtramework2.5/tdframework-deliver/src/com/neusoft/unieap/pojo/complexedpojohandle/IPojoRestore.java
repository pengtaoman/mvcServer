package com.neusoft.unieap.pojo.complexedpojohandle;

import java.util.List;

import com.neusoft.unieap.ria.IDataStore;

public interface IPojoRestore {

	/**
	 * 
	 * 给定datastores返回复杂对象
	 * */
	public<T> List<T>  restore  (List<IDataStore> list,Class<T> cls);
	
	

	

}
