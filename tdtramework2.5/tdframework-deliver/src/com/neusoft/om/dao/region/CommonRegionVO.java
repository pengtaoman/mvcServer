package com.neusoft.om.dao.region;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.BaseVO;

public class CommonRegionVO  extends BaseVO {
	/**
	 * 记录区域标识
	 */
	private long commonRegionId;
	/**
	 * 上级区域标识
	 */
	private long upRegionId;
	private String upRegionName;
	/**
	 * 记录区域名称
	 */
	private String regionName;
	/**
	 * 记录区域编码
	 */
	private String	regionCode;
	/**
	 * 记录区域类型
	 */
	private	String regionType;
	/**
	 * 记录区域类型名称
	 */
	private	String regionTypeName;
	/**
	 * 记录区域描述
	 */
	private String regionDesc;
	/**
	 * 区域级别
	 */
	private int	regionLevel;
	/**
	 * 
	 */
	private String cityCode;
	/**
	 * 区域列表
	 */
	private AreaCodeColl areaCodeColl;
	/**
	 * 行政区域列表
	 */
	private PoliticalLocationColl politicalLocationColl;
	/**
	 * 增加按钮显示标识
	 */
	private boolean addButtonViewFlag;
	
	
	
	public AreaCodeColl getAreaCodeColl() {
		return areaCodeColl;
	}
	public void setAreaCodeColl(AreaCodeColl areaCodeColl) {
		this.areaCodeColl = areaCodeColl;
	}
	public String getCityCode() {
		return cityCode;
	}
	public void setCityCode(String cityCode) {
		this.cityCode = cityCode;
	}
	public long getCommonRegionId() {
		return commonRegionId;
	}
	public void setCommonRegionId(long commonRegionId) {
		this.commonRegionId = commonRegionId;
	}
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
	public int getRegionLevel() {
		return regionLevel;
	}
	public void setRegionLevel(int regionLevel) {
		this.regionLevel = regionLevel;
	}
	public String getRegionName() {
		return regionName;
	}
	public void setRegionName(String regionName) {
		this.regionName = regionName;
	}
	public String getRegionType() {
		return regionType;
	}
	public void setRegionType(String regionType) {
		this.regionType = regionType;
	}
	public long getUpRegionId() {
		return upRegionId;
	}
	public void setUpRegionId(long upRegionId) {
		this.upRegionId = upRegionId;
	}

	
	public void setAttribute(ResultSet resultSet) throws SQLException {
		ResultSetMetaData metaData = resultSet.getMetaData();
		for(int i=1;i<=metaData.getColumnCount();i++) {
			String columnName = metaData.getColumnName(i).toUpperCase();				
			if(columnName.intern()=="COMMON_REGION_ID".intern())
				commonRegionId = resultSet.getLong(i);
			if(columnName.intern()=="UP_REGION_ID".intern())
				upRegionId = resultSet.getLong(i);
			if(columnName.intern()=="REGION_NAME".intern())
				regionName = resultSet.getString(i);
			if(columnName.intern()=="REGION_CODE".intern())
				regionCode = resultSet.getString(i);
			if(columnName.intern()=="REGION_TYPE".intern())
				regionType = resultSet.getString(i);
			if(columnName.intern()=="REGION_DESC".intern())
				regionDesc = resultSet.getString(i);
			if(columnName.intern()=="REGION_LEVEL".intern())
				regionLevel = resultSet.getInt(i);
			if(columnName.intern()=="CITY_CODE".intern())
				cityCode = resultSet.getString(i);
			if(columnName.intern()=="UP_REGION_NAME".intern())
				upRegionName = resultSet.getString(i);
			if(columnName.intern()=="REGION_TYPE_NAME".intern())
				regionTypeName = resultSet.getString(i);
		}
	}
	public PoliticalLocationColl getPoliticalLocationColl() {
		return politicalLocationColl;
	}
	public void setPoliticalLocationColl(PoliticalLocationColl politicalLocationColl) {
		this.politicalLocationColl = politicalLocationColl;
	}
	public String getUpRegionName() {
		return upRegionName;
	}
	public void setUpRegionName(String upRegionName) {
		this.upRegionName = upRegionName;
	}
	public String getRegionTypeName() {
		return regionTypeName;
	}
	public void setRegionTypeName(String regionTypeName) {
		this.regionTypeName = regionTypeName;
	}
	/**
	 * @return the addButtonViewFlag
	 */
	public boolean getAddButtonViewFlag() {
		return addButtonViewFlag;
	}
	/**
	 * @param addButtonViewFlag the addButtonViewFlag to set
	 */
	public void setAddButtonViewFlag(boolean addButtonViewFlag) {
		this.addButtonViewFlag = addButtonViewFlag;
	}
}
