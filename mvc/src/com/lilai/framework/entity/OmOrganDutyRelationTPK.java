package com.lilai.framework.entity;

import java.io.Serializable;
import javax.persistence.*;

/**
 * The primary key class for the om_organ_duty_relation_t database table.
 * 
 */
@Embeddable
public class OmOrganDutyRelationTPK implements Serializable {
	//default serial version id, required for serializable classes.
	private static final long serialVersionUID = 1L;

	@Column(name="F_ORGAN_ID", insertable=false, updatable=false)
	private String fOrganId;

	@Column(name="F_DUTY_ID", insertable=false, updatable=false)
	private long fDutyId;

	public OmOrganDutyRelationTPK() {
	}
	public String getFOrganId() {
		return this.fOrganId;
	}
	public void setFOrganId(String fOrganId) {
		this.fOrganId = fOrganId;
	}
	public long getFDutyId() {
		return this.fDutyId;
	}
	public void setFDutyId(long fDutyId) {
		this.fDutyId = fDutyId;
	}

	public boolean equals(Object other) {
		if (this == other) {
			return true;
		}
		if (!(other instanceof OmOrganDutyRelationTPK)) {
			return false;
		}
		OmOrganDutyRelationTPK castOther = (OmOrganDutyRelationTPK)other;
		return 
			this.fOrganId.equals(castOther.fOrganId)
			&& (this.fDutyId == castOther.fDutyId);
	}

	public int hashCode() {
		final int prime = 31;
		int hash = 17;
		hash = hash * prime + this.fOrganId.hashCode();
		hash = hash * prime + ((int) (this.fDutyId ^ (this.fDutyId >>> 32)));
		
		return hash;
	}
}