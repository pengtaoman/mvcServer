package com.neusoft.om.omutil;

import java.util.List;

import com.neusoft.om.dao.area.AreaColl;
import com.neusoft.om.dao.area.AreaVO;
import com.neusoft.om.dao.employee.EmployeeColl;
import com.neusoft.om.dao.employee.EmployeeVO;
import com.neusoft.om.dao.organ.OrganColl;
import com.neusoft.om.dao.organ.OrganVO;
import com.neusoft.tdframework.common.data.ObjectCollection;
import com.neusoft.unieap.taglib.commontree.tree.impl.Tree;
import com.neusoft.unieap.taglib.commontree.tree.impl.TreeNode;
import com.neusoft.unieap.taglib.commontree.tree.itf.ITree;
import com.neusoft.unieap.taglib.commontree.tree.itf.ITreeNode;

public class OmOrganTree {
	/**
	 * 构造一棵 区域－组织机构－人员 树
	 * @param areaColl
	 * @param organColl
	 * @param empColl
	 * @return
	 */
	public static ITree constructAreaOrganEmpTree(AreaColl areaColl, OrganColl organColl, EmployeeColl empColl){
		ITree areaOrganTree = constructAreaOrganTree(areaColl, organColl);
		for(int i = 0; i < empColl.getRowCount(); i ++){
			EmployeeVO empVO = empColl.getEmployee(i);
			ITreeNode empNode = new TreeNode(empVO.getEmployeeId(), empVO.getEmployeeName(),"0"); //约定职员为0
			ITreeNode treeNode = areaOrganTree.findNode(empVO.getOrganId());
			if(treeNode != null && treeNode.getId() != null && !treeNode.getId().trim().equals("")){
				areaOrganTree.findNode(empVO.getOrganId()).addChild(empNode);
			}
		}
		return areaOrganTree;
	}
	/**
	 * 构造一棵组织机构－人员树
	 * @param organColl
	 * @param empColl
	 * @return
	 */
	public static ITree constructOrganEmpTree(AreaColl areaColl,OrganColl organColl, EmployeeColl empColl){
		ITree organTree = constructOrganTree(areaColl,organColl);
		for(int i = 0; i < empColl.getRowCount(); i++){
			EmployeeVO empVO = empColl.getEmployee(i);
			ITreeNode empNode = new TreeNode(empVO.getEmployeeId(), empVO.getEmployeeName(), "0");
			ITreeNode organNode = organTree.findNode(empVO.getOrganId());
			ITreeNode sameIdOrganNode = organTree.findNode(empVO.getEmployeeId());
			if(organNode != null && organNode.getId() != null && !organNode.getId().trim().equals("")
					&& sameIdOrganNode == null){
				organTree.findNode(empVO.getOrganId()).addChild(empNode);
			}
		}
		return organTree;
	}
	/**
	 * 构造区域－组织机构树
	 * @param areaColl
	 * @param organColl
	 * @return
	 */
	public static ITree constructAreaOrganTree(AreaColl areaColl, OrganColl organColl){
		ITree areaTree = constructAreaTree(areaColl);
		ITree organTree = constructOrganTree(areaColl,organColl);
		ITreeNode organRootNode = organTree.getRoot();
		List organList = organRootNode.getChildren();
		for(int i=0; i < organList.size(); i++){
			ITreeNode firstLevelNode = (ITreeNode)organList.get(i);
			OrganVO firstLevelVO = organColl.getOrganById(firstLevelNode.getId());
			String areaId = firstLevelVO.getAreaId();
			if(areaTree.findNode(areaId) != null){
				areaTree.findNode(areaId).addChild(firstLevelNode);
			}
		}
		return areaTree;
	}
	
	/**
	 * 构造一棵区域树
	 * @param areaColl
	 * @return
	 */
	public static ITree constructAreaTree(AreaColl areaColl){
		ITree areaTree = new Tree();		
    	ObjectCollection treeNodeColl = new ObjectCollection();
        ITreeNode root = new TreeNode("om", "区域树", "om");//根节点
        areaTree.expand("om");
        areaTree.setRoot(root);
    	for(int i = 0; i < areaColl.getRowCount(); i++){
    		AreaVO areaVo = areaColl.getArea(i);
    		ITreeNode newNode = new TreeNode(areaVo.getAreaId(), areaVo.getAreaName(),"A"+areaVo.getAreaLevel());
    		treeNodeColl.addElement(newNode);   
    	}

    	for(int i =0; i < treeNodeColl.getRowCount(); i++){
    		ITreeNode node = (ITreeNode)treeNodeColl.getElement(i);
    		ITreeNode parentNode = null;
    		AreaVO areaVO = areaColl.getAreaById(node.getId());
    		AreaVO parentVO = areaColl.getAreaById(areaVO.getParentAreaId());
    		if(parentVO != null && parentVO.getAreaId() != null 
    				&& !parentVO.getAreaId().trim().equals("")){
    			parentNode = getNodeByIdFromColl(areaColl, parentVO.getAreaId());
    		}
    		if(parentNode != null && !existNode(areaTree, parentNode) && parentVO.getParentAreaId() == null){
    			root.addChild(parentNode);
    			areaTree.findNode(parentNode.getId()).addChild(node);
    		}else if(parentNode != null && !existNode(areaTree, node) && existNode(areaTree, parentNode)){
    			areaTree.findNode(parentNode.getId()).addChild(node);
    		}else if(parentNode == null ){
    			root.addChild(node);
    		}
    	}	
		return areaTree;
	}
	/**
	 * 组装一棵组织机构树
	 * @param menuColl
	 * @param sysColl
	 * @return
	 */
    public static ITree constructOrganTree(AreaColl areaColl,OrganColl organColl){
    	ObjectCollection treeNodeColl = new ObjectCollection();
        ITree organTree = new Tree();
        ITreeNode root = new TreeNode("om", "组织机构树", "om");//根节点
        organTree.expand("om");
        organTree.setRoot(root);
    	for(int i = 0; i < organColl.getRowCount(); i++){
    		OrganVO organVo = organColl.getOrgan(i);
    		String areaId = organVo.getAreaId();
    		AreaVO areaVO = areaColl.getAreaById(areaId);
    		String organLevel = "";
    		if(areaVO != null&& areaVO.getAreaId()!=null && !areaVO.getAreaId().equals("")){
    			organLevel = String.valueOf(areaVO.getAreaLevel());
    		}
    		ITreeNode newNode = new TreeNode(organVo.getOrganId(), organVo.getOrganName(),organLevel);
    		treeNodeColl.addElement(newNode);   
    	}

    	for(int i =0; i < treeNodeColl.getRowCount(); i++){
    		ITreeNode node = (ITreeNode)treeNodeColl.getElement(i);
    		ITreeNode parentNode = null;
    		OrganVO organVO = organColl.getOrganById(node.getId());
    		OrganVO parentVO = organColl.getOrganById(organVO.getParentOrganId());
    		if((organVO.getParentOrganId() == null || organVO.getParentOrganId().trim().equals(""))
    				&& !existNode(organTree, node)){
    			root.addChild(node);
    		}else if(parentVO != null && parentVO.getOrganId() != null 
    				&& !parentVO.getOrganId().trim().equals("")){
    			parentNode = getNodeByIdFromColl(areaColl, organColl, parentVO.getOrganId());
    		}
    		if(parentNode != null && !existNode(organTree, parentNode) && parentVO.getParentOrganId() == null){
    			root.addChild(parentNode);
    			organTree.findNode(parentNode.getId()).addChild(node);
    		}else if(parentNode != null && !existNode(organTree, node) && existNode(organTree, parentNode)){
    			organTree.findNode(parentNode.getId()).addChild(node);
    		}
    	}
    	return organTree;
    }
    //判断树中是否存在某节点
    private static boolean existNode(ITree tree, ITreeNode node){
    	boolean exist = false;
    	ITreeNode treeNode = tree.findNode(node.getId());
    	if(treeNode != null){
    		exist = true;
    	}
    	return exist;
    }
    
    private static ITreeNode getNodeByIdFromColl(AreaColl areaColl, OrganColl organColl, String id){
    	ITreeNode node = null;
    	for(int i = 0; i < organColl.getRowCount(); i ++){
    		OrganVO vo = (OrganVO)organColl.getElement(i);
    		String areaId = vo.getAreaId();
    		AreaVO areaVO = areaColl.getAreaById(areaId);
    		String organLevel = "";
    		if(areaVO != null && areaVO.getAreaId()!=null && !areaVO.getAreaId().equals("")){
    			organLevel = String.valueOf(areaVO.getAreaLevel());
    		}
    		if(vo.getOrganId().equals(id)){
    			node = new TreeNode(vo.getOrganId(), vo.getOrganName(), organLevel);
    		}
    	}
    	return node;
    }
    
    
    private static ITreeNode getNodeByIdFromColl(AreaColl areaColl, String id){
    	ITreeNode node = null;
    	for(int i = 0; i < areaColl.getRowCount(); i ++){
    		AreaVO vo = (AreaVO)areaColl.getElement(i);
    		if(vo.getAreaId().equals(id)){
    			node = new TreeNode(vo.getAreaId(), vo.getAreaName(), "A"+vo.getAreaLevel());
    		}
    	}
    	return node;
    }
    
    public static void main(String args[]){
    	OrganVO vo1 = new OrganVO();
    	vo1.setOrganId("1");
    	vo1.setOrganName("organ1");
    	vo1.setAreaId("a2");
    	
    	OrganVO vo2 = new OrganVO();
    	vo2.setOrganId("2");
    	vo2.setOrganName("organ2");
    	vo2.setAreaId("a5");
    	
    	OrganVO vo3 = new OrganVO();
    	vo3.setOrganId("3");
    	vo3.setOrganName("organ3");
    	vo3.setParentOrganId("1");
    	vo3.setAreaId("a2");
    	
    	OrganVO vo4 = new OrganVO();
    	vo4.setOrganId("4");
    	vo4.setOrganName("organ4");
    	vo4.setParentOrganId("3");
    	vo4.setAreaId("a2");
    	
    	OrganVO vo5 = new OrganVO();
    	vo5.setOrganId("5");
    	vo5.setOrganName("organ5");
    	vo5.setParentOrganId("2");
    	vo5.setAreaId("a5");
    	
    	OrganVO vo6 = new OrganVO();
    	vo6.setOrganId("6");
    	vo6.setOrganName("organ6");
    	vo6.setParentOrganId("2");
    	vo6.setAreaId("a5");
    	
    	OrganColl organColl = new OrganColl();
    	organColl.addOrgan(vo1);
    	organColl.addOrgan(vo2);
    	organColl.addOrgan(vo3);
    	organColl.addOrgan(vo4);
    	organColl.addOrgan(vo5);
    	organColl.addOrgan(vo6);    	
    	
    	AreaVO aVO1 = new AreaVO();
    	aVO1.setAreaId("a1");
    	aVO1.setAreaName("area1");
    	aVO1.setAreaLevel(1);
    	
    	AreaVO aVO2 = new AreaVO();
    	aVO2.setAreaId("a2");
    	aVO2.setAreaName("area2");
    	aVO2.setParentAreaId("a1");
    	aVO2.setAreaLevel(2);
    	
    	AreaVO aVO3 = new AreaVO();
    	aVO3.setAreaId("a3");
    	aVO3.setAreaName("area3");
    	aVO3.setParentAreaId("a1");
    	aVO3.setAreaLevel(2);
    	
    	
    	AreaVO aVO4 = new AreaVO();
    	aVO4.setAreaId("a4");
    	aVO4.setAreaName("area4");
    	aVO4.setParentAreaId("a2");
    	aVO4.setAreaLevel(3);
    	
    	
    	AreaVO aVO5 = new AreaVO();
    	aVO5.setAreaId("a5");
    	aVO5.setAreaName("area5");
    	aVO5.setParentAreaId("a2");
    	aVO5.setAreaLevel(3);
    	
    	AreaVO aVO6 = new AreaVO();
    	aVO6.setAreaId("a6");
    	aVO6.setAreaName("area6");
    	aVO6.setParentAreaId("a3");
    	aVO6.setAreaLevel(3);
    	
    	AreaVO aVO7 = new AreaVO();
    	aVO7.setAreaId("a7");
    	aVO7.setAreaName("area7");
    	aVO7.setParentAreaId("a6");
    	aVO7.setAreaLevel(4);
    	
    	AreaColl areaColl = new AreaColl();
    	areaColl.addArea(aVO1);
    	areaColl.addArea(aVO2);
    	areaColl.addArea(aVO3);
    	areaColl.addArea(aVO4);
    	areaColl.addArea(aVO5);
    	areaColl.addArea(aVO6);  
    	areaColl.addArea(aVO7);
    	
    	EmployeeVO eVO1 = new EmployeeVO();    	
    	eVO1.setEmployeeId("e1");
    	eVO1.setEmployeeName("emp1");
    	eVO1.setOrganId("3");
    	
    	EmployeeVO eVO2 = new EmployeeVO();    	
    	eVO2.setEmployeeId("e2");
    	eVO2.setEmployeeName("emp2");
    	eVO2.setOrganId("5");
    	
    	EmployeeVO eVO3 = new EmployeeVO();    	
    	eVO3.setEmployeeId("e3");
    	eVO3.setEmployeeName("emp3");
    	eVO3.setOrganId("5");
    	
    	EmployeeVO eVO4 = new EmployeeVO();    	
    	eVO4.setEmployeeId("e4");
    	eVO4.setEmployeeName("emp4");
    	eVO4.setOrganId("2");
    	
    	EmployeeVO eVO5 = new EmployeeVO();    	
    	eVO5.setEmployeeId("e5");
    	eVO5.setEmployeeName("emp5");
    	eVO5.setOrganId("1");
    	
    	EmployeeColl empColl = new EmployeeColl();
    	empColl.addEmployee(eVO1);
    	empColl.addEmployee(eVO2);
    	empColl.addEmployee(eVO3);
    	empColl.addEmployee(eVO4);
    	empColl.addEmployee(eVO5);
    	
    	ITree tree = constructOrganTree(areaColl,organColl);
    	ITree areaTree = constructAreaTree(areaColl);    	
    	ITree areaOrganTree = constructAreaOrganTree(areaColl, organColl);
    	ITree organEmpTree = constructOrganEmpTree(areaColl,organColl, empColl);
    	ITree areaOrganEmpTree = constructAreaOrganEmpTree(areaColl, organColl, empColl);
    	
    	String level = getLevelList(1,1);
    	
    	String a = "a";   

    }
    
    //构造组织机构和职员树，要求organColl.get(0)是所有组织机构的上级
	public static ITree constructOrganEmpTree(OrganColl organColl, EmployeeColl empColl){
		ITree organTree = new Tree();
		if(organColl != null){
			OrganVO rootVO = organColl.getOrgan(0);
			organTree = constructOrganTree(organColl,rootVO); //先构造组织机构树
		}		
		if(empColl != null){
			for(int i=0; i<empColl.getRowCount();i++){
				EmployeeVO empVO = empColl.getEmployee(i);
				ITreeNode empNode = new TreeNode(empVO.getEmployeeId(), empVO.getEmployeeName(),"0");
				String organId = empVO.getOrganId();
				organTree.findNode(organId).addChild(empNode);
			}
		}		
		return organTree;
	}
	
    public static ITree constructOrganTree(OrganColl organColl, OrganVO rootVO){
    	ITree nodeTree = new Tree();
    	String nodeId = rootVO.getOrganId();
    	String nodeName = rootVO.getOrganName();
    	ITreeNode organNode = new TreeNode(nodeId,nodeName,"1");   
    	nodeTree.setRoot(organNode);
    	for(int i = 1; i < organColl.getRowCount(); i++){
    		OrganVO organVo = organColl.getOrgan(i);    		
    		String parentOrganId = organVo.getParentOrganId();
    		ITreeNode newNode = new TreeNode(organVo.getOrganId(), organVo.getOrganName(),"1");
    		nodeTree.findNode(parentOrganId).addChild(newNode);
    	}
    	return nodeTree;
    }
   
    
    private static String getLevelList(int level1, int level2){
    	String level = null;
    	for(int i = level1; i < level2+1; i ++){
    		if(level == null || level.trim().equals("")){
    			level = String.valueOf(i);
    		}else{
    			level = level+","+String.valueOf(i);
    		}    		
    	}
    	return level;
    }
}
