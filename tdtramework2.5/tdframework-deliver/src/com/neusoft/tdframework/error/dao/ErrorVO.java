package com.neusoft.tdframework.error.dao; 

import java.io.Serializable;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.BaseVO;
import com.neusoft.tdframework.common.util.StringUtil;
//import com.neusoft.tdframework.common.util.XMLProperties;

/**
 * Title: 错误信息
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
	private	int	error_code;	//错误编号
	private	String	error_info;	//错误信息

	/**
		空的构造方法
	*/
	public ErrorVO (){

	}
	/**
		通过属性值构造一个对象
	*/
	public ErrorVO (int error_code,String error_info){

	}
	/**
		通过一个已有对象构造一个对象
	*/
	public ErrorVO (ErrorVO other){
		if(this != other) {
			this.error_code = other.error_code;
			this.error_info = other.error_info;

		}
	}
	/** 
		空值处理
	*/
	private String nvl(String str) {
		return str==null?"":str;
	}

	/**
		设置错误编号
	*/
	public void setError_code(int error_code) {
		this.error_code = error_code;
	}
	/**
		获取错误编码
	*/
	public int getError_code() {
		return (this.error_code);
	}
	/**
		设置错误信息
	*/
	public void setError_info(String error_info) {
		this.error_info = error_info;
	}
	/**
		获取错误信息
	*/
	public String getError_info() {
		return (this.error_info);
	}

	/**
		转化成字符串
	*/
	public String toString(int tabs) {
		StringBuffer ret = new StringBuffer();
		String str_tab = StringUtil.tabs(tabs);
		ret.append("<Error_code>").append(error_code).append("</Error_code>\n");
		ret.append(str_tab).append("<Error_info>").append(nvl(error_info)).append("</Error_info>\n");
		return ret.toString();
	}

}