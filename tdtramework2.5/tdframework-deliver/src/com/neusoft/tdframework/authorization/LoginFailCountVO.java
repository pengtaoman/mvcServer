/**
 * 
 */
package com.neusoft.tdframework.authorization;

/**
 * @projectName tdframework
 * @packageName com.neusoft.tdframework.authorization.verify
 * @fileName CountVo.java
 * @Description
 * @author likj 2010-6-23 ÉÏÎç11:20:49
 * @email li.kj@neusoft.com
 * @copyright NeuSoft
 */
public class LoginFailCountVO {

	private String F_COUNT_ID;

	private String F_LOGIN_ID;

	private Integer F_COUNT;

	private Integer F_TOTAL_COUNT;

	private String F_FLAG;

	private String F_BEG_MINUTES;

	private String F_BEG_HOURS;

	private String F_DESC;

	
	/**
	 * @return the f_COUNT_ID
	 */
	public String getF_COUNT_ID() {
		return this.F_COUNT_ID;
	}

	/**
	 * @param f_count_id
	 *            the f_COUNT_ID to set
	 */
	public void setF_COUNT_ID(String f_count_id) {
		this.F_COUNT_ID = f_count_id;
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
	 * @return the f_FLAG
	 */
	public String getF_FLAG() {
		return this.F_FLAG;
	}

	/**
	 * @param f_flag
	 *            the f_FLAG to set
	 */
	public void setF_FLAG(String f_flag) {
		this.F_FLAG = f_flag;
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
	 * @return the f_COUNT
	 */
	public Integer getF_COUNT() {
		return this.F_COUNT;
	}

	/**
	 * @param f_count the f_COUNT to set
	 */
	public void setF_COUNT(Integer f_count) {
		this.F_COUNT = f_count;
	}

	/**
	 * @return the f_TOTAL_COUNT
	 */
	public Integer getF_TOTAL_COUNT() {
		return this.F_TOTAL_COUNT;
	}

	/**
	 * @param f_total_count the f_TOTAL_COUNT to set
	 */
	public void setF_TOTAL_COUNT(Integer f_total_count) {
		this.F_TOTAL_COUNT = f_total_count;
	}

	/**
	 * @return the f_BEG_HOURS
	 */
	public String getF_BEG_HOURS() {
		return this.F_BEG_HOURS;
	}

	/**
	 * @param f_beg_hours the f_BEG_HOURS to set
	 */
	public void setF_BEG_HOURS(String f_beg_hours) {
		this.F_BEG_HOURS = f_beg_hours;
	}

	/**
	 * @return the f_BEG_MINUTES
	 */
	public String getF_BEG_MINUTES() {
		return this.F_BEG_MINUTES;
	}

	/**
	 * @param f_beg_minutes the f_BEG_MINUTES to set
	 */
	public void setF_BEG_MINUTES(String f_beg_minutes) {
		this.F_BEG_MINUTES = f_beg_minutes;
	}

}
