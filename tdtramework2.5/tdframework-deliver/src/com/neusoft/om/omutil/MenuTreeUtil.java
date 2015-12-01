package com.neusoft.om.omutil;

import com.neusoft.om.bo.OrganManagementBO;
import com.neusoft.om.dao.area.AreaColl;
import com.neusoft.om.dao.area.AreaVO;
import com.neusoft.om.dao.menu.MenuColl;
import com.neusoft.om.dao.menu.MenuVO;
import com.neusoft.om.dao.organ.OrganColl;
import com.neusoft.om.dao.organdisplay.OrganDisplayColl;
import com.neusoft.om.dao.system.SystemColl;
import com.neusoft.om.dao.system.SystemVO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;
import com.neusoft.unieap.taglib.commontree.tree.impl.Tree;
import com.neusoft.unieap.taglib.commontree.tree.impl.TreeNode;
import com.neusoft.unieap.taglib.commontree.tree.itf.ITree;
import com.neusoft.unieap.taglib.commontree.tree.itf.ITreeNode;

public class MenuTreeUtil {
	/**
	 * ��װһ�ò˵���
	 * @param menuColl
	 * @param sysColl
	 * @return
	 */
    public static ITree constructTree(MenuColl menuColl, SystemColl sysColl){

        ITree menuTree = new Tree();
        ITreeNode root = new TreeNode("om", "���ܲ˵�", "om");//���ڵ�
        menuTree.expand("om");
        menuTree.setRoot(root);
    	for(int i = 0; i < sysColl.getRowCount(); i++){//ѭ���õ�ÿһ��һ����ϵͳ��Ӧ����֦
    		SystemVO sysVo = sysColl.getSystem(i);
    		if(sysVo.getParentSystemId() == null ||sysVo.getParentSystemId().trim().equals("") ){
    			ITreeNode treeNode = getTreeNode(menuColl, sysVo, sysColl);  
        		root.addChild(treeNode);
    		}    		
    	} 
    	return menuTree;
    }
    
    public static ITree constructTree(MenuColl menuColl, SystemColl sysColl,
    		boolean showChildTree,boolean treeControl){

        ITree menuTree = new Tree();
        ITreeNode root = new TreeNode("om", "��ϵͳ", "om");//���ڵ�
        menuTree.expand("om");
        menuTree.setRoot(root);
    	for(int i = 0; i < sysColl.getRowCount(); i++){//ѭ���õ�ÿһ��һ����ϵͳ��Ӧ����֦
    		SystemVO sysVo = sysColl.getSystem(i);
    		if(sysVo.getParentSystemId() == null ||sysVo.getParentSystemId().trim().equals("") ){
    			ITreeNode treeNode = getTreeNode(menuColl, sysVo, sysColl,showChildTree,treeControl);  
        		root.addChild(treeNode);
    		}    		
    	}
    	return menuTree;
    }
    
    public static ITree constructTree(MenuColl menuColl, SystemColl sysColl,
    		boolean showChildTree,boolean treeControl,String nodeId){

        ITree menuTree = new Tree();
        ITreeNode root = new TreeNode(nodeId, "���ܲ˵�", nodeId);//���ڵ�
        menuTree.expand(nodeId);
        menuTree.setRoot(root);
    	for(int i = 0; i < sysColl.getRowCount(); i++){//ѭ���õ�ÿһ��һ����ϵͳ��Ӧ����֦
    		SystemVO sysVo = sysColl.getSystem(i);
    		if(sysVo.getParentSystemId()==null || sysVo.getParentSystemId().trim().equals("")){
    			ITreeNode treeNode = getTreeNode(menuColl, sysVo, sysColl,showChildTree,treeControl,nodeId);  
        		root.addChild(treeNode);
    		}    		
    	}
    	return menuTree;
    }
    /**
     * �õ�һ���Ӳ˵�Ϊ��ʼ�ڵ��һ����֧
     * @param menuColl
     * @param sysVO
     * @param sysColl
     * @return
     */
    private static ITreeNode getTreeNode(MenuColl menuColl, SystemVO sysVO, SystemColl sysColl){
    	ITreeNode newNode = new TreeNode(sysVO.getSystemId(), sysVO.getSystemName(),sysVO.getSystemId());
    	SystemColl childSysColl = getSubSysColl(sysVO, sysColl);
    	if(childSysColl.getRowCount() != 0){  //������ڶ�����ϵͳ��ѭ���õ��Զ�����ϵͳΪ��ʼ�ڵ�Ĳ˵���֧ 		
        	for(int i = 0; i < childSysColl.getRowCount(); i ++){ 
        		SystemVO childSysVO = childSysColl.getSystem(i);
        		//ITreeNode childNode = getMenuNode(menuColl, childSysVO);
        		ITreeNode childNode = getMenuNode(menuColl, childSysVO);
        		newNode.addChild(childNode);
        	}  
    	}else{//���û�ж�����ϵͳ��õ���һ����ϵͳΪ��ʼ�ڵ�Ĳ˵���֧
    		newNode = getMenuNode(menuColl, sysVO);
    	}    	
    	return newNode;
    }
    
    private static ITreeNode getTreeNode(MenuColl menuColl, SystemVO sysVO, 
    		SystemColl sysColl,boolean showChildTree,boolean treeControl){
    	
    	ITreeNode newNode = new TreeNode(sysVO.getSystemId(), sysVO.getSystemName(),sysVO.getSystemId());
    	SystemColl childSysColl = getSubSysColl(sysVO, sysColl);
    	if(childSysColl.getRowCount() != 0){  //������ڶ�����ϵͳ��ѭ���õ��Զ�����ϵͳΪ��ʼ�ڵ�Ĳ˵���֧ 		
        	for(int i = 0; i < childSysColl.getRowCount(); i ++){ 
        		SystemVO childSysVO = childSysColl.getSystem(i);
        		ITreeNode childNode = getMenuNode(menuColl, childSysVO,showChildTree,treeControl);
        		childNode.setCheckBoxReadOnly(true);
        		newNode.addChild(childNode);
        	}  
    	}else{//���û�ж�����ϵͳ��õ���һ����ϵͳΪ��ʼ�ڵ�Ĳ˵���֧
    		newNode = getMenuNode(menuColl, sysVO,!showChildTree,treeControl);
    	}    	
    	return newNode;
    }
    
    private static ITreeNode getTreeNode(MenuColl menuColl, SystemVO sysVO, 
    		SystemColl sysColl,boolean showChildTree,boolean treeControl,String nodeId){
    	
    	ITreeNode newNode = new TreeNode(sysVO.getSystemId(), sysVO.getSystemName(),sysVO.getSystemId());
    	SystemColl childSysColl = getSubSysColl(sysVO, sysColl);
    	if(childSysColl.getRowCount() != 0){  //������ڶ�����ϵͳ��ѭ���õ��Զ�����ϵͳΪ��ʼ�ڵ�Ĳ˵���֧ 		
        	for(int i = 0; i < childSysColl.getRowCount(); i ++){ 
        		SystemVO childSysVO = childSysColl.getSystem(i);
        		ITreeNode childNode = getMenuNode(menuColl, childSysVO,showChildTree,treeControl);
        		childNode.setCheckBoxReadOnly(true);
        		newNode.addChild(childNode);
        	}  
    	}else{//���û�ж�����ϵͳ��õ���һ����ϵͳΪ��ʼ�ڵ�Ĳ˵���֧
    		newNode = getMenuNode(menuColl, sysVO,!showChildTree,treeControl);
    	}    	
    	return newNode;
    }
    /**
     * �õ�������ϵͳ����
     * @param parentSysVO
     * @param sysColl
     * @return
     */
    private static SystemColl getSubSysColl(SystemVO parentSysVO, SystemColl sysColl){
    	SystemColl childSysColl = new SystemColl();
    	String parentId = parentSysVO.getSystemId();
    	for(int i = 0; i < sysColl.getRowCount(); i ++){
    		SystemVO tempVO = sysColl.getSystem(i);
    		if(tempVO != null && tempVO.getParentSystemId()!= null 
    		&& tempVO.getParentSystemId().intern().equals(parentId.intern())){
    			childSysColl.addSystem(tempVO);
    		}
    	}
    	return childSysColl;
    }
    /**
     * �õ��Դ�����ϵͳΪ��ʼ�ڵ�Ĵ��в˵���һ����֧
     * @param menuColl
     * @param sysVO
     * @return
     */
    private static ITreeNode getMenuNode(MenuColl menuColl, SystemVO sysVO){
    	ITreeNode menuNode = new TreeNode(sysVO.getSystemId(),sysVO.getSystemName(),sysVO.getSystemId());
    	MenuColl limbMenuColl = new MenuColl();
    	//�õ��˵����������ڸ���ϵͳ�Ĳ���
    	for(int i=0;i<menuColl.getRowCount(); i ++){
    		MenuVO tempMenuVo = menuColl.getMenu(i);
    		if(tempMenuVo.getSystemId().intern().equals(sysVO.getSystemId().intern()) ){
    			limbMenuColl.addMenu(tempMenuVo);
    		}
    	}
    	limbMenuColl = orderMenuColl(limbMenuColl);//��menu�еĸ����ŵ�ǰ�� 
    	for(int i = 0 ; i < limbMenuColl.getRowCount(); i ++){
    		MenuVO sMenuVO = limbMenuColl.getMenu(i);
    		//����һ���ڵ�
    		ITreeNode subChildNode = new TreeNode(sMenuVO.getMenuId(),sMenuVO.getMenuName(),sMenuVO.getMenuId());
    		//�����֧��û���κ��ӽڵ㣬�򽫵�ǰ�ڵ����
    		if(menuNode.getChildCount() == 0){
    			menuNode.addChild(subChildNode);
    		}//�������Ѿ����ڵ��ӽڵ㲢�еĲ˵�
    		else if(sMenuVO.getParentMenuId() == null ||sMenuVO.getParentMenuId().trim().equals("")){
    			menuNode.addChild(subChildNode);
    		}//ѭ��������С�Ӳ˵���֧
    		for(int j = 0; j < menuNode.getChildren().size(); j++){
    			ITreeNode tempNode = (ITreeNode)menuNode.getChildren().get(j);
    			if(tempNode.getId().equals(sMenuVO.getParentMenuId())){    				
    				tempNode.addChild(subChildNode);    				
    			} 
    		}
    		
    		for(int j = 0; j < menuNode.getChildren().size(); j++){
    			ITreeNode tempNode = (ITreeNode)menuNode.getChildren().get(j);
    			for(int k = 0; k < tempNode.getChildCount(); k ++){
    				ITreeNode minMenuNode = (ITreeNode)tempNode.getChildren().get(k);
    				if(minMenuNode.getId().equals(sMenuVO.getParentMenuId())){
    					minMenuNode.addChild(subChildNode);
    				}
    			}
    		}
    	}
    	return menuNode;
    }
    
    private static ITreeNode getMenuNode(MenuColl menuColl, SystemVO sysVO,boolean haveSecondMenu,boolean treeControl){
    	ITreeNode menuNode = new TreeNode(sysVO.getSystemId(),sysVO.getSystemName(),sysVO.getSystemId());
    	//if(sysVO.getSystemId().equals("80")){
    	//	System.out.println("��ҳ�� "+sysVO.getSystemId());
    	//}
    	MenuColl limbMenuColl = new MenuColl();
    	//�õ��˵����������ڸ���ϵͳ�Ĳ���
    	for(int i=0;i<menuColl.getRowCount(); i ++){
    		MenuVO tempMenuVo = menuColl.getMenu(i);
    		if(tempMenuVo.getSystemId().intern().equals(sysVO.getSystemId().intern()) ){
    			if(haveSecondMenu){
    				if(treeControl){
    					if(tempMenuVo.getLayer()==1){
        					limbMenuColl.addMenu(tempMenuVo);
        				}
    				}else{
    					limbMenuColl.addMenu(tempMenuVo);
    				}	
    			}
//    			else{
//    				if(tempMenuVo.getParentMenuId()==null){
//    					limbMenuColl.addMenu(tempMenuVo);
//    				}
//    			}
    		}
    	}
    	limbMenuColl = orderMenuColl(limbMenuColl);//��menu�еĸ����ŵ�ǰ�� 
    	for(int i = 0 ; i < limbMenuColl.getRowCount(); i ++){
    		MenuVO sMenuVO = limbMenuColl.getMenu(i);
    		//����һ���ڵ�
    		ITreeNode subChildNode = new TreeNode(sMenuVO.getMenuId(),sMenuVO.getMenuName(),sMenuVO.getMenuId());
    		//�����֧��û���κ��ӽڵ㣬�򽫵�ǰ�ڵ����
    		if(menuNode.getChildCount() == 0){
    			subChildNode.setCheckBoxReadOnly(true);
    			menuNode.addChild(subChildNode);
    		}//�������Ѿ����ڵ��ӽڵ㲢�еĲ˵�
    		else if(sMenuVO.getParentMenuId() == null ||sMenuVO.getParentMenuId().trim().equals("")){
    			subChildNode.setCheckBoxReadOnly(true);
    			menuNode.addChild(subChildNode);
    		}//ѭ��������С�Ӳ˵���֧
    		if(haveSecondMenu){
	    		for(int j = 0; j < menuNode.getChildren().size(); j++){
	    			ITreeNode tempNode = (ITreeNode)menuNode.getChildren().get(j);
	    			if(tempNode.getId().equals(sMenuVO.getParentMenuId())){
	    				//subChildNode.setCheckBoxReadOnly(true);
	    				tempNode.addChild(subChildNode);    				
	    			} 
	    		}
	    		
	    		for(int j = 0; j < menuNode.getChildren().size(); j++){
	    			ITreeNode tempNode = (ITreeNode)menuNode.getChildren().get(j);
	    			for(int k = 0; k < tempNode.getChildCount(); k ++){
	    				ITreeNode minMenuNode = (ITreeNode)tempNode.getChildren().get(k);
	    				if(minMenuNode.getId().equals(sMenuVO.getParentMenuId())){
	    					//subChildNode.setCheckBoxReadOnly(true);
	    					minMenuNode.addChild(subChildNode);
	    				}
	    			}
	    		}
    		}
    	}
    	return menuNode;
    }
    /**
     * ��װһ�ÿ�ѡ�����
     * @param menuColl ������ʾ�Ĳ˵�����
     * @param sysColl  ������ʾ����ϵͳ����
     * @param selectMenuColl ѡ�еĲ˵�����
     * @return
     */
    public static ITree constructTree(MenuColl menuColl,SystemColl sysColl,MenuColl selectMenuColl){

        ITree menuTree = new Tree();
        
        ITreeNode root = new TreeNode("om", "���ܲ˵�", "om");//���ڵ�
        menuTree.expand("om");
        menuTree.setRoot(root);
    	for(int i = 0; i < sysColl.getRowCount(); i++){//ѭ���õ�ÿһ��һ����ϵͳ��Ӧ����֦
    		SystemVO sysVo = sysColl.getSystem(i);
    		if(sysVo.getParentSystemId() == null ||sysVo.getParentSystemId().trim().equals("") ){
    			ITreeNode treeNode = getTreeNode(menuColl, sysVo, sysColl);  
        		root.addChild(treeNode);
    		}    		
    	}
    	for(int i=0;i<selectMenuColl.getRowCount(); i++){
    		MenuVO menuVo = selectMenuColl.getMenu(i);
    		String menuId = menuVo.getMenuId();
    		menuTree.select(menuId);    		
    		SystemVO sysVO = sysColl.getSystem(menuVo.getSystemId());
    		if(sysVO != null){
    			menuTree.select(sysVO.getSystemId());
    			String parentSysId = sysVO.getParentSystemId();
    			if(parentSysId != null 
    					&& !parentSysId.trim().equals("")
    					&& sysColl.getSystem(parentSysId)!=null){
    				menuTree.select(parentSysId);
    			}
    		}    		
    	}
    	return menuTree;
    }
    
    public static ITree constructTree(MenuColl menuColl,SystemColl sysColl,
    		MenuColl selectMenuColl,boolean showChildTree,boolean treeControl){
        ITree menuTree = new Tree();
        
        ITreeNode root = new TreeNode("om", "��ϵͳ", "om");//���ڵ�
        menuTree.expand("om");
        menuTree.setRoot(root);
    	for(int i = 0; i < sysColl.getRowCount(); i++){//ѭ���õ�ÿһ��һ����ϵͳ��Ӧ����֦
    		SystemVO sysVo = sysColl.getSystem(i);
    		if(sysVo.getParentSystemId() == null ||sysVo.getParentSystemId().trim().equals("") ){
    			ITreeNode treeNode = getTreeNode(menuColl, sysVo, sysColl,showChildTree,treeControl); 
    			treeNode.setCheckBoxReadOnly(true);
        		root.addChild(treeNode);
    		}    		
    	}
    	for(int i=0;i<selectMenuColl.getRowCount(); i++){
    		MenuVO menuVo = selectMenuColl.getMenu(i);
    		String menuId = menuVo.getMenuId();
    		menuTree.select(menuId); 
    		//menuTree.findNode(menuId).setCheckBoxReadOnly(true);    		
    		SystemVO sysVO = sysColl.getSystem(menuVo.getSystemId());
    		if(sysVO != null){
    			menuTree.select(sysVO.getSystemId());
    			String parentSysId = sysVO.getParentSystemId();
    			if(parentSysId != null 
    					&& !parentSysId.trim().equals("")
    					&& sysColl.getSystem(parentSysId)!=null){
    				menuTree.select(parentSysId);
    			}
    		}
    	}
    	
    	return menuTree;
    }

    public static ITree constructAreaTree(AreaColl areaColl,OrganColl organColl){
    	ITree areaTree = new Tree();
    	AreaVO rootVO = getRootArea(areaColl);
    	ITreeNode root = new TreeNode(rootVO.getAreaId(), rootVO.getAreaName(), rootVO.getAreaId());
    	areaTree.setRoot(root);
    	for(int i = 0; i < areaColl.getRowCount(); i++){
    		AreaVO areaVO = areaColl.getArea(i);
    		ITreeNode areaBranch = getAreaBranch(areaVO, areaColl, organColl);
    	}
    	return areaTree;
    }
    private static AreaVO getRootArea(AreaColl areaColl){
    	AreaVO areaVO = new AreaVO();
    	for(int i = 0; i < areaColl.getRowCount(); i++){
    		AreaVO tempVO = areaColl.getArea(i);
    		if(tempVO.getParentAreaId() == null || tempVO.getParentAreaId()==""){
    			areaVO = tempVO;
    		}
    	}
    	return areaVO;
    }
    private static ITreeNode getAreaBranch(AreaVO vo,AreaColl areaColl, OrganColl organColl){
    	ITreeNode areaBranchNode = new TreeNode(vo.getAreaId(), vo.getAreaName(), vo.getAreaId());
    	InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
    	AppContext appContext = new AppContextImpl();
    	appContext.setApplicationName("om");
    	OrganManagementBO service =(OrganManagementBO) factory.getInteractionObject("organManagementFacade",	appContext);

    	try {
			OrganDisplayColl organDisplayColl = service.getOrganDisplayInfo(vo.getAreaId());
		} catch (ServiceException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDisplayAction--getOrganDisplayInfo:"+e.getMessage());
		}
    	return areaBranchNode;
    }
    
    private static MenuColl orderMenuColl(MenuColl coll){
    	MenuColl orderColl = new MenuColl();
    	for(int i =0; i < coll.getRowCount(); i++){
    		MenuVO vo = coll.getMenu(i);
    		String parentMenuId = vo.getParentMenuId();
    		if(parentMenuId == null || parentMenuId.trim().equals("")){
    			orderColl.addElement(vo);
    		}
    	}
    	for(int i =0; i < coll.getRowCount(); i++){
    		MenuVO vo = coll.getMenu(i);
    		String parentId = vo.getParentMenuId();
    		MenuVO parentVO = coll.getMenu(parentId);
    		if(parentVO != null && exist(coll,parentVO) && !exist(orderColl, parentVO)){
    			orderColl.addMenu(parentVO);
    		}
    	}
    	for(int i=0;i<coll.getRowCount();i++){
    		MenuVO vo = coll.getMenu(i);
    		String parentMenuId = vo.getParentMenuId();
    		if(parentMenuId != null && !parentMenuId.trim().equals("") && !exist(orderColl, vo)){
    			orderColl.addElement(vo);
    		}
    	}
    	return orderColl;
    }
    private static boolean exist(MenuColl coll, MenuVO vo){
    	boolean exist = false;
    	for(int i=0; i < coll.getRowCount(); i++ ){
    		MenuVO menu = coll.getMenu(i);
    		String menuId = menu.getMenuId();
    		String voId = vo.getMenuId();
    		if(menuId != null && !menuId.trim().equals("") && voId != null && !voId.trim().equals("") && menuId.equals(voId)){
    			exist = true;
    		}
    	}
    	return exist;
    }
    private static boolean existSys(SystemColl coll, SystemVO vo){
    	boolean exist = false;
    	for(int i=0; i < coll.getRowCount(); i++ ){
    		SystemVO sys = coll.getSystem(i);
    		String sysId = sys.getSystemId();
    		String voId = vo.getSystemId();
    		if(sysId != null && !sysId.trim().equals("") && voId != null && !voId.trim().equals("") && sysId.equals(voId)){
    			exist = true;
    		}
    	}
    	return exist;
    }
    
    public static ITree constructFirstLevelTree(SystemColl sysColl,	SystemColl selectSysColl){
        ITree menuTree = new Tree();
        
        ITreeNode root = new TreeNode("om", "��ϵͳ", "om");//���ڵ�
        menuTree.expand("om");
        menuTree.setRoot(root);
    	for(int i = 0; i < sysColl.getRowCount(); i++){//ѭ���õ�ÿһ��һ����ϵͳ��Ӧ����֦
    		SystemVO sysVO = sysColl.getSystem(i);
    		ITreeNode newNode = new TreeNode(sysVO.getSystemId(), sysVO.getSystemName(),sysVO.getSystemId());
    		newNode.setCheckBoxReadOnly(true);
        	root.addChild(newNode);
        	if(existSys(selectSysColl,sysVO)){
        		menuTree.select(sysVO.getSystemId());
        	}
    	}  
    	
    	return menuTree;
    }
    
    public static ITree constructTreeAnyLevel(MenuColl menuColl,SystemColl sysColl,MenuColl selectMenuColl){
        ITree menuTree = new Tree();        
        ITreeNode root = new TreeNode("om", "���ܲ˵�", "om");//���ڵ�
        menuTree.expand("om");
        menuTree.setRoot(root);
        //�õ���ϵͳ��
    	for(int i = 0; i < sysColl.getRowCount(); i++){
    		SystemVO sysVo = sysColl.getSystem(i);
    		ITreeNode node = new TreeNode(sysVo.getSystemId(),sysVo.getSystemName(),sysVo.getSystemId());
    		ITreeNode[] parentNodes = menuTree.getNodePath(sysVo.getParentSystemId());
    		if(parentNodes.length == 0 ){
    			root.addChild(node);
    		}else{
    			for(int j=0; j < parentNodes.length; j++){
    				if(parentNodes[j].getId().equals(sysVo.getParentSystemId())){
    					parentNodes[j].addChild(node);
    				}
    			}
    		}
    	}
    	//����ϵͳ�������Ӳ˵���
    	for(int i=0; i <menuColl.getRowCount(); i++){
    		MenuVO menuVO = menuColl.getMenu(i);
    		ITreeNode node = new TreeNode(menuVO.getMenuId(), menuVO.getMenuName(), menuVO.getMenuId());
    		ITreeNode[] parentNodes = menuTree.getNodePath(menuVO.getParentMenuId());
    		ITreeNode[] sysNodes = menuTree.getNodePath(menuVO.getSystemId());
    		if(parentNodes.length == 0){
    			if( sysNodes.length != 0){
    				for(int j=0; j <sysNodes.length; j++){
    					String systemId = menuVO.getSystemId();
        				if(systemId != null && sysNodes[j].getId().equals(systemId)){
        					sysNodes[j].addChild(node);
        				}
        			}
    			}
    		}else{
    			for(int j=0; j< parentNodes.length ; j++){
    				String parentMenuId = menuVO.getParentMenuId();
    				if(parentMenuId != null && parentNodes[j].getId().equals(parentMenuId)){
    					parentNodes[j].addChild(node);
    				}
    			}
    		}
    	}
    	
    	//ѡ�в˵�����ϵͳ
    	for(int i=0;i<selectMenuColl.getRowCount(); i++){
    		MenuVO menuVo = selectMenuColl.getMenu(i);
    		String menuId = menuVo.getMenuId();
    		menuTree.select(menuId);    		
    		SystemVO sysVO = sysColl.getSystem(menuVo.getSystemId());
    		if(sysVO != null){
    			menuTree.select(sysVO.getSystemId());
    			String parentSysId = sysVO.getParentSystemId();
    			if(parentSysId != null 
    					&& !parentSysId.trim().equals("")
    					&& sysColl.getSystem(parentSysId)!=null){
    				menuTree.select(parentSysId);
    			}
    		}    		
    	}
    	return menuTree;
    }
    public static ITree constructTreeAnyLevel(MenuColl menuColl, SystemColl sysColl){

        ITree menuTree = new Tree();        
        ITreeNode root = new TreeNode("om", "���ܲ˵�", "om");//���ڵ�
        menuTree.expand("om");
        menuTree.setRoot(root);
        //�õ���ϵͳ��
    	for(int i = 0; i < sysColl.getRowCount(); i++){
    		SystemVO sysVo = sysColl.getSystem(i);
    		ITreeNode node = new TreeNode(sysVo.getSystemId(),sysVo.getSystemName(),sysVo.getSystemId());
    		ITreeNode[] parentNodes = menuTree.getNodePath(sysVo.getParentSystemId());
    		if(parentNodes.length == 0 ){
    			root.addChild(node);
    		}else{
    			for(int j=0; j < parentNodes.length; j++){
    				if(parentNodes[j].getId().equals(sysVo.getParentSystemId())){
    					parentNodes[j].addChild(node);
    				}
    			}
    		}
    	}
    	//����ϵͳ�������Ӳ˵���
    	for(int i=0; i <menuColl.getRowCount(); i++){
    		MenuVO menuVO = menuColl.getMenu(i);
    		ITreeNode node = new TreeNode(menuVO.getMenuId(), menuVO.getMenuName(), menuVO.getMenuId());
    		ITreeNode[] parentNodes = menuTree.getNodePath(menuVO.getParentMenuId());
    		ITreeNode[] sysNodes = menuTree.getNodePath(menuVO.getSystemId());
    		if(parentNodes.length == 0){
    			if( sysNodes.length != 0){
    				for(int j=0; j <sysNodes.length; j++){
    					String systemId = menuVO.getSystemId();
        				if(systemId != null && sysNodes[j].getId().equals(systemId)){
        					sysNodes[j].addChild(node);
        				}
        			}
    			}
    		}else{
    			for(int j=0; j< parentNodes.length ; j++){
    				String parentMenuId = menuVO.getParentMenuId();
    				if(parentMenuId != null && parentNodes[j].getId().equals(parentMenuId)){
    					parentNodes[j].addChild(node);
    				}
    			}
    		}    		
    	}
    	return menuTree;
    }
}
