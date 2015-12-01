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

public class WindowVO extends BaseVO { 
 	private	int	windowId;	//���ڱ��
	private	int	styleId;	//��ʽ��ţ��Դ�������
	private	int	iconId;	//չ��ͼ����
	private	int	icon1Id;	//�۵�ͼ����
	private	String	windowName;	//��������
	private	int	enabled;	//�Ƿ���� 0�������� 1������
	private	String	pagePath;	//����
	private	int	rootNode;	//��Ӧ�ĸ��ڵ�  ����֪ʶ��,����֪ʶ�⣺1 ������0
	private	int	rowCount;	//����
	private	int	colCount;	//����
	private	String	width;	//��� window����
	private	String	height;	//�߶� window����
	private	int	forceStyle;	//ǿ�Ʒ��
	private	int	rightLevel;	//Ȩ�޼���
	private	String	description;	//����
	private	String	createTime;	//����ʱ��
	private	String	modifyTime;	//�޸�ʱ��
	private	int	knowledge;	//�Ƿ�֪ʶ�������
	private	int	navigationEnable;	//����������ͣ�չ�����޶��������룬����
	private	int	ismodule;	//�Ƿ���ģ�鼶
	private IconVO iconVO;
	private StyleVO  styleVO;

	/**
		�յĹ��췽��
	*/
	public WindowVO(){

	}
	/**
		ͨ������ֵ����һ������
	*/
	public WindowVO(int windowId, int styleId, int iconId, int icon1Id, 
			String windowName, int enabled, String pagePath, int rootNode, 
			int rowCount, int colCount, String width, String height, 
			int forceStyle, int rightLevel, String description, String createTime,
			String modifyTime, int knowledge, int navigationEnable, int ismodule,
			IconVO iconVO, StyleVO styleVO){

	}
	/**
		ͨ��һ�����ж�����һ������
	*/
	public WindowVO(WindowVO other){
		if(this != other) {
			this.windowId = other.windowId;
			this.styleId = other.styleId;
			this.iconId = other.iconId;
			this.icon1Id = other.icon1Id;
			this.windowName = other.windowName;
			this.enabled = other.enabled;
			this.pagePath = other.pagePath;
			this.rootNode = other.rootNode;
			this.rowCount = other.rowCount;
			this.colCount = other.colCount;
			this.width = other.width;
			this.height = other.height;
			this.forceStyle = other.forceStyle;
			this.rightLevel = other.rightLevel;
			this.description = other.description;
			this.createTime = other.createTime;
			this.modifyTime = other.modifyTime;
			this.knowledge = other.knowledge;
			this.navigationEnable = other.navigationEnable;
			this.ismodule = other.ismodule;
			this.iconVO = other.iconVO;
			this.styleVO = other.styleVO;

		}
	}
	/** 
		��ֵ����
	*/
	private String nvl(String str) {
		return str==null?"":str;
	}

	/**
		���ô��ڱ��
	*/
	public void setWindowId(int windowId) {
		this.windowId = windowId;
	}
	/**
		��ȡ���ڱ��
	*/
	public int getWindowId() {
		return (this.windowId);
	}
	/**
		������ʽ��ţ��Դ�������
	*/
	public void setStyleId(int styleId) {
		this.styleId = styleId;
	}
	/**
		��ȡ��ʽ��ţ��Դ�������
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
		�����۵�ͼ����
	*/
	public void setIcon1Id(int icon1Id) {
		this.icon1Id = icon1Id;
	}
	/**
		��ȡ�۵�ͼ����
	*/
	public int getIcon1Id() {
		return (this.icon1Id);
	}
	/**
		���ô�������
	*/
	public void setWindowName(String windowName) {
		this.windowName = windowName;
	}
	/**
		��ȡ��������
	*/
	public String getWindowName() {
		return (this.windowName);
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
		���ö�Ӧ�ĸ��ڵ�  ����֪ʶ��,����֪ʶ�⣺1 ������0
	*/
	public void setRootNode(int rootNode) {
		this.rootNode = rootNode;
	}
	/**
		��ȡ��Ӧ�ĸ��ڵ�  ����֪ʶ��,����֪ʶ�⣺1 ������0
	*/
	public int getRootNode() {
		return (this.rootNode);
	}
	/**
		��������
	*/
	public void setRowCount(int rowCount) {
		this.rowCount = rowCount;
	}
	/**
		��ȡ����
	*/
	public int getRowCount() {
		return (this.rowCount);
	}
	/**
		��������
	*/
	public void setColCount(int colCount) {
		this.colCount = colCount;
	}
	/**
		��ȡ����
	*/
	public int getColCount() {
		return (this.colCount);
	}
	/**
		���ÿ�� window����
	*/
	public void setWidth(String width) {
		this.width = width;
	}
	/**
		��ȡ��� window����
	*/
	public String getWidth() {
		return (this.width);
	}
	/**
		���ø߶� window����
	*/
	public void setHeight(String height) {
		this.height = height;
	}
	/**
		��ȡ�߶� window����
	*/
	public String getHeight() {
		return (this.height);
	}
	/**
		����Ԥ����һ��Ϊ0
	*/
	public void setForceStyle(int forceStyle) {
		this.forceStyle = forceStyle;
	}
	/**
		��ȡԤ����һ��Ϊ0
	*/
	public int getForceStyle() {
		return (this.forceStyle);
	}
	/**
		����Ԥ��
	*/
	public void setRightLevel(int rightLevel) {
		this.rightLevel = rightLevel;
	}
	/**
		��ȡԤ��
	*/
	public int getRightLevel() {
		return (this.rightLevel);
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
		���õ���������ͣ�չ�����޶��������룬����
	*/
	public void setNavigationEnable(int navigationEnable) {
		this.navigationEnable = navigationEnable;
	}
	/**
		��ȡ����������ͣ�չ�����޶��������룬����
	*/
	public int getNavigationEnable() {
		return (this.navigationEnable);
	}
	/**
		�����Ƿ��ڡ�ģ��ά������ά��
	*/
	public void setIsmodule(int ismodule) {
		this.ismodule = ismodule;
	}
	/**
		��ȡ�Ƿ��ڡ�ģ��ά������ά��
	*/
	public int getIsmodule() {
		return (this.ismodule);
	}	
	
	public IconVO getIconVO() {
		return iconVO;
	}
	public void setIconVO(IconVO iconVO) {
		this.iconVO = iconVO;
	}
	public StyleVO getStyleVO() {
		return styleVO;
	}
	public void setStyleVO(StyleVO styleVO) {
		this.styleVO = styleVO;
	}
	/**
		��SQL�Ľ������������
	*/
	public void setAttribute(ResultSet resultSet) throws SQLException {
		ResultSetMetaData metaData = resultSet.getMetaData();

		for(int i=1;i<=metaData.getColumnCount();i++) { 

			String columnName = metaData.getColumnName(i).toLowerCase();

			if(columnName.intern()=="f_window_id".intern())
				windowId = resultSet.getInt(i);
			else if(columnName.intern()=="f_style_id".intern())
				styleId = resultSet.getInt(i);
			else if(columnName.intern()=="f_icon_id".intern())
				iconId = resultSet.getInt(i);
			else if(columnName.intern()=="f_icon1_id".intern())
				icon1Id = resultSet.getInt(i);
			else if(columnName.intern()=="f_window_name".intern())
				windowName = resultSet.getString(i);
			else if(columnName.intern()=="f_enabled".intern())
				enabled = resultSet.getInt(i);
			else if(columnName.intern()=="f_page_path".intern())
				pagePath = resultSet.getString(i);
			else if(columnName.intern()=="f_root_node".intern())
				rootNode = resultSet.getInt(i);
			else if(columnName.intern()=="f_row_count".intern())
				rowCount = resultSet.getInt(i);
			else if(columnName.intern()=="f_col_count".intern())
				colCount = resultSet.getInt(i);
			else if(columnName.intern()=="f_width".intern())
				width = resultSet.getString(i);
			else if(columnName.intern()=="f_height".intern())
				height = resultSet.getString(i);
			else if(columnName.intern()=="f_force_style".intern())
				forceStyle = resultSet.getInt(i);
			else if(columnName.intern()=="f_right_level".intern())
				rightLevel = resultSet.getInt(i);
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
			else if(columnName.intern()=="f_navigation_enable".intern())
				navigationEnable = resultSet.getInt(i);
			else if(columnName.intern()=="f_ismodule".intern())
				ismodule = resultSet.getInt(i);
		}

	}

	/**
	* ͨ��MAP��ʼ����Ϣ
	*/
	public void setAttribute(java.util.HashMap map)throws NumberFormatException {
		windowId = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("windowId"), "-10"));
		styleId = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("styleId"), "-10"));
		iconId = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("iconId"), "-10"));
		icon1Id = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("icon1Id"), "-10"));
		windowName = NullProcessUtil.nvlToString(
			map.get("windowName"),"");
		enabled = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("enabled"), "-10"));
		pagePath = NullProcessUtil.nvlToString(
			map.get("pagePath"),"");
		rootNode = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("rootNode"), "-10"));
		rowCount = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("rowCount"), "-10"));
		colCount = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("colCount"), "-10"));
		width = NullProcessUtil.nvlToString(
			map.get("width"),"");
		height = NullProcessUtil.nvlToString(
			map.get("height"),"");
		forceStyle = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("forceStyle"), "-10"));
		rightLevel = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("rightLevel"), "-10"));
		description = NullProcessUtil.nvlToString(
			map.get("description"),"");
		createTime = NullProcessUtil.nvlToString(
			map.get("createTime"),"");
		modifyTime = NullProcessUtil.nvlToString(
			map.get("modifyTime"),"");
		knowledge = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("knowledge"), "-10"));
		navigationEnable = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("navigationEnable"), "-10"));
		ismodule = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("ismodule"), "-10"));
	}

	/**
		ת�����ַ���
	*/
	public String toString(int tabs) {
		StringBuffer ret = new StringBuffer();
		String str_tab = StringUtil.tabs(tabs);
		ret.append("<windowId>").append(windowId).append("</windowId>\n");
		ret.append(str_tab).append("<styleId>").append(styleId).append("</styleId>\n");
		ret.append(str_tab).append("<iconId>").append(iconId).append("</iconId>\n");
		ret.append(str_tab).append("<icon1Id>").append(icon1Id).append("</icon1Id>\n");
		ret.append(str_tab).append("<windowName>").append(nvl(windowName)).append("</windowName>\n");
		ret.append(str_tab).append("<enabled>").append(enabled).append("</enabled>\n");
		ret.append(str_tab).append("<pagePath>").append(nvl(pagePath)).append("</pagePath>\n");
		ret.append(str_tab).append("<rootNode>").append(rootNode).append("</rootNode>\n");
		ret.append(str_tab).append("<rowCount>").append(rowCount).append("</rowCount>\n");
		ret.append(str_tab).append("<colCount>").append(colCount).append("</colCount>\n");
		ret.append(str_tab).append("<width>").append(nvl(width)).append("</width>\n");
		ret.append(str_tab).append("<height>").append(nvl(height)).append("</height>\n");
		ret.append(str_tab).append("<forceStyle>").append(forceStyle).append("</forceStyle>\n");
		ret.append(str_tab).append("<rightLevel>").append(rightLevel).append("</rightLevel>\n");
		ret.append(str_tab).append("<description>").append(nvl(description)).append("</description>\n");
		ret.append(str_tab).append("<createTime>").append(nvl(createTime)).append("</createTime>\n");
		ret.append(str_tab).append("<modifyTime>").append(nvl(modifyTime)).append("</modifyTime>\n");
		ret.append(str_tab).append("<knowledge>").append(knowledge).append("</knowledge>\n");
		ret.append(str_tab).append("<navigationEnable>").append(navigationEnable).append("</navigationEnable>\n");
		ret.append(str_tab).append("<ismodule>").append(ismodule).append("</ismodule>\n");
		return ret.toString();
	}

}