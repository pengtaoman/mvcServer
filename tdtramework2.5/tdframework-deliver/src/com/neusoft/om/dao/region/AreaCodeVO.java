package com.neusoft.om.dao.region;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

public class AreaCodeVO {
	/**
	 * ��¼���ű�ʶ
	 */
	private long areaCodeId;
	/**
	 * ��¼�����ʶ
	 */
	private long regionId;
	/**
	 * ��¼���ű���
	 */
	private String areaNbr;
	/**
	 * ��¼����
	 */
	private String areaCode;
	public String getAreaCode() {
		return areaCode;
	}
	public void setAreaCode(String areaCode) {
		this.areaCode = areaCode;
	}
	public long getAreaCodeId() {
		return areaCodeId;
	}
	public void setAreaCodeId(long areaCodeId) {
		this.areaCodeId = areaCodeId;
	}
	public String getAreaNbr() {
		return areaNbr;
	}
	public void setAreaNbr(String areaNbr) {
		this.areaNbr = areaNbr;
	}
	public long getRegionId() {
		return regionId;
	}
	public void setRegionId(long regionId) {
		this.regionId = regionId;
	}

	public void setAttribute(ResultSet resultSet) throws SQLException {
		ResultSetMetaData metaData = resultSet.getMetaData();
		for(int i=1;i<=metaData.getColumnCount();i++) {
			String columnName = metaData.getColumnName(i).toUpperCase();				
			if(columnName.intern()=="AREA_CODE_ID".intern())
				areaCodeId = resultSet.getLong(i);
			if(columnName.intern()=="REGION_ID".intern())
				regionId = resultSet.getLong(i);
			if(columnName.intern()=="AREA_NBR".intern())
				areaNbr = resultSet.getString(i);
			if(columnName.intern()=="AREA_CODE".intern())
				areaCode = resultSet.getString(i);
		}
	}
}
