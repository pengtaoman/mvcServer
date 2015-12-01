package com.neusoft.om.dao.app;
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
 * Date: 2006-11-24
 * @author zhaof@neusoft.com
 * @version
 */

public class AppRoleRelVO extends BaseVO { 
 	private	int	appId;	//Ӧ�ñ���
	private	int	roleId;	//��ɫ����

	/**
		�յĹ��췽��
	*/
	public AppRoleRelVO(){

	}
	/**
		ͨ������ֵ����һ������
	*/
	public AppRoleRelVO(int appId, int roleId){

	}
	/**
		ͨ��һ�����ж�����һ������
	*/
	public AppRoleRelVO(AppRoleRelVO other){
		if(this != other) {
			this.appId = other.appId;
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
		����Ӧ�ñ���
	*/
	public void setAppId(int appId) {
		this.appId = appId;
	}
	/**
		��ȡӦ�ñ���
	*/
	public int getAppId() {
		return (this.appId);
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

			if(columnName.intern()=="f_app_id".intern())
				appId = resultSet.getInt(i);
			else if(columnName.intern()=="f_role_id".intern())
				roleId = resultSet.getInt(i);
		}

	}

	/**
	* ͨ��MAP��ʼ����Ϣ
	*/
	public void setAttribute(java.util.HashMap map)throws NumberFormatException {
		appId = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("appId"), "-10"));
		roleId = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("roleId"), "-10"));
	}

	/**
		ת�����ַ���
	*/
	public String toString(int tabs) {
		StringBuffer ret = new StringBuffer();
		String str_tab = StringUtil.tabs(tabs);
		ret.append("<appId>").append(appId).append("</appId>\n");
		ret.append(str_tab).append("<roleId>").append(roleId).append("</roleId>\n");
		return ret.toString();
	}

}