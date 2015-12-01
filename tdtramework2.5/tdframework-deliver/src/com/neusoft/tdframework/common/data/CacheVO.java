package com.neusoft.tdframework.common.data;

import java.io.Serializable;

import com.neusoft.tdframework.common.data.BaseVO;


/**
 * Title: �������
 * Description: 
 * Company: neusoft
 * Date: 2004-12-14
 * @author yang-lm@neusoft.com
 * @version 
 */
public class  CacheVO extends BaseVO implements Serializable{ 
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private	Object cacheObject;	         //�������
	private String freshTime = null;     //ˢ��ʱ��

	/**
		�յĹ��췽��
	*/
	public CacheVO (){

	}
	/**
		ͨ������ֵ����һ������
	*/
	public CacheVO (Object cacheObject){

	}
	/**
		ͨ��һ�����ж�����һ������
	*/
	public CacheVO (CacheVO other){
		if(this != other) {
			this.cacheObject = other.cacheObject;
            this.freshTime = other.freshTime;
		}
	}

	/**
	**	���û������
	*/
	public void setCacheObject(Object cacheObject) {
		this.cacheObject = cacheObject;
	}
	/**
	**	��ȡ�������
	*/
	public Object getCacheObject() {
		return (this.cacheObject);
	}
	/**
	**  ����ˢ��ʱ��
	*/
	public void setFreshTime(String freshTime) {
		this.freshTime = freshTime;
	}
	/**
	**	��ȡˢ��ʱ��
	*/
	public String getFreshTime() {
		return (this.freshTime);
	}

}