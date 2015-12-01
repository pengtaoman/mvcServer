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
	private	String	tableName;	//����
	private	String	tableAliasName;	//��ı�����Ĭ���������ͬ
	private	int	tableType;	//1.������
	private	String	tableDesc;	//����

	/**
		�յĹ��췽��
	*/
	public DataTableVO(){

	}
	/**
		ͨ������ֵ����һ������
	*/
	public DataTableVO(String tableName, String tableAliasName, int tableType, String tableDesc){

	}
	/**
		ͨ��һ�����ж�����һ������
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
		���ñ�ı�����Ĭ���������ͬ
	*/
	public void setTableAliasName(String tableAliasName) {
		this.tableAliasName = tableAliasName;
	}
	/**
		��ȡ��ı�����Ĭ���������ͬ
	*/
	public String getTableAliasName() {
		return XMLProperties.prepareXml(this.tableAliasName);
	}
	/**
		����1.������
	*/
	public void setTableType(int tableType) {
		this.tableType = tableType;
	}
	/**
		��ȡ1.������
	*/
	public int getTableType() {
		return (this.tableType);
	}
	/**
		��������
	*/
	public void setTableDesc(String tableDesc) {
		this.tableDesc = tableDesc;
	}
	/**
		��ȡ����
	*/
	public String getTableDesc() {
		return XMLProperties.prepareXml(this.tableDesc);
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
			else if(columnName.intern()=="f_table_alias_name".intern())
				tableAliasName = resultSet.getString(i);
			else if(columnName.intern()=="f_table_type".intern())
				tableType = resultSet.getInt(i);
			else if(columnName.intern()=="f_table_desc".intern())
				tableDesc = resultSet.getString(i);
		}

	}

	/**
	* ͨ��MAP��ʼ����Ϣ
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
		ת�����ַ���
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