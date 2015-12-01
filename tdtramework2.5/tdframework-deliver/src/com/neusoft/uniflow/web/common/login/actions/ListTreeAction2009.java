package com.neusoft.uniflow.web.common.login.actions;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.web.common.trees.beans.NWMenuTreeNode;
import com.neusoft.uniflow.web.util.CommonInfoManager;


public class ListTreeAction2009 extends Action {
	
	public static NWMenuTreeNode struts = null;

	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {

		if(ListTreeAction2009.struts==null) ListTreeAction2009.struts = CommonInfoManager.getMenuTree(request.getSession());
		NWMenuTreeNode tree = ListTreeAction2009.struts;
		NWMenuTreeNode outTree = null;
		String picBase = null;
        
        String location = request.getParameter("location");
        
        if(tree != null)
        {
        	picBase = request.getContextPath() + tree.getPicBase();
	        //体验中心
	        if("experienceCenter".equals(location))
	        {
	        	outTree = get1LevelMenu(tree,"experienceCenter");
	        }
	        //管理中心
	        else if("managementCenter".equals(location))
	        {
	        	outTree = get1LevelMenu(tree,"managementCenter");
	        	
	        }
	        //任务中心
	        else if("taskCenter".equals(location))
	        {
	        	outTree = get1LevelMenu(tree,"taskCenter");
	        }
	        request.setAttribute("pageId", location);
	        request.setAttribute("picBase", picBase);
        	request.setAttribute("listtree", outTree);
        	return mapping.findForward("Style2009Menu");
        }

		return mapping.findForward("success");
	}
	
	private NWMenuTreeNode get1LevelMenu(NWMenuTreeNode struts,String menuId)
	{
		NWMenuTreeNode result = null;
		List _1levelMenus = struts.getLeaves();
		int len = _1levelMenus.size();
		for(int i=0;i<len;i++)
		{
			NWMenuTreeNode _1levelMenu = (NWMenuTreeNode)_1levelMenus.get(i);
			if(menuId.equals(_1levelMenu.getId()))
			{
				result = _1levelMenu;
				break;
			}
		}
		return result;
	}
}