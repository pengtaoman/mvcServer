package com.neusoft.om.interfase.ebisp.data;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.BaseVO;
import com.neusoft.tdframework.common.util.DateUtil;
import com.neusoft.tdframework.common.util.NullProcessUtil;
import com.neusoft.tdframework.common.util.StringUtil;

/**
 * Title:
 * Description:
 * Company: neusoft
 * Date: 2006-09-26
 * @author zhaof@neusoft.com
 * @version
 */

public class ViewVO extends BaseVO { 
 	private	int	viewId;	//��ͼ���
	private	int	styleId;	//��ʽ���
	private	int	iconId;	//չ��ͼ����
	private	String	viewName;	//��ͼ����
	private	int	enabled;	//�Ƿ���� 0�������� 1������
	private	String	pagePath;	//����
	private	String	defWidth;	//���
	private	String	defHeight;	//�߶�
	private	int	defScroll;	//����
	private	String	defToolbar;	//�Ƿ��й�����
	private	String	viewType;	//��ͼ����
	private	int	viewLevel;	//��ͼ����
	private	String	description;	//����
	private	String	createTime;	//����ʱ��
	private	String	modifyTime;	//�޸�ʱ��
	private	int	knowledge;	//�Ƿ�֪ʶ�������

	/**
		�յĹ��췽��
	*/
	public ViewVO(){

	}
	/**
		ͨ������ֵ����һ������
	*/
	public ViewVO(int viewId, int styleId, int iconId, String viewName, int enabled, String pagePath, String defWidth, String defHeight, int defScroll, String defToolbar, String viewType, int viewLevel, String description, String createTime, String modifyTime, int knowledge){

	}
	/**
		ͨ��һ�����ж�����һ������
	*/
	public ViewVO(ViewVO other){
		if(this != other) {
			this.viewId = other.viewId;
			this.styleId = other.styleId;
			this.iconId = other.iconId;
			this.viewName = other.viewName;
			this.enabled = other.enabled;
			this.pagePath = other.pagePath;
			this.defWidth = other.defWidth;
			this.defHeight = other.defHeight;
			this.defScroll = other.defScroll;
			this.defToolbar = other.defToolbar;
			this.viewType = other.viewType;
			this.viewLevel = other.viewLevel;
			this.description = other.description;
			this.createTime = other.createTime;
			this.modifyTime = other.modifyTime;
			this.knowledge = other.knowledge;

		}
	}
	/** 
		��ֵ����
	*/
	private String nvl(String str) {
		return str==null?"":str;
	}

	/**
		������ͼ���
	*/
	public void setViewId(int viewId) {
		this.viewId = viewId;
	}
	/**
		��ȡ��ͼ���
	*/
	public int getViewId() {
		return (this.viewId);
	}
	/**
		������ʽ���
	*/
	public void setStyleId(int styleId) {
		this.styleId = styleId;
	}
	/**
		��ȡ��ʽ���
	*/
	public int getStyleId() {
		return (this.styleId);
	}
	/**
		����չ��ͼ����
	*/
	public void setIconId(int iconId) {
		this.iconId = iconId;
	}
	/**
		��ȡչ��ͼ����
	*/
	public int getIconId() {
		return (this.iconId);
	}
	/**
		������ͼ����
	*/
	public void setViewName(String viewName) {
		this.viewName = viewName;
	}
	/**
		��ȡ��ͼ����
	*/
	public String getViewName() {
		return (this.viewName);
	}
	/**
		�����Ƿ���� 0�������� 1������
	*/
	public void setEnabled(int enabled) {
		this.enabled = enabled;
	}
	/**
		��ȡ�Ƿ���� 0�������� 1������
	*/
	public int getEnabled() {
		return (this.enabled);
	}
	/**
		��������
	*/
	public void setPagePath(String pagePath) {
		this.pagePath = pagePath;
	}
	/**
		��ȡ����
	*/
	public String getPagePath() {
		return (this.pagePath);
	}
	/**
		���ÿ��
	*/
	public void setDefWidth(String defWidth) {
		this.defWidth = defWidth;
	}
	/**
		��ȡ���
	*/
	public String getDefWidth() {
		return (this.defWidth);
	}
	/**
		���ø߶�
	*/
	public void setDefHeight(String defHeight) {
		this.defHeight = defHeight;
	}
	/**
		��ȡ�߶�
	*/
	public String getDefHeight() {
		return (this.defHeight);
	}
	/**
		���ù���
	*/
	public void setDefScroll(int defScroll) {
		this.defScroll = defScroll;
	}
	/**
		��ȡ����
	*/
	public int getDefScroll() {
		return (this.defScroll);
	}
	/**
		�����Ƿ��й�����
	*/
	public void setDefToolbar(String defToolbar) {
		this.defToolbar = defToolbar;
	}
	/**
		��ȡ�Ƿ��й�����
	*/
	public String getDefToolbar() {
		return (this.defToolbar);
	}
	/**
		������ͼ����
	*/
	public void setViewType(String viewType) {
		this.viewType = viewType;
	}
	/**
		��ȡ��ͼ����
	*/
	public String getViewType() {
		return (this.viewType);
	}
	/**
		������ͼ����
	*/
	public void setViewLevel(int viewLevel) {
		this.viewLevel = viewLevel;
	}
	/**
		��ȡ��ͼ����
	*/
	public int getViewLevel() {
		return (this.viewLevel);
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
		���ô���ʱ��
	*/
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
	/**
		��ȡ����ʱ��
	*/
	public String getCreateTime() {
		return (this.createTime);
	}
	/**
		�����޸�ʱ��
	*/
	public void setModifyTime(String modifyTime) {
		this.modifyTime = modifyTime;
	}
	/**
		��ȡ�޸�ʱ��
	*/
	public String getModifyTime() {
		return (this.modifyTime);
	}
	/**
		�����Ƿ�֪ʶ�������
	*/
	public void setKnowledge(int knowledge) {
		this.knowledge = knowledge;
	}
	/**
		��ȡ�Ƿ�֪ʶ�������
	*/
	public int getKnowledge() {
		return (this.knowledge);
	}

	/**
		��SQL�Ľ������������
	*/
	public void setAttribute(ResultSet resultSet) throws SQLException {
		ResultSetMetaData metaData = resultSet.getMetaData();

		for(int i=1;i<=metaData.getColumnCount();i++) { 

			String columnName = metaData.getColumnName(i).toLowerCase();

			if(columnName.intern()=="f_view_id".intern())
				viewId = resultSet.getInt(i);
			else if(columnName.intern()=="f_style_id".intern())
				styleId = resultSet.getInt(i);
			else if(columnName.intern()=="f_icon_id".intern())
				iconId = resultSet.getInt(i);
			else if(columnName.intern()=="f_view_name".intern())
				viewName = resultSet.getString(i);
			else if(columnName.intern()=="f_enabled".intern())
				enabled = resultSet.getInt(i);
			else if(columnName.intern()=="f_page_path".intern())
				pagePath = resultSet.getString(i);
			else if(columnName.intern()=="f_def_width".intern())
				defWidth = resultSet.getString(i);
			else if(columnName.intern()=="f_def_height".intern())
				defHeight = resultSet.getString(i);
			else if(columnName.intern()=="f_def_scroll".intern())
				defScroll = resultSet.getInt(i);
			else if(columnName.intern()=="f_def_toolbar".intern())
				defToolbar = resultSet.getString(i);
			else if(columnName.intern()=="f_view_type".intern())
				viewType = resultSet.getString(i);
			else if(columnName.intern()=="f_view_level".intern())
				viewLevel = resultSet.getInt(i);
			else if(columnName.intern()=="f_description".intern())
				description = resultSet.getString(i);
			else if(columnName.intern()=="f_create_time".intern())
				createTime = NullProcessUtil.nvlToString(DateUtil.stringDateTime(
						(java.util.Date)resultSet.getObject(i),"yyyy-MM-dd"),"");
			else if(columnName.intern()=="f_modify_time".intern())
				modifyTime = NullProcessUtil.nvlToString(DateUtil.stringDateTime(
						(java.util.Date)resultSet.getObject(i),"yyyy-MM-dd"),"");
			else if(columnName.intern()=="f_knowledge".intern())
				knowledge = resultSet.getInt(i);
		}

	}

	/**
	* ͨ��MAP��ʼ����Ϣ
	*/
	public void setAttribute(java.util.HashMap map)throws NumberFormatException {
		viewId = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("viewId"), "-10"));
		styleId = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("styleId"), "-10"));
		iconId = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("iconId"), "-10"));
		viewName = NullProcessUtil.nvlToString(
			map.get("viewName"),"");
		enabled = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("enabled"), "-10"));
		pagePath = NullProcessUtil.nvlToString(
			map.get("pagePath"),"");
		defWidth = NullProcessUtil.nvlToString(
			map.get("defWidth"),"");
		defHeight = NullProcessUtil.nvlToString(
			map.get("defHeight"),"");
		defScroll = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("defScroll"), "-10"));
		defToolbar = NullProcessUtil.nvlToString(
			map.get("defToolbar"),"");
		viewType = NullProcessUtil.nvlToString(
			map.get("viewType"),"");
		viewLevel = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("viewLevel"), "-10"));
		description = NullProcessUtil.nvlToString(
			map.get("description"),"");
		createTime = NullProcessUtil.nvlToString(
			map.get("createTime"),"");
		modifyTime = NullProcessUtil.nvlToString(
			map.get("modifyTime"),"");
		knowledge = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("knowledge"), "-10"));
	}

	/**
		ת�����ַ���
	*/
	public String toString(int tabs) {
		StringBuffer ret = new StringBuffer();
		String str_tab = StringUtil.tabs(tabs);
		ret.append("<viewId>").append(viewId).append("</viewId>\n");
		ret.append(str_tab).append("<styleId>").append(styleId).append("</styleId>\n");
		ret.append(str_tab).append("<iconId>").append(iconId).append("</iconId>\n");
		ret.append(str_tab).append("<viewName>").append(nvl(viewName)).append("</viewName>\n");
		ret.append(str_tab).append("<enabled>").append(enabled).append("</enabled>\n");
		ret.append(str_tab).append("<pagePath>").append(nvl(pagePath)).append("</pagePath>\n");
		ret.append(str_tab).append("<defWidth>").append(nvl(defWidth)).append("</defWidth>\n");
		ret.append(str_tab).append("<defHeight>").append(nvl(defHeight)).append("</defHeight>\n");
		ret.append(str_tab).append("<defScroll>").append(defScroll).append("</defScroll>\n");
		ret.append(str_tab).append("<defToolbar>").append(nvl(defToolbar)).append("</defToolbar>\n");
		ret.append(str_tab).append("<viewType>").append(nvl(viewType)).append("</viewType>\n");
		ret.append(str_tab).append("<viewLevel>").append(viewLevel).append("</viewLevel>\n");
		ret.append(str_tab).append("<description>").append(nvl(description)).append("</description>\n");
		ret.append(str_tab).append("<createTime>").append(nvl(createTime)).append("</createTime>\n");
		ret.append(str_tab).append("<modifyTime>").append(nvl(modifyTime)).append("</modifyTime>\n");
		ret.append(str_tab).append("<knowledge>").append(knowledge).append("</knowledge>\n");
		return ret.toString();
	}

}