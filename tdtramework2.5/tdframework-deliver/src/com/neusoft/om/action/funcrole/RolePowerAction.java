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
     * ���ܽ�ɫ��Ȩ,�ύ
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
        String message = "��Ȩ�ɹ�";
    	InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
    	AppContext appContext = new AppContextImpl();
    	appContext.setApplicationName("om");
    	MenuDAO menuDao = (MenuDAO) factory.getInteractionObject("menuDAO",	appContext);
    	SystemDAO sysDao = (SystemDAO)factory.getInteractionObject("systemDAO",appContext);
    	FuncRoleDAO funcRoleDao = (FuncRoleDAO)factory.getInteractionObject("funcRoleDAO",appContext);
    	//�õ�ҳ��ͨ����ѡ�нڵ�����
    	String[] treeNodes = requestUtil.getParameters(ITreeNode.checknode+"menuTree");
    	SystemColl allSystem = (SystemColl)request.getSession().getAttribute("systemColl");
    	MenuColl allMenu = (MenuColl)request.getSession().getAttribute("adminMenuColl");
        String sRoleId = (String)requestUtil.getAttribute("roleId");
        int roleId = 0;
        if(sRoleId != null && !sRoleId.trim().equals("")){
        	roleId = Integer.valueOf(sRoleId).intValue();
        }
        //ԭ�˵�����
        MenuColl oldMenuColl = (MenuColl)request.getSession().getAttribute("roleMenuColl");
        //MenuColl oldMenuColl = menuDao.getMenuCollByRoleId(roleId);
        //ѡ�еĲ˵�����ϵͳ����
    	MenuColl menuColl = new MenuColl();
    	SystemColl sysColl = new SystemColl();
    	//����,�õ�ѡ�е���ϵͳ�Ͳ˵�����,����Լ���Ĺ���,�˵�������ϵͳ���벻������ظ�,��ʱû�п��ǳ����ظ������
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
    	
    	//���˵õ���ѡ�еĲ˵�����    	
    	FuncRoleColl funcRoleColl = new FuncRoleColl();    	
    	for(int i = 0; i < menuColl.getRowCount(); i ++){
    		MenuVO menuVO = menuColl.getMenu(i);
    		if(oldMenuColl.getMenu(menuVO.getMenuId())==null){//����ɼ����в�����ĳ�˵�,�������ӵ���ɫ�˵���ϵ����
    			FuncRoleVO funcRoleVo = new FuncRoleVO();
    			funcRoleVo.setAdminStatus(1);
    			funcRoleVo.setExecStatus(1);
    			funcRoleVo.setMenuId(menuVO.getMenuId());
    			funcRoleVo.setRoleId(roleId);
    			funcRoleColl.addFuncRole(funcRoleVo);
    		}
    	}
    	//�õ�ԭ�˵������д��ڣ���ȥ���Ĳ˵�
    	FuncRoleColl delFunRoleColl = new FuncRoleColl();
    	for(int i =0; i<oldMenuColl.getRowCount(); i++){
    		MenuVO oldMenuVO = oldMenuColl.getMenu(i);
    		if(menuColl.getMenu(oldMenuVO.getMenuId()) == null){//���ԭ�����е�ĳ���˵����Ĳ˵������в����ڣ���ԭ��������ɾ��
    			FuncRoleVO delFuncRoleVO = new FuncRoleVO();
    		    delFuncRoleVO.setMenuId(oldMenuVO.getMenuId());
    		    delFuncRoleVO.setRoleId(roleId);
    		    delFunRoleColl.addFuncRole(delFuncRoleVO);
    		}
    	}
    	//��ɾ��
    	if(delFunRoleColl != null && delFunRoleColl.getRowCount() != 0){
    		delCode = funcRoleDao.doDeleteFuncRole(delFunRoleColl);
    	}    	
    	//������
    	if(funcRoleColl != null && funcRoleColl.getRowCount() != 0){
    		addCode = funcRoleDao.doAddFuncRole(funcRoleColl);
    	}    	
    	if(delCode == 0 || addCode == 0){
    		message = "��Ȩʧ��";
    	}
    	request.setAttribute("roleId", sRoleId);
    	request.setAttribute("message",message);
    	request.setAttribute("needCheckBox","true");
    	request.getSession().removeAttribute("roleMenuColl");
    	request.getSession().setAttribute("roleMenuColl",menuColl);//���µ�menucoll�ŵ�session��
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
