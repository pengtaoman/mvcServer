package com.lilai.business.entity;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the acl_vps_agent_res_type database table.
 * 
 */
@Entity
@Table(name="acl_vps_agent_res_type")
@NamedQuery(name="AclVpsAgentResType.findAll", query="SELECT a FROM AclVpsAgentResType a")
public class AclVpsAgentResType implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private String id;

	private String alias;

	private String category;

	private String name;

	@Column(name="parent_name")
	private String parentName;

	@Column(name="plugin_name")
	private String pluginName;

	public AclVpsAgentResType() {
	}

	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getAlias() {
		return this.alias;
	}

	public void setAlias(String alias) {
		this.alias = alias;
	}

	public String getCategory() {
		return this.category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getParentName() {
		return this.parentName;
	}

	public void setParentName(String parentName) {
		this.parentName = parentName;
	}

	public String getPluginName() {
		return this.pluginName;
	}

	public void setPluginName(String pluginName) {
		this.pluginName = pluginName;
	}

}