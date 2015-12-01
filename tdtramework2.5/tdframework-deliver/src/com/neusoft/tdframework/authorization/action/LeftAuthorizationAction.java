/*
 * Created on 2004-12-13
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.tdframework.authorization.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.action.ActionServlet;

import com.neusoft.tdframework.authorization.AuthorizeBO;
import com.neusoft.tdframework.authorization.AuthorizeFactory;
import com.neusoft.tdframework.authorization.AuthorizeVO;
import com.neusoft.tdframework.authorization.FrameMenuColl;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.core.BaseService;
import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.support.favorite.controller.FavoriteMenuListQuery;
import com.neusoft.tdframework.support.favorite.dao.FavoriteColl;
import com.neusoft.tdframework.web.controller.ControllerData;
import com.neusoft.tdframework.web.struts.BaseAction;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;

/**
 * @author chenzt
 *
 * 框架左菜单的查询显示
 */
public class LeftAuthorizationAction extends BaseAction{
	
	FavoriteMenuListQuery favoriteMenuListQueryController = null;
	

	public ActionForward service(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws ActionException {
		String systemId = (String)request.getParameter("systemId");
		AuthorizeVO authorizeVO = getAuthorize(request);
		String employeeId = authorizeVO.getEmployeeId();
		String ifShowFav = "";

		InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
		AppContext appContext = new AppContextImpl();
		appContext.setApplicationName("");
		AuthorizeFactory authorizeFactory = (AuthorizeFactory) factory
		.getInteractionObject(AuthorizeFactory.BEAN, appContext);
		AuthorizeBO authorizeBO = authorizeFactory.getAuthorizeBO(request);
		try {
			FrameMenuColl frameMenuColl = authorizeBO.getAllMenuInfo(employeeId,systemId);
			ifShowFav = authorizeBO.getIfshowfav(systemId);
			//此方法返回为空值
			//FavoriteColl framefavoriteColl = authorizeBO.getFavoriteInfoByEmployeeIdSystemId(employeeId,systemId);
			//旧方法在om_work_t中去菜单，新方法直接在om_menu_t中取
			//FrameWorkColl frameWorkColl = authorizeBO.getWorkInfoBySystemId(systemId);
			//执行收藏功能控制类
			favoriteMenuListQueryController.serviceProcess(mapping,form,request,response,new ControllerData());

			request.setAttribute("frameMenuColl",frameMenuColl);
			//request.setAttribute("frameFavoriteColl",framefavoriteColl);
			request.setAttribute("ifShowFav",ifShowFav);
			//request.setAttribute("frameWorkColl",frameWorkColl);
		} catch (ServiceException e) {
			e.printStackTrace();
			throw new ActionException("获取菜单信息异常: " + e.getMessage());
		}
		
		return mapping.findForward("frameLeft");
	}

	public void setServlet(ActionServlet actionServlet) {
		super.setServlet(actionServlet);
		BaseService service = getBaseService();
		if(service==null)
		{
			AppContext appC = new AppContextImpl();
			appC.setApplicationName("");
			InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
			service = (BaseService) factory.getInteractionObject("BaseService", appC);
			service.setFactory(factory);
		}
		AppContext appCOM = new AppContextImpl();
		appCOM.setApplicationName("");
		
		service.setAppContext(appCOM);
		favoriteMenuListQueryController = new FavoriteMenuListQuery(service);
	}
	protected AuthorizeVO getAuthorize(HttpServletRequest request) {
		return (AuthorizeVO)request.getSession().getAttribute(GlobalParameters.SESSION_INFO);
	}

}
