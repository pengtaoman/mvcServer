package com.neusoft.tdframework.batch.dao; 

import java.io.Serializable;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.BaseVO;
import com.neusoft.tdframework.common.util.StringUtil;
//import com.neusoft.tdframework.common.util.XMLProperties;

/**
 * Title: ������Ϣ
 * Description: 
 * Company: neusoft
 * Date: 2004-12-14
 * @author yang-lm@neusoft.com
 * @version 
 */
public class  BatchVO extends BaseVO implements Serializable{ 
	
	private static final long serialVersionUID = 1L;
	private	String	batch_no;	        //���κ�
	private	String	status;	            //״̬��Ϣ
	private	String	create_operator;	//�ϴ��û�
	private String  create_date;        //�ϴ�ʱ��
	private String  finish_date;        //�������ʱ��
	private String  city_code;          //���д���
	private String  department_no;      //
	private String  system_id;          //ϵͳ���
	private String  module_id;          //
	private String  procedure_name;     //�洢������

	/**
		�յĹ��췽��
	*/
	public BatchVO (){

	}
	/**
		ͨ������ֵ����һ������
	*/
	public BatchVO (String batch_no,String record){

	}
	/**
		ͨ��һ�����ж�����һ������
	*/
	public BatchVO (BatchVO other){
		if(this != other) {
			this.batch_no = other.batch_no;
			this.status = other.status;
			this.create_operator = other.create_operator;
			this.create_date = other.create_date;
			this.finish_date = other.finish_date;
			this.city_code = other.city_code;
			this.department_no = other.department_no;
			this.system_id = other.system_id;
			this.module_id = other.module_id;
			this.procedure_name = other.procedure_name;
		}
	}
	/** 
		��ֵ����
	*/
	private String nvl(String str) {
		return str==null?"":str;
	}

	/**		
	*/
	public void setBatch_no(String batch_no) {
		this.batch_no = batch_no;
	}
	/**		
	*/
	public String getBatch_no() {
		return (this.batch_no);
	}
	/**
	*/
	public void setCreate_operator(String create_operator) {
		this.create_operator = create_operator;
	}
	/**	
	*/
	public String getCreate_operator() {
		return (this.create_operator);
	}
	/**
	*/
	public void setCreate_date(String create_date) {
		this.create_date = create_date;
	}
	/**	
	*/
	public String getCreate_date() {
		return (this.create_date);
	}
	/**
	*/
	public void setFinish_date(String finish_date) {
		this.finish_date = finish_date;
	}
	/**	
	*/
	public String getFinish_date() {
		return (this.finish_date);
	}
	/**
	*/
	public void setCity_code(String city_code) {
		this.city_code = city_code;
	}
	/**	
	*/
	public String getCity_code() {
		return (this.city_code);
	}
	/**
	*/
	public void setDepartment_no(String department_no) {
		this.department_no = department_no;
	}
	/**	
	*/
	public String getDepartment_no() {
		return (this.department_no);
	}
	/**	
	*/
	public String getModule_id() {
		return module_id;
	}
	/**	
	*/
	public void setModule_id(String module_id) {
		this.module_id = module_id;
	}
	/**	
	*/
	public String getProcedure_name() {
		return procedure_name;
	}
	/**	
	*/
	public void setProcedure_name(String procedure_name) {
		this.procedure_name = procedure_name;
	}
	/**	
	*/
	public String getSystem_id() {
		return system_id;
	}
	/**	
	*/
	public void setSystem_id(String system_id) {
		this.system_id = system_id;
	}
	/**	
	*/
	public String getStatus() {
		return status;
	}
	/**	
	*/
	public void setStatus(String status) {
		this.status = status;
	}

}