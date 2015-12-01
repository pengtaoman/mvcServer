package com.neusoft.tdframework.authorization; 

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.BaseVO;

/**
 * Title: 工作区
 * Description: 
 * Company: neusoft
 * Date: 2004-12-14
 * @author ren.hui@neusoft.com
 * @version 
 */
public class FrameWorkVO extends BaseVO { 
	private	String	systemId;	//系统编码
	private	String	workMenuId;	//工作区菜单编码
	private	String	workMenuName;	//工作区菜单名
	private	int	workMenuOrder;	//工作区菜单顺序
	private	String	workPageLink;	//链接

	/**
		空的构造方法
	*/
	public FrameWorkVO(){

	}
	/**
		通过属性值构造一个对象
	*/
	public FrameWorkVO(String systemId, String workMenuId, String workMenuName, int workMenuOrder, String workPageLink){

	}
	/**
		通过一个已有对象构造一个对象
	*/
	public FrameWorkVO(FrameWorkVO other){
		if(this != other) {
			this.systemId = other.systemId;
			this.workMenuId = other.workMenuId;
			this.workMenuName = other.workMenuName;
			this.workMenuOrder = other.workMenuOrder;
			this.workPageLink = other.workPageLink;

		}
	}
	/** 
		空值处理
	*/
	private String nvl(String str) {
		return str==null?"":str;
	}

	/**
		设置系统编码
	*/
	public void setSystemId(String systemId) {
		this.systemId = systemId;
	}
	/**
		获取系统编码
	*/
	public String getSystemId() {
		return (this.systemId);
	}
	/**
		设置工作区菜单编码
	*/
	public void setWorkMenuId(String workMenuId) {
		this.workMenuId = workMenuId;
	}
	/**
		获取工作区菜单编码
	*/
	public String getWorkMenuId() {
		return (this.workMenuId);
	}
	/**
		设置工作区菜单名
	*/
	public void setWorkMenuName(String workMenuName) {
		this.workMenuName = workMenuName;
	}
	/**
		获取工作区菜单名
	*/
	public String getWorkMenuName() {
		return (this.workMenuName);
	}
	/**
		设置工作区菜单顺序
	*/
	public void setWorkMenuOrder(int workMenuOrder) {
		this.workMenuOrder = workMenuOrder;
	}
	/**
		获取工作区菜单顺序
	*/
	public int getWorkMenuOrder() {
		return (this.workMenuOrder);
	}
	/**
		设置链接
	*/
	public void setWorkPageLink(String workPageLink) {
		this.workPageLink = workPageLink;
	}
	/**
		获取链接
	*/
	public String getWorkPageLink() {
		return (this.workPageLink);
	}

	/**
		以SQL的结果集设置数据
	*/
	public void setAttribute(ResultSet resultSet) throws SQLException {
		ResultSetMetaData metaData = resultSet.getMetaData();

		for(int i=1;i<=metaData.getColumnCount();i++) { 

			String columnName = metaData.getColumnName(i).toLowerCase();

			if(columnName.intern()=="f_system_id".intern())
				systemId = resultSet.getString(i);
			else if(columnName.intern()=="f_work_menu_id".intern())
				workMenuId = resultSet.getString(i);
			else if(columnName.intern()=="f_work_menu_name".intern())
				workMenuName = resultSet.getString(i);
			else if(columnName.intern()=="f_work_menu_order".intern())
				workMenuOrder = resultSet.getInt(i);
			else if(columnName.intern()=="f_work_page_link".intern())
				workPageLink = resultSet.getString(i);
		}

	}

	/**
		转化成字符串
	*/
	public String getXML() {
		StringBuffer ret = new StringBuffer();
		ret.append("<frameWork>\n");
		ret.append("<systemId>").append(nvl(systemId)).append("</systemId>\n");
		ret.append("<workMenuId>").append(nvl(workMenuId)).append("</workMenuId>\n");
		ret.append("<workMenuName>").append(nvl(workMenuName)).append("</workMenuName>\n");
		ret.append("<workMenuOrder>").append(workMenuOrder).append("</workMenuOrder>\n");
		ret.append("<workPageLink>").append(nvl(workPageLink)).append("</workPageLink>\n");
		ret.append("</frameWork>\n");
		return ret.toString();
	}

}