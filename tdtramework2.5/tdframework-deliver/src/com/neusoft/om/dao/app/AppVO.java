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

public class AppVO extends BaseVO { 
 	private	int	appId;	//Ӧ�ñ���
	private	String	appName;	//Ӧ������
	private	String	desc;	//����

	/**
		�յĹ��췽��
	*/
	public AppVO(){

	}
	/**
		ͨ������ֵ����һ������
	*/
	public AppVO(int appId, String appName, String desc){

	}
	/**
		ͨ��һ�����ж�����һ������
	*/
	public AppVO(AppVO other){
		if(this != other) {
			this.appId = other.appId;
			this.appName = other.appName;
			this.desc = other.desc;

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
		����Ӧ������
	*/
	public void setAppName(String appName) {
		this.appName = appName;
	}
	/**
		��ȡӦ������
	*/
	public String getAppName() {
		return (this.appName);
	}
	/**
		��������
	*/
	public void setDesc(String desc) {
		this.desc = desc;
	}
	/**
		��ȡ����
	*/
	public String getDesc() {
		return (this.desc);
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
			else if(columnName.intern()=="f_app_name".intern())
				appName = resultSet.getString(i);
			else if(columnName.intern()=="f_desc".intern())
				desc = resultSet.getString(i);
		}

	}

	/**
	* ͨ��MAP��ʼ����Ϣ
	*/
	public void setAttribute(java.util.HashMap map)throws NumberFormatException {
		appId = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("appId"), "-10"));
		appName = NullProcessUtil.nvlToString(
			map.get("appName"),"");
		desc = NullProcessUtil.nvlToString(
			map.get("desc"),"");
	}

	/**
		ת�����ַ���
	*/
	public String toString(int tabs) {
		StringBuffer ret = new StringBuffer();
		String str_tab = StringUtil.tabs(tabs);
		ret.append("<appId>").append(appId).append("</appId>\n");
		ret.append(str_tab).append("<appName>").append(nvl(appName)).append("</appName>\n");
		ret.append(str_tab).append("<desc>").append(nvl(desc)).append("</desc>\n");
		return ret.toString();
	}

}