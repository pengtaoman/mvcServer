/*
 * Created on 2004-12-10
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.om.interfase.authorize;

import com.neusoft.om.dao.area.AreaVO;
import com.neusoft.om.dao.duty.DutyVO;
import com.neusoft.om.dao.employee.EmployeeVO;
import com.neusoft.om.dao.organ.OrganVO;
import com.neusoft.om.dao.paramrole.ParamRoleColl;
import com.neusoft.tdframework.authorization.AuthorizeVO;

/**
 * @author chenzt
 *
 * ��Ϥ��ܵ���֤�ӿ�
 * 
 * Line 175 is modified by liudong on 2005_0812
 */
public class OMAuthorizeVO implements AuthorizeVO{
	private EmployeeVO employeeVO = null;	//ְԱ
	private AreaVO areaVO = null;	//��������
	private OrganVO organVO = null;	//��֯��
	private DutyVO dutyVO = null;	//ְ��
	//����Ϣ����
	private EmployeeVO parentEmployeeVO = null;	//ְԱ
	private AreaVO parentAreaVO = null;	//��������
	private OrganVO parentOrganVO = null;	//��֯��
	private DutyVO parentDutyVO = null;	//ְ��
	
	/**�������,ͬʱ�ڹ������������ô��ֶα�ʶ���ĸ����еĹ�����*/
	private String partCity;
	//��֤�����Ϣ
	private int authorizeResult;
	private String authorizeMessage;
	private int authorizeEffectDays;
	private String cityCode = "";
	private int adminType;
	private String areaCode = ""; 
	private String loginIp = "";  //��¼ip
	private String loginId = "";  //��ǰ�û��Ự�ڵı�ʶ
    private String organId = "";
    private ParamRoleColl paramRoleColl = null;
    
    private String dealerName = "";
    
    private String homeCity = "";
	/**
	 * ����ְԱ
	 * @param vo
	 */
	public void setEmployeeVO(EmployeeVO vo){
		employeeVO = vo;
	}
	/**
	 * ������������
	 * @param vo
	 */
	public void setAreaVO(AreaVO vo) {
		areaVO = vo;
	}
	/**
	 * ����ְ��
	 * @param 
	 */
	public void setDutyVO(DutyVO dutyVO) {
		this.dutyVO = dutyVO;
	}
	/**
	 * ������֯��
	 * @param 
	 */
	public void setOrganVO(OrganVO organVO) {
		this.organVO = organVO;
	}
	
	/**
	 * ��½�˺�
	 */
	public String getWorkNo() {
		return employeeVO.getWorkNo();
	}
	/**
	 * ����
	 * @return
	 */
	public String getWorkPwd() {
		return employeeVO.getWorkPwd();
	}
	/**
	 * ����������
	 */
	public String getAreaId() {
		return employeeVO.getAreaId();
	}
	/**
	 * �����������
	 */
	public String getAreaName() {
		return areaVO.getAreaName();
	}
	/**
	 * �������򼶱�
	 */
	public int getAreaLevel() {
		return 4;//areaVO.getAreaLevel();
	}
	/**
	 * �ϼ�����������
	 */
	public String getParentAreaId() {
		return areaVO.getParentAreaId();
	}
	/**
	 * �ϼ������������
	 */
	public String getParentAreaName() {
		return parentAreaVO.getAreaName();
	}
	/**
	 * ��֯�����
	 */
	public String getDepartmentId(){
		return employeeVO.getOrganId();
	}
	/**
	 * ��������
	 */
	public String getOrganID() {
		String dealerId = employeeVO.getDealerId();
		if(dealerId == null || dealerId.trim().equals("")){
			dealerId = employeeVO.getOrganId();
		}
		return dealerId;
	}
	/**
	 * ��֯�����
	 */
	public String getOrganName() {
		return organVO.getOrganName();
	}
	/**
	 * ��֯������
	 */
	public int getOrganKind() {
		return organVO.getOrganKind();
	}
	/**
	 * �ϼ���֯�����
	 */
	public String getParentOrganId() {
		return organVO.getParentOrganId();
	}
	/**
	 * �ϼ���֯�����
	 */
	public String getParentOrganName() {
		return parentOrganVO.getOrganName();
	}
	/**
	 * �ϼ��ϼ���֯������
	 */
	public int getParentOrganKind() {
		return parentOrganVO.getOrganKind();
	}
	/**
	 * ְ�����
	 */
	public int getDutyId() {
		return dutyVO.getDutyId();
	}
	/**
	 * ְ�����
	 */
	public String getDutyName() {
		return dutyVO.getDutyName();
	}
	/**
	 * �ϼ�ְ�����
	 */
	public int getParentDutyId() {
		return dutyVO.getParentDutyId();
	}
	/**
	 * �ϼ�ְ�����
	 */
	public String getParentDutyName() {
		return parentDutyVO.getDutyName();
	}
	/**
	 * ְԱ���
	 */
	public String getEmployeeId() {
		//return employeeVO.getEmployeeId();
		return employeeVO==null?null:employeeVO.getEmployeeId();
	}
	/**
	 * ְԱ����
	 */
	public String getEmployeeName() {
		return employeeVO.getEmployeeName();
	}
	/**
	 * ֱ���ϼ�����
	 */
	public String getParentEmployeeId() {
		return employeeVO.getParentEmployeeId();
	}
	/**
	 * �ϼ�����
	 */
	public String getParentEmployeeName() {
		return parentEmployeeVO.getEmployeeName();
	}
	/**
	 * ��֤���
	 */
	public int getAuthorizeResult() {
		return authorizeResult;
	}
	/**
	 * ��֤��Ϣ
	 */
	public String getAuthorizeMessage() {
		return authorizeMessage;
	}
	/**
	 * ��������ʧЧ������
	 */
	public int getAuthorizeEffectDays() {
		return authorizeEffectDays;
	}
	/**
	 * �������
	 */
	public String getPartCity() {
		return partCity;
	}
	/**
	 * @param i
	 */
	public void setAuthorizeEffectDays(int i) {
		authorizeEffectDays = i;
	}

	/**
	 * @param string
	 */
	public void setAuthorizeMessage(String string) {
		authorizeMessage = string;
	}

	/**
	 * @param i
	 */
	public void setAuthorizeResult(int i) {
		authorizeResult = i;
	}

	/**
	 * @param string
	 */
	public void setPartCity(String string) {
		partCity = string;
	}

	/**
	 * @param areaVO
	 */
	public void setParentAreaVO(AreaVO areaVO) {
		parentAreaVO = areaVO;
	}

	/**
	 * @param dutyVO
	 */
	public void setParentDutyVO(DutyVO dutyVO) {
		parentDutyVO = dutyVO;
	}

	/**
	 * @param employeeVO
	 */
	public void setParentEmployeeVO(EmployeeVO employeeVO) {
		parentEmployeeVO = employeeVO;
	}

	/**
	 * @param organVO
	 */
	public void setParentOrganVO(OrganVO organVO) {
		parentOrganVO = organVO;
	}
    
    public ParamRoleColl getParamRoleColl()
    {
        return paramRoleColl;
    }
    public void setParamRoleColl(ParamRoleColl paramRoleColl)
    {
        this.paramRoleColl = paramRoleColl;
    }
	public void setCityCode(String cityCode) {
		this.cityCode = cityCode;
	}
	public String getCityCode() {
		return cityCode;
	}
	public int getAdminType() {
		return adminType;
	}
	public void setAdminType(int adminType) {
		this.adminType = adminType;
	}
	public String getAreaCode() {
		return areaCode;
	}
	public void setAreaCode(String areaCode) {
		this.areaCode = areaCode;
	}
    
	public int getStatus(){
		return employeeVO.getStatus();
	}
	
    public int getGender(){
    	return employeeVO.getGender();
    }
	public String getMobile() {
		return employeeVO.getMobile();
	}
	public String getEmail() {		
		return employeeVO.getEmail();
	}
	public String getLoginIp() {
		return loginIp;
	}
	public void setLoginIp(String loginIp) {
		this.loginIp = loginIp;
	}
	public String getLoginId() {
		return loginId;
	}
	public void setLoginId(String loginId) {
		this.loginId = loginId;
	}
	public int getBusDutyId() {
		return employeeVO.getBusDutyId();
	}
	public void setOrganId(String organId) {
		this.organId = organId;
	}
	public String getDealerName() {
		return dealerName;
	}
	public void setDealerName(String dealerName) {
		this.dealerName = dealerName;
	}
	public int getOperLevel() {
		  return employeeVO.getOperLevel();
	}
    public long getSystemUserId(){
    	String employeeId = employeeVO.getEmployeeId();
		try {
			long intEmpId = Long.parseLong(employeeId);
			return intEmpId;
		} catch (NumberFormatException e) {
			return 0;
		}    	
    }
    
    public long getStaffId(){
    	return getSystemUserId();
    }
    
    public long getPartyId(){
    	return employeeVO.getPartyId();
    }
	public String getHomeCity() {
		return homeCity;
	}
	public void setHomeCity(String homeCity) {
		this.homeCity = homeCity;
	}

}
