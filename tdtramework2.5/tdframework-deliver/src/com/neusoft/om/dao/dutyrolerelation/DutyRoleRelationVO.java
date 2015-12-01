package com.neusoft.om.dao.dutyrolerelation; 

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.BaseVO;
import com.neusoft.tdframework.common.util.StringUtil;

/**
 * Title: DutyRoleRelationVO
 * Description: 
 * Company: neusoft
 * Date: 2004-12-07
 * @author ren.hui@neusoft.com
 * @version 
 */

public class DutyRoleRelationVO extends BaseVO { 
	private	int	dutyId;	//职务编码
	private	int	roleId;	//角色编码

	/**
		空的构造方法
	*/
	public DutyRoleRelationVO(){

	}
	/**
		通过属性值构造一个对象
	*/
	public DutyRoleRelationVO(int dutyId, int roleId){

	}
	/**
		通过一个已有对象构造一个对象
	*/
	public DutyRoleRelationVO(DutyRoleRelationVO other){
		if(this != other) {
			this.dutyId = other.dutyId;
			this.roleId = other.roleId;

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
		设置角色编码
	*/
	public void setRoleId(int roleId) {
		this.roleId = roleId;
	}
	/**
		获取角色编码
	*/
	public int getRoleId() {
		return (this.roleId);
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
			else if(columnName.intern()=="f_role_id".intern())
				roleId = resultSet.getInt(i);
		}

	}

	/**
		转化成字符串
	*/
	public String toString(int tabs) {
		StringBuffer ret = new StringBuffer();
		String str_tab = StringUtil.tabs(tabs);
		ret.append("<DutyId>").append(dutyId).append("</DutyId>\n");
		ret.append(str_tab).append("<RoleId>").append(roleId).append("</RoleId>\n");
		return ret.toString();
	}

}