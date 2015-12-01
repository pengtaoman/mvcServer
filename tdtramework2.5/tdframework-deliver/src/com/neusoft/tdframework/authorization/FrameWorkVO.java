package com.neusoft.tdframework.authorization; 

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.BaseVO;

/**
 * Title: ������
 * Description: 
 * Company: neusoft
 * Date: 2004-12-14
 * @author ren.hui@neusoft.com
 * @version 
 */
public class FrameWorkVO extends BaseVO { 
	private	String	systemId;	//ϵͳ����
	private	String	workMenuId;	//�������˵�����
	private	String	workMenuName;	//�������˵���
	private	int	workMenuOrder;	//�������˵�˳��
	private	String	workPageLink;	//����

	/**
		�յĹ��췽��
	*/
	public FrameWorkVO(){

	}
	/**
		ͨ������ֵ����һ������
	*/
	public FrameWorkVO(String systemId, String workMenuId, String workMenuName, int workMenuOrder, String workPageLink){

	}
	/**
		ͨ��һ�����ж�����һ������
	*/
	public FrameWorkVO(FrameWorkVO other){
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
		return (this.workMenuName);
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
	public String getXML() {
		StringBuffer ret = new StringBuffer();
		ret.append("<frameWork>\n");
		ret.append("<systemId>").append(nvl(systemId)).append("</systemId>\n");
		ret.append("<workMenuId>").append(nvl(workMenuId)).append("</workMenuId>\n");
		ret.append("<workMenuName>").append(nvl(workMenuName)).append("</workMenuName>\n");
		ret.append("<workMenuOrder>").append(workMenuOrder).append("</workMenuOrder>\n");
		ret.append("<workPageLink>").append(nvl(workPageLink)).append("</workPageLink>\n");
		ret.append("</frameWork>\n");
		return ret.toString();
	}

}