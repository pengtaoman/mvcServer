/*
 * Created on 2005-2-18
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.om.dao.dutypower;

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
 * Date: 2005-02-18
 * @author ren.hui@neusoft.com
 * @version
 */

public class DutyPowerVO extends BaseVO { 
 	private	int	dutyId;	//职务编码
	private	String	menuId;	//菜单编码
	private	int	adminStatus;	//是否可授权
	private	int	execStatus;	//是否可执行

	/**
		空的构造方法
	*/
	public DutyPowerVO(){

	}
	/**
		通过属性值构造一个对象
	*/
	public DutyPowerVO(int dutyId, String menuId, int adminStatus, int execStatus){

	}
	/**
		通过一个已有对象构造一个对象
	*/
	public DutyPowerVO(DutyPowerVO other){
		if(this != other) {
			this.dutyId = other.dutyId;
			this.menuId = other.menuId;
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
		设置职务编码
	*/
	public void setDutyId(int dutyId) {
		this.dutyId = dutyId;
	}
	/**
		获取职务编码
	*/
	public int getDutyId() {
		return (this.dutyId);
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
		设置是否可授权
	*/
	public void setAdminStatus(int adminStatus) {
		this.adminStatus = adminStatus;
	}
	/**
		获取是否可授权
	*/
	public int getAdminStatus() {
		return (this.adminStatus);
	}
	/**
		设置是否可执行
	*/
	public void setExecStatus(int execStatus) {
		this.execStatus = execStatus;
	}
	/**
		获取是否可执行
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

			if(columnName.intern()=="f_duty_id".intern())
				dutyId = resultSet.getInt(i);
			else if(columnName.intern()=="f_menu_id".intern())
				menuId = resultSet.getString(i);
			else if(columnName.intern()=="f_admin_status".intern())
				adminStatus = resultSet.getInt(i);
			else if(columnName.intern()=="f_exec_status".intern())
				execStatus = resultSet.getInt(i);
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
		String str = NullProcessUtil.nvlToString(obj, "");
		if("".equals(str)){
			return 0;
		}
	return Float.parseFloat(str);		
	}


	/**
	* 通过MAP初始化信息
	*/
	public void setAttribute(java.util.HashMap map)throws NumberFormatException {
		dutyId = parseIntFromString(
			map.get("DutyId"));
		menuId = NullProcessUtil.nvlToString(
			map.get("MenuId"),"");
		adminStatus = parseIntFromString(
			map.get("AdminStatus"));
		execStatus = parseIntFromString(
			map.get("ExecStatus"));
	}

	/**
		转化成字符串
	*/
	public String toString(int tabs) {
		StringBuffer ret = new StringBuffer();
		String str_tab = StringUtil.tabs(tabs);
		ret.append("<DutyId>").append(dutyId).append("</DutyId>\n");
		ret.append(str_tab).append("<MenuId>").append(nvl(menuId)).append("</MenuId>\n");
		ret.append(str_tab).append("<AdminStatus>").append(adminStatus).append("</AdminStatus>\n");
		ret.append(str_tab).append("<ExecStatus>").append(execStatus).append("</ExecStatus>\n");
		return ret.toString();
	}

}