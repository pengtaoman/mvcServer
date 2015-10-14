package com.neusoft.business.entity;

import java.io.Serializable;
import javax.persistence.*;
import java.math.BigInteger;


/**
 * The persistent class for the acl_vps_agent_resource database table.
 * 
 */
@Entity
@Table(name="acl_vps_agent_resource")
@NamedQuery(name="AclVpsAgentResource.findAll", query="SELECT a FROM AclVpsAgentResource a")
public class AclVpsAgentResource implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private String fqn;

	@Column(name="class_name")
	private String className;

	@Column(name="connection_id")
	private BigInteger connectionId;

	private BigInteger ctime;

	private String description;

	@Lob
	@Column(name="json_string")
	private String jsonString;

	private BigInteger mtime;

	private String name;

	private String uuid;

	@Column(name="virtual_type")
	private String virtualType;

	@Column(name="virtual_type_use_as")
	private String virtualTypeUseAs;

	private byte withDetail;

	//uni-directional many-to-one association to AclVpsAgentResType
	@ManyToOne
	@JoinColumn(name="type_id")
	private AclVpsAgentResType aclVpsAgentResType;

	public AclVpsAgentResource() {
	}

	public String getFqn() {
		return this.fqn;
	}

	public void setFqn(String fqn) {
		this.fqn = fqn;
	}

	public String getClassName() {
		return this.className;
	}

	public void setClassName(String className) {
		this.className = className;
	}

	public BigInteger getConnectionId() {
		return this.connectionId;
	}

	public void setConnectionId(BigInteger connectionId) {
		this.connectionId = connectionId;
	}

	public BigInteger getCtime() {
		return this.ctime;
	}

	public void setCtime(BigInteger ctime) {
		this.ctime = ctime;
	}

	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getJsonString() {
		return this.jsonString;
	}

	public void setJsonString(String jsonString) {
		this.jsonString = jsonString;
	}

	public BigInteger getMtime() {
		return this.mtime;
	}

	public void setMtime(BigInteger mtime) {
		this.mtime = mtime;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUuid() {
		return this.uuid;
	}

	public void setUuid(String uuid) {
		this.uuid = uuid;
	}

	public String getVirtualType() {
		return this.virtualType;
	}

	public void setVirtualType(String virtualType) {
		this.virtualType = virtualType;
	}

	public String getVirtualTypeUseAs() {
		return this.virtualTypeUseAs;
	}

	public void setVirtualTypeUseAs(String virtualTypeUseAs) {
		this.virtualTypeUseAs = virtualTypeUseAs;
	}

	public byte getWithDetail() {
		return this.withDetail;
	}

	public void setWithDetail(byte withDetail) {
		this.withDetail = withDetail;
	}

	public AclVpsAgentResType getAclVpsAgentResType() {
		return this.aclVpsAgentResType;
	}

	public void setAclVpsAgentResType(AclVpsAgentResType aclVpsAgentResType) {
		this.aclVpsAgentResType = aclVpsAgentResType;
	}

}