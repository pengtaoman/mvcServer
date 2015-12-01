package com.neusoft.om.dao.employee;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.BaseVO;
import com.neusoft.tdframework.common.util.DateUtil;
import com.neusoft.tdframework.common.util.NullProcessUtil;
import com.neusoft.tdframework.common.util.StringUtil;

/**
 * Title:
 * Description:
 * Company: neusoft
 * Date: 2006-06-10
 * @author ren.hui@neusoft.com
 * @version
 */

public class EmployeeVO extends BaseVO { 
    private String  employeeId; //ְԱ����
    private int busDutyId;  //ְλ����
    private String  employeeName;   //ְԱ����
    private int dutyId; //������֯�����ڵ���Ҫְ��
    private String  areaId; //������������
    private String  organId;    //������֯����
    private String  parentEmployeeId;   //������Ա����
    private String  workNo; //��¼�˺�
    private String  workPwd;    //��¼����
    private String  inactiveDate;   //�˺�ʧЧ����
    private String  inactivePwdDate;    //����ʧЧ����
    private int employeeType;  //1.��0.��  employeeType
    private int educateLevel;   //�����̶�
    private String  workAddress;    //�칫��ַ
    private String  workTelephone;  //�칫�绰
    private String  email;  //�����ʼ�
    private String  honeTelephone;  //סլ�绰
    private String  mobile; //�ƶ��绰
    private String  fax;    //�����ַ
    private String  homeAddress;    //��ͥ��ַ
    private String  birthday;   //��������
    private int gender; //�Ա�
    private float   income; //н��
    private int marriageStatus; //0.δ֪��1.δ�飬2.�ѻ�
    private String  hiredDate;  //��ְ����
    private String  contractDate;   //ת������
    private String  resignedDate;   //��ְ����
    private String  updateDate; //�������
    private String  loginIp;    //��½IP
    private String  mac;    //MAC��ַ
    private String  pwdUpdate;  //�ϴ��޸�����ʱ��
    private String  owner;  //�����߹���
    private int adminType;  //����Ա���� ��ͨ����Ա 0����Ȩ����Ա 1����ͨ����Ա 2
    private String cityCode; //���б���
    private int personLevel; //����Ա����
    
    private int status; //ְԱ״̬ 1������ 0��ͣ��
    private String statusInfo;  //ְԱ״̬��Ϣ
    private int roleNum; //ְԱӵ�н�ɫ��
    private String allRoleInfo;  //ְԱ��ɫ��Ϣ
    
    private String areaName;//����������Ϣ
    private String dutyName; //ְ������
    private String organName;//��֯��������
    private String levelName;//����Ա��������
    
    private String dealerId; //��������
    private String dealerName; //��������
    private String adminTypeName; //����Ա��������
    
    private String loginIp2;
    private String mac2;
    private String email2;
    private int order; 
    private int operLevel; //��������
    
    private int adjustPower; //�Ƿ���й�΢��
    private String adjusetPowerDesc; //�Ƿ���й�΢��������
    
    private String cityName;
    private long partyId;
    public int moreCity;
    
    /**
        �յĹ��췽��
    */
    public EmployeeVO(){

    }
    /**
        ͨ������ֵ����һ������
    */
    public EmployeeVO(String employeeId, int busDutyId, String employeeName, 
            int dutyId, String areaId, String organId, String parentEmployeeId, 
            String workNo, String workPwd, String inactiveDate, String inactivePwdDate, 
            int innerEmployee, int educateLevel, String workAddress, 
            String workTelephone, String email, String honeTelephone, 
            String mobile, String fax, String homeAddress, String birthday, 
            int gender, float income, int marriageStatus, String hiredDate, 
            String contractDate, String resignedDate, String updateDate, 
            String loginIp, String mac, String pwdUpdate, int adminFlag, 
            String owner, int adminType, String DutyName, String organName,
            String cityCode, int personLevel, String levelName){

    }
    /**
        ͨ��һ�����ж�����һ������
    */
    public EmployeeVO(EmployeeVO other){
        if(this != other) {
            this.employeeId = other.employeeId;
            this.busDutyId = other.busDutyId;
            this.employeeName = other.employeeName;
            this.dutyId = other.dutyId;
            this.areaId = other.areaId;
            this.organId = other.organId;
            this.parentEmployeeId = other.parentEmployeeId;
            this.workNo = other.workNo;
            this.workPwd = other.workPwd;
            this.inactiveDate = other.inactiveDate;
            this.inactivePwdDate = other.inactivePwdDate;
            this.employeeType = other.employeeType;
            this.educateLevel = other.educateLevel;
            this.workAddress = other.workAddress;
            this.workTelephone = other.workTelephone;
            this.email = other.email;
            this.honeTelephone = other.honeTelephone;
            this.mobile = other.mobile;
            this.fax = other.fax;
            this.homeAddress = other.homeAddress;
            this.birthday = other.birthday;
            this.gender = other.gender;
            this.income = other.income;
            this.marriageStatus = other.marriageStatus;
            this.hiredDate = other.hiredDate;
            this.contractDate = other.contractDate;
            this.resignedDate = other.resignedDate;
            this.updateDate = other.updateDate;
            this.loginIp = other.loginIp;
            this.mac = other.mac;
            this.pwdUpdate = other.pwdUpdate;
            this.owner = other.owner;
            this.adminType = other.adminType;
            this.dutyName = other.dutyName;
            this.organName = other.organName;
            this.cityCode = other.cityCode;
            this.personLevel = other.personLevel;
            this.levelName = other.levelName;
            this.status = other.status;
            this.dealerId = other.dealerId;
            this.dealerName = other.dealerName;
            this.adminTypeName = other.adminTypeName;
            this.areaName = other.areaName;
            this.operLevel = other.operLevel;
        }
    }
    /** 
        ��ֵ����
    */
    private String nvl(String str) {
        return str==null?"":str;
    }

    /**
        ����ְԱ����
    */
    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }
    /**
        ��ȡְԱ����
    */
    public String getEmployeeId() {
        return (this.employeeId);
    }
    /**
        ����ְλ����
    */
    public void setBusDutyId(int busDutyId) {
        this.busDutyId = busDutyId;
    }
    /**
        ��ȡְλ����
    */
    public int getBusDutyId() {
        return (this.busDutyId);
    }
    /**
        ����ְԱ����
    */
    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }
    /**
        ��ȡְԱ����
    */
    public String getEmployeeName() {
        return (this.employeeName);
    }
    /**
        ����������֯�����ڵ���Ҫְ��
    */
    public void setDutyId(int dutyId) {
        this.dutyId = dutyId;
    }
    /**
        ��ȡ������֯�����ڵ���Ҫְ��
    */
    public int getDutyId() {
        return (this.dutyId);
    }
    /**
        ����������������
    */
    public void setAreaId(String areaId) {
        this.areaId = areaId;
    }
    /**
        ��ȡ������������
    */
    public String getAreaId() {
        return (this.areaId);
    }
    /**
        ����������֯����
    */
    public void setOrganId(String organId) {
        this.organId = organId;
    }
    /**
        ��ȡ������֯����
    */
    public String getOrganId() {
        return (this.organId);
    }
    /**
        ����������Ա����
    */
    public void setParentEmployeeId(String parentEmployeeId) {
        this.parentEmployeeId = parentEmployeeId;
    }
    /**
        ��ȡ������Ա����
    */
    public String getParentEmployeeId() {
        return (this.parentEmployeeId);
    }
    /**
        ���õ�¼�˺�
    */
    public void setWorkNo(String workNo) {
        this.workNo = workNo;
    }
    /**
        ��ȡ��¼�˺�
    */
    public String getWorkNo() {
        return (this.workNo);
    }
    /**
        ���õ�¼����
    */
    public void setWorkPwd(String workPwd) {
        this.workPwd = workPwd;
    }
    /**
        ��ȡ��¼����
    */
    public String getWorkPwd() {
        return (this.workPwd);
    }
    /**
        �����˺�ʧЧ����
    */
    public void setInactiveDate(String inactiveDate) {
        this.inactiveDate = inactiveDate;
    }
    /**
        ��ȡ�˺�ʧЧ����
    */
    public String getInactiveDate() {
        return (this.inactiveDate);
    }
    /**
        ��������ʧЧ����
    */
    public void setInactivePwdDate(String inactivePwdDate) {
        this.inactivePwdDate = inactivePwdDate;
    }
    /**
        ��ȡ����ʧЧ����
    */
    public String getInactivePwdDate() {
        return (this.inactivePwdDate);
    }
    /**
        ����1.��0.��
    */
    public void setEmployeeType(int employeeType) {
        this.employeeType = employeeType;
    }
    /**
        ��ȡ1.��0.��
    */
    public int getEmployeeType() {
        return (this.employeeType);
    }
    /**
        ���ý����̶�
    */
    public void setEducateLevel(int educateLevel) {
        this.educateLevel = educateLevel;
    }
    /**
        ��ȡ�����̶�
    */
    public int getEducateLevel() {
        return (this.educateLevel);
    }
    /**
        ���ð칫��ַ
    */
    public void setWorkAddress(String workAddress) {
        this.workAddress = workAddress;
    }
    /**
        ��ȡ�칫��ַ
    */
    public String getWorkAddress() {
        return (this.workAddress);
    }
    /**
        ���ð칫�绰
    */
    public void setWorkTelephone(String workTelephone) {
        this.workTelephone = workTelephone;
    }
    /**
        ��ȡ�칫�绰
    */
    public String getWorkTelephone() {
        return (this.workTelephone);
    }
    /**
        ���õ����ʼ�
    */
    public void setEmail(String email) {
        this.email = email;
    }
    /**
        ��ȡ�����ʼ�
    */
    public String getEmail() {
        return (this.email);
    }
    /**
        ����סլ�绰
    */
    public void setHoneTelephone(String honeTelephone) {
        this.honeTelephone = honeTelephone;
    }
    /**
        ��ȡסլ�绰
    */
    public String getHoneTelephone() {
        return (this.honeTelephone);
    }
    /**
        �����ƶ��绰
    */
    public void setMobile(String mobile) {
        this.mobile = mobile;
    }
    /**
        ��ȡ�ƶ��绰
    */
    public String getMobile() {
        return (this.mobile);
    }
    /**
        ���ô����ַ
    */
    public void setFax(String fax) {
        this.fax = fax;
    }
    /**
        ��ȡ�����ַ
    */
    public String getFax() {
        return (this.fax);
    }
    /**
        ���ü�ͥ��ַ
    */
    public void setHomeAddress(String homeAddress) {
        this.homeAddress = homeAddress;
    }
    /**
        ��ȡ��ͥ��ַ
    */
    public String getHomeAddress() {
        return (this.homeAddress);
    }
    /**
        ���ó�������
    */
    public void setBirthday(String birthday) {
        this.birthday = birthday;
    }
    /**
        ��ȡ��������
    */
    public String getBirthday() {
        return (this.birthday);
    }
    /**
        �����Ա�
    */
    public void setGender(int gender) {
        this.gender = gender;
    }
    /**
        ��ȡ�Ա�
    */
    public int getGender() {
        return (this.gender);
    }
    /**
        ����н��
    */
    public void setIncome(float income) {
        this.income = income;
    }
    /**
        ��ȡн��
    */
    public float getIncome() {
        return (this.income);
    }
    /**
        ����0.δ֪��1.δ�飬2.�ѻ�
    */
    public void setMarriageStatus(int marriageStatus) {
        this.marriageStatus = marriageStatus;
    }
    /**
        ��ȡ0.δ֪��1.δ�飬2.�ѻ�
    */
    public int getMarriageStatus() {
        return (this.marriageStatus);
    }
    /**
        ������ְ����
    */
    public void setHiredDate(String hiredDate) {
        this.hiredDate = hiredDate;
    }
    /**
        ��ȡ��ְ����
    */
    public String getHiredDate() {
        return (this.hiredDate);
    }
    /**
        ����ת������
    */
    public void setContractDate(String contractDate) {
        this.contractDate = contractDate;
    }
    /**
        ��ȡת������
    */
    public String getContractDate() {
        return (this.contractDate);
    }
    /**
        ���ô�ְ����
    */
    public void setResignedDate(String resignedDate) {
        this.resignedDate = resignedDate;
    }
    /**
        ��ȡ��ְ����
    */
    public String getResignedDate() {
        return (this.resignedDate);
    }
    /**
        ���ñ������
    */
    public void setUpdateDate(String updateDate) {
        this.updateDate = updateDate;
    }
    /**
        ��ȡ�������
    */
    public String getUpdateDate() {
        return (this.updateDate);
    }
    /**
        ���õ�½IP
    */
    public void setLoginIp(String loginIp) {
        this.loginIp = loginIp;
    }
    /**
        ��ȡ��½IP
    */
    public String getLoginIp() {
        return (this.loginIp);
    }
    /**
        ����MAC��ַ
    */
    public void setMac(String mac) {
        this.mac = mac;
    }
    /**
        ��ȡMAC��ַ
    */
    public String getMac() {
        return (this.mac);
    }
    /**
        �����ϴ��޸�����ʱ��
    */
    public void setPwdUpdate(String pwdUpdate) {
        this.pwdUpdate = pwdUpdate;
    }
    /**
        ��ȡ�ϴ��޸�����ʱ��
    */
    public String getPwdUpdate() {
        return (this.pwdUpdate);
    }
    /**
        ���ô����߹���
    */
    public void setOwner(String owner) {
        this.owner = owner;
    }
    /**
        ��ȡ�����߹���
    */
    public String getOwner() {
        return (this.owner);
    }
    /**
        ���ù���Ա���� ϵͳ��������Ա 1�����򳬼�����Ա 2,���������Ա 3�����޹���Ա 4
    */
    public void setAdminType(int adminType) {
        this.adminType = adminType;
    }
    /**
        ��ȡ����Ա���� ϵͳ��������Ա 1�����򳬼�����Ա 2,���������Ա 3�����޹���Ա 4
    */
    public int getAdminType() {
        return (this.adminType);
    }

    public String getDutyName()
    {
        return dutyName;
    }
    public void setDutyName(String dutyName)
    {
        this.dutyName = dutyName;
    }
    public String getOrganName()
    {
        return organName;
    }
    public void setOrganName(String organName)
    {
        this.organName = organName;
    }
    
    
    public String getCityCode()
    {
        return cityCode;
    }
    public void setCityCode(String cityCode)
    {
        this.cityCode = cityCode;
    }
    public int getPersonLevel()
    {
        return personLevel;
    }
    public void setPersonLevel(int personLevel)
    {
        this.personLevel = personLevel;
    }
    
    public String getLevelName()
    {
        return levelName;
    }
    public void setLevelName(String levelName)
    {
        this.levelName = levelName;
    }
    /**
     * ״̬ 1.�� 0.��
     */
    public int getStatus() {
        return (this.status);
    }
    /**
        ����״̬
    */
    public void setStatus(int status) {
        this.status = status;
    }
    
    
    public String getDealerId() {
		return dealerId;
	}
	public void setDealerId(String dealerId) {
		this.dealerId = dealerId;
	}
	
	
	public String getAdminTypeName() {
		return adminTypeName;
	}
	public void setAdminTypeName(String adminTypeName) {
		this.adminTypeName = adminTypeName;
	}
	public String getDealerName() {
		return dealerName;
	}
	public void setDealerName(String dealerName) {
		this.dealerName = dealerName;
	}
	
	
	/**
	 * @return the email2
	 */
	public String getEmail2() {
		return email2;
	}
	/**
	 * @param email2 the email2 to set
	 */
	public void setEmail2(String email2) {
		this.email2 = email2;
	}
	/**
	 * @return the loginIp2
	 */
	public String getLoginIp2() {
		return loginIp2;
	}
	/**
	 * @param loginIp2 the loginIp2 to set
	 */
	public void setLoginIp2(String loginIp2) {
		this.loginIp2 = loginIp2;
	}
	/**
	 * @return the mac2
	 */
	public String getMac2() {
		return mac2;
	}
	/**
	 * @param mac2 the mac2 to set
	 */
	public void setMac2(String mac2) {
		this.mac2 = mac2;
	}

	/**
	 * @return the order
	 */
	public int getOrder() {
		return order;
	}
	
	/**
	 * @return the adjustPower
	 */
	public int getAdjustPower() {
		return adjustPower;
	}
	/**
	 * @param adjustPower the adjustPower to set
	 */
	public void setAdjustPower(int adjustPower) {
		this.adjustPower = adjustPower;
	}
	/**
	 * @param order the order to set
	 */
	public void setOrder(int order) {
		this.order = order;
	}
	
	/**
	 * @return the adjusetPowerDesc
	 */
	public String getAdjusetPowerDesc() {
		return adjusetPowerDesc;
	}
	/**
	 * @param adjusetPowerDesc the adjusetPowerDesc to set
	 */
	public void setAdjusetPowerDesc(String adjusetPowerDesc) {
		this.adjusetPowerDesc = adjusetPowerDesc;
	}
	
	
	public String getCityName() {
		return cityName;
	}
	public void setCityName(String cityName) {
		this.cityName = cityName;
	}
	
	public long getPartyId() {
		return partyId;
	}
	public void setPartyId(long partyId) {
		this.partyId = partyId;
	}
	
	public int getMoreCity() {
		return moreCity;
	}
	public void setMoreCity(int moreCity) {
		this.moreCity = moreCity;
	}
	/**
        ��SQL�Ľ������������
    */
    public void setAttribute(ResultSet resultSet) throws SQLException {
        ResultSetMetaData metaData = resultSet.getMetaData();

        for(int i=1;i<=metaData.getColumnCount();i++) { 

            String columnName = metaData.getColumnName(i).toLowerCase();

            if(columnName.intern()=="f_employee_id".intern())
                employeeId = nvl(resultSet.getString(i));
            else if(columnName.intern()=="f_bus_duty_id".intern())
                busDutyId = resultSet.getInt(i);
            else if(columnName.intern()=="f_employee_name".intern())
                employeeName = nvl(resultSet.getString(i));
            else if(columnName.intern()=="f_duty_id".intern())
                dutyId = resultSet.getInt(i);
            else if(columnName.intern()=="f_area_id".intern())
                areaId = nvl(resultSet.getString(i));
            else if(columnName.intern()=="f_organ_id".intern())
                organId = nvl(resultSet.getString(i));
            else if(columnName.intern()=="f_parent_employee_id".intern())
                parentEmployeeId = nvl(resultSet.getString(i));
            else if(columnName.intern()=="f_work_no".intern())
                workNo = nvl(resultSet.getString(i));
            else if(columnName.intern()=="f_work_pwd".intern())
                workPwd = nvl(resultSet.getString(i));
            else if(columnName.intern()=="f_inactive_date".intern())
                inactiveDate = NullProcessUtil.nvlToString(DateUtil.stringDateTime((java.util.Date)resultSet.getObject(i),"yyyy-MM-dd"),"");
            else if(columnName.intern()=="f_inactive_pwd_date".intern())
                inactivePwdDate = NullProcessUtil.nvlToString(DateUtil.stringDateTime((java.util.Date)resultSet.getObject(i),"yyyy-MM-dd"),"");
            else if(columnName.intern()=="f_employee_type".intern())
                employeeType = resultSet.getInt(i);
            else if(columnName.intern()=="f_educate_level".intern())
                educateLevel = resultSet.getInt(i);
            else if(columnName.intern()=="f_work_address".intern())
                workAddress = nvl(resultSet.getString(i));
            else if(columnName.intern()=="f_work_telephone".intern())
                workTelephone = nvl(resultSet.getString(i));
            else if(columnName.intern()=="f_email".intern())
                email = nvl(resultSet.getString(i));
            else if(columnName.intern()=="f_hone_telephone".intern())
                honeTelephone = nvl(resultSet.getString(i));
            else if(columnName.intern()=="f_mobile".intern())
                mobile = nvl(resultSet.getString(i));
            else if(columnName.intern()=="f_fax".intern())
                fax = nvl(resultSet.getString(i));
            else if(columnName.intern()=="f_home_address".intern())
                homeAddress = nvl(resultSet.getString(i));
            else if(columnName.intern()=="f_birthday".intern())
                birthday = NullProcessUtil.nvlToString(DateUtil.stringDateTime((java.util.Date)resultSet.getObject(i),"yyyy-MM-dd"),"");
            else if(columnName.intern()=="f_gender".intern())
                gender = resultSet.getInt(i);
            else if(columnName.intern()=="f_income".intern())
                income = resultSet.getFloat(i);
            else if(columnName.intern()=="f_marriage_status".intern())
                marriageStatus = resultSet.getInt(i);
            else if(columnName.intern()=="f_hired_date".intern())
                hiredDate = NullProcessUtil.nvlToString(DateUtil.stringDateTime((java.util.Date)resultSet.getObject(i),"yyyy-MM-dd"),"");
            else if(columnName.intern()=="f_contract_date".intern())
                contractDate = NullProcessUtil.nvlToString(DateUtil.stringDateTime((java.util.Date)resultSet.getObject(i),"yyyy-MM-dd"),"");
            else if(columnName.intern()=="f_resigned_date".intern())
                resignedDate = NullProcessUtil.nvlToString(DateUtil.stringDateTime((java.util.Date)resultSet.getObject(i),"yyyy-MM-dd"),"");
            else if(columnName.intern()=="f_update_date".intern())
                updateDate = NullProcessUtil.nvlToString(DateUtil.stringDateTime((java.util.Date)resultSet.getObject(i),"yyyy-MM-dd"),"");
            else if(columnName.intern()=="f_login_ip".intern())
                loginIp = nvl(resultSet.getString(i));
            else if(columnName.intern()=="f_mac".intern())
                mac = nvl(resultSet.getString(i));
            else if(columnName.intern()=="f_pwd_update".intern())
                pwdUpdate = NullProcessUtil.nvlToString(DateUtil.stringDateTime((java.util.Date)resultSet.getObject(i),"yyyy-MM-dd"),"");
            else if(columnName.intern()=="f_owner".intern())
                owner = nvl(resultSet.getString(i));
            else if(columnName.intern()=="f_admin_type".intern())
                adminType = resultSet.getInt(i);
            else if(columnName.intern()=="f_city_code".intern())
                cityCode = nvl(resultSet.getString(i));
            else if(columnName.intern()=="f_person_level".intern())
                personLevel = resultSet.getInt(i);
            else if(columnName.intern()=="f_status".intern())
                status = resultSet.getInt(i);
            else if(columnName.intern()=="f_dealer_id".intern())
                dealerId = nvl(resultSet.getString(i));
            
            else if(columnName.intern()=="f_area_name".intern())
            	areaName = nvl(resultSet.getString("f_area_name"));
            else if(columnName.intern()=="f_organ_name".intern())
            	organName = nvl(resultSet.getString("f_organ_name"));
            else if(columnName.intern()=="f_duty_name".intern())
            	dutyName = nvl(resultSet.getString("f_duty_name"));
        	else if(columnName.intern()=="f_role_num".intern())
        		roleNum = resultSet.getInt("f_role_num");
        	else if(columnName.intern()=="dealer_name".intern())
        		dealerName = resultSet.getString("dealer_name");
        	else if(columnName.intern()=="f_level_name".intern())
        		levelName = resultSet.getString("f_level_name");
        	else if(columnName.intern()=="f_login_ip2".intern())
        		loginIp2 = resultSet.getString("f_login_ip2");
        	else if(columnName.intern()=="f_mac2".intern())
        		mac2 = resultSet.getString("f_mac2");
        	else if(columnName.intern()=="f_email2".intern())
        		email2 = resultSet.getString("f_email2");
        	else if(columnName.intern()=="f_order".intern())
        		order = resultSet.getInt("f_order");
        	else if(columnName.intern()=="f_oper_level".intern())
        		operLevel = resultSet.getInt("f_oper_level");
        	else if(columnName.intern()=="f_party_id".intern())
        		partyId = resultSet.getLong("f_party_id");
        	else if(columnName.intern()=="f_more_city".intern())
        		moreCity = resultSet.getInt("f_more_city");
        }
 
    }
    
    public void setAllAttribute(ResultSet resultSet) throws SQLException {
    	employeeId = nvl(resultSet.getString("f_employee_id"));
    	busDutyId = resultSet.getInt("f_bus_duty_id");
    	employeeName = nvl(resultSet.getString("f_employee_name"));
    	dutyId = resultSet.getInt("f_duty_id");
    	areaId = nvl(resultSet.getString("f_area_id"));
    	organId = nvl(resultSet.getString("f_organ_id"));
    	parentEmployeeId = nvl(resultSet.getString("f_parent_employee_id"));
    	workNo = nvl(resultSet.getString("f_work_no"));
    	workPwd = nvl(resultSet.getString("f_work_pwd"));
    	inactiveDate = NullProcessUtil.nvlToString(DateUtil.stringDateTime((java.util.Date)resultSet.getObject("f_inactive_date"),"yyyy-MM-dd"),"");
    	inactivePwdDate = NullProcessUtil.nvlToString(DateUtil.stringDateTime((java.util.Date)resultSet.getObject("f_inactive_pwd_date"),"yyyy-MM-dd"),"");
    	employeeType = resultSet.getInt("f_employee_type");
    	educateLevel = resultSet.getInt("f_educate_level");
    	workAddress = nvl(resultSet.getString("f_work_address"));
    	workTelephone = nvl(resultSet.getString("f_work_telephone"));
    	email = nvl(resultSet.getString("f_email"));
    	honeTelephone = nvl(resultSet.getString("f_hone_telephone"));
    	mobile = nvl(resultSet.getString("f_mobile"));
    	fax = nvl(resultSet.getString("f_fax"));
    	homeAddress = nvl(resultSet.getString("f_home_address"));
    	birthday = NullProcessUtil.nvlToString(DateUtil.stringDateTime((java.util.Date)resultSet.getObject("f_birthday"),"yyyy-MM-dd"),"");
    	gender = resultSet.getInt("f_gender");
    	income = resultSet.getFloat("f_income");
    	marriageStatus = resultSet.getInt("f_marriage_status");
    	hiredDate = NullProcessUtil.nvlToString(DateUtil.stringDateTime((java.util.Date)resultSet.getObject("f_hired_date"),"yyyy-MM-dd"),"");
    	contractDate = NullProcessUtil.nvlToString(DateUtil.stringDateTime((java.util.Date)resultSet.getObject("f_contract_date"),"yyyy-MM-dd"),"");
    	resignedDate = NullProcessUtil.nvlToString(DateUtil.stringDateTime((java.util.Date)resultSet.getObject("f_resigned_date"),"yyyy-MM-dd"),"");
    	updateDate = NullProcessUtil.nvlToString(DateUtil.stringDateTime((java.util.Date)resultSet.getObject("f_update_date"),"yyyy-MM-dd"),"");
    	loginIp = nvl(resultSet.getString("f_login_ip"));
    	mac = nvl(resultSet.getString("f_mac"));
    	pwdUpdate = NullProcessUtil.nvlToString(DateUtil.stringDateTime((java.util.Date)resultSet.getObject("f_pwd_update"),"yyyy-MM-dd"),"");
    	owner = nvl(resultSet.getString("f_owner"));
    	adminType = resultSet.getInt("f_admin_type");
    	cityCode = nvl(resultSet.getString("f_city_code"));
    	personLevel = resultSet.getInt("f_person_level");
    	status = resultSet.getInt("f_status");
    	dealerId = nvl(resultSet.getString("f_dealer_id"));
    	
    	areaName = nvl(resultSet.getString("f_area_name"));
    	organName = nvl(resultSet.getString("f_organ_name"));
    	
    	loginIp2 = nvl(resultSet.getString("f_login_ip2"));
    	mac2 = nvl(resultSet.getString("f_mac2"));
    	email2 = nvl(resultSet.getString("f_email2"));
    	order = resultSet.getInt("f_order");
    	operLevel = resultSet.getInt("f_oper_level");
    	//dutyName = nvl(resultSet.getString("f_duty_name"));
    	//roleNum = resultSet.getInt("f_role_num");
    	//dealerName = nvl(resultSet.getString("dealer_name"));
    	//levelName = nvl(resultSet.getString("f_level_name"));
    }

    /**
    * ͨ��MAP��ʼ����Ϣ
    */
    public void setAttribute(java.util.HashMap map)throws NumberFormatException {
        employeeId = NullProcessUtil.nvlToString(
            map.get("employeeId"),"");
        busDutyId = Integer.parseInt(NullProcessUtil.nvlToString(
            map.get("busDutyId"), "-10"));
        employeeName = NullProcessUtil.nvlToString(
            map.get("employeeName"),"");
        dutyId = Integer.parseInt(NullProcessUtil.nvlToString(
            map.get("dutyId"), "-10"));
        areaId = NullProcessUtil.nvlToString(
            map.get("areaId"),"");
        organId = NullProcessUtil.nvlToString(
            map.get("organId"),"");
        parentEmployeeId = NullProcessUtil.nvlToString(
            map.get("parentEmployeeId"),"");
        workNo = NullProcessUtil.nvlToString(
            map.get("workNo"),"");
        workPwd = NullProcessUtil.nvlToString(
            map.get("workPwd"),"");
//        inactiveDate = NullProcessUtil.nvlToString(
//            map.get("inactiveDate"),"");
//        inactivePwdDate = NullProcessUtil.nvlToString(
//            map.get("inactivePwdDate"),"");
        employeeType = Integer.parseInt(NullProcessUtil.nvlToString(
            map.get("employeeType"), "-10"));
        educateLevel = Integer.parseInt(NullProcessUtil.nvlToString(
            map.get("educateLevel"), "-10"));
        workAddress = NullProcessUtil.nvlToString(
            map.get("workAddress"),"");
        workTelephone = NullProcessUtil.nvlToString(
            map.get("workTelephone"),"");
        email = NullProcessUtil.nvlToString(
            map.get("email"),"");
        honeTelephone = NullProcessUtil.nvlToString(
            map.get("honeTelephone"),"");
        mobile = NullProcessUtil.nvlToString(
            map.get("mobile"),"");
        fax = NullProcessUtil.nvlToString(
            map.get("fax"),"");
        homeAddress = NullProcessUtil.nvlToString(
            map.get("homeAddress"),"");
        birthday = NullProcessUtil.nvlToString(
            map.get("birthday"),"");
        gender = Integer.parseInt(NullProcessUtil.nvlToString(
            map.get("gender"), "-10"));
        income = Float.parseFloat(NullProcessUtil.nvlToString(
            map.get("income"), "-10"));
        marriageStatus = Integer.parseInt(NullProcessUtil.nvlToString(
            map.get("marriageStatus"), "-10"));
        hiredDate = NullProcessUtil.nvlToString(
            map.get("hiredDate"),"");
        contractDate = NullProcessUtil.nvlToString(
            map.get("contractDate"),"");
        resignedDate = NullProcessUtil.nvlToString(
            map.get("resignedDate"),"");
        updateDate = NullProcessUtil.nvlToString(
            map.get("updateDate"),"");
        loginIp = NullProcessUtil.nvlToString(
            map.get("loginIp"),"");
        mac = NullProcessUtil.nvlToString(
            map.get("mac"),"");
        pwdUpdate = NullProcessUtil.nvlToString(
            map.get("pwdUpdate"),"");
        owner = NullProcessUtil.nvlToString(
            map.get("owner"),"");
        adminType = Integer.parseInt(NullProcessUtil.nvlToString(
            map.get("adminType"), "-10"));
        cityCode =  NullProcessUtil.nvlToString(
                map.get("cityCode"),"");
        personLevel = Integer.parseInt(NullProcessUtil.nvlToString(
                map.get("personLevel"), "-10"));
        operLevel = Integer.parseInt(NullProcessUtil.nvlToString(
                map.get("operLevel"), "-10"));
        status = Integer.parseInt(NullProcessUtil.nvlToString(
                map.get("status"), "-10"));
        dealerId =  NullProcessUtil.nvlToString(
                map.get("dealerId"),"");
        
        loginIp2 =  NullProcessUtil.nvlToString(
                map.get("loginIp2"),"");
        String orderStr = NullProcessUtil.nvlToString(
                map.get("order"), "0");
        if(orderStr.trim().equals("")){
        	orderStr = "0";
        }
        order = Integer.parseInt(orderStr);
        mac2 =  NullProcessUtil.nvlToString(
                map.get("mac2"),"");
        email2 =  NullProcessUtil.nvlToString(
                map.get("email2"),"");
    }

    /**
        ת�����ַ���
    */
    public String toString(int tabs) {
        StringBuffer ret = new StringBuffer();
        String str_tab = StringUtil.tabs(tabs);
        ret.append("<employeeId>").append(nvl(employeeId)).append("</employeeId>\n");
        ret.append(str_tab).append("<busDutyId>").append(busDutyId).append("</busDutyId>\n");
        ret.append(str_tab).append("<employeeName>").append(nvl(employeeName)).append("</employeeName>\n");
        ret.append(str_tab).append("<dutyId>").append(dutyId).append("</dutyId>\n");
        ret.append(str_tab).append("<areaId>").append(nvl(areaId)).append("</areaId>\n");
        ret.append(str_tab).append("<organId>").append(nvl(organId)).append("</organId>\n");
        ret.append(str_tab).append("<parentEmployeeId>").append(nvl(parentEmployeeId)).append("</parentEmployeeId>\n");
        ret.append(str_tab).append("<workNo>").append(nvl(workNo)).append("</workNo>\n");
        ret.append(str_tab).append("<workPwd>").append(nvl(workPwd)).append("</workPwd>\n");
        ret.append(str_tab).append("<inactiveDate>").append(nvl(inactiveDate)).append("</inactiveDate>\n");
        ret.append(str_tab).append("<inactivePwdDate>").append(nvl(inactivePwdDate)).append("</inactivePwdDate>\n");
        ret.append(str_tab).append("<employeeType>").append(employeeType).append("</employeeType>\n");
        ret.append(str_tab).append("<educateLevel>").append(educateLevel).append("</educateLevel>\n");
        ret.append(str_tab).append("<workAddress>").append(nvl(workAddress)).append("</workAddress>\n");
        ret.append(str_tab).append("<workTelephone>").append(nvl(workTelephone)).append("</workTelephone>\n");
        ret.append(str_tab).append("<email>").append(nvl(email)).append("</email>\n");
        ret.append(str_tab).append("<honeTelephone>").append(nvl(honeTelephone)).append("</honeTelephone>\n");
        ret.append(str_tab).append("<mobile>").append(nvl(mobile)).append("</mobile>\n");
        ret.append(str_tab).append("<fax>").append(nvl(fax)).append("</fax>\n");
        ret.append(str_tab).append("<homeAddress>").append(nvl(homeAddress)).append("</homeAddress>\n");
        ret.append(str_tab).append("<birthday>").append(nvl(birthday)).append("</birthday>\n");
        ret.append(str_tab).append("<gender>").append(gender).append("</gender>\n");
        ret.append(str_tab).append("<income>").append(income).append("</income>\n");
        ret.append(str_tab).append("<marriageStatus>").append(marriageStatus).append("</marriageStatus>\n");
        ret.append(str_tab).append("<hiredDate>").append(nvl(hiredDate)).append("</hiredDate>\n");
        ret.append(str_tab).append("<contractDate>").append(nvl(contractDate)).append("</contractDate>\n");
        ret.append(str_tab).append("<resignedDate>").append(nvl(resignedDate)).append("</resignedDate>\n");
        ret.append(str_tab).append("<updateDate>").append(nvl(updateDate)).append("</updateDate>\n");
        ret.append(str_tab).append("<loginIp>").append(nvl(loginIp)).append("</loginIp>\n");
        ret.append(str_tab).append("<mac>").append(nvl(mac)).append("</mac>\n");
        ret.append(str_tab).append("<pwdUpdate>").append(nvl(pwdUpdate)).append("</pwdUpdate>\n");
        ret.append(str_tab).append("<owner>").append(nvl(owner)).append("</owner>\n");
        ret.append(str_tab).append("<adminType>").append(adminType).append("</adminType>\n");
        ret.append(str_tab).append("<cityCode>").append(nvl(cityCode)).append("</cityCode>\n");
        ret.append(str_tab).append("<personLevel>").append(personLevel).append("</personLevel>\n");
        ret.append(str_tab).append("<operLevel>").append(operLevel).append("</operLevel>\n");
        ret.append(str_tab).append("<status>").append(status).append("</status>\n");
        ret.append(str_tab).append("<dealerId>").append(nvl(dealerId)).append("</dealerId>\n");
        return ret.toString();
    }
	public String getStatusInfo() {
		return statusInfo;
	}
	public void setStatusInfo(String statusInfo) {
		this.statusInfo = statusInfo;
	}
	public String getAllRoleInfo() {
		return allRoleInfo;
	}
	public void setAllRoleInfo(String allRoleInfo) {
		this.allRoleInfo = allRoleInfo;
	}
	public int getRoleNum() {
		return roleNum;
	}
	public void setRoleNum(int roleNum) {
		this.roleNum = roleNum;
	}
	public String getAreaName() {
		return areaName;
	}
	public void setAreaName(String areaName) {
		this.areaName = areaName;
	}
	public int getOperLevel() {
		return operLevel;
	}
	public void setOperLevel(int operLevel) {
		this.operLevel = operLevel;
	}

}