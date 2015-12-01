package com.neusoft.om.dao.funcrole;

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
 * Date: 2004-12-17
 * @author ren.hui@neusoft.com
 * @version
 */

public class FuncRoleVO extends BaseVO { 
	private	int	roleId;	//��ɫ����
	private	String	menuId;	//�˵�����
	private	int	adminStatus;	//1.��0.��
	private	int	execStatus;	//1.��0.��

	/**
		�յĹ��췽��
	*/
	public FuncRoleVO(){

	}
	/**
		ͨ������ֵ����һ������
	*/
	public FuncRoleVO(int roleId, String menuId, int adminStatus, int execStatus){

	}
	/**
		ͨ��һ�����ж�����һ������
	*/
	public FuncRoleVO(FuncRoleVO other){
		if(this != other) {
			this.roleId = other.roleId;
			this.menuId = other.menuId;
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
			else if(columnName.intern()=="f_menu_id".intern())
				menuId = resultSet.getString(i);
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
			map.get("roleId"), "-1"));
		menuId = NullProcessUtil.nvlToString(
			map.get("menuId"),"");
		adminStatus = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("adminStatus"), "0"));
		execStatus = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("execStatus"), "0"));
	}

	/**
		ת�����ַ���
	*/
	public String toString(int tabs) {
		StringBuffer ret = new StringBuffer();
		String str_tab = StringUtil.tabs(tabs);
		ret.append("<RoleId>").append(roleId).append("</RoleId>\n");
		ret.append(str_tab).append("<MenuId>").append(nvl(menuId)).append("</MenuId>\n");
		ret.append(str_tab).append("<AdminStatus>").append(adminStatus).append("</AdminStatus>\n");
		ret.append(str_tab).append("<ExecStatus>").append(execStatus).append("</ExecStatus>\n");
		return ret.toString();
	}

}