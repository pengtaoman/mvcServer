package com.neusoft.uniflow.web.common.trees.beans;

import java.util.Collections;
import java.util.Vector;

import com.neusoft.org.NWOrg;
import com.neusoft.org.NWPerson;
import com.neusoft.org.NWRole;
import com.neusoft.org.NWUnit;

public class OrgTree {

	public static String ORGROLEROOT_ID = "88888888";

	public static String ORGUNITROOT_ID = "111111111";

	public static String ORGPERSONROOT_ID = "00000000";

	public static String openall = "openall";

	public static String notopenall = "openunit";

	private String openNodeID = "";// 当前树中被选中节点

	private String openfalg = "openall";
	
	private int treeType=0;

	private OrgNode rootNode;

	private OrgNode personRoot;

	private NWOrg org = null;
	public OrgTree(){
		
	}
	public OrgTree(NWOrg org) {
		this.org = org;
		this.openfalg = "openall";
		openNodeID = ORGROLEROOT_ID;
		initnwUnit();
		// initRoles();
		// initPersons();
	}
	public OrgTree(NWOrg org,int treeType){
		this.org = org;
		this.openfalg = "openall";
		openNodeID = ORGROLEROOT_ID;
		initnwUnit();
		this.treeType=treeType;
		if(treeType==1){
			initRoles();
		}else{
			initnwUnit();
		}
		
	}
	public OrgTree(NWOrg org, String openfalg) {
		this.org = org;
		openNodeID = ORGROLEROOT_ID;
		this.openfalg = openfalg;
		rootNode = new OrgNode(ORGROLEROOT_ID, "", "组织机构", 4);
		initnwUnit();
		initRoles();
		// initPersons();
	}

	public void initRoles() {
		
		rootNode = new OrgNode(ORGROLEROOT_ID, "", "角色", 4);
		rootNode.setExpanded(true);
		rootNode.setClicked(true);
		Vector roles = null;
		try {
			roles = org.openAbsoluteRootRoleList();
			if (roles != null)
				roles.addAll(org.openOrphanRoleList());
			else
				roles = org.openOrphanRoleList();
		} catch (Exception e) {
			System.out.println("------------- role ---------------");
			e.printStackTrace();
		}
		if (roles != null && !roles.isEmpty()) {
			Collections.sort(roles, new NodeComparator());
			for (int i = 0; i < roles.size(); i++) {
				OrgNode node = new OrgNode((NWRole) roles.elementAt(i));
				rootNode.addChild(node);
			}
		}
	}

	public  void initnwUnit() {
		rootNode = new OrgNode(ORGROLEROOT_ID, "", "组织机构", 4);
		rootNode.setClicked(true);
		rootNode.setExpanded(true);
		Vector nwunits = null;
		try {
			nwunits = org.openAbsoluteRootUnitList();
		} catch (Exception e) {
			System.out.print("----------unit----------");
			e.printStackTrace();
		}
		if (nwunits != null && !nwunits.isEmpty()) {
			for (int i = 0; i < nwunits.size(); i++) {
				NWUnit unit = (NWUnit) nwunits.elementAt(i);
				OrgNode node = new OrgNode(unit);
				rootNode.addChild(node);
			}
		}
	}

	private void initPersons() {

		Vector persons = null;
		try {
			persons = org.openPersonList(1, Integer.MAX_VALUE - 1,
					NWPerson.PSN_ACCOUNT);
			for (int i = 0; i < persons.size(); i++) {
				NWPerson person = (NWPerson) persons.elementAt(i);
				String personInfo = person.getName();
				if (personInfo == null)
					personInfo = person.getAccount();
				OrgNode node = new OrgNode(person.getID(), ORGPERSONROOT_ID,
						personInfo, 0);
				node.setClicked(true);
				node.setExpanded(false);
				personRoot.addChild(node);
			}
		} catch (Exception e) {
			System.out.println("------------- person ---------------");
			e.printStackTrace();
		}
	}

	public String getOpenfalg() {
		return openfalg;
	}

	public void setOpenfalg(String openfalg) {
		this.openfalg = openfalg;
	}

	public OrgNode getRootNode() {
		return this.rootNode;
	}

	/**
	 * 为了支持在选择参与者时能够在一个树中列出人员和角色，保存乐一个人员的更，主要用于表示人员是否展开
	 * 
	 * @return
	 */
	public OrgNode getPersonRoot() {
		return this.personRoot;
	}

	/**
	 * 在树中找寻指定ID节点，找到返回该节点对象，否则泛化null
	 * 
	 * @param nodeID
	 * @return
	 */
	
	public OrgNode getTreeNode(String nodeID) {
		if (nodeID.equals(OrgTree.ORGROLEROOT_ID))
			return rootNode;
		if (nodeID.equals(OrgTree.ORGPERSONROOT_ID))
			return this.personRoot;
		OrgNode node = rootNode.getDescendant(nodeID);
		if (node != null)
			return node;
		else
			return personRoot.getDescendant(nodeID);
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
			node.removeAllChildren();// 避免因为在当前节点没有打开过，而又在addchild时，家人了一个
			NWRole role = org.getRole(nodeID);
			Vector childrenRoles = role.openChildRoleList(false, true);

			if (childrenRoles != null && !childrenRoles.isEmpty()) {
				Collections.sort(childrenRoles, new NodeComparator());
				for (int i = 0; i < childrenRoles.size(); i++) {
					OrgNode childNode = new OrgNode((NWRole) childrenRoles
							.elementAt(i));
					// childNode.setParentID(node.getID());
					// childNode.setParentNode(node);
					node.addChild(childNode);
				}
			}

			node.setClicked(true);
			node.setExpanded(true);
		}
	}

	public void expandNode(String nodeId, int nodeype) throws Exception {
		OrgNode node = this.getTreeNode(nodeId);
		if (node.isExpanded())
			node.setExpanded(false);
		else if (node.isClicked())
			node.setExpanded(true);
		else {
			node.removeAllChildren();
			if (node.getType() == 2) {
				NWUnit unit = org.getUnit(nodeId);
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
				if (this.openfalg.equals(OrgTree.openall)) {
					Vector belongRole = new Vector();
					belongRole = unit.openRoleList(false);
					Vector belongPerson = new Vector();
					belongPerson = unit.openPersonList(false);
					int size = belongRole.size();
					for (int i = 0; i < size; i++) {
						OrgNode childNode = new OrgNode((NWRole) belongRole
								.elementAt(i));
						node.addChild(childNode);
					}
					size = belongPerson.size();
					for (int i = 0; i < size; i++) {
						NWPerson person = (NWPerson) belongPerson.elementAt(i);
						OrgNode childNode = new OrgNode(person.getID(), nodeId,
								person.getName(), 0);
						node.addChild(childNode);
					}
				}
			} else if (node.getType() == 1) {
				NWRole role = org.getRole(nodeId);
				Vector childRoles = new Vector();
				Vector belongPersons = new Vector();
				childRoles = role.openChildRoleList(false, true);
				belongPersons = role.openMemberList();
				int size = 0;
				if (childRoles != null) {
					size = childRoles.size();
					for (int i = 0; i < size; i++) {
						OrgNode childNode = new OrgNode((NWRole) childRoles
								.elementAt(i));
						node.addChild(childNode);
					}
				}
				if (belongPersons != null) {
					size = belongPersons.size();
					for (int i = 0; i < size; i++) {
						NWPerson person = (NWPerson) belongPersons.elementAt(i);
						OrgNode childNode = new OrgNode(person.getID(), nodeId,
								person.getName(), 0);
						node.addChild(childNode);
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