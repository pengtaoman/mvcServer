package com.neusoft.tdframework.web.taglibs;

import com.neusoft.tdframework.common.util.*;

/** 定义静态参数类,方法的配置. 
  * <p>Title: ParamClass </p>
  * <p>Description: </p>
  	是 参数维护表的实体类.
  * <p>Copyright: Copyright (c) 2002</p>
  * <p>Company: neusoft</p> 
  * @author liyj from old framework
  * @version 1.0 
*/

public class ParamClass{

 	private	int	param_id;	//id 号
	private	int	system_id;	//系统号
	private	String	param_name;	//参数名称
	private	String	class_name;	//类名称
	private	String	method_name;	//调用方法名称.(setXxxx)
	private	int	if_city_code;	//是否按照地市查询
	private	int	if_service_kind;	//是否按照业务类型查询
	private	int	if_apply_event;	//是否按照事项查询
	private	int	if_sub_service_kind;	//是否按照子业务类型查询
	private int paramCnt=0;
	
	/**
		空的构造方法
	*/
	public ParamClass(){

	}
	/**
		通过属性值构造一个对象
	*/
	public ParamClass(int param_id, int system_id, String param_name, String class_name, String method_name, int if_city_code, int if_service_kind, int if_apply_event, int if_sub_service_kind){

	}
	/**
		通过一个已有对象构造一个对象
	*/
	public ParamClass(ParamClass other){
		if(this != other) {
			this.param_id = other.param_id;
			this.system_id = other.system_id;
			this.param_name = other.param_name;
			this.class_name = other.class_name;
			this.method_name = other.method_name;
			this.if_city_code = other.if_city_code;
			this.if_service_kind = other.if_service_kind;
			this.if_apply_event = other.if_apply_event;
			this.if_sub_service_kind = other.if_sub_service_kind;

		}
	}
	/**
		设置id 号
	*/
	public void setParam_id(int param_id) {
		this.param_id = param_id;
	}
	/**
		获取id 号
	*/
	public int getParam_id() {
		return (this.param_id);
	}
	/**
		设置系统号
	*/
	public void setSystem_id(int system_id) {
		this.system_id = system_id;
	}
	/**
		获取系统号
	*/
	public int getSystem_id() {
		return (this.system_id);
	}
	/**
		设置参数名称
	*/
	public void setParam_name(String param_name) {
		this.param_name = param_name;
	}
	/**
		获取参数名称
	*/
	public String getParam_name() {
		return (this.param_name);
	}
	/**
		设置类名称
	*/
	public void setClass_name(String class_name) {
		this.class_name = class_name;
	}
	/**
		获取类名称
	*/
	public String getClass_name() {
		return (this.class_name);
	}
	/**
		设置调用方法名称.(setXxxx)
	*/
	public void setMethod_name(String method_name) {
		this.method_name = method_name;
	}
	/**
		获取调用方法名称.(setXxxx)
	*/
	public String getMethod_name() {
		return (this.method_name);
	}
	/**
		设置是否按照地市查询
	*/
	public void setIf_city_code(int if_city_code) {
		this.if_city_code = if_city_code;
		if(if_city_code==1) paramCnt ++;
		
	}
	/**
		获取是否按照地市查询
	*/
	public int getIf_city_code() {
		return (this.if_city_code);
	}
	/**
		设置是否按照业务类型查询
	*/
	public void setIf_service_kind(int if_service_kind) {
		this.if_service_kind = if_service_kind;
		if(if_service_kind==1) paramCnt ++;
	}
	/**
		获取是否按照业务类型查询
	*/
	public int getIf_service_kind() {
		return (this.if_service_kind);
	}
	/**
		设置是否按照事项查询
	*/
	public void setIf_apply_event(int if_apply_event) {
		this.if_apply_event = if_apply_event;
		if(if_apply_event==1) paramCnt ++;
	}
	/**
		获取是否按照事项查询
	*/
	public int getIf_apply_event() {
		return (this.if_apply_event);
	}
	/**
		设置是否按照子业务类型查询
	*/
	public void setIf_sub_service_kind(int if_sub_service_kind) {
		this.if_sub_service_kind = if_sub_service_kind;
		if(if_sub_service_kind==1) paramCnt ++;
	}
	/**
		获取是否按照子业务类型查询
	*/
	public int getIf_sub_service_kind() {
		return (this.if_sub_service_kind);
	}
	
	/**
		获取方法对应的参数类型
	*/
	public Class[] getMethodParams(){
		Class[] methodParams = new Class[paramCnt];
		int pos=0;
		
		if(if_city_code == 1) methodParams[pos++]=String.class;
		if(if_service_kind == 1) methodParams[pos++]=int.class;
		if(if_apply_event == 1) methodParams[pos++]=int.class;
		if(if_sub_service_kind == 1) methodParams[pos++]=int.class;

		return methodParams;			
	}
	
	/**
		转化成字符串
	*/
	public String toString(int tabs) {
		StringBuffer ret = new StringBuffer();
		String str_tab = StringUtil.tabs(tabs);
		ret.append(str_tab).append("<Param_id>").append(param_id).append("</Param_id>\n");
		ret.append(str_tab).append("<System_id>").append(system_id).append("</System_id>\n");
		ret.append(str_tab).append("<Param_name>").append(param_name).append("</Param_name>\n");
		ret.append(str_tab).append("<Class_name>").append(class_name).append("</Class_name>\n");
		ret.append(str_tab).append("<Method_name>").append(method_name).append("</Method_name>\n");
		ret.append(str_tab).append("<If_city_code>").append(if_city_code).append("</If_city_code>\n");
		ret.append(str_tab).append("<If_service_kind>").append(if_service_kind).append("</If_service_kind>\n");
		ret.append(str_tab).append("<If_apply_event>").append(if_apply_event).append("</If_apply_event>\n");
		ret.append(str_tab).append("<If_sub_service_kind>").append(if_sub_service_kind).append("</If_sub_service_kind>\n");
		return ret.toString();
	}

	
}