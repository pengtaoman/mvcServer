package com.neusoft.uniflow.web.common.apptree.beans;

import java.util.Enumeration;
import java.util.Vector;

public class ApplicationNode {
	private String nodeID = "";
	private String nodeType = "root";
	private String nodeName = "";
	private boolean expanded = false;
	private boolean clicked = false;
	private Vector children = new Vector();
	private String parentID = "";
	private String participants = "";
	private String url = "";
	private ApplicationNode parentNode = null;
	public ApplicationNode(String id, String name, String type) {
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

	public ApplicationNode childAt(int index) {
		if (null != children && children.size() > index)
			return (ApplicationNode) children.elementAt(index);
		else
			return null;
	}

	public int getChildCount() {
		if (null == children)
			return 0;
		else
			return children.size();
	}

	public ApplicationNode getDescendant(String nodeID) {
		if (children == null || children.isEmpty())
			return null;
		for (Enumeration enumeration = children.elements(); enumeration
				.hasMoreElements();) {
			ApplicationNode node = (ApplicationNode) enumeration.nextElement();
			if (node.getNodeID().equals(nodeID))
				return node;
			else {
				ApplicationNode descendat = node.getDescendant(nodeID);
				if (descendat != null)
					return descendat;
			}
		}
		return null;
	}

	public void addChild(ApplicationNode node) {
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

	public ApplicationNode firstChild() {
		if (null != children)
			return (ApplicationNode) children.firstElement();
		else
			return null;
	}

	public ApplicationNode lastChild() {
		if (null != children)
			return (ApplicationNode) children.lastElement();
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

	public ApplicationNode getNextSibling() {
		ApplicationNode nextSibling = null;
		if (null != parentNode) {
			int count = parentNode.getChildCount() - 1;
			for (int i = 0; i != count; i++) {
				ApplicationNode temp = parentNode.childAt(i);
				if (temp != this)
					continue;
				nextSibling = parentNode.childAt(i + 1);
				break;
			}

		}
		return nextSibling;
	}

	public ApplicationNode getPreviousSibling() {
		ApplicationNode previousSibling = null;
		if (null != parentNode) {
			int count = parentNode.getChildCount();
			for (int i = 1; i != count; i++) {
				ApplicationNode temp = parentNode.childAt(i);
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

	public String getParentID() {
		return parentID;
	}

	public void setParentID(String parentID) {
		this.parentID = parentID;
	}

	public ApplicationNode getParentNode() {
		return parentNode;
	}

	public void setParentNode(ApplicationNode parentNode) {
		this.parentNode = parentNode;
	}

	public String getNodeType() {
		return nodeType;
	}

	public String getParticipants() {
		return participants;
	}

	public void setParticipants(String participants) {
		this.participants = participants;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}
}
