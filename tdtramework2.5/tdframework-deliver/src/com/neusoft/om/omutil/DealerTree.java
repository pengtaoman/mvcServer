package com.neusoft.om.omutil;

import com.neusoft.om.dao.dealer.DealerColl;
import com.neusoft.om.dao.dealer.DealerTypeColl;
import com.neusoft.om.dao.dealer.DealerTypeVO;
import com.neusoft.om.dao.dealer.DealerVO;
import com.neusoft.tdframework.common.data.ObjectCollection;
import com.neusoft.unieap.taglib.commontree.tree.impl.Tree;
import com.neusoft.unieap.taglib.commontree.tree.impl.TreeNode;
import com.neusoft.unieap.taglib.commontree.tree.itf.ITree;
import com.neusoft.unieap.taglib.commontree.tree.itf.ITreeNode;

public class DealerTree {
	
	/**
	 * ����һ�ø���֯����������������
	 * @param organId
	 * @return
	 */
	public static ITree constructTree(String organId, DealerColl dealerColl){
		ITree dealerTree = new Tree();
    	ObjectCollection treeNodeColl = new ObjectCollection();
        ITreeNode root = new TreeNode(organId, "������", organId);//���ڵ�,��֯����
        dealerTree.expand(organId);
        dealerTree.setRoot(root);
    	for(int i = 0; i < dealerColl.getRowCount(); i++){
    		DealerVO dealerVo = dealerColl.getDealer(i);
    		ITreeNode newNode = new TreeNode(dealerVo.getDealerId(), dealerVo.getDealerName(),dealerVo.getDealerId());
    		treeNodeColl.addElement(newNode);   
    	}

    	for(int i =0; i < treeNodeColl.getRowCount(); i++){
    		ITreeNode node = (ITreeNode)treeNodeColl.getElement(i);
    		ITreeNode parentNode = null;
    		DealerVO dealerVO = dealerColl.getDealerById(node.getId());
    		DealerVO parentVO = dealerColl.getDealerById(dealerVO.getDealerParent());
    		if(parentVO != null && parentVO.getDealerId() != null 
    				&& !parentVO.getDealerId().trim().equals("")){
    			parentNode = getNodeByIdFromColl(dealerColl, parentVO.getDealerId());
    		}
    		if(parentNode != null && !existNode(dealerTree, parentNode) && parentVO.getDealerParent() == null){
    			root.addChild(parentNode);
    		}else if(parentNode != null && !existNode(dealerTree, node) && existNode(dealerTree, parentNode)){
    			dealerTree.findNode(parentNode.getId()).addChild(node);
    		}else if(parentNode == null ){
    			root.addChild(node);
    		}    		
    	}
		return dealerTree;
	}
	
	/**
	 * ����һ�ø���֯����������������,�������������ʾ
	 * @param organId
	 * @return
	 */
	public static ITree constructTree(String organId, DealerColl dealerColl, DealerTypeColl typeColl){
		ITree dealerTree = new Tree();
    	ObjectCollection treeNodeColl = new ObjectCollection();
    	ObjectCollection typeNodeColl = new ObjectCollection();
        ITreeNode root = new TreeNode(organId, "������", organId);//���ڵ�,��֯����
        dealerTree.expand(organId);
        dealerTree.setRoot(root);
        //�õ����ڵ�
        for(int i=0; i < typeColl.getRowCount(); i++){
        	DealerTypeVO typeVO = typeColl.getDealerType(i);
        	ITreeNode typeNode = getTypeNode(typeVO);
        	typeNodeColl.addElement(typeNode);
        }        
        //�õ������ڵ�
    	for(int i = 0; i < dealerColl.getRowCount(); i++){
    		DealerVO dealerVo = dealerColl.getDealer(i);
    		ITreeNode newNode = new TreeNode(dealerVo.getDealerId(), dealerVo.getDealerName(),dealerVo.getDealerId());
    		treeNodeColl.addElement(newNode);   
    	}        
    	//�����ͽڵ�ӵ�����
    	for(int i =0; i < typeNodeColl.getRowCount(); i++){
    		ITreeNode node = (ITreeNode)typeNodeColl.getElement(i);
    		root.addChild(node);
    	}
    	
    	for(int i =0; i < treeNodeColl.getRowCount(); i++){
    		if(i==57){
    			int a= 0;
    		}
    		ITreeNode node = (ITreeNode)treeNodeColl.getElement(i);
    		ITreeNode parentNode = null;
    		DealerVO dealerVO = dealerColl.getDealerById(node.getId());
    		DealerVO parentVO = dealerColl.getDealerById(dealerVO.getDealerParent());
    		if(parentVO != null && parentVO.getDealerId() != null 
    				&& !parentVO.getDealerId().trim().equals("")){
    			parentNode = getNodeByIdFromColl(dealerColl, parentVO.getDealerId());
    		}
    		if(parentNode != null && !existNode(dealerTree, parentNode) && 
    				(parentVO.getDealerParent() == null || parentVO.getDealerParent().trim().equals("") ||parentVO.getDealerParent().trim().equals("0"))
    				){
    			int type = parentVO.getDealerType();
    			ITreeNode typeNode = dealerTree.findNode(String.valueOf(type));
    			if(typeNode != null ){
    				typeNode.addChild(parentNode);
    				dealerTree.findNode(parentNode.getId()).addChild(node);
    			}
    			
    		}else if(parentNode != null && !existNode(dealerTree, node) && existNode(dealerTree, parentNode)){
    			dealerTree.findNode(parentNode.getId()).addChild(node);
    		}else if(parentNode == null && !existNode(dealerTree, node)){
    			int type = dealerVO.getDealerType();
    			ITreeNode typeNode = dealerTree.findNode(String.valueOf(type));
    			if(typeNode != null){
    				typeNode.addChild(node);
    			}    			
    		}
    	}
		return dealerTree;
	}
	
    private static ITreeNode getNodeByIdFromColl(DealerColl dealerColl, String id){
    	ITreeNode node = null;
    	for(int i = 0; i < dealerColl.getRowCount(); i ++){
    		DealerVO vo = (DealerVO)dealerColl.getElement(i);
    		if(vo.getDealerId().equals(id)){
    			node = new TreeNode(vo.getDealerId(), vo.getDealerName(), vo.getDealerId());
    		}
    	}
    	return node;
    }
    
    //�ж������Ƿ����ĳ�ڵ�
    private static boolean existNode(ITree tree, ITreeNode node){
    	boolean exist = false;
    	ITreeNode treeNode = tree.findNode(node.getId());
    	if(treeNode != null){
    		exist = true;
    	}
    	return exist;
    }
	
    private static ITreeNode getTypeNode(DealerTypeVO vo){
    	String id = String.valueOf(vo.getDealerType());
    	String name = String.valueOf(vo.getDealerTypeName());
    	return new TreeNode(id, name, id);    	
    }
     

}
