//package com.neusoft.tdframework.entity;
//
//import java.io.Serializable;
//import javax.persistence.*;
//import java.math.BigDecimal;
//
//
///**
// * The persistent class for the om_employee_duty_relation_t database table.
// * 
// */
//@Entity
//@Table(name="om_employee_duty_relation_t")
//@NamedQuery(name="OmEmployeeDutyRelationT.findAll", query="SELECT o FROM OmEmployeeDutyRelationT o")
//public class OmEmployeeDutyRelationT implements Serializable {
//	private static final long serialVersionUID = 1L;
//
//	@EmbeddedId
//	private OmEmployeeDutyRelationTPK id;
//
//	@Column(name="F_KIND")
//	private BigDecimal fKind;
//
//	//bi-directional many-to-one association to OmEmployeeT
//	@ManyToOne
//	@JoinColumn(name="F_EMPLOYEE_ID")
//	private OmEmployeeT omEmployeeT;
//
//	//bi-directional many-to-one association to OmDutyT
//	@ManyToOne
//	@JoinColumn(name="F_DUTY_ID")
//	private OmDutyT omDutyT;
//
//	public OmEmployeeDutyRelationT() {
//	}
//
//	public OmEmployeeDutyRelationTPK getId() {
//		return this.id;
//	}
//
//	public void setId(OmEmployeeDutyRelationTPK id) {
//		this.id = id;
//	}
//
//	public BigDecimal getFKind() {
//		return this.fKind;
//	}
//
//	public void setFKind(BigDecimal fKind) {
//		this.fKind = fKind;
//	}
//
//	public OmEmployeeT getOmEmployeeT() {
//		return this.omEmployeeT;
//	}
//
//	public void setOmEmployeeT(OmEmployeeT omEmployeeT) {
//		this.omEmployeeT = omEmployeeT;
//	}
//
//	public OmDutyT getOmDutyT() {
//		return this.omDutyT;
//	}
//
//	public void setOmDutyT(OmDutyT omDutyT) {
//		this.omDutyT = omDutyT;
//	}
//
//}