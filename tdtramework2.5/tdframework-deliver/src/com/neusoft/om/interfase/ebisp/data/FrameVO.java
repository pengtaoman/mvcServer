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

public class FrameVO extends BaseVO { 
 	private	int	frameId;	//框架编号
	private	int	styleId;	//样式编号，对框架无用
	private	int	iconId;	//展开图标编号，对框架无用
	private	int	icon1Id;	//折叠图表编号，对框架无用
	private	String	frameName;	//框架名称
	private	int	enabled;	//是否可用 0：不可用 1：可用
	private	String	pagePath;	//链接，下面存在frame和view的window此处为空
	private	int	rowCount;	//行数
	private	int	colCount;	//列数
	private	String	defWidth;	//默认宽度
	private	String	defHeight;	//默认高度
	private	String	frameType;	//预留字段
	private	String	description;	//描述
	private	String	createTime;	//创建时间
	private	String	modifyTime;	//修改时间
	private	int	knowledge;	//是否知识库的内容
	private IconVO iconVO;
	private StyleVO styleVO;

	/**
		空的构造方法
	*/
	public FrameVO(){

	}
	/**
		通过属性值构造一个对象
	*/
	public FrameVO(int frameId, int styleId, int iconId, int icon1Id, String frameName,
			int enabled, String pagePath, int rowCount, int colCount, String defWidth, 
			String defHeight, String frameType, String description, String createTime, 
			String modifyTime, int knowledge,IconVO iconVO, StyleVO styleVO){

	}
	/**
		通过一个已有对象构造一个对象
	*/
	public FrameVO(FrameVO other){
		if(this != other) {
			this.frameId = other.frameId;
			this.styleId = other.styleId;
			this.iconId = other.iconId;
			this.icon1Id = other.icon1Id;
			this.frameName = other.frameName;
			this.enabled = other.enabled;
			this.pagePath = other.pagePath;
			this.rowCount = other.rowCount;
			this.colCount = other.colCount;
			this.defWidth = other.defWidth;
			this.defHeight = other.defHeight;
			this.frameType = other.frameType;
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
		设置框架编号
	*/
	public void setFrameId(int frameId) {
		this.frameId = frameId;
	}
	/**
		获取框架编号
	*/
	public int getFrameId() {
		return (this.frameId);
	}
	/**
		设置样式编号，对框架无用
	*/
	public void setStyleId(int styleId) {
		this.styleId = styleId;
	}
	/**
		获取样式编号，对框架无用
	*/
	public int getStyleId() {
		return (this.styleId);
	}
	/**
		设置展开图标编号，对框架无用
	*/
	public void setIconId(int iconId) {
		this.iconId = iconId;
	}
	/**
		获取展开图标编号，对框架无用
	*/
	public int getIconId() {
		return (this.iconId);
	}
	/**
		设置折叠图表编号，对框架无用
	*/
	public void setIcon1Id(int icon1Id) {
		this.icon1Id = icon1Id;
	}
	/**
		获取折叠图表编号，对框架无用
	*/
	public int getIcon1Id() {
		return (this.icon1Id);
	}
	/**
		设置框架名称
	*/
	public void setFrameName(String frameName) {
		this.frameName = frameName;
	}
	/**
		获取框架名称
	*/
	public String getFrameName() {
		return (this.frameName);
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
		设置链接，下面存在frame和view的window此处为空
	*/
	public void setPagePath(String pagePath) {
		this.pagePath = pagePath;
	}
	/**
		获取链接，下面存在frame和view的window此处为空
	*/
	public String getPagePath() {
		return (this.pagePath);
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
		设置预留字段
	*/
	public void setFrameType(String frameType) {
		this.frameType = frameType;
	}
	/**
		获取预留字段
	*/
	public String getFrameType() {
		return (this.frameType);
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

			if(columnName.intern()=="f_frame_id".intern())
				frameId = resultSet.getInt(i);
			else if(columnName.intern()=="f_style_id".intern())
				styleId = resultSet.getInt(i);
			else if(columnName.intern()=="f_icon_id".intern())
				iconId = resultSet.getInt(i);
			else if(columnName.intern()=="f_icon1_id".intern())
				icon1Id = resultSet.getInt(i);
			else if(columnName.intern()=="f_frame_name".intern())
				frameName = resultSet.getString(i);
			else if(columnName.intern()=="f_enabled".intern())
				enabled = resultSet.getInt(i);
			else if(columnName.intern()=="f_page_path".intern())
				pagePath = resultSet.getString(i);
			else if(columnName.intern()=="f_row_count".intern())
				rowCount = resultSet.getInt(i);
			else if(columnName.intern()=="f_col_count".intern())
				colCount = resultSet.getInt(i);
			else if(columnName.intern()=="f_def_width".intern())
				defWidth = resultSet.getString(i);
			else if(columnName.intern()=="f_def_height".intern())
				defHeight = resultSet.getString(i);
			else if(columnName.intern()=="f_frame_type".intern())
				frameType = resultSet.getString(i);
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
		frameId = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("frameId"), "-10"));
		styleId = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("styleId"), "-10"));
		iconId = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("iconId"), "-10"));
		icon1Id = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("icon1Id"), "-10"));
		frameName = NullProcessUtil.nvlToString(
			map.get("frameName"),"");
		enabled = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("enabled"), "-10"));
		pagePath = NullProcessUtil.nvlToString(
			map.get("pagePath"),"");
		rowCount = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("rowCount"), "-10"));
		colCount = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("colCount"), "-10"));
		defWidth = NullProcessUtil.nvlToString(
			map.get("defWidth"),"");
		defHeight = NullProcessUtil.nvlToString(
			map.get("defHeight"),"");
		frameType = NullProcessUtil.nvlToString(
			map.get("frameType"),"");
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
		ret.append("<frameId>").append(frameId).append("</frameId>\n");
		ret.append(str_tab).append("<styleId>").append(styleId).append("</styleId>\n");
		ret.append(str_tab).append("<iconId>").append(iconId).append("</iconId>\n");
		ret.append(str_tab).append("<icon1Id>").append(icon1Id).append("</icon1Id>\n");
		ret.append(str_tab).append("<frameName>").append(nvl(frameName)).append("</frameName>\n");
		ret.append(str_tab).append("<enabled>").append(enabled).append("</enabled>\n");
		ret.append(str_tab).append("<pagePath>").append(nvl(pagePath)).append("</pagePath>\n");
		ret.append(str_tab).append("<rowCount>").append(rowCount).append("</rowCount>\n");
		ret.append(str_tab).append("<colCount>").append(colCount).append("</colCount>\n");
		ret.append(str_tab).append("<defWidth>").append(nvl(defWidth)).append("</defWidth>\n");
		ret.append(str_tab).append("<defHeight>").append(nvl(defHeight)).append("</defHeight>\n");
		ret.append(str_tab).append("<frameType>").append(nvl(frameType)).append("</frameType>\n");
		ret.append(str_tab).append("<description>").append(nvl(description)).append("</description>\n");
		ret.append(str_tab).append("<createTime>").append(nvl(createTime)).append("</createTime>\n");
		ret.append(str_tab).append("<modifyTime>").append(nvl(modifyTime)).append("</modifyTime>\n");
		ret.append(str_tab).append("<knowledge>").append(knowledge).append("</knowledge>\n");
		return ret.toString();
	}

}