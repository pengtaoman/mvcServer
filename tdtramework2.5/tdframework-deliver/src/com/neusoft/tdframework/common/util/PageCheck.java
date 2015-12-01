package com.neusoft.tdframework.common.util;

import javax.servlet.http.HttpServletRequest;

import com.neusoft.om.dao.page.PageDAO;
import com.neusoft.tdframework.authorization.AuthorizeVO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;

public class PageCheck {
	/**
	 * 根据request和menuId 判断当前操作员是否有权限访问该menu(可能是页面或按钮) 
	 * @param request
	 * @param menuId
	 * @return
	 */
	public static boolean ifHaveRight(HttpServletRequest request, String menuId){
		AuthorizeVO authorizeVO = (AuthorizeVO)request.getSession().getAttribute(GlobalParameters.SESSION_INFO);
		String workNo = authorizeVO.getWorkNo();
		if(workNo == null || workNo.trim().equals("")){
			workNo = (String)request.getSession().getAttribute("Account");
		}
        boolean haveRight = false;
        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("");
        PageDAO pageDAO = (PageDAO) factory.getInteractionObject("pageDAO", appContext);
        haveRight = pageDAO.ifHaveRight(workNo, menuId);        
        return haveRight;
	}
	/**
	 * 根据request和menuId得到该按钮的属性
	 * 当前操作员有权操作该按钮则返回 writeable="true",当前操作员无权操作此按钮则返回 readonly="true"
	 * 返回值可以直接在jsp中使用
	 * @param request
	 * @param menuId
	 * @return
	 */
	public static String getButtonAttibute(HttpServletRequest request, String menuId){
		AuthorizeVO authorizeVO = (AuthorizeVO)request.getSession().getAttribute(GlobalParameters.SESSION_INFO);
		String workNo = authorizeVO.getWorkNo();
		if(workNo == null || workNo.trim().equals("")){
			workNo = (String)request.getSession().getAttribute("Account");
		}
        boolean haveRight = false;
        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("");
        PageDAO pageDAO = (PageDAO) factory.getInteractionObject("pageDAO", appContext);
        haveRight = pageDAO.ifHaveRight(workNo, menuId);  
        if(haveRight){
        	return "writeable='true'";
        }else{
        	return "disabled='true'";
        }
	}
	
}
