/*
 * �������� 2006-7-12
 *
 * TODO Ҫ���Ĵ����ɵ��ļ���ģ�壬��ת��
 * ���� �� ��ѡ�� �� Java �� ������ʽ �� ����ģ��
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
 	private	String	employeeId;	//ְԱ����
	private	int	paramRoleId;	//������ɫ����
	private	int	usableFlag;	//�Ƿ����ʹ��Ȩ 0��û��  1����
	private	int	adminFlag;	//�Ƿ���й���Ȩ 0��û��  1����

	/**
		�յĹ��췽��
	*/
	public EmployeeParamRoleRelationVO(){

	}
	/**
		ͨ������ֵ����һ������
	*/
	public EmployeeParamRoleRelationVO(String employeeId, int paramRoleId, int usableFlag, int adminFlag){

	}
	/**
		ͨ��һ�����ж�����һ������
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
		���ò�����ɫ����
	*/
	public void setParamRoleId(int paramRoleId) {
		this.paramRoleId = paramRoleId;
	}
	/**
		��ȡ������ɫ����
	*/
	public int getParamRoleId() {
		return (this.paramRoleId);
	}
	/**
		�����Ƿ����ʹ��Ȩ 0��û��  1����
	*/
	public void setUsableFlag(int usableFlag) {
		this.usableFlag = usableFlag;
	}
	/**
		��ȡ�Ƿ����ʹ��Ȩ 0��û��  1����
	*/
	public int getUsableFlag() {
		return (this.usableFlag);
	}
	/**
		�����Ƿ���й���Ȩ 0��û��  1����
	*/
	public void setAdminFlag(int adminFlag) {
		this.adminFlag = adminFlag;
	}
	/**
		��ȡ�Ƿ���й���Ȩ 0��û��  1����
	*/
	public int getAdminFlag() {
		return (this.adminFlag);
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
			else if(columnName.intern()=="f_param_role_id".intern())
				paramRoleId = resultSet.getInt(i);
			else if(columnName.intern()=="f_usable_flag".intern())
				usableFlag = resultSet.getInt(i);
			else if(columnName.intern()=="f_admin_flag".intern())
				adminFlag = resultSet.getInt(i);
		}

	}

	/**
	* ͨ��MAP��ʼ����Ϣ
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
		ת�����ַ���
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
