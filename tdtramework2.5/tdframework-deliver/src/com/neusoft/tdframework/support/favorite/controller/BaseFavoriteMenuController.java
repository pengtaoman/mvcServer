/*
 * Created on 2005-2-24
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.tdframework.support.favorite.controller;


import com.neusoft.tdframework.core.BaseService;
import com.neusoft.tdframework.support.favorite.bo.FavoriteMenuBO;
import com.neusoft.tdframework.web.controller.BaseController;

/**
 * @author chenzt
 *
 * 收藏夹功能基础控制类
 * 
 */
public abstract class BaseFavoriteMenuController extends BaseController{
	
	FavoriteMenuBO favoriteMenuBO;
	
	/**
	 * @param baseService
	 */
	public BaseFavoriteMenuController(BaseService baseService) {
		super(baseService);
		/*
		AppContext appContext = new AppContextImpl();
		appContext.setApplicationName("om");

		InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
		favoriteMenuBO = (FavoriteMenuBO) factory.getInteractionObject(FavoriteMenuBO.BEAN, appContext);
		*/
		favoriteMenuBO = (FavoriteMenuBO)baseService.getServiceFacade(FavoriteMenuBO.BEAN);
	}
	
	/**
	 * @return
	 */
	protected FavoriteMenuBO getFavoriteMenuBO() {
		return favoriteMenuBO;
	}

}
