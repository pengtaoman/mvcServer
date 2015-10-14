//package com.neusoft.tdframework.entity;
//
//import java.io.Serializable;
//import javax.persistence.*;
//
///**
// * The primary key class for the om_employee_duty_relation_t database table.
// * 
// */
//@Embeddable
//public class OmEmployeeDutyRelationTPK implements Serializable {
//	//default serial version id, required for serializable classes.
//	private static final long serialVersionUID = 1L;
//
//	@Column(name="F_DUTY_ID", insertable=false, updatable=false)
//	private long fDutyId;
//
//	@Column(name="F_EMPLOYEE_ID", insertable=false, updatable=false)
//	private String fEmployeeId;
//
//	@Column(name="F_ORGAN_ID" , insertable=false, updatable=false)
//	private String fOrganId;
//
//	public OmEmployeeDutyRelationTPK() {
//	}
//	public long getFDutyId() {
//		return this.fDutyId;
//	}
//	public void setFDutyId(long fDutyId) {
//		this.fDutyId = fDutyId;
//	}
//	public String getFEmployeeId() {
//		return this.fEmployeeId;
//	}
//	public void setFEmployeeId(String fEmployeeId) {
//		this.fEmployeeId = fEmployeeId;
//	}
//	public String getFOrganId() {
//		return this.fOrganId;
//	}
//	public void setFOrganId(String fOrganId) {
//		this.fOrganId = fOrganId;
//	}
//
//	public boolean equals(Object other) {
//		if (this == other) {
//			return true;
//		}
//		if (!(other instanceof OmEmployeeDutyRelationTPK)) {
//			return false;
//		}
//		OmEmployeeDutyRelationTPK castOther = (OmEmployeeDutyRelationTPK)other;
//		return 
//			(this.fDutyId == castOther.fDutyId)
//			&& this.fEmployeeId.equals(castOther.fEmployeeId)
//			&& this.fOrganId.equals(castOther.fOrganId);
//	}
//
//	public int hashCode() {
//		final int prime = 31;
//		int hash = 17;
//		hash = hash * prime + ((int) (this.fDutyId ^ (this.fDutyId >>> 32)));
//		hash = hash * prime + this.fEmployeeId.hashCode();
//		hash = hash * prime + this.fOrganId.hashCode();
//		
//		return hash;
//	}
//}