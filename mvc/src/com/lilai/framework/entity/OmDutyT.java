package com.lilai.framework.entity;

import java.io.Serializable;
import javax.persistence.*;
import java.math.BigDecimal;
import java.util.List;


/**
 * The persistent class for the om_duty_t database table.
 * 
 */
@Entity
@Table(name="om_duty_t")
@NamedQuery(name="OmDutyT.findAll", query="SELECT o FROM OmDutyT o")
public class OmDutyT implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="F_DUTY_ID")
	private long fDutyId;

	@Column(name="F_DUTY_DESC")
	private String fDutyDesc;

	@Column(name="F_DUTY_NAME")
	private String fDutyName;

	@Column(name="F_DUTY_STATUS")
	private BigDecimal fDutyStatus;

	@Column(name="F_INNER_DUTY")
	private BigDecimal fInnerDuty;

	@Column(name="F_ORGAN_KIND")
	private BigDecimal fOrganKind;

	@Column(name="F_PARENT_DUTY_ID")
	private BigDecimal fParentDutyId;



	public OmDutyT() {
	}

	public long getFDutyId() {
		return this.fDutyId;
	}

	public void setFDutyId(long fDutyId) {
		this.fDutyId = fDutyId;
	}

	public String getFDutyDesc() {
		return this.fDutyDesc;
	}

	public void setFDutyDesc(String fDutyDesc) {
		this.fDutyDesc = fDutyDesc;
	}

	public String getFDutyName() {
		return this.fDutyName;
	}

	public void setFDutyName(String fDutyName) {
		this.fDutyName = fDutyName;
	}

	public BigDecimal getFDutyStatus() {
		return this.fDutyStatus;
	}

	public void setFDutyStatus(BigDecimal fDutyStatus) {
		this.fDutyStatus = fDutyStatus;
	}

	public BigDecimal getFInnerDuty() {
		return this.fInnerDuty;
	}

	public void setFInnerDuty(BigDecimal fInnerDuty) {
		this.fInnerDuty = fInnerDuty;
	}

	public BigDecimal getFOrganKind() {
		return this.fOrganKind;
	}

	public void setFOrganKind(BigDecimal fOrganKind) {
		this.fOrganKind = fOrganKind;
	}

	public BigDecimal getFParentDutyId() {
		return this.fParentDutyId;
	}

	public void setFParentDutyId(BigDecimal fParentDutyId) {
		this.fParentDutyId = fParentDutyId;
	}


}