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

public class FrameRelViewVO extends BaseVO { 
 	private	int	viewId;	//��ͼ��ʶ
	private	int	frameId;	//��ܱ�ʶ
	private	int	rowNum;	//�к�
	private	int	colNum;	//�к�
	private	int	rowspan;	//��Խ����
	private	int	colspan;	//��Խ����
	private	String	width;	//���
	private	String	height;	//�߶�
	private	int	scroll;	//������

	/**
		�յĹ��췽��
	*/
	public FrameRelViewVO(){

	}
	/**
		ͨ������ֵ����һ������
	*/
	public FrameRelViewVO(int viewId, int frameId, int rowNum, int colNum, int rowspan, int colspan, String width, String height, int scroll){

	}
	/**
		ͨ��һ�����ж�����һ������
	*/
	public FrameRelViewVO(FrameRelViewVO other){
		if(this != other) {
			this.viewId = other.viewId;
			this.frameId = other.frameId;
			this.rowNum = other.rowNum;
			this.colNum = other.colNum;
			this.rowspan = other.rowspan;
			this.colspan = other.colspan;
			this.width = other.width;
			this.height = other.height;
			this.scroll = other.scroll;

		}
	}
	/** 
		��ֵ����
	*/
	private String nvl(String str) {
		return str==null?"":str;
	}

	/**
		������ͼ��ʶ
	*/
	public void setViewId(int viewId) {
		this.viewId = viewId;
	}
	/**
		��ȡ��ͼ��ʶ
	*/
	public int getViewId() {
		return (this.viewId);
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
		���ù�����
	*/
	public void setScroll(int scroll) {
		this.scroll = scroll;
	}
	/**
		��ȡ������
	*/
	public int getScroll() {
		return (this.scroll);
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
			else if(columnName.intern()=="f_frame_id".intern())
				frameId = resultSet.getInt(i);
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
			else if(columnName.intern()=="f_scroll".intern())
				scroll = resultSet.getInt(i);
		}

	}

	/**
	* ͨ��MAP��ʼ����Ϣ
	*/
	public void setAttribute(java.util.HashMap map)throws NumberFormatException {
		viewId = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("viewId"), "-10"));
		frameId = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("frameId"), "-10"));
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
		scroll = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("scroll"), "-10"));
	}

	/**
		ת�����ַ���
	*/
	public String toString(int tabs) {
		StringBuffer ret = new StringBuffer();
		String str_tab = StringUtil.tabs(tabs);
		ret.append("<viewId>").append(viewId).append("</viewId>\n");
		ret.append(str_tab).append("<frameId>").append(frameId).append("</frameId>\n");
		ret.append(str_tab).append("<rowNum>").append(rowNum).append("</rowNum>\n");
		ret.append(str_tab).append("<colNum>").append(colNum).append("</colNum>\n");
		ret.append(str_tab).append("<rowspan>").append(rowspan).append("</rowspan>\n");
		ret.append(str_tab).append("<colspan>").append(colspan).append("</colspan>\n");
		ret.append(str_tab).append("<width>").append(nvl(width)).append("</width>\n");
		ret.append(str_tab).append("<height>").append(nvl(height)).append("</height>\n");
		ret.append(str_tab).append("<scroll>").append(scroll).append("</scroll>\n");
		return ret.toString();
	}

}