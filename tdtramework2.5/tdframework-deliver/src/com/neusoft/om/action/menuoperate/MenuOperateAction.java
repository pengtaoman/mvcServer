package com.neusoft.om.action.menuoperate;

import java.io.UnsupportedEncodingException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.om.bo.MenuOperateBO;
import com.neusoft.om.dao.dictionary.OMDictionaryDAO;
import com.neusoft.om.dao.menuoperate.MenuOperateColl;
import com.neusoft.om.dao.menuoperate.MenuOperateVO;
import com.neusoft.om.dao.systemoperate.SystemOperateDAO;
import com.neusoft.om.dao.systemoperate.SystemOperateVO;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.web.struts.BaseAction;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;

public class MenuOperateAction extends BaseAction {

	public ActionForward service(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) {

		String oprType = request.getParameter("oprType");
		request.setAttribute("oprType", oprType);

		if ("findsys".equals(oprType)) {
			return getSystemInfoById(mapping, request, response);
		}
		if ("findmenu".equals(oprType)) {
			return getMenuInfoById(mapping, request, response);
		}
		if ("init".equals(oprType)) {
			return getMenuSystemInfo(mapping, request, response);
		}
		if ("addsys".equals(oprType)) {
			return addSystem(mapping, request, response);
		}
		if ("operatesys".equals(oprType)) {
			return opersteSystem(mapping, request, response);
		}
		if ("checksys".equals(oprType)) {
			return checkSystem(mapping, request, response);
		}
		if ("willaddsys".equals(oprType)) {
			return willAddSystem(mapping, request, response);
		}
		if ("checkparent".equals(oprType)) {
			return checkParent(mapping, request, response);
		}
		if ("addmenu".equals(oprType)) {
			return addMenu(mapping, request, response);
		}
		if ("checkname".equals(oprType)) {
			return checkName(mapping, request, response);
		}
		if ("operatemenu".equals(oprType)) {
			return operateMenu(mapping, request, response);
		}
		if ("deletemenu".equals(oprType)) {
			return deleteMenu(mapping, request, response);
		}
		if ("updatemenu".equals(oprType)) {
			return updateMenu(mapping, request, response);
		}
		if ("willaddmenu".equals(oprType)) {
			return willAddMenu(mapping, request, response);
		}
		if ("deletesys".equals(oprType)) {
			return delSystem(mapping, request, response);
		}
		if ("updatesys".equals(oprType)) {
			return updateSystem(mapping, request, response);
		} else {
			return null;
		}
	}

	public ActionForward willAddMenu(ActionMapping mapping,
			HttpServletRequest request, HttpServletResponse response) {
		MenuOperateVO vo = new MenuOperateVO();
		request.setAttribute("onemenu", vo);
		request.setAttribute("willaddmenu", "willaddmenu");
		return mapping.findForward("onemenu");
	}

	public ActionForward getSystemInfoById(ActionMapping mapping,
			HttpServletRequest request, HttpServletResponse response) {
		MenuOperateBO bo = (MenuOperateBO) getBaseService().getServiceFacade(
				MenuOperateBO.BEAN);
		SystemOperateVO vo = new SystemOperateVO();
		String menuId = request.getParameter("menuid");
		try {
			vo = bo.getSystemInfoById(menuId);
			request.setAttribute("onesys", vo);
		} catch (ServiceException e) {
			// TODO 自动生成 catch 块
			e.printStackTrace();
		}
		return mapping.findForward("onesys");
	}

	public ActionForward getMenuInfoById(ActionMapping mapping,
			HttpServletRequest request, HttpServletResponse response) {
		MenuOperateBO bo = (MenuOperateBO) getBaseService().getServiceFacade(
				MenuOperateBO.BEAN);
		MenuOperateVO vo = new MenuOperateVO();
		String menuId = request.getParameter("menuid");
		try {
			vo = bo.getMenuById(menuId);
			request.setAttribute("onemenu", vo);
		} catch (ServiceException e) {
			// TODO 自动生成 catch 块
			e.printStackTrace();
		}
		return mapping.findForward("onemenu");
	}

	public ActionForward getMenuSystemInfo(ActionMapping mapping,
			HttpServletRequest request, HttpServletResponse response) {
		MenuOperateBO bo = (MenuOperateBO) getBaseService().getServiceFacade(
				MenuOperateBO.BEAN);
		MenuOperateColl menuOperateColl = new MenuOperateColl();
		try {
			menuOperateColl = bo.getMenuSystemInfo();
			request.setAttribute("menuTree", menuOperateColl);
		} catch (ServiceException e) {
			// TODO 自动生成 catch 块
			e.printStackTrace();
		}
		return mapping.findForward("menutree");
	}

	public ActionForward updateSystem(ActionMapping mapping,
			HttpServletRequest request, HttpServletResponse response) {
		SystemOperateVO vo = new SystemOperateVO();
		MenuOperateBO bo = (MenuOperateBO) getBaseService().getServiceFacade(
				MenuOperateBO.BEAN);
		// SystemOperateDAO dao=new SystemOperateDAOImpl();
		vo.setSystemId(request.getParameter("systemId"));
		String oldSystemId = request.getParameter("oldSystemId");
			vo.setSystemName(request.getParameter("systemName"));
		vo.setSystemType(request.getParameter("systemType"));
			vo.setDetailDesc(request.getParameter("detailDesc"));
		vo.setPortalWinId(Integer.parseInt(request
						.getParameter("portalWinId")));
		int code = -1;
		try {
			code = bo.doModifySystemInfo(vo, oldSystemId);
		} catch (ServiceException e) {
			// TODO 自动生成 catch 块
			e.printStackTrace();
		}
		request.setAttribute("code", new Integer(code));
		return mapping.findForward("over");
	}

	public ActionForward delSystem(ActionMapping mapping,
			HttpServletRequest request, HttpServletResponse response) {
		String id = request.getParameter("systemId");
		// SystemOperateDAO dao=new SystemOperateDAOImpl();
		MenuOperateBO bo = (MenuOperateBO) getBaseService().getServiceFacade(
				MenuOperateBO.BEAN);
		int code = -1;
		try {
			code = bo.doDeleteSystemInfo(id);
		} catch (ServiceException e) {
			// TODO 自动生成 catch 块
			e.printStackTrace();
		}
		request.setAttribute("code", new Integer(code));
		return mapping.findForward("over");
	}

	public ActionForward addSystem(ActionMapping mapping,
			HttpServletRequest request, HttpServletResponse response) {
		SystemOperateVO vo = new SystemOperateVO();
		// SystemOperateDAO dao=new SystemOperateDAOImpl();
		MenuOperateBO bo = (MenuOperateBO) getBaseService().getServiceFacade(
				MenuOperateBO.BEAN);
		vo.setSystemId(request.getParameter("systemId"));
			vo.setSystemName(request.getParameter("systemName"));
		vo.setSystemType(request.getParameter("systemType"));
			vo.setDetailDesc(request.getParameter("detailDesc"));
		vo.setPortalWinId(Integer.parseInt(request
						.getParameter("portalWinId")));
		int code = -1;
		try {
			code = bo.doAddSystemInfo(vo);
		} catch (ServiceException e) {
			// TODO 自动生成 catch 块
			e.printStackTrace();
		}
		request.setAttribute("code", new Integer(code));
		return mapping.findForward("over");
	}

	public ActionForward opersteSystem(ActionMapping mapping,
			HttpServletRequest request, HttpServletResponse response) {
		String name = request.getParameter("sysname");
		MenuOperateBO bo = (MenuOperateBO) getBaseService().getServiceFacade(
				MenuOperateBO.BEAN);
		SystemOperateVO vo = new SystemOperateVO();
		try {
			vo = bo.getSystemInfoByName(name);
		} catch (ServiceException e) {
			// TODO 自动生成 catch 块
			e.printStackTrace();
		}
		request.setAttribute("asys", vo);
		return mapping.findForward("sys");
	}

	public ActionForward checkSystem(ActionMapping mapping,
			HttpServletRequest request, HttpServletResponse response) {
		String name = request.getParameter("sysname");
		// SystemOperateDAOImpl dao=new SystemOperateDAOImpl();
		MenuOperateBO bo = (MenuOperateBO) getBaseService().getServiceFacade(
				MenuOperateBO.BEAN);
		SystemOperateVO vo = new SystemOperateVO();
		try {
			vo = bo.getSystemInfoByName(name);
		} catch (ServiceException e) {
			// TODO 自动生成 catch 块
			e.printStackTrace();
		}
		if ("".equals(vo.getSystemId())) {
			vo = null;
			request.setAttribute("checkresult", "可以使用这个名字新建系统");
			request.setAttribute("sysname", name);
		}
		request.setAttribute("asys", vo);
		return mapping.findForward("checksysover");
	}

	public ActionForward willAddSystem(ActionMapping mapping,
			HttpServletRequest request, HttpServletResponse response) {
		SystemOperateVO vo = new SystemOperateVO();
		request.setAttribute("willaddasys", "willaddasys");
		request.setAttribute("onesys", vo);
		return mapping.findForward("onesys");
	}

	public ActionForward checkParent(ActionMapping mapping,
			HttpServletRequest request, HttpServletResponse response) {
		String nameorid = request.getParameter("parentMenuId");
		MenuOperateBO bo = (MenuOperateBO) getBaseService().getServiceFacade(
				MenuOperateBO.BEAN);
		MenuOperateVO vo = new MenuOperateVO();
		try {
			vo = bo.getMenuByName(nameorid);
		} catch (ServiceException e1) {
			// TODO 自动生成 catch 块
			e1.printStackTrace();
		}
		//SystemOperateDAO dao = new SystemOperateDAOImpl();
		
		InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om"); 
        SystemOperateDAO dao = (SystemOperateDAO) factory.getInteractionObject("systemOperateDAO",appContext);
		SystemOperateVO sysvo = new SystemOperateVO();
		try {
			sysvo = dao.getSystemInfoByName(nameorid);
		} catch (DataAccessException e1) {
			// TODO 自动生成 catch 块
			e1.printStackTrace();
		}
		if (!vo.getMenuId().equals("")) {
			nameorid = vo.getMenuId();
			request.setAttribute("checkparent", "找到该父菜单,并把名称替换为id,");
		} else if (!sysvo.getSystemId().equals("")) {
			nameorid = sysvo.getSystemId();
			request.setAttribute("checkparent", "找到父菜单为系统菜单,并把名称替换为id");
		} else
			try {
				if (dao.getSystemInfoById(nameorid) != null
						&& !dao.getSystemInfoById(nameorid).getSystemId()
								.equals("")) {
					nameorid = dao.getSystemInfoById(nameorid).getSystemId();
					request.setAttribute("checkparent", "找到父菜单为系统菜单");
				} else {
					vo = bo.getMenuById(nameorid);
					if (!vo.getMenuId().equals("")) {
						request.setAttribute("checkparent", "存在该父菜单");
					} else {
						request.setAttribute("checkparent", "不存在该父菜单");
					}
				}
			} catch (DataAccessException e1) {
				// TODO 自动生成 catch 块
				e1.printStackTrace();
			} catch (ServiceException e1) {
				// TODO 自动生成 catch 块
				e1.printStackTrace();
			}
		vo.setMenuId(request.getParameter("menuId"));
		vo.setMenuName(request.getParameter("menuName"));
		vo.setSystemId(request.getParameter("systemId"));
		vo.setModuleId(request.getParameter("moduleId"));
		vo.setMenuType(Integer.parseInt(request.getParameter("menuType")));
		vo.setOpenMethod(Integer.parseInt(request.getParameter("openMethod")));
		vo.setPageLink(request.getParameter("pageLink"));
		vo.setLayer(Integer.parseInt(request.getParameter("layer")));
		vo.setLog(Integer.parseInt(request.getParameter("log")));
		vo.setOrder(Integer.parseInt(request.getParameter("order")));
		vo.setIfMyWork(Integer.parseInt(request.getParameter("ifMyWork")));
		vo.setParentMenuId(nameorid);
		vo.setInuse(Integer.parseInt(request.getParameter("inuse")));

		vo.setMenuDesc(request.getParameter("menuDesc"));

		vo.setPortalWinId(Integer.parseInt(request
						.getParameter("portalWinId")));
		request.setAttribute("amenu", vo);
		return mapping.findForward("checkparentover");
	}

	public ActionForward addMenu(ActionMapping mapping,
			HttpServletRequest request, HttpServletResponse response) {
		MenuOperateVO vo = new MenuOperateVO();
		vo.setMenuId(request.getParameter("menuId"));
		vo.setMenuName(request.getParameter("menuName"));
		vo.setSystemId(request.getParameter("systemId"));
		vo.setModuleId(request.getParameter("moduleId"));
		vo.setMenuType(Integer.parseInt(request.getParameter("menuType")));
		vo.setOpenMethod(Integer.parseInt(request.getParameter("openMethod")));
		vo.setPageLink(request.getParameter("pageLink"));
		vo.setLayer(Integer.parseInt(request.getParameter("layer")));
		vo.setLog(Integer.parseInt(request.getParameter("log")));
		vo.setOrder(Integer.parseInt(request.getParameter("order")));
		vo.setIfMyWork(Integer.parseInt(request.getParameter("ifMyWork")));
		vo.setParentMenuId(request.getParameter("parentMenuId"));
		vo.setInuse(Integer.parseInt(request.getParameter("inuse")));

		vo.setMenuDesc(request.getParameter("menuDesc"));

		vo.setPortalWinId(Integer.parseInt(request.getParameter("portalWinId")));
		MenuOperateBO bo = (MenuOperateBO) getBaseService().getServiceFacade(
				MenuOperateBO.BEAN);
		int code = -1;
		try {
			code = bo.doAddMenu(vo);
		} catch (ServiceException e) {
			// TODO 自动生成 catch 块
			e.printStackTrace();
		}
		request.setAttribute("code", new Integer(code));
		return mapping.findForward("addover");
	}

	public ActionForward updateMenu(ActionMapping mapping,
			HttpServletRequest request, HttpServletResponse response) {
		MenuOperateVO vo = new MenuOperateVO();
		String oldMenuId = request.getParameter("oldMenuId");
		vo.setMenuId(request.getParameter("menuId"));

			vo.setMenuName(request.getParameter("menuName"));
		
		vo.setSystemId(request.getParameter("systemId"));
		vo.setModuleId(request.getParameter("moduleId"));
		vo.setMenuType(Integer.parseInt(request.getParameter("menuType")));
		vo.setOpenMethod(Integer.parseInt(request.getParameter("openMethod")));
		vo.setPageLink(request.getParameter("pageLink"));
		vo.setLayer(Integer.parseInt(request.getParameter("layer")));
		vo.setLog(Integer.parseInt(request.getParameter("log")));
		vo.setOrder(Integer.parseInt(request.getParameter("order")));
		vo.setIfMyWork(Integer.parseInt(request.getParameter("ifMyWork")));
		vo.setParentMenuId(request.getParameter("parentMenuId"));
		vo.setInuse(Integer.parseInt(request.getParameter("inuse")));

			vo.setMenuDesc(request.getParameter("menuDesc"));

		vo.setPortalWinId(Integer.parseInt(request
						.getParameter("portalWinId")));
		MenuOperateBO bo = (MenuOperateBO) getBaseService().getServiceFacade(
				MenuOperateBO.BEAN);
		int code = -1;
		try {
			code = bo.doModifyMenuById(vo, oldMenuId);
		} catch (ServiceException e) {
			// TODO 自动生成 catch 块
			e.printStackTrace();
		}
		request.setAttribute("code", new Integer(code));
		return mapping.findForward("deleteover");
	}

	public ActionForward deleteMenu(ActionMapping mapping,
			HttpServletRequest request, HttpServletResponse response) {
		String id = request.getParameter("menuId");
		MenuOperateBO bo = (MenuOperateBO) getBaseService().getServiceFacade(
				MenuOperateBO.BEAN);
		int code = -1;
		try {
			code = bo.doDeleteMenuById(id);
		} catch (ServiceException e) {
			// TODO 自动生成 catch 块
			e.printStackTrace();
		}
		request.setAttribute("code", new Integer(code));
		return mapping.findForward("deleteover");
	}

	public ActionForward checkName(ActionMapping mapping,
			HttpServletRequest request, HttpServletResponse response) {
		String name = request.getParameter("menuname");
		MenuOperateBO bo = (MenuOperateBO) getBaseService().getServiceFacade(
				MenuOperateBO.BEAN);
		MenuOperateVO vo = new MenuOperateVO();
		try {
			vo = bo.getMenuByName(name);
		} catch (ServiceException e) {
			// TODO 自动生成 catch 块
			e.printStackTrace();
		}
		if (vo.getMenuId().equals("")) {
			vo = null;
			request.setAttribute("newmenu", "可以使用这个名字新建菜单");
			request.setAttribute("menuname", name);
		}
		request.setAttribute("amenu", vo);
		return mapping.findForward("checknameover");
	}

	public ActionForward operateMenu(ActionMapping mapping,
			HttpServletRequest request, HttpServletResponse response) {
		String name = request.getParameter("menuname");
		MenuOperateBO bo = (MenuOperateBO) getBaseService().getServiceFacade(
				MenuOperateBO.BEAN);
		MenuOperateVO vo = new MenuOperateVO();
		try {
			vo = bo.getMenuByName(name);
		} catch (ServiceException e) {
			// TODO 自动生成 catch 块
			e.printStackTrace();
		}
		request.setAttribute("amenu", vo);
		return mapping.findForward("operatemenu");
	}
}