package com.neusoft.om.dao.loginuserlist;

import com.neusoft.tdframework.common.data.BaseVO;

/**
 * Description: 登录系统人员日志查询
 * Company: neusoft
 * Date: 2010-06-21
 * @author liushen
 * @version
 */

public class LoginUserListVO extends BaseVO{
	private String partCity;  //地市编码(分区)
	private int partMm;  // 月份(分区)来源与操作日期
	private String id;  // ID
	private String personId;  // 登录账号
	private String ipAddress;  // IP地址
	private String loginType;  // 登录方式
	private String loginTime;  // 登录时间
	private String logoutTime;  // 离开时间
	private String location;  // 当前位置
	private String macAddress;  // MAC地址
	private String dnsName;  // DNS名称
	private String empName;
	
	/**
	空的构造方法
	*/
	public LoginUserListVO(){

	}

	/**
	 * 获取地市编码
	 */
	public String getPartCity() {
		return partCity;
	}

	/**
	 * 设置地市编码
	 */
	public void setPartCity(String partCity) {
		this.partCity = partCity;
	}

	/**
	 * 获取月份
	 */
	public int getPartMm() {
		return partMm;
	}

	/**
	 * 设置月份
	 */
	public void setPartMm(int partMm) {
		this.partMm = partMm;
	}

	/**
	 * 获取登录账号
	 */
	public String getPersonId() {
		return personId;
	}

	/**
	 * 设置登录账号
	 */
	public void setPersonId(String personId) {
		this.personId = personId;
	}

	/**
	 * 获取IP地址
	 */
	public String getIpAddress() {
		return ipAddress;
	}

	/**
	 * 设置IP地址
	 */
	public void setIpAddress(String ipAddress) {
		this.ipAddress = ipAddress;
	}

	/**
	 * 获取登录方式
	 */
	public String getLoginType() {
		return loginType;
	}

	/**
	 * 设置登录方式
	 */
	public void setLoginType(String loginType) {
		this.loginType = loginType;
	}

	/**
	 * 获取登录时间
	 */
	public String getLoginTime() {
		return loginTime;
	}

	/**
	 * 设置登录时间
	 */
	public void setLoginTime(String loginTime) {
		this.loginTime = loginTime;
	}

	/**
	 * 获取离开时间
	 */
	public String getLogoutTime() {
		return logoutTime;
	}

	/**
	 * 设置离开时间
	 */
	public void setLogoutTime(String logoutTime) {
		this.logoutTime = logoutTime;
	}

	/**
	 * 获取当前位置
	 */
	public String getLocation() {
		return location;
	}

	/**
	 * 设置当前位置
	 */
	public void setLocation(String location) {
		this.location = location;
	}

	/**
	 * 获取ID
	 */
	public String getId() {
		return id;
	}

	/**
	 * 设置ID
	 */
	public void setId(String id) {
		this.id = id;
	}

	/**
	 * 获取MAC地址
	 */
	public String getMacAddress() {
		return macAddress;
	}

	/**
	 * 设置MAC地址
	 */
	public void setMacAddress(String macAddress) {
		this.macAddress = macAddress;
	}

	/**
	 * 获取DNS名称
	 */
	public String getDnsName() {
		return dnsName;
	}

	/**
	 * 设置DNS名称
	 */
	public void setDnsName(String dnsName) {
		this.dnsName = dnsName;
	}

	public String getEmpName() {
		return empName;
	}

	public void setEmpName(String empName) {
		this.empName = empName;
	}
	
	
}
