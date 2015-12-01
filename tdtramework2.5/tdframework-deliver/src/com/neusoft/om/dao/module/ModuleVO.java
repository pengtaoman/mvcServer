package com.neusoft.om.dao.module;

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
 * Date: 2004-12-17
 * @author ren.hui@neusoft.com
 * @version
 */

public class ModuleVO extends BaseVO { 
	private	String	moduleId;	//模块编码
	private	String	systemId;	//系统编码
	private	String	parentModuleId;	//上级模块编码
	private	String	moduleDesc;	//模块名称
	private	String	moduleType;	//模块标识项

	/**
		空的构造方法
	*/
	public ModuleVO(){

	}
	/**
		通过属性值构造一个对象
	*/
	public ModuleVO(String moduleId, String systemId, String parentModuleId, String moduleDesc, String moduleType){

	}
	/**
		通过一个已有对象构造一个对象
	*/
	public ModuleVO(ModuleVO other){
		if(this != other) {
			this.moduleId = other.moduleId;
			this.systemId = other.systemId;
			this.parentModuleId = other.parentModuleId;
			this.moduleDesc = other.moduleDesc;
			this.moduleType = other.moduleType;

		}
	}
	/** 
		空值处理
	*/
	private String nvl(String str) {
		return str==null?"":str;
	}

	/**
		设置模块编码
	*/
	public void setModuleId(String moduleId) {
		this.moduleId = moduleId;
	}
	/**
		获取模块编码
	*/
	public String getModuleId() {
		return (this.moduleId);
	}
	/**
		设置系统编码
	*/
	public void setSystemId(String systemId) {
		this.systemId = systemId;
	}
	/**
		获取系统编码
	*/
	public String getSystemId() {
		return (this.systemId);
	}
	/**
		设置上级模块编码
	*/
	public void setParentModuleId(String parentModuleId) {
		this.parentModuleId = parentModuleId;
	}
	/**
		获取上级模块编码
	*/
	public String getParentModuleId() {
		return (this.parentModuleId);
	}
	/**
		设置模块名称
	*/
	public void setModuleDesc(String moduleDesc) {
		this.moduleDesc = moduleDesc;
	}
	/**
		获取模块名称
	*/
	public String getModuleDesc() {
		return XMLProperties.prepareXml(this.moduleDesc);
	}
	/**
		设置模块标识项
	*/
	public void setModuleType(String moduleType) {
		this.moduleType = moduleType;
	}
	/**
		获取模块标识项
	*/
	public String getModuleType() {
		return (this.moduleType);
	}

	/**
		以SQL的结果集设置数据
	*/
	public void setAttribute(ResultSet resultSet) throws SQLException {
		ResultSetMetaData metaData = resultSet.getMetaData();

		for(int i=1;i<=metaData.getColumnCount();i++) { 

			String columnName = metaData.getColumnName(i).toLowerCase();

			if(columnName.intern()=="f_module_id".intern())
				moduleId = resultSet.getString(i);
			else if(columnName.intern()=="f_system_id".intern())
				systemId = resultSet.getString(i);
			else if(columnName.intern()=="f_parent_module_id".intern())
				parentModuleId = resultSet.getString(i);
			else if(columnName.intern()=="f_module_desc".intern())
				moduleDesc = resultSet.getString(i);
			else if(columnName.intern()=="f_module_type".intern())
				moduleType = resultSet.getString(i);
		}

	}

	/**
	* 通过MAP初始化信息
	*/
	public void setAttribute(java.util.HashMap map)throws NumberFormatException {
		moduleId = NullProcessUtil.nvlToString(
			map.get("moduleId"),"");
		systemId = NullProcessUtil.nvlToString(
			map.get("systemId"),"");
		parentModuleId = NullProcessUtil.nvlToString(
			map.get("parentModuleId"),"");
		moduleDesc = NullProcessUtil.nvlToString(
			map.get("moduleDesc"),"");
		moduleType = NullProcessUtil.nvlToString(
			map.get("moduleType"),"");
	}

	/**
		转化成字符串
	*/
	public String toString(int tabs) {
		StringBuffer ret = new StringBuffer();
		String str_tab = StringUtil.tabs(tabs);
		ret.append("<ModuleId>").append(nvl(moduleId)).append("</ModuleId>\n");
		ret.append(str_tab).append("<SystemId>").append(nvl(systemId)).append("</SystemId>\n");
		ret.append(str_tab).append("<ParentModuleId>").append(nvl(parentModuleId)).append("</ParentModuleId>\n");
		ret.append(str_tab).append("<ModuleDesc>").append(XMLProperties.prepareXml(nvl(moduleDesc))).append("</ModuleDesc>\n");
		ret.append(str_tab).append("<ModuleType>").append(nvl(moduleType)).append("</ModuleType>\n");
		return ret.toString();
	}

}