package com.neusoft.tdframework.common.data;

import java.io.Serializable;

import com.neusoft.tdframework.common.data.BaseVO;


/**
 * Title: 缓存对象
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
	private	Object cacheObject;	         //缓存对象
	private String freshTime = null;     //刷新时间

	/**
		空的构造方法
	*/
	public CacheVO (){

	}
	/**
		通过属性值构造一个对象
	*/
	public CacheVO (Object cacheObject){

	}
	/**
		通过一个已有对象构造一个对象
	*/
	public CacheVO (CacheVO other){
		if(this != other) {
			this.cacheObject = other.cacheObject;
            this.freshTime = other.freshTime;
		}
	}

	/**
	**	设置缓存对象
	*/
	public void setCacheObject(Object cacheObject) {
		this.cacheObject = cacheObject;
	}
	/**
	**	获取缓存对象
	*/
	public Object getCacheObject() {
		return (this.cacheObject);
	}
	/**
	**  设置刷新时间
	*/
	public void setFreshTime(String freshTime) {
		this.freshTime = freshTime;
	}
	/**
	**	获取刷新时间
	*/
	public String getFreshTime() {
		return (this.freshTime);
	}

}