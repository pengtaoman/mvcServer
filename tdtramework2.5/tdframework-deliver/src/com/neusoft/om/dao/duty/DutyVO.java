package com.neusoft.om.dao.duty; 

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.BaseVO;
import com.neusoft.tdframework.common.util.NullProcessUtil;
import com.neusoft.tdframework.common.util.StringUtil;
import com.neusoft.tdframework.common.util.XMLProperties;

/**
 * Title: ��װְ����Ϣ
 * Description: 
 * Company: neusoft
 * Date: 2004-12-06
 * @author ren.hui@neusoft.com
 * @version 
 */

public class DutyVO extends BaseVO{ 
	private	int	dutyId;	//ְ�����
	private	int	parentDutyId;	//�ϼ�ְ�����
	private	String	dutyName;	//ְ������
	private	int	organKind;	//ְ�����ͣ�����������֯������
	private	int	dutyStatus;	//1.����2.����ͨ������ʽ3.����δͨ��4.����
	private	int	innerDuty;	//1.��0.��
	private	String	dutyDesc;	//����
	//��dutyʵ������
	private	int	dutyLevel;	//����

	/**
		�յĹ��췽��
	*/
	public DutyVO(){

	}
	/**
		ͨ������ֵ����һ������
	*/
	public DutyVO(int dutyId, int parentDutyId, String dutyName, int organKind, int dutyStatus, int innerDuty, String dutyDesc,int dutyLevel){

	}
	/**
		ͨ��һ�����ж�����һ������
	*/
	public DutyVO(DutyVO other){
		if(this != other) {
			this.dutyId = other.dutyId;
			this.parentDutyId = other.parentDutyId;
			this.dutyName = other.dutyName;
			this.organKind = other.organKind;
			this.dutyStatus = other.dutyStatus;
			this.innerDuty = other.innerDuty;
			this.dutyDesc = other.dutyDesc;
			this.dutyLevel = other.dutyLevel;
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
		�����ϼ�ְ�����
	*/
	public void setParentDutyId(int parentDutyId) {
		this.parentDutyId = parentDutyId;
	}
	/**
		��ȡ�ϼ�ְ�����
	*/
	public int getParentDutyId() {
		return (this.parentDutyId);
	}
	/**
		����ְ������
	*/
	public void setDutyName(String dutyName) {
		this.dutyName = dutyName;
	}
	/**
		��ȡְ������
	*/
	public String getDutyName() {
		return XMLProperties.prepareXml(this.dutyName);
		
	}
	/**
		����ְ�����ͣ�����������֯������
	*/
	public void setOrganKind(int organKind) {
		this.organKind = organKind;
	}
	/**
		��ȡְ�����ͣ�����������֯������
	*/
	public int getOrganKind() {
		return (this.organKind);
	}
	/**
		����1.����2.����ͨ������ʽ3.����δͨ��4.����
	*/
	public void setDutyStatus(int dutyStatus) {
		this.dutyStatus = dutyStatus;
	}
	/**
		��ȡ1.����2.����ͨ������ʽ3.����δͨ��4.����
	*/
	public int getDutyStatus() {
		return (this.dutyStatus);
	}
	/**
		����1.��0.��
	*/
	public void setInnerDuty(int innerDuty) {
		this.innerDuty = innerDuty;
	}
	/**
		��ȡ1.��0.��
	*/
	public int getInnerDuty() {
		return (this.innerDuty);
	}
	/**
		��������
	*/
	public void setDutyDesc(String dutyDesc) {
		this.dutyDesc = dutyDesc;
	}
	/**
		��ȡ����
	*/
	public String getDutyDesc() {
		return XMLProperties.prepareXml(this.dutyDesc);
	}
	/**
	 	����dutyLevel
	 */
	public void setDutyLevel(int dutyLevel) {
		this.dutyLevel = dutyLevel;
	}
	/**
		��ȡdutyLevel
	*/
	public int getDutyLevel(){
		return(this.dutyLevel);
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
			else if(columnName.intern()=="f_parent_duty_id".intern())
				parentDutyId = resultSet.getInt(i);
			else if(columnName.intern()=="f_duty_name".intern())
				dutyName = resultSet.getString(i);
			else if(columnName.intern()=="f_organ_kind".intern())
				organKind = resultSet.getInt(i);
			else if(columnName.intern()=="f_duty_status".intern())
				dutyStatus = resultSet.getInt(i);
			else if(columnName.intern()=="f_inner_duty".intern())
				innerDuty = resultSet.getInt(i);
			else if(columnName.intern()=="f_duty_desc".intern())
				dutyDesc = resultSet.getString(i);
			else if(columnName.intern()=="f_duty_level".intern())
				dutyLevel = resultSet.getInt(i);
		}

	}
	
	/**
	* ͨ��MAP��ʼ����Ϣ
	*/
	public void setAttribute(java.util.HashMap map)throws NumberFormatException {
		dutyId = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("dutyId"), "-1"));
		parentDutyId = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("parentDutyId"), "-1"));
		dutyName = NullProcessUtil.nvlToString(
			map.get("dutyName"),"");
		organKind = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("organKind"), "-1"));
		dutyStatus = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("dutyStatus"), "4"));
		innerDuty = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("innerDuty"), "1"));
		dutyDesc = NullProcessUtil.nvlToString(
			map.get("dutyDesc"),"");
		dutyLevel = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("dutyLevel"), "-1"));
	}

	/**
		ת�����ַ���
	*/
	public String toString(int tabs) {
		StringBuffer ret = new StringBuffer();
		String str_tab = StringUtil.tabs(tabs);
		ret.append("<DutyId>").append(dutyId).append("</DutyId>\n");
		ret.append(str_tab).append("<ParentDutyId>").append(parentDutyId).append("</ParentDutyId>\n");
		ret.append(str_tab).append("<DutyName>").append(XMLProperties.prepareXml(nvl(dutyName))).append("</DutyName>\n");
		ret.append(str_tab).append("<OrganKind>").append(organKind).append("</OrganKind>\n");
		ret.append(str_tab).append("<DutyStatus>").append(dutyStatus).append("</DutyStatus>\n");
		ret.append(str_tab).append("<InnerDuty>").append(innerDuty).append("</InnerDuty>\n");
		ret.append(str_tab).append("<DutyDesc>").append(XMLProperties.prepareXml(nvl(dutyDesc))).append("</DutyDesc>\n");
		ret.append(str_tab).append("<DutyLevel>").append(dutyLevel).append("</DutyLevel>\n");
		return ret.toString();
	}

}