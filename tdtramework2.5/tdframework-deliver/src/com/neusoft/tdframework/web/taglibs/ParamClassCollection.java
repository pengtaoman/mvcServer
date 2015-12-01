package com.neusoft.tdframework.web.taglibs;

import com.neusoft.tdframework.common.data.ObjectCollection;

/** ��̬���ݶ�����Ľ����
  * <p>Title: ParamClassCollection </p>
  * <p>Description: </p>
  		�ǲ���ά��ʵ��Ľ����.
  * <p>Copyright: Copyright (c) 2002.12.29</p>
  * <p>Company: neusoft</p>
  * 
  * @author Chenzt
  * @version 1.0 
*/

public class ParamClassCollection extends ObjectCollection{
	
	/**
		���һ������.
	*/
	public void addParamClass(ParamClass paramClass){
		this.addElement(paramClass);
		this.addElement(new Long(paramClass.getParam_id()),paramClass);
	}
	
	/**
		�����кŻ�ȡ����
	*/
	public ParamClass getParamClass(int index){
		return (ParamClass)this.getElement(index);	
	}
	
	/**
		����ID�Ż�ȡ����.
	*/
	public ParamClass getParamClassById(int id){
		return (ParamClass)this.getElement(new Long(id));	
	}
	
}