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
 * Date: 2006-11-06
 * @author zhaof@neusoft.com
 * @version
 */

public class ButtonVO extends BaseVO { 
 	private	int	buttonId;	//��ť���
	private	int	windowId;	//��Ӧ�Ĵ��ڱ��
	private	String	buttonName;	//��ť����
	private	int	logEnabled;	//�Ƿ��¼��־
	private	String	buttonDesc;	//��ť����

	/**
		�յĹ��췽��
	*/
	public ButtonVO(){

	}
	/**
		ͨ������ֵ����һ������
	*/
	public ButtonVO(int buttonId, int windowId, String buttonName, int logEnabled, String buttonDesc){

	}
	/**
		ͨ��һ�����ж�����һ������
	*/
	public ButtonVO(ButtonVO other){
		if(this != other) {
			this.buttonId = other.buttonId;
			this.windowId = other.windowId;
			this.buttonName = other.buttonName;
			this.logEnabled = other.logEnabled;
			this.buttonDesc = other.buttonDesc;

		}
	}
	/** 
		��ֵ����
	*/
	private String nvl(String str) {
		return str==null?"":str;
	}

	/**
		���ð�ť���
	*/
	public void setButtonId(int buttonId) {
		this.buttonId = buttonId;
	}
	/**
		��ȡ��ť���
	*/
	public int getButtonId() {
		return (this.buttonId);
	}
	/**
		���ö�Ӧ�Ĵ��ڱ��
	*/
	public void setWindowId(int windowId) {
		this.windowId = windowId;
	}
	/**
		��ȡ��Ӧ�Ĵ��ڱ��
	*/
	public int getWindowId() {
		return (this.windowId);
	}
	/**
		���ð�ť����
	*/
	public void setButtonName(String buttonName) {
		this.buttonName = buttonName;
	}
	/**
		��ȡ��ť����
	*/
	public String getButtonName() {
		return (this.buttonName);
	}
	/**
		�����Ƿ��¼��־
	*/
	public void setLogEnabled(int logEnabled) {
		this.logEnabled = logEnabled;
	}
	/**
		��ȡ�Ƿ��¼��־
	*/
	public int getLogEnabled() {
		return (this.logEnabled);
	}
	/**
		���ð�ť����
	*/
	public void setButtonDesc(String buttonDesc) {
		this.buttonDesc = buttonDesc;
	}
	/**
		��ȡ��ť����
	*/
	public String getButtonDesc() {
		return (this.buttonDesc);
	}

	/**
		��SQL�Ľ������������
	*/
	public void setAttribute(ResultSet resultSet) throws SQLException {
		ResultSetMetaData metaData = resultSet.getMetaData();

		for(int i=1;i<=metaData.getColumnCount();i++) { 

			String columnName = metaData.getColumnName(i).toLowerCase();

			if(columnName.intern()=="f_button_id".intern())
				buttonId = resultSet.getInt(i);
			else if(columnName.intern()=="f_window_id".intern())
				windowId = resultSet.getInt(i);
			else if(columnName.intern()=="f_button_name".intern())
				buttonName = resultSet.getString(i);
			else if(columnName.intern()=="f_log_enabled".intern())
				logEnabled = resultSet.getInt(i);
			else if(columnName.intern()=="f_button_desc".intern())
				buttonDesc = resultSet.getString(i);
		}

	}

	/**
	* ͨ��MAP��ʼ����Ϣ
	*/
	public void setAttribute(java.util.HashMap map)throws NumberFormatException {
		buttonId = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("buttonId"), "-10"));
		windowId = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("windowId"), "-10"));
		buttonName = NullProcessUtil.nvlToString(
			map.get("buttonName"),"");
		logEnabled = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("logEnabled"), "-10"));
		buttonDesc = NullProcessUtil.nvlToString(
			map.get("buttonDesc"),"");
	}

	/**
		ת�����ַ���
	*/
	public String toString(int tabs) {
		StringBuffer ret = new StringBuffer();
		String str_tab = StringUtil.tabs(tabs);
		ret.append("<buttonId>").append(buttonId).append("</buttonId>\n");
		ret.append(str_tab).append("<windowId>").append(windowId).append("</windowId>\n");
		ret.append(str_tab).append("<buttonName>").append(nvl(buttonName)).append("</buttonName>\n");
		ret.append(str_tab).append("<logEnabled>").append(logEnabled).append("</logEnabled>\n");
		ret.append(str_tab).append("<buttonDesc>").append(nvl(buttonDesc)).append("</buttonDesc>\n");
		return ret.toString();
	}

}