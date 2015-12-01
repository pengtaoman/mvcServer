package com.neusoft.om.dao.region;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

public class PoliticalLocationVO {
	/**
	 * 记录行政区域标识
	 */
	private long regionRelationId;
	/**
	 * 记录行政区域标识
	 */
	private long locationId;

	/**
	 * 记录行政区域编码
	 */
	private String locationCode;

	/**
	 * 记录行政区域名称
	 */
	private String locationName;

	/**
	 * 记录行政区域描述
	 */
	private String locationDesc;

	/**
	 * 记录区域类型
	 */
	private String locationType;
	private String locationTypeName;

	/**
	 * 行政区域简拼
	 */
	private String locationAbbr;

	/**
	 * 记录上级行政区域标识
	 */
	private long upLocationId;
	private String upLocationName;
	
	private long commonRegionId;
	
	public String getLocationAbbr() {
		return locationAbbr;
	}

	public void setLocationAbbr(String locationAbbr) {
		this.locationAbbr = locationAbbr;
	}

	public String getLocationCode() {
		return locationCode;
	}

	public void setLocationCode(String locationCode) {
		this.locationCode = locationCode;
	}

	public String getLocationDesc() {
		return locationDesc;
	}

	public void setLocationDesc(String locationDesc) {
		this.locationDesc = locationDesc;
	}

	public long getLocationId() {
		return locationId;
	}

	public void setLocationId(long locationId) {
		this.locationId = locationId;
	}

	public String getLocationName() {
		return locationName;
	}

	public void setLocationName(String locationName) {
		this.locationName = locationName;
	}

	public String getLocationType() {
		return locationType;
	}

	public void setLocationType(String locationType) {
		this.locationType = locationType;
	}

	public long getUpLocationId() {
		return upLocationId;
	}

	public void setUpLocationId(long upLocationId) {
		this.upLocationId = upLocationId;
	}

	public void setAttribute(ResultSet resultSet) throws SQLException {
		ResultSetMetaData metaData = resultSet.getMetaData();
		for(int i=1;i<=metaData.getColumnCount();i++) {
			String columnName = metaData.getColumnName(i).toUpperCase();				
			if(columnName.intern()=="LOCATION_ID".intern())
				locationId = resultSet.getLong(i);
			if(columnName.intern()=="LOCATION_CODE".intern())
				locationCode = resultSet.getString(i);
			if(columnName.intern()=="LOCATION_NAME".intern())
				locationName = resultSet.getString(i);
			if(columnName.intern()=="LOCATION_DESC".intern())
				locationDesc = resultSet.getString(i);
			
			if(columnName.intern()=="LOCATION_TYPE".intern())
				locationType = resultSet.getString(i);
			if(columnName.intern()=="LOCATION_ABBR".intern())
				locationAbbr = resultSet.getString(i);
			if(columnName.intern()=="UP_LOCATION_ID".intern())
				upLocationId = resultSet.getLong(i);
			if(columnName.intern()=="REGION_RELATION_ID".intern())
				regionRelationId = resultSet.getLong(i);
			if(columnName.intern()=="COMMON_REGION_ID".intern())
				commonRegionId = resultSet.getLong(i);
			if(columnName.intern()=="UP_LOCATION_NAME".intern())
				upLocationName = resultSet.getString(i);
			if(columnName.intern()=="LOCATION_TYPE_NAME".intern())
				locationTypeName = resultSet.getString(i);
		}
	}

	public long getRegionRelationId() {
		return regionRelationId;
	}

	public void setRegionRelationId(long regionRelationId) {
		this.regionRelationId = regionRelationId;
	}

	public long getCommonRegionId() {
		return commonRegionId;
	}

	public void setCommonRegionId(long commonRegionId) {
		this.commonRegionId = commonRegionId;
	}

	public String getUpLocationName() {
		return upLocationName;
	}

	public void setUpLocationName(String upLocationName) {
		this.upLocationName = upLocationName;
	}

	public String getLocationTypeName() {
		return locationTypeName;
	}

	public void setLocationTypeName(String locationTypeName) {
		this.locationTypeName = locationTypeName;
	}
}
