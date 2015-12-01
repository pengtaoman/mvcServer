/**
 * 
 */
package com.neusoft.tdframework.authorization;

/**
 * @projectName tdframework
 * @packageName com.neusoft.tdframework.authorization.verify
 * @fileName LogVo.java
 * @Description
 * @author likj 2010-6-23 ÉÏÎç11:21:31
 * @email li.kj@neusoft.com
 * @copyright NeuSoft
 */
public class LoginFailLogVO {

	private String F_LOG_ID;
	
	private String F_PART_MM;

	private String F_LOGIN_ID;

	private String F_REAL_NAME;

	private String F_IP_ADDR;

	private String F_LOGIN_DATE;

	private String F_DESC;
	
	private String F_DNSNAME;
	
	private String F_MAC_ADDR;
	
	private String F_DEL_FLAG;
	
	

	/**
	 * @return the f_DNSNAME
	 */
	public String getF_DNSNAME() {
		return this.F_DNSNAME;
	}

	/**
	 * @param f_dnsname the f_DNSNAME to set
	 */
	public void setF_DNSNAME(String f_dnsname) {
		this.F_DNSNAME = f_dnsname;
	}

	/**
	 * @return the f_MAC_ADDR
	 */
	public String getF_MAC_ADDR() {
		return this.F_MAC_ADDR;
	}

	/**
	 * @param f_mac_addr the f_MAC_ADDR to set
	 */
	public void setF_MAC_ADDR(String f_mac_addr) {
		this.F_MAC_ADDR = f_mac_addr;
	}

	/**
	 * @return the f_DESC
	 */
	public String getF_DESC() {
		return this.F_DESC;
	}

	/**
	 * @param f_desc
	 *            the f_DESC to set
	 */
	public void setF_DESC(String f_desc) {
		this.F_DESC = f_desc;
	}

	/**
	 * @return the f_IP_ADDR
	 */
	public String getF_IP_ADDR() {
		return this.F_IP_ADDR;
	}

	/**
	 * @param f_ip_addr
	 *            the f_IP_ADDR to set
	 */
	public void setF_IP_ADDR(String f_ip_addr) {
		this.F_IP_ADDR = f_ip_addr;
	}

	/**
	 * @return the f_LOG_ID
	 */
	public String getF_LOG_ID() {
		return this.F_LOG_ID;
	}

	/**
	 * @param f_log_id
	 *            the f_LOG_ID to set
	 */
	public void setF_LOG_ID(String f_log_id) {
		this.F_LOG_ID = f_log_id;
	}

	/**
	 * @return the f_LOGIN_DATE
	 */
	public String getF_LOGIN_DATE() {
		return this.F_LOGIN_DATE;
	}

	/**
	 * @param f_login_date the f_LOGIN_DATE to set
	 */
	public void setF_LOGIN_DATE(String f_login_date) {
		this.F_LOGIN_DATE = f_login_date;
	}

	/**
	 * @return the f_LOGIN_ID
	 */
	public String getF_LOGIN_ID() {
		return this.F_LOGIN_ID;
	}

	/**
	 * @param f_login_id
	 *            the f_LOGIN_ID to set
	 */
	public void setF_LOGIN_ID(String f_login_id) {
		this.F_LOGIN_ID = f_login_id;
	}

	/**
	 * @return the f_REAL_NAME
	 */
	public String getF_REAL_NAME() {
		return this.F_REAL_NAME;
	}

	/**
	 * @param f_real_name
	 *            the f_REAL_NAME to set
	 */
	public void setF_REAL_NAME(String f_real_name) {
		this.F_REAL_NAME = f_real_name;
	}

	/**
	 * @return the f_DEL_FLAG
	 */
	public String getF_DEL_FLAG() {
		return this.F_DEL_FLAG;
	}

	/**
	 * @param f_del_flag the f_DEL_FLAG to set
	 */
	public void setF_DEL_FLAG(String f_del_flag) {
		this.F_DEL_FLAG = f_del_flag;
	}

	/**
	 * 
	 * @return F_PART_MM
	 */
	public String getF_PART_MM() {
		return F_PART_MM;
	}

	/**
	 * 
	 * @param f_part_mm
	 */
	public void setF_PART_MM(String f_part_mm) {
		F_PART_MM = f_part_mm;
	}
}
