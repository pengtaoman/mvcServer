package com.neusoft.om.dao.loginuserlist;

import com.neusoft.tdframework.common.data.BaseVO;

/**
 * Description: ��¼ϵͳ��Ա��־��ѯ
 * Company: neusoft
 * Date: 2010-06-21
 * @author liushen
 * @version
 */

public class LoginUserListVO extends BaseVO{
	private String partCity;  //���б���(����)
	private int partMm;  // �·�(����)��Դ���������
	private String id;  // ID
	private String personId;  // ��¼�˺�
	private String ipAddress;  // IP��ַ
	private String loginType;  // ��¼��ʽ
	private String loginTime;  // ��¼ʱ��
	private String logoutTime;  // �뿪ʱ��
	private String location;  // ��ǰλ��
	private String macAddress;  // MAC��ַ
	private String dnsName;  // DNS����
	private String empName;
	
	/**
	�յĹ��췽��
	*/
	public LoginUserListVO(){

	}

	/**
	 * ��ȡ���б���
	 */
	public String getPartCity() {
		return partCity;
	}

	/**
	 * ���õ��б���
	 */
	public void setPartCity(String partCity) {
		this.partCity = partCity;
	}

	/**
	 * ��ȡ�·�
	 */
	public int getPartMm() {
		return partMm;
	}

	/**
	 * �����·�
	 */
	public void setPartMm(int partMm) {
		this.partMm = partMm;
	}

	/**
	 * ��ȡ��¼�˺�
	 */
	public String getPersonId() {
		return personId;
	}

	/**
	 * ���õ�¼�˺�
	 */
	public void setPersonId(String personId) {
		this.personId = personId;
	}

	/**
	 * ��ȡIP��ַ
	 */
	public String getIpAddress() {
		return ipAddress;
	}

	/**
	 * ����IP��ַ
	 */
	public void setIpAddress(String ipAddress) {
		this.ipAddress = ipAddress;
	}

	/**
	 * ��ȡ��¼��ʽ
	 */
	public String getLoginType() {
		return loginType;
	}

	/**
	 * ���õ�¼��ʽ
	 */
	public void setLoginType(String loginType) {
		this.loginType = loginType;
	}

	/**
	 * ��ȡ��¼ʱ��
	 */
	public String getLoginTime() {
		return loginTime;
	}

	/**
	 * ���õ�¼ʱ��
	 */
	public void setLoginTime(String loginTime) {
		this.loginTime = loginTime;
	}

	/**
	 * ��ȡ�뿪ʱ��
	 */
	public String getLogoutTime() {
		return logoutTime;
	}

	/**
	 * �����뿪ʱ��
	 */
	public void setLogoutTime(String logoutTime) {
		this.logoutTime = logoutTime;
	}

	/**
	 * ��ȡ��ǰλ��
	 */
	public String getLocation() {
		return location;
	}

	/**
	 * ���õ�ǰλ��
	 */
	public void setLocation(String location) {
		this.location = location;
	}

	/**
	 * ��ȡID
	 */
	public String getId() {
		return id;
	}

	/**
	 * ����ID
	 */
	public void setId(String id) {
		this.id = id;
	}

	/**
	 * ��ȡMAC��ַ
	 */
	public String getMacAddress() {
		return macAddress;
	}

	/**
	 * ����MAC��ַ
	 */
	public void setMacAddress(String macAddress) {
		this.macAddress = macAddress;
	}

	/**
	 * ��ȡDNS����
	 */
	public String getDnsName() {
		return dnsName;
	}

	/**
	 * ����DNS����
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
