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

public class AppRoleRelVO extends BaseVO { 
 	private	int	appId;	//应用编码
	private	int	roleId;	//角色编码

	/**
		空的构造方法
	*/
	public AppRoleRelVO(){

	}
	/**
		通过属性值构造一个对象
	*/
	public AppRoleRelVO(int appId, int roleId){

	}
	/**
		通过一个已有对象构造一个对象
	*/
	public AppRoleRelVO(AppRoleRelVO other){
		if(this != other) {
			this.appId = other.appId;
			this.roleId = other.roleId;

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
		设置角色编码
	*/
	public void setRoleId(int roleId) {
		this.roleId = roleId;
	}
	/**
		获取角色编码
	*/
	public int getRoleId() {
		return (this.roleId);
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
			else if(columnName.intern()=="f_role_id".intern())
				roleId = resultSet.getInt(i);
		}

	}

	/**
	* 通过MAP初始化信息
	*/
	public void setAttribute(java.util.HashMap map)throws NumberFormatException {
		appId = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("appId"), "-10"));
		roleId = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("roleId"), "-10"));
	}

	/**
		转化成字符串
	*/
	public String toString(int tabs) {
		StringBuffer ret = new StringBuffer();
		String str_tab = StringUtil.tabs(tabs);
		ret.append("<appId>").append(appId).append("</appId>\n");
		ret.append(str_tab).append("<roleId>").append(roleId).append("</roleId>\n");
		return ret.toString();
	}

}