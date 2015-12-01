package com.neusoft.om.dao.region;

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
	private String areaCode = ""; 
    private String parentAreaName = "";
    private String regionLevel = "";
    private String cityCode = "";
    private String postalCode= "";
    private String regionId ="";
    private String parentRegionId = "";
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
	public String getAreaCode() {
		return areaCode;
	}
	/**
	 * @param string
	 */
	public void setAreaCode(String string) {
		areaCode = string;
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

	public String getParentAreaName() {
		return parentAreaName;
	}
	public void setParentAreaName(String parentAreaName) {
		this.parentAreaName = parentAreaName;
	}
	public void setIfValid(boolean ifValid) {
		this.ifValid = ifValid;
	}
	
	public String getRegionLevel() {
		return regionLevel;
	}
	public void setRegionLevel(String regionLevel) {
		this.regionLevel = regionLevel;
	}
	
	public String getCityCode() {
		return cityCode;
	}
	public void setCityCode(String cityCode) {
		this.cityCode = cityCode;
	}
	public String getPostalCode() {
		return postalCode;
	}
	public void setPostalCode(String postalCode) {
		this.postalCode = postalCode;
	}
	public String getRegionId() {
		return regionId;
	}
	public void setRegionId(String regionId) {
		this.regionId = regionId;
	}
	
	public String getParentRegionId() {
		return parentRegionId;
	}
	public void setParentRegionId(String parentRegionId) {
		this.parentRegionId = parentRegionId;
	}
	/**
        以SQL的结果集设置数据
    */
    public void setAttribute(ResultSet resultSet) throws SQLException {
        ResultSetMetaData metaData = resultSet.getMetaData();
    
        for(int i=1;i<=metaData.getColumnCount();i++) { 
    
            String columnName = metaData.getColumnName(i).toLowerCase();
            if(columnName.intern()=="region_id".intern())
                regionId = resultSet.getString(i);
            else if(columnName.intern()=="parent_region_id".intern())
                parentAreaId = resultSet.getString(i);
            else if(columnName.intern()=="region_name".intern())
                areaName = resultSet.getString(i);
            else if(columnName.intern()=="region_level".intern()){
            	regionLevel = resultSet.getString(i);
            	if(regionLevel.equals("97A"))
                	areaLevel = 1;
                else if(regionLevel.equals("97B"))
                	areaLevel = 2;
                else if(regionLevel.equals("97C"))
                	areaLevel = 3;
                else if(regionLevel.equals("97D"))
                	areaLevel = 4;
                else if(regionLevel.equals("97E"))
                	areaLevel = 5;
                else if(regionLevel.equals("97F"))
                	areaLevel = 6;
            }            	
            else if(columnName.intern()=="region_code".intern())
                areaId = resultSet.getString(i);
            else if(columnName.intern() == "parent_region_name".intern())            	
            	parentAreaName = resultSet.getString(i);
            else if(columnName.intern() == "city_code".intern())
            	cityCode = resultSet.getString(i);
            else if(columnName.intern() == "postal_code".intern())
            	postalCode = resultSet.getString(i);
            else if(columnName.intern() == "area_code".intern()){
            	String aCode = resultSet.getString("area_code");
            	if(aCode != null){
            		areaCode = aCode.trim();
            	}
            }        
            else if(columnName.intern() == "parent_region_id".intern())
            	parentRegionId = resultSet.getString(i);
            else if(columnName.intern() == "parent_area_id".intern())
            	parentAreaId = resultSet.getString(i);
            
        }
    
    }
	
}
