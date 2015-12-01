/*
 * 创建日期 2006-7-12
 *
 * TODO 要更改此生成的文件的模板，请转至
 * 窗口 － 首选项 － Java － 代码样式 － 代码模板
 */
package com.neusoft.om.dao.employeeparamrolerelation;

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
 * Date: 2006-07-12
 * @author ren.hui@neusoft.com
 * @version
 */

public class EmployeeParamRoleRelationVO extends BaseVO { 
 	private	String	employeeId;	//职员编码
	private	int	paramRoleId;	//参数角色编码
	private	int	usableFlag;	//是否具有使用权 0：没有  1：有
	private	int	adminFlag;	//是否具有管理权 0：没有  1：有

	/**
		空的构造方法
	*/
	public EmployeeParamRoleRelationVO(){

	}
	/**
		通过属性值构造一个对象
	*/
	public EmployeeParamRoleRelationVO(String employeeId, int paramRoleId, int usableFlag, int adminFlag){

	}
	/**
		通过一个已有对象构造一个对象
	*/
	public EmployeeParamRoleRelationVO(EmployeeParamRoleRelationVO other){
		if(this != other) {
			this.employeeId = other.employeeId;
			this.paramRoleId = other.paramRoleId;
			this.usableFlag = other.usableFlag;
			this.adminFlag = other.adminFlag;

		}
	}
	/** 
		空值处理
	*/
	private String nvl(String str) {
		return str==null?"":str;
	}

	/**
		设置职员编码
	*/
	public void setEmployeeId(String employeeId) {
		this.employeeId = employeeId;
	}
	/**
		获取职员编码
	*/
	public String getEmployeeId() {
		return (this.employeeId);
	}
	/**
		设置参数角色编码
	*/
	public void setParamRoleId(int paramRoleId) {
		this.paramRoleId = paramRoleId;
	}
	/**
		获取参数角色编码
	*/
	public int getParamRoleId() {
		return (this.paramRoleId);
	}
	/**
		设置是否具有使用权 0：没有  1：有
	*/
	public void setUsableFlag(int usableFlag) {
		this.usableFlag = usableFlag;
	}
	/**
		获取是否具有使用权 0：没有  1：有
	*/
	public int getUsableFlag() {
		return (this.usableFlag);
	}
	/**
		设置是否具有管理权 0：没有  1：有
	*/
	public void setAdminFlag(int adminFlag) {
		this.adminFlag = adminFlag;
	}
	/**
		获取是否具有管理权 0：没有  1：有
	*/
	public int getAdminFlag() {
		return (this.adminFlag);
	}

	/**
		以SQL的结果集设置数据
	*/
	public void setAttribute(ResultSet resultSet) throws SQLException {
		ResultSetMetaData metaData = resultSet.getMetaData();

		for(int i=1;i<=metaData.getColumnCount();i++) { 

			String columnName = metaData.getColumnName(i).toLowerCase();

			if(columnName.intern()=="f_employee_id".intern())
				employeeId = resultSet.getString(i);
			else if(columnName.intern()=="f_param_role_id".intern())
				paramRoleId = resultSet.getInt(i);
			else if(columnName.intern()=="f_usable_flag".intern())
				usableFlag = resultSet.getInt(i);
			else if(columnName.intern()=="f_admin_flag".intern())
				adminFlag = resultSet.getInt(i);
		}

	}

	/**
	* 通过MAP初始化信息
	*/
	public void setAttribute(java.util.HashMap map)throws NumberFormatException {
		employeeId = NullProcessUtil.nvlToString(
			map.get("employeeId"),"");
		paramRoleId = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("paramRoleId"), "-10"));
		usableFlag = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("usableFlag"), "-10"));
		adminFlag = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("adminFlag"), "-10"));
	}

	/**
		转化成字符串
	*/
	public String toString(int tabs) {
		StringBuffer ret = new StringBuffer();
		String str_tab = StringUtil.tabs(tabs);
		ret.append("<employeeId>").append(nvl(employeeId)).append("</employeeId>\n");
		ret.append(str_tab).append("<paramRoleId>").append(paramRoleId).append("</paramRoleId>\n");
		ret.append(str_tab).append("<usableFlag>").append(usableFlag).append("</usableFlag>\n");
		ret.append(str_tab).append("<adminFlag>").append(adminFlag).append("</adminFlag>\n");
		return ret.toString();
	}

}
