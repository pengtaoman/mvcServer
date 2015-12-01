package com.neusoft.tdframework.authorization; 

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.BaseVO;
import com.neusoft.tdframework.common.util.StringUtil;
import com.neusoft.tdframework.common.util.XMLProperties;

/**
 * Title:
 * Description:
 * Company: neusoft
 * Date: 2004-12-14
 * @author ren.hui@neusoft.com
 * @version
 */

public class FrameFavoriteVO extends BaseVO { 
	private	String	menuId;	//菜单编码
	private	String	employeeId;	//职员编码
	private	String	systemId;	//系统编码
	private	String	favoriteName;	//自定义收藏名
	private String pageLink = null;
	private	int	favoriteOrder;	//顺序

	/**
		空的构造方法
	*/
	public FrameFavoriteVO(){

	}
	/**
		通过属性值构造一个对象
	*/
	public FrameFavoriteVO(String menuId, String employeeId, String systemId, String favoriteName, int favoriteOrder){

	}
	/**
		通过一个已有对象构造一个对象
	*/
	public FrameFavoriteVO(FrameFavoriteVO other){
		if(this != other) {
			this.menuId = other.menuId;
			this.employeeId = other.employeeId;
			this.systemId = other.systemId;
			this.favoriteName = other.favoriteName;
			this.favoriteOrder = other.favoriteOrder;

		}
	}
	/** 
		空值处理
	*/
	private String nvl(String str) {
		return str==null?"":str;
	}

	/**
		设置菜单编码
	*/
	public void setMenuId(String menuId) {
		this.menuId = menuId;
	}
	/**
		获取菜单编码
	*/
	public String getMenuId() {
		return (this.menuId);
	}
	/**
		设置职员编码
	*/
	public void setEmployeeId(String employeeId) {
		this.employeeId = employeeId;
	}
	/**
		获取职员编码
	*/
	public String getEmployeeId() {
		return (this.employeeId);
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
		设置自定义收藏名
	*/
	public void setFavoriteName(String favoriteName) {
		this.favoriteName = favoriteName;
	}
	/**
		获取自定义收藏名
	*/
	public String getFavoriteName() {
		return (this.favoriteName);
	}
	/**
		设置顺序
	*/
	public void setFavoriteOrder(int favoriteOrder) {
		this.favoriteOrder = favoriteOrder;
	}
	/**
		获取顺序
	*/
	public int getFavoriteOrder() {
		return (this.favoriteOrder);
	}

	/**
		以SQL的结果集设置数据
	*/
	public void setAttribute(ResultSet resultSet) throws SQLException {
		ResultSetMetaData metaData = resultSet.getMetaData();

		for(int i=1;i<=metaData.getColumnCount();i++) { 

			String columnName = metaData.getColumnName(i).toLowerCase();

			if(columnName.intern()=="f_menu_id".intern())
				menuId = resultSet.getString(i);
			else if(columnName.intern()=="f_employee_id".intern())
				employeeId = resultSet.getString(i);
			else if(columnName.intern()=="f_system_id".intern())
				systemId = resultSet.getString(i);
			else if(columnName.intern()=="f_favorite_name".intern())
				favoriteName = resultSet.getString(i);
			else if(columnName.intern()=="f_favorite_order".intern())
				favoriteOrder = resultSet.getInt(i);
			else if(columnName.intern()=="f_page_link".intern())
				pageLink = resultSet.getString(i);
		}

	}

	/**
	 * @return
	 */
	public String getPageLink() {
		return pageLink;
	}
	
	/**
	 * @param string
	 */
	public void setPageLink(String string) {
		pageLink = string;
	}
	
	/**
		转化成字符串
	*/
	public String getXML() {
		StringBuffer ret = new StringBuffer();
		ret.append("<frameFavorite>\n");
		ret.append("<menuId>").append(nvl(menuId)).append("</menuId>\n");
		ret.append("<employeeId>").append(nvl(employeeId)).append("</employeeId>\n");
		ret.append("<systemId>").append(nvl(systemId)).append("</systemId>\n");
		ret.append("<favoriteName>").append(nvl(XMLProperties.prepareXml(favoriteName))).append("</favoriteName>\n");
		ret.append("<favoriteOrder>").append(favoriteOrder).append("</favoriteOrder>\n");
		ret.append("<pageLink>").append(XMLProperties.prepareXml(pageLink)).append("</pageLink>\n");
		ret.append("</frameFavorite>\n");
		return ret.toString();
	}

}