/*
 * Created on 2006-3-1
 * 
 * TODO To change the template for this generated file go to Window -
 * Preferences - Java - Code Style - Code Templates
 */
package com.neusoft.om.action.menu;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.om.dao.menu.MenuColl;
import com.neusoft.om.dao.menu.MenuDAO;
import com.neusoft.om.dao.menu.MenuVO;
import com.neusoft.om.dao.system.SystemColl;
import com.neusoft.om.dao.system.SystemDAO;
import com.neusoft.om.dao.system.SystemVO;
import com.neusoft.tdframework.web.struts.BaseAction;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;
import com.neusoft.unieap.taglib.commontree.tree.impl.Tree;
import com.neusoft.unieap.taglib.commontree.tree.impl.TreeNode;
import com.neusoft.unieap.taglib.commontree.tree.itf.ITree;
import com.neusoft.unieap.taglib.commontree.tree.itf.ITreeNode;
import com.neusoft.unieap.util.RequestUtil;
import com.neusoft.unieap.util.ResponseUtil;

public class CommonTreeAction extends BaseAction {
	/**
	 *  
	 */
	public ActionForward service(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) {

		HttpSession session = request.getSession();

		InteractionObjectFactory factory = InteractionObjectFactory
				.getInstance();
		AppContext appContext = new AppContextImpl();
		appContext.setApplicationName("");

		MenuDAO dao = (MenuDAO) factory.getInteractionObject("menuDAO",
				appContext);
		MenuColl coll = (MenuColl) dao.getAllMenuInfo();
		SystemDAO sdao = (SystemDAO) factory.getInteractionObject("systemDAO",
				appContext);
		SystemColl scoll = (SystemColl) sdao.getAllSystemInfo();
		int count = coll.getRowCount();
		ITree tree = new Tree();
		ITreeNode movies = new TreeNode("om", "²Ëµ¥", "om");
		tree.expand("om");
		tree.setRoot(movies);
		for (int i = 0; i < count; i++) {
			MenuVO vo = (MenuVO) coll.getMenu(i);
			ITreeNode node = new TreeNode(vo.getMenuId(), vo.getMenuName(), vo
					.getMenuName());
			ITreeNode[] nodes = tree.getNodePath(vo.getMenuId());
			if (nodes.length == 0) {
				addNode(tree, node, vo, coll, scoll);
			}
		}
		session.setAttribute("eap", tree);
		return mapping.findForward("commonTree");
	}

	/**
	 * 
	 * @param pMenuId
	 * @param coll
	 * @return
	 */
	private ITreeNode getNode(MenuVO vo) {
		ITreeNode node = null;
		if (vo != null)
			node = new TreeNode(vo.getMenuId(), vo.getMenuName(), vo
					.getMenuName());
		return node;
	}

	/**
	 * 
	 * @param menuId
	 * @param coll
	 * @return
	 */
	private MenuVO getMenuVO(String menuId, MenuColl coll) {
		MenuVO vo = null;
		for (int i = 0; i < coll.getRowCount(); i++) {
			MenuVO result = (MenuVO) coll.getMenu(i);
			if (result.getMenuId().equals(menuId)) {
				vo = result;
				break;
			}
		}
		return vo;
	}

	/**
	 * 
	 * @param tree
	 * @param node
	 * @param vo
	 * @param coll
	 * @param scoll
	 */
	private void addNode(ITree tree, ITreeNode node, MenuVO vo, MenuColl coll,
			SystemColl scoll) {
		if (vo == null)
			return;
		ITreeNode[] nodes = tree.getNodePath(vo.getParentMenuId());
		if (nodes.length == 0) {
			MenuVO parentVo = getMenuVO(vo.getParentMenuId(), coll);
			if (parentVo == null) {
				//parentVo = getSysMenuVO(vo.getSystemId(),scoll);
				if (vo.getLayer() == 1) {
					MenuVO sysMenuVO = getSysMenuVO(vo.getSystemId(),scoll);
					if(sysMenuVO.getParentMenuId()==null||sysMenuVO.getParentMenuId().equals("")){
						addSystemNode(tree, getNode(sysMenuVO), sysMenuVO, scoll);
						ITreeNode[] level2Nodes = tree.getNodePath(vo.getSystemId());
						level2Nodes[level2Nodes.length - 1].addChild(getNode(vo));
					}else{
						MenuVO parentSysMenuVO = getSysMenuVO(sysMenuVO.getParentMenuId(),scoll);
						ITreeNode[] level1Nodes = tree.getNodePath(parentSysMenuVO.getMenuId());
						if(level1Nodes.length==0){
							addSystemNode(tree, getNode(parentSysMenuVO), parentSysMenuVO, scoll);
							level1Nodes = tree.getNodePath(parentSysMenuVO.getMenuId());
						}
						ITreeNode[] level2Nodes = tree.getNodePath(sysMenuVO.getMenuId());
						if(level2Nodes.length==0){
							level1Nodes[level1Nodes.length-1].addChild(getNode(sysMenuVO));
							level2Nodes = tree.getNodePath(sysMenuVO.getMenuId());
						}
						level2Nodes[level2Nodes.length-1].addChild(node);
					}					 
				}
				return;
			}
			addNode(tree, getNode(parentVo), parentVo, coll, scoll);
		} else {
			nodes[nodes.length - 1].addChild(node);
		}

	}
	
	private MenuVO getSysMenuVO(String systemId ,SystemColl scoll){
		MenuVO sysMenuVO = new MenuVO();
		sysMenuVO.setMenuId(systemId);
		sysMenuVO.setMenuName(scoll.getSystem(systemId).getSystemName());
		sysMenuVO.setParentMenuId(scoll.getSystem(systemId).getParentSystemId());
		return sysMenuVO;
	}

	/**
	 * 
	 * @param tree
	 * @param node
	 * @param vo
	 * @param scoll
	 */
	private void addSystemNode(ITree tree, ITreeNode node, MenuVO vo,
			SystemColl scoll) {
		ITreeNode[] nodes = tree.getNodePath(vo.getMenuId());
		if (nodes.length == 0)
			tree.getRoot().addChild(
					new TreeNode(vo.getMenuId(), vo.getMenuName(), vo.getMenuName()));
	}

	/**
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 */
	public ActionForward modifyTree(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) {
		RequestUtil requestUtil = new RequestUtil(request);
		ResponseUtil responseUtil = new ResponseUtil(response);
		String selectID = (String) requestUtil.getParameter("select");
		String treeFlag = (String) requestUtil.getParameter("treeFlag");
		Tree tree = (Tree) request.getSession().getAttribute(treeFlag);
		ITreeNode node = tree.findNode(selectID);
		if (requestUtil.getParameter("treeid") != null) {
			String id = requestUtil.getParameter("treeid");

			if (!(id.equals(selectID) || tree.findNode(id) == null)) {
				try {
					response.getWriter().write("·Ç·¨ID");
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				return null;
			}

			node.setId(id);
		}
		if (requestUtil.getParameter("treename") != null) {
			String name = requestUtil.getParameter("treename");
			node.setName(name);
		}
		if (requestUtil.getParameter("treetooltip") != null) {
			String tooltip = (String) requestUtil.getParameter("treetooltip");
			node.setToolTip(tooltip);
		}
		if (requestUtil.getParameter("nodeValue") != null) {
			String value = (String) requestUtil.getParameter("nodeValue");
			node.setValue(value);
		}
		try {
			response.getWriter().write("OK");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		//jsContent.setNextMethod("eaptree","partyFreshSelf");
		return mapping.findForward(null);
	}

}
