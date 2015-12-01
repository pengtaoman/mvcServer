package com.neusoft.om.dao.mac;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.BaseVO;
import com.neusoft.tdframework.common.util.NullProcessUtil;

public class MacsPermittedVO extends BaseVO{
	private String contactName;
	private String macAddress;
	private String hallName;
	private String city;
	private String town;
	private String phoneNumber;
	private String hallId;
	private String cityName;
	
	/**
		空的构造方法
	*/
	public MacsPermittedVO(){
	}
	/**
		通过属性值构造一个对象
	*/
	public MacsPermittedVO(String contactName, String macAddress, String hallName,String city, String town, String phoneNumber,String hallId, String cityName){
		
	}
	/**
		通过一个已有对象构造一个对象
	*/
	public MacsPermittedVO(MacsPermittedVO other){
		this.contactName = other.contactName;
		this.macAddress = other.macAddress;
		this.hallName = other.hallName;
		this.city = other.city;
		this.town = other.town;
		this.phoneNumber = other.phoneNumber;
		this.cityName = other.cityName;
	}

	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getContactName() {
		return contactName;
	}
	public void setContactName(String contactName) {
		this.contactName = contactName;
	}
	public String getHallName() {
		return hallName;
	}
	public void setHallName(String hallName) {
		this.hallName = hallName;
	}
	public String getMacAddress() {
		return macAddress;
	}
	public void setMacAddress(String macAddress) {
		this.macAddress = macAddress;
	}
	public String getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	public String getTown() {
		return town;
	}
	public void setTown(String town) {
		this.town = town;
	}
	
	public String getHallId() {
		return hallId;
	}
	public void setHallId(String hallId) {
		this.hallId = hallId;
	}
	
	public String getCityName() {
		return cityName;
	}
	public void setCityName(String cityName) {
		this.cityName = cityName;
	}
	/**
		以SQL的结果集设置数据
	*/
	public void setAttribute(ResultSet resultSet) throws SQLException {
		ResultSetMetaData metaData = resultSet.getMetaData();	
		for(int i=1;i<=metaData.getColumnCount();i++) { 	
			String columnName = metaData.getColumnName(i).toLowerCase();	
			if(columnName.intern()=="contact_name".intern())
				contactName = resultSet.getString(i);
			else if(columnName.intern()=="mac_address".intern())
				macAddress = resultSet.getString(i);
			else if(columnName.intern()=="hall_id".intern())
				hallId = resultSet.getString(i);
			else if(columnName.intern()=="city".intern())
				city = resultSet.getString(i);
			else if(columnName.intern()=="town".intern())
				town = resultSet.getString(i);
			else if(columnName.intern()=="phone_number".intern())
				phoneNumber = resultSet.getString(i);
		}
	
	}
	
	/**
	* 通过MAP初始化信息
	*/
	public void setAttribute(java.util.HashMap map)throws NumberFormatException {
		contactName = NullProcessUtil.nvlToString( map.get("contactName"), "");
		macAddress = NullProcessUtil.nvlToString(map.get("macAddress"),"");
		hallName = NullProcessUtil.nvlToString(map.get("hallName"),"");
		city = NullProcessUtil.nvlToString(map.get("city"),"");
		town = NullProcessUtil.nvlToString(map.get("town"),"");
		phoneNumber = NullProcessUtil.nvlToString(map.get("phoneNumber"),"");
	}
}
