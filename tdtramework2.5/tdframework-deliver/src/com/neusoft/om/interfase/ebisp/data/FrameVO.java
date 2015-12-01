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
 	private	int	frameId;	//��ܱ��
	private	int	styleId;	//��ʽ��ţ��Կ������
	private	int	iconId;	//չ��ͼ���ţ��Կ������
	private	int	icon1Id;	//�۵�ͼ���ţ��Կ������
	private	String	frameName;	//�������
	private	int	enabled;	//�Ƿ���� 0�������� 1������
	private	String	pagePath;	//���ӣ��������frame��view��window�˴�Ϊ��
	private	int	rowCount;	//����
	private	int	colCount;	//����
	private	String	defWidth;	//Ĭ�Ͽ��
	private	String	defHeight;	//Ĭ�ϸ߶�
	private	String	frameType;	//Ԥ���ֶ�
	private	String	description;	//����
	private	String	createTime;	//����ʱ��
	private	String	modifyTime;	//�޸�ʱ��
	private	int	knowledge;	//�Ƿ�֪ʶ�������
	private IconVO iconVO;
	private StyleVO styleVO;

	/**
		�յĹ��췽��
	*/
	public FrameVO(){

	}
	/**
		ͨ������ֵ����һ������
	*/
	public FrameVO(int frameId, int styleId, int iconId, int icon1Id, String frameName,
			int enabled, String pagePath, int rowCount, int colCount, String defWidth, 
			String defHeight, String frameType, String description, String createTime, 
			String modifyTime, int knowledge,IconVO iconVO, StyleVO styleVO){

	}
	/**
		ͨ��һ�����ж�����һ������
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
		��ֵ����
	*/
	private String nvl(String str) {
		return str==null?"":str;
	}

	/**
		���ÿ�ܱ��
	*/
	public void setFrameId(int frameId) {
		this.frameId = frameId;
	}
	/**
		��ȡ��ܱ��
	*/
	public int getFrameId() {
		return (this.frameId);
	}
	/**
		������ʽ��ţ��Կ������
	*/
	public void setStyleId(int styleId) {
		this.styleId = styleId;
	}
	/**
		��ȡ��ʽ��ţ��Կ������
	*/
	public int getStyleId() {
		return (this.styleId);
	}
	/**
		����չ��ͼ���ţ��Կ������
	*/
	public void setIconId(int iconId) {
		this.iconId = iconId;
	}
	/**
		��ȡչ��ͼ���ţ��Կ������
	*/
	public int getIconId() {
		return (this.iconId);
	}
	/**
		�����۵�ͼ���ţ��Կ������
	*/
	public void setIcon1Id(int icon1Id) {
		this.icon1Id = icon1Id;
	}
	/**
		��ȡ�۵�ͼ���ţ��Կ������
	*/
	public int getIcon1Id() {
		return (this.icon1Id);
	}
	/**
		���ÿ������
	*/
	public void setFrameName(String frameName) {
		this.frameName = frameName;
	}
	/**
		��ȡ�������
	*/
	public String getFrameName() {
		return (this.frameName);
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
		�������ӣ��������frame��view��window�˴�Ϊ��
	*/
	public void setPagePath(String pagePath) {
		this.pagePath = pagePath;
	}
	/**
		��ȡ���ӣ��������frame��view��window�˴�Ϊ��
	*/
	public String getPagePath() {
		return (this.pagePath);
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
		����Ԥ���ֶ�
	*/
	public void setFrameType(String frameType) {
		this.frameType = frameType;
	}
	/**
		��ȡԤ���ֶ�
	*/
	public String getFrameType() {
		return (this.frameType);
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
	* ͨ��MAP��ʼ����Ϣ
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
		ת�����ַ���
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