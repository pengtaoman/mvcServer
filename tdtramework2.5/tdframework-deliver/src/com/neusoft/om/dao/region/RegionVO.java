package com.neusoft.om.dao.region;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.BaseVO;
/**
 * 
 */

public class RegionVO extends BaseVO {
	
	private int regionId = 0;
	private String regionName = "";
	private String regionDesc = "";
	private String regionCode = "";
	private int upRegionId = 0;
	private int regionLevel = 0;
	private String cityCode = "";
	private String regionType = "";


	public String getRegionCode() {
		return regionCode;
	}
	public void setRegionCode(String regionCode) {
		this.regionCode = regionCode;
	}
	public String getRegionDesc() {
		return regionDesc;
	}
	public void setRegionDesc(String regionDesc) {
		this.regionDesc = regionDesc;
	}
	public int getRegionId() {
		return regionId;
	}
	public void setRegionId(int regionId) {
		this.regionId = regionId;
	}
	public String getRegionName() {
		return regionName;
	}
	public void setRegionName(String regionName) {
		this.regionName = regionName;
	}
	public String getCityCode() {
		return cityCode;
	}
	public void setCityCode(String cityCode) {
		this.cityCode = cityCode;
	}
	public int getRegionLevel() {
		return regionLevel;
	}
	public void setRegionLevel(int regionLevel) {
		this.regionLevel = regionLevel;
	}
	public String getRegionType() {
		return regionType;
	}
	public void setRegionType(String regionType) {
		this.regionType = regionType;
	}
	public int getUpRegionId() {
		return upRegionId;
	}
	public void setUpRegionId(int upRegionId) {
		this.upRegionId = upRegionId;
	}
	
	/**
        以SQL的结果集设置数据
    */
    public void setAttribute(ResultSet resultSet) throws SQLException {
        ResultSetMetaData metaData = resultSet.getMetaData();    
        for(int i=1;i<=metaData.getColumnCount();i++) {     
            String columnName = metaData.getColumnName(i).toLowerCase();
            if(columnName.intern()=="region_id".intern())
                regionId = resultSet.getInt(i);
            else if(columnName.intern()=="region_name".intern())
            	regionName = resultSet.getString(i);
            else if(columnName.intern()=="region_code".intern())
            	regionCode = resultSet.getString(i);
            else if(columnName.intern()=="region_desc".intern())
            	regionDesc = resultSet.getString(i);
            else if(columnName.intern()=="up_region_id".intern())
            	upRegionId = resultSet.getInt(i);
            else if(columnName.intern()=="region_type".intern())
            	regionType = resultSet.getString(i);
            else if(columnName.intern()=="region_level".intern())
            	regionLevel = resultSet.getInt(i);
            else if(columnName.intern()=="city_code".intern())
            	cityCode = resultSet.getString(i);
        }
    
    }
    
	
}
