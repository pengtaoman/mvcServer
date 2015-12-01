package com.neusoft.om.interfase.ebisp.data;

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
 * Date: 2006-09-27
 * @author ren.hui@neusoft.com
 * @version
 */

public class IconVO extends BaseVO { 
 	private	int	iconId;	//ͼ���ʶ
	private	String	iconName;	//ͼ������
	private	String	path;	//·��
	private	int	isSystem;	//ϵͳͼ��
	private	String	description;	//����

	/**
		�յĹ��췽��
	*/
	public IconVO(){

	}
	/**
		ͨ������ֵ����һ������
	*/
	public IconVO(int iconId, String iconName, String path, int isSystem, String description){

	}
	/**
		ͨ��һ�����ж�����һ������
	*/
	public IconVO(IconVO other){
		if(this != other) {
			this.iconId = other.iconId;
			this.iconName = other.iconName;
			this.path = other.path;
			this.isSystem = other.isSystem;
			this.description = other.description;

		}
	}
	/** 
		��ֵ����
	*/
	private String nvl(String str) {
		return str==null?"":str;
	}

	/**
		����ͼ���ʶ
	*/
	public void setIconId(int iconId) {
		this.iconId = iconId;
	}
	/**
		��ȡͼ���ʶ
	*/
	public int getIconId() {
		return (this.iconId);
	}
	/**
		����ͼ������
	*/
	public void setIconName(String iconName) {
		this.iconName = iconName;
	}
	/**
		��ȡͼ������
	*/
	public String getIconName() {
		return (this.iconName);
	}
	/**
		����·��
	*/
	public void setPath(String path) {
		this.path = path;
	}
	/**
		��ȡ·��
	*/
	public String getPath() {
		return (this.path);
	}
	/**
		����ϵͳͼ��
	*/
	public void setIsSystem(int isSystem) {
		this.isSystem = isSystem;
	}
	/**
		��ȡϵͳͼ��
	*/
	public int getIsSystem() {
		return (this.isSystem);
	}
	/**
		��������
	*/
	public void setDescription(String description) {
		this.description = description;
	}
	/**
		��ȡ����
	*/
	public String getDescription() {
		return (this.description);
	}

	/**
		��SQL�Ľ������������
	*/
	public void setAttribute(ResultSet resultSet) throws SQLException {
		ResultSetMetaData metaData = resultSet.getMetaData();

		for(int i=1;i<=metaData.getColumnCount();i++) { 

			String columnName = metaData.getColumnName(i).toLowerCase();

			if(columnName.intern()=="f_icon_id".intern())
				iconId = resultSet.getInt(i);
			else if(columnName.intern()=="f_icon_name".intern())
				iconName = resultSet.getString(i);
			else if(columnName.intern()=="f_path".intern())
				path = resultSet.getString(i);
			else if(columnName.intern()=="f_is_system".intern())
				isSystem = resultSet.getInt(i);
			else if(columnName.intern()=="f_description".intern())
				description = resultSet.getString(i);
		}

	}

	/**
	* ͨ��MAP��ʼ����Ϣ
	*/
	public void setAttribute(java.util.HashMap map)throws NumberFormatException {
		iconId = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("iconId"), "-10"));
		iconName = NullProcessUtil.nvlToString(
			map.get("iconName"),"");
		path = NullProcessUtil.nvlToString(
			map.get("path"),"");
		isSystem = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("isSystem"), "-10"));
		description = NullProcessUtil.nvlToString(
			map.get("description"),"");
	}

	/**
		ת�����ַ���
	*/
	public String toString(int tabs) {
		StringBuffer ret = new StringBuffer();
		String str_tab = StringUtil.tabs(tabs);
		ret.append("<iconId>").append(iconId).append("</iconId>\n");
		ret.append(str_tab).append("<iconName>").append(nvl(iconName)).append("</iconName>\n");
		ret.append(str_tab).append("<path>").append(nvl(path)).append("</path>\n");
		ret.append(str_tab).append("<isSystem>").append(isSystem).append("</isSystem>\n");
		ret.append(str_tab).append("<description>").append(nvl(description)).append("</description>\n");
		return ret.toString();
	}

}
