package com.neusoft.tdframework.entity;

import java.io.Serializable;

import javax.persistence.*;

import org.hibernate.annotations.GenericGenerator;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;


/**
 * The persistent class for the om_menu_t database table.
 * 
 */
@Entity
@Table(name="om_menu_t")
@NamedQuery(name="OmMenuT.findAll", query="SELECT o FROM OmMenuT o")
public class OmMenuT implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid")
	@Column(name="F_MENU_ID")
	private String fMenuId;

	@Column(name="F_CONTAINER")
	private BigDecimal fContainer;

	@Temporal(TemporalType.DATE)
	@Column(name="F_DISABLED_DATE")
	private Date fDisabledDate;

	@Column(name="F_IF_MY_WORK")
	private BigDecimal fIfMyWork;

	@Column(name="F_INUSE")
	private BigDecimal fInuse;

	@Column(name="F_LAYER")
	private BigDecimal fLayer;

	@Column(name="F_LOG")
	private BigDecimal fLog;

	@Column(name="F_MENU_DESC")
	private String fMenuDesc;

	@Column(name="F_MENU_NAME")
	private String fMenuName;

	@Column(name="F_MENU_TYPE")
	private BigDecimal fMenuType;

	@Column(name="F_MODULE_ID")
	private String fModuleId;

	@Column(name="F_OPEN_METHOD")
	private BigDecimal fOpenMethod;

	@Column(name="F_ORDER")
	private BigDecimal fOrder;

	@Column(name="F_PAGE_KIND")
	private BigDecimal fPageKind;

	@Column(name="F_PAGE_LINK")
	private String fPageLink;

	@Column(name="F_PARENT_MENU_ID")
	private String fParentMenuId;

	@Column(name="F_PORTAL_WIN_ID")
	private BigDecimal fPortalWinId;


	//bi-directional many-to-one association to OmSystemT
	@ManyToOne
	@JoinColumn(name="F_SYSTEM_ID")
	private OmSystemT omSystemT;

	public OmMenuT() {
	}

	public String getFMenuId() {
		return this.fMenuId;
	}

	public void setFMenuId(String fMenuId) {
		this.fMenuId = fMenuId;
	}

	public BigDecimal getFContainer() {
		return this.fContainer;
	}

	public void setFContainer(BigDecimal fContainer) {
		this.fContainer = fContainer;
	}

	public Date getFDisabledDate() {
		return this.fDisabledDate;
	}

	public void setFDisabledDate(Date fDisabledDate) {
		this.fDisabledDate = fDisabledDate;
	}

	public BigDecimal getFIfMyWork() {
		return this.fIfMyWork;
	}

	public void setFIfMyWork(BigDecimal fIfMyWork) {
		this.fIfMyWork = fIfMyWork;
	}

	public BigDecimal getFInuse() {
		return this.fInuse;
	}

	public void setFInuse(BigDecimal fInuse) {
		this.fInuse = fInuse;
	}

	public BigDecimal getFLayer() {
		return this.fLayer;
	}

	public void setFLayer(BigDecimal fLayer) {
		this.fLayer = fLayer;
	}

	public BigDecimal getFLog() {
		return this.fLog;
	}

	public void setFLog(BigDecimal fLog) {
		this.fLog = fLog;
	}

	public String getFMenuDesc() {
		return this.fMenuDesc;
	}

	public void setFMenuDesc(String fMenuDesc) {
		this.fMenuDesc = fMenuDesc;
	}

	public String getFMenuName() {
		return this.fMenuName;
	}

	public void setFMenuName(String fMenuName) {
		this.fMenuName = fMenuName;
	}

	public BigDecimal getFMenuType() {
		return this.fMenuType;
	}

	public void setFMenuType(BigDecimal fMenuType) {
		this.fMenuType = fMenuType;
	}

	public String getFModuleId() {
		return this.fModuleId;
	}

	public void setFModuleId(String fModuleId) {
		this.fModuleId = fModuleId;
	}

	public BigDecimal getFOpenMethod() {
		return this.fOpenMethod;
	}

	public void setFOpenMethod(BigDecimal fOpenMethod) {
		this.fOpenMethod = fOpenMethod;
	}

	public BigDecimal getFOrder() {
		return this.fOrder;
	}

	public void setFOrder(BigDecimal fOrder) {
		this.fOrder = fOrder;
	}

	public BigDecimal getFPageKind() {
		return this.fPageKind;
	}

	public void setFPageKind(BigDecimal fPageKind) {
		this.fPageKind = fPageKind;
	}

	public String getFPageLink() {
		return this.fPageLink;
	}

	public void setFPageLink(String fPageLink) {
		this.fPageLink = fPageLink;
	}

	public String getFParentMenuId() {
		return this.fParentMenuId;
	}

	public void setFParentMenuId(String fParentMenuId) {
		this.fParentMenuId = fParentMenuId;
	}

	public BigDecimal getFPortalWinId() {
		return this.fPortalWinId;
	}

	public void setFPortalWinId(BigDecimal fPortalWinId) {
		this.fPortalWinId = fPortalWinId;
	}


	public OmSystemT getOmSystemT() {
		return this.omSystemT;
	}

	public void setOmSystemT(OmSystemT omSystemT) {
		this.omSystemT = omSystemT;
	}

}