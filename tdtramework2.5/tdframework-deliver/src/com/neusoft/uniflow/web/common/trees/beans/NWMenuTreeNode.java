package com.neusoft.uniflow.web.common.trees.beans;

import java.util.ArrayList;
import java.util.List;

public class NWMenuTreeNode {
	
	private String id;
	
	private String enable;
	
	private String name;
	
	private String action;

	private List leaves;
	
	private int level;
	
	private String instruction;
	
	private String icon;
	
	private String picBase;
	
	private String titlePic;

	public NWMenuTreeNode()
	{
		leaves = new ArrayList(15);
		this.id = "";
		this.name = "";
		this.action = "";
		this.enable = "true";
		this.level = 0;
		this.instruction = "";
		this.icon = "";
	}
	
	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
	}

	public String getEnable() {
		return enable;
	}

	public void setEnable(String enable) {
		this.enable = enable;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAction() {
		return action;
	}

	public void setAction(String action) {
		this.action = action;
	}
	
	public List getLeaves() {
		return leaves;
	}

	public void setLeaves(List leaves) {
		this.leaves = leaves;
	}

	public String getInstruction() {
		return instruction;
	}

	public void setInstruction(String instruction) {
		this.instruction = instruction;
	}

	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}
	
	public void addLeaf(NWMenuTreeNode leaf)
	{
		this.leaves.add(leaf);
	}
	
	public boolean isLeaf()
	{
		if(this.leaves.size()==0) return true;
		else return false;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
	
	public String getPicBase() {
		return picBase;
	}

	public void setPicBase(String picBase) {
		this.picBase = picBase;
	}

	public String getTitlePic() {
		return titlePic;
	}

	public void setTitlePic(String titlePic) {
		this.titlePic = titlePic;
	}
}
