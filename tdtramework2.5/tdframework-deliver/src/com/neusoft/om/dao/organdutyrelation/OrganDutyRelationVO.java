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
	private	String	organId;	//组织机构编码
	private	int	dutyId;	//职务编码
	private	int	parentDutyId;	//上级职务编码

	/**
		空的构造方法
	*/
	public OrganDutyRelationVO(){

	}
	/**
		通过属性值构造一个对象
	*/
	public OrganDutyRelationVO(String organId, int dutyId, int parentDutyId){

	}
	/**
		通过一个已有对象构造一个对象
	*/
	public OrganDutyRelationVO(OrganDutyRelationVO other){
		if(this != other) {
			this.organId = other.organId;
			this.dutyId = other.dutyId;
			this.parentDutyId = other.parentDutyId;

		}
	}
	/** 
		空值处理
	*/
	private String nvl(String str) {
		return str==null?"":str;
	}

	/**
		设置组织机构编码
	*/
	public void setOrganId(String organId) {
		this.organId = organId;
	}
	/**
		获取组织机构编码
	*/
	public String getOrganId() {
		return (this.organId);
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
		以SQL的结果集设置数据
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
	* 通过MAP初始化信息
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
		转化成字符串
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