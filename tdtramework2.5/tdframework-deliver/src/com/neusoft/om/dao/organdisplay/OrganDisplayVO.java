package com.neusoft.om.dao.organdisplay;

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
 * Date: 2004-12-25
 * @author ren.hui@neusoft.com
 * @version
 */

public class OrganDisplayVO extends BaseVO { 
	private	String	organId;	// 
	private	String	organName;	// 
	private	String	parentOrganId;	// 
	private	int	organLevel;	// 
	private	String	organKind;	// 
	private	String	belongArea;	// 
	private	int	kind;
	private int areaLevel;

	public int getF_area_level() {
		return areaLevel;
	}
	public void setF_area_level(int areaLevel) {
		this.areaLevel = areaLevel;
	}
	/**
		空的构造方法
	*/
	public OrganDisplayVO(){

	}
	/**
		通过属性值构造一个对象
	*/
	public OrganDisplayVO(String organId, String organName, String parentOrganId, int organLevel, String organKind, String belongArea,int kind){

	}
	/**
		通过一个已有对象构造一个对象
	*/
	public OrganDisplayVO(OrganDisplayVO other){
		if(this != other) {
			this.organId = other.organId;
			this.organName = other.organName;
			this.parentOrganId = other.parentOrganId;
			this.organLevel = other.organLevel;
			this.organKind = other.organKind;
			this.belongArea = other.belongArea;
			this.kind = other.kind;
			this.areaLevel = other.areaLevel;
		}
	}
	/** 
		空值处理
	*/
	private String nvl(String str) {
		return str==null?"":str;
	}

	/**
		设置 
	*/
	public void setOrganId(String organId) {
		this.organId = organId;
	}
	/**
		获取 
	*/
	public String getOrganId() {
		return (this.organId);
	}
	/**
		设置 
	*/
	public void setOrganName(String organName) {
		this.organName = organName;
	}
	/**
		获取 
	*/
	public String getOrganName() {
		return XMLProperties.prepareXml(this.organName);
	}
	/**
		设置 
	*/
	public void setParentOrganId(String parentOrganId) {
		this.parentOrganId = parentOrganId;
	}
	/**
		获取 
	*/
	public String getParentOrganId() {
		return (this.parentOrganId);
	}
	/**
		设置 
	*/
	public void setOrganLevel(int organLevel) {
		this.organLevel = organLevel;
	}
	/**
		获取 
	*/
	public int getOrganLevel() {
		return (this.organLevel);
	}
	/**
		设置 
	*/
	public void setOrganKind(String organKind) {
		this.organKind = organKind;
	}
	/**
		获取 
	*/
	public String getOrganKind() {
		return (this.organKind);
	}
	/**
		设置 
	*/
	public void setBelongArea(String belongArea) {
		this.belongArea = belongArea;
	}
	/**
		获取 
	*/
	public String getBelongArea() {
		return (this.belongArea);
	}
	/**
	 * 设置
	 * @param kind
	 */
	public void setKind(int kind){
		this.kind = kind;
	}
	public int getKind() {
		return(this.kind);
	}
	

	/**
		以SQL的结果集设置数据
	*/
	public void setAttribute(ResultSet resultSet) throws SQLException {
		ResultSetMetaData metaData = resultSet.getMetaData();

		for(int i=1;i<=metaData.getColumnCount();i++) { 

			String columnName = metaData.getColumnName(i).toLowerCase();

			if(columnName.intern()=="f_organ_id".intern())
				organId = resultSet.getString(i);
			else if(columnName.intern()=="f_organ_name".intern())
				organName = resultSet.getString(i);
			else if(columnName.intern()=="f_parent_organ_id".intern())
				parentOrganId = resultSet.getString(i);
			else if(columnName.intern()=="f_organ_level".intern())
				organLevel = resultSet.getInt(i);
			else if(columnName.intern()=="f_organ_kind".intern())
				organKind = resultSet.getString(i);
			else if(columnName.intern()=="f_belong_area".intern())
				belongArea = resultSet.getString(i);
			else if(columnName.intern()=="f_kind".intern())
				kind = resultSet.getInt(i);
			else if(columnName.intern()=="f_area_level".intern())
				areaLevel = resultSet.getInt(i);
		}

	}

	/**
	* 通过MAP初始化信息
	*/
	public void setAttribute(java.util.HashMap map)throws NumberFormatException {
		organId = NullProcessUtil.nvlToString(
			map.get("organId"),"");
		organName = NullProcessUtil.nvlToString(
			map.get("organName"),"");
		parentOrganId = NullProcessUtil.nvlToString(
			map.get("parentOrganId"),"");
		organLevel = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("organLevel"), "0"));
		organKind = NullProcessUtil.nvlToString(
			map.get("organKind"),"");
		belongArea = NullProcessUtil.nvlToString(
			map.get("belongArea"),"");
		kind = Integer.parseInt(NullProcessUtil.nvlToString(
					map.get("kind"), "0"));
		areaLevel = Integer.parseInt(NullProcessUtil.nvlToString(
				map.get("areaLevel"), "0"));
	}

	/**
		转化成字符串
	*/
	public String toString(int tabs) {
		StringBuffer ret = new StringBuffer();
		String str_tab = StringUtil.tabs(tabs);
		ret.append("<OrganId>").append(nvl(organId)).append("</OrganId>\n");
		ret.append(str_tab).append("<OrganName>").append(XMLProperties.prepareXml(nvl(organName))).append("</OrganName>\n");
		ret.append(str_tab).append("<ParentOrganId>").append(nvl(parentOrganId)).append("</ParentOrganId>\n");
		ret.append(str_tab).append("<OrganLevel>").append(organLevel).append("</OrganLevel>\n");
		ret.append(str_tab).append("<OrganKind>").append(nvl(organKind)).append("</OrganKind>\n");
		ret.append(str_tab).append("<BelongArea>").append(nvl(belongArea)).append("</BelongArea>\n");
		ret.append(str_tab).append("<AreaLevel>").append(areaLevel).append("</AreaLevel>\n");
		return ret.toString();
	}

}