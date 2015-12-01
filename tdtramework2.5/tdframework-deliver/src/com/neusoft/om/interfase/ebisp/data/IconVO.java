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
 * Date: 2006-09-27
 * @author ren.hui@neusoft.com
 * @version
 */

public class IconVO extends BaseVO { 
 	private	int	iconId;	//图标标识
	private	String	iconName;	//图标名称
	private	String	path;	//路径
	private	int	isSystem;	//系统图标
	private	String	description;	//描述

	/**
		空的构造方法
	*/
	public IconVO(){

	}
	/**
		通过属性值构造一个对象
	*/
	public IconVO(int iconId, String iconName, String path, int isSystem, String description){

	}
	/**
		通过一个已有对象构造一个对象
	*/
	public IconVO(IconVO other){
		if(this != other) {
			this.iconId = other.iconId;
			this.iconName = other.iconName;
			this.path = other.path;
			this.isSystem = other.isSystem;
			this.description = other.description;

		}
	}
	/** 
		空值处理
	*/
	private String nvl(String str) {
		return str==null?"":str;
	}

	/**
		设置图标标识
	*/
	public void setIconId(int iconId) {
		this.iconId = iconId;
	}
	/**
		获取图标标识
	*/
	public int getIconId() {
		return (this.iconId);
	}
	/**
		设置图标名称
	*/
	public void setIconName(String iconName) {
		this.iconName = iconName;
	}
	/**
		获取图标名称
	*/
	public String getIconName() {
		return (this.iconName);
	}
	/**
		设置路径
	*/
	public void setPath(String path) {
		this.path = path;
	}
	/**
		获取路径
	*/
	public String getPath() {
		return (this.path);
	}
	/**
		设置系统图标
	*/
	public void setIsSystem(int isSystem) {
		this.isSystem = isSystem;
	}
	/**
		获取系统图标
	*/
	public int getIsSystem() {
		return (this.isSystem);
	}
	/**
		设置描述
	*/
	public void setDescription(String description) {
		this.description = description;
	}
	/**
		获取描述
	*/
	public String getDescription() {
		return (this.description);
	}

	/**
		以SQL的结果集设置数据
	*/
	public void setAttribute(ResultSet resultSet) throws SQLException {
		ResultSetMetaData metaData = resultSet.getMetaData();

		for(int i=1;i<=metaData.getColumnCount();i++) { 

			String columnName = metaData.getColumnName(i).toLowerCase();

			if(columnName.intern()=="f_icon_id".intern())
				iconId = resultSet.getInt(i);
			else if(columnName.intern()=="f_icon_name".intern())
				iconName = resultSet.getString(i);
			else if(columnName.intern()=="f_path".intern())
				path = resultSet.getString(i);
			else if(columnName.intern()=="f_is_system".intern())
				isSystem = resultSet.getInt(i);
			else if(columnName.intern()=="f_description".intern())
				description = resultSet.getString(i);
		}

	}

	/**
	* 通过MAP初始化信息
	*/
	public void setAttribute(java.util.HashMap map)throws NumberFormatException {
		iconId = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("iconId"), "-10"));
		iconName = NullProcessUtil.nvlToString(
			map.get("iconName"),"");
		path = NullProcessUtil.nvlToString(
			map.get("path"),"");
		isSystem = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("isSystem"), "-10"));
		description = NullProcessUtil.nvlToString(
			map.get("description"),"");
	}

	/**
		转化成字符串
	*/
	public String toString(int tabs) {
		StringBuffer ret = new StringBuffer();
		String str_tab = StringUtil.tabs(tabs);
		ret.append("<iconId>").append(iconId).append("</iconId>\n");
		ret.append(str_tab).append("<iconName>").append(nvl(iconName)).append("</iconName>\n");
		ret.append(str_tab).append("<path>").append(nvl(path)).append("</path>\n");
		ret.append(str_tab).append("<isSystem>").append(isSystem).append("</isSystem>\n");
		ret.append(str_tab).append("<description>").append(nvl(description)).append("</description>\n");
		return ret.toString();
	}

}
