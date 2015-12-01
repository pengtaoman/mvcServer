/*
 * Created on 2004-10-14
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.tdframework.common.data;

import java.util.HashMap;

import com.neusoft.tdframework.common.util.*;

/** 公共的静态参数类.
  * <p>Title: ParamObject </p>
  * <p>Description: </p>
	应用于盛装所有简单小表的数据, 用于生成下拉框. 
	或查询结构的ID与名字的转换.
  * <p>Copyright: Copyright (c) 2002</p>
  * <p>Company: neusoft</p>
  * 
  * @author liyj from old framework
  * @version 1.0 
*/

public class ParamObject{

	String id = null;	//字符型标识
	String name;	//名称
	String oper_level;	//操作级别
	
	int preserve1;		//备用 int 字段1
	int preserve2;		//备用 int 字段2
	int preserve3;		//备用 int 字段3
	
	String preserve_1;	//备用 String 字段1
	String preserve_2;	//备用 String 字段2
	String preserve_3;	//备用 String 字段3
	
	boolean flag1=false;		//是否使用了备用字段preserve1
	boolean flag2=false;		//是否使用了备用字段preserve2
	boolean flag3=false;		//是否使用了备用字段preserve3

	boolean flag_1=false;		//是否使用了备用字段preserve_1
	boolean flag_2=false;		//是否使用了备用字段preserve_2
	boolean flag_3=false;		//是否使用了备用字段preserve_3
	
	private String filterDataInfo;
	private HashMap paramMap = new HashMap();
	
	/**
	空构造方法
	*/
	public ParamObject(){}
	
	/**
	构造一个新的对象
	*/
	public ParamObject(ParamObject other) {
		if(this != other) {
			this.id = other.id;
			this.name = other.name;
		}
	}
	
	/**
		设置操作级别
	*/
	public void setOper_level(String oper_level) {
		this.oper_level = oper_level; 
	}
	
	/**
	设置Id
	*/
	public void setId(String id) {
		this.id = id; 
	}
	
	/**
	设置名称
	*/
	public void setName(String name) {
		this.name = name; 
	}
	
	/**
	获取操作级别
	*/
	public String getOper_level(){
		return (this.oper_level);	
	}
	
	/**
	获取名称
	*/
	public String getId() {
		return (this.id); 
	}
	
	/**
	获取名称
	*/
	public String getName() {
		return (this.name); 
	}
	
	/**
	设置备用 int 字段1
	*/
	public void setPreserve1(int preserve1){
		this.preserve1 = preserve1;
		setFlag1(true);
	}

	/**
	获取备用 int 字段1
	*/
	public int getPreserve1(){
		return this.preserve1;	
	}
	
	/**
		设置是否使用了备用字段1, 缺省不设置情况下为不使用
	*/
	public void setFlag1(boolean flag1){
		this.flag1 = flag1;	
	}
	
	/**
	设置备用 int 字段2
	*/
	public void setPreserve2(int preserve2){
		this.preserve2 = preserve2;
		setFlag2(true);
	}

	/**
	获取备用 int 字段2
	*/
	public int getPreserve2(){
		return this.preserve2;	
	}
	
	/**
		设置是否使用了备用字段2, 缺省不设置情况下为不使用
	*/
	public void setFlag2(boolean flag2){
		this.flag2 = flag2;	
	}
	
	/**
	设置备用 int 字段3
	*/
	public void setPreserve3(int preserve3){
		this.preserve3 = preserve3;
		setFlag3(true);
	}

	/**
	获取备用 int 字段3
	*/
	public int getPreserve3(){
		return this.preserve3;	
	}

	/**
		设置是否使用了备用字段3, 缺省不设置情况下为不使用
	*/
	public void setFlag3(boolean flag3){
		this.flag3 = flag3;	
	}
	
	/**
	设置备用 String 字段1
	*/
	public void setPreserve_1(String preserve_1){
		this.preserve_1 = preserve_1;
		setFlag_1(true);
	}

	/**
	获取备用 String 字段1
	*/
	public String getPreserve_1(){
		return this.preserve_1;	
	}

	/**
		设置是否使用了备用字段_1, 缺省不设置情况下为不使用
	*/
	public void setFlag_1(boolean flag_1){
		this.flag_1 = flag_1;	
	}
	
	/**
	获取备用 String 字段2
	*/
	public String getPreserve_2(){
		return this.preserve_2;	
	}
	
	/**
	设置备用 String 字段2
	*/
	public void setPreserve_2(String preserve_2){
		this.preserve_2 = preserve_2;
		setFlag_2(true);
	}

	/**
		设置是否使用了备用字段_2, 缺省不设置情况下为不使用
	*/
	public void setFlag_2(boolean flag_2){
		this.flag_2 = flag_2;	
	}

	/**
	获取备用 String 字段3
	*/
	public String getPreserve_3(){
		return this.preserve_3;	
	}
	
	/**
	 * 设置备用 String 字段2
	 */
	public void setPreserve_3(String preserve_3){
		this.preserve_3 = preserve_3;
		setFlag_3(true);
	}
	
	/**
		设置是否使用了备用字段_1, 缺省不设置情况下为不使用
	*/
	public void setFlag_3(boolean flag_3){
		this.flag_3 = flag_3;	
	}
	
	/**
	转换为字符
	*/
	public String toString(int tabs) {
		StringBuffer ret = new StringBuffer();
		
		//推进几个tab
		String str_tab=StringUtil.tabs(tabs);
		
		ret.append(str_tab).append("<option>\n");
		if(id==null)
			ret.append(str_tab).append("	").append("<value>").append(this.id).append("</value>\n");
		else
			ret.append(str_tab).append("	").append("<value>").append(nvl(this.id)).append("</value>\n");
		ret.append(str_tab).append("	").append("<caption>").append(nvl(this.name)).append("</caption>\n");
		if(flag1)
			ret.append(str_tab).append("	").append("<Preserve1>").append(this.preserve1).append("</Preserve1>\n");
		if(flag2)
			ret.append(str_tab).append("	").append("<Preserve2>").append(this.preserve2).append("</Preserve2>\n");
		if(flag3)
			ret.append(str_tab).append("	").append("<Preserve3>").append(this.preserve3).append("</Preserve3>\n");
		if(flag_1)
			ret.append(str_tab).append("	").append("<Preserve_1>").append(nvl(this.preserve_1)).append("</Preserve_1>\n");
		if(flag_2)	
			ret.append(str_tab).append("	").append("<Preserve_2>").append(nvl(this.preserve_2)).append("</Preserve_2>\n");
		if(flag_3)
			ret.append(str_tab).append("	").append("<Preserve_3>").append(nvl(this.preserve_3)).append("</Preserve_3>\n");
		
		ret.append(str_tab).append("</option>\n");
		return ret.toString();
	}	
	
	private String nvl(String str){
		return XMLProperties.prepareXml(str==null?"":str);
	}

	public String getFilterDataInfo() {
		return filterDataInfo;
	}

	public void setFilterDataInfo(String filterDataInfo) {
		this.filterDataInfo = filterDataInfo;
	}

	public HashMap getParamMap() {
		return paramMap;
	}

	public void setParamMap(HashMap paramMap) {
		this.paramMap = paramMap;
	}
	
	public void setParamKey(String key,String value) {
		this.paramMap.put(key,value);
	}
	
}
