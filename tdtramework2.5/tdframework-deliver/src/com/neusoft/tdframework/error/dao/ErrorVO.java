package com.neusoft.tdframework.error.dao; 

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
public class  ErrorVO extends BaseVO implements Serializable{ 
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private	int	error_code;	//������
	private	String	error_info;	//������Ϣ

	/**
		�յĹ��췽��
	*/
	public ErrorVO (){

	}
	/**
		ͨ������ֵ����һ������
	*/
	public ErrorVO (int error_code,String error_info){

	}
	/**
		ͨ��һ�����ж�����һ������
	*/
	public ErrorVO (ErrorVO other){
		if(this != other) {
			this.error_code = other.error_code;
			this.error_info = other.error_info;

		}
	}
	/** 
		��ֵ����
	*/
	private String nvl(String str) {
		return str==null?"":str;
	}

	/**
		���ô�����
	*/
	public void setError_code(int error_code) {
		this.error_code = error_code;
	}
	/**
		��ȡ�������
	*/
	public int getError_code() {
		return (this.error_code);
	}
	/**
		���ô�����Ϣ
	*/
	public void setError_info(String error_info) {
		this.error_info = error_info;
	}
	/**
		��ȡ������Ϣ
	*/
	public String getError_info() {
		return (this.error_info);
	}

	/**
		ת�����ַ���
	*/
	public String toString(int tabs) {
		StringBuffer ret = new StringBuffer();
		String str_tab = StringUtil.tabs(tabs);
		ret.append("<Error_code>").append(error_code).append("</Error_code>\n");
		ret.append(str_tab).append("<Error_info>").append(nvl(error_info)).append("</Error_info>\n");
		return ret.toString();
	}

}