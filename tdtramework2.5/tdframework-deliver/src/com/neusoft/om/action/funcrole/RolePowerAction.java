package com.neusoft.om.action.funcrole;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.om.dao.funcrole.FuncRoleColl;
import com.neusoft.om.dao.funcrole.FuncRoleDAO;
import com.neusoft.om.dao.funcrole.FuncRoleVO;
import com.neusoft.om.dao.menu.MenuColl;
import com.neusoft.om.dao.menu.MenuDAO;
import com.neusoft.om.dao.menu.MenuVO;
import com.neusoft.om.dao.system.SystemColl;
import com.neusoft.om.dao.system.SystemDAO;
import com.neusoft.om.dao.system.SystemVO;
import com.neusoft.tdframework.web.struts.TDDispatchAction;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;
import com.neusoft.unieap.taglib.commontree.tree.impl.TreeUpdater;
import com.neusoft.unieap.taglib.commontree.tree.itf.ITree;
import com.neusoft.unieap.taglib.commontree.tree.itf.ITreeNode;
import com.neusoft.unieap.taglib.commontree.treeTag.TreeRender;
import com.neusoft.unieap.util.RequestUtil;
import com.neusoft.unieap.util.ResponseUtil;

public class RolePowerAction extends TDDispatchAction{
	
	public ActionForward selectAll(ActionMapping actionMapping,ActionForm actionForm,
			HttpServletRequest request,HttpServletResponse response){	
		
	  	RequestUtil requestUtil=new RequestUtil(request);
	    ResponseUtil responseUtil=new ResponseUtil(response);
		ITree menuTree = (ITree)request.getSession().getAttribute("menuTree");
		//menuTree.selectAll();
		menuTree.getExpandedNodes().clear();
	
	    menuTree.unSelectAll();
		menuTree.expand(menuTree.getRoot().getId());
		request.setAttribute("loadMode","ALLLOAD");
		request.setAttribute("needCheckBox", "true");
		return actionMapping.findForward("viewroleom");
	}
	
	public ActionForward unSelectAll(ActionMapping actionMapping,ActionForm actionForm,
			HttpServletRequest request,HttpServletResponse response){	
		
	  	RequestUtil requestUtil=new RequestUtil(request);
	    ResponseUtil responseUtil=new ResponseUtil(response);
		ITree menuTree = (ITree)request.getSession().getAttribute("menuTree");
		menuTree.getExpandedNodes().clear();	
	    menuTree.unSelectAll();
        menuTree.collapseAll();
		menuTree.expand(menuTree.getRoot().getId());
		request.setAttribute("loadMode","PARTLOAD");
		request.setAttribute("needCheckBox", "true");
		return actionMapping.findForward("viewroleom");
	}
	
	public ActionForward clearSession(ActionMapping actionMapping,ActionForm actionForm,
			HttpServletRequest request,HttpServletResponse response){	
		
	  	RequestUtil requestUtil=new RequestUtil(request);
	    ResponseUtil responseUtil=new ResponseUtil(response);
	    request.getSession().removeAttribute("adminMenuColl");
	    request.getSession().removeAttribute("roleMenuColl");
	    request.getSession().removeAttribute("systemColl");
		return null;
	}
	
    /**
     * 功能角色赋权,提交
     * @param mapping
     * @param request
     * @param response
     * @return
     */
    public ActionForward doGrantRole(ActionMapping actionMapping,ActionForm actionForm,
			HttpServletRequest request,HttpServletResponse response) {
    	long start = System.currentTimeMillis();
	  	RequestUtil requestUtil=new RequestUtil(request);
	    ResponseUtil responseUtil=new ResponseUtil(response);
    	int delCode = 1;
        int addCode = 1;
        String message = "赋权成功";
    	InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
    	AppContext appContext = new AppContextImpl();
    	appContext.setApplicationName("om");
    	MenuDAO menuDao = (MenuDAO) factory.getInteractionObject("menuDAO",	appContext);
    	SystemDAO sysDao = (SystemDAO)factory.getInteractionObject("systemDAO",appContext);
    	FuncRoleDAO funcRoleDao = (FuncRoleDAO)factory.getInteractionObject("funcRoleDAO",appContext);
    	//得到页面通用树选中节点数组
    	String[] treeNodes = requestUtil.getParameters(ITreeNode.checknode+"menuTree");
    	SystemColl allSystem = (SystemColl)request.getSession().getAttribute("systemColl");
    	MenuColl allMenu = (MenuColl)request.getSession().getAttribute("adminMenuColl");
        String sRoleId = (String)requestUtil.getAttribute("roleId");
        int roleId = 0;
        if(sRoleId != null && !sRoleId.trim().equals("")){
        	roleId = Integer.valueOf(sRoleId).intValue();
        }
        //原菜单集合
        MenuColl oldMenuColl = (MenuColl)request.getSession().getAttribute("roleMenuColl");
        //MenuColl oldMenuColl = menuDao.getMenuCollByRoleId(roleId);
        //选中的菜单和子系统集合
    	MenuColl menuColl = new MenuColl();
    	SystemColl sysColl = new SystemColl();
    	//过滤,得到选中的子系统和菜单集合,按照约定的规则,菜单编码与系统编码不会出现重复,暂时没有考虑出现重复的情况
    	if(treeNodes != null){
        	for(int i = 0; i < treeNodes.length; i++){
        		String nodeId = treeNodes[i];
        		SystemVO sysVO = getSystemById(allSystem, nodeId);
        		if(sysVO != null && sysVO.getSystemId()!= null && sysVO.getSystemId() != ""){
        			sysColl.addSystem(sysVO);
        		}
        		MenuVO menuVO = getMenuById(allMenu, nodeId);
        		if(menuVO != null && menuVO.getMenuId() != null && menuVO.getMenuId() != ""){
        			menuColl.addMenu(menuVO);
        		}
        	}
    	}
    	
    	//过滤得到新选中的菜单集合    	
    	FuncRoleColl funcRoleColl = new FuncRoleColl();    	
    	for(int i = 0; i < menuColl.getRowCount(); i ++){
    		MenuVO menuVO = menuColl.getMenu(i);
    		if(oldMenuColl.getMenu(menuVO.getMenuId())==null){//如果旧集合中不包括某菜单,则将其增加到角色菜单关系表中
    			FuncRoleVO funcRoleVo = new FuncRoleVO();
    			funcRoleVo.setAdminStatus(1);
    			funcRoleVo.setExecStatus(1);
    			funcRoleVo.setMenuId(menuVO.getMenuId());
    			funcRoleVo.setRoleId(roleId);
    			funcRoleColl.addFuncRole(funcRoleVo);
    		}
    	}
    	//得到原菜单集合中存在，后去掉的菜单
    	FuncRoleColl delFunRoleColl = new FuncRoleColl();
    	for(int i =0; i<oldMenuColl.getRowCount(); i++){
    		MenuVO oldMenuVO = oldMenuColl.getMenu(i);
    		if(menuColl.getMenu(oldMenuVO.getMenuId()) == null){//如果原集合中的某个菜单在心菜单集合中不存在，则将原来的数据删除
    			FuncRoleVO delFuncRoleVO = new FuncRoleVO();
    		    delFuncRoleVO.setMenuId(oldMenuVO.getMenuId());
    		    delFuncRoleVO.setRoleId(roleId);
    		    delFunRoleColl.addFuncRole(delFuncRoleVO);
    		}
    	}
    	//先删除
    	if(delFunRoleColl != null && delFunRoleColl.getRowCount() != 0){
    		delCode = funcRoleDao.doDeleteFuncRole(delFunRoleColl);
    	}    	
    	//再增加
    	if(funcRoleColl != null && funcRoleColl.getRowCount() != 0){
    		addCode = funcRoleDao.doAddFuncRole(funcRoleColl);
    	}    	
    	if(delCode == 0 || addCode == 0){
    		message = "赋权失败";
    	}
    	request.setAttribute("roleId", sRoleId);
    	request.setAttribute("message",message);
    	request.setAttribute("needCheckBox","true");
    	request.getSession().removeAttribute("roleMenuColl");
    	request.getSession().setAttribute("roleMenuColl",menuColl);//将新的menucoll放到session中
    	long end = System.currentTimeMillis();
    	System.out.println("  submit need time :" +(end-start));
    	try {
			response.getWriter().print(message);
		} catch (IOException e) {
			e.printStackTrace();
		}
    	return null;    	
    }
    private SystemVO getSystemById(SystemColl sysColl, String sysId){
    	for(int i = 0; i < sysColl.getRowCount(); i++){
    		SystemVO sysVO = sysColl.getSystem(i);
    		if(sysVO.getSystemId().trim().equals(sysId)){
    			return sysVO;
    		}    		
    	}
    	return null;
    }
    
    private MenuVO getMenuById(MenuColl menuColl, String menuId){
    	for(int i=0; i < menuColl.getRowCount(); i++){
    		MenuVO vo = menuColl.getMenu(i);
    		if(vo.getMenuId().trim().equals(menuId)){
    			return vo;
    		}
    	}
    	return null;
    }
	public ActionForward openAll(ActionMapping actionMapping,ActionForm actionForm,
			HttpServletRequest request,HttpServletResponse response){	
		
	  	RequestUtil requestUtil=new RequestUtil(request);
	    ResponseUtil responseUtil=new ResponseUtil(response);
		ITree menuTree = (ITree)request.getSession().getAttribute("menuTree");
		//menuTree.getExpandedNodes().clear();
		menuTree.selectAll();
		request.setAttribute("loadMode","ALLLOAD");
		request.setAttribute("needCheckBox","false");
		return actionMapping.findForward("viewroleom");
	}
	public ActionForward closeAll(ActionMapping actionMapping,ActionForm actionForm,
			HttpServletRequest request,HttpServletResponse response){	
		
	  	RequestUtil requestUtil=new RequestUtil(request);
	    ResponseUtil responseUtil=new ResponseUtil(response);
		ITree menuTree = (ITree)request.getSession().getAttribute("menuTree");
		menuTree.collapseAll();
		request.setAttribute("loadMode","PARTLOAD");
		request.setAttribute("needCheckBox","false");
		return actionMapping.findForward("viewroleom");
	}
}
