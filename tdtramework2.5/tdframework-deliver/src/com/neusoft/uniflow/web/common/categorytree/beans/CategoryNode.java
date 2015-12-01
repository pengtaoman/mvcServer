package com.neusoft.uniflow.web.common.categorytree.beans;

import java.util.Enumeration;
import java.util.Vector;

import com.neusoft.uniflow.category.ICategory;
import com.neusoft.uniflow.category.IResource;

public class CategoryNode {

	private Vector children = new Vector();

	private String ID;

	private String name;

	private String parentID = "";

	private int depth;

	private boolean expanded = false;

	private boolean clicked = false;

	private int type = 0;//0 表示分类,1表示资源
	
	private CategoryNode parentNode=null;
	
	public CategoryNode(){
		
	}
	public CategoryNode(String nodeId,String parentId,String nodeName,int type){
		parentNode=null;
		depth=0;
		expanded=false;
		clicked=false;
		children.clear();
		this.ID=nodeId;
		this.parentID=parentId;
		this.name=nodeName;
		this.type=type;
		
	}
	public CategoryNode(ICategory category){
		parentNode=null;
		depth=0;
		expanded=false;
		clicked=false;
		children.clear();
		parentID=null;
		this.ID=category.getId();
		this.name=category.getName();
		this.type=0;
	}
	public CategoryNode(IResource resource){
		parentNode=null;
		depth=0;
		expanded=false;
		clicked=false;
		children.clear();
		parentID=null;
		this.ID=resource.getId();
		this.name=resource.getName();
		this.type=1;
	}
	  /**
	   * 在当前节点的子孙中找是否有指定ID节点，如果有返回该节点，否则返回null
	   * @param roleID
	   * @return
	   */
	  public CategoryNode getDescendant(String nodeId)
	  {
	    if(children.isEmpty())
	    	return null;
	    for(Enumeration enumeration = children.elements(); enumeration.hasMoreElements(); )
	    {
		CategoryNode node = (CategoryNode)enumeration.nextElement();
		if(node.getID().equals(nodeId))
		return node;
		else
		{
		CategoryNode descendat = node.getDescendant(nodeId);
		if (descendat!=null)
		  return descendat;
		}
	    }
	    return null;
	  }
	  /**判断节点是否有孩子节点
	   * */
	  public boolean hasChildren(){
		  return !children.isEmpty();
	  }
	/*
	 * 增加孩子节点
	 * */
	public void addChild(CategoryNode node){
		if(children==null){
			children=new Vector(2,2);
		}
		children.add(node);
		node.setParentID(node.getID());
		node.setParentNode(this);
		
	}
	/**
	 * 取得节点的第一个孩子节点
	 * */
	public CategoryNode firstChild(){
		return (CategoryNode)children.firstElement();
	}
	/**
	 * 取的节点的最后一个孩子节点
	 * */
	public CategoryNode lastChild(){
		return (CategoryNode)children.lastElement();
	}
	/**
	 * 判断节点是否有后继
	 * */
	public boolean hasNextSibling(){
		if(null!=parentNode)
			return parentNode.lastChild()!=this;
		else 
			return false;
	}
	/**
	 * 取得后续节点
	 * */
	public CategoryNode getNextSibling(){
		CategoryNode nextSiblingNode=null;
		if(null!=parentNode){
			int count=parentNode.getchildCount()-1;
			for(int i=0;i!=count;i++){
				CategoryNode temp=parentNode.getChildAt(i);
				if(temp!=this)
					continue;
				nextSiblingNode=parentNode.getChildAt(i);
				break;
			}
		}
		return nextSiblingNode;
	}
	/**
	 * 判断节点是否有前续节点
	 * */
	public boolean hasPreviousSibling(){
		if(null!=parentNode)
			return parentNode.firstChild()!=this;
		else 
			return false;
	}
	/*
	 * 取得前续节点
	 * */
	public CategoryNode getPreviousSiblingNode(){
		CategoryNode previousSiblingNode=null;
		int count=parentNode.getchildCount()-1;
		for(int i=0;i!=count;i++){
			CategoryNode temp=parentNode.getChildAt(i);
			if(temp!=this)
				continue;
			previousSiblingNode=parentNode.getChildAt(i-1);
			break;
		}
		return previousSiblingNode;
	}
	/**
	 * 根据下表取得孩子节点
	 * */
	public CategoryNode getChildAt(int index){
		if(children.size()>index)
			return (CategoryNode)children.elementAt(index);
		else 
			return null;
	}
	/**
	 * 取得孩子的个数
	 * */
	public int getchildCount(){
		return children.size();
	}
	public void removeChildren(){
		children.removeAllElements();
	}
	public Vector getChildren() {
		return children;
	}

	public void setChildren(Vector children) {
		this.children = children;
	}

	public boolean isClicked() {
		return clicked;
	}

	public void setClicked(boolean clicked) {
		this.clicked = clicked;
	}

	public int getDepth() {
		return depth;
	}

	public void setDepth(int depth) {
		this.depth = depth;
		int childcount=this.getchildCount();
		for(int i=0;i<childcount;i++){
			CategoryNode categorynode=this.getChildAt(i);
			categorynode.setDepth(depth+1);
		}
	}

	public boolean isExpanded() {
		return expanded;
	}

	public void setExpanded(boolean expanded) {
		this.expanded = expanded;
	}

	public String getID() {
		return ID;
	}

	public void setID(String id) {
		ID = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getParentID() {
		return parentID;
	}

	public void setParentID(String parentID) {
		this.parentID = parentID;
	}

	public CategoryNode getParentNode() {
		return parentNode;
	}

	public void setParentNode(CategoryNode parentNode) {
		this.parentNode = parentNode;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

}