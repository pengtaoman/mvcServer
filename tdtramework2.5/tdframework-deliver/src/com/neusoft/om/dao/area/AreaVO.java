package com.neusoft.om.dao.area;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.BaseVO;
//import com.neusoft.tdframework.common.util.StringUtil;
import com.neusoft.tdframework.common.util.NullProcessUtil;
import com.neusoft.tdframework.common.util.XMLProperties;

/**
 * Title: 
 * Description: 
 * Company: neusoft
 * Date: 2004-10-16
 * @author renh
 * @version 
 */
public class AreaVO extends BaseVO {
	
	private String areaId = "";
	private String parentAreaId = "";
	private String areaName = "";
	private int areaLevel ;
	private String postalCode = ""; 
	private String areaCode = ""; 
	private String activeDate = "";
	private String inactiveDate = ""; 
    private String cityCode;
    private String parentAreaName = "";
    
    /*
     * yangxg构造innerTree使用
     */
    private String if_city;
	
	/**判断组织机构有效期*/
	private boolean ifValid;   

	
	public String getIf_city() {
		return if_city;
	}
	public void setIf_city(String if_city) {
		this.if_city = if_city;
	}
	/**
	 * @return
	 */
	public String getAreaId() {
		return areaId;
	}
	/**
	 * @param string
	 */
	public void setAreaId(String string) {
		areaId = string;
	}
	/**
	 * @return
	 */
	public String getParentAreaId() {
		return parentAreaId;
	}
	/**
	 * @param string
	 */
	public void setParentAreaId(String string) {
		parentAreaId = string;
	}
	/**
	 * @return
	 */	
	public String getAreaName() {
		return XMLProperties.prepareXml(areaName);
	}
	/**
	 * @param string
	 */
	public void setAreaName(String string) {
		areaName = string;
	}
	/**
	 * @return
	 */	
	public int getAreaLevel() {
		return areaLevel;
	}
	/**
	 * @param string
	 */
	public void setAreaLevel(int cityLevel) {
		areaLevel = cityLevel;
	}
	/**
	 * @return
	 */	
	public String getPostalCode() {
		return postalCode;
	}
	/**
	 * @param string
	 */
	public void setPostalCode(String string) {
		postalCode = string;
	}
	
	/**
	 * @return
	 */	
	public String getAreaCode() {
		return areaCode;
	}
	/**
	 * @param string
	 */
	public void setAreaCode(String string) {
		areaCode = string;
	}
	public String getActiveDate(){
		return activeDate;
	}
	public void setActiveDate(String activeDate) {
		this.activeDate = activeDate;
	}
	public String getInactiveDate(){
		return inactiveDate;
	}
	public void setInactiveDate(String inactiveDate) {
		this.inactiveDate = inactiveDate;
	}
	/**
	 * 是否有效
	 */
	public boolean getIfValid() {
		return ifValid;
	}
	public void setIfValid(String activeDate,String inactiveDate) {
		ifValid = true; 
	}

	public String getCityCode()
    {
        return cityCode;
    }
    public void setCityCode(String cityCode)
    {
        this.cityCode = cityCode;
    }
    
    public String getParentAreaName() {
		return parentAreaName;
	}
	public void setParentAreaName(String parentAreaName) {
		this.parentAreaName = parentAreaName;
	}
	/**
        以SQL的结果集设置数据
    */
    public void setAttribute(ResultSet resultSet) throws SQLException {
        ResultSetMetaData metaData = resultSet.getMetaData();
    
        for(int i=1;i<=metaData.getColumnCount();i++) { 
    
            String columnName = metaData.getColumnName(i).toLowerCase();
            if(columnName.intern()=="f_area_id".intern())
                areaId = resultSet.getString(i);
            else if(columnName.intern()=="f_parent_area_id".intern())
                parentAreaId = resultSet.getString(i);
            else if(columnName.intern()=="f_area_name".intern())
                areaName = resultSet.getString(i);
            else if(columnName.intern()=="f_area_level".intern())
                areaLevel = resultSet.getInt(i);
            else if(columnName.intern()=="f_postal_code".intern())
                postalCode = resultSet.getString(i);
            else if(columnName.intern()=="f_area_code".intern())
                areaCode = resultSet.getString(i);
            else if(columnName.intern()=="f_active_date".intern()){
            	if(resultSet.getString(i)!= null && !resultSet.getString(i).trim().equals("")){
            		activeDate = resultSet.getString(i).substring(0, 10);
            	}
            }                
            else if(columnName.intern()=="f_inactive_date".intern()){
            	if(resultSet.getString(i)!= null && !resultSet.getString(i).trim().equals("")){
            		inactiveDate = resultSet.getString(i).substring(0, 10);
            	}
            }
            else if(columnName.intern()=="f_city_code".intern())
                cityCode = resultSet.getString(i);
            else if(columnName.intern() == "f_parent_area_name".intern())
            	parentAreaName = resultSet.getString(i);
        }
    
    }
    
    /**
		转化成字符串
	*/

	public String toString(int tabs) {
		StringBuffer ret = new StringBuffer();
		//String str_tab = StringUtil.tabs(tabs);
		ret.append("<Area_id>").append(NullProcessUtil.nvlToString(areaId,"")).append("</Area_id>\n");
		ret.append("<Parent_Area_id>").append(NullProcessUtil.nvlToString(parentAreaId,"")).append("</Parent_Area_id>\n");
		ret.append("<Area_name>").append(XMLProperties.prepareXml(NullProcessUtil.nvlToString(areaName,""))).append("</Area_name>\n");
		ret.append("<Area_level>").append(areaLevel).append("</Area_level>\n");
		ret.append("<Postal_code>").append(NullProcessUtil.nvlToString(postalCode,"")).append("</Postal_code>\n");
		ret.append("<Area_code>").append(NullProcessUtil.nvlToString(areaCode,"")).append("</Area_code>\n");
        ret.append("<City_code>").append(NullProcessUtil.nvlToString(cityCode,"")).append("</City_code>\n");
		return ret.toString();
	
	}
	
}
