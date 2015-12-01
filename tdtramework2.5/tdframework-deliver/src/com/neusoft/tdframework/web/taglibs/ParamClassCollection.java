package com.neusoft.tdframework.web.taglibs;

import com.neusoft.tdframework.common.data.ObjectCollection;

/** 静态数据定义类的结果集
  * <p>Title: ParamClassCollection </p>
  * <p>Description: </p>
  		是参数维护实体的结果集.
  * <p>Copyright: Copyright (c) 2002.12.29</p>
  * <p>Company: neusoft</p>
  * 
  * @author Chenzt
  * @version 1.0 
*/

public class ParamClassCollection extends ObjectCollection{
	
	/**
		添加一个对象.
	*/
	public void addParamClass(ParamClass paramClass){
		this.addElement(paramClass);
		this.addElement(new Long(paramClass.getParam_id()),paramClass);
	}
	
	/**
		根据行号获取对象
	*/
	public ParamClass getParamClass(int index){
		return (ParamClass)this.getElement(index);	
	}
	
	/**
		根据ID号获取对象.
	*/
	public ParamClass getParamClassById(int id){
		return (ParamClass)this.getElement(new Long(id));	
	}
	
}