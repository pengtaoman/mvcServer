package com.neusoft.om.dao.poweradjust;

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
 * Date: 2005-03-08
 * @author ren.hui@neusoft.com
 * @version
 */

public class PowerAdjustVO extends BaseVO { 
	private	String	employeeId;	//职员编码
	private	String	menuId;	//菜单编码
	private	String	systemId;	//系统编码
	private	int	adminAdjust;	//1:增加权限2.减少权限
	private	int	execAdjust;	//1:增加权限2.减少权限

	/**
		空的构造方法
	*/
	public PowerAdjustVO(){

	}
	/**
		通过属性值构造一个对象
	*/
	public PowerAdjustVO(String employeeId, String menuId, String systemId, int adminAdjust, int execAdjust){

	}
	/**
		通过一个已有对象构造一个对象
	*/
	public PowerAdjustVO(PowerAdjustVO other){
		if(this != other) {
			this.employeeId = other.employeeId;
			this.menuId = other.menuId;
			this.systemId = other.systemId;
			this.adminAdjust = other.adminAdjust;
			this.execAdjust = other.execAdjust;

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
		设置菜单编码
	*/
	public void setMenuId(String menuId) {
		this.menuId = menuId;
	}
	/**
		获取菜单编码
	*/
	public String getMenuId() {
		return (this.menuId);
	}
	/**
		设置系统编码
	*/
	public void setSystemId(String systemId) {
		this.systemId = systemId;
	}
	/**
		获取系统编码
	*/
	public String getSystemId() {
		return (this.systemId);
	}
	/**
		设置1:增加权限
2.减少权限
	*/
	public void setAdminAdjust(int adminAdjust) {
		this.adminAdjust = adminAdjust;
	}
	/**
		获取1:增加权限
2.减少权限
	*/
	public int getAdminAdjust() {
		return (this.adminAdjust);
	}
	/**
		设置1:增加权限
2.减少权限
	*/
	public void setExecAdjust(int execAdjust) {
		this.execAdjust = execAdjust;
	}
	/**
		获取1:增加权限
2.减少权限
	*/
	public int getExecAdjust() {
		return (this.execAdjust);
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
			else if(columnName.intern()=="f_menu_id".intern())
				menuId = resultSet.getString(i);
			else if(columnName.intern()=="f_system_id".intern())
				systemId = resultSet.getString(i);
			else if(columnName.intern()=="f_admin_adjust".intern())
				adminAdjust = resultSet.getInt(i);
			else if(columnName.intern()=="f_exec_adjust".intern())
				execAdjust = resultSet.getInt(i);
		}

	}

	/**
	* 处理由字符串转换成Int
	* @param obj
	* @return
	*/
	private int parseIntFromString(Object obj){
		String str = NullProcessUtil.nvlToString(obj, "0");
		if("".equals(str)){
		return 0;
		}
	return Integer.parseInt(str);
	}


	/**
	* 处理由字符串转换成Float
	* @param obj
	* @return
	*/
	private float parseFloatFromString(Object obj){
		String str = NullProcessUtil.nvlToString(obj, "0");
		if("".equals(str)){
		return 0;
		}
	return Float.parseFloat(str);
	}


	/**
	* 通过MAP初始化信息
	*/
	public void setAttribute(java.util.HashMap map)throws NumberFormatException {
		employeeId = NullProcessUtil.nvlToString(
			map.get("EmployeeId"),"");
		menuId = NullProcessUtil.nvlToString(
			map.get("MenuId"),"");
		systemId = NullProcessUtil.nvlToString(
			map.get("SystemId"),"");
		adminAdjust = parseIntFromString(
			map.get("AdminAdjust"));
		execAdjust = parseIntFromString(
			map.get("ExecAdjust"));
	}

	/**
		转化成字符串
	*/
	public String toString(int tabs) {
		StringBuffer ret = new StringBuffer();
		String str_tab = StringUtil.tabs(tabs);
		ret.append("<EmployeeId>").append(nvl(employeeId)).append("</EmployeeId>\n");
		ret.append(str_tab).append("<MenuId>").append(nvl(menuId)).append("</MenuId>\n");
		ret.append(str_tab).append("<SystemId>").append(nvl(systemId)).append("</SystemId>\n");
		ret.append(str_tab).append("<AdminAdjust>").append(adminAdjust).append("</AdminAdjust>\n");
		ret.append(str_tab).append("<ExecAdjust>").append(execAdjust).append("</ExecAdjust>\n");
		return ret.toString();
	}

}