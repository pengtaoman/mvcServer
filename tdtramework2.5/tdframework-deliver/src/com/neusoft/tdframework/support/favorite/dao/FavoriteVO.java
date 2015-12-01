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
	private int favoriteId;	//�ղر�ʶ�����в���
	private	String	menuId;	//�˵�����
	private	String	employeeId;	//ְԱ����
	private	String	systemId;	//ϵͳ����
	private	String	favoriteName;	//�Զ����ղ���
	private	int	favoriteOrder;	//˳��
	private	String	pageLink;	//����

	/**
		�յĹ��췽��
	*/
	public FavoriteVO(){

	}
	/**
		ͨ������ֵ����һ������
	*/
	public FavoriteVO(String menuId, String employeeId, String systemId, String favoriteName, int favoriteOrder, String pageLink){

	}
	/**
		ͨ��һ�����ж�����һ������
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
		��ֵ����
	*/
	private String nvl(String str) {
		return str==null?"":str;
	}

	/**
		���ò˵�����
	*/
	public void setMenuId(String menuId) {
		this.menuId = menuId;
	}
	/**
		��ȡ�˵�����
	*/
	public String getMenuId() {
		return (this.menuId);
	}
	/**
		����ְԱ����
	*/
	public void setEmployeeId(String employeeId) {
		this.employeeId = employeeId;
	}
	/**
		��ȡְԱ����
	*/
	public String getEmployeeId() {
		return (this.employeeId);
	}
	/**
		����ϵͳ����
	*/
	public void setSystemId(String systemId) {
		this.systemId = systemId;
	}
	/**
		��ȡϵͳ����
	*/
	public String getSystemId() {
		return (this.systemId);
	}
	/**
		�����Զ����ղ���
	*/
	public void setFavoriteName(String favoriteName) {
		this.favoriteName = favoriteName;
	}
	/**
		��ȡ�Զ����ղ���
	*/
	public String getFavoriteName() {
		return (this.favoriteName);
	}
	/**
		����˳��
	*/
	public void setFavoriteOrder(int favoriteOrder) {
		this.favoriteOrder = favoriteOrder;
	}
	/**
		��ȡ˳��
	*/
	public int getFavoriteOrder() {
		return (this.favoriteOrder);
	}
	/**
		��������
	*/
	public void setPageLink(String pageLink) {
		this.pageLink = pageLink;
	}
	/**
		��ȡ����
	*/
	public String getPageLink() {
		return (this.pageLink);
	}

	/**
		��SQL�Ľ������������
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
	* ͨ��MAP��ʼ����Ϣ
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
		ת�����ַ���
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