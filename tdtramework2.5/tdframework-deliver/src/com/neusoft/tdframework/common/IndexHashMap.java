package com.neusoft.tdframework.common;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * @author κ�Ӿ�  build 2006-08-18
 *	˳�����е�HashMap
 *	get(int idx)/remove(int idx) Ϊ������hashMap��˳���(index) ��ȡ��/ɾ�� ����
 */
public class IndexHashMap extends HashMap {

	private static final long serialVersionUID = -5156437706039907818L;

	private List list=new ArrayList();
	

	public Object put(Object key, Object value) {
		if (!containsKey(key)){
			list.add(key);
		}
		return super.put(key, value);
	}

	
	public Object get(int idx){
		return super.get(getKey(idx));
	}
	public int getIndex(Object key){
		return list.indexOf(key);
	}
	public Object getKey(int idx){
		if (idx>=list.size()) return null;
		return list.get(idx);
	}
	
	public void remove(int idx){
		Object key=getKey(idx);
		removeFromList(getIndex(key));
		super.remove(key);
	}
	
	public Object remove(Object key) {
		removeFromList(getIndex(key));
		return super.remove(key);
	}
	
	public void clear() {
		this.list = new ArrayList();
		super.clear();
	}
	private void removeFromList(int idx){
		if (idx<list.size() && idx>=0) {
			list.remove(idx);
		}
	}

}
