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
	private	String	menuId;	//�˵�����
	private	String	employeeId;	//ְԱ����
	private	String	systemId;	//ϵͳ����
	private	String	favoriteName;	//�Զ����ղ���
	private String pageLink = null;
	private	int	favoriteOrder;	//˳��

	/**
		�յĹ��췽��
	*/
	public FrameFavoriteVO(){

	}
	/**
		ͨ������ֵ����һ������
	*/
	public FrameFavoriteVO(String menuId, String employeeId, String systemId, String favoriteName, int favoriteOrder){

	}
	/**
		ͨ��һ�����ж�����һ������
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
		ת�����ַ���
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