package com.neusoft.tdframework.entity;

import java.io.Serializable;
import javax.persistence.*;
import java.math.BigDecimal;
import java.util.List;


/**
 * The persistent class for the om_role_t database table.
 * 
 */
@Entity
@Table(name="om_role_t")
@NamedQuery(name="OmRoleT.findAll", query="SELECT o FROM OmRoleT o")
public class OmRoleT implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="F_ROLE_ID")
	private long fRoleId;

	@Column(name="F_CREATE_AREA_ID")
	private String fCreateAreaId;

	@Column(name="F_CREATER")
	private String fCreater;

	@Column(name="F_DESC")
	private String fDesc;

	@Column(name="F_DUTY_ID")
	private BigDecimal fDutyId;

	@Column(name="F_IF_DEFAULT")
	private BigDecimal fIfDefault;

	@Column(name="F_ROLE_NAME")
	private String fRoleName;

	@Column(name="F_ROLE_TYPE")
	private BigDecimal fRoleType;

	@Column(name="F_STATUS")
	private BigDecimal fStatus;


	public OmRoleT() {
	}

	public long getFRoleId() {
		return this.fRoleId;
	}

	public void setFRoleId(long fRoleId) {
		this.fRoleId = fRoleId;
	}

	public String getFCreateAreaId() {
		return this.fCreateAreaId;
	}

	public void setFCreateAreaId(String fCreateAreaId) {
		this.fCreateAreaId = fCreateAreaId;
	}

	public String getFCreater() {
		return this.fCreater;
	}

	public void setFCreater(String fCreater) {
		this.fCreater = fCreater;
	}

	public String getFDesc() {
		return this.fDesc;
	}

	public void setFDesc(String fDesc) {
		this.fDesc = fDesc;
	}

	public BigDecimal getFDutyId() {
		return this.fDutyId;
	}

	public void setFDutyId(BigDecimal fDutyId) {
		this.fDutyId = fDutyId;
	}

	public BigDecimal getFIfDefault() {
		return this.fIfDefault;
	}

	public void setFIfDefault(BigDecimal fIfDefault) {
		this.fIfDefault = fIfDefault;
	}

	public String getFRoleName() {
		return this.fRoleName;
	}

	public void setFRoleName(String fRoleName) {
		this.fRoleName = fRoleName;
	}

	public BigDecimal getFRoleType() {
		return this.fRoleType;
	}

	public void setFRoleType(BigDecimal fRoleType) {
		this.fRoleType = fRoleType;
	}

	public BigDecimal getFStatus() {
		return this.fStatus;
	}

	public void setFStatus(BigDecimal fStatus) {
		this.fStatus = fStatus;
	}

}