package com.neusoft.tdframework.entity;

import java.io.Serializable;
import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;


/**
 * The persistent class for the om_organ_t database table.
 * 
 */
@Entity
@Table(name="om_organ_t")
@NamedQuery(name="OmOrganT.findAll", query="SELECT o FROM OmOrganT o")
public class OmOrganT implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="F_ORGAN_ID")
	private String fOrganId;

	@Temporal(TemporalType.DATE)
	@Column(name="F_ACTIVE_DATE")
	private Date fActiveDate;

	@Column(name="F_CITY_CODE")
	private String fCityCode;

	@Column(name="F_DUTY_PARENT")
	private String fDutyParent;

	@Temporal(TemporalType.DATE)
	@Column(name="F_INACTIVE_DATE")
	private Date fInactiveDate;

	@Column(name="F_INNER_DUTY")
	private BigDecimal fInnerDuty;

	@Column(name="F_ORDER")
	private BigDecimal fOrder;

	@Column(name="F_ORGAN_DESC")
	private String fOrganDesc;

	@Column(name="F_ORGAN_KIND")
	private BigDecimal fOrganKind;

	@Column(name="F_ORGAN_NAME")
	private String fOrganName;

	@Column(name="F_ORGAN_STATUS")
	private BigDecimal fOrganStatus;

	@Column(name="F_PARENT_ORGAN_ID")
	private String fParentOrganId;

	@Column(name="F_PRINCIPAL")
	private String fPrincipal;


	//bi-directional many-to-one association to OmAreaT
	@ManyToOne
	@JoinColumn(name="F_AREA_ID")
	private OmAreaT omAreaT;

	public OmOrganT() {
	}

	public String getFOrganId() {
		return this.fOrganId;
	}

	public void setFOrganId(String fOrganId) {
		this.fOrganId = fOrganId;
	}

	public Date getFActiveDate() {
		return this.fActiveDate;
	}

	public void setFActiveDate(Date fActiveDate) {
		this.fActiveDate = fActiveDate;
	}

	public String getFCityCode() {
		return this.fCityCode;
	}

	public void setFCityCode(String fCityCode) {
		this.fCityCode = fCityCode;
	}

	public String getFDutyParent() {
		return this.fDutyParent;
	}

	public void setFDutyParent(String fDutyParent) {
		this.fDutyParent = fDutyParent;
	}

	public Date getFInactiveDate() {
		return this.fInactiveDate;
	}

	public void setFInactiveDate(Date fInactiveDate) {
		this.fInactiveDate = fInactiveDate;
	}

	public BigDecimal getFInnerDuty() {
		return this.fInnerDuty;
	}

	public void setFInnerDuty(BigDecimal fInnerDuty) {
		this.fInnerDuty = fInnerDuty;
	}

	public BigDecimal getFOrder() {
		return this.fOrder;
	}

	public void setFOrder(BigDecimal fOrder) {
		this.fOrder = fOrder;
	}

	public String getFOrganDesc() {
		return this.fOrganDesc;
	}

	public void setFOrganDesc(String fOrganDesc) {
		this.fOrganDesc = fOrganDesc;
	}

	public BigDecimal getFOrganKind() {
		return this.fOrganKind;
	}

	public void setFOrganKind(BigDecimal fOrganKind) {
		this.fOrganKind = fOrganKind;
	}

	public String getFOrganName() {
		return this.fOrganName;
	}

	public void setFOrganName(String fOrganName) {
		this.fOrganName = fOrganName;
	}

	public BigDecimal getFOrganStatus() {
		return this.fOrganStatus;
	}

	public void setFOrganStatus(BigDecimal fOrganStatus) {
		this.fOrganStatus = fOrganStatus;
	}

	public String getFParentOrganId() {
		return this.fParentOrganId;
	}

	public void setFParentOrganId(String fParentOrganId) {
		this.fParentOrganId = fParentOrganId;
	}

	public String getFPrincipal() {
		return this.fPrincipal;
	}

	public void setFPrincipal(String fPrincipal) {
		this.fPrincipal = fPrincipal;
	}



	public OmAreaT getOmAreaT() {
		return this.omAreaT;
	}

	public void setOmAreaT(OmAreaT omAreaT) {
		this.omAreaT = omAreaT;
	}

}