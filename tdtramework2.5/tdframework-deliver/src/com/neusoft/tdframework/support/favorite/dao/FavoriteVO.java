package com.neusoft.tdframework.support.favorite.dao; 

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
 * Date: 2004-12-16
 * @author ren.hui@neusoft.com
 * @version
 */

public class FavoriteVO extends BaseVO { 
	private int favoriteId;	//收藏标识，序列产生
	private	String	menuId;	//菜单编码
	private	String	employeeId;	//职员编码
	private	String	systemId;	//系统编码
	private	String	favoriteName;	//自定义收藏名
	private	int	favoriteOrder;	//顺序
	private	String	pageLink;	//链接

	/**
		空的构造方法
	*/
	public FavoriteVO(){

	}
	/**
		通过属性值构造一个对象
	*/
	public FavoriteVO(String menuId, String employeeId, String systemId, String favoriteName, int favoriteOrder, String pageLink){

	}
	/**
		通过一个已有对象构造一个对象
	*/
	public FavoriteVO(FavoriteVO other){
		if(this != other) {
			this.menuId = other.menuId;
			this.employeeId = other.employeeId;
			this.systemId = other.systemId;
			this.favoriteName = other.favoriteName;
			this.favoriteOrder = other.favoriteOrder;
			this.pageLink = other.pageLink;

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
		设置链接
	*/
	public void setPageLink(String pageLink) {
		this.pageLink = pageLink;
	}
	/**
		获取链接
	*/
	public String getPageLink() {
		return (this.pageLink);
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
	* 通过MAP初始化信息
	*/
	public void setAttribute(java.util.HashMap map)throws NumberFormatException {
		menuId = NullProcessUtil.nvlToString(
			map.get("menuId"),"");
		employeeId = NullProcessUtil.nvlToString(
			map.get("employeeId"),"");
		systemId = NullProcessUtil.nvlToString(
			map.get("systemId"),"");
		favoriteName = NullProcessUtil.nvlToString(
			map.get("favoriteName"),"");
		favoriteOrder = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("favoriteOrder"), "-10"));
		pageLink = NullProcessUtil.nvlToString(
			map.get("pageLink"),"");
	}

	/**
		转化成字符串
	*/
	public String toString(int tabs) {
		StringBuffer ret = new StringBuffer();
		String str_tab = StringUtil.tabs(tabs);
		ret.append("<menuId>").append(nvl(menuId)).append("</menuId>\n");
		ret.append(str_tab).append("<employeeId>").append(nvl(employeeId)).append("</employeeId>\n");
		ret.append(str_tab).append("<systemId>").append(nvl(systemId)).append("</systemId>\n");
		ret.append(str_tab).append("<favoriteName>").append(nvl(favoriteName)).append("</favoriteName>\n");
		ret.append(str_tab).append("<favoriteOrder>").append(favoriteOrder).append("</favoriteOrder>\n");
		ret.append(str_tab).append("<pageLink>").append(nvl(pageLink)).append("</pageLink>\n");
		return ret.toString();
	}

	public String toParameter(){
		StringBuffer result = new StringBuffer();
		
		result.append("'").append(StringUtil.emptyTo(menuId,"")).append("',");
		result.append("'").append(StringUtil.emptyTo(employeeId,"")).append("',");
		result.append("'").append(StringUtil.emptyTo(favoriteName,"")).append("',");
		result.append("'").append(StringUtil.emptyTo(systemId,"")).append("',");
		result.append("'").append(favoriteOrder).append("',");
		result.append("'").append(StringUtil.emptyTo(pageLink,"")).append("'");
		return result.toString();
	}
}