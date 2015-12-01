package com.neusoft.om.interfase.ebisp.data;
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
 * Date: 2006-11-06
 * @author zhaof@neusoft.com
 * @version
 */

public class ButtonVO extends BaseVO { 
 	private	int	buttonId;	//按钮编号
	private	int	windowId;	//对应的窗口编号
	private	String	buttonName;	//按钮名称
	private	int	logEnabled;	//是否记录日志
	private	String	buttonDesc;	//按钮描述

	/**
		空的构造方法
	*/
	public ButtonVO(){

	}
	/**
		通过属性值构造一个对象
	*/
	public ButtonVO(int buttonId, int windowId, String buttonName, int logEnabled, String buttonDesc){

	}
	/**
		通过一个已有对象构造一个对象
	*/
	public ButtonVO(ButtonVO other){
		if(this != other) {
			this.buttonId = other.buttonId;
			this.windowId = other.windowId;
			this.buttonName = other.buttonName;
			this.logEnabled = other.logEnabled;
			this.buttonDesc = other.buttonDesc;

		}
	}
	/** 
		空值处理
	*/
	private String nvl(String str) {
		return str==null?"":str;
	}

	/**
		设置按钮编号
	*/
	public void setButtonId(int buttonId) {
		this.buttonId = buttonId;
	}
	/**
		获取按钮编号
	*/
	public int getButtonId() {
		return (this.buttonId);
	}
	/**
		设置对应的窗口编号
	*/
	public void setWindowId(int windowId) {
		this.windowId = windowId;
	}
	/**
		获取对应的窗口编号
	*/
	public int getWindowId() {
		return (this.windowId);
	}
	/**
		设置按钮名称
	*/
	public void setButtonName(String buttonName) {
		this.buttonName = buttonName;
	}
	/**
		获取按钮名称
	*/
	public String getButtonName() {
		return (this.buttonName);
	}
	/**
		设置是否记录日志
	*/
	public void setLogEnabled(int logEnabled) {
		this.logEnabled = logEnabled;
	}
	/**
		获取是否记录日志
	*/
	public int getLogEnabled() {
		return (this.logEnabled);
	}
	/**
		设置按钮描述
	*/
	public void setButtonDesc(String buttonDesc) {
		this.buttonDesc = buttonDesc;
	}
	/**
		获取按钮描述
	*/
	public String getButtonDesc() {
		return (this.buttonDesc);
	}

	/**
		以SQL的结果集设置数据
	*/
	public void setAttribute(ResultSet resultSet) throws SQLException {
		ResultSetMetaData metaData = resultSet.getMetaData();

		for(int i=1;i<=metaData.getColumnCount();i++) { 

			String columnName = metaData.getColumnName(i).toLowerCase();

			if(columnName.intern()=="f_button_id".intern())
				buttonId = resultSet.getInt(i);
			else if(columnName.intern()=="f_window_id".intern())
				windowId = resultSet.getInt(i);
			else if(columnName.intern()=="f_button_name".intern())
				buttonName = resultSet.getString(i);
			else if(columnName.intern()=="f_log_enabled".intern())
				logEnabled = resultSet.getInt(i);
			else if(columnName.intern()=="f_button_desc".intern())
				buttonDesc = resultSet.getString(i);
		}

	}

	/**
	* 通过MAP初始化信息
	*/
	public void setAttribute(java.util.HashMap map)throws NumberFormatException {
		buttonId = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("buttonId"), "-10"));
		windowId = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("windowId"), "-10"));
		buttonName = NullProcessUtil.nvlToString(
			map.get("buttonName"),"");
		logEnabled = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("logEnabled"), "-10"));
		buttonDesc = NullProcessUtil.nvlToString(
			map.get("buttonDesc"),"");
	}

	/**
		转化成字符串
	*/
	public String toString(int tabs) {
		StringBuffer ret = new StringBuffer();
		String str_tab = StringUtil.tabs(tabs);
		ret.append("<buttonId>").append(buttonId).append("</buttonId>\n");
		ret.append(str_tab).append("<windowId>").append(windowId).append("</windowId>\n");
		ret.append(str_tab).append("<buttonName>").append(nvl(buttonName)).append("</buttonName>\n");
		ret.append(str_tab).append("<logEnabled>").append(logEnabled).append("</logEnabled>\n");
		ret.append(str_tab).append("<buttonDesc>").append(nvl(buttonDesc)).append("</buttonDesc>\n");
		return ret.toString();
	}

}