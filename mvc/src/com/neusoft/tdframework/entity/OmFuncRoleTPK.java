package com.neusoft.tdframework.entity;

import java.io.Serializable;
import javax.persistence.*;

/**
 * The primary key class for the om_func_role_t database table.
 * 
 */
@Embeddable
public class OmFuncRoleTPK implements Serializable {
	//default serial version id, required for serializable classes.
	private static final long serialVersionUID = 1L;

	@Column(name="F_ROLE_ID", insertable=false, updatable=false)
	private long fRoleId;

	@Column(name="F_MENU_ID", insertable=false, updatable=false)
	private String fMenuId;

	public OmFuncRoleTPK() {
	}
	public long getFRoleId() {
		return this.fRoleId;
	}
	public void setFRoleId(long fRoleId) {
		this.fRoleId = fRoleId;
	}
	public String getFMenuId() {
		return this.fMenuId;
	}
	public void setFMenuId(String fMenuId) {
		this.fMenuId = fMenuId;
	}

	public boolean equals(Object other) {
		if (this == other) {
			return true;
		}
		if (!(other instanceof OmFuncRoleTPK)) {
			return false;
		}
		OmFuncRoleTPK castOther = (OmFuncRoleTPK)other;
		return 
			(this.fRoleId == castOther.fRoleId)
			&& this.fMenuId.equals(castOther.fMenuId);
	}

	public int hashCode() {
		final int prime = 31;
		int hash = 17;
		hash = hash * prime + ((int) (this.fRoleId ^ (this.fRoleId >>> 32)));
		hash = hash * prime + this.fMenuId.hashCode();
		
		return hash;
	}
}