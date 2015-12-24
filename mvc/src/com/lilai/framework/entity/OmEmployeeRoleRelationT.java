package com.lilai.framework.entity;

import java.io.Serializable;
import javax.persistence.*;
import java.math.BigDecimal;


/**
 * The persistent class for the om_employee_role_relation_t database table.
 * 
 */
@Entity
@Table(name="om_employee_role_relation_t")
@NamedQuery(name="OmEmployeeRoleRelationT.findAll", query="SELECT o FROM OmEmployeeRoleRelationT o")
public class OmEmployeeRoleRelationT implements Serializable {
	private static final long serialVersionUID = 1L;

	@EmbeddedId
	private OmEmployeeRoleRelationTPK id;

	@Column(name="F_ADMIN_FLAG")
	private BigDecimal fAdminFlag;

	@Column(name="F_USABLE_FLAG")
	private BigDecimal fUsableFlag;

	//bi-directional many-to-one association to OmRoleT
	@ManyToOne
	@JoinColumn(name="F_ROLE_ID" , insertable=false, updatable=false)
	private OmRoleT omRoleT;

	//bi-directional many-to-one association to OmEmployeeT
	@ManyToOne
	@JoinColumn(name="F_EMPLOYEE_ID" , insertable=false, updatable=false)
	private OmEmployeeT omEmployeeT;

	public OmEmployeeRoleRelationT() {
	}

	public OmEmployeeRoleRelationTPK getId() {
		return this.id;
	}

	public void setId(OmEmployeeRoleRelationTPK id) {
		this.id = id;
	}

	public BigDecimal getFAdminFlag() {
		return this.fAdminFlag;
	}

	public void setFAdminFlag(BigDecimal fAdminFlag) {
		this.fAdminFlag = fAdminFlag;
	}

	public BigDecimal getFUsableFlag() {
		return this.fUsableFlag;
	}

	public void setFUsableFlag(BigDecimal fUsableFlag) {
		this.fUsableFlag = fUsableFlag;
	}

	public OmRoleT getOmRoleT() {
		return this.omRoleT;
	}

	public void setOmRoleT(OmRoleT omRoleT) {
		this.omRoleT = omRoleT;
	}

	public OmEmployeeT getOmEmployeeT() {
		return this.omEmployeeT;
	}

	public void setOmEmployeeT(OmEmployeeT omEmployeeT) {
		this.omEmployeeT = omEmployeeT;
	}

}