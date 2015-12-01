package com.neusoft.om.dao.app;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.BaseVO;
import com.neusoft.tdframework.common.util.NullProcessUtil;
import com.neusoft.tdframework.common.util.StringUtil;

/**
 * Title:
 * Description:
 * Company: neusoft
 * Date: 2006-11-24
 * @author zhaof@neusoft.com
 * @version
 */

public class AppVO extends BaseVO { 
 	private	int	appId;	//应用编码
	private	String	appName;	//应用名称
	private	String	desc;	//描述

	/**
		空的构造方法
	*/
	public AppVO(){

	}
	/**
		通过属性值构造一个对象
	*/
	public AppVO(int appId, String appName, String desc){

	}
	/**
		通过一个已有对象构造一个对象
	*/
	public AppVO(AppVO other){
		if(this != other) {
			this.appId = other.appId;
			this.appName = other.appName;
			this.desc = other.desc;

		}
	}
	/** 
		空值处理
	*/
	private String nvl(String str) {
		return str==null?"":str;
	}

	/**
		设置应用编码
	*/
	public void setAppId(int appId) {
		this.appId = appId;
	}
	/**
		获取应用编码
	*/
	public int getAppId() {
		return (this.appId);
	}
	/**
		设置应用名称
	*/
	public void setAppName(String appName) {
		this.appName = appName;
	}
	/**
		获取应用名称
	*/
	public String getAppName() {
		return (this.appName);
	}
	/**
		设置描述
	*/
	public void setDesc(String desc) {
		this.desc = desc;
	}
	/**
		获取描述
	*/
	public String getDesc() {
		return (this.desc);
	}

	/**
		以SQL的结果集设置数据
	*/
	public void setAttribute(ResultSet resultSet) throws SQLException {
		ResultSetMetaData metaData = resultSet.getMetaData();

		for(int i=1;i<=metaData.getColumnCount();i++) { 

			String columnName = metaData.getColumnName(i).toLowerCase();

			if(columnName.intern()=="f_app_id".intern())
				appId = resultSet.getInt(i);
			else if(columnName.intern()=="f_app_name".intern())
				appName = resultSet.getString(i);
			else if(columnName.intern()=="f_desc".intern())
				desc = resultSet.getString(i);
		}

	}

	/**
	* 通过MAP初始化信息
	*/
	public void setAttribute(java.util.HashMap map)throws NumberFormatException {
		appId = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("appId"), "-10"));
		appName = NullProcessUtil.nvlToString(
			map.get("appName"),"");
		desc = NullProcessUtil.nvlToString(
			map.get("desc"),"");
	}

	/**
		转化成字符串
	*/
	public String toString(int tabs) {
		StringBuffer ret = new StringBuffer();
		String str_tab = StringUtil.tabs(tabs);
		ret.append("<appId>").append(appId).append("</appId>\n");
		ret.append(str_tab).append("<appName>").append(nvl(appName)).append("</appName>\n");
		ret.append(str_tab).append("<desc>").append(nvl(desc)).append("</desc>\n");
		return ret.toString();
	}

}