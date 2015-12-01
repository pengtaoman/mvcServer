/*
 * @(#)MenuGradingViewAction.java   2005-04-25
 *
 * Copyright (c) NEUSOFT
 * MODIFY MEMO:
 */
package com.neusoft.om.action.menu;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.om.bo.FuncRoleBO;
import com.neusoft.om.dao.funcrole.FuncRoleColl;
import com.neusoft.om.dao.menu.MenuColl;
import com.neusoft.om.dao.menu.MenuDAO;
import com.neusoft.om.dao.system.SystemColl;
import com.neusoft.om.dao.system.SystemDAO;
import com.neusoft.om.omutil.OMGetMenuTree;
import com.neusoft.om.omutil.OMMenuTreeHelper;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.tdframework.web.struts.BaseAction;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;
import com.neusoft.unieap.comp.menu.MenuRepository;
import com.neusoft.unieap.util.RequestUtil;

/**
 * 菜单分级权限，用于分级权显示
 * 
 * @author lix
 * 
 */
public class MenuFuncTreeAction extends BaseAction{
    /**
     * Logger for this class
     */
    protected Log logger = LogFactory
                        .getLog(MenuFuncTreeAction.class);
	
	private String initMenuTree(ActionMapping map,HttpServletRequest request){
		MenuRepository repository = null;
		InteractionObjectFactory factory = InteractionObjectFactory
				.getInstance();
		AppContext appContext = new AppContextImpl();
		appContext.setApplicationName("om");
		MenuDAO dao = (MenuDAO) factory.getInteractionObject("menuDAO",
				appContext);

		SystemDAO sysDao = (SystemDAO)factory.getInteractionObject("systemDAO",appContext);
		FuncRoleColl roleFuncColl = null;
		MenuColl adminFuncColl = null;
		SystemColl systemColl = null;
		String adminEmpId = "999";
		int roleId = 99;
		adminFuncColl = dao.getAssignableMenuCollByEmpId(adminEmpId);
		roleFuncColl = dao.getMenusByRoleId(roleId);
		systemColl = sysDao.getSystemInfoByEmployeeId(adminEmpId);
		
		OMGetMenuTree menuTree = new OMGetMenuTree(roleFuncColl,adminFuncColl,systemColl);
		repository = menuTree.createTree();		
		OMMenuTreeHelper helper = new OMMenuTreeHelper(repository,false);
		
		request.setAttribute("helper", helper);
		request.setAttribute("menus",menuTree.getMenusStrBuf().toString());
		request.getSession(true).setAttribute("appName","om");
		
		return "menutree";
	}
	
	private String insertMenus(ActionMapping map,HttpServletRequest request){
		FuncRoleBO bo =(FuncRoleBO)getBaseService().getServiceFacade(FuncRoleBO.BEAN);
		RequestUtil rq = new RequestUtil(request);
		String oldMenus = rq.getParameter("menus");
		String newMenus = rq.getParameter("menuform");
		try{
            bo.modifyRolePower(oldMenus,newMenus,99);
        }catch(ServiceException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"MenuFuncTreeAction--insertMenus:"+e.getMessage());

        }  
		
		
		return "insertMenus";
	}
	
	public ActionForward service(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws ActionException {
		RequestUtil rq = new RequestUtil(request);
		String operType = rq.getParameter("operType");
		String forward = null;
		if(operType==null||operType.intern()=="".intern()){
			forward = initMenuTree(mapping,request);
		}else if(operType.intern()=="insertMenus".intern()){
			forward = insertMenus(mapping,request);
		}
        ActionForward returnActionForward = mapping.findForward(forward);
        if (logger.isDebugEnabled()) {
            logger
                    .debug("execute(ActionMapping, ActionForm, HttpServletRequest, HttpServletResponse) - end");
        }
		return returnActionForward;
	}
	
	
}
