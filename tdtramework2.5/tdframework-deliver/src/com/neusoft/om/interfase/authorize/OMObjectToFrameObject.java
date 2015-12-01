package com.neusoft.om.interfase.authorize;

import com.neusoft.om.dao.menu.MenuColl;
import com.neusoft.om.dao.menu.MenuVO;
import com.neusoft.om.dao.work.WorkColl;
import com.neusoft.om.dao.work.WorkVO;
import com.neusoft.tdframework.authorization.FrameMenuColl;
import com.neusoft.tdframework.authorization.FrameMenuVO;
import com.neusoft.tdframework.authorization.FrameWorkColl;
import com.neusoft.tdframework.authorization.FrameWorkVO;

/**
 * 将权限的对象转换为框架的对象
 * @author renh
 *
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
public class OMObjectToFrameObject {
	/**
	 * 将权限的MenuVO转换为框架的FrameMenuVO
	 * @param menuVO
	 * @return
	 */
	private FrameMenuVO getFrameMenuVO(MenuVO menuVO) {
		FrameMenuVO frameMenuVO = new FrameMenuVO(); 
		frameMenuVO.setAdminStatus(menuVO.getAdminStatus());
		frameMenuVO.setExecStatus(menuVO.getExecStatus());
		frameMenuVO.setIfChild(menuVO.getIfChild());
		frameMenuVO.setIfMyWork(menuVO.getIfMyWork());
		frameMenuVO.setIfSelect(menuVO.getIfSelectExec());
		frameMenuVO.setInuse(menuVO.getInuse());
		frameMenuVO.setLayer(menuVO.getLayer());
		frameMenuVO.setLog(menuVO.getLog());
		frameMenuVO.setMenuDesc(menuVO.getMenuDesc());
		frameMenuVO.setMenuId(menuVO.getMenuId());
		frameMenuVO.setMenuName(menuVO.getMenuName());
		frameMenuVO.setMenuType(menuVO.getMenuType());
		frameMenuVO.setModuleId(menuVO.getModuleId());
		frameMenuVO.setOpenMethod(menuVO.getOpenMethod());
		frameMenuVO.setOrder(menuVO.getOrder());
		frameMenuVO.setPageLink(menuVO.getPageLink());
		frameMenuVO.setParentMenuId(menuVO.getParentMenuId());
		frameMenuVO.setSystemId(menuVO.getSystemId());
		frameMenuVO.setContainer(menuVO.getContainer());            
		return frameMenuVO;
	}
        
	/**
	 * 系统的menu结果集转换为框架的结果集
	 * @param menuColl
	 * @return
	 */
	public FrameMenuColl getFrameMenuColl(MenuColl menuColl) {
			FrameMenuColl frameMenuColl = new FrameMenuColl();
			for(int i=0;i<menuColl.getRowCount();i++) {
					frameMenuColl.addMenu(getFrameMenuVO(menuColl.getMenu(i)));
			}
			return frameMenuColl;
	}   
	/**
	 * 权限系统的工作区对象转换为框架的工作区对象
	 * @param workVO
	 * @return
	 */
	private FrameWorkVO getFrameWorkVO(WorkVO workVO){
		FrameWorkVO frameWorkVO = new FrameWorkVO();
		frameWorkVO.setSystemId(workVO.getSystemId());
		frameWorkVO.setWorkMenuId(workVO.getWorkMenuId());
		frameWorkVO.setWorkMenuName(workVO.getWorkMenuName());
		frameWorkVO.setWorkMenuOrder(workVO.getWorkMenuOrder());
		frameWorkVO.setWorkPageLink(workVO.getWorkPageLink());
		
		return frameWorkVO;
		
	}
	/**
	 * 权限系统的工作区结果集转换为框架的结果集
	 * @param workColl
	 * @return
	 */
	public FrameWorkColl getFrameWorkColl(WorkColl workColl) {
		FrameWorkColl frameWorkColl = new FrameWorkColl();
		for(int i=0;i<workColl.getRowCount();i++) {
			frameWorkColl.addWorkVO(getFrameWorkVO(workColl.getWork(i)));
		}
		return frameWorkColl;
	}
		
}
