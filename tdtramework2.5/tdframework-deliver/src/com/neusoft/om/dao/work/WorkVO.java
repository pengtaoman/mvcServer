package com.neusoft.om.dao.work; 

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.BaseVO;

import com.neusoft.tdframework.common.util.StringUtil;
import com.neusoft.tdframework.common.util.XMLProperties;

/**
 * Title: ������
 * Description: 
 * Company: neusoft
 * Date: 2004-12-14
 * @author ren.hui@neusoft.com
 * @version 
 */
public class WorkVO extends BaseVO { 
	private	String	systemId;	//ϵͳ����
	private	String	workMenuId;	//�������˵�����
	private	String	workMenuName;	//�������˵���
	private	int	workMenuOrder;	//�������˵�˳��
	private	String	workPageLink;	//����

	/**
		�յĹ��췽��
	*/
	public WorkVO(){

	}
	/**
		ͨ������ֵ����һ������
	*/
	public WorkVO(String systemId, String workMenuId, String workMenuName, int workMenuOrder, String workPageLink){

	}
	/**
		ͨ��һ�����ж�����һ������
	*/
	public WorkVO(WorkVO other){
		if(this != other) {
			this.systemId = other.systemId;
			this.workMenuId = other.workMenuId;
			this.workMenuName = other.workMenuName;
			this.workMenuOrder = other.workMenuOrder;
			this.workPageLink = other.workPageLink;

		}
	}
	/** 
		��ֵ����
	*/
	private String nvl(String str) {
		return str==null?"":str;
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
		���ù������˵�����
	*/
	public void setWorkMenuId(String workMenuId) {
		this.workMenuId = workMenuId;
	}
	/**
		��ȡ�������˵�����
	*/
	public String getWorkMenuId() {
		return (this.workMenuId);
	}
	/**
		���ù������˵���
	*/
	public void setWorkMenuName(String workMenuName) {
		this.workMenuName = workMenuName;
	}
	/**
		��ȡ�������˵���
	*/
	public String getWorkMenuName() {
		return XMLProperties.prepareXml(this.workMenuName);
	}
	/**
		���ù������˵�˳��
	*/
	public void setWorkMenuOrder(int workMenuOrder) {
		this.workMenuOrder = workMenuOrder;
	}
	/**
		��ȡ�������˵�˳��
	*/
	public int getWorkMenuOrder() {
		return (this.workMenuOrder);
	}
	/**
		��������
	*/
	public void setWorkPageLink(String workPageLink) {
		this.workPageLink = workPageLink;
	}
	/**
		��ȡ����
	*/
	public String getWorkPageLink() {
		return (this.workPageLink);
	}

	/**
		��SQL�Ľ������������
	*/
	public void setAttribute(ResultSet resultSet) throws SQLException {
		ResultSetMetaData metaData = resultSet.getMetaData();

		for(int i=1;i<=metaData.getColumnCount();i++) { 

			String columnName = metaData.getColumnName(i).toLowerCase();

			if(columnName.intern()=="f_system_id".intern())
				systemId = resultSet.getString(i);
			else if(columnName.intern()=="f_work_menu_id".intern())
				workMenuId = resultSet.getString(i);
			else if(columnName.intern()=="f_work_menu_name".intern())
				workMenuName = resultSet.getString(i);
			else if(columnName.intern()=="f_work_menu_order".intern())
				workMenuOrder = resultSet.getInt(i);
			else if(columnName.intern()=="f_work_page_link".intern())
				workPageLink = resultSet.getString(i);
		}

	}

	/**
		ת�����ַ���
	*/
	public String toString(int tabs) {
		StringBuffer ret = new StringBuffer();
		String str_tab = StringUtil.tabs(tabs);
		ret.append("<SystemId>").append(nvl(systemId)).append("</SystemId>\n");
		ret.append(str_tab).append("<WorkMenuId>").append(nvl(workMenuId)).append("</WorkMenuId>\n");
		ret.append(str_tab).append("<WorkMenuName>").append(XMLProperties.prepareXml(nvl(workMenuName))).append("</WorkMenuName>\n");
		ret.append(str_tab).append("<WorkMenuOrder>").append(workMenuOrder).append("</WorkMenuOrder>\n");
		ret.append(str_tab).append("<WorkPageLink>").append(nvl(workPageLink)).append("</WorkPageLink>\n");
		return ret.toString();
	}

}