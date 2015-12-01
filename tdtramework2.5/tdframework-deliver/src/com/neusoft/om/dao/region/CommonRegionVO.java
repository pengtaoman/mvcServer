package com.neusoft.om.dao.region;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.BaseVO;

public class CommonRegionVO  extends BaseVO {
	/**
	 * ��¼�����ʶ
	 */
	private long commonRegionId;
	/**
	 * �ϼ������ʶ
	 */
	private long upRegionId;
	private String upRegionName;
	/**
	 * ��¼��������
	 */
	private String regionName;
	/**
	 * ��¼�������
	 */
	private String	regionCode;
	/**
	 * ��¼��������
	 */
	private	String regionType;
	/**
	 * ��¼������������
	 */
	private	String regionTypeName;
	/**
	 * ��¼��������
	 */
	private String regionDesc;
	/**
	 * ���򼶱�
	 */
	private int	regionLevel;
	/**
	 * 
	 */
	private String cityCode;
	/**
	 * �����б�
	 */
	private AreaCodeColl areaCodeColl;
	/**
	 * ���������б�
	 */
	private PoliticalLocationColl politicalLocationColl;
	/**
	 * ���Ӱ�ť��ʾ��ʶ
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
