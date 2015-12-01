package com.neusoft.om.dao.duty; 

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.BaseVO;
import com.neusoft.tdframework.common.util.NullProcessUtil;
import com.neusoft.tdframework.common.util.StringUtil;
import com.neusoft.tdframework.common.util.XMLProperties;

/**
 * Title: 封装职务信息
 * Description: 
 * Company: neusoft
 * Date: 2004-12-06
 * @author ren.hui@neusoft.com
 * @version 
 */

public class DutyVO extends BaseVO{ 
	private	int	dutyId;	//职务编码
	private	int	parentDutyId;	//上级职务编码
	private	String	dutyName;	//职务名称
	private	int	organKind;	//职务类型（属于哪类组织机构）
	private	int	dutyStatus;	//1.报批2.批复通过－正式3.批复未通过4.废弃
	private	int	innerDuty;	//1.是0.否
	private	String	dutyDesc;	//描述
	//非duty实体属性
	private	int	dutyLevel;	//级别

	/**
		空的构造方法
	*/
	public DutyVO(){

	}
	/**
		通过属性值构造一个对象
	*/
	public DutyVO(int dutyId, int parentDutyId, String dutyName, int organKind, int dutyStatus, int innerDuty, String dutyDesc,int dutyLevel){

	}
	/**
		通过一个已有对象构造一个对象
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
		空值处理
	*/
	private String nvl(String str) {
		return str==null?"":str;
	}

	/**
		设置职务编码
	*/
	public void setDutyId(int dutyId) {
		this.dutyId = dutyId;
	}
	/**
		获取职务编码
	*/
	public int getDutyId() {
		return (this.dutyId);
	}
	/**
		设置上级职务编码
	*/
	public void setParentDutyId(int parentDutyId) {
		this.parentDutyId = parentDutyId;
	}
	/**
		获取上级职务编码
	*/
	public int getParentDutyId() {
		return (this.parentDutyId);
	}
	/**
		设置职务名称
	*/
	public void setDutyName(String dutyName) {
		this.dutyName = dutyName;
	}
	/**
		获取职务名称
	*/
	public String getDutyName() {
		return XMLProperties.prepareXml(this.dutyName);
		
	}
	/**
		设置职务类型（属于哪类组织机构）
	*/
	public void setOrganKind(int organKind) {
		this.organKind = organKind;
	}
	/**
		获取职务类型（属于哪类组织机构）
	*/
	public int getOrganKind() {
		return (this.organKind);
	}
	/**
		设置1.报批2.批复通过－正式3.批复未通过4.废弃
	*/
	public void setDutyStatus(int dutyStatus) {
		this.dutyStatus = dutyStatus;
	}
	/**
		获取1.报批2.批复通过－正式3.批复未通过4.废弃
	*/
	public int getDutyStatus() {
		return (this.dutyStatus);
	}
	/**
		设置1.是0.否
	*/
	public void setInnerDuty(int innerDuty) {
		this.innerDuty = innerDuty;
	}
	/**
		获取1.是0.否
	*/
	public int getInnerDuty() {
		return (this.innerDuty);
	}
	/**
		设置描述
	*/
	public void setDutyDesc(String dutyDesc) {
		this.dutyDesc = dutyDesc;
	}
	/**
		获取描述
	*/
	public String getDutyDesc() {
		return XMLProperties.prepareXml(this.dutyDesc);
	}
	/**
	 	设置dutyLevel
	 */
	public void setDutyLevel(int dutyLevel) {
		this.dutyLevel = dutyLevel;
	}
	/**
		获取dutyLevel
	*/
	public int getDutyLevel(){
		return(this.dutyLevel);
	}
	/**
		以SQL的结果集设置数据
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
	* 通过MAP初始化信息
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
		转化成字符串
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