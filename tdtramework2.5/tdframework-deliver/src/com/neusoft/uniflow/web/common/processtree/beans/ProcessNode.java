package com.neusoft.uniflow.web.common.processtree.beans;

import java.util.Enumeration;
import java.util.Vector;

public class ProcessNode {
	private String nodeID = "";

	private int nodeType = -1;

	private String nodeName = "";

	private boolean expanded = false;

	private boolean clicked = false;

	private Vector children = new Vector();

	private String parentID = "";

	private ProcessNode parentNode = null;

	public ProcessNode(String id, String name, int type) {
		this.nodeID = id;
		this.nodeName = name;
		this.nodeType = type;
	}

	public boolean isClicked() {
		return clicked;
	}

	public void setClicked(boolean clicked) {
		this.clicked = clicked;
	}

	public boolean isExpanded() {
		return expanded;
	}

	public void setExpanded(boolean expanded) {
		this.expanded = expanded;
	}

	public boolean hasChildren() {
		if (children == null)
			return false;
		return !children.isEmpty();
	}

	public ProcessNode childAt(int index) {
		if (null != children && children.size() > index)
			return (ProcessNode) children.elementAt(index);
		else
			return null;
	}

	public int getChildCount() {
		if (null == children)
			return 0;
		else
			return children.size();
	}

	public ProcessNode getDescendant(String nodeID) {
		if (children == null || children.isEmpty())
			return null;
		for (Enumeration enumeration = children.elements(); enumeration
				.hasMoreElements();) {
			ProcessNode node = (ProcessNode) enumeration.nextElement();
			if (node.getNodeID().equals(nodeID))
				return node;
			else {
				ProcessNode descendat = node.getDescendant(nodeID);
				if (descendat != null)
					return descendat;
			}
		}
		return null;
	}

	public void addChild(ProcessNode node) {
		if (children == null)
			children = new Vector(2, 2);
		children.add(node);
		node.setParentID(this.getNodeID());
		node.setParentNode(this);
	}

	public Vector getChildren() {
		return this.children;
	}

	public void removeAllChildren() {
		if (null != children)
			children.removeAllElements();
	}

	public ProcessNode firstChild() {
		if (null != children)
			return (ProcessNode) children.firstElement();
		else
			return null;
	}

	public ProcessNode lastChild() {
		if (null != children)
			return (ProcessNode) children.lastElement();
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

	public ProcessNode getNextSibling() {
		ProcessNode nextSibling = null;
		if (null != parentNode) {
			int count = parentNode.getChildCount() - 1;
			for (int i = 0; i != count; i++) {
				ProcessNode temp = parentNode.childAt(i);
				if (temp != this)
					continue;
				nextSibling = parentNode.childAt(i + 1);
				break;
			}

		}
		return nextSibling;
	}

	public ProcessNode getPreviousSibling() {
		ProcessNode previousSibling = null;
		if (null != parentNode) {
			int count = parentNode.getChildCount();
			for (int i = 1; i != count; i++) {
				ProcessNode temp = parentNode.childAt(i);
				if (temp != this)
					continue;
				previousSibling = parentNode.childAt(i - 1);
				break;
			}

		}
		return previousSibling;
	}

	public String getNodeID() {
		return nodeID;
	}

	public String getNodeName() {
		return nodeName;
	}

	public int getNodeType() {
		return nodeType;
	}

	public String getParentID() {
		return parentID;
	}

	public void setParentID(String parentID) {
		this.parentID = parentID;
	}

	public ProcessNode getParentNode() {
		return parentNode;
	}

	public void setParentNode(ProcessNode parentNode) {
		this.parentNode = parentNode;
	}
}
