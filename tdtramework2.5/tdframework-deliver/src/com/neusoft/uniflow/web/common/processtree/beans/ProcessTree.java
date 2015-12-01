package com.neusoft.uniflow.web.common.processtree.beans;

import java.util.Vector;

import com.neusoft.uniflow.api.def.NWActDef;
import com.neusoft.uniflow.api.def.NWProcDef;
import com.neusoft.uniflow.common.NWException;

public class ProcessTree {
	public static String NODE_ROOT_ID = "88888888";
	private String openNodeID = "";// 当前树中被选中节点
	private ProcessNode rootNode;
	private NWProcDef process = null;
	private String CurrentActID = "";
	private Vector NextActList = new Vector();

	public ProcessTree(NWProcDef process, String current_act_id) {
		this.process = process;
		this.CurrentActID = current_act_id;
		openNodeID = NODE_ROOT_ID;
		initCurrentActivity(process, current_act_id);
	}

	public void initCurrentActivity(NWProcDef process, String current_act_id) {
		rootNode = new ProcessNode(NODE_ROOT_ID, "可普送节点", -1);
		rootNode.setClicked(true);
		rootNode.setExpanded(true);
		NWActDef currentAct = null;
		try {
			currentAct = process.getActivity(current_act_id);
		} catch (NWException e) {
			e.printStackTrace();
		}
		if (currentAct != null) {
			ProcessNode node = new ProcessNode(currentAct.getID(), currentAct
					.getName(), currentAct.getType());
			rootNode.addChild(node);
		}
	}

	public ProcessNode getProcessNode(String nodeID) {
		if (nodeID.equals(ProcessTree.NODE_ROOT_ID)) {
			return rootNode;
		}
		ProcessNode node = rootNode.getDescendant(nodeID);
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
		ProcessNode node = this.getProcessNode(nodeID);
		if (node.isExpanded())
			node.setExpanded(false);
		else if (node.isClicked())// 如果合并的并且click过，一定有children，否则没有连接，不会执行这个操作
			node.setExpanded(true);
		else {// 没有被click过，不知道有没有children
			if (nodeID.equals(this.CurrentActID)) {
				Vector nextActs = process.openNextActList(nodeID);
				for (int i = 0; i < nextActs.size(); i++) {
					NWActDef nextAct = (NWActDef) nextActs.elementAt(i);
					if (nextAct.getType() == NWActDef.ACT_TYPE_MANUAL) {
						ProcessNode nextNode = new ProcessNode(nextAct.getID(),
								nextAct.getName(), nextAct.getType());
						node.addChild(nextNode);
					}
				}
			} else {
				node.removeAllChildren();// 可以取得最新孩子列表
				NWActDef actdef = process.getActivity(nodeID);
				if (actdef.getType() == 16) {
					Vector branches = actdef.openParallelBranchList();
					for (int i = 0; i < branches.size(); i++) {
						NWActDef nextAct = (NWActDef) branches.elementAt(i);
						if (nextAct.getType() == NWActDef.ACT_TYPE_MANUAL) {
							ProcessNode nextNode = new ProcessNode(nextAct
									.getID(), nextAct.getName(), nextAct
									.getType());
							node.addChild(nextNode);
						}
					}
				} else if (actdef.getType() == 5 || actdef.getType() == 6) {
					Vector nextActs = process.openNextActList(nodeID);
					for (int i = 0; i < nextActs.size(); i++) {
						NWActDef nextAct = (NWActDef) nextActs.elementAt(i);
						if (nextAct.getType() == NWActDef.ACT_TYPE_MANUAL) {
							ProcessNode nextNode = new ProcessNode(nextAct
									.getID(), nextAct.getName(), nextAct
									.getType());
							node.addChild(nextNode);
						}
					}

				}
			}
			node.setClicked(true);
			node.setExpanded(true);
		}
	}

	public void removeNode(String nodeId) {
		ProcessNode node = this.getProcessNode(nodeId);
		ProcessNode parent = node.getParentNode();
		parent.getChildren().removeElement(node);
	}

	public String getCurrentActID() {
		return CurrentActID;
	}

	public void setCurrentActID(String currentActID) {
		CurrentActID = currentActID;
	}

	public NWProcDef getProcess() {
		return process;
	}

	public void setProcess(NWProcDef process) {
		this.process = process;
	}

	public ProcessNode getRootNode() {
		return rootNode;
	}

	public Vector getNextActList() {
		return NextActList;
	}

	public void setNextActList(Vector nextActList) {
		NextActList = nextActList;
	}

}