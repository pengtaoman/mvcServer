package com.neusoft.tdframework.entity;

import java.io.Serializable;
import javax.persistence.*;

/**
 * The primary key class for the om_employee_role_relation_t database table.
 * 
 */
@Embeddable
public class OmEmployeeRoleRelationTPK implements Serializable {
	//default serial version id, required for serializable classes.
	private static final long serialVersionUID = 1L;

	@Column(name="F_EMPLOYEE_ID", insertable=false, updatable=false)
	private String fEmployeeId;

	@Column(name="F_ROLE_ID", insertable=false, updatable=false)
	private long fRoleId;

	public OmEmployeeRoleRelationTPK() {
	}
	public String getFEmployeeId() {
		return this.fEmployeeId;
	}
	public void setFEmployeeId(String fEmployeeId) {
		this.fEmployeeId = fEmployeeId;
	}
	public long getFRoleId() {
		return this.fRoleId;
	}
	public void setFRoleId(long fRoleId) {
		this.fRoleId = fRoleId;
	}

	public boolean equals(Object other) {
		if (this == other) {
			return true;
		}
		if (!(other instanceof OmEmployeeRoleRelationTPK)) {
			return false;
		}
		OmEmployeeRoleRelationTPK castOther = (OmEmployeeRoleRelationTPK)other;
		return 
			this.fEmployeeId.equals(castOther.fEmployeeId)
			&& (this.fRoleId == castOther.fRoleId);
	}

	public int hashCode() {
		final int prime = 31;
		int hash = 17;
		hash = hash * prime + this.fEmployeeId.hashCode();
		hash = hash * prime + ((int) (this.fRoleId ^ (this.fRoleId >>> 32)));
		
		return hash;
	}
}