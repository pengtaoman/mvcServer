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
 	private	int	styleId;	//����ʶ
	private	String	styleName;	//�������
	private	String	path;	//·��
	private	String	description;	//����
	private	String	toolbar;	//������
	private	String	shadow;	//��Ӱ
	private	String	border;	//�߿�
	private	int	swith;	//��ʼ����
	private	int	barMin;	//��С��ͼ��
	private	int	barMax;	//���ͼ��
	private	int	barClose;	//�رհ�ť
	private	String	barColor;	//��ť��ɫ
	private	String	borderStyle;	//�߿���ʽ

	/**
		�յĹ��췽��
	*/
	public StyleVO(){

	}
	/**
		ͨ������ֵ����һ������
	*/
	public StyleVO(int styleId, String styleName, String path, String description, 
			String toolbar, String shadow, String border, int swith, int barMin, 
			int barMax, int barClose, String barColor, String borderStyle){

	}
	/**
		ͨ��һ�����ж�����һ������
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
		��ֵ����
	*/
	private String nvl(String str) {
		return str==null?"":str;
	}

	/**
		���÷���ʶ
	*/
	public void setStyleId(int styleId) {
		this.styleId = styleId;
	}
	/**
		��ȡ����ʶ
	*/
	public int getStyleId() {
		return (this.styleId);
	}
	/**
		���÷������
	*/
	public void setStyleName(String styleName) {
		this.styleName = styleName;
	}
	/**
		��ȡ�������
	*/
	public String getStyleName() {
		return (this.styleName);
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
		���ù�����
	*/
	public void setToolbar(String toolbar) {
		this.toolbar = toolbar;
	}
	/**
		��ȡ������
	*/
	public String getToolbar() {
		return (this.toolbar);
	}
	/**
		������Ӱ
	*/
	public void setShadow(String shadow) {
		this.shadow = shadow;
	}
	/**
		��ȡ��Ӱ
	*/
	public String getShadow() {
		return (this.shadow);
	}
	/**
		���ñ߿�
	*/
	public void setBorder(String border) {
		this.border = border;
	}
	/**
		��ȡ�߿�
	*/
	public String getBorder() {
		return (this.border);
	}
	/**
		���ó�ʼ����
	*/
	public void setSwith(int swith) {
		this.swith = swith;
	}
	/**
		��ȡ��ʼ����
	*/
	public int getSwith() {
		return (this.swith);
	}
	/**
		������С��ͼ��
	*/
	public void setBarMin(int barMin) {
		this.barMin = barMin;
	}
	/**
		��ȡ��С��ͼ��
	*/
	public int getBarMin() {
		return (this.barMin);
	}
	/**
		�������ͼ��
	*/
	public void setBarMax(int barMax) {
		this.barMax = barMax;
	}
	/**
		��ȡ���ͼ��
	*/
	public int getBarMax() {
		return (this.barMax);
	}
	/**
		���ùرհ�ť
	*/
	public void setBarClose(int barClose) {
		this.barClose = barClose;
	}
	/**
		��ȡ�رհ�ť
	*/
	public int getBarClose() {
		return (this.barClose);
	}
	/**
		���ð�ť��ɫ
	*/
	public void setBarColor(String barColor) {
		this.barColor = barColor;
	}
	/**
		��ȡ��ť��ɫ
	*/
	public String getBarColor() {
		return (this.barColor);
	}
	/**
		���ñ߿���ʽ
	*/
	public void setBorderStyle(String borderStyle) {
		this.borderStyle = borderStyle;
	}
	/**
		��ȡ�߿���ʽ
	*/
	public String getBorderStyle() {
		return (this.borderStyle);
	}

	/**
		��SQL�Ľ������������
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
	* ͨ��MAP��ʼ����Ϣ
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
		ת�����ַ���
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