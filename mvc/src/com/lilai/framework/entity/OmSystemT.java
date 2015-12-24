package com.lilai.framework.entity;

import java.io.Serializable;

import javax.persistence.*;

import org.hibernate.annotations.GenericGenerator;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;


/**
 * The persistent class for the om_system_t database table.
 * 
 */
@Entity
@Table(name="om_system_t")
@NamedQuery(name="OmSystemT.findAll", query="SELECT o FROM OmSystemT o")
public class OmSystemT implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid")
	@Column(name="F_SYSTEM_ID")
	private String fSystemId;

	@Column(name="F_DETAIL_DESC")
	private String fDetailDesc;

	@Temporal(TemporalType.DATE)
	@Column(name="F_DISABLED_DATE")
	private Date fDisabledDate;

	@Column(name="F_IF_SHOW_FAVORITE")
	private String fIfShowFavorite;

	@Column(name="F_ORDER")
	private BigDecimal fOrder;

	@Column(name="F_PARENT_SYSTEM_ID")
	private String fParentSystemId;

	@Column(name="F_PORTAL_WIN_ID")
	private BigDecimal fPortalWinId;

	@Column(name="F_SYSTEM_NAME")
	private String fSystemName;

	@Column(name="F_SYSTEM_TYPE")
	private String fSystemType;


	public OmSystemT() {
	}

	public String getFSystemId() {
		return this.fSystemId;
	}

	public void setFSystemId(String fSystemId) {
		this.fSystemId = fSystemId;
	}

	public String getFDetailDesc() {
		return this.fDetailDesc;
	}

	public void setFDetailDesc(String fDetailDesc) {
		this.fDetailDesc = fDetailDesc;
	}

	public Date getFDisabledDate() {
		return this.fDisabledDate;
	}

	public void setFDisabledDate(Date fDisabledDate) {
		this.fDisabledDate = fDisabledDate;
	}

	public String getFIfShowFavorite() {
		return this.fIfShowFavorite;
	}

	public void setFIfShowFavorite(String fIfShowFavorite) {
		this.fIfShowFavorite = fIfShowFavorite;
	}

	public BigDecimal getFOrder() {
		return this.fOrder;
	}

	public void setFOrder(BigDecimal fOrder) {
		this.fOrder = fOrder;
	}

	public String getFParentSystemId() {
		return this.fParentSystemId;
	}

	public void setFParentSystemId(String fParentSystemId) {
		this.fParentSystemId = fParentSystemId;
	}

	public BigDecimal getFPortalWinId() {
		return this.fPortalWinId;
	}

	public void setFPortalWinId(BigDecimal fPortalWinId) {
		this.fPortalWinId = fPortalWinId;
	}

	public String getFSystemName() {
		return this.fSystemName;
	}

	public void setFSystemName(String fSystemName) {
		this.fSystemName = fSystemName;
	}

	public String getFSystemType() {
		return this.fSystemType;
	}

	public void setFSystemType(String fSystemType) {
		this.fSystemType = fSystemType;
	}


}