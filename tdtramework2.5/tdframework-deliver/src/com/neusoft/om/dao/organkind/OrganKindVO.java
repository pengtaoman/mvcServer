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
	private	int	organKind;	//类型编码
	private	int	areaLevel;	//行政级别
	private	String	kindDesc;	//类型描述
	private	int	parentOrganKind;	// 
	private	int	organKindLevel;	// 

	/**
		空的构造方法
	*/
	public OrganKindVO(){

	}
	/**
		通过属性值构造一个对象
	*/
	public OrganKindVO(int organKind, int areaLevel, String kindDesc, int parentOrganKind, int organKindLevel){

	}
	/**
		通过一个已有对象构造一个对象
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
		空值处理
	*/
	private String nvl(String str) {
		return str==null?"":str;
	}

	/**
		设置类型编码
	*/
	public void setOrganKind(int organKind) {
		this.organKind = organKind;
	}
	/**
		获取类型编码
	*/
	public int getOrganKind() {
		return (this.organKind);
	}
	/**
		设置行政级别
	*/
	public void setAreaLevel(int areaLevel) {
		this.areaLevel = areaLevel;
	}
	/**
		获取行政级别
	*/
	public int getAreaLevel() {
		return (this.areaLevel);
	}
	/**
		设置类型描述
	*/
	public void setKindDesc(String kindDesc) {
		this.kindDesc = kindDesc;
	}
	/**
		获取类型描述
	*/
	public String getKindDesc() {
		return XMLProperties.prepareXml(this.kindDesc);
	}
	/**
		设置 
	*/
	public void setParentOrganKind(int parentOrganKind) {
		this.parentOrganKind = parentOrganKind;
	}
	/**
		获取 
	*/
	public int getParentOrganKind() {
		return (this.parentOrganKind);
	}
	/**
		设置 
	*/
	public void setOrganKindLevel(int organKindLevel) {
		this.organKindLevel = organKindLevel;
	}
	/**
		获取 
	*/
	public int getOrganKindLevel() {
		return (this.organKindLevel);
	}

	/**
		以SQL的结果集设置数据
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
	* 处理由字符串转换成Int
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
	* 处理由字符串转换成Float
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
	* 通过MAP初始化信息
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
		转化成字符串
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