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

import com.neusoft.om.OMLogger;
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
public class FavoriteMenuModify extends BaseFavoriteMenuController{

	/**
	 * @param baseService
	 */
	public FavoriteMenuModify(BaseService baseService) {
		super(baseService);
	}

	/* (non-Javadoc)
	 * @see com.neusoft.tdframework.web.controller.BaseController#dataValidate(javax.servlet.http.HttpServletRequest, com.neusoft.tdframework.web.controller.ControllerData)
	 */
	public void dataValidate(HttpServletRequest request, ControllerData controllerData) throws UnValidateException {
		String favoriteOrder = request.getParameter("favoriteOrder");
		String favoriteName = request.getParameter("favoriteName");
		try {
			String [] favoriteOrderArray = favoriteOrder.split(",");
			String [] favoriteNameArray = favoriteName.split(",");
			
			for(int i=0;i<favoriteOrderArray.length;i++){
				Integer.parseInt(favoriteOrderArray[i]);
				if(favoriteNameArray[i] == null || favoriteNameArray[i].trim().equals("")) {
					throw new UnValidateException("收藏菜单名称不能为空!");
				}
			}
		} catch (NumberFormatException e) {
			OMLogger.error(e.getMessage(),e);
			throw new UnValidateException("排列顺序数据解析失败!" + e.getMessage());
		}
	}

	/* (non-Javadoc)
	 * @see com.neusoft.tdframework.web.controller.BaseController#serviceProcess(org.apache.struts.action.ActionMapping, org.apache.struts.action.ActionForm, javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse, com.neusoft.tdframework.web.controller.ControllerData)
	 */
	public void serviceProcess(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response, ControllerData controllerData) throws ActionException, ServiceException {
		
		String menuId = request.getParameter("menuId");
		String favoriteName = request.getParameter("favoriteName");
		String favoriteOrder = request.getParameter("favoriteOrder");
				
		getFavoriteMenuBO().doModifyFavoriteMenu(
			AuthorizeUtil.getAuthorize(request).getEmployeeId(),
			menuId,
			favoriteName,
			favoriteOrder);
		controllerData.setAlertMessage("成功修改收藏夹信息！");
	}

}
