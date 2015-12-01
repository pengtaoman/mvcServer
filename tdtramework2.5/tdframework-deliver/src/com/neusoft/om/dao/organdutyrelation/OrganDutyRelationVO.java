package com.neusoft.om.dao.organdutyrelation; 

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
 * Date: 2004-12-16
 * @author ren.hui@neusoft.com
 * @version
 */

public class OrganDutyRelationVO extends BaseVO { 
	private	String	organId;	//��֯��������
	private	int	dutyId;	//ְ�����
	private	int	parentDutyId;	//�ϼ�ְ�����

	/**
		�յĹ��췽��
	*/
	public OrganDutyRelationVO(){

	}
	/**
		ͨ������ֵ����һ������
	*/
	public OrganDutyRelationVO(String organId, int dutyId, int parentDutyId){

	}
	/**
		ͨ��һ�����ж�����һ������
	*/
	public OrganDutyRelationVO(OrganDutyRelationVO other){
		if(this != other) {
			this.organId = other.organId;
			this.dutyId = other.dutyId;
			this.parentDutyId = other.parentDutyId;

		}
	}
	/** 
		��ֵ����
	*/
	private String nvl(String str) {
		return str==null?"":str;
	}

	/**
		������֯��������
	*/
	public void setOrganId(String organId) {
		this.organId = organId;
	}
	/**
		��ȡ��֯��������
	*/
	public String getOrganId() {
		return (this.organId);
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
		��SQL�Ľ������������
	*/
	public void setAttribute(ResultSet resultSet) throws SQLException {
		ResultSetMetaData metaData = resultSet.getMetaData();

		for(int i=1;i<=metaData.getColumnCount();i++) { 

			String columnName = metaData.getColumnName(i).toLowerCase();

			if(columnName.intern()=="f_organ_id".intern())
				organId = resultSet.getString(i);
			else if(columnName.intern()=="f_duty_id".intern())
				dutyId = resultSet.getInt(i);
			else if(columnName.intern()=="f_parent_duty_id".intern())
				parentDutyId = resultSet.getInt(i);
		}

	}

	/**
	* ͨ��MAP��ʼ����Ϣ
	*/
	public void setAttribute(java.util.HashMap map)throws NumberFormatException {
		organId = NullProcessUtil.nvlToString(
			map.get("organId"),"");
		dutyId = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("dutyId"), "-10"));
		parentDutyId = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("parentDutyId"), "-10"));
	}

	/**
		ת�����ַ���
	*/
	public String toString(int tabs) {
		StringBuffer ret = new StringBuffer();
		String str_tab = StringUtil.tabs(tabs);
		ret.append("<OrganId>").append(nvl(organId)).append("</OrganId>\n");
		ret.append(str_tab).append("<DutyId>").append(dutyId).append("</DutyId>\n");
		ret.append(str_tab).append("<ParentDutyId>").append(parentDutyId).append("</ParentDutyId>\n");
		return ret.toString();
	}

}