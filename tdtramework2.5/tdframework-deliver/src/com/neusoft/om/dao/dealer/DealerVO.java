package com.neusoft.om.dao.dealer;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.BaseVO;

public class DealerVO extends BaseVO{
	private String cityCode;//所属城市
	private String areaCode;//所属区域
	private String regionCode;//所属区域
	private String dealerId;//渠道标识
	private String dealerName;//渠道名称
	private int dealerStatus = 0;//分销商状态
	private int dealerType = 0;//类别
	private int dealerKind = 0;//类型
	private int dealerLevel = 0;//级别
	private String dealerParent;//上级渠道
	private String belongsPart;//所属组织机构
	
	public String getAreaCode() {
		return areaCode;
	}
	public void setAreaCode(String areaCode) {
		this.areaCode = areaCode;
	}
	public String getBelongsPart() {
		return belongsPart;
	}
	public void setBelongsPart(String belongsPart) {
		this.belongsPart = belongsPart;
	}
	public String getCityCode() {
		return cityCode;
	}
	public void setCityCode(String cityCode) {
		this.cityCode = cityCode;
	}

	public int getDealerLevel() {
		return dealerLevel;
	}
	public void setDealerLevel(int dealerLevel) {
		this.dealerLevel = dealerLevel;
	}
	public String getDealerParent() {
		return dealerParent;
	}
	public void setDealerParent(String dealerParent) {
		this.dealerParent = dealerParent;
	}
	public String getDealerId() {
		return dealerId;
	}
	public void setDealerId(String dealerId) {
		this.dealerId = dealerId;
	}
	public int getDealerKind() {
		return dealerKind;
	}
	public void setDealerKind(int dealerKind) {
		this.dealerKind = dealerKind;
	}
	public String getDealerName() {
		return dealerName;
	}
	public void setDealerName(String dealerName) {
		this.dealerName = dealerName;
	}
	public int getDealerStatus() {
		return dealerStatus;
	}
	public void setDealerStatus(int dealerStatus) {
		this.dealerStatus = dealerStatus;
	}
	public int getDealerType() {
		return dealerType;
	}
	public void setDealerType(int dealerType) {
		this.dealerType = dealerType;
	}
	public String getRegionCode() {
		return regionCode;
	}
	public void setRegionCode(String regionCode) {
		this.regionCode = regionCode;
	}
	
    /** 
	    空值处理
	*/
	private String nvl(String str) {
	    return str==null?"":str;
	}
	/**
	    以SQL的结果集设置数据
	*/
	public void setAttribute(ResultSet resultSet) throws SQLException {
	    ResultSetMetaData metaData = resultSet.getMetaData();
	
	    for(int i=1;i<=metaData.getColumnCount();i++) { 
	
	        String columnName = metaData.getColumnName(i).toLowerCase();
	        if(columnName.intern()=="city_code".intern())
	        	cityCode = nvl(resultSet.getString(i));
	        else if(columnName.intern()=="area_code".intern())
	        	areaCode = nvl(resultSet.getString(i));
	        else if(columnName.intern()=="region_code".intern())
	        	regionCode = nvl(resultSet.getString(i));
	        else if(columnName.intern()=="dealer_id".intern())
	        	dealerId = nvl(resultSet.getString(i));
	        else if(columnName.intern()=="dealer_name".intern())
	        	dealerName = nvl(resultSet.getString(i));
	        else if(columnName.intern()=="dealer_status".intern())
	        	dealerStatus = resultSet.getInt(i);
	        else if(columnName.intern()=="dealer_type".intern())
	        	dealerType = resultSet.getInt(i);
	        else if(columnName.intern()=="dealerKind".intern())
	        	dealerKind = resultSet.getInt(i);
	        else if(columnName.intern()=="dealer_level".intern())
	        	dealerLevel = resultSet.getInt(i);
	        else if(columnName.intern()=="dealer_parent".intern())
	        	dealerParent = nvl(resultSet.getString(i));
	        else if(columnName.intern()=="belongs_part".intern())
	        	belongsPart = nvl(resultSet.getString(i));
	    }
	
	}
		
	
}
