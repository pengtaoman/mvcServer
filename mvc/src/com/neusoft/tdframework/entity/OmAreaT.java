package com.neusoft.tdframework.entity;

import java.io.Serializable;
import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;


/**
 * The persistent class for the om_area_t database table.
 * 
 */
@Entity
@Table(name="om_area_t")
@NamedQuery(name="OmAreaT.findAll", query="SELECT o FROM OmAreaT o")
public class OmAreaT implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="F_AREA_ID")
	private String fAreaId;

	@Temporal(TemporalType.DATE)
	@Column(name="F_ACTIVE_DATE")
	private Date fActiveDate;

	@Column(name="F_AREA_CODE")
	private String fAreaCode;

	@Column(name="F_AREA_LEVEL")
	private BigDecimal fAreaLevel;

	@Column(name="F_AREA_NAME")
	private String fAreaName;

	@Column(name="F_CITY_CODE")
	private String fCityCode;

	@Temporal(TemporalType.DATE)
	@Column(name="F_INACTIVE_DATE")
	private Date fInactiveDate;

	@Column(name="F_POSTAL_CODE")
	private String fPostalCode;

	//bi-directional many-to-one association to OmAreaT
	@ManyToOne
	@JoinColumn(name="F_PARENT_AREA_ID")
	private OmAreaT omAreaT;



	public OmAreaT() {
	}

	public String getFAreaId() {
		return this.fAreaId;
	}

	public void setFAreaId(String fAreaId) {
		this.fAreaId = fAreaId;
	}

	public Date getFActiveDate() {
		return this.fActiveDate;
	}

	public void setFActiveDate(Date fActiveDate) {
		this.fActiveDate = fActiveDate;
	}

	public String getFAreaCode() {
		return this.fAreaCode;
	}

	public void setFAreaCode(String fAreaCode) {
		this.fAreaCode = fAreaCode;
	}

	public BigDecimal getFAreaLevel() {
		return this.fAreaLevel;
	}

	public void setFAreaLevel(BigDecimal fAreaLevel) {
		this.fAreaLevel = fAreaLevel;
	}

	public String getFAreaName() {
		return this.fAreaName;
	}

	public void setFAreaName(String fAreaName) {
		this.fAreaName = fAreaName;
	}

	public String getFCityCode() {
		return this.fCityCode;
	}

	public void setFCityCode(String fCityCode) {
		this.fCityCode = fCityCode;
	}

	public Date getFInactiveDate() {
		return this.fInactiveDate;
	}

	public void setFInactiveDate(Date fInactiveDate) {
		this.fInactiveDate = fInactiveDate;
	}

	public String getFPostalCode() {
		return this.fPostalCode;
	}

	public void setFPostalCode(String fPostalCode) {
		this.fPostalCode = fPostalCode;
	}

	public OmAreaT getOmAreaT() {
		return this.omAreaT;
	}

	public void setOmAreaT(OmAreaT omAreaT) {
		this.omAreaT = omAreaT;
	}









}