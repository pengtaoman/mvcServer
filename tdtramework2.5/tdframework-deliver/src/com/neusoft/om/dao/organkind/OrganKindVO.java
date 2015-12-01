package com.neusoft.om.dao.organkind; 

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.BaseVO;
import com.neusoft.tdframework.common.util.NullProcessUtil;
import com.neusoft.tdframework.common.util.StringUtil;
import com.neusoft.tdframework.common.util.XMLProperties;

/**
 * Title:
 * Description:
 * Company: neusoft
 * Date: 2005-03-02
 * @author ren.hui@neusoft.com
 * @version
 */

public class OrganKindVO extends BaseVO { 
	private	int	organKind;	//���ͱ���
	private	int	areaLevel;	//��������
	private	String	kindDesc;	//��������
	private	int	parentOrganKind;	// 
	private	int	organKindLevel;	// 

	/**
		�յĹ��췽��
	*/
	public OrganKindVO(){

	}
	/**
		ͨ������ֵ����һ������
	*/
	public OrganKindVO(int organKind, int areaLevel, String kindDesc, int parentOrganKind, int organKindLevel){

	}
	/**
		ͨ��һ�����ж�����һ������
	*/
	public OrganKindVO(OrganKindVO other){
		if(this != other) {
			this.organKind = other.organKind;
			this.areaLevel = other.areaLevel;
			this.kindDesc = other.kindDesc;
			this.parentOrganKind = other.parentOrganKind;
			this.organKindLevel = other.organKindLevel;

		}
	}
	/** 
		��ֵ����
	*/
	private String nvl(String str) {
		return str==null?"":str;
	}

	/**
		�������ͱ���
	*/
	public void setOrganKind(int organKind) {
		this.organKind = organKind;
	}
	/**
		��ȡ���ͱ���
	*/
	public int getOrganKind() {
		return (this.organKind);
	}
	/**
		������������
	*/
	public void setAreaLevel(int areaLevel) {
		this.areaLevel = areaLevel;
	}
	/**
		��ȡ��������
	*/
	public int getAreaLevel() {
		return (this.areaLevel);
	}
	/**
		������������
	*/
	public void setKindDesc(String kindDesc) {
		this.kindDesc = kindDesc;
	}
	/**
		��ȡ��������
	*/
	public String getKindDesc() {
		return XMLProperties.prepareXml(this.kindDesc);
	}
	/**
		���� 
	*/
	public void setParentOrganKind(int parentOrganKind) {
		this.parentOrganKind = parentOrganKind;
	}
	/**
		��ȡ 
	*/
	public int getParentOrganKind() {
		return (this.parentOrganKind);
	}
	/**
		���� 
	*/
	public void setOrganKindLevel(int organKindLevel) {
		this.organKindLevel = organKindLevel;
	}
	/**
		��ȡ 
	*/
	public int getOrganKindLevel() {
		return (this.organKindLevel);
	}

	/**
		��SQL�Ľ������������
	*/
	public void setAttribute(ResultSet resultSet) throws SQLException {
		ResultSetMetaData metaData = resultSet.getMetaData();

		for(int i=1;i<=metaData.getColumnCount();i++) { 

			String columnName = metaData.getColumnName(i).toLowerCase();

			if(columnName.intern()=="f_organ_kind".intern())
				organKind = resultSet.getInt(i);
			else if(columnName.intern()=="f_area_level".intern())
				areaLevel = resultSet.getInt(i);
			else if(columnName.intern()=="f_kind_desc".intern())
				kindDesc = resultSet.getString(i);
			else if(columnName.intern()=="f_parent_organ_kind".intern())
				parentOrganKind = resultSet.getInt(i);
			else if(columnName.intern()=="f_organ_kind_level".intern())
				organKindLevel = resultSet.getInt(i);
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
		String str = NullProcessUtil.nvlToString(obj, "0");
		if("".equals(str)){
		return 0;
		}
	return Float.parseFloat(str);
	}


	/**
	* ͨ��MAP��ʼ����Ϣ
	*/
	public void setAttribute(java.util.HashMap map)throws NumberFormatException {
		organKind = parseIntFromString(
			map.get("OrganKind"));
		areaLevel = parseIntFromString(
			map.get("AreaLevel"));
		kindDesc = NullProcessUtil.nvlToString(
			map.get("KindDesc"),"");
		parentOrganKind = parseIntFromString(
			map.get("ParentOrganKind"));
		organKindLevel = parseIntFromString(
			map.get("OrganKindLevel"));
	}

	/**
		ת�����ַ���
	*/
	public String toString(int tabs) {
		StringBuffer ret = new StringBuffer();
		String str_tab = StringUtil.tabs(tabs);
		ret.append("<OrganKind>").append(organKind).append("</OrganKind>\n");
		ret.append(str_tab).append("<AreaLevel>").append(areaLevel).append("</AreaLevel>\n");
		ret.append(str_tab).append("<KindDesc>").append(XMLProperties.prepareXml(nvl(kindDesc))).append("</KindDesc>\n");
		ret.append(str_tab).append("<ParentOrganKind>").append(parentOrganKind).append("</ParentOrganKind>\n");
		ret.append(str_tab).append("<OrganKindLevel>").append(organKindLevel).append("</OrganKindLevel>\n");
		return ret.toString();
	}

}