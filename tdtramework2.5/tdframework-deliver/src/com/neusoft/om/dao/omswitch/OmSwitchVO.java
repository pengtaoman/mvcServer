package com.neusoft.om.dao.omswitch;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.BaseVO;
import com.neusoft.tdframework.common.util.StringUtil;
import com.neusoft.tdframework.common.util.XMLProperties;

/**
 * @author renh
 *
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
public class OmSwitchVO extends BaseVO {
	
	private	String	paraName;	//参数名称
	private	int	paraControl;	//1:开启 0 关闭
	private	String	paraValue;	//参数值
	private	String	paraDesc;	//参数描述

	/**
		空的构造方法
	*/
	public OmSwitchVO(){

	}
	/**
		通过属性值构造一个对象
	*/
	public OmSwitchVO(String paraName, int paraControl, String paraValue, String paraDesc){

	}
	/**
		通过一个已有对象构造一个对象
	*/
	public OmSwitchVO(OmSwitchVO other){
		if(this != other) {
			this.paraName = other.paraName;
			this.paraControl = other.paraControl;
			this.paraValue = other.paraValue;
			this.paraDesc = other.paraDesc;

		}
	}
	/** 
		空值处理
	*/
	private String nvl(String str) {
		return str==null?"":str;
	}

	/**
		设置参数名称
	*/
	public void setParaName(String paraName) {
		this.paraName = paraName;
	}
	/**
		获取参数名称
	*/
	public String getParaName() {
		return XMLProperties.prepareXml(this.paraName);
	}
	/**
		设置1:开启 0 关闭
	*/
	public void setParaControl(int paraControl) {
		this.paraControl = paraControl;
	}
	/**
		获取1:开启 0 关闭
	*/
	public int getParaControl() {
		return (this.paraControl);
	}
	/**
		设置参数值
	*/
	public void setParaValue(String paraValue) {
		this.paraValue = paraValue;
	}
	/**
		获取参数值
	*/
	public String getParaValue() {
		return (this.paraValue);
	}
	/**
		设置参数描述
	*/
	public void setParaDesc(String paraDesc) {
		this.paraDesc = paraDesc;
	}
	/**
		获取参数描述
	*/
	public String getParaDesc() {
		return XMLProperties.prepareXml(this.paraDesc);
	}

	/**
		以SQL的结果集设置数据
	*/
	public void setAttribute(ResultSet resultSet) throws SQLException {
		ResultSetMetaData metaData = resultSet.getMetaData();

		for(int i=1;i<=metaData.getColumnCount();i++) { 

			String columnName = metaData.getColumnName(i).toLowerCase();

			if(columnName.intern()=="f_para_name".intern())
				paraName = resultSet.getString(i);
			else if(columnName.intern()=="f_para_control".intern())
				paraControl = resultSet.getInt(i);
			else if(columnName.intern()=="f_para_value".intern())
				paraValue = resultSet.getString(i);
			else if(columnName.intern()=="f_para_desc".intern())
				paraDesc = resultSet.getString(i);
		}

	}

	/**
		转化成字符串
	*/
	public String toString(int tabs) {
		StringBuffer ret = new StringBuffer();
		String str_tab = StringUtil.tabs(tabs);
		ret.append("<ParaName>").append(XMLProperties.prepareXml(nvl(paraName))).append("</ParaName>\n");
		ret.append(str_tab).append("<ParaControl>").append(paraControl).append("</ParaControl>\n");
		ret.append(str_tab).append("<ParaValue>").append(nvl(paraValue)).append("</ParaValue>\n");
		ret.append(str_tab).append("<ParaDesc>").append(XMLProperties.prepareXml(nvl(paraDesc))).append("</ParaDesc>\n");
		return ret.toString();
	}

}
