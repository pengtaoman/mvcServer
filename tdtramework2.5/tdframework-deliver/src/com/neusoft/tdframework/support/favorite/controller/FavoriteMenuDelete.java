/*
 * Created on 2005-2-24
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.tdframework.support.favorite.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;

import com.neusoft.tdframework.authorization.AuthorizeUtil;
import com.neusoft.tdframework.core.BaseService;
import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.web.controller.ControllerData;
import com.neusoft.tdframework.web.controller.UnValidateException;

/**
 * @author chenzt
 *
 * 增加收藏功能控制类
 */
public class FavoriteMenuDelete extends BaseFavoriteMenuController{

	/**
	 * @param baseService
	 */
	public FavoriteMenuDelete(BaseService baseService) {
		super(baseService);
	}

	/* (non-Javadoc)
	 * @see com.neusoft.tdframework.web.controller.BaseController#dataValidate(javax.servlet.http.HttpServletRequest, com.neusoft.tdframework.web.controller.ControllerData)
	 */
	public void dataValidate(HttpServletRequest request, ControllerData controllerData) throws UnValidateException {
		// TODO Auto-generated method stub
		
	}

	/* (non-Javadoc)
	 * @see com.neusoft.tdframework.web.controller.BaseController#serviceProcess(org.apache.struts.action.ActionMapping, org.apache.struts.action.ActionForm, javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse, com.neusoft.tdframework.web.controller.ControllerData)
	 */
	public void serviceProcess(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response, ControllerData controllerData) throws ActionException, ServiceException {
		
		String menuId = request.getParameter("menuId");
				
		getFavoriteMenuBO().doDeleteFavoriteByKey(AuthorizeUtil.getAuthorize(request).getEmployeeId(),menuId);
		controllerData.setAlertMessage("成功删除收藏夹信息！");
	}

}
