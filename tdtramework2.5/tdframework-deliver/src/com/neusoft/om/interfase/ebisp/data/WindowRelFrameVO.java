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
 	private	int	frameId;	//��ܱ�ʶ
	private	int	windowId;	//���ڱ�ʶ
	private	int	rowNum;	//�к�
	private	int	colNum;	//�к�
	private	int	rowspan;	//��Խ����
	private	int	colspan;	//��Խ����
	private	String	width;	//���
	private	String	height;	//�߶�
	private	String	frameGroup;	//�����

	/**
		�յĹ��췽��
	*/
	public WindowRelFrameVO(){

	}
	/**
		ͨ������ֵ����һ������
	*/
	public WindowRelFrameVO(int frameId, int windowId, int rowNum, int colNum, int rowspan, int colspan, String width, String height, String frameGroup){

	}
	/**
		ͨ��һ�����ж�����һ������
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
		��ֵ����
	*/
	private String nvl(String str) {
		return str==null?"":str;
	}

	/**
		���ÿ�ܱ�ʶ
	*/
	public void setFrameId(int frameId) {
		this.frameId = frameId;
	}
	/**
		��ȡ��ܱ�ʶ
	*/
	public int getFrameId() {
		return (this.frameId);
	}
	/**
		���ô��ڱ�ʶ
	*/
	public void setWindowId(int windowId) {
		this.windowId = windowId;
	}
	/**
		��ȡ���ڱ�ʶ
	*/
	public int getWindowId() {
		return (this.windowId);
	}
	/**
		�����к�
	*/
	public void setRowNum(int rowNum) {
		this.rowNum = rowNum;
	}
	/**
		��ȡ�к�
	*/
	public int getRowNum() {
		return (this.rowNum);
	}
	/**
		�����к�
	*/
	public void setColNum(int colNum) {
		this.colNum = colNum;
	}
	/**
		��ȡ�к�
	*/
	public int getColNum() {
		return (this.colNum);
	}
	/**
		���ÿ�Խ����
	*/
	public void setRowspan(int rowspan) {
		this.rowspan = rowspan;
	}
	/**
		��ȡ��Խ����
	*/
	public int getRowspan() {
		return (this.rowspan);
	}
	/**
		���ÿ�Խ����
	*/
	public void setColspan(int colspan) {
		this.colspan = colspan;
	}
	/**
		��ȡ��Խ����
	*/
	public int getColspan() {
		return (this.colspan);
	}
	/**
		���ÿ��
	*/
	public void setWidth(String width) {
		this.width = width;
	}
	/**
		��ȡ���
	*/
	public String getWidth() {
		return (this.width);
	}
	/**
		���ø߶�
	*/
	public void setHeight(String height) {
		this.height = height;
	}
	/**
		��ȡ�߶�
	*/
	public String getHeight() {
		return (this.height);
	}
	/**
		���ÿ����
	*/
	public void setFrameGroup(String frameGroup) {
		this.frameGroup = frameGroup;
	}
	/**
		��ȡ�����
	*/
	public String getFrameGroup() {
		return (this.frameGroup);
	}

	/**
		��SQL�Ľ������������
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
	* ͨ��MAP��ʼ����Ϣ
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
		ת�����ַ���
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