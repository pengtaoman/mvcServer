package com.neusoft.om.interfase.ebisp.bo;

import java.util.ArrayList;
import java.util.List;

import com.neusoft.om.interfase.ebisp.dao.UserDAO;
import com.neusoft.om.interfase.ebisp.data.FrameColl;
import com.neusoft.om.interfase.ebisp.data.FrameRelViewColl;
import com.neusoft.om.interfase.ebisp.data.FrameVO;
import com.neusoft.om.interfase.ebisp.data.StyleVO;
import com.neusoft.om.interfase.ebisp.data.ViewColl;
import com.neusoft.om.interfase.ebisp.data.ViewVO;
import com.neusoft.om.interfase.ebisp.data.WindowColl;
import com.neusoft.om.interfase.ebisp.data.WindowRelFrameColl;
import com.neusoft.om.interfase.ebisp.data.WindowVO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.SysLog;

public class UserBOImpl implements UserBO{

	UserDAO userDAO;	
	
	public void setUserDAO(UserDAO userDAO) {
		this.userDAO = userDAO;
	}
	/**
	 * 通过窗口编号得到窗口详细信息
	 */
	public WindowVO getWindowVOById(String windowId) throws ServiceException{
		WindowVO windowVO = new WindowVO();
		try{
			windowVO = userDAO.getWindowVOById(windowId);
		}catch(DataAccessException e) {
			SysLog.writeLogs("om-ebisp",GlobalParameters.ERROR,"UserBOImpl--getWindowVOById:"+e.getMessage());
			throw new ServiceException(e);
		}
		return windowVO;
	}
	
	/**
	 * 根据框架编号得到框架详细信息
	 */
	public FrameVO getFrameVOById(String frameId) throws ServiceException{
		FrameVO frameVO = new FrameVO();
		try{
			frameVO = userDAO.getFrameVOById(frameId);
		}catch(DataAccessException e) {
			SysLog.writeLogs("om-ebisp",GlobalParameters.ERROR,"UserBOImpl--getFrameVOById:"+e.getMessage());
			throw new ServiceException(e);
		}
		return frameVO;
	}
	
	/**
	 * 根据视图编号得到视图的详细信息
	 */
	public ViewVO getViewVOById(String viewId) throws ServiceException{
		ViewVO viewVO = new ViewVO();
		try{
			viewVO = userDAO.getViewVOById(viewId);
		}catch(DataAccessException e) {
			SysLog.writeLogs("om-ebisp",GlobalParameters.ERROR,"UserBOImpl--getViewVOById:"+e.getMessage());
			throw new ServiceException(e);
		}
		return viewVO;
	}
    /**
     * 根据职员编码得到其权限范围内的窗口
     */
	public List getWindowListByEmployeeId(String employeeId) throws ServiceException{
		List windowList = new ArrayList();
		try{
			windowList = userDAO.getWindowListByEmployeeId(employeeId);
		}catch(DataAccessException e){
			SysLog.writeLogs("om-ebisp",GlobalParameters.ERROR,"UserBOImpl--getWindowListByEmployeeId:"+e.getMessage());
			throw new ServiceException(e);
		}
		return windowList;
	}
	/**
	 * 根据职员编号得到其权限范围内的视图
	 * @param employeeId
	 * @return
	 * @throws ServiceException
	 */
	public List getViewListByEmployeeId(String employeeId) throws ServiceException{
		List viewList = new ArrayList();
		try{
			viewList = userDAO.getViewListByEmployeeId(employeeId);
		}catch(DataAccessException e){
			SysLog.writeLogs("om-ebisp",GlobalParameters.ERROR,"UserBOImpl--getViewListByEmployeeId:"+e.getMessage());
			throw new ServiceException(e);
		}
		return viewList;
	}
	/**
	 * 根据职员编号得到其权限范围内的按钮
	 * @param employeeId
	 * @return
	 * @throws ServiceException
	 */
	public List getButtonListByEmployeeId(String employeeId) throws ServiceException{
		List buttonList = new ArrayList();
		try{
			buttonList = userDAO.getButtonListByEmployeeId(employeeId);
		}catch(DataAccessException e){
			SysLog.writeLogs("om-ebisp",GlobalParameters.ERROR,"UserBOImpl--getButtonListByEmployeeId:"+e.getMessage());
			throw new ServiceException(e);
		}
		return buttonList;
	}
	public WindowColl getParentWindowByWinId(String windowId) throws ServiceException {
		WindowColl windowColl = new WindowColl();
		try{
			windowColl = userDAO.getParentWindowByWinId(windowId);
		}catch(DataAccessException e){
			SysLog.writeLogs("om-ebisp",GlobalParameters.ERROR,"UserBOImpl--getParentWindowByWinId:"+e.getMessage());
			throw new ServiceException(e);
		}
		return windowColl;
	}
	public WindowColl getChildrenWindowByWinId(String windowId) throws ServiceException {
		WindowColl windowColl = new WindowColl();
		try{
			windowColl = userDAO.getChildrenWindowByWinId(windowId);
		}catch(DataAccessException e){
			SysLog.writeLogs("om-ebisp",GlobalParameters.ERROR,"UserBOImpl--getChildrenWindowByWinId:"+e.getMessage());
			throw new ServiceException(e);
		}
		return windowColl;
	}
	public WindowColl getWindowCollByFrameId(String frameId) throws ServiceException {
		WindowColl windowColl = new WindowColl();
		try{
			windowColl = userDAO.getWindowCollByFrameId(frameId);
		}catch(DataAccessException e){
			SysLog.writeLogs("om-ebisp",GlobalParameters.ERROR,"UserBOImpl--getWindowCollByFrameId:"+e.getMessage());
			throw new ServiceException(e);
		}
		return windowColl;
	}
	public FrameColl getFrameCollByWinId(String windowId) throws ServiceException {
		FrameColl frameColl = new FrameColl();
		try{
			frameColl = userDAO.getFrameCollByWinId(windowId);
		}catch(DataAccessException e){
			SysLog.writeLogs("om-ebisp",GlobalParameters.ERROR,"UserBOImpl--getFrameCollByWinId:"+e.getMessage());
			throw new ServiceException(e);
		}
		return frameColl;
	}
	public FrameColl getFrameCollByViewId(String viewId) throws ServiceException {
		FrameColl frameColl = new FrameColl();
		try{
			frameColl = userDAO.getFrameCollByViewId(viewId);
		}catch(DataAccessException e){
			SysLog.writeLogs("om-ebisp",GlobalParameters.ERROR,"UserBOImpl--getFrameCollByViewId:"+e.getMessage());
			throw new ServiceException(e);
		}
		return frameColl;
	}
	public ViewColl getViewCollByFrameId(String frameId) throws ServiceException {
		ViewColl viewColl = new ViewColl();
		try{
			viewColl = userDAO.getViewCollByFrameId(frameId);
		}catch(DataAccessException e){
			SysLog.writeLogs("om-ebisp",GlobalParameters.ERROR,"UserBOImpl--getViewCollByFrameId:"+e.getMessage());
			throw new ServiceException(e);
		}
		return viewColl;
	}
	public WindowRelFrameColl getWindowRelFrameColl(String windowId) throws ServiceException {
		WindowRelFrameColl windowRelFrameColl = new WindowRelFrameColl();
		try{
			windowRelFrameColl = userDAO.getWindowRelFrameColl(windowId);
		}catch(DataAccessException e){
			SysLog.writeLogs("om-ebisp",GlobalParameters.ERROR,"UserBOImpl--getWindowRelFrameColl:"+e.getMessage());
			throw new ServiceException(e);
		}
		return windowRelFrameColl;
	}
	public FrameRelViewColl getFrameRelViewColl(String frameId) throws ServiceException {
		FrameRelViewColl frameRelViewColl = new FrameRelViewColl();
		try{
			frameRelViewColl = userDAO.getFrameRelViewColl(frameId);
		}catch(DataAccessException e){
			SysLog.writeLogs("om-ebisp",GlobalParameters.ERROR,"UserBOImpl--getFrameRelViewColl:"+e.getMessage());
			throw new ServiceException(e);
		}
		return frameRelViewColl;
	}
	public StyleVO getStyleVOById(String styleId) throws ServiceException {
		StyleVO styleVO = new StyleVO();
		try{
			styleVO = userDAO.getStyleVOById(styleId);
		}catch(DataAccessException e){
			SysLog.writeLogs("om-ebisp",GlobalParameters.ERROR,"UserBOImpl--getStyleVOById:"+e.getMessage());
			throw new ServiceException(e);
		}
		return styleVO;
	}
	public boolean ifHaveWinowRight(String employeeId, String windowId) throws ServiceException {
		boolean have = false;
		try{
			have = userDAO.ifHaveWinowRight(employeeId, windowId);
		}catch(DataAccessException e){
			SysLog.writeLogs("om-ebisp",GlobalParameters.ERROR,"UserBOImpl--ifHaveWinowRight:"+e.getMessage());
			throw new ServiceException(e);
		}
		return have;
	}
	public boolean ifHaveViewRight(String employeeId, String viewId) throws ServiceException {
		boolean have = false;
		try{
			have = userDAO.ifHaveViewRight(employeeId, viewId);
		}catch(DataAccessException e){
			SysLog.writeLogs("om-ebisp",GlobalParameters.ERROR,"UserBOImpl--ifHaveViewRight:"+e.getMessage());
			throw new ServiceException(e);
		}
		return have;
	}

}
