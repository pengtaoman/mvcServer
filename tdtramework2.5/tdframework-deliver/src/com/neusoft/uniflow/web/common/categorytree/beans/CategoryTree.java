package com.neusoft.uniflow.web.common.categorytree.beans;

import java.util.Hashtable;
import java.util.Vector;

import com.neusoft.uniflow.api.handler.NWAgent;
import com.neusoft.uniflow.category.ICategory;
import com.neusoft.uniflow.category.ICategoryEntry;
import com.neusoft.uniflow.category.IResource;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class CategoryTree {
	public final static String CATEGORY_ROOTID = "00000";
	private CategoryNode categoryroot;
	private ICategoryEntry category;
	private String openNodeId = "";
	private Vector selectedItem = new Vector();
	private Hashtable idNameMap = new Hashtable();

	public CategoryTree(String agentid) throws Exception{
		ICategoryEntry category = WorkflowManager.getNWSession().getCategoryEntry();
		this.category = category;
		openNodeId = CATEGORY_ROOTID;
		initCategoryTree(agentid);
	}

	public void initCategoryTree(String agentid)throws Exception {
		categoryroot = new CategoryNode(CATEGORY_ROOTID, "", "流程资源树", 0);
		categoryroot.setClicked(true);
		categoryroot.setExpanded(true);
		Vector categoryCollect = new Vector();
		try {
			categoryCollect = category.openAbsoluteRootCategoryList(ICategoryEntry.PROCESS);
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (categoryCollect != null && !categoryCollect.isEmpty()) {
			int size = categoryCollect.size();
			for (int i = 0; i < size; i++) {
				ICategory category = (ICategory) categoryCollect.elementAt(i);
				CategoryNode node = new CategoryNode(category);
				categoryroot.addChild(node);
				this.idNameMap.put(node.getID(), node.getName());
			}
		}
		if (agentid!=null && !agentid.equals("System")){
			NWAgent agent = WorkflowManager.getNWSession().getAgent(agentid);
			String categoryid = agent.getCategoryID();
			String processid = agent.getProcessID();
			if (categoryid!=null && !categoryid.equals("")) selectedItem.add(categoryid+"#0");
			if (processid!=null && !processid.equals("")) selectedItem.add(processid+"#1");
		}
	}

	public CategoryNode getRootNode() {
		return this.categoryroot;
	}

	public CategoryNode getTreeNode(String nodeId) {
		if (nodeId.equals(CATEGORY_ROOTID)) {
			return this.categoryroot;
		}
		CategoryNode node = categoryroot.getDescendant(nodeId);
		return node;
	}

	public String getOpenNodeId() {
		return openNodeId;
	}

	public void setOpenNodeId(String openNodeId) {
		this.openNodeId = openNodeId;
	}

	public CategoryNode getCategoryroot() {
		return categoryroot;
	}

	public void ExpandNode(String nodeId) throws Exception {
		CategoryNode node = this.getTreeNode(nodeId);
		if (node.isExpanded()) {
			node.setExpanded(false);
		} else if (node.isClicked()) {
			node.setExpanded(true);
		} else {
			node.removeChildren();
			if (node.getType() == 0) {
				Vector categoryChildlist = category.openNextLevelCategoryList(nodeId);
				if (categoryChildlist != null && !categoryChildlist.isEmpty()) {
					int size = categoryChildlist.size();
					for (int i = 0; i < size; i++) {
						CategoryNode childNode = new CategoryNode(
								(ICategory) categoryChildlist.elementAt(i));
						node.addChild(childNode);
						this.idNameMap.put(childNode.getID(), childNode.getName());
					}
				}
				
				Vector resourcelist=category.openResourceListFromCategory(nodeId,ICategoryEntry.PROCESS);
				if(resourcelist!=null&&!resourcelist.isEmpty()){
					int size=resourcelist.size();
					for(int i=0;i<size;i++){
						CategoryNode childNode= new CategoryNode((IResource)resourcelist.elementAt(i));
						node.addChild(childNode);
						this.idNameMap.put(childNode.getID(), childNode.getName());
					}
				}
			}
			node.setExpanded(true);
			node.setClicked(true);
		}
	}
	public void treeRemoveNode(String nodeId) {
		CategoryNode categoryNode = this.getTreeNode(nodeId);
		CategoryNode parentNode = categoryNode.getParentNode();
		parentNode.getParentNode().getChildren().removeElement(categoryNode);
	}

	public Vector getSelectedItem() {
		return selectedItem;
	}

	public void setSelectedItem(Vector selectedItem) {
		this.selectedItem = selectedItem;
	}
	
	public String getSeletedItems(){
		String results = "";
		for (int i=0;i<this.selectedItem.size();i++){
			String sub = (String)this.selectedItem.elementAt(i);
			if (results.equals("")){
				results = this.translateSelectedItem(sub);
			}else{
				results = results + "," +this.translateSelectedItem(sub);
			}
		}
		
		return results;
	}
	private String translateSelectedItem(String item){
		String results = "";
		String[] temps = item.split("#");
		String id = temps[0];
		results = (String)this.idNameMap.get(id);
		if (temps[1].equals("0"))
			results = "[分类]" + results;
		if (temps[1].equals("1"))
			results = "[流程]" + results;
		return results + ";" + item;
	}

	public Hashtable getIdNameMap() {
		return idNameMap;
	}
}
