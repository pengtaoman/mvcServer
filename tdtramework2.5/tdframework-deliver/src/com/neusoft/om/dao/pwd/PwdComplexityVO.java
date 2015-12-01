package com.neusoft.om.dao.pwd;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.BaseVO;

public class PwdComplexityVO extends BaseVO {
	private int id;
	private String lowercase;
	private String uppercase;
	private String specialChar;
	private String number;
	private String desc;
	private String creater;
	private String updater;
	private String createDate;
	private String updDate;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getLowercase() {
		return lowercase;
	}
	public void setLowercase(String lowercase) {
		this.lowercase = lowercase;
	}
	public String getNumber() {
		return number;
	}
	public void setNumber(String number) {
		this.number = number;
	}
	public String getSpecialChar() {
		return specialChar;
	}
	public void setSpecialChar(String specialChar) {
		this.specialChar = specialChar;
	}
	public String getUppercase() {
		return uppercase;
	}
	public void setUppercase(String uppercase) {
		this.uppercase = uppercase;
	}
	public String getDesc() {
		return desc;
	}
	public void setDesc(String desc) {
		this.desc = desc;
	}
	
	public String getCreateDate() {
		return createDate;
	}
	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}
	public String getCreater() {
		return creater;
	}
	public void setCreater(String creater) {
		this.creater = creater;
	}
	public String getUpdater() {
		return updater;
	}
	public void setUpdater(String updater) {
		this.updater = updater;
	}
	public String getUpdDate() {
		return updDate;
	}
	public void setUpdDate(String updDate) {
		this.updDate = updDate;
	}
	
	/**
		以SQL的结果集设置数据
	*/
	public void setAttribute(ResultSet resultSet) throws SQLException {
		ResultSetMetaData metaData = resultSet.getMetaData();
	
		for(int i=1;i<=metaData.getColumnCount();i++) { 
			String columnName = metaData.getColumnName(i).toLowerCase();
			if(columnName.intern()=="f_id".intern())
				id = resultSet.getInt(i);
			else if(columnName.intern()=="f_lowercase".intern())
				lowercase = resultSet.getString(i);
			else if(columnName.intern()=="f_uppercase".intern())
				uppercase = resultSet.getString(i);
			else if(columnName.intern()=="f_special_char".intern())
				specialChar = resultSet.getString(i);
			else if(columnName.intern()=="f_number".intern())
				number = resultSet.getString(i);
			else if(columnName.intern()=="f_desc".intern())
				desc = resultSet.getString(i);
			else if(columnName.intern()=="f_creater".intern())
				creater = resultSet.getString(i);
			else if(columnName.intern()=="f_updater".intern())
				updater = resultSet.getString(i);
			else if(columnName.intern()=="f_create_date".intern())
				createDate = resultSet.getString(i);
			else if(columnName.intern()=="f_upd_date".intern())
				updDate = resultSet.getString(i);
		}
	}
	

}
