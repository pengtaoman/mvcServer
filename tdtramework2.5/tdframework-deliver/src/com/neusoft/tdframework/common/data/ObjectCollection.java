/*
 * Created on 2004-10-14
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.tdframework.common.data;

/** 自定义结果集
  * <p>Title: ObjectCollection </p>
  * <p>Description: 封装自定义结果。</p>
  * <p>Copyright: Copyright (c) 2002</p>
  * <p>Company: neusoft</p>
  * 
  * @author liyj from old framework
  * @version 1.0 
  
  封装自定义结果集：
  正常无key键加入的对象保存在ArrayList里。
  有key键加入的对象保存在Hashtable里。
  通过getRowCount的对象个数为ArrayList的大小。
  
  封装后对象可以保存顺序排好的对象，也可以保存三乱的MAP对象。
  但通常最好不要同时封装两种对象，增大内存的负担。
  对于一些小表数据，为了实现主键查找，避免嵌套循环遍历可以同时封装两种类型的对象。
  
  应用上通常做为对象结果集的父类出现。
*/

import java.io.Serializable;
import java.util.*;

public class ObjectCollection {
	private List list = new ArrayList();
	private Map map = new HashMap();

		
	/** 
	 * 在结果集中添加.
	 * 数据在ArrayList内保存
	 */
	public void addElement(Object element){
		list.add(element);
	}

	/** 
	 * 在结果集中添加.
	 * 数据在ArrayList内保存
	 */
	public void addElement(int indx, Object element){
		list.add(indx,element);
	}
	
	/** 
	 * 在结果集中添加.
	 */
	public void addElement(Object key, Object element){
		map.put(key,element);
	}
	
	/** 
	 * 从结果集中移出
	 */
	public Object removeElement(int indexs){
		return list.remove(indexs);
	}
	
	/** 
	 * 从结果集中移出 
	 */
	public Object removeElement(Object key){	
		return map.remove(key);
	}
	
	/**
	 * 从结果集中清除全部数据对象
	 */
	public void removeElement(){
		this.list = new ArrayList();
		this.map = new HashMap();
	}
		
	/** 
	 * 根据行号从结果集中获取数据.
	 */
	public Object getElement(int index){
		if (index>=list.size() || index<0) {
			return null;
		}
		return list.get(index);
	}

	/** 
	 * 根据行号从结果集中获取数据.
	 */
	public Object getElement(Object key){
		return map.get(key);
	}
	
	/** 
	 * 获取结果集行数的函数. 
	 */
	public int getRowCount(){
		return list.size();
	}
	
	/**
	 * 获取结果集中hashtable对象的size
	 */
	public int getHashCount(){
		return map.size();
	}

	/**
	 * 内置lists对象保存对象列表
	 */
	public List getList() {
		return list;
	}

	/**
	 * 直接设置List对象
	 */
	public void setList(List list) {
		if (list==null) {
			this.list=new ArrayList();
		} else {
			this.list = list;
		}
	}
	public Map getMap() {
		return map;
	}
	

	public void setMap(Map map) {
		this.map = map;
	}

}
