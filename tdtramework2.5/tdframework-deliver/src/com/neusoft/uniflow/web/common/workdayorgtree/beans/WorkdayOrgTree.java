package com.neusoft.uniflow.web.common.workdayorgtree.beans;

import java.util.Vector;

import com.neusoft.org.NWOrg;
import com.neusoft.org.NWUnit;
import com.neusoft.uniflow.web.common.trees.beans.OrgNode;

public class WorkdayOrgTree {

	public static String ORGUNITROOT_ID = "111111111";

	public static String openall = "openall";

	public static String notopenall = "openunit";

	private String openNodeID = "";// 当前树中被选中节点

	private int treeType = 0;

	private OrgNode rootNode;

	private OrgNode defaultNode;

	private OrgNode workDayRoot;

	private NWOrg org = null;

	public WorkdayOrgTree(NWOrg org) {
		this.org = org;
		this.rootNode = new OrgNode(ORGUNITROOT_ID, "", "组织机构", 4);
		this.workDayRoot = new OrgNode(ORGUNITROOT_ID, "", "工作日历", 4);
		this.defaultNode = new OrgNode("system", "", "默认作息时间", 2);
	}

	public void initTree() {
		this.workDayRoot.addChild(this.defaultNode);
		this.workDayRoot.addChild(this.rootNode);
		this.workDayRoot.setClicked(true);
		this.workDayRoot.setExpanded(true);
		this.rootNode.setClicked(true);
		this.rootNode.setExpanded(true);
		Vector nwunits = null;
		try {
			nwunits = this.org.openAbsoluteRootUnitList();
		} catch (Exception e) {
			System.out.print("取得组织机构失败");
			e.printStackTrace();
		}
		if (nwunits != null && !nwunits.isEmpty()) {
			int length = nwunits.size();
			for (int i = 0; i < length; i++) {
				NWUnit nwunit = (NWUnit) nwunits.elementAt(i);
				OrgNode node = new OrgNode(nwunit);
				this.rootNode.addChild(node);
			}
		}

	}

	public void initTree(Vector unitIds) {
		String unitId = "";
		if (unitIds != null && !unitIds.isEmpty()) {
			int unitcounts = unitIds.size();
			for (int i = 0; i < unitcounts; i++) {
				try {
					unitId = (String) unitIds.elementAt(i);
					NWUnit unit = this.org.getUnit(unitId);
					OrgNode node = new OrgNode(unit);
					rootNode.addChild(node);
				} catch (Exception e) {
					System.out.print("----unit---");
					e.printStackTrace();
				}
			}
		}
	}

	public OrgNode getRootNode() {
		return this.workDayRoot;
	}

	/**
	 * 在树中找寻指定ID节点，找到返回该节点对象，否则泛化null
	 * 
	 * @param nodeID
	 * @return
	 */

	public OrgNode getTreeNode(String nodeID) {
		if (nodeID.equals(WorkdayOrgTree.ORGUNITROOT_ID)) {
			return workDayRoot;
		}
		OrgNode node = workDayRoot.getDescendant(nodeID);
		if (node != null)
			return node;
		else
			return null;
	}

	public String getOpenNodeID() {
		return openNodeID;
	}

	public void setOpenNodeID(String openNodeID) {
		this.openNodeID = openNodeID;
	}

	public void expandNode(String nodeID) throws Exception {
		OrgNode node = this.getTreeNode(nodeID);
		if (node.isExpanded())
			node.setExpanded(false);
		else if (node.isClicked())// 如果合并的并且click过，一定有children，否则没有连接，不会执行这个操作
			node.setExpanded(true);
		else// 没有被click过，不知道有没有children
		{
			node.removeAllChildren();// 避免因为在当前节点没有打开过，而又在addchild时，加人了一个
			if (!node.getID().equals("system")) {
				NWUnit unit = org.getUnit(nodeID);
				if (unit != null) {
					Vector childunit = new Vector();
					childunit = unit.openSubUnitList(false);
					if (childunit != null && !childunit.isEmpty()) {
						int childsize = childunit.size();
						for (int i = 0; i < childsize; i++) {
							OrgNode childNode = new OrgNode((NWUnit) childunit
									.elementAt(i));
							node.addChild(childNode);
						}
					}
				}
			}
			node.setClicked(true);
			node.setExpanded(true);
		}
	}

	public void removeNode(String nodeId) {
		OrgNode node = this.getTreeNode(nodeId);
		OrgNode parent = node.getParentNode();
		parent.getChildren().removeElement(node);
	}

	public int getTreeType() {
		return treeType;
	}

	public void setTreeType(int treeType) {
		this.treeType = treeType;
	}
}