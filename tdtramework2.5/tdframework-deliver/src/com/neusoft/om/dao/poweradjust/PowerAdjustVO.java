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
	private	String	employeeId;	//ְԱ����
	private	String	menuId;	//�˵�����
	private	String	systemId;	//ϵͳ����
	private	int	adminAdjust;	//1:����Ȩ��2.����Ȩ��
	private	int	execAdjust;	//1:����Ȩ��2.����Ȩ��

	/**
		�յĹ��췽��
	*/
	public PowerAdjustVO(){

	}
	/**
		ͨ������ֵ����һ������
	*/
	public PowerAdjustVO(String employeeId, String menuId, String systemId, int adminAdjust, int execAdjust){

	}
	/**
		ͨ��һ�����ж�����һ������
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
		��ֵ����
	*/
	private String nvl(String str) {
		return str==null?"":str;
	}

	/**
		����ְԱ����
	*/
	public void setEmployeeId(String employeeId) {
		this.employeeId = employeeId;
	}
	/**
		��ȡְԱ����
	*/
	public String getEmployeeId() {
		return (this.employeeId);
	}
	/**
		���ò˵�����
	*/
	public void setMenuId(String menuId) {
		this.menuId = menuId;
	}
	/**
		��ȡ�˵�����
	*/
	public String getMenuId() {
		return (this.menuId);
	}
	/**
		����ϵͳ����
	*/
	public void setSystemId(String systemId) {
		this.systemId = systemId;
	}
	/**
		��ȡϵͳ����
	*/
	public String getSystemId() {
		return (this.systemId);
	}
	/**
		����1:����Ȩ��
2.����Ȩ��
	*/
	public void setAdminAdjust(int adminAdjust) {
		this.adminAdjust = adminAdjust;
	}
	/**
		��ȡ1:����Ȩ��
2.����Ȩ��
	*/
	public int getAdminAdjust() {
		return (this.adminAdjust);
	}
	/**
		����1:����Ȩ��
2.����Ȩ��
	*/
	public void setExecAdjust(int execAdjust) {
		this.execAdjust = execAdjust;
	}
	/**
		��ȡ1:����Ȩ��
2.����Ȩ��
	*/
	public int getExecAdjust() {
		return (this.execAdjust);
	}

	/**
		��SQL�Ľ������������
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
	* �������ַ���ת����Int
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
	* �������ַ���ת����Float
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
	* ͨ��MAP��ʼ����Ϣ
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
		ת�����ַ���
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