package com.neusoft.om.dao.dutyrolerelation; 

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.BaseVO;
import com.neusoft.tdframework.common.util.StringUtil;

/**
 * Title: DutyRoleRelationVO
 * Description: 
 * Company: neusoft
 * Date: 2004-12-07
 * @author ren.hui@neusoft.com
 * @version 
 */

public class DutyRoleRelationVO extends BaseVO { 
	private	int	dutyId;	//ְ�����
	private	int	roleId;	//��ɫ����

	/**
		�յĹ��췽��
	*/
	public DutyRoleRelationVO(){

	}
	/**
		ͨ������ֵ����һ������
	*/
	public DutyRoleRelationVO(int dutyId, int roleId){

	}
	/**
		ͨ��һ�����ж�����һ������
	*/
	public DutyRoleRelationVO(DutyRoleRelationVO other){
		if(this != other) {
			this.dutyId = other.dutyId;
			this.roleId = other.roleId;

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
		��SQL�Ľ������������
	*/
	public void setAttribute(ResultSet resultSet) throws SQLException {
		ResultSetMetaData metaData = resultSet.getMetaData();

		for(int i=1;i<=metaData.getColumnCount();i++) { 

			String columnName = metaData.getColumnName(i).toLowerCase();

			if(columnName.intern()=="f_duty_id".intern())
				dutyId = resultSet.getInt(i);
			else if(columnName.intern()=="f_role_id".intern())
				roleId = resultSet.getInt(i);
		}

	}

	/**
		ת�����ַ���
	*/
	public String toString(int tabs) {
		StringBuffer ret = new StringBuffer();
		String str_tab = StringUtil.tabs(tabs);
		ret.append("<DutyId>").append(dutyId).append("</DutyId>\n");
		ret.append(str_tab).append("<RoleId>").append(roleId).append("</RoleId>\n");
		return ret.toString();
	}

}