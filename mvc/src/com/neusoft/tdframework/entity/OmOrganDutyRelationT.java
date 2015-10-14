package com.neusoft.tdframework.entity;

import java.io.Serializable;
import javax.persistence.*;
import java.math.BigDecimal;


/**
 * The persistent class for the om_organ_duty_relation_t database table.
 * 
 */
@Entity
@Table(name="om_organ_duty_relation_t")
@NamedQuery(name="OmOrganDutyRelationT.findAll", query="SELECT o FROM OmOrganDutyRelationT o")
public class OmOrganDutyRelationT implements Serializable {
	private static final long serialVersionUID = 1L;

	@EmbeddedId
	private OmOrganDutyRelationTPK id;

	@Column(name="F_PARENT_DUTY_ID")
	private BigDecimal fParentDutyId;

	//bi-directional many-to-one association to OmDutyT
	@ManyToOne
	@JoinColumn(name="F_DUTY_ID" , insertable=false, updatable=false)
	private OmDutyT omDutyT;

	//bi-directional many-to-one association to OmOrganT
	@ManyToOne
	@JoinColumn(name="F_ORGAN_ID" , insertable=false, updatable=false)
	private OmOrganT omOrganT;

	public OmOrganDutyRelationT() {
	}

	public OmOrganDutyRelationTPK getId() {
		return this.id;
	}

	public void setId(OmOrganDutyRelationTPK id) {
		this.id = id;
	}

	public BigDecimal getFParentDutyId() {
		return this.fParentDutyId;
	}

	public void setFParentDutyId(BigDecimal fParentDutyId) {
		this.fParentDutyId = fParentDutyId;
	}

	public OmDutyT getOmDutyT() {
		return this.omDutyT;
	}

	public void setOmDutyT(OmDutyT omDutyT) {
		this.omDutyT = omDutyT;
	}

	public OmOrganT getOmOrganT() {
		return this.omOrganT;
	}

	public void setOmOrganT(OmOrganT omOrganT) {
		this.omOrganT = omOrganT;
	}

}