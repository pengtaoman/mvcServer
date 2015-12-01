package com.neusoft.om.dao.datatablefield; 

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

public class DataTableFieldVO extends BaseVO { 
	private	String	tableName;	//表名
	private	String	fieldName;	//列名
	private	String	fieldAliasName;	//别名，默认与字段名相同
	private	String	fieldDesc;	//描述
	private	String	dataType;	//数据类型
	private	int	dataLen;	//数据长度
	private	int	precision;	//数据精度
	private	int	ifNull;	//是否为空，1：是 0：否
	private	String	isDefault;	//默认值
	private	String	fieldRemark;	//备注

	/**
		空的构造方法
	*/
	public DataTableFieldVO(){

	}
	/**
		通过属性值构造一个对象
	*/
	public DataTableFieldVO(String tableName, String fieldName, String fieldAliasName, String fieldDesc, String dataType, int dataLen, int precision, int ifNull, String isDefault, String fieldRemark){

	}
	/**
		通过一个已有对象构造一个对象
	*/
	public DataTableFieldVO(DataTableFieldVO other){
		if(this != other) {
			this.tableName = other.tableName;
			this.fieldName = other.fieldName;
			this.fieldAliasName = other.fieldAliasName;
			this.fieldDesc = other.fieldDesc;
			this.dataType = other.dataType;
			this.dataLen = other.dataLen;
			this.precision = other.precision;
			this.ifNull = other.ifNull;
			this.isDefault = other.isDefault;
			this.fieldRemark = other.fieldRemark;

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
		设置列名
	*/
	public void setFieldName(String fieldName) {
		this.fieldName = fieldName;
	}
	/**
		获取列名
	*/
	public String getFieldName() {
		return XMLProperties.prepareXml(this.fieldName);
	}
	/**
		设置别名，默认与字段名相同
	*/
	public void setFieldAliasName(String fieldAliasName) {
		this.fieldAliasName = fieldAliasName;
	}
	/**
		获取别名，默认与字段名相同
	*/
	public String getFieldAliasName() {
		return (this.fieldAliasName);
	}
	/**
		设置描述
	*/
	public void setFieldDesc(String fieldDesc) {
		this.fieldDesc = fieldDesc;
	}
	/**
		获取描述
	*/
	public String getFieldDesc() {
		return XMLProperties.prepareXml(this.fieldDesc);
	}
	/**
		设置数据类型
	*/
	public void setDataType(String dataType) {
		this.dataType = dataType;
	}
	/**
		获取数据类型
	*/
	public String getDataType() {
		return (this.dataType);
	}
	/**
		设置数据长度
	*/
	public void setDataLen(int dataLen) {
		this.dataLen = dataLen;
	}
	/**
		获取数据长度
	*/
	public int getDataLen() {
		return (this.dataLen);
	}
	/**
		设置数据精度
	*/
	public void setPrecision(int precision) {
		this.precision = precision;
	}
	/**
		获取数据精度
	*/
	public int getPrecision() {
		return (this.precision);
	}
	/**
		设置是否为空，1：是 0：否
	*/
	public void setNull(int ifNull) {
		this.ifNull = ifNull;
	}
	/**
		获取是否为空，1：是 0：否
	*/
	public int getNull() {
		return (this.ifNull);
	}
	/**
		设置默认值
	*/
	public void setDefault(String isDefault) {
		this.isDefault = isDefault;
	}
	/**
		获取默认值
	*/
	public String getDefault() {
		return (this.isDefault);
	}
	/**
		设置备注
	*/
	public void setFieldRemark(String fieldRemark) {
		this.fieldRemark = fieldRemark;
	}
	/**
		获取备注
	*/
	public String getFieldRemark() {
		return XMLProperties.prepareXml(this.fieldRemark);
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
			else if(columnName.intern()=="f_field_name".intern())
				fieldName = resultSet.getString(i);
			else if(columnName.intern()=="f_field_alias_name".intern())
				fieldAliasName = resultSet.getString(i);
			else if(columnName.intern()=="f_field_desc".intern())
				fieldDesc = resultSet.getString(i);
			else if(columnName.intern()=="f_data_type".intern())
				dataType = resultSet.getString(i);
			else if(columnName.intern()=="f_data_len".intern())
				dataLen = resultSet.getInt(i);
			else if(columnName.intern()=="f_precision".intern())
				precision = resultSet.getInt(i);
			else if(columnName.intern()=="f_null".intern())
			ifNull = resultSet.getInt(i);
			else if(columnName.intern()=="f_default".intern())
			isDefault = resultSet.getString(i);
			else if(columnName.intern()=="f_field_remark".intern())
				fieldRemark = resultSet.getString(i);
		}

	}

	/**
	* 通过MAP初始化信息
	*/
	public void setAttribute(java.util.HashMap map)throws NumberFormatException {
		tableName = NullProcessUtil.nvlToString(
			map.get("tableName"),"");
		fieldName = NullProcessUtil.nvlToString(
			map.get("fieldName"),"");
		fieldAliasName = NullProcessUtil.nvlToString(
			map.get("fieldAliasName"),"");
		fieldDesc = NullProcessUtil.nvlToString(
			map.get("fieldDesc"),"");
		dataType = NullProcessUtil.nvlToString(
			map.get("dataType"),"");
		dataLen = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("dataLen"), "-10"));
		precision = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("precision"), "-10"));
		ifNull = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("null"), "-10"));
		isDefault = NullProcessUtil.nvlToString(
			map.get("default"),"");
		fieldRemark = NullProcessUtil.nvlToString(
			map.get("fieldRemark"),"");
	}

	/**
		转化成字符串
	*/
	public String toString(int tabs) {
		StringBuffer ret = new StringBuffer();
		String str_tab = StringUtil.tabs(tabs);
		ret.append("<TableName>").append(XMLProperties.prepareXml(nvl(tableName))).append("</TableName>\n");
		ret.append(str_tab).append("<FieldName>").append(XMLProperties.prepareXml(nvl(fieldName))).append("</FieldName>\n");
		ret.append(str_tab).append("<FieldAliasName>").append(XMLProperties.prepareXml(nvl(fieldAliasName))).append("</FieldAliasName>\n");
		ret.append(str_tab).append("<FieldDesc>").append(XMLProperties.prepareXml(nvl(fieldDesc))).append("</FieldDesc>\n");
		ret.append(str_tab).append("<DataType>").append(nvl(dataType)).append("</DataType>\n");
		ret.append(str_tab).append("<DataLen>").append(dataLen).append("</DataLen>\n");
		ret.append(str_tab).append("<Precision>").append(precision).append("</Precision>\n");
		ret.append(str_tab).append("<Null>").append(ifNull).append("</Null>\n");
		ret.append(str_tab).append("<Default>").append(nvl(isDefault)).append("</Default>\n");
		ret.append(str_tab).append("<FieldRemark>").append(XMLProperties.prepareXml(nvl(fieldRemark))).append("</FieldRemark>\n");
		return ret.toString();
	}

}