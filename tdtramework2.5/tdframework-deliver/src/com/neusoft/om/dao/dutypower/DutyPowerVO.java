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
 	private	int	dutyId;	//ְ�����
	private	String	menuId;	//�˵�����
	private	int	adminStatus;	//�Ƿ����Ȩ
	private	int	execStatus;	//�Ƿ��ִ��

	/**
		�յĹ��췽��
	*/
	public DutyPowerVO(){

	}
	/**
		ͨ������ֵ����һ������
	*/
	public DutyPowerVO(int dutyId, String menuId, int adminStatus, int execStatus){

	}
	/**
		ͨ��һ�����ж�����һ������
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
		��ֵ����
	*/
	private String nvl(String str) {
		return str==null?"":str;
	}

	/**
		����ְ�����
	*/
	public void setDutyId(int dutyId) {
		this.dutyId = dutyId;
	}
	/**
		��ȡְ�����
	*/
	public int getDutyId() {
		return (this.dutyId);
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
		�����Ƿ����Ȩ
	*/
	public void setAdminStatus(int adminStatus) {
		this.adminStatus = adminStatus;
	}
	/**
		��ȡ�Ƿ����Ȩ
	*/
	public int getAdminStatus() {
		return (this.adminStatus);
	}
	/**
		�����Ƿ��ִ��
	*/
	public void setExecStatus(int execStatus) {
		this.execStatus = execStatus;
	}
	/**
		��ȡ�Ƿ��ִ��
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
		String str = NullProcessUtil.nvlToString(obj, "");
		if("".equals(str)){
			return 0;
		}
	return Float.parseFloat(str);		
	}


	/**
	* ͨ��MAP��ʼ����Ϣ
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
		ת�����ַ���
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