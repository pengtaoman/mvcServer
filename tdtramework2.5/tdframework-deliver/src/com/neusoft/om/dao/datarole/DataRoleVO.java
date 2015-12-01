package com.neusoft.om.dao.datarole; 

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

public class DataRoleVO extends BaseVO { 
	private	int	roleId;	//��ɫ����
	private	String	tableName;	//����
	private	String	fieldList;	//��ʽΪ���������ո񣫱������������С�����Ϊ�ָ��
	private	String	expression;	//���ʽ
	private	String	expressionDesc;	//����
	private	int	adminStatus;	//1.��0.��
	private	int	execStatus;	//1.��0.��

	/**
		�յĹ��췽��
	*/
	public DataRoleVO(){

	}
	/**
		ͨ������ֵ����һ������
	*/
	public DataRoleVO(int roleId, String tableName, String fieldList, String expression, String expressionDesc, int adminStatus, int execStatus){

	}
	/**
		ͨ��һ�����ж�����һ������
	*/
	public DataRoleVO(DataRoleVO other){
		if(this != other) {
			this.roleId = other.roleId;
			this.tableName = other.tableName;
			this.fieldList = other.fieldList;
			this.expression = other.expression;
			this.expressionDesc = other.expressionDesc;
			this.adminStatus = other.adminStatus;
			this.execStatus = other.execStatus;

		}
	}
	/** 
		��ֵ����
	*/
	private String nvl(String str) {
		return str==null?"":str;
	}

	/**
		���ý�ɫ����
	*/
	public void setRoleId(int roleId) {
		this.roleId = roleId;
	}
	/**
		��ȡ��ɫ����
	*/
	public int getRoleId() {
		return (this.roleId);
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
		���ø�ʽΪ���������ո񣫱������������С�����Ϊ�ָ��
	*/
	public void setFieldList(String fieldList) {
		this.fieldList = fieldList;
	}
	/**
		��ȡ��ʽΪ���������ո񣫱������������С�����Ϊ�ָ��
	*/
	public String getFieldList() {
		return (this.fieldList);
	}
	/**
		���ñ��ʽ
	*/
	public void setExpression(String expression) {
		this.expression = expression;
	}
	/**
		��ȡ���ʽ
	*/
	public String getExpression() {
		return (this.expression);
	}
	/**
		��������
	*/
	public void setExpressionDesc(String expressionDesc) {
		this.expressionDesc = expressionDesc;
	}
	/**
		��ȡ����
	*/
	public String getExpressionDesc() {
		return XMLProperties.prepareXml(this.expressionDesc);
	}
	/**
		����1.��0.��
	*/
	public void setAdminStatus(int adminStatus) {
		this.adminStatus = adminStatus;
	}
	/**
		��ȡ1.��0.��
	*/
	public int getAdminStatus() {
		return (this.adminStatus);
	}
	/**
		����1.��0.��
	*/
	public void setExecStatus(int execStatus) {
		this.execStatus = execStatus;
	}
	/**
		��ȡ1.��0.��
	*/
	public int getExecStatus() {
		return (this.execStatus);
	}

	/**
		��SQL�Ľ������������
	*/
	public void setAttribute(ResultSet resultSet) throws SQLException {
		ResultSetMetaData metaData = resultSet.getMetaData();

		for(int i=1;i<=metaData.getColumnCount();i++) { 

			String columnName = metaData.getColumnName(i).toLowerCase();

			if(columnName.intern()=="f_role_id".intern())
				roleId = resultSet.getInt(i);
			else if(columnName.intern()=="f_table_name".intern())
				tableName = resultSet.getString(i);
			else if(columnName.intern()=="f_field_list".intern())
				fieldList = resultSet.getString(i);
			else if(columnName.intern()=="f_expression".intern())
				expression = resultSet.getString(i);
			else if(columnName.intern()=="f_expression_desc".intern())
				expressionDesc = resultSet.getString(i);
			else if(columnName.intern()=="f_admin_status".intern())
				adminStatus = resultSet.getInt(i);
			else if(columnName.intern()=="f_exec_status".intern())
				execStatus = resultSet.getInt(i);
		}

	}

	/**
	* ͨ��MAP��ʼ����Ϣ
	*/
	public void setAttribute(java.util.HashMap map)throws NumberFormatException {
		roleId = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("roleId"), "-10"));
		tableName = NullProcessUtil.nvlToString(
			map.get("tableName"),"");
		fieldList = NullProcessUtil.nvlToString(
			map.get("fieldList"),"");
		expression = NullProcessUtil.nvlToString(
			map.get("expression"),"");
		expressionDesc = NullProcessUtil.nvlToString(
			map.get("expressionDesc"),"");
		adminStatus = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("adminStatus"), "-10"));
		execStatus = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("execStatus"), "-10"));
	}

	/**
		ת�����ַ���
	*/
	public String toString(int tabs) {
		StringBuffer ret = new StringBuffer();
		String str_tab = StringUtil.tabs(tabs);
		ret.append("<roleId>").append(roleId).append("</roleId>\n");
		ret.append(str_tab).append("<tableName>").append(XMLProperties.prepareXml(nvl(tableName))).append("</tableName>\n");
		ret.append(str_tab).append("<fieldList>").append(nvl(fieldList)).append("</fieldList>\n");
		ret.append(str_tab).append("<expression>").append(nvl(expression)).append("</expression>\n");
		ret.append(str_tab).append("<expressionDesc>").append(XMLProperties.prepareXml(nvl(expressionDesc))).append("</expressionDesc>\n");
		ret.append(str_tab).append("<adminStatus>").append(adminStatus).append("</adminStatus>\n");
		ret.append(str_tab).append("<execStatus>").append(execStatus).append("</execStatus>\n");
		return ret.toString();
	}

}