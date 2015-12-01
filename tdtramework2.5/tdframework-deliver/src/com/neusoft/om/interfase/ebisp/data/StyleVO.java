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

public class StyleVO extends BaseVO { 
 	private	int	styleId;	//风格标识
	private	String	styleName;	//风格名称
	private	String	path;	//路径
	private	String	description;	//描述
	private	String	toolbar;	//工具栏
	private	String	shadow;	//阴影
	private	String	border;	//边框
	private	int	swith;	//初始隐藏
	private	int	barMin;	//最小化图标
	private	int	barMax;	//最大化图标
	private	int	barClose;	//关闭按钮
	private	String	barColor;	//按钮颜色
	private	String	borderStyle;	//边框样式

	/**
		空的构造方法
	*/
	public StyleVO(){

	}
	/**
		通过属性值构造一个对象
	*/
	public StyleVO(int styleId, String styleName, String path, String description, 
			String toolbar, String shadow, String border, int swith, int barMin, 
			int barMax, int barClose, String barColor, String borderStyle){

	}
	/**
		通过一个已有对象构造一个对象
	*/
	public StyleVO(StyleVO other){
		if(this != other) {
			this.styleId = other.styleId;
			this.styleName = other.styleName;
			this.path = other.path;
			this.description = other.description;
			this.toolbar = other.toolbar;
			this.shadow = other.shadow;
			this.border = other.border;
			this.swith = other.swith;
			this.barMin = other.barMin;
			this.barMax = other.barMax;
			this.barClose = other.barClose;
			this.barColor = other.barColor;
			this.borderStyle = other.borderStyle;

		}
	}
	/** 
		空值处理
	*/
	private String nvl(String str) {
		return str==null?"":str;
	}

	/**
		设置风格标识
	*/
	public void setStyleId(int styleId) {
		this.styleId = styleId;
	}
	/**
		获取风格标识
	*/
	public int getStyleId() {
		return (this.styleId);
	}
	/**
		设置风格名称
	*/
	public void setStyleName(String styleName) {
		this.styleName = styleName;
	}
	/**
		获取风格名称
	*/
	public String getStyleName() {
		return (this.styleName);
	}
	/**
		设置路径
	*/
	public void setPath(String path) {
		this.path = path;
	}
	/**
		获取路径
	*/
	public String getPath() {
		return (this.path);
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
		设置工具栏
	*/
	public void setToolbar(String toolbar) {
		this.toolbar = toolbar;
	}
	/**
		获取工具栏
	*/
	public String getToolbar() {
		return (this.toolbar);
	}
	/**
		设置阴影
	*/
	public void setShadow(String shadow) {
		this.shadow = shadow;
	}
	/**
		获取阴影
	*/
	public String getShadow() {
		return (this.shadow);
	}
	/**
		设置边框
	*/
	public void setBorder(String border) {
		this.border = border;
	}
	/**
		获取边框
	*/
	public String getBorder() {
		return (this.border);
	}
	/**
		设置初始隐藏
	*/
	public void setSwith(int swith) {
		this.swith = swith;
	}
	/**
		获取初始隐藏
	*/
	public int getSwith() {
		return (this.swith);
	}
	/**
		设置最小化图标
	*/
	public void setBarMin(int barMin) {
		this.barMin = barMin;
	}
	/**
		获取最小化图标
	*/
	public int getBarMin() {
		return (this.barMin);
	}
	/**
		设置最大化图标
	*/
	public void setBarMax(int barMax) {
		this.barMax = barMax;
	}
	/**
		获取最大化图标
	*/
	public int getBarMax() {
		return (this.barMax);
	}
	/**
		设置关闭按钮
	*/
	public void setBarClose(int barClose) {
		this.barClose = barClose;
	}
	/**
		获取关闭按钮
	*/
	public int getBarClose() {
		return (this.barClose);
	}
	/**
		设置按钮颜色
	*/
	public void setBarColor(String barColor) {
		this.barColor = barColor;
	}
	/**
		获取按钮颜色
	*/
	public String getBarColor() {
		return (this.barColor);
	}
	/**
		设置边框样式
	*/
	public void setBorderStyle(String borderStyle) {
		this.borderStyle = borderStyle;
	}
	/**
		获取边框样式
	*/
	public String getBorderStyle() {
		return (this.borderStyle);
	}

	/**
		以SQL的结果集设置数据
	*/
	public void setAttribute(ResultSet resultSet) throws SQLException {
		ResultSetMetaData metaData = resultSet.getMetaData();

		for(int i=1;i<=metaData.getColumnCount();i++) { 

			String columnName = metaData.getColumnName(i).toLowerCase();

			if(columnName.intern()=="f_style_id".intern())
				styleId = resultSet.getInt(i);
			else if(columnName.intern()=="f_style_name".intern())
				styleName = resultSet.getString(i);
			else if(columnName.intern()=="f_path".intern())
				path = resultSet.getString(i);
			else if(columnName.intern()=="f_description".intern())
				description = resultSet.getString(i);
			else if(columnName.intern()=="f_toolbar".intern())
				toolbar = resultSet.getString(i);
			else if(columnName.intern()=="f_shadow".intern())
				shadow = resultSet.getString(i);
			else if(columnName.intern()=="f_border".intern())
				border = resultSet.getString(i);
			else if(columnName.intern()=="f_switch".intern())
				swith = resultSet.getInt(i);
			else if(columnName.intern()=="f_bar_min".intern())
				barMin = resultSet.getInt(i);
			else if(columnName.intern()=="f_bar_max".intern())
				barMax = resultSet.getInt(i);
			else if(columnName.intern()=="f_bar_close".intern())
				barClose = resultSet.getInt(i);
			else if(columnName.intern()=="f_bar_color".intern())
				barColor = resultSet.getString(i);
			else if(columnName.intern()=="f_border_style".intern())
				borderStyle = resultSet.getString(i);
		}

	}

	/**
	* 通过MAP初始化信息
	*/
	public void setAttribute(java.util.HashMap map)throws NumberFormatException {
		styleId = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("styleId"), "-10"));
		styleName = NullProcessUtil.nvlToString(
			map.get("styleName"),"");
		path = NullProcessUtil.nvlToString(
			map.get("path"),"");
		description = NullProcessUtil.nvlToString(
			map.get("description"),"");
		toolbar = NullProcessUtil.nvlToString(
			map.get("toolbar"),"");
		shadow = NullProcessUtil.nvlToString(
			map.get("shadow"),"");
		border = NullProcessUtil.nvlToString(
			map.get("border"),"");
		swith = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("swith"), "-10"));
		barMin = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("barMin"), "-10"));
		barMax = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("barMax"), "-10"));
		barClose = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("barClose"), "-10"));
		barColor = NullProcessUtil.nvlToString(
			map.get("barColor"),"");
		borderStyle = NullProcessUtil.nvlToString(
			map.get("borderStyle"),"");
	}

	/**
		转化成字符串
	*/
	public String toString(int tabs) {
		StringBuffer ret = new StringBuffer();
		String str_tab = StringUtil.tabs(tabs);
		ret.append("<styleId>").append(styleId).append("</styleId>\n");
		ret.append(str_tab).append("<styleName>").append(nvl(styleName)).append("</styleName>\n");
		ret.append(str_tab).append("<path>").append(nvl(path)).append("</path>\n");
		ret.append(str_tab).append("<description>").append(nvl(description)).append("</description>\n");
		ret.append(str_tab).append("<toolbar>").append(nvl(toolbar)).append("</toolbar>\n");
		ret.append(str_tab).append("<shadow>").append(nvl(shadow)).append("</shadow>\n");
		ret.append(str_tab).append("<border>").append(nvl(border)).append("</border>\n");
		ret.append(str_tab).append("<swith>").append(swith).append("</swith>\n");
		ret.append(str_tab).append("<barMin>").append(barMin).append("</barMin>\n");
		ret.append(str_tab).append("<barMax>").append(barMax).append("</barMax>\n");
		ret.append(str_tab).append("<barClose>").append(barClose).append("</barClose>\n");
		ret.append(str_tab).append("<barColor>").append(nvl(barColor)).append("</barColor>\n");
		ret.append(str_tab).append("<borderStyle>").append(nvl(borderStyle)).append("</borderStyle>\n");
		return ret.toString();
	}

}