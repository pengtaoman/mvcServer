package com.neusoft.om.dao.datatable; 

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.BaseVO;
import com.neusoft.tdframework.common.util.NullProcessUtil;
import com.neusoft.tdframework.common.util.StringUtil;
import com.neusoft.tdframework.common.util.XMLProperties;

/**
 * Title:
 * Description:
 * Company: neusoft
 * Date: 2004-12-14
 * @author ren.hui@neusoft.com
 * @version
 */

public class DataTableVO extends BaseVO { 
	private	String	tableName;	//表名
	private	String	tableAliasName;	//表的别名，默认与表名相同
	private	int	tableType;	//1.参数表；
	private	String	tableDesc;	//描述

	/**
		空的构造方法
	*/
	public DataTableVO(){

	}
	/**
		通过属性值构造一个对象
	*/
	public DataTableVO(String tableName, String tableAliasName, int tableType, String tableDesc){

	}
	/**
		通过一个已有对象构造一个对象
	*/
	public DataTableVO(DataTableVO other){
		if(this != other) {
			this.tableName = other.tableName;
			this.tableAliasName = other.tableAliasName;
			this.tableType = other.tableType;
			this.tableDesc = other.tableDesc;

		}
	}
	/** 
		空值处理
	*/
	private String nvl(String str) {
		return str==null?"":str;
	}

	/**
		设置表名
	*/
	public void setTableName(String tableName) {
		this.tableName = tableName;
	}
	/**
		获取表名
	*/
	public String getTableName() {
		return XMLProperties.prepareXml(this.tableName);
	}
	/**
		设置表的别名，默认与表名相同
	*/
	public void setTableAliasName(String tableAliasName) {
		this.tableAliasName = tableAliasName;
	}
	/**
		获取表的别名，默认与表名相同
	*/
	public String getTableAliasName() {
		return XMLProperties.prepareXml(this.tableAliasName);
	}
	/**
		设置1.参数表；
	*/
	public void setTableType(int tableType) {
		this.tableType = tableType;
	}
	/**
		获取1.参数表；
	*/
	public int getTableType() {
		return (this.tableType);
	}
	/**
		设置描述
	*/
	public void setTableDesc(String tableDesc) {
		this.tableDesc = tableDesc;
	}
	/**
		获取描述
	*/
	public String getTableDesc() {
		return XMLProperties.prepareXml(this.tableDesc);
	}

	/**
		以SQL的结果集设置数据
	*/
	public void setAttribute(ResultSet resultSet) throws SQLException {
		ResultSetMetaData metaData = resultSet.getMetaData();

		for(int i=1;i<=metaData.getColumnCount();i++) { 

			String columnName = metaData.getColumnName(i).toLowerCase();

			if(columnName.intern()=="f_table_name".intern())
				tableName = resultSet.getString(i);
			else if(columnName.intern()=="f_table_alias_name".intern())
				tableAliasName = resultSet.getString(i);
			else if(columnName.intern()=="f_table_type".intern())
				tableType = resultSet.getInt(i);
			else if(columnName.intern()=="f_table_desc".intern())
				tableDesc = resultSet.getString(i);
		}

	}

	/**
	* 通过MAP初始化信息
	*/
	public void setAttribute(java.util.HashMap map)throws NumberFormatException {
		tableName = NullProcessUtil.nvlToString(
			map.get("tableName"),"");
		tableAliasName = NullProcessUtil.nvlToString(
			map.get("tableAliasName"),"");
		tableType = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("tableType"), "-10"));
		tableDesc = NullProcessUtil.nvlToString(
			map.get("tableDesc"),"");
	}

	/**
		转化成字符串
	*/
	public String toString(int tabs) {
		StringBuffer ret = new StringBuffer();
		String str_tab = StringUtil.tabs(tabs);
		ret.append("<tableName>").append(XMLProperties.prepareXml(nvl(tableName))).append("</tableName>\n");
		ret.append(str_tab).append("<tableAliasName>").append(XMLProperties.prepareXml(nvl(tableAliasName))).append("</tableAliasName>\n");
		ret.append(str_tab).append("<tableType>").append(tableType).append("</tableType>\n");
		ret.append(str_tab).append("<tableDesc>").append(XMLProperties.prepareXml(nvl(tableDesc))).append("</tableDesc>\n");
		return ret.toString();
	}

}