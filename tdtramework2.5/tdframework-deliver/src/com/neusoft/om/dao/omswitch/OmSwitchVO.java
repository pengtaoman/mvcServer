package com.neusoft.om.dao.omswitch;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.BaseVO;
import com.neusoft.tdframework.common.util.StringUtil;
import com.neusoft.tdframework.common.util.XMLProperties;

/**
 * @author renh
 *
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
public class OmSwitchVO extends BaseVO {
	
	private	String	paraName;	//��������
	private	int	paraControl;	//1:���� 0 �ر�
	private	String	paraValue;	//����ֵ
	private	String	paraDesc;	//��������

	/**
		�յĹ��췽��
	*/
	public OmSwitchVO(){

	}
	/**
		ͨ������ֵ����һ������
	*/
	public OmSwitchVO(String paraName, int paraControl, String paraValue, String paraDesc){

	}
	/**
		ͨ��һ�����ж�����һ������
	*/
	public OmSwitchVO(OmSwitchVO other){
		if(this != other) {
			this.paraName = other.paraName;
			this.paraControl = other.paraControl;
			this.paraValue = other.paraValue;
			this.paraDesc = other.paraDesc;

		}
	}
	/** 
		��ֵ����
	*/
	private String nvl(String str) {
		return str==null?"":str;
	}

	/**
		���ò�������
	*/
	public void setParaName(String paraName) {
		this.paraName = paraName;
	}
	/**
		��ȡ��������
	*/
	public String getParaName() {
		return XMLProperties.prepareXml(this.paraName);
	}
	/**
		����1:���� 0 �ر�
	*/
	public void setParaControl(int paraControl) {
		this.paraControl = paraControl;
	}
	/**
		��ȡ1:���� 0 �ر�
	*/
	public int getParaControl() {
		return (this.paraControl);
	}
	/**
		���ò���ֵ
	*/
	public void setParaValue(String paraValue) {
		this.paraValue = paraValue;
	}
	/**
		��ȡ����ֵ
	*/
	public String getParaValue() {
		return (this.paraValue);
	}
	/**
		���ò�������
	*/
	public void setParaDesc(String paraDesc) {
		this.paraDesc = paraDesc;
	}
	/**
		��ȡ��������
	*/
	public String getParaDesc() {
		return XMLProperties.prepareXml(this.paraDesc);
	}

	/**
		��SQL�Ľ������������
	*/
	public void setAttribute(ResultSet resultSet) throws SQLException {
		ResultSetMetaData metaData = resultSet.getMetaData();

		for(int i=1;i<=metaData.getColumnCount();i++) { 

			String columnName = metaData.getColumnName(i).toLowerCase();

			if(columnName.intern()=="f_para_name".intern())
				paraName = resultSet.getString(i);
			else if(columnName.intern()=="f_para_control".intern())
				paraControl = resultSet.getInt(i);
			else if(columnName.intern()=="f_para_value".intern())
				paraValue = resultSet.getString(i);
			else if(columnName.intern()=="f_para_desc".intern())
				paraDesc = resultSet.getString(i);
		}

	}

	/**
		ת�����ַ���
	*/
	public String toString(int tabs) {
		StringBuffer ret = new StringBuffer();
		String str_tab = StringUtil.tabs(tabs);
		ret.append("<ParaName>").append(XMLProperties.prepareXml(nvl(paraName))).append("</ParaName>\n");
		ret.append(str_tab).append("<ParaControl>").append(paraControl).append("</ParaControl>\n");
		ret.append(str_tab).append("<ParaValue>").append(nvl(paraValue)).append("</ParaValue>\n");
		ret.append(str_tab).append("<ParaDesc>").append(XMLProperties.prepareXml(nvl(paraDesc))).append("</ParaDesc>\n");
		return ret.toString();
	}

}
