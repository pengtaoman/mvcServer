package com.neusoft.tdframework.web.taglibs;

import com.neusoft.tdframework.common.util.*;

/** ���徲̬������,����������. 
  * <p>Title: ParamClass </p>
  * <p>Description: </p>
  	�� ����ά�����ʵ����.
  * <p>Copyright: Copyright (c) 2002</p>
  * <p>Company: neusoft</p> 
  * @author liyj from old framework
  * @version 1.0 
*/

public class ParamClass{

 	private	int	param_id;	//id ��
	private	int	system_id;	//ϵͳ��
	private	String	param_name;	//��������
	private	String	class_name;	//������
	private	String	method_name;	//���÷�������.(setXxxx)
	private	int	if_city_code;	//�Ƿ��յ��в�ѯ
	private	int	if_service_kind;	//�Ƿ���ҵ�����Ͳ�ѯ
	private	int	if_apply_event;	//�Ƿ��������ѯ
	private	int	if_sub_service_kind;	//�Ƿ�����ҵ�����Ͳ�ѯ
	private int paramCnt=0;
	
	/**
		�յĹ��췽��
	*/
	public ParamClass(){

	}
	/**
		ͨ������ֵ����һ������
	*/
	public ParamClass(int param_id, int system_id, String param_name, String class_name, String method_name, int if_city_code, int if_service_kind, int if_apply_event, int if_sub_service_kind){

	}
	/**
		ͨ��һ�����ж�����һ������
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
		����id ��
	*/
	public void setParam_id(int param_id) {
		this.param_id = param_id;
	}
	/**
		��ȡid ��
	*/
	public int getParam_id() {
		return (this.param_id);
	}
	/**
		����ϵͳ��
	*/
	public void setSystem_id(int system_id) {
		this.system_id = system_id;
	}
	/**
		��ȡϵͳ��
	*/
	public int getSystem_id() {
		return (this.system_id);
	}
	/**
		���ò�������
	*/
	public void setParam_name(String param_name) {
		this.param_name = param_name;
	}
	/**
		��ȡ��������
	*/
	public String getParam_name() {
		return (this.param_name);
	}
	/**
		����������
	*/
	public void setClass_name(String class_name) {
		this.class_name = class_name;
	}
	/**
		��ȡ������
	*/
	public String getClass_name() {
		return (this.class_name);
	}
	/**
		���õ��÷�������.(setXxxx)
	*/
	public void setMethod_name(String method_name) {
		this.method_name = method_name;
	}
	/**
		��ȡ���÷�������.(setXxxx)
	*/
	public String getMethod_name() {
		return (this.method_name);
	}
	/**
		�����Ƿ��յ��в�ѯ
	*/
	public void setIf_city_code(int if_city_code) {
		this.if_city_code = if_city_code;
		if(if_city_code==1) paramCnt ++;
		
	}
	/**
		��ȡ�Ƿ��յ��в�ѯ
	*/
	public int getIf_city_code() {
		return (this.if_city_code);
	}
	/**
		�����Ƿ���ҵ�����Ͳ�ѯ
	*/
	public void setIf_service_kind(int if_service_kind) {
		this.if_service_kind = if_service_kind;
		if(if_service_kind==1) paramCnt ++;
	}
	/**
		��ȡ�Ƿ���ҵ�����Ͳ�ѯ
	*/
	public int getIf_service_kind() {
		return (this.if_service_kind);
	}
	/**
		�����Ƿ��������ѯ
	*/
	public void setIf_apply_event(int if_apply_event) {
		this.if_apply_event = if_apply_event;
		if(if_apply_event==1) paramCnt ++;
	}
	/**
		��ȡ�Ƿ��������ѯ
	*/
	public int getIf_apply_event() {
		return (this.if_apply_event);
	}
	/**
		�����Ƿ�����ҵ�����Ͳ�ѯ
	*/
	public void setIf_sub_service_kind(int if_sub_service_kind) {
		this.if_sub_service_kind = if_sub_service_kind;
		if(if_sub_service_kind==1) paramCnt ++;
	}
	/**
		��ȡ�Ƿ�����ҵ�����Ͳ�ѯ
	*/
	public int getIf_sub_service_kind() {
		return (this.if_sub_service_kind);
	}
	
	/**
		��ȡ������Ӧ�Ĳ�������
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
		ת�����ַ���
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