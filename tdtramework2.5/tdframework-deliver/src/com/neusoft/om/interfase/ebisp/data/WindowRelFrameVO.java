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
 * Date: 2006-11-13
 * @author zhaof@neusoft.com
 * @version
 */

public class WindowRelFrameVO extends BaseVO { 
 	private	int	frameId;	//框架标识
	private	int	windowId;	//窗口标识
	private	int	rowNum;	//行号
	private	int	colNum;	//列号
	private	int	rowspan;	//跨越行数
	private	int	colspan;	//跨越列数
	private	String	width;	//宽度
	private	String	height;	//高度
	private	String	frameGroup;	//框架组

	/**
		空的构造方法
	*/
	public WindowRelFrameVO(){

	}
	/**
		通过属性值构造一个对象
	*/
	public WindowRelFrameVO(int frameId, int windowId, int rowNum, int colNum, int rowspan, int colspan, String width, String height, String frameGroup){

	}
	/**
		通过一个已有对象构造一个对象
	*/
	public WindowRelFrameVO(WindowRelFrameVO other){
		if(this != other) {
			this.frameId = other.frameId;
			this.windowId = other.windowId;
			this.rowNum = other.rowNum;
			this.colNum = other.colNum;
			this.rowspan = other.rowspan;
			this.colspan = other.colspan;
			this.width = other.width;
			this.height = other.height;
			this.frameGroup = other.frameGroup;

		}
	}
	/** 
		空值处理
	*/
	private String nvl(String str) {
		return str==null?"":str;
	}

	/**
		设置框架标识
	*/
	public void setFrameId(int frameId) {
		this.frameId = frameId;
	}
	/**
		获取框架标识
	*/
	public int getFrameId() {
		return (this.frameId);
	}
	/**
		设置窗口标识
	*/
	public void setWindowId(int windowId) {
		this.windowId = windowId;
	}
	/**
		获取窗口标识
	*/
	public int getWindowId() {
		return (this.windowId);
	}
	/**
		设置行号
	*/
	public void setRowNum(int rowNum) {
		this.rowNum = rowNum;
	}
	/**
		获取行号
	*/
	public int getRowNum() {
		return (this.rowNum);
	}
	/**
		设置列号
	*/
	public void setColNum(int colNum) {
		this.colNum = colNum;
	}
	/**
		获取列号
	*/
	public int getColNum() {
		return (this.colNum);
	}
	/**
		设置跨越行数
	*/
	public void setRowspan(int rowspan) {
		this.rowspan = rowspan;
	}
	/**
		获取跨越行数
	*/
	public int getRowspan() {
		return (this.rowspan);
	}
	/**
		设置跨越列数
	*/
	public void setColspan(int colspan) {
		this.colspan = colspan;
	}
	/**
		获取跨越列数
	*/
	public int getColspan() {
		return (this.colspan);
	}
	/**
		设置宽度
	*/
	public void setWidth(String width) {
		this.width = width;
	}
	/**
		获取宽度
	*/
	public String getWidth() {
		return (this.width);
	}
	/**
		设置高度
	*/
	public void setHeight(String height) {
		this.height = height;
	}
	/**
		获取高度
	*/
	public String getHeight() {
		return (this.height);
	}
	/**
		设置框架组
	*/
	public void setFrameGroup(String frameGroup) {
		this.frameGroup = frameGroup;
	}
	/**
		获取框架组
	*/
	public String getFrameGroup() {
		return (this.frameGroup);
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
			else if(columnName.intern()=="f_window_id".intern())
				windowId = resultSet.getInt(i);
			else if(columnName.intern()=="f_row_num".intern())
				rowNum = resultSet.getInt(i);
			else if(columnName.intern()=="f_col_num".intern())
				colNum = resultSet.getInt(i);
			else if(columnName.intern()=="f_rowspan".intern())
				rowspan = resultSet.getInt(i);
			else if(columnName.intern()=="f_colspan".intern())
				colspan = resultSet.getInt(i);
			else if(columnName.intern()=="f_width".intern())
				width = resultSet.getString(i);
			else if(columnName.intern()=="f_height".intern())
				height = resultSet.getString(i);
			else if(columnName.intern()=="f_frame_group".intern())
				frameGroup = resultSet.getString(i);
		}

	}

	/**
	* 通过MAP初始化信息
	*/
	public void setAttribute(java.util.HashMap map)throws NumberFormatException {
		frameId = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("frameId"), "-10"));
		windowId = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("windowId"), "-10"));
		rowNum = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("rowNum"), "-10"));
		colNum = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("colNum"), "-10"));
		rowspan = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("rowspan"), "-10"));
		colspan = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("colspan"), "-10"));
		width = NullProcessUtil.nvlToString(
			map.get("width"),"");
		height = NullProcessUtil.nvlToString(
			map.get("height"),"");
		frameGroup = NullProcessUtil.nvlToString(
			map.get("frameGroup"),"");
	}

	/**
		转化成字符串
	*/
	public String toString(int tabs) {
		StringBuffer ret = new StringBuffer();
		String str_tab = StringUtil.tabs(tabs);
		ret.append("<frameId>").append(frameId).append("</frameId>\n");
		ret.append(str_tab).append("<windowId>").append(windowId).append("</windowId>\n");
		ret.append(str_tab).append("<rowNum>").append(rowNum).append("</rowNum>\n");
		ret.append(str_tab).append("<colNum>").append(colNum).append("</colNum>\n");
		ret.append(str_tab).append("<rowspan>").append(rowspan).append("</rowspan>\n");
		ret.append(str_tab).append("<colspan>").append(colspan).append("</colspan>\n");
		ret.append(str_tab).append("<width>").append(nvl(width)).append("</width>\n");
		ret.append(str_tab).append("<height>").append(nvl(height)).append("</height>\n");
		ret.append(str_tab).append("<frameGroup>").append(nvl(frameGroup)).append("</frameGroup>\n");
		return ret.toString();
	}

}