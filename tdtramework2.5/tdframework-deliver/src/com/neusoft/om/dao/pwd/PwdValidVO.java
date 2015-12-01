package com.neusoft.om.dao.pwd; 

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import com.neusoft.tdframework.common.data.BaseVO;

/**
 * Title: 密码过期验证
 * Description: 
 * Company: neusoft
 * Date: 2004-12-14
 * @author yanglm@neusoft.com
 * @version 
 */
public class PwdValidVO extends BaseVO { 
	private	int ifCortrol;	        //是否验证密码过期
	private	int inValidDays;	        //密码有效时间
	private	int alertDays;	//提示密码修改时间
	private int pwdMinLength;  //密码最小长度
	private int pwdMaxLength; //密码最大长度
	private String updEmployeeId; 
	private String updDate;

	/**
		空的构造方法
	*/
	public PwdValidVO(){

	}

	/**
		通过一个已有对象构造一个对象
	*/
	public PwdValidVO(PwdValidVO other){
		if(this != other) {
			this.ifCortrol = other.ifCortrol;
			this.inValidDays = other.inValidDays;
			this.alertDays = other.alertDays;
			this.pwdMinLength = other.pwdMinLength;
			this.pwdMaxLength = other.pwdMaxLength;
			this.updEmployeeId =other.updEmployeeId;
			this.updDate = other.updDate;
		}
	}

	/**
		设置是否验证密码
	*/
	public void setIfCortrol(int ifCortrol) {
		this.ifCortrol = ifCortrol;
	}
	/**
		获取是否验证密码
	*/
	public int getIfCortrol() {
		return (this.ifCortrol);
	}
	/**
		设置密码有效时间
	*/
	public void setInValidDays(int inValidDays) {
		this.inValidDays = inValidDays;
	}
	/**
		获取密码有效时间
	*/
	public int getInValidDays() {
		return (this.inValidDays);
	}
	/**
		设置提示修改时间
	*/
	public void setAlertDays(int alertDays) {
		this.alertDays = alertDays;
	}
	/**
		获取提示修改时间
	*/
	public int getAlertDays() {
		return (this.alertDays);
	}

	/**
	 * @return the pwdLength
	 */
	public int getPwdMinLength() {
		return pwdMinLength;
	}
	/**
	 * @param pwdLength the pwdLength to set
	 */
	public void setPwdMinLength(int pwdMinLength) {
		this.pwdMinLength = pwdMinLength;
	}
	
	
	/**
	 * @return the pwdMaxLength
	 */
	public int getPwdMaxLength() {
		return pwdMaxLength;
	}
	/**
	 * @param pwdMaxLength the pwdMaxLength to set
	 */
	public void setPwdMaxLength(int pwdMaxLength) {
		this.pwdMaxLength = pwdMaxLength;
	}
	
	/**
	 * @return the updDate
	 */
	public String getUpdDate() {
		return updDate;
	}

	/**
	 * @param updDate the updDate to set
	 */
	public void setUpdDate(String updDate) {
		this.updDate = updDate;
	}

	/**
	 * @return the updEmployeeId
	 */
	public String getUpdEmployeeId() {
		return updEmployeeId;
	}

	/**
	 * @param updEmployeeId the updEmployeeId to set
	 */
	public void setUpdEmployeeId(String updEmployeeId) {
		this.updEmployeeId = updEmployeeId;
	}

	/**
		以SQL的结果集设置数据
	*/
	public void setAttribute(ResultSet resultSet) throws SQLException {
		ResultSetMetaData metaData = resultSet.getMetaData();

		for(int i=1;i<=metaData.getColumnCount();i++) { 
			String columnName = metaData.getColumnName(i).toLowerCase();
			if(columnName.intern()=="if_cortrol".intern())
				ifCortrol = resultSet.getInt(i);
			else if(columnName.intern()=="invalid_days".intern())
				inValidDays = resultSet.getInt(i);
			else if(columnName.intern()=="alert_days".intern())
				alertDays = resultSet.getInt(i);
			else if(columnName.intern()=="pwd_min_length".intern())
				pwdMinLength = resultSet.getInt(i);
			else if(columnName.intern()=="pwd_max_length".intern())
				pwdMaxLength = resultSet.getInt(i);
			else if(columnName.intern()=="upd_employee_id".intern())
				updEmployeeId = resultSet.getString(i);
			else if(columnName.intern()=="upd_date".intern()){
				String date =  resultSet.getString(i);
				if(date != null && !date.equals("")){
					updDate = date.substring(0,10);
				}
			}
		}
	}

}