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
	private	String	moduleId;	//ģ�����
	private	String	systemId;	//ϵͳ����
	private	String	parentModuleId;	//�ϼ�ģ�����
	private	String	moduleDesc;	//ģ������
	private	String	moduleType;	//ģ���ʶ��

	/**
		�յĹ��췽��
	*/
	public ModuleVO(){

	}
	/**
		ͨ������ֵ����һ������
	*/
	public ModuleVO(String moduleId, String systemId, String parentModuleId, String moduleDesc, String moduleType){

	}
	/**
		ͨ��һ�����ж�����һ������
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
		��ֵ����
	*/
	private String nvl(String str) {
		return str==null?"":str;
	}

	/**
		����ģ�����
	*/
	public void setModuleId(String moduleId) {
		this.moduleId = moduleId;
	}
	/**
		��ȡģ�����
	*/
	public String getModuleId() {
		return (this.moduleId);
	}
	/**
		����ϵͳ����
	*/
	public void setSystemId(String systemId) {
		this.systemId = systemId;
	}
	/**
		��ȡϵͳ����
	*/
	public String getSystemId() {
		return (this.systemId);
	}
	/**
		�����ϼ�ģ�����
	*/
	public void setParentModuleId(String parentModuleId) {
		this.parentModuleId = parentModuleId;
	}
	/**
		��ȡ�ϼ�ģ�����
	*/
	public String getParentModuleId() {
		return (this.parentModuleId);
	}
	/**
		����ģ������
	*/
	public void setModuleDesc(String moduleDesc) {
		this.moduleDesc = moduleDesc;
	}
	/**
		��ȡģ������
	*/
	public String getModuleDesc() {
		return XMLProperties.prepareXml(this.moduleDesc);
	}
	/**
		����ģ���ʶ��
	*/
	public void setModuleType(String moduleType) {
		this.moduleType = moduleType;
	}
	/**
		��ȡģ���ʶ��
	*/
	public String getModuleType() {
		return (this.moduleType);
	}

	/**
		��SQL�Ľ������������
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
	* ͨ��MAP��ʼ����Ϣ
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
		ת�����ַ���
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