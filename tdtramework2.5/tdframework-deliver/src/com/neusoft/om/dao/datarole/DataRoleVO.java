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
	private	int	roleId;	//角色编码
	private	String	tableName;	//表名
	private	String	fieldList;	//格式为：列名＋空格＋别名＋，。其中“，”为分割符
	private	String	expression;	//表达式
	private	String	expressionDesc;	//描述
	private	int	adminStatus;	//1.是0.否
	private	int	execStatus;	//1.是0.否

	/**
		空的构造方法
	*/
	public DataRoleVO(){

	}
	/**
		通过属性值构造一个对象
	*/
	public DataRoleVO(int roleId, String tableName, String fieldList, String expression, String expressionDesc, int adminStatus, int execStatus){

	}
	/**
		通过一个已有对象构造一个对象
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
		空值处理
	*/
	private String nvl(String str) {
		return str==null?"":str;
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
		设置格式为：列名＋空格＋别名＋，。其中“，”为分割符
	*/
	public void setFieldList(String fieldList) {
		this.fieldList = fieldList;
	}
	/**
		获取格式为：列名＋空格＋别名＋，。其中“，”为分割符
	*/
	public String getFieldList() {
		return (this.fieldList);
	}
	/**
		设置表达式
	*/
	public void setExpression(String expression) {
		this.expression = expression;
	}
	/**
		获取表达式
	*/
	public String getExpression() {
		return (this.expression);
	}
	/**
		设置描述
	*/
	public void setExpressionDesc(String expressionDesc) {
		this.expressionDesc = expressionDesc;
	}
	/**
		获取描述
	*/
	public String getExpressionDesc() {
		return XMLProperties.prepareXml(this.expressionDesc);
	}
	/**
		设置1.是0.否
	*/
	public void setAdminStatus(int adminStatus) {
		this.adminStatus = adminStatus;
	}
	/**
		获取1.是0.否
	*/
	public int getAdminStatus() {
		return (this.adminStatus);
	}
	/**
		设置1.是0.否
	*/
	public void setExecStatus(int execStatus) {
		this.execStatus = execStatus;
	}
	/**
		获取1.是0.否
	*/
	public int getExecStatus() {
		return (this.execStatus);
	}

	/**
		以SQL的结果集设置数据
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
	* 通过MAP初始化信息
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
		转化成字符串
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