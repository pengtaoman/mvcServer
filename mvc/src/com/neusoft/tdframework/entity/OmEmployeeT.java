package com.neusoft.tdframework.entity;

import java.io.Serializable;

import javax.persistence.*;

import org.hibernate.annotations.GenericGenerator;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;


/**
 * The persistent class for the om_employee_t database table.
 * 
 */
@Entity
@Table(name="om_employee_t")
@NamedQuery(name="OmEmployeeT.findAll", query="SELECT o FROM OmEmployeeT o")
public class OmEmployeeT implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid")
	@Column(name="F_EMPLOYEE_ID")
	private String fEmployeeId;

	@Column(name="F_ADMIN_TYPE")
	private BigDecimal fAdminType;

	@Column(name="F_AREA_ID")
	private String fAreaId;

	@Temporal(TemporalType.DATE)
	@Column(name="F_BIRTHDAY")
	private Date fBirthday;

	@Column(name="F_BUS_DUTY_ID")
	private BigDecimal fBusDutyId;

	@Column(name="F_CITY_CODE")
	private String fCityCode;

	@Temporal(TemporalType.DATE)
	@Column(name="F_CONTRACT_DATE")
	private Date fContractDate;

	@Column(name="F_DEALER_ID")
	private String fDealerId;

	@Column(name="F_DUTY_ID")
	private BigDecimal fDutyId;

	@Column(name="F_EDUCATE_LEVEL")
	private BigDecimal fEducateLevel;

	@Column(name="F_EMAIL")
	private String fEmail;

	@Column(name="F_EMAIL2")
	private String fEmail2;

	@Column(name="F_EMPLOYEE_NAME")
	private String fEmployeeName;

	@Column(name="F_EMPLOYEE_TYPE")
	private BigDecimal fEmployeeType;

	@Column(name="F_FAX")
	private String fFax;

	@Column(name="F_GENDER")
	private BigDecimal fGender;

	@Temporal(TemporalType.DATE)
	@Column(name="F_HIRED_DATE")
	private Date fHiredDate;

	@Column(name="F_HOME_ADDRESS")
	private String fHomeAddress;

	@Column(name="F_HONE_TELEPHONE")
	private String fHoneTelephone;

	@Temporal(TemporalType.DATE)
	@Column(name="F_INACTIVE_DATE")
	private Date fInactiveDate;

	@Temporal(TemporalType.DATE)
	@Column(name="F_INACTIVE_PWD_DATE")
	private Date fInactivePwdDate;

	@Column(name="F_INCOME")
	private BigDecimal fIncome;

	@Column(name="F_INNER_EMPLOYEE")
	private BigDecimal fInnerEmployee;

	@Column(name="F_LOGIN_IP")
	private String fLoginIp;

	@Column(name="F_LOGIN_IP2")
	private String fLoginIp2;

	@Column(name="F_MAC")
	private String fMac;

	@Column(name="F_MAC2")
	private String fMac2;

	@Column(name="F_MARRIAGE_STATUS")
	private BigDecimal fMarriageStatus;

	@Column(name="F_MOBILE")
	private String fMobile;

	@Column(name="F_ORDER")
	private BigDecimal fOrder;

	@Column(name="F_ORGAN_ID")
	private String fOrganId;

	@Column(name="F_OWNER")
	private String fOwner;

	@Column(name="F_PARENT_EMPLOYEE_ID")
	private String fParentEmployeeId;

	@Column(name="F_PERSON_LEVEL")
	private BigDecimal fPersonLevel;

	@Temporal(TemporalType.DATE)
	@Column(name="F_PWD_UPDATE")
	private Date fPwdUpdate;

	@Temporal(TemporalType.DATE)
	@Column(name="F_RESIGNED_DATE")
	private Date fResignedDate;

	@Column(name="F_STATUS")
	private BigDecimal fStatus;

	@Temporal(TemporalType.DATE)
	@Column(name="F_UPDATE_DATE")
	private Date fUpdateDate;

	@Column(name="F_WORK_ADDRESS")
	private String fWorkAddress;

	@Column(name="F_WORK_NO")
	private String fWorkNo;

	@Column(name="F_WORK_PWD")
	private String fWorkPwd;

	@Column(name="F_WORK_TELEPHONE")
	private String fWorkTelephone;


	//bi-directional many-to-one association to OmEmployeeRoleRelationT

	public OmEmployeeT() {
	}

	public String getFEmployeeId() {
		return this.fEmployeeId;
	}

	public void setFEmployeeId(String fEmployeeId) {
		this.fEmployeeId = fEmployeeId;
	}

	public BigDecimal getFAdminType() {
		return this.fAdminType;
	}

	public void setFAdminType(BigDecimal fAdminType) {
		this.fAdminType = fAdminType;
	}

	public String getFAreaId() {
		return this.fAreaId;
	}

	public void setFAreaId(String fAreaId) {
		this.fAreaId = fAreaId;
	}

	public Date getFBirthday() {
		return this.fBirthday;
	}

	public void setFBirthday(Date fBirthday) {
		this.fBirthday = fBirthday;
	}

	public BigDecimal getFBusDutyId() {
		return this.fBusDutyId;
	}

	public void setFBusDutyId(BigDecimal fBusDutyId) {
		this.fBusDutyId = fBusDutyId;
	}

	public String getFCityCode() {
		return this.fCityCode;
	}

	public void setFCityCode(String fCityCode) {
		this.fCityCode = fCityCode;
	}

	public Date getFContractDate() {
		return this.fContractDate;
	}

	public void setFContractDate(Date fContractDate) {
		this.fContractDate = fContractDate;
	}

	public String getFDealerId() {
		return this.fDealerId;
	}

	public void setFDealerId(String fDealerId) {
		this.fDealerId = fDealerId;
	}

	public BigDecimal getFDutyId() {
		return this.fDutyId;
	}

	public void setFDutyId(BigDecimal fDutyId) {
		this.fDutyId = fDutyId;
	}

	public BigDecimal getFEducateLevel() {
		return this.fEducateLevel;
	}

	public void setFEducateLevel(BigDecimal fEducateLevel) {
		this.fEducateLevel = fEducateLevel;
	}

	public String getFEmail() {
		return this.fEmail;
	}

	public void setFEmail(String fEmail) {
		this.fEmail = fEmail;
	}

	public String getFEmail2() {
		return this.fEmail2;
	}

	public void setFEmail2(String fEmail2) {
		this.fEmail2 = fEmail2;
	}

	public String getFEmployeeName() {
		return this.fEmployeeName;
	}

	public void setFEmployeeName(String fEmployeeName) {
		this.fEmployeeName = fEmployeeName;
	}

	public BigDecimal getFEmployeeType() {
		return this.fEmployeeType;
	}

	public void setFEmployeeType(BigDecimal fEmployeeType) {
		this.fEmployeeType = fEmployeeType;
	}

	public String getFFax() {
		return this.fFax;
	}

	public void setFFax(String fFax) {
		this.fFax = fFax;
	}

	public BigDecimal getFGender() {
		return this.fGender;
	}

	public void setFGender(BigDecimal fGender) {
		this.fGender = fGender;
	}

	public Date getFHiredDate() {
		return this.fHiredDate;
	}

	public void setFHiredDate(Date fHiredDate) {
		this.fHiredDate = fHiredDate;
	}

	public String getFHomeAddress() {
		return this.fHomeAddress;
	}

	public void setFHomeAddress(String fHomeAddress) {
		this.fHomeAddress = fHomeAddress;
	}

	public String getFHoneTelephone() {
		return this.fHoneTelephone;
	}

	public void setFHoneTelephone(String fHoneTelephone) {
		this.fHoneTelephone = fHoneTelephone;
	}

	public Date getFInactiveDate() {
		return this.fInactiveDate;
	}

	public void setFInactiveDate(Date fInactiveDate) {
		this.fInactiveDate = fInactiveDate;
	}

	public Date getFInactivePwdDate() {
		return this.fInactivePwdDate;
	}

	public void setFInactivePwdDate(Date fInactivePwdDate) {
		this.fInactivePwdDate = fInactivePwdDate;
	}

	public BigDecimal getFIncome() {
		return this.fIncome;
	}

	public void setFIncome(BigDecimal fIncome) {
		this.fIncome = fIncome;
	}

	public BigDecimal getFInnerEmployee() {
		return this.fInnerEmployee;
	}

	public void setFInnerEmployee(BigDecimal fInnerEmployee) {
		this.fInnerEmployee = fInnerEmployee;
	}

	public String getFLoginIp() {
		return this.fLoginIp;
	}

	public void setFLoginIp(String fLoginIp) {
		this.fLoginIp = fLoginIp;
	}

	public String getFLoginIp2() {
		return this.fLoginIp2;
	}

	public void setFLoginIp2(String fLoginIp2) {
		this.fLoginIp2 = fLoginIp2;
	}

	public String getFMac() {
		return this.fMac;
	}

	public void setFMac(String fMac) {
		this.fMac = fMac;
	}

	public String getFMac2() {
		return this.fMac2;
	}

	public void setFMac2(String fMac2) {
		this.fMac2 = fMac2;
	}

	public BigDecimal getFMarriageStatus() {
		return this.fMarriageStatus;
	}

	public void setFMarriageStatus(BigDecimal fMarriageStatus) {
		this.fMarriageStatus = fMarriageStatus;
	}

	public String getFMobile() {
		return this.fMobile;
	}

	public void setFMobile(String fMobile) {
		this.fMobile = fMobile;
	}

	public BigDecimal getFOrder() {
		return this.fOrder;
	}

	public void setFOrder(BigDecimal fOrder) {
		this.fOrder = fOrder;
	}

	public String getFOrganId() {
		return this.fOrganId;
	}

	public void setFOrganId(String fOrganId) {
		this.fOrganId = fOrganId;
	}

	public String getFOwner() {
		return this.fOwner;
	}

	public void setFOwner(String fOwner) {
		this.fOwner = fOwner;
	}

	public String getFParentEmployeeId() {
		return this.fParentEmployeeId;
	}

	public void setFParentEmployeeId(String fParentEmployeeId) {
		this.fParentEmployeeId = fParentEmployeeId;
	}

	public BigDecimal getFPersonLevel() {
		return this.fPersonLevel;
	}

	public void setFPersonLevel(BigDecimal fPersonLevel) {
		this.fPersonLevel = fPersonLevel;
	}

	public Date getFPwdUpdate() {
		return this.fPwdUpdate;
	}

	public void setFPwdUpdate(Date fPwdUpdate) {
		this.fPwdUpdate = fPwdUpdate;
	}

	public Date getFResignedDate() {
		return this.fResignedDate;
	}

	public void setFResignedDate(Date fResignedDate) {
		this.fResignedDate = fResignedDate;
	}

	public BigDecimal getFStatus() {
		return this.fStatus;
	}

	public void setFStatus(BigDecimal fStatus) {
		this.fStatus = fStatus;
	}

	public Date getFUpdateDate() {
		return this.fUpdateDate;
	}

	public void setFUpdateDate(Date fUpdateDate) {
		this.fUpdateDate = fUpdateDate;
	}

	public String getFWorkAddress() {
		return this.fWorkAddress;
	}

	public void setFWorkAddress(String fWorkAddress) {
		this.fWorkAddress = fWorkAddress;
	}

	public String getFWorkNo() {
		return this.fWorkNo;
	}

	public void setFWorkNo(String fWorkNo) {
		this.fWorkNo = fWorkNo;
	}

	public String getFWorkPwd() {
		return this.fWorkPwd;
	}

	public void setFWorkPwd(String fWorkPwd) {
		this.fWorkPwd = fWorkPwd;
	}

	public String getFWorkTelephone() {
		return this.fWorkTelephone;
	}

	public void setFWorkTelephone(String fWorkTelephone) {
		this.fWorkTelephone = fWorkTelephone;
	}







}