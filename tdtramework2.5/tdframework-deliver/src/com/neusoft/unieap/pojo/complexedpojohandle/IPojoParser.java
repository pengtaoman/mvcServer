package com.neusoft.unieap.pojo.complexedpojohandle;

import java.util.List;

import com.neusoft.unieap.pojo.complexedpojohandle.impl.annotation.PojoParserClassAnnotation;
import com.neusoft.unieap.pojo.complexedpojohandle.impl.annotation.PojoParserComplexPropertyAnnotation;
import com.neusoft.unieap.ria.IDataCenter;
import com.neusoft.unieap.ria.IDataStore;


public interface IPojoParser {
	
	/**
	 * 给定Pojos返回期所有stores
	 * */
	public<T>  List<IDataStore>  parser(List<T> objs, Class<T> objcls);

	

}
