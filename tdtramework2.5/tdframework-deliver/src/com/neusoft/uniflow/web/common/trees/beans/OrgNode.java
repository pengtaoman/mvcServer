package com.neusoft.uniflow.web.common.trees.beans;

/**
 * <p>Title: uniflow 3.5 web client</p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) 2003</p>
 * <p>Company: neusoft</p>
 * @author wangwb
 * @version 1.0
 */
import java.util.Enumeration;
import java.util.Vector;

import com.neusoft.org.NWRole;
import com.neusoft.org.NWUnit;

public class OrgNode {
  public OrgNode() {
  }
  private Vector children = new Vector();
  private String ID;
  private String name;
  private String parentID = "";
  private int depth;
  private boolean expanded = false;
  private boolean clicked = false;
  private int type = 0;//0-person,1-role,2-unit;

  private OrgNode parentNode = null;
  public boolean isExpanded()
  {
    return expanded;
  }
  public void setExpanded(boolean b)
  {
    expanded = b;
  }

  public boolean isClicked()
  {
    return this.clicked;
  }
  public void setClicked(boolean b)
  {
    this.clicked  = b;
  }

  public void setID(String ID) {
    this.ID = ID;
  }

  public String getID() {
    return this.ID;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getName() {
    return this.name;
  }

  void setDepth(int depth) {
    this.depth = depth;
    int childCount = getChildCount();
    for (int i = 0; i < childCount; i++) {
	OrgNode child = childAt(i);
	child.setDepth(depth + 1);
    }

  }

  public int getDepth() {
    return depth;
  }

  public String getParentID()
  {
    return this.parentID;
  }
  public void setParentID(String parent)
  {
    this.parentID = parent;
  }

  public OrgNode getParentNode()
  {
    return this.parentNode;
  }
  public void setParentNode(OrgNode parent)
  {
    this.parentNode = parent;
  }
  public int getType()
  {
	  return type;
  }
  //如果节点没有被点击过click，则一定没有children
  public boolean hasChildren()
  {
    if(children==null)
	return false;
    return !children.isEmpty();
  }
  public OrgNode childAt(int index) {
    if (null != children && children.size() > index)
	return (OrgNode) children.elementAt(index);
    else
	return null;
  }

  public int getChildCount() {
    if (null == children)
	return 0;
    else
	return children.size();
  }

  /**
   * 在当前节点的子孙中找是否有指定ID节点，如果有返回该节点，否则返回null
   * @param roleID
   * @return
   */
  public OrgNode getDescendant(String roleID)
  {
    if(children==null||children.isEmpty())
	return null;
    for(Enumeration enumeration = children.elements(); enumeration.hasMoreElements(); )
    {
	OrgNode node = (OrgNode)enumeration.nextElement();
	if(node.getID().equals(roleID))
	return node;
	else
	{
	OrgNode descendat = node.getDescendant(roleID);
	if (descendat!=null)
	  return descendat;
	}
    }
    return null;
  }
  public void addChild(OrgNode node) {
    if(children==null)
	children = new Vector(2,2);
    children.add(node);
    node.setParentID(this.getID());
    node.setParentNode(this);
  }

  public Vector getChildren()
  {
    return this.children;
  }
  public OrgNode(String nodeID, String parentNodeID, String nodeName,int type) {
    depth = 0;
    parentNode = null;
    children = null;
    expanded = false;
    clicked = false;
    this.ID = nodeID;
    this.parentID = parentNodeID;
    this.name = nodeName;
    this.type = type;
  }
  public OrgNode(NWUnit  nwunit){
	  depth=0;
	  parentNode=null;
	  children=null;
	  expanded=false;
	  clicked=false;
	  parentID=null;
	  this.ID=nwunit.getID();
	  this.name=nwunit.getName();
	  this.type=2;
  }
  public OrgNode(NWRole role) {
    depth = 0;
    parentNode = null;
    children = null;
    expanded = false;
    clicked = false;
    parentID = null;
    this.ID = role.getID();
    this.name = role.getName();
    this.type = 1;
  }

  public void removeAllChildren() {
    if (null != children)
	children.removeAllElements();
  }

  public OrgNode firstChild() {
    if (null != children)
	return (OrgNode) children.firstElement();
    else
	return null;
  }

  public OrgNode lastChild() {
    if (null != children)
	return (OrgNode) children.lastElement();
    else
	return null;
  }

  public boolean hasNextSibling() {
    if (null != parentNode)
	return parentNode.lastChild() != this;
    else
	return false;
  }

  public boolean hasPreviousSibling() {
    if (null != parentNode)
	return parentNode.firstChild() != this;
    else
	return false;
  }

  public OrgNode getNextSibling() {
    OrgNode nextSibling = null;
    if (null != parentNode) {
	int count = parentNode.getChildCount() - 1;
	for (int i = 0; i != count; i++) {
	OrgNode temp = parentNode.childAt(i);
	if (temp != this)
	  continue;
	nextSibling = parentNode.childAt(i + 1);
	break;
	}

    }
    return nextSibling;
  }

  public OrgNode getPreviousSibling() {
    OrgNode previousSibling = null;
    if (null != parentNode) {
	int count = parentNode.getChildCount();
	for (int i = 1; i != count; i++) {
	OrgNode temp = parentNode.childAt(i);
	if (temp != this)
	  continue;
	previousSibling = parentNode.childAt(i - 1);
	break;
	}

    }
    return previousSibling;
  }

}