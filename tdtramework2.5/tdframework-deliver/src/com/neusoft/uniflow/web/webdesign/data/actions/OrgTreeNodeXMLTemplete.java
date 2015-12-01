package com.neusoft.uniflow.web.webdesign.data.actions;

public class OrgTreeNodeXMLTemplete {
	private String nodeType;
	private String label;
	private String id;
	private String type;
	private String branch;
	
	private String getItemPropertyString(String name,String value)
	{
		return " " + name + "=\"" + value + "\"";
	}
	
	public String getNodeType() {
		return nodeType;
	}
	public void setNodeType(String nodeType) {
		this.nodeType = nodeType;
	}
	public String getLabel() {
		return label;
	}
	public void setLabel(String label) {
		this.label = label;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	
	public String getBranch() {
		return branch;
	}

	public void setBranch(String branch) {
		this.branch = branch;
	}

	public String toXML()
	{
		StringBuffer sb = new StringBuffer();
		sb.append("<node");
		if(this.id!=null&&this.id.length()>0)
		{
			sb.append(getItemPropertyString("id",id));
		}
		if(this.label!=null&&this.label.length()>0)
		{
			sb.append(getItemPropertyString("label",label));
		}
		if(this.nodeType!=null&&this.nodeType.length()>0)
		{
			sb.append(getItemPropertyString("nodetype",nodeType));
		}
		if(this.type!=null&&this.type.length()>0)
		{
			sb.append(getItemPropertyString("type",type));
		}
		if(this.branch!=null&&this.branch.length()>0)
		{
			sb.append(getItemPropertyString("isBranch",branch));
		}
		sb.append(">");
		sb.append("</node>");
		return sb.toString();
	}

}
