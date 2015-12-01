/*
 * Created on 2005-2-23
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.tdframework.support.favorite.action;

import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.tdframework.support.favorite.controller.FavoriteMenuAdd;
import com.neusoft.tdframework.support.favorite.controller.FavoriteMenuDelete;
import com.neusoft.tdframework.support.favorite.controller.FavoriteMenuListQuery;
import com.neusoft.tdframework.support.favorite.controller.FavoriteMenuModify;
import com.neusoft.tdframework.web.controller.ControllerData;
import com.neusoft.tdframework.web.struts.BaseControllerAction;

/**
 * @author chenzt
 *
 * 收藏夹管理的功能
 */
public class FavoriteMenuAdminAction extends BaseControllerAction {
	
	private static String QUERY="query";
	private static String ADD="add";
	private static String DELETE="delete";
	private static String MODIFY="modify";
	
	/* (non-Javadoc)
	 * @see com.neusoft.tdframework.web.struts.BaseControllerAction#getActionForward(org.apache.struts.action.ActionMapping, java.lang.String, com.neusoft.tdframework.web.controller.ControllerData)
	 */
	protected ActionForward getActionForward(ActionMapping mapping, String operType, ControllerData controllerData) {
		if(operType.intern()==DELETE.intern() || operType.intern()==MODIFY.intern())
			return mapping.findForward(QUERY);
		
		return mapping.findForward(operType);
	}

	/* (non-Javadoc)
	 * @see com.neusoft.tdframework.web.struts.BaseControllerAction#initController()
	 */
	protected void initController() {
		addController(QUERY,new FavoriteMenuListQuery(getBaseService()));
		addController(ADD,new FavoriteMenuAdd(getBaseService()));
		addController(DELETE,new FavoriteMenuDelete(getBaseService()));
		addController(DELETE,new FavoriteMenuListQuery(getBaseService()));
		addController(MODIFY,new FavoriteMenuModify(getBaseService()));
		addController(MODIFY,new FavoriteMenuListQuery(getBaseService()));
	}
	
}
