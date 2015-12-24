package com.lilai.framework.entity;

import java.io.Serializable;
import javax.persistence.*;
import java.math.BigDecimal;


/**
 * The persistent class for the om_func_role_t database table.
 * 
 */
@Entity
@Table(name="om_func_role_t")
@NamedQuery(name="OmFuncRoleT.findAll", query="SELECT o FROM OmFuncRoleT o")
public class OmFuncRoleT implements Serializable {
	private static final long serialVersionUID = 1L;

	@EmbeddedId
	private OmFuncRoleTPK id;

	@Column(name="F_ADMIN_STATUS")
	private BigDecimal fAdminStatus;

	@Column(name="F_EXEC_STATUS")
	private BigDecimal fExecStatus;

	//bi-directional many-to-one association to OmMenuT
	@ManyToOne
	@JoinColumn(name="F_MENU_ID" , insertable=false, updatable=false)
	private OmMenuT omMenuT;

	//bi-directional many-to-one association to OmRoleT
	@ManyToOne
	@JoinColumn(name="F_ROLE_ID" , insertable=false, updatable=false)
	private OmRoleT omRoleT;

	public OmFuncRoleT() {
	}

	public OmFuncRoleTPK getId() {
		return this.id;
	}

	public void setId(OmFuncRoleTPK id) {
		this.id = id;
	}

	public BigDecimal getFAdminStatus() {
		return this.fAdminStatus;
	}

	public void setFAdminStatus(BigDecimal fAdminStatus) {
		this.fAdminStatus = fAdminStatus;
	}

	public BigDecimal getFExecStatus() {
		return this.fExecStatus;
	}

	public void setFExecStatus(BigDecimal fExecStatus) {
		this.fExecStatus = fExecStatus;
	}

	public OmMenuT getOmMenuT() {
		return this.omMenuT;
	}

	public void setOmMenuT(OmMenuT omMenuT) {
		this.omMenuT = omMenuT;
	}

	public OmRoleT getOmRoleT() {
		return this.omRoleT;
	}

	public void setOmRoleT(OmRoleT omRoleT) {
		this.omRoleT = omRoleT;
	}

}