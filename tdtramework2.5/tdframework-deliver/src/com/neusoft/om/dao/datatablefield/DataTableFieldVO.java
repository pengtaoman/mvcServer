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
	private	String	tableName;	//����
	private	String	fieldName;	//����
	private	String	fieldAliasName;	//������Ĭ�����ֶ�����ͬ
	private	String	fieldDesc;	//����
	private	String	dataType;	//��������
	private	int	dataLen;	//���ݳ���
	private	int	precision;	//���ݾ���
	private	int	ifNull;	//�Ƿ�Ϊ�գ�1���� 0����
	private	String	isDefault;	//Ĭ��ֵ
	private	String	fieldRemark;	//��ע

	/**
		�յĹ��췽��
	*/
	public DataTableFieldVO(){

	}
	/**
		ͨ������ֵ����һ������
	*/
	public DataTableFieldVO(String tableName, String fieldName, String fieldAliasName, String fieldDesc, String dataType, int dataLen, int precision, int ifNull, String isDefault, String fieldRemark){

	}
	/**
		ͨ��һ�����ж�����һ������
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
		��ֵ����
	*/
	private String nvl(String str) {
		return str==null?"":str;
	}

	/**
		���ñ���
	*/
	public void setTableName(String tableName) {
		this.tableName = tableName;
	}
	/**
		��ȡ����
	*/
	public String getTableName() {
		return XMLProperties.prepareXml(this.tableName);
	}
	/**
		��������
	*/
	public void setFieldName(String fieldName) {
		this.fieldName = fieldName;
	}
	/**
		��ȡ����
	*/
	public String getFieldName() {
		return XMLProperties.prepareXml(this.fieldName);
	}
	/**
		���ñ�����Ĭ�����ֶ�����ͬ
	*/
	public void setFieldAliasName(String fieldAliasName) {
		this.fieldAliasName = fieldAliasName;
	}
	/**
		��ȡ������Ĭ�����ֶ�����ͬ
	*/
	public String getFieldAliasName() {
		return (this.fieldAliasName);
	}
	/**
		��������
	*/
	public void setFieldDesc(String fieldDesc) {
		this.fieldDesc = fieldDesc;
	}
	/**
		��ȡ����
	*/
	public String getFieldDesc() {
		return XMLProperties.prepareXml(this.fieldDesc);
	}
	/**
		������������
	*/
	public void setDataType(String dataType) {
		this.dataType = dataType;
	}
	/**
		��ȡ��������
	*/
	public String getDataType() {
		return (this.dataType);
	}
	/**
		�������ݳ���
	*/
	public void setDataLen(int dataLen) {
		this.dataLen = dataLen;
	}
	/**
		��ȡ���ݳ���
	*/
	public int getDataLen() {
		return (this.dataLen);
	}
	/**
		�������ݾ���
	*/
	public void setPrecision(int precision) {
		this.precision = precision;
	}
	/**
		��ȡ���ݾ���
	*/
	public int getPrecision() {
		return (this.precision);
	}
	/**
		�����Ƿ�Ϊ�գ�1���� 0����
	*/
	public void setNull(int ifNull) {
		this.ifNull = ifNull;
	}
	/**
		��ȡ�Ƿ�Ϊ�գ�1���� 0����
	*/
	public int getNull() {
		return (this.ifNull);
	}
	/**
		����Ĭ��ֵ
	*/
	public void setDefault(String isDefault) {
		this.isDefault = isDefault;
	}
	/**
		��ȡĬ��ֵ
	*/
	public String getDefault() {
		return (this.isDefault);
	}
	/**
		���ñ�ע
	*/
	public void setFieldRemark(String fieldRemark) {
		this.fieldRemark = fieldRemark;
	}
	/**
		��ȡ��ע
	*/
	public String getFieldRemark() {
		return XMLProperties.prepareXml(this.fieldRemark);
	}

	/**
		��SQL�Ľ������������
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
	* ͨ��MAP��ʼ����Ϣ
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
		ת�����ַ���
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