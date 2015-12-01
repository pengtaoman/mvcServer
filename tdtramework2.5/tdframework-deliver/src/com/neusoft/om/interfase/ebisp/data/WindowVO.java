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
 	private	int	windowId;	//窗口编号
	private	int	styleId;	//样式编号，对窗口无用
	private	int	iconId;	//展开图标编号
	private	int	icon1Id;	//折叠图表编号
	private	String	windowName;	//窗口名称
	private	int	enabled;	//是否可用 0：不可用 1：可用
	private	String	pagePath;	//链接
	private	int	rootNode;	//对应的根节点  个人知识库,公共知识库：1 其他：0
	private	int	rowCount;	//行数
	private	int	colCount;	//列数
	private	String	width;	//宽度 window无用
	private	String	height;	//高度 window无用
	private	int	forceStyle;	//强制风格
	private	int	rightLevel;	//权限级别
	private	String	description;	//描述
	private	String	createTime;	//创建时间
	private	String	modifyTime;	//修改时间
	private	int	knowledge;	//是否知识库的内容
	private	int	navigationEnable;	//点击动作类型：展开，无动作，进入，弹出
	private	int	ismodule;	//是否是模块级
	private IconVO iconVO;
	private StyleVO  styleVO;

	/**
		空的构造方法
	*/
	public WindowVO(){

	}
	/**
		通过属性值构造一个对象
	*/
	public WindowVO(int windowId, int styleId, int iconId, int icon1Id, 
			String windowName, int enabled, String pagePath, int rootNode, 
			int rowCount, int colCount, String width, String height, 
			int forceStyle, int rightLevel, String description, String createTime,
			String modifyTime, int knowledge, int navigationEnable, int ismodule,
			IconVO iconVO, StyleVO styleVO){

	}
	/**
		通过一个已有对象构造一个对象
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
		空值处理
	*/
	private String nvl(String str) {
		return str==null?"":str;
	}

	/**
		设置窗口编号
	*/
	public void setWindowId(int windowId) {
		this.windowId = windowId;
	}
	/**
		获取窗口编号
	*/
	public int getWindowId() {
		return (this.windowId);
	}
	/**
		设置样式编号，对窗口无用
	*/
	public void setStyleId(int styleId) {
		this.styleId = styleId;
	}
	/**
		获取样式编号，对窗口无用
	*/
	public int getStyleId() {
		return (this.styleId);
	}
	/**
		设置展开图标编号
	*/
	public void setIconId(int iconId) {
		this.iconId = iconId;
	}
	/**
		获取展开图标编号
	*/
	public int getIconId() {
		return (this.iconId);
	}
	/**
		设置折叠图表编号
	*/
	public void setIcon1Id(int icon1Id) {
		this.icon1Id = icon1Id;
	}
	/**
		获取折叠图表编号
	*/
	public int getIcon1Id() {
		return (this.icon1Id);
	}
	/**
		设置窗口名称
	*/
	public void setWindowName(String windowName) {
		this.windowName = windowName;
	}
	/**
		获取窗口名称
	*/
	public String getWindowName() {
		return (this.windowName);
	}
	/**
		设置是否可用 0：不可用 1：可用
	*/
	public void setEnabled(int enabled) {
		this.enabled = enabled;
	}
	/**
		获取是否可用 0：不可用 1：可用
	*/
	public int getEnabled() {
		return (this.enabled);
	}
	/**
		设置链接
	*/
	public void setPagePath(String pagePath) {
		this.pagePath = pagePath;
	}
	/**
		获取链接
	*/
	public String getPagePath() {
		return (this.pagePath);
	}
	/**
		设置对应的根节点  个人知识库,公共知识库：1 其他：0
	*/
	public void setRootNode(int rootNode) {
		this.rootNode = rootNode;
	}
	/**
		获取对应的根节点  个人知识库,公共知识库：1 其他：0
	*/
	public int getRootNode() {
		return (this.rootNode);
	}
	/**
		设置行数
	*/
	public void setRowCount(int rowCount) {
		this.rowCount = rowCount;
	}
	/**
		获取行数
	*/
	public int getRowCount() {
		return (this.rowCount);
	}
	/**
		设置列数
	*/
	public void setColCount(int colCount) {
		this.colCount = colCount;
	}
	/**
		获取列数
	*/
	public int getColCount() {
		return (this.colCount);
	}
	/**
		设置宽度 window无用
	*/
	public void setWidth(String width) {
		this.width = width;
	}
	/**
		获取宽度 window无用
	*/
	public String getWidth() {
		return (this.width);
	}
	/**
		设置高度 window无用
	*/
	public void setHeight(String height) {
		this.height = height;
	}
	/**
		获取高度 window无用
	*/
	public String getHeight() {
		return (this.height);
	}
	/**
		设置预留，一般为0
	*/
	public void setForceStyle(int forceStyle) {
		this.forceStyle = forceStyle;
	}
	/**
		获取预留，一般为0
	*/
	public int getForceStyle() {
		return (this.forceStyle);
	}
	/**
		设置预留
	*/
	public void setRightLevel(int rightLevel) {
		this.rightLevel = rightLevel;
	}
	/**
		获取预留
	*/
	public int getRightLevel() {
		return (this.rightLevel);
	}
	/**
		设置描述
	*/
	public void setDescription(String description) {
		this.description = description;
	}
	/**
		获取描述
	*/
	public String getDescription() {
		return (this.description);
	}
	/**
		设置创建时间
	*/
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
	/**
		获取创建时间
	*/
	public String getCreateTime() {
		return (this.createTime);
	}
	/**
		设置修改时间
	*/
	public void setModifyTime(String modifyTime) {
		this.modifyTime = modifyTime;
	}
	/**
		获取修改时间
	*/
	public String getModifyTime() {
		return (this.modifyTime);
	}
	/**
		设置是否知识库的内容
	*/
	public void setKnowledge(int knowledge) {
		this.knowledge = knowledge;
	}
	/**
		获取是否知识库的内容
	*/
	public int getKnowledge() {
		return (this.knowledge);
	}
	/**
		设置点击动作类型：展开，无动作，进入，弹出
	*/
	public void setNavigationEnable(int navigationEnable) {
		this.navigationEnable = navigationEnable;
	}
	/**
		获取点击动作类型：展开，无动作，进入，弹出
	*/
	public int getNavigationEnable() {
		return (this.navigationEnable);
	}
	/**
		设置是否在‘模块维护’中维护
	*/
	public void setIsmodule(int ismodule) {
		this.ismodule = ismodule;
	}
	/**
		获取是否在‘模块维护’中维护
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
		以SQL的结果集设置数据
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
	* 通过MAP初始化信息
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
		转化成字符串
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