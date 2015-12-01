package com.neusoft.tdframework.common.data;

public class BaseDictItem {
	String id = null;	//字符型标识
	String name;	//名称
	String preserve_1;	//备用 String 字段1
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPreserve_1() {
		return preserve_1;
	}
	public void setPreserve_1(String preserve_1) {
		this.preserve_1 = preserve_1;
	}

}
