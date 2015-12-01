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
 	private	int	viewId;	//视图编号
	private	int	styleId;	//样式编号
	private	int	iconId;	//展开图标编号
	private	String	viewName;	//视图名称
	private	int	enabled;	//是否可用 0：不可用 1：可用
	private	String	pagePath;	//链接
	private	String	defWidth;	//宽度
	private	String	defHeight;	//高度
	private	int	defScroll;	//滚动
	private	String	defToolbar;	//是否有工具条
	private	String	viewType;	//视图类型
	private	int	viewLevel;	//视图级别
	private	String	description;	//描述
	private	String	createTime;	//创建时间
	private	String	modifyTime;	//修改时间
	private	int	knowledge;	//是否知识库的内容

	/**
		空的构造方法
	*/
	public ViewVO(){

	}
	/**
		通过属性值构造一个对象
	*/
	public ViewVO(int viewId, int styleId, int iconId, String viewName, int enabled, String pagePath, String defWidth, String defHeight, int defScroll, String defToolbar, String viewType, int viewLevel, String description, String createTime, String modifyTime, int knowledge){

	}
	/**
		通过一个已有对象构造一个对象
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
		空值处理
	*/
	private String nvl(String str) {
		return str==null?"":str;
	}

	/**
		设置视图编号
	*/
	public void setViewId(int viewId) {
		this.viewId = viewId;
	}
	/**
		获取视图编号
	*/
	public int getViewId() {
		return (this.viewId);
	}
	/**
		设置样式编号
	*/
	public void setStyleId(int styleId) {
		this.styleId = styleId;
	}
	/**
		获取样式编号
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
		设置视图名称
	*/
	public void setViewName(String viewName) {
		this.viewName = viewName;
	}
	/**
		获取视图名称
	*/
	public String getViewName() {
		return (this.viewName);
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
		设置宽度
	*/
	public void setDefWidth(String defWidth) {
		this.defWidth = defWidth;
	}
	/**
		获取宽度
	*/
	public String getDefWidth() {
		return (this.defWidth);
	}
	/**
		设置高度
	*/
	public void setDefHeight(String defHeight) {
		this.defHeight = defHeight;
	}
	/**
		获取高度
	*/
	public String getDefHeight() {
		return (this.defHeight);
	}
	/**
		设置滚动
	*/
	public void setDefScroll(int defScroll) {
		this.defScroll = defScroll;
	}
	/**
		获取滚动
	*/
	public int getDefScroll() {
		return (this.defScroll);
	}
	/**
		设置是否有工具条
	*/
	public void setDefToolbar(String defToolbar) {
		this.defToolbar = defToolbar;
	}
	/**
		获取是否有工具条
	*/
	public String getDefToolbar() {
		return (this.defToolbar);
	}
	/**
		设置视图类型
	*/
	public void setViewType(String viewType) {
		this.viewType = viewType;
	}
	/**
		获取视图类型
	*/
	public String getViewType() {
		return (this.viewType);
	}
	/**
		设置视图级别
	*/
	public void setViewLevel(int viewLevel) {
		this.viewLevel = viewLevel;
	}
	/**
		获取视图级别
	*/
	public int getViewLevel() {
		return (this.viewLevel);
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
		以SQL的结果集设置数据
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
	* 通过MAP初始化信息
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
		转化成字符串
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